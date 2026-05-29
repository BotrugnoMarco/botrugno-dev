import { ui, type Lang, type UiKey } from './ui'

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return (ui[lang][key] ?? ui['it'][key]) as string
  }
}

export function getLangFromUrl(url: URL): Lang {
  const segments = url.pathname.split('/')
  if (segments[1] === 'en') return 'en'
  return 'it'
}

export function getAlternatePath(lang: Lang, url: URL): string {
  const path = url.pathname
  if (lang === 'it') {
    // Siamo in italiano, il link va alla versione inglese
    return `/en${path === '/' ? '/' : path}`
  } else {
    // Siamo in inglese, il link va alla versione italiana
    return path.replace(/^\/en/, '') || '/'
  }
}
