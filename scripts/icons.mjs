// Genera le icone PNG del sito dalla "b" del logo (scripts/icons/b.svg), su sfondo scuro quadrato.
// Uso: npm run icons   (da rilanciare quando cambia il logo)
// public/favicon.svg è già vettoriale; public/favicon.ico (16, 32, 48 px) va rifatto a parte se cambia il segno.
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'scripts/icons/b.svg')
const BG = '#080808'

const icons = [
  { file: 'apple-touch-icon.png', size: 180, pad: 0.2 }, // schermata Home di iPhone e iPad
  { file: 'icon-192.png', size: 192, pad: 0.2 },
  { file: 'icon-512.png', size: 512, pad: 0.2 },
  { file: 'icon-maskable-512.png', size: 512, pad: 0.28 }, // Android ritaglia i bordi: più margine
]

for (const { file, size, pad } of icons) {
  const inner = Math.round(size * (1 - 2 * pad))
  const mark = await sharp(src, { density: 1200 }).resize(inner, inner, { fit: 'inside' }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public', file))
  console.log(`✓ public/${file} (${size}×${size})`)
}
