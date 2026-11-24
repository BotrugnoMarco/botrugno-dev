import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Aggiunge ?v=<hash del contenuto> a un file di public/, calcolato alla build.
// Quando il file cambia cambia anche l'indirizzo: Cloudflare e i browser scaricano
// la versione nuova senza dover svuotare la cache a mano.
export function versioned(publicPath: string): string {
  const file = join(process.cwd(), 'public', publicPath)
  const hash = createHash('sha256').update(readFileSync(file)).digest('hex').slice(0, 8)
  return `${publicPath}?v=${hash}`
}

/** true se il file esiste in public/ (per esempio l'anteprima di una pagina generata con npm run og) */
export function inPublic(publicPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', publicPath))
}
