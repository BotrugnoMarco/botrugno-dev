// Genera le icone del sito da public/logo.png, su sfondo scuro quadrato.
// Uso: npm run icons   (da rilanciare quando cambia il logo)
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'public/logo.png')
const BG = '#080808'

const icons = [
  { file: 'apple-touch-icon.png', size: 180, pad: 0.16 }, // schermata Home di iPhone e iPad
  { file: 'icon-192.png', size: 192, pad: 0.16 },
  { file: 'icon-512.png', size: 512, pad: 0.16 },
  { file: 'icon-maskable-512.png', size: 512, pad: 0.26 }, // Android ritaglia i bordi: più margine
]

for (const { file, size, pad } of icons) {
  const inner = Math.round(size * (1 - 2 * pad))
  const logo = await sharp(src).resize(inner, inner, { fit: 'inside' }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(root, 'public', file))
  console.log(`✓ public/${file} (${size}×${size})`)
}
