import type { Lang } from '../i18n/ui'

export const SITE = 'https://botrugno.dev'

// Identificativi schema.org: la stessa persona e lo stesso sito su tutte le pagine.
// Con lo stesso @id, Google e i motori AI capiscono che l'autore dei progetti
// è la persona descritta in home e nel CV.
export const PERSON_ID = `${SITE}/#person`
export const WEBSITE_ID = `${SITE}/#website`

/** Riferimento breve alla persona, per author e creator nelle altre pagine */
export const personRef = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Marco Luigi Botrugno',
  url: `${SITE}/`,
}

// Dati strutturati (schema.org Person), uguali in italiano e in inglese a parte la descrizione
export function personSchema(lang: Lang, image?: string) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Marco Luigi Botrugno',
    url: `${SITE}/`,
    ...(image && { image }),
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

/** schema.org WebSite: Google lo legge in home per il nome del sito nei risultati */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE}/`,
    name: 'botrugno.dev',
    alternateName: 'Marco Luigi Botrugno',
    inLanguage: ['it-IT', 'en-US'],
    publisher: { '@id': PERSON_ID },
  }
}

/**
 * schema.org ProfilePage per le pagine dedicate a Marco (home e CV), con la persona
 * come mainEntity. `pathname` è il percorso della pagina, con lo slash finale.
 */
export function profilePageSchema(lang: Lang, pathname: string, name: string, image?: string) {
  const url = `${SITE}${pathname}`
  return {
    '@type': 'ProfilePage',
    '@id': `${url}#page`,
    url,
    name,
    inLanguage: lang === 'en' ? 'en-US' : 'it-IT',
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: personSchema(lang, image),
  }
}

/** Percorso di due livelli: home della lingua → pagina */
export function breadcrumbSchema(lang: Lang, name: string, url: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'botrugno.dev', item: lang === 'en' ? `${SITE}/en/` : `${SITE}/` },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  }
}
