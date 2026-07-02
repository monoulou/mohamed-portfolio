import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface ServiceItem {
  key: string
  icon: React.ReactNode
}

const Services: React.FC = () => {
  const { t } = useTranslation()

  const services: ServiceItem[] = [
    {
      key: 'fullStack',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4 4 4 4M14 4l-4 16" />
        </svg>
      ),
    },
    {
      key: 'saas',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 018 0 4 4 0 018 0v3M3 15v4h18v-4M3 15l2-7h14l2 7" />
        </svg>
      ),
    },
    {
      key: 'consulting',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 2.5l-3 3m0 0l-3-3m3 3v6m13-3l-3 3m0 0l3 3m-3-3V2.5M9.5 18.5l3-3m0 0l3 3m-3-3v6m-3 0l-3-3m0 0l3-3m-3 3v-6" />
        </svg>
      ),
    },
    {
      key: 'api',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      key: 'devops',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a10 10 0 00-7.35 16.6l2.7-2.7A6 6 0 016 12a6 6 0 016-6 6 6 0 016 6 6 6 0 01-1.35 3.9l2.7 2.7A10 10 0 0112 2z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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
            {t('services.title')}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12] transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="text-brand-accent mb-4">{service.icon}</div>
              <h3
                className="text-primary-text text-xl font-[590] mb-3"
                style={{ letterSpacing: '-0.24px' }}
              >
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed flex-1">
                {t(`services.items.${service.key}.description`)}
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center text-brand-accent text-sm font-[510] hover:text-brand-hover transition-colors duration-200 group/link"
              >
                {t('services.learnMore')}
                <svg
                  className="ml-1 w-4 h-4 transform group-hover/link:translate-x-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
