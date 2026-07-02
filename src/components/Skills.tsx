import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface SkillItemProps {
  name: string
  icon: React.ReactNode
  level: number
  delay: number
}

const SkillCard: React.FC<SkillItemProps> = ({ name, icon, level, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg border border-white/[0.08] bg-white/[0.02] flex items-center gap-4 transition-colors duration-200 hover:bg-white/[0.03]"
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-white/[0.03] text-brand-accent">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-primary-text text-sm font-[510] truncate">{name}</p>
        <div className="mt-2 h-1 w-full bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-indigo rounded-full"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

const Skills: React.FC = () => {
  const { t } = useTranslation()

  const categories = [
    {
      key: 'backend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 20h14M5 4h14" />
        </svg>
      ),
      items: ['phpSymfony', 'apiPlatform', 'mysql', 'docker'],
      profs: [95, 90, 85, 85],
    },
    {
      key: 'frontend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      items: ['react', 'typescript', 'vite', 'tailwind'],
      profs: [95, 92, 88, 90],
    },
    {
      key: 'devops',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2 2 3 2 3h12c0 0 2-1 2-3V7c0-2-2-3-2-3H6c0 0-2 1-2 3z" />
        </svg>
      ),
      items: ['docker', 'haproxy', 'n8n', 'cicd'],
      profs: [85, 80, 75, 85],
    },
    {
      key: 'business',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: ['saasArch', 'consulting', 'codeReview'],
      profs: [95, 90, 85],
    },
  ]

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
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
            {t('skills.title')}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-lg border border-white/[0.08] bg-white/[0.02]"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-brand-accent">{cat.icon}</span>
                <h3
                  className="text-primary-text text-xl font-[590]"
                  style={{ letterSpacing: '-0.24px' }}
                >
                  {t(`skills.categories.${cat.key}`)}
                </h3>
              </div>
              <div className="space-y-4">
                {cat.items.map((item, index) => (
                  <SkillCard
                    key={item}
                    name={t(`skills.items.${item}`)}
                    icon={
                      <span className="font-mono text-brand-accent text-xs">
                        {t(`skills.items.${item}`).slice(0, 2).toUpperCase()}
                      </span>
                    }
                    level={cat.profs[index]}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
