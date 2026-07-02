import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const About: React.FC = () => {
  const { t } = useTranslation()

  const facts = ['experience', 'location', 'business', 'focus']

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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
            {t('about.title')}
          </h2>
          <p className="mt-6 text-secondary-text text-base md:text-lg max-w-3xl leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {facts.map((fact, index) => (
            <motion.div
              key={fact}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg border border-white/[0.08] bg-white/[0.02]"
            >
              <p className="text-tertiary-text text-sm font-[510] uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>
                {t(`about.${fact}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
