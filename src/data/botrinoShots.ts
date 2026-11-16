// Schermate di Botrino per la pagina progetto (/projects/botrino/ e /en/projects/botrino/).
//
// Per aggiungerne una:
//   1. salva l'immagine in src/assets/botrino/ (png, jpg o webp). Compaiono in ordine di nome,
//      quindi conviene numerarle: 01-classifica.png, 02-report-vocale.png, ...
//   2. aggiungi qui sotto la descrizione per chi non vede l'immagine, in italiano e inglese,
//      con la chiave uguale al nome del file.
// Se un'immagine nella cartella non ha la descrizione, la build si ferma con un errore.
// Prima di salvarle, coprire nomi e avatar degli utenti del server che non vogliono comparire.
// Senza immagini la sezione non compare.

export const botrinoShots: Record<string, { it: string; en: string }> = {
  '01-classifica.png': {
    it: 'Risposta a !leaderboard: i primi dieci per tempo totale nei canali vocali, con il livello di ciascuno.',
    en: 'Reply to !leaderboard: the top ten by total time in voice channels, with each member’s level.',
  },
  '02-report-vocale.png': {
    it: 'Report automatico delle ultime 24 ore: tempo totale in vocale, presenti, classifica dei più assidui e canali più usati.',
    en: 'Automatic report for the last 24 hours: total voice time, members present, ranking of the most active and busiest channels.',
  },
  '03-report-settimanale.png': {
    it: 'Report settimanale del lunedì: tempo totale in vocale, presenti e classifica completa della settimana.',
    en: 'Monday weekly report: total voice time, members present and the full ranking for the week.',
  },
  '04-albo-onore.png': {
    it: 'Albo d’Onore: i record del server, tra cui XP in un giorno, sessione vocale più lunga, tempo notturno e messaggi.',
    en: 'Hall of fame: the server records, including XP in one day, longest voice session, night-time hours and messages.',
  },
  '05-profilo.png': {
    it: 'Risposta a !profile: livello e barra XP, messaggi, tempo in vocale, giorni di fila, record personali e traguardi sbloccati.',
    en: 'Reply to !profile: level and XP bar, messages, voice time, daily streak, personal records and unlocked achievements.',
  },
}
