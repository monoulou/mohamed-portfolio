import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'bot'
  content: string
}

// API endpoint — proxy server handles OpenAI calls securely
const API_URL = 'http://localhost:3001/api/chat'

const ChatWidget: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting: Message = {
        id: 'greeting',
        role: 'bot',
        content: t('chat.greeting'),
      }
      setMessages([greeting])
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const quickActions = [
    { key: 'bookCall', label: t('chat.quickActions.bookCall') },
    { key: 'techStack', label: t('chat.quickActions.techStack') },
    { key: 'rates', label: t('chat.quickActions.rates') },
    { key: 'projects', label: t('chat.quickActions.projects') },
  ]

  // Build OpenAI-compatible message history from chat
  const buildChatHistory = () => {
    return messages
      .filter((m) => m.id !== 'greeting')
      .map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.content,
      }))
  }

  const handleSend = async (text?: string) => {
    const msgText = (text || input).trim()
    if (!msgText || isTyping) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: msgText,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const chatHistory = buildChatHistory()
      chatHistory.push({ role: 'user', content: msgText })

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      })

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`)
      }

      const data = await res.json()
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: data.reply,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      // Fallback to mock if API is unreachable
      const fallback: Message = {
        id: `bot-${Date.now()}`,
        role: 'bot',
        content: i18n.language === 'fr'
          ? "Desole, je ne peux pas atteindre le serveur IA pour le moment. Veuillez utiliser le formulaire de contact pour joindre Mohamed directement."
          : "Sorry, I can't reach the AI server right now. Please use the contact form to reach Mohamed directly.",
      }
      setMessages((prev) => [...prev, fallback])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-indigo text-white flex items-center justify-center shadow-lg hover:bg-brand-hover transition-colors duration-200 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('chat.openLabel')}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-xl border border-white/[0.08] bg-elevated shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-panel">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-indigo flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c1.021.27 2.07.44 3.136.537M9.75 3.104c-1.021.27-2.07.44-3.136.537m6.272.009A21.86 21.86 0 0112 3c2.186 0 4.283.256 6.136.738M12 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-primary-text text-sm font-[510]">{t('chat.title')}</p>
                  <p className="text-success text-xs font-[400]">{t('chat.online')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-tertiary-text hover:text-primary-text hover:bg-white/[0.08] transition-colors duration-200"
                aria-label={t('chat.closeLabel')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-brand-indigo text-white rounded-br-sm'
                        : 'bg-white/[0.04] text-secondary-text border border-white/[0.05] rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] border border-white/[0.05] rounded-xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-tertiary-text rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-tertiary-text rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-tertiary-text rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (only show initially) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.key}
                    onClick={() => handleSend(action.label)}
                    className="px-3 py-1.5 rounded-full text-xs font-[510] text-tertiary-text border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:text-secondary-text transition-colors duration-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('chat.inputPlaceholder')}
                  className="flex-1 bg-transparent text-primary-text text-sm placeholder-quaternary-text outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-md bg-brand-indigo text-white flex items-center justify-center hover:bg-brand-hover transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={t('chat.sendLabel')}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
