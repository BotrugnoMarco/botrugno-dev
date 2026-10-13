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
├── logo.svg                    # Logo: "botrugno" con la b tagliata in rosso e blu
├── favicon.svg                 # La sola b, su quadrato scuro
├── favicon.ico                 # La stessa, 16/32/48 px per i browser che non leggono l'SVG
├── apple-touch-icon.png, icon-*.png   # Icone per iPhone e Android (npm run icons)
├── og.png                      # Anteprima 1200×630 per i link condivisi
├── robots.txt
├── CV_Marco_Luigi_Botrugno.pdf    # CV italiano, generato da cv/ (vedi sotto)
└── CV_Marco_Luigi_Botrugno_EN.pdf # CV inglese
cv/                             # Sorgente del CV in PDF (HTML + foto + logo)
scripts/og/                     # Sorgente dell'immagine og.png
scripts/icons/b.svg             # La b da cui npm run icons genera le icone PNG
docs/nginx/                     # Configurazione nginx del server (sito + header di sicurezza)
.github/                        # CI (build + controllo link) e Dependabot
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

## CV in PDF

Il PDF pubblico non contiene dati personali (niente indirizzo né telefono) ed è versionato in `public/`.
Per aggiornarli modifica `cv/cv-it.html` e `cv/cv-en.html`, poi:

```bash
npm i -D playwright && npx playwright install chromium   # solo la prima volta
npm run cv                                               # rigenera i due PDF in public/
```

## Deploy

`deploy.sh` sul server fa pull, `npm ci`, build e ricarica nginx. Il CV arriva in `dist/` con la build:
non serve più copiarlo a mano. Configurazione nginx (header di sicurezza, cache, 404): vedi `docs/nginx/`.
