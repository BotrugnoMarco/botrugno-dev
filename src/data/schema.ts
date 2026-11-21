// Dati strutturati (JSON-LD) delle pagine: home, CV e progetti, in italiano e in inglese.
// Ogni pagina ha un solo blocco con @graph; persona e sito si collegano con @id (vedi person.ts).
import { getImage } from 'astro:assets'
import marcoPhoto from '../assets/marco.jpg'
import type { Lang } from '../i18n/ui'
import type { Project, ProjectContent } from './projects'
import { SITE, personRef, websiteSchema, profilePageSchema, breadcrumbSchema } from './person'

/** URL assoluto di una versione JPG da 600 px della foto */
async function personImage() {
  const photo = await getImage({ src: marcoPhoto, width: 600, format: 'jpg' })
  return new URL(photo.src, SITE).href
}

export async function homeSchema(lang: Lang, title: string) {
  const pathname = lang === 'en' ? '/en/' : '/'
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteSchema(), profilePageSchema(lang, pathname, title, await personImage())],
  }
}

export async function cvSchema(lang: Lang, title: string) {
  const pathname = lang === 'en' ? '/en/cv/' : '/cv/'
  return {
    '@context': 'https://schema.org',
    '@graph': [
      profilePageSchema(lang, pathname, title, await personImage()),
      breadcrumbSchema(lang, lang === 'en' ? 'Resume' : 'Curriculum', `${SITE}${pathname}`),
    ],
  }
}

/**
 * Pagina progetto: percorso e il progetto stesso, con un tipo che dipende dai link:
 * app negli store → MobileApplication, codice su GitHub → SoftwareSourceCode,
 * solo sito online → WebSite.
 */
export function projectSchema(project: Project, content: ProjectContent, lang: Lang) {
  const pageUrl = `${SITE}${lang === 'en' ? '/en' : ''}/projects/${project.slug}/`
  const { github, live, appStore, playStore } = project.links

  const common = {
    name: content.title,
    description: content.description,
    keywords: project.tags.join(', '),
    author: personRef,
  }

  let work: Record<string, unknown> | undefined
  if (appStore || playStore) {
    work = {
      '@type': 'MobileApplication',
      ...common,
      url: pageUrl,
      operatingSystem: [appStore && 'iOS', playStore && 'Android'].filter(Boolean).join(', '),
      applicationCategory: 'SportsApplication',
      // gratis su App Store e Google Play (verificato a novembre 2026)
      offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR' },
      sameAs: [appStore, playStore, live].filter(Boolean),
    }
  } else if (github) {
    work = {
      '@type': 'SoftwareSourceCode',
      ...common,
      url: pageUrl,
      codeRepository: github,
    }
  } else if (live) {
    work = { '@type': 'WebSite', ...common, url: live, subjectOf: { '@type': 'WebPage', url: pageUrl } }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema(lang, content.title, pageUrl), ...(work ? [work] : [])],
  }
}
