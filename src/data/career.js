// Date personali usate per i numeri che cambiano con il tempo: un solo punto da aggiornare.
// Usato dal sito (CV.astro, About.astro) e da cv/build-cv.mjs per i PDF.

// Anni di esperienza, dall'inizio in BarbarHouse (marzo 2022)
export const WORK_START = { year: 2022, month: 3 }

export function yearsOfExperience(now = new Date()) {
  const months = (now.getFullYear() - WORK_START.year) * 12 + (now.getMonth() + 1 - WORK_START.month)
  return Math.floor(months / 12)
}

// Età, dalla data di nascita (1 agosto 2001)
export const BIRTH_DATE = { year: 2001, month: 8, day: 1 }

export function age(now = new Date()) {
  const beforeBirthday =
    now.getMonth() + 1 < BIRTH_DATE.month ||
    (now.getMonth() + 1 === BIRTH_DATE.month && now.getDate() < BIRTH_DATE.day)
  return now.getFullYear() - BIRTH_DATE.year - (beforeBirthday ? 1 : 0)
}
