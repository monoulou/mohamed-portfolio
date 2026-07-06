import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

const Contact: React.FC = () => {
  const { t } = useTranslation()
  const [revealed, setRevealed] = useState<'idle' | 'email' | 'phone' | 'both'>('idle')

  const handleReveal = () => {
    if (revealed === 'idle') {
      setRevealed('email')
      setTimeout(() => setRevealed('phone'), 600)
      setTimeout(() => setRevealed('both'), 1200)
    } else {
      setRevealed('idle')
    }
  }

  const charVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: 'blur(8px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.03, duration: 0.3, ease: 'easeOut' },
    }),
    exit: { opacity: 0, y: -4, filter: 'blur(6px)', transition: { duration: 0.2 } },
  }

  const AnimatedText = ({ text, href, delay = 0 }: { text: string; href?: string; delay?: number }) => {
    const content = (
      <span className="inline-flex flex-wrap">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            custom={i + delay}
            variants={charVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={char === ' ' ? '\u00A0' : ''}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    )

    if (href) {
      return (
        <a href={href} className="text-brand-accent hover:text-brand-hover transition-colors duration-200">
          {content}
        </a>
      )
    }
    return <span className="text-brand-accent">{content}</span>
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.4, ease: 'easeOut' },
    }),
    exit: { opacity: 0, x: -20, scale: 0.95, transition: { duration: 0.25 } },
  }

  const pulseRing: Variants = {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0.3, 0, 0.3],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-primary-text text-3xl md:text-4xl font-[510]"
            style={{ letterSpacing: '-0.704px' }}
          >
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-tertiary-text text-base max-w-2xl">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Animated reveal section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Reveal button */}
            <button
              onClick={handleReveal}
              className="group relative flex items-center gap-4 px-8 py-5 rounded-xl border border-white/[0.08] bg-gradient-to-r from-brand-indigo/10 to-brand-accent/5 hover:from-brand-indigo/20 hover:to-brand-accent/10 transition-all duration-500 w-full"
            >
              {/* Pulse ring animation */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand-accent/20"
                  {...(revealed === 'idle' ? pulseRing : {})}
                />
                <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                  <AnimatePresence mode="wait">
                    {revealed === 'idle' ? (
                      <motion.svg
                        key="envelope"
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 10, scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="text-left">
                <span className="text-primary-text text-base font-[590] group-hover:text-brand-accent transition-colors duration-300">
                  {revealed === 'idle' ? 'Get my contact info' : 'Hide contact info'}
                </span>
                <span className="block text-tertiary-text text-xs mt-0.5">
                  {revealed === 'idle' ? 'Click to reveal email & phone' : 'Click to hide'}
                </span>
              </div>

              <motion.div
                className="ml-auto text-brand-accent/50"
                animate={{ rotate: revealed === 'idle' ? 0 : 180 }}
                transition={{ duration: 0.4 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            {/* Contact cards with staggered animation */}
            <AnimatePresence mode="wait">
              {revealed !== 'idle' && (
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Email card */}
                  {(revealed === 'email' || revealed === 'phone' || revealed === 'both') && (
                    <motion.div
                      custom={0}
                      variants={cardVariants}
                      className="flex items-start gap-4 p-5 rounded-xl border border-brand-accent/10 bg-brand-accent/[0.03] hover:bg-brand-accent/[0.06] transition-colors duration-300"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-secondary-text text-xs uppercase tracking-wider font-[510] mb-1.5">Email</p>
                        <div className="text-lg sm:text-xl">
                          <AnimatedText
                            text="mohamedabdelmoumen@gmail.com"
                            href="mailto:mohamedabdelmoumen@gmail.com"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Phone card */}
                  {(revealed === 'phone' || revealed === 'both') && (
                    <motion.div
                      custom={1}
                      variants={cardVariants}
                      className="flex items-start gap-4 p-5 rounded-xl border border-brand-accent/10 bg-brand-accent/[0.03] hover:bg-brand-accent/[0.06] transition-colors duration-300"
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-secondary-text text-xs uppercase tracking-wider font-[510] mb-1.5">Phone</p>
                        <div className="text-lg sm:text-xl">
                          <AnimatedText text="+1 (438) 942-1880" href="tel:+14389421880" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle hint text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-quaternary-text text-xs"
            >
              {t('contact.hint') || 'Prefer a chat? Reach out anytime — I typically respond within 24h.'}
            </motion.p>
          </motion.div>

          {/* Right: Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href="https://www.linkedin.com/in/mohamedb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/[0.03] text-brand-accent">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <span className="text-secondary-text text-sm font-[510] group-hover:text-primary-text transition-colors duration-200">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com/mohamedb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03] transition-colors duration-200 group"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/[0.03] text-brand-accent">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
              <span className="text-secondary-text text-sm font-[510] group-hover:text-primary-text transition-colors duration-200">
                GitHub
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
