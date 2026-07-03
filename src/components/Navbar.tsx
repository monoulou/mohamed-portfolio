import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface NavbarProps {
  toggleLang: () => void
}

const Navbar: React.FC<NavbarProps> = ({ toggleLang }) => {
  const { t, i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'services', href: '#services' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 border-b border-white/[0.05] transition-colors duration-300 ${
        scrolled ? 'bg-marketing-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-primary-text text-xl font-[510]" style={{ letterSpacing: '-0.5px' }}>
            Mohamed A.
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-secondary-text hover:text-primary-text text-sm font-[510] transition-colors duration-200 relative group"
                style={{ letterSpacing: '-0.125px' }}
              >
                {t(`nav.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="px-4 py-1.5 rounded-full border border-white/[0.08] text-xs font-[510] text-tertiary-text hover:text-primary-text hover:bg-white/[0.05] transition-colors duration-200"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
            <a
              href="#contact"
              className="px-4 py-1.5 rounded-md bg-brand-indigo text-white text-sm font-[590] hover:bg-brand-hover transition-colors duration-200"
            >
              {t('nav.hireMe')}
            </a>
          </div>
          <button
            className="md:hidden text-primary-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-panel border-t border-white/[0.05] px-4 pb-4 space-y-3"
        >
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-secondary-text hover:text-primary-text text-sm font-[510] py-2"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
          <button
            onClick={() => {
              toggleLang()
              setMobileOpen(false)
            }}
            className="px-4 py-1.5 rounded-full border border-white/[0.08] text-xs font-[510] text-tertiary-text hover:text-primary-text hover:bg-white/[0.05]"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-2 rounded-md bg-brand-indigo text-white text-sm font-[590] text-center"
          >
            {t('nav.hireMe')}
          </a>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
