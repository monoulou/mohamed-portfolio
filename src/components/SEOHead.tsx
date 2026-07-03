import React from 'react'
import { useTranslation } from 'react-i18next'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Mohamed A. — Senior Full-Stack Developer | SaaS Architect",
  description = "Hire Mohamed ABDELMOUMEN, a senior full-stack developer in Montreal specializing in SaaS architecture, Symfony, React, and scalable web applications.",
  canonical = "https://mohamed.dev",
}) => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const currentUrl = `${canonical}/${lang === 'en' ? '' : lang === 'fr' ? 'fr/' : ''}`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohamed A.',
    jobTitle: 'Senior Full-Stack Developer',
    url: canonical,
    sameAs: [
      'https://github.com/mohamedb',
      'https://www.linkedin.com/in/mohamedb',
    ],
    knowsAbout: [
      'SaaS Architecture',
      'Symfony',
      'React',
      'TypeScript',
      'API Design',
      'DevOps',
      'Docker',
    ],
  }

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What technologies do you specialize in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I specialize in PHP/Symfony, React, TypeScript, Docker, and SaaS architecture.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where are you based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I am based in Montreal, Canada, and I work with clients worldwide.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide consulting services?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, I offer technical consulting, code review, and architectural guidance for web projects.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is your experience with SaaS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I have over 8 years of experience building and scaling SaaS products, including my own, ReviewPulse AI.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: canonical,
      },
    ],
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <meta property="og:locale" content={lang} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Mohamed A." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="alternate" hrefLang="en" href={`${canonical}/`} />
      <link rel="alternate" hrefLang="fr" href={`${canonical}/fr/`} />
      <link rel="alternate" hrefLang="x-default" href={`${canonical}/`} />

      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqPageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </>
  )
}

export default SEOHead
