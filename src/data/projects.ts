import type { Lang } from '../i18n/ui'

export interface ProjectContent {
  title: string
  tagline: string
  description: string
  longDescription: string
  features: string[]
}

export interface Project {
  slug: string
  tags: string[]
  links: {
    github?: string
    live?: string
    appStore?: string
    playStore?: string
  }
  it: ProjectContent
  en: ProjectContent
}

export const projects: Project[] = [
  {
    slug: 'levenshtein-mysql-udf',
    tags: ['C', 'MySQL', 'MariaDB', 'Docker', 'SQL'],
    links: {
      github: 'https://github.com/BotrugnoMarco/Levenshtein-MySQL-UDF-Enhanced',
    },
    it: {
      title: 'Levenshtein MySQL UDF',
      tagline: 'Fuzzy matching direttamente in SQL.',
      description:
        'User Defined Function in C per MySQL/MariaDB che calcola la distanza di Levenshtein tra stringhe, abilitando ricerca fuzzy e deduplication a livello database.',
      longDescription: `La distanza di Levenshtein misura il numero minimo di operazioni (inserimento, cancellazione, sostituzione) necessarie per trasformare una stringa in un'altra. Implementare questo calcolo a livello applicativo significa trasferire dati tra DB e app solo per poi fare un match: lento e costoso.

Questa UDF sposta il calcolo direttamente dentro MySQL/MariaDB come funzione SQL nativa, eliminando il round-trip e permettendo di filtrare, ordinare e indicizzare per similarità testuale con una semplice query.

Il codice è scritto in C puro, compilato come shared library (.so) e caricato via CREATE FUNCTION. Include supporto Docker per lo sviluppo e un set di unit test e benchmark per verificare correttezza e performance su stringhe di varia lunghezza.`,
      features: [
        'Case-insensitive di default, con flag opzionale per case-sensitive',
        'Gestione corretta di NULL e stringhe vuote',
        'Nessuna dipendenza esterna — C puro + librerie MySQL dev',
        'Containerizzazione Docker per build e test riproducibili',
        'Unit test e benchmark integrati',
      ],
    },
    en: {
      title: 'Levenshtein MySQL UDF',
      tagline: 'Fuzzy matching directly in SQL.',
      description:
        'A C-based User Defined Function for MySQL/MariaDB that calculates Levenshtein distance between strings, enabling fuzzy search and deduplication at the database level.',
      longDescription: `The Levenshtein distance measures the minimum number of operations (insertions, deletions, substitutions) required to transform one string into another. Implementing this at the application level means transferring data between the DB and the app just to do matching — slow and expensive.

This UDF moves the calculation directly into MySQL/MariaDB as a native SQL function, eliminating the round-trip and allowing filtering, sorting, and indexing by text similarity with a simple query.

The code is written in pure C, compiled as a shared library (.so) and loaded via CREATE FUNCTION. It includes Docker support for development and a set of unit tests and benchmarks to verify correctness and performance on strings of various lengths.`,
      features: [
        'Case-insensitive by default, with optional flag for case-sensitive mode',
        'Correct handling of NULL inputs and empty strings',
        'No external dependencies — pure C + MySQL dev libraries',
        'Docker containerization for reproducible builds and tests',
        'Integrated unit tests and benchmarks',
      ],
    },
  },
  {
    slug: 'matchready',
    tags: ['Vue 3', 'Ionic', 'Capacitor', 'Node.js', 'MySQL', 'Redis', 'Socket.io', 'Firebase'],
    links: {
      github: 'https://github.com/BotrugnoMarco',
      appStore: 'https://apps.apple.com/it/app/match-ready-organizza-partite/id6761014180',
      playStore: 'https://play.google.com/store/apps/details?id=dev.botrugno.matchday',
    },
    it: {
      title: 'Match Ready',
      tagline: "Organizza partite amatoriali di qualsiasi sport. Tutto in un'app.",
      description:
        "WebApp mobile-first per la gestione di partite amatoriali: eventi, formazioni, chat real-time, pagelle post-partita e classifiche. Monorepo con frontend Vue/Ionic, backend Node.js e app nativa Android. Pubblicata su App Store e Play Store.",
      longDescription: `Match Ready nasce dall'esigenza concreta di organizzare partite tra amici senza il caos dei gruppi WhatsApp. È una WebApp mobile-first costruita come monorepo: frontend Vue 3 + Ionic, backend Node.js/Express, e una landing page statica — tutto sviluppato e mantenuto da solo.

Il frontend usa Vue 3 (Composition API) con Ionic per i componenti mobile-native e Capacitor per il deploy Android. La navigazione è ottimizzata per touch, le mappe sono gestite con Leaflet per la selezione interattiva del campo da gioco.

Il backend espone API REST e WebSocket (Socket.io) con autenticazione JWT, rate limiting e sicurezza via Helmet. MySQL gestisce i dati relazionali, Redis le sessioni e il pub/sub real-time. Firebase Cloud Messaging invia notifiche push a iOS e Android per ogni evento di dominio rilevante.

La parte più interessante è il sistema di gamification post-partita: votazione dei giocatori, calcolo automatico delle pagelle, MVP della partita e classifiche cumulative della stagione.`,
      features: [
        'Creazione eventi con data, luogo, costi e gestione posti',
        'Formazioni interattive (Team A vs Team B) con drag-and-drop',
        "Real-time via Socket.io (sala d'attesa, aggiornamento posti, chat)",
        'Votazione post-partita, pagelle, MVP e classifiche stagione',
        'Mappe interattive (Leaflet) per la selezione del campo',
        'Notifiche push iOS/Android tramite Firebase Cloud Messaging',
        'App Android nativa via Capacitor, pubblicata su Play Store',
      ],
    },
    en: {
      title: 'Match Ready',
      tagline: 'Organize amateur matches for any sport. All in one app.',
      description:
        'A mobile-first WebApp for managing amateur sports matches: events, line-ups, real-time chat, post-match ratings and leaderboards. Monorepo with Vue/Ionic frontend, Node.js backend and native Android app. Published on the App Store and Play Store.',
      longDescription: `Match Ready was born out of a real need to organize matches with friends without the chaos of WhatsApp groups. It's a mobile-first WebApp built as a monorepo: Vue 3 + Ionic frontend, Node.js/Express backend, and a static landing page — all developed and maintained solo.

The frontend uses Vue 3 (Composition API) with Ionic for mobile-native components and Capacitor for Android deployment. Navigation is optimized for touch, with Leaflet handling interactive map-based field selection.

The backend exposes REST APIs and WebSockets (Socket.io) with JWT authentication, rate limiting and Helmet security. MySQL handles relational data, Redis manages sessions and real-time pub/sub. Firebase Cloud Messaging delivers push notifications to iOS and Android for every relevant domain event.

The most interesting part is the post-match gamification system: player voting, automatic ratings calculation, match MVP and cumulative season leaderboards.`,
      features: [
        'Event creation with date, venue, costs and seat management',
        'Interactive line-ups (Team A vs Team B) with drag-and-drop',
        'Real-time via Socket.io (waiting room, seat updates, chat)',
        'Post-match voting, ratings, MVP and season leaderboards',
        'Interactive maps (Leaflet) for field selection',
        'iOS/Android push notifications via Firebase Cloud Messaging',
        'Native Android app via Capacitor, published on Play Store',
      ],
    },
  },
  {
    slug: 'botrino',
    tags: ['Python', 'discord.py', 'MySQL'],
    links: {
      github: 'https://github.com/BotrugnoMarco/botrino',
      live: 'https://discord.gg/SDqusrZbZg',
    },
    it: {
      title: 'Botrino',
      tagline: 'Bot Discord per community — XP, ruoli automatici e analytics vocali.',
      description:
        'Bot Discord open source per aumentare l\'engagement di un server. Sistema XP con ruoli automatici al salire di livello, report sulle sessioni vocali, classifiche e comandi utente. Architettura modulare a Cogs.',
      longDescription: `Botrino nasce dalla voglia di rendere un server Discord più vivo e coinvolgente senza dipendere da bot esterni generici. L'idea di base è semplice: premiare chi partecipa, tenere traccia di chi è attivo e dare ai moderatori una vista chiara sull'andamento della community.

Il bot è scritto in Python con discord.py e segue un'architettura a Cogs — ogni funzionalità è un modulo indipendente, caricabile e aggiornabile a caldo senza riavviare il processo. I dati vengono persistiti su MySQL: utenti, punti XP, sessioni vocali, storico dei livelli.

Il sistema XP tiene conto di messaggi, tempo trascorso nei canali vocali e reazioni. Al raggiungimento di ogni soglia di livello, il bot assegna automaticamente il ruolo corrispondente e notifica il canale. I report vocali vengono generati sia su richiesta che in automatico a fine giornata.

La live demo gira attualmente sul mio server Discord personale.`,
      features: [
        'Sistema XP multi-sorgente: messaggi, tempo vocale, reazioni',
        'Ruoli automatici assegnati al raggiungimento di ogni soglia di livello',
        'Report sessioni vocali giornalieri e su richiesta (!report)',
        'Classifiche XP e tempo vocale (!leaderboard)',
        'Architettura a Cogs per aggiornamenti a caldo senza downtime',
      ],
    },
    en: {
      title: 'Botrino',
      tagline: 'Discord community bot — automated engagement through XP, roles and voice analytics.',
      description:
        'Open-source Discord bot for community management. XP system with automatic role assignment on level-up, voice session reports, leaderboards and user commands. Modular Cogs architecture.',
      longDescription: `Botrino was built out of a desire to make a Discord server more lively and engaging without relying on generic external bots. The core idea is simple: reward participation, track activity, and give moderators a clear view of how the community is doing.

The bot is written in Python with discord.py and follows a Cogs architecture — each feature is an independent module that can be loaded and updated on the fly without restarting the process. Data is persisted in MySQL: users, XP points, voice sessions, level history.

The XP system tracks messages, time spent in voice channels and reactions. When a level threshold is reached, the bot automatically assigns the corresponding role and notifies the channel. Voice reports are generated both on demand and automatically at the end of each day.

The live demo is currently running on my personal Discord server.`,
      features: [
        'Multi-source XP system: messages, voice time, reactions',
        'Automatic role assignment when each level threshold is reached',
        'Daily and on-demand voice session reports (!report)',
        'XP and voice time leaderboards (!leaderboard)',
        'Cogs architecture for hot-reload updates with zero downtime',
      ],
    },
  },
  {
    slug: 'shipflow',
    tags: ['React', 'TypeScript', 'Fastify', 'Prisma', 'MySQL', 'SaaS'],
    links: {
      github: 'https://github.com/BotrugnoMarco/shipflow',
    },
    it: {
      title: 'ShipFlow',
      tagline: 'Gestionale SaaS multi-tenant per spedizioni aziendali.',
      description:
        'Piattaforma B2B per la gestione end-to-end di spedizioni aziendali. Architettura multi-tenant con isolamento completo dei dati per tenant, tracciamento stati, gestione clienti e vettori, controllo accessi per ruoli.',
      longDescription: `ShipFlow nasce da una proposta commerciale concreta: automatizzare la logistica di un'azienda di spedizioni che gestiva tutto su fogli Excel. L'architettura multi-tenant garantisce l'isolamento completo dei dati tra le aziende cliente — ogni tenant vede solo i propri dati, senza possibilità di contaminazione.

Il frontend è costruito con React 18 e TypeScript su Vite, con Tailwind CSS per lo stile e React Router v6 per la navigazione. L'interfaccia distingue due livelli di utenza: operatori (gestione quotidiana delle spedizioni) e amministratori (configurazione vettori, accessi e tariffe).

Il backend usa Fastify per le API REST, Prisma ORM per l'accesso al database MySQL e JWT + bcrypt per l'autenticazione. Ogni richiesta è contestualizzata al tenant dell'utente autenticato, rendendo impossibile l'accesso cross-tenant.

Il ciclo di vita di ogni spedizione — dalla ricezione all'archivio — è tracciato con stati transizionali e supporto per operazioni in massa e azioni di revert.`,
      features: [
        'Architettura multi-tenant con isolamento completo dei dati per azienda',
        'Tracciamento spedizioni con stati transizionali (In Sospeso → In Transito → Consegnato)',
        'Gestione clienti e vettori con tariffe e credenziali API',
        'Controllo accessi basato su ruoli (operatore / amministratore)',
        'Operazioni in massa e azioni di revert sulle spedizioni',
        'Internazionalizzazione interfaccia IT/EN',
      ],
    },
    en: {
      title: 'ShipFlow',
      tagline: 'Multi-tenant SaaS management platform for logistics.',
      description:
        'B2B platform for end-to-end management of company shipments. Multi-tenant architecture with complete data isolation per tenant, status tracking, customer and carrier management, and role-based access control.',
      longDescription: `ShipFlow was born from a concrete business proposal: automating logistics for a shipping company that managed everything in Excel sheets. The multi-tenant architecture guarantees complete data isolation between client companies — each tenant sees only their own data, with no cross-contamination possible.

The frontend is built with React 18 and TypeScript on Vite, using Tailwind CSS for styling and React Router v6 for navigation. The interface distinguishes two user levels: operators (day-to-day shipment management) and administrators (carrier configuration, access management and rates).

The backend uses Fastify for REST APIs, Prisma ORM for MySQL database access, and JWT + bcrypt for authentication. Every request is scoped to the tenant of the authenticated user, making cross-tenant access impossible.

The lifecycle of each shipment — from intake to archive — is tracked with transitional states and support for bulk operations and revert actions.`,
      features: [
        'Multi-tenant architecture with complete data isolation per company',
        'Shipment tracking with transitional states (Pending → In Transit → Delivered)',
        'Customer and carrier management with rates and API credentials',
        'Role-based access control (operator / administrator)',
        'Bulk operations and revert actions on shipments',
        'Interface internationalization IT/EN',
      ],
    },
  },
  {
    slug: 'algorhythm',
    tags: ['Python', 'Streamlit', 'Spotify API', 'Gemini AI', 'Plotly'],
    links: {
      github: 'https://github.com/BotrugnoMarco/algorhythm',
    },
    it: {
      title: 'AlgoRhythm',
      tagline: 'La tua libreria Spotify, organizzata dall\'AI.',
      description:
        'App web che si connette al tuo account Spotify e usa Google Gemini per classificare automaticamente i brani salvati per genere, mood e decennio — generando playlist tematiche direttamente sul profilo.',
      longDescription: `AlgoRhythm parte da un problema concreto: librerie Spotify con centinaia di brani salvati senza struttura. L'app si autentica via OAuth2, scarica tutti i brani salvati e li passa a Google Gemini Flash per una classificazione batch per genere e mood.

Il classificatore usa una cache persistente per rendere il processo riprendibile: se l'elaborazione si interrompe, riparte dal punto esatto senza riclassificare i brani già processati. La classificazione per decennio avviene in modo deterministico, senza bisogno di AI.

Il risultato è una dashboard analitica interattiva (Plotly) con la distribuzione della libreria per genere, mood, decennio e popolarità. Da lì, con un click, l'app crea e popola automaticamente le playlist sull'account Spotify dell'utente.

L'interfaccia è costruita con Streamlit e divisa in quattro sezioni: tracce classificate, dashboard, creazione playlist e impostazioni per personalizzare le categorie.`,
      features: [
        'Autenticazione Spotify via OAuth2 con gestione sicura del token',
        'Classificazione AI batch (Google Gemini Flash) per genere e mood',
        'Cache persistente: classificazione riprendibile senza perdere lavoro',
        'Raggruppamento deterministico per decennio di uscita',
        'Dashboard analitica interattiva con grafici Plotly',
        'Creazione e popolamento automatico di playlist sull\'account Spotify',
      ],
    },
    en: {
      title: 'AlgoRhythm',
      tagline: 'Your Spotify library, organized by AI.',
      description:
        'Web app that connects to your Spotify account and uses Google Gemini to automatically classify saved tracks by genre, mood and decade — generating themed playlists directly on your profile.',
      longDescription: `AlgoRhythm addresses a concrete problem: Spotify libraries with hundreds of saved tracks and no structure. The app authenticates via OAuth2, downloads all saved tracks and passes them to Google Gemini Flash for batch classification by genre and mood.

The classifier uses a persistent cache to make the process resumable: if processing is interrupted, it picks up from the exact point without reclassifying already processed tracks. Decade-based classification is handled deterministically, without AI.

The result is an interactive analytics dashboard (Plotly) showing the library's distribution by genre, mood, decade and popularity. From there, with one click, the app automatically creates and populates playlists on the user's Spotify account.

The interface is built with Streamlit and split into four sections: classified tracks, dashboard, playlist creation and settings to customize categories.`,
      features: [
        'Spotify OAuth2 authentication with secure token management',
        'Batch AI classification (Google Gemini Flash) by genre and mood',
        'Persistent cache: resumable classification without losing progress',
        'Deterministic grouping by release decade',
        'Interactive analytics dashboard with Plotly charts',
        'Automatic creation and population of playlists on the Spotify account',
      ],
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectContent(project: Project, lang: Lang): ProjectContent {
  return project[lang]
}
