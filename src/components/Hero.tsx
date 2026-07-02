import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Hero: React.FC = () => {
  const { t } = useTranslation()
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const headline = t('hero.headline')

  useEffect(() => {
    if (prefersReducedMotion()) {
      setTyped(headline)
      setShowCursor(false)
      return
    }
    let index = 0
    const interval = setInterval(() => {
      setTyped(headline.slice(0, index))
      index += 1
      if (index > headline.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [headline])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const blink = setInterval(() => setShowCursor((p) => !p), 530)
    return () => clearInterval(blink)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-indigo/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-accent/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center z-10 max-w-4xl mx-auto"
      >
        <h1
          className="text-primary-text font-[510] leading-none tracking-tight"
          style={{ fontSize: 'clamp(40px, 8vw, 72px)', letterSpacing: '-1.584px' }}
        >
          {typed}
          <span
            className="inline-block w-1 bg-brand-accent ml-1 align-middle"
            style={{
              height: '0.8em',
              opacity: showCursor ? 1 : 0,
              transition: 'opacity 100ms',
            }}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 text-secondary-text text-lg sm:text-xl font-[510]"
          style={{ letterSpacing: '-0.125px' }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-4 text-tertiary-text text-sm font-[510]"
        >
          {t('hero.locationBadge')}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-md border border-white/[0.08] text-sm font-[510] text-primary-text hover:bg-white/[0.05] transition-colors duration-200"
          >
            {t('hero.ctaViewWork')}
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-md bg-brand-indigo text-white text-sm font-[590] hover:bg-brand-hover transition-colors duration-200"
          >
            {t('hero.ctaGetInTouch')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
