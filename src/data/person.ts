import type { Lang } from '../i18n/ui'

// Dati strutturati (schema.org Person) della home, uguali in italiano e in inglese
export function personSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Marco Luigi Botrugno',
    url: lang === 'en' ? 'https://botrugno.dev/en/' : 'https://botrugno.dev/',
    jobTitle: 'Full-Stack Developer',
    description: lang === 'en'
      ? 'Full-stack developer: web apps, backends and APIs, databases, iOS and Android apps.'
      : 'Sviluppatore full-stack: web app, backend e API, database, app iOS e Android.',
    email: 'mailto:botrugnom7@gmail.com',
    nationality: { '@type': 'Country', name: 'Italy' },
    address: { '@type': 'PostalAddress', addressRegion: 'Puglia', addressCountry: 'IT' },
    worksFor: {
      '@type': 'Organization',
      name: 'BarbarHouse S.R.L.',
      address: { '@type': 'PostalAddress', addressLocality: 'Casarano', addressRegion: 'LE', addressCountry: 'IT' },
    },
    // studente in corso: affiliation, non alumniOf
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Università degli Studi di Bari Aldo Moro' },
    alumniOf: { '@type': 'HighSchool', name: 'IIS "A. Meucci"', address: { '@type': 'PostalAddress', addressLocality: 'Casarano', addressCountry: 'IT' } },
    knowsAbout: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'Fastify', 'PHP', 'MySQL', 'Redis', 'Ionic', 'Capacitor', 'Astro'],
    knowsLanguage: ['it', 'en'],
    sameAs: [
      'https://github.com/BotrugnoMarco',
      'https://www.linkedin.com/in/marco-luigi-botrugno',
    ],
  }
}
