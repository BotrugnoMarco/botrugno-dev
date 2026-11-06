// Numeri reali di Match Ready, letti dal suo backend quando il sito viene compilato.
//
// Non a ogni visita: così il sito resta statico, gli IP dei visitatori non arrivano al backend
// e la pagina privacy non deve cambiare. Sul server i numeri si aggiornano ogni notte con
// scripts/aggiorna-numeri.sh. Se il backend non risponde la riga non compare, e la build passa:
// un numero inventato o vecchio di mesi è peggio di nessun numero.
export interface MatchReadyStats {
  matches_played: number
  appearances: number
  ratings: number
}

const STATS_URL = process.env.MATCHREADY_STATS_URL ?? 'https://matchready.botrugno.dev/api/public/stats'

let request: Promise<MatchReadyStats | null> | undefined

const load = async (): Promise<MatchReadyStats | null> => {
  try {
    const response = await fetch(STATS_URL, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error(`risposta ${response.status}`)
    const stats = await response.json() as MatchReadyStats
    const valid = [stats.matches_played, stats.appearances, stats.ratings].every((n) => Number.isInteger(n) && n > 0)
    if (!valid) throw new Error('numeri non validi')
    return stats
  } catch (error) {
    console.warn(`[matchreadyStats] numeri di Match Ready non disponibili (${STATS_URL}): ${(error as Error).message}`)
    return null
  }
}

/** Una sola richiesta per build, anche se il componente compare in due lingue. */
export const getMatchReadyStats = () => (request ??= load())
