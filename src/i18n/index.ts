import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import fr from './fr.json'

const resources = { en: { translation: en }, fr: { translation: fr } }

const storedLang = localStorage.getItem('i18nextLng')

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang || undefined,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

if (!storedLang) {
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'fr') {
    i18n.changeLanguage('fr')
  } else {
    i18n.changeLanguage('en')
  }
}

export default i18n
