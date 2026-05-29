# botrugno.dev — Portfolio personale

Portfolio personale di Marco Luigi Botrugno, sviluppatore Full-Stack.

## Stack

- [Astro 6](https://astro.build) — framework SSG
- [Tailwind CSS 4](https://tailwindcss.com) — utility-first CSS
- i18n integrato — IT (default) e EN (`/en/`)

## Struttura

```
src/
├── components/       # Navbar, Hero, About, MatchReady, Projects, Contact, CV
├── data/
│   └── projects.ts   # Dati dei progetti (IT + EN)
├── i18n/
│   ├── ui.ts         # Stringhe tradotte
│   └── utils.ts      # getLangFromUrl, useTranslations, getAlternatePath
├── layouts/
│   └── Layout.astro  # HTML base, meta OG, font, IntersectionObserver
├── pages/
│   ├── index.astro
│   ├── cv.astro
│   ├── 404.astro
│   ├── projects/[slug].astro
│   └── en/           # Stesse pagine in inglese
└── styles/
    ├── global.css
    └── components.css
public/
├── logo.png
├── favicon.ico
├── robots.txt
└── CV_Marco_Luigi_Botrugno.pdf
```

## Pagine

| Route | Descrizione |
|---|---|
| `/` | Home (IT) — Hero, About, MatchReady, Projects, Contact |
| `/en/` | Home (EN) |
| `/projects/[slug]` | Dettaglio progetto (IT) |
| `/en/projects/[slug]` | Dettaglio progetto (EN) |
| `/cv` | Curriculum Vitae (IT) |
| `/en/cv` | Curriculum Vitae (EN) |

## Comandi

```bash
npm install       # installa le dipendenze
npm run dev       # dev server su localhost:4321
npm run build     # build in ./dist/
npm run preview   # anteprima della build
```

## Aggiungere un progetto

1. Aggiungere una voce all'array `projects` in `src/data/projects.ts` con i campi `slug`, `tags`, `links`, `it` e `en`
2. La pagina detail viene generata automaticamente da `[slug].astro`
