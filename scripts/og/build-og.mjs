// Genera public/og.png da scripts/og/og.html, a doppia risoluzione (2400×1260).
// Uso: npm run og   (serve Playwright, come per npm run cv)
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
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 })
await page.goto(pathToFileURL(path.join(here, 'og.html')).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: path.join(here, '../../public/og.png') })
await browser.close()
console.log('✓ public/og.png (2400×1260)')
