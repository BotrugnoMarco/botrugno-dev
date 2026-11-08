// Schermate di ledimoredidaniela.it per la pagina progetto e la home, in italiano e inglese.
// Le prende dal sito online e le salva in src/assets/ledimoredidaniela/<lingua>/.
//
// Uso:  node scripts/ledimoredidaniela-shots.mjs
// Serve Playwright con Chromium: npm i -D playwright && npx playwright install chromium

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { mkdir } from 'node:fs/promises'
import { chromium, devices } from 'playwright'

const SITE = 'https://ledimoredidaniela.it'
const here = path.dirname(fileURLToPath(import.meta.url))
const langs = [
  { lang: 'it', home: '/', request: '/richiesta' },
  { lang: 'en', home: '/en/', request: '/en/request' },
]

// Scorre la pagina per far caricare le immagini lazy, poi torna in cima
async function loadAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 100))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)
}

const browser = await chromium.launch()
for (const { lang, home, request } of langs) {
  const out = path.join(here, '../src/assets/ledimoredidaniela', lang)
  await mkdir(out, { recursive: true })

  // Desktop: prima schermata della home (titolo e mosaico di foto)
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  await desktop.goto(SITE + home, { waitUntil: 'load' })
  await loadAll(desktop)
  await desktop.screenshot({ path: path.join(out, 'desktop.jpg'), quality: 85 })
  await desktop.close()

  const phone = await browser.newPage({ ...devices['iPhone 13'] })

  // Telefono: inizio della home
  await phone.goto(SITE + home, { waitUntil: 'load' })
  await loadAll(phone)
  await phone.screenshot({ path: path.join(out, 'mobile-home.jpg'), quality: 85 })

  // Telefono: "Informazioni utili" (quarto titolo di sezione)
  await phone.evaluate(() => {
    const h2 = document.querySelectorAll('main h2')[3]
    window.scrollTo(0, h2.getBoundingClientRect().top + window.scrollY - 80)
  })
  await phone.waitForTimeout(500)
  await phone.screenshot({ path: path.join(out, 'mobile-info.jpg'), quality: 85 })

  // Telefono: modulo di richiesta con il calendario aperto
  await phone.goto(SITE + request, { waitUntil: 'load' })
  await phone.waitForTimeout(1000)
  await phone.locator('.date-trigger').first().click()
  await phone.waitForTimeout(800)
  // il calendario si apre sotto i campi: scorre fino al campo "Partenza" per mostrarlo intero
  await phone.evaluate(() => {
    const field = document.querySelectorAll('.date-trigger')[1]
    window.scrollTo(0, field.getBoundingClientRect().top + window.scrollY - 140)
  })
  await phone.waitForTimeout(500)
  await phone.screenshot({ path: path.join(out, 'mobile-calendar.jpg'), quality: 85 })
  await phone.close()

  console.log(`✓ ${lang}`)
}
await browser.close()
