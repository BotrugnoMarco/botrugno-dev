import type { Lang } from '../i18n/ui'

export interface ProjectContent {
  title: string
  tagline: string
  description: string
  /** Testo breve per Google (meta description), al massimo 155 caratteri */
  metaDescription: string
  /** Panoramica in paragrafi separati da una riga vuota; non serve se c'è caseStudy */
  longDescription?: string
  /** Case study al posto della panoramica (vedi CaseStudy.astro) */
  caseStudy?: CaseStudySection[]
  features: string[]
}

/**
 * Un blocco del case study: una stringa è un paragrafo, un array è un elenco puntato.
 * Un paragrafo con {matches}, {appearances} e {ratings} mostra i numeri di Match Ready
 * letti alla build (matchreadyStats.ts); se il backend non risponde, il paragrafo sparisce.
 */
export type CaseStudyBlock = string | string[]

export interface CaseStudySection {
  title: string
  blocks: CaseStudyBlock[]
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
      metaDescription: 'Funzione in C per MySQL e MariaDB che calcola la distanza di Levenshtein tra stringhe: ricerca fuzzy e deduplica direttamente nel database.',
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
      metaDescription: 'A C function for MySQL and MariaDB that computes Levenshtein distance between strings, for fuzzy search and deduplication right in the database.',
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
      // repo privato: niente link GitHub
      live: 'https://matchready.botrugno.dev/landing.html',
      appStore: 'https://apps.apple.com/it/app/match-ready-organizza-partite/id6761014180',
      playStore: 'https://play.google.com/store/apps/details?id=dev.botrugno.matchday',
    },
    it: {
      title: 'Match Ready',
      tagline: "Organizza partite amatoriali di qualsiasi sport. Tutto in un'app.",
      description:
        "WebApp mobile-first per la gestione di partite amatoriali di calcio, padel, tennis, pallavolo e basket: iscrizioni, formazioni, chat real-time, pagelle post-partita e classifica. Monorepo con frontend Vue/Ionic, backend Node.js e app native iOS e Android. Pubblicata su App Store e Play Store.",
      metaDescription: 'Match Ready, app iOS e Android per organizzare partite amatoriali tra amici: eventi, formazioni, chat in tempo reale, pagelle e classifiche.',
      caseStudy: [
        {
          title: 'Il problema',
          blocks: [
            "Ogni settimana, nel gruppo del calcetto, la stessa scena: decine di messaggi per capire chi c'è, qualcuno che si ritira all'ultimo e la caccia al decimo giocatore. Poi le squadre, fatte a occhio, che finiscono 9 a 1.",
            "Match Ready toglie tutta questa parte. Crei la partita, mandi il link nel gruppo, vedi chi c'è e quanti posti mancano, e le squadre si fanno in base al livello di ognuno. A fine partita ci si danno i voti, si elegge l'MVP e arrivano premi e badge.",
          ],
        },
        {
          title: 'Cosa ho fatto',
          blocks: [
            "L'ho progettata e sviluppata da solo, nel tempo libero: app iOS e Android, web app, backend, server e pubblicazione sugli store. Ho iniziato a dicembre 2025 e oggi è su App Store e Google Play. A luglio 2026 si è aggiunto il basket, a fine ottobre la versione 3.0 ha rifatto da capo la grafica.",
          ],
        },
        {
          title: 'Come è fatta',
          blocks: [
            [
              'Interfaccia: un solo codice per tre piattaforme, con Vue 3 e Ionic; Capacitor produce le app native per iOS e Android.',
              'Backend: Node.js con Express e MySQL.',
              'Tempo reale: Socket.io per posti, chat e voti, con Redis che distribuisce gli eventi tra le istanze del server.',
              'Notifiche push: Firebase.',
              'Server: una VPS con nginx e PM2.',
              'Servizi esterni: meteo da OpenMeteo, indirizzi da OpenStreetMap.',
            ],
          ],
        },
        {
          title: 'La parte difficile: il voto',
          blocks: [
            'Il voto è il punto in cui un errore lascia il segno. Un voto perso o contato due volte cambia il livello di un giocatore, e il livello decide le squadre delle partite successive.',
            'Il calcolo:',
            [
              "ogni votante ha un'affidabilità: chi vota in linea con gli altri pesa di più, chi vota a caso o per ripicca sempre meno;",
              "i voti isolati e lontani dalla media (scostamento assoluto e z-score) pesano poco e abbassano l'affidabilità di chi li dà;",
              "il voto della partita è una media ponderata sull'affidabilità, e da lì esce l'MVP di ogni squadra;",
              "il livello si calibra nelle prime cinque partite, poi pesa per l'85% la storia e per il 15% l'ultima partita; ogni sport ha il suo.",
            ],
            "Poi c'è tutto quello che succede attorno. Si vota dal telefono, al campo, subito dopo aver giocato:",
            [
              "i voti si danno su un mazzo di carte e si inviano insieme. Le bozze restano salvate sul telefono, così una chiamata o un'app chiusa per sbaglio non le cancella;",
              "l'invio è una sola richiesta: o passano tutti i voti o nessuno. Un vincolo unico nel database, che all'inizio mancava, impedisce i doppioni quando la richiesta si ripete dopo un timeout;",
              "la partita si chiude quando hanno votato tutti quelli attesi, oppure dopo 24 ore. Stabilire chi è \"atteso\" è stato meno banale del previsto: per un periodo contava anche chi aveva rifiutato l'invito, e la partita restava aperta per un voto che non sarebbe mai arrivato.",
            ],
            'Le regole di chiusura hanno test dedicati, perché un errore lì non dà nessun messaggio: la partita semplicemente non si chiude più da sola.',
          ],
        },
        {
          title: 'Dove è arrivata',
          blocks: [
            'È gratis su App Store e Google Play, per calcio, padel, tennis, pallavolo e basket.',
            'Fin qui: {matches} partite giocate, {appearances} presenze in campo e {ratings} voti ai compagni.',
          ],
        },
        {
          title: 'Cosa rifarei',
          blocks: [
            [
              'Far girare i test in automatico a ogni rilascio, invece di lanciarli a mano, e dare un test anche al calcolo del livello.',
              "L'invito come gesto principale fin dalla prima versione. Ci sono arrivato con la 3.0, che è partita proprio da lì.",
              "Le regole che app e server devono conoscere entrambi, come l'elenco dei premi di fine partita, le scriverei in un posto solo. Oggi sono in due file, uno per parte: se ne aggiorno uno e dimentico l'altro, l'app mostra un premio che il server poi rifiuta.",
            ],
          ],
        },
      ],
      features: [
        'Calcio a 5, 7, 8 e 11, padel, tennis, pallavolo e basket',
        'Creazione partite con data, luogo, costi, posti e lista d\'attesa',
        'Squadre bilanciate sul livello dei giocatori, formazioni interattive con drag-and-drop',
        "Real-time via Socket.io (aggiornamento posti, chat)",
        'Votazione post-partita, pagelle, MVP, livello per sport e classifica tra amici',
        'Squadre con stemma e colori, sfide tra squadre',
        'Mappe interattive (Leaflet) per le partite vicine e la selezione del campo',
        'Notifiche push iOS/Android tramite Firebase Cloud Messaging',
        'App iOS e Android con Capacitor, pubblicate su App Store e Play Store',
      ],
    },
    en: {
      title: 'Match Ready',
      tagline: 'Organize amateur matches for any sport. All in one app.',
      description:
        'A mobile-first WebApp for managing amateur football, padel, tennis, volleyball and basketball matches: sign-ups, line-ups, real-time chat, post-match ratings and standings. Monorepo with Vue/Ionic frontend, Node.js backend and native iOS and Android apps. Published on the App Store and Play Store.',
      metaDescription: 'Match Ready, an iOS and Android app for organising amateur matches among friends: events, line-ups, real-time chat, player ratings and standings.',
      caseStudy: [
        {
          title: 'The problem',
          blocks: [
            "Every week, in the five-a-side group chat, the same scene: dozens of messages to work out who's in, someone dropping out at the last minute and the hunt for the tenth player. Then teams picked by eye that end 9–1.",
            "Match Ready removes all of that. You create the match, send the link to the group, see who's in and how many spots are left, and teams are made based on each player's level. After the match everyone rates each other, the MVP is chosen and awards and badges come in.",
          ],
        },
        {
          title: 'What I did',
          blocks: [
            "I designed and built it on my own, in my spare time: iOS and Android apps, web app, backend, server and store releases. I started in December 2025 and it's now on the App Store and Google Play. Basketball was added in July 2026, and at the end of October version 3.0 redid the whole design.",
          ],
        },
        {
          title: "How it's built",
          blocks: [
            [
              'Interface: one codebase for three platforms, with Vue 3 and Ionic; Capacitor builds the native iOS and Android apps.',
              'Backend: Node.js with Express and MySQL.',
              'Real time: Socket.io for spots, chat and votes, with Redis spreading events across server instances.',
              'Push notifications: Firebase.',
              'Server: a VPS with nginx and PM2.',
              'External services: weather from OpenMeteo, addresses from OpenStreetMap.',
            ],
          ],
        },
        {
          title: 'The hard part: voting',
          blocks: [
            "Voting is where a mistake leaves a mark. A vote lost or counted twice changes a player's level, and the level decides the teams for the following matches.",
            'The calculation:',
            [
              'every voter has a reliability score: those who vote in line with the others count more, those who vote at random or out of spite count less and less;',
              'isolated votes far from the average (absolute deviation and z-score) carry little weight and lower the reliability of whoever cast them;',
              'the match rating is an average weighted by reliability, and it decides the MVP of each team;',
              'the level is calibrated over the first five matches, then weighs history at 85% and the latest match at 15%; each sport has its own.',
            ],
            'Then there is everything around it. People vote from their phone, at the pitch, right after playing:',
            [
              "votes are given on a deck of cards and sent together. Drafts stay saved on the phone, so a call or an app closed by mistake doesn't wipe them;",
              'sending is a single request: either all the votes go through or none do. A unique constraint in the database, missing at first, prevents duplicates when the request is retried after a timeout;',
              'the match closes when everyone expected has voted, or after 24 hours. Deciding who is "expected" was less trivial than it looked: for a while it included people who had declined the invitation, and the match stayed open waiting for a vote that would never come.',
            ],
            'The closing rules have their own tests, because a mistake there gives no error message: the match simply stops closing on its own.',
          ],
        },
        {
          title: 'Where it is now',
          blocks: [
            "It's free on the App Store and Google Play, for football, padel, tennis, volleyball and basketball.",
            'So far: {matches} matches played, {appearances} player appearances and {ratings} teammate ratings.',
          ],
        },
        {
          title: "What I'd do differently",
          blocks: [
            [
              'Run the tests automatically at every release instead of by hand, and give the level calculation a test of its own.',
              'Make inviting the main action from the first version. I got there with 3.0, which started from exactly that.',
              "I'd keep the rules both the app and the server need to know, such as the list of end-of-match awards, in one place. Today they live in two files, one per side: if I update one and forget the other, the app shows an award that the server then rejects.",
            ],
          ],
        },
      ],
      features: [
        '5, 7, 8 and 11-a-side football, padel, tennis, volleyball and basketball',
        'Match creation with date, venue, costs, spots and waitlist',
        'Teams balanced on player level, interactive line-ups with drag-and-drop',
        'Real-time via Socket.io (spot updates, chat)',
        'Post-match voting, ratings, MVP, level per sport and a leaderboard among friends',
        'Teams with crest and colors, challenges between teams',
        'Interactive maps (Leaflet) for nearby matches and field selection',
        'iOS/Android push notifications via Firebase Cloud Messaging',
        'iOS and Android apps built with Capacitor, published on the App Store and Play Store',
      ],
    },
  },
  {
    slug: 'ledimoredidaniela',
    tags: ['Astro', 'TypeScript', 'PHP', 'PHPMailer', 'Zod', 'nginx'],
    links: {
      // lavoro per un cliente, repo privato: niente link GitHub
      live: 'https://ledimoredidaniela.it',
    },
    it: {
      title: 'Le Dimore di Daniela',
      tagline: 'Sito per case vacanza a Capilungo, in Salento, realizzato per un cliente.',
      description:
        "Sito per case vacanza in Salento, realizzato per un cliente: scheda dell'alloggio, galleria, recensioni e richiesta di disponibilità in quattro lingue. Ho curato anche logo e identità grafica.",
      metaDescription: 'Sito per case vacanza in Salento realizzato per un cliente: Astro e PHP, quattro lingue, richiesta di disponibilità via email, logo e identità grafica.',
      longDescription: `Le Dimore di Daniela sono villette per le vacanze a Capilungo, sulla costa ionica del Salento. Il sito non gestisce prenotazioni né pagamenti: l'ospite sceglie le date e invia una richiesta di disponibilità, oppure scrive su WhatsApp. Il proprietario riceve un'email e lo ricontatta; l'ospite riceve una conferma automatica nella sua lingua. Ho fatto tutto io: logo e identità grafica, sito, server e deploy.

Il sito è statico, generato con Astro, senza database né CMS. Ogni alloggio è un file Markdown validato da uno schema Zod durante la build. Le lingue sono quattro: italiano, inglese, francese e tedesco. Orari, regole e letti sono dati strutturati che il sito formula in ogni lingua; i testi liberi hanno le traduzioni affiancate e la build si ferma se ne manca una.

L'unica parte dinamica è il modulo di richiesta: un endpoint PHP con PHPMailer, l'unico che nginx espone, con il codice fuori dalla document root. La build genera un file properties.json che l'API usa per validare alloggio e numero di ospiti, così i dati stanno in un solo posto. Il modulo funziona anche senza JavaScript; contro lo spam ci sono honeypot, rate limit e Cloudflare Turnstile.

Il sito gira su un VPS con nginx e HTTPS di Let's Encrypt. Ogni deploy crea una release separata: il sito cambia solo se la build riesce e si può tornare alla versione precedente.`,
      features: [
        "Italiano, inglese, francese e tedesco, con la conferma all'ospite nella sua lingua",
        "Richiesta di disponibilità con calendario che parte dal periodo di apertura e ricorda arrivi e soggiorno minimo",
        'Contenuti in Markdown validati con Zod: la build si ferma se manca una traduzione',
        'Modulo che funziona anche senza JavaScript, con honeypot, rate limit e Cloudflare Turnstile',
        'Endpoint PHP con test PHPUnit, codice fuori dalla document root',
        'Galleria di 35 foto, recensioni di Booking e Airbnb, domande frequenti',
        'Logo e identità grafica: guida, colori, icone e anteprima dei link',
        'Deploy su VPS con nginx, una release per ogni deploy e rollback',
      ],
    },
    en: {
      title: 'Le Dimore di Daniela',
      tagline: 'Website for holiday homes in Capilungo, Salento, built for a client.',
      description:
        'Website for holiday homes in Salento, built for a client: property page, gallery, reviews and availability requests in four languages. I also designed the logo and visual identity.',
      metaDescription: 'Website for holiday homes in Salento built for a client: Astro and PHP, four languages, availability requests by email, logo and visual identity.',
      longDescription: `Le Dimore di Daniela are holiday villas in Capilungo, on the Ionian coast of Salento. The site handles no bookings or payments: guests pick their dates and send an availability request, or message on WhatsApp. The owner gets an email and contacts them; the guest gets an automatic confirmation in their own language. I did all of it: logo and visual identity, website, server and deployment.

The site is static, generated with Astro, with no database or CMS. Each property is a Markdown file validated by a Zod schema at build time. There are four languages: Italian, English, French and German. Times, rules and beds are structured data that the site phrases in each language; free text has its translations side by side, and the build stops if one is missing.

The only dynamic part is the request form: a PHP endpoint with PHPMailer, the only one nginx exposes, with the code outside the document root. The build generates a properties.json file that the API uses to validate the property and number of guests, so the data lives in one place. The form works without JavaScript too; spam is handled with a honeypot, rate limiting and Cloudflare Turnstile.

The site runs on a VPS with nginx and Let's Encrypt HTTPS. Each deployment creates a separate release: the site only changes if the build succeeds, and it can roll back to the previous version.`,
      features: [
        'Italian, English, French and German, with the guest confirmation in their own language',
        'Availability request with a calendar that starts from the opening period and shows arrival days and minimum stay',
        'Markdown content validated with Zod: the build stops if a translation is missing',
        'Form that works without JavaScript, with a honeypot, rate limiting and Cloudflare Turnstile',
        'PHP endpoint with PHPUnit tests, code outside the document root',
        'Gallery of 35 photos, Booking and Airbnb reviews, FAQ',
        'Logo and visual identity: guide, colours, icons and link preview image',
        'Deployment on a VPS with nginx, one release per deployment and rollback',
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
      metaDescription: 'Bot Discord open source in Python: livelli XP, ruoli automatici al salire di livello, report delle sessioni vocali e classifiche.',
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
      metaDescription: 'Open-source Discord bot in Python: XP levels, automatic roles on level-up, voice session reports and leaderboards.',
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
      metaDescription: 'Gestionale SaaS multi-tenant per spedizioni aziendali: dati separati per ogni cliente, stati delle spedizioni, vettori e accessi per ruolo.',
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
      metaDescription: 'Multi-tenant SaaS for business shipments: separate data for each client, shipment status tracking, carriers and role-based access.',
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
      metaDescription: 'App web che collega il tuo account Spotify e usa Google Gemini per classificare i brani per genere, mood e decennio e creare playlist.',
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
      metaDescription: 'Web app that connects to Spotify and uses Google Gemini to sort saved tracks by genre, mood and decade and build themed playlists.',
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
  {
    slug: 'botrugno-dev',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'i18n'],
    links: {
      github: 'https://github.com/BotrugnoMarco/botrugno-dev',
      live: 'https://botrugno.dev',
    },
    it: {
      title: 'botrugno.dev',
      tagline: 'Questo portfolio — progettato, costruito e deployato da zero.',
      description:
        'Portfolio personale sviluppato con Astro e Tailwind CSS. Routing i18n IT/EN integrato, pagine progetto dinamiche, sitemap automatica e design system custom in CSS puro.',
      metaDescription: 'Il sorgente di questo portfolio: Astro e Tailwind CSS, italiano e inglese, pagine progetto generate e CV in PDF senza dati personali.',
      longDescription: `Il portfolio è costruito con Astro come SSG: ogni pagina viene generata staticamente al build, con zero JavaScript di default sul client. Il design system è definito interamente tramite CSS custom properties senza dipendere da classi Tailwind per i componenti UI — Tailwind viene usato solo dove serve la flessibilità utility.

Il routing i18n è gestito nativamente da Astro: la versione italiana è alla root (\`/\`), quella inglese sotto \`/en/\`. Le traduzioni sono centralizzate in un unico file TypeScript tipizzato, con una funzione \`useTranslations(lang)\` che garantisce type safety su tutte le chiavi.

Le pagine progetto sono generate dinamicamente da un array TypeScript (\`projects.ts\`) che funge da piccolo CMS locale: aggiungere un progetto significa aggiungere un oggetto con i contenuti IT e EN, e la pagina detail viene creata automaticamente.

Il sito include sitemap generata da \`@astrojs/sitemap\`, meta OG tag, robots.txt e una pagina 404 custom con rilevamento automatico della lingua.`,
      features: [
        'SSG con Astro — zero JS sul client per default',
        'i18n IT/EN con routing nativo e type-safe translations',
        'Pagine progetto dinamiche generate da array TypeScript',
        'Design system in CSS custom properties (rosso, blu, dark)',
        'Sitemap automatica, meta OG, robots.txt, pagina 404 custom',
        'Pagina Curriculum Vitae con download PDF',
      ],
    },
    en: {
      title: 'botrugno.dev',
      tagline: 'This portfolio — designed, built and deployed from scratch.',
      description:
        'Personal portfolio built with Astro and Tailwind CSS. Native IT/EN i18n routing, dynamic project pages, automatic sitemap and custom CSS design system.',
      metaDescription: 'The source of this portfolio: Astro and Tailwind CSS, Italian and English, generated project pages and a PDF resume without personal data.',
      longDescription: `The portfolio is built with Astro as an SSG: every page is statically generated at build time, with zero JavaScript by default on the client. The design system is defined entirely through CSS custom properties without relying on Tailwind classes for UI components — Tailwind is only used where utility flexibility is needed.

i18n routing is handled natively by Astro: the Italian version lives at the root (\`/\`), the English version under \`/en/\`. Translations are centralized in a single typed TypeScript file, with a \`useTranslations(lang)\` function that guarantees type safety across all keys.

Project pages are dynamically generated from a TypeScript array (\`projects.ts\`) that acts as a small local CMS: adding a project means adding an object with IT and EN content, and the detail page is created automatically.

The site includes a sitemap generated by \`@astrojs/sitemap\`, OG meta tags, robots.txt and a custom 404 page with automatic language detection.`,
      features: [
        'SSG with Astro — zero client-side JS by default',
        'IT/EN i18n with native routing and type-safe translations',
        'Dynamic project pages generated from a TypeScript array',
        'Design system in CSS custom properties (red, blue, dark)',
        'Automatic sitemap, OG meta tags, robots.txt, custom 404 page',
        'Curriculum Vitae page with PDF download',
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
