// Genera i CV in PDF in public/: italiano da cv/cv-it.html, inglese da cv/cv-en.html.
//
// Uso:  npm run cv
// La prima volta serve Playwright con Chromium (non è tra le dipendenze del sito,
// così il deploy sul server resta leggero):
//   npm i -D playwright && npx playwright install chromium

import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright non trovato. Installa con:\n  npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

const here = path.dirname(fileURLToPath(import.meta.url))
const jobs = [
  { src: 'cv-it.html', out: '../public/CV_Marco_Luigi_Botrugno.pdf' },
  { src: 'cv-en.html', out: '../public/CV_Marco_Luigi_Botrugno_EN.pdf' },
]

const browser = await chromium.launch()
const page = await browser.newPage()
for (const { src, out } of jobs) {
  await page.goto(pathToFileURL(path.join(here, src)).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.join(here, out), format: 'A4', printBackground: true, preferCSSPageSize: true })
  console.log(`✓ ${src} → ${path.normalize(out)}`)
}
await browser.close()
