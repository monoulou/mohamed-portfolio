import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const Projects: React.FC = () => {
  const { t } = useTranslation()

  const projects = [
    {
      key: 'reviewpulse',
      name: 'ReviewPulse AI',
      url: 'https://reviewspulse.app',
      stack: ['PHP/Symfony', 'React', 'TypeScript', 'API Platform', 'Docker'],
    },
    {
      key: 'smartinbox',
      name: 'Smart Inbox Cleaner',
      url: 'https://getsmartinbox.com',
      stack: ['PHP/Symfony', 'Google API', 'Stripe', 'n8n', 'Docker'],
    },
  ]

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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
            {t('projects.title')}
          </h2>
          <p className="mt-4 text-tertiary-text text-base max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <motion.a
              key={project.key}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="group block p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.03] transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h3
                    className="text-primary-text text-xl font-[590]"
                    style={{ letterSpacing: '-0.24px' }}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-3 text-secondary-text text-base leading-relaxed max-w-2xl">
                    {t(`projects.items.${project.key}.description`)}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-tertiary-text group-hover:text-brand-accent transition-colors duration-200 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-[510] font-mono text-tertiary-text border border-white/[0.08] bg-white/[0.02]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
