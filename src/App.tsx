import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import SEOHead from './components/SEOHead'

const App: React.FC = () => {
  const { i18n } = useTranslation()

  const toggleLang = useCallback(() => {
    const next = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(next)
  }, [i18n])

  return (
    <>
      <SEOHead />
      <Navbar toggleLang={toggleLang} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
