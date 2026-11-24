// Genera le immagini a doppia risoluzione:
//   npm run og    → public/og.png da og.html (2400×1260, anteprima dei link della home e delle pagine senza la loro)
//                   e public/og/<pagina>.png da page.html: una per progetto (presa da src/data/projects.ts) e una per il CV in ogni lingua
//   npm run kofi  → scripts/og/kofi.png da kofi.html (2400×800, copertina Ko-fi, 3:1)
// Serve Playwright, come per npm run cv.
// Una pagina senza la sua immagine usa og.png (vedi Layout.astro): un progetto nuovo non rompe la build.
import { fileURLToPath, pathToFileURL } from 'node:url'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { projects } from '../../src/data/projects.ts'

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright non trovato. Installa con:\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

const here = path.dirname(fileURLToPath(import.meta.url))
const pub = path.join(here, '../../public')

const OG = { width: 1200, height: 630 }
const pageImages = [
  ...projects.map((p) => ({ title: p.it.title, out: `og/${p.slug}.png` })),
  { title: 'Curriculum Vitae', out: 'og/cv-it.png' },
  { title: 'Resume', out: 'og/cv-en.png' },
]

const sets = {
  og: [
    { html: 'og.html', out: path.join(pub, 'og.png'), ...OG },
    ...pageImages.map((p) => ({ html: 'page.html', title: p.title, out: path.join(pub, p.out), ...OG })),
  ],
  kofi: [{ html: 'kofi.html', out: path.join(here, 'kofi.png'), width: 1200, height: 400 }],
}
const name = process.argv[2] ?? 'og'
const images = sets[name]
if (!images) {
  console.error(`Immagine sconosciuta: ${name}. Valori ammessi: ${Object.keys(sets).join(', ')}`)
  process.exit(1)
}

mkdirSync(path.join(pub, 'og'), { recursive: true })
const browser = await chromium.launch()
for (const img of images) {
  const page = await browser.newPage({ viewport: { width: img.width, height: img.height }, deviceScaleFactor: 2 })
  await page.goto(pathToFileURL(path.join(here, img.html)).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  if (img.title) {
    // Scrive il titolo e riduce il carattere finché sta su una riga
    await page.evaluate((title) => {
      const h1 = document.getElementById('title')
      h1.textContent = title
      let size = 100
      while (h1.scrollWidth > h1.parentElement.clientWidth && size > 40) h1.style.fontSize = `${(size -= 2)}px`
    }, img.title)
  }
  await page.screenshot({ path: img.out })
  await page.close()
  console.log(`✓ ${path.relative(process.cwd(), img.out)} (${img.width * 2}×${img.height * 2})`)
}
await browser.close()
