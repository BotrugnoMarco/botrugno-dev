// Aggiunge <lastmod> alla sitemap con la data in cui è cambiato davvero il testo di ogni pagina.
//
// Il sito si ricompila a ogni deploy e ogni notte (scripts/aggiorna-numeri.sh): la data della
// build direbbe a Google che tutto cambia sempre, e Google smetterebbe di fidarsi del lastmod.
// Qui invece si calcola un hash del testo dentro <main> (senza markup, classi e nomi dei file,
// che cambiano anche quando il contenuto resta uguale) e lo si confronta con quello della build
// precedente, salvato in .cache/lastmod.json (fuori da git: sul server resta tra un deploy e l'altro).
// Pagina nuova o testo diverso → data di oggi; altrimenti resta la data salvata.
//
// Va messa dopo sitemap() in astro.config.mjs, perché lavora sul file che la sitemap ha già scritto.
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

function pageText(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html
  return main
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<img[^>]*\balt="([^"]*)"[^>]*>/g, ' $1 ') // il testo alternativo delle immagini conta
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function lastmod() {
  let root
  let site
  return {
    name: 'lastmod',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root)
        site = config.site.replace(/\/$/, '')
      },
      'astro:build:done': ({ dir, logger }) => {
        const outDir = fileURLToPath(dir)
        const statePath = join(root, '.cache', 'lastmod.json')
        const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {}
        const today = new Date().toISOString().slice(0, 10)
        let changed = 0

        const sitemaps = readdirSync(outDir).filter((f) => /^sitemap-\d+\.xml$/.test(f))
        for (const file of sitemaps) {
          const path = join(outDir, file)
          const xml = readFileSync(path, 'utf8').replace(/<url><loc>([^<]+)<\/loc>/g, (match, loc) => {
            const pathname = loc.slice(site.length)
            const htmlPath = join(outDir, pathname, 'index.html')
            if (!existsSync(htmlPath)) return match
            const hash = createHash('sha256').update(pageText(readFileSync(htmlPath, 'utf8'))).digest('hex').slice(0, 16)
            if (state[pathname]?.hash !== hash) {
              state[pathname] = { hash, lastmod: today }
              changed++
            }
            return `${match}<lastmod>${state[pathname].lastmod}</lastmod>`
          })
          writeFileSync(path, xml)
        }

        mkdirSync(dirname(statePath), { recursive: true })
        writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n')
        logger.info(`lastmod: ${changed} pagine con il testo cambiato`)
      },
    },
  }
}
