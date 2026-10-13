export const languages = {
  it: 'Italiano',
  en: 'English',
} as const

export type Lang = keyof typeof languages

export const ui = {
  it: {
    // Meta
    'meta.title': 'Marco Luigi Botrugno — Full-Stack Developer',
    'meta.description': "Portfolio di Marco Luigi Botrugno, sviluppatore Full-Stack italiano specializzato in Vue, React, Node.js e sviluppo mobile con Ionic.",

    // Navbar
    'nav.about': 'Chi sono',
    'nav.matchready': 'Match Ready',
    'nav.projects': 'Progetti',
    'nav.contact': 'Contatti',
    'nav.cv': 'Curriculum',
    'nav.skip': 'Vai al contenuto',

    // CV page
    'cv.back': '← Torna alla home',
    'cv.download': 'Scarica PDF ↓',
    'cv.experience': 'Esperienza',
    'cv.education': 'Formazione',
    'cv.certifications': 'Certificazioni',
    'cv.skills': 'Competenze',
    'cv.languages': 'Lingue',
    'cv.hobbies': 'Hobby e Interessi',
    'cv.projects': 'Progetti',
    'cv.role': 'Full-Stack Developer',
    'cv.summary': "Sviluppatore full-stack con oltre {years} anni di esperienza. Sviluppo applicazioni complete: web app, backend e API, database, app iOS e Android, fino alla messa online su server e store. Studio Informatica all'Università di Bari.",
    'cv.present': 'Presente',

    // Hero
    'hero.eyebrow': 'Full-Stack Developer',
    'hero.bio': "Sviluppo applicazioni complete, dal database all'interfaccia: web app, backend e API, app iOS e Android. Mi occupo anche di server, deploy e pubblicazione sugli store.",
    'hero.fact.work': 'In BarbarHouse dal 2022',
    'hero.fact.app': 'Match Ready su App Store e Play Store',
    'hero.cta.projects': 'I miei progetti',
    'hero.cta.contact': 'Contattami',

    // About
    'about.title': 'Chi sono',
    "about.bio1": "Sono Marco, salentino, ho {age} anni. Dal 2022 lavoro come sviluppatore full-stack in BarbarHouse e studio Informatica all'Università di Bari.",
    'about.bio2': "Seguo i progetti dall'inizio alla fine: database, API, interfaccia web e mobile, server e messa online. Match Ready l'ho progettata, sviluppata e pubblicata da solo.",
    'about.bio3': "Gestire lo sviluppo in solitaria richiede molta agilità per saltare da una tecnologia all'altra senza mai perdere il quadro generale (una skill che, da grande fan di Spider-Man, ho sempre apprezzato).",
    'about.bio4': "Fuori dal codice gioco a calcetto e pallavolo, seguo il Fantacalcio e mi interesso di cybersecurity e IoT.",
    'about.personal.sport': 'Calcio',

    // MatchReady section
    'mr.app.sub': 'Organizza partite amatoriali',
    'mr.description': "App per organizzare partite amatoriali tra amici: eventi, formazioni, chat, pagelle e classifiche. L'ho progettata, sviluppata e pubblicata da solo su App Store e Play Store.",
    'mr.available': 'Disponibile su',
    'mr.details': "Com'è fatta: dettagli del progetto →",
    'mr.mock.match': 'Partita di sabato',
    'mr.mock.players': 'Giocatori',
    'mr.feat1.label': 'Crea eventi',
    'mr.feat1.desc': 'Data, luogo, costi e giocatori',
    'mr.feat2.label': 'Formazioni',
    'mr.feat2.desc': 'Team A vs B con drag & drop',
    'mr.feat3.label': 'Pagelle e classifiche',
    'mr.feat3.desc': 'Voti, MVP e classifiche di stagione',
    'mr.feat4.label': 'Chat in tempo reale',
    'mr.feat4.desc': 'Tra i giocatori, con Socket.io',
    'mr.feat5.label': 'Mappe',
    'mr.feat5.desc': 'Scelta del campo con Leaflet',
    'mr.feat6.label': 'Notifiche push',
    'mr.feat6.desc': 'Su iOS e Android, con Firebase',

    // Projects
    'projects.title': 'Progetti',
    'projects.github': 'Tutti i repository su GitHub ↗',

    // Contact
    'contact.label': 'Contatti',
    'footer.privacy': 'Privacy',
    'footer.source': 'Codice del sito',
    'contact.title': 'Mettiamoci in contatto',
    'contact.lead': "Hai un'idea complessa da sviluppare, un gestionale da architettare o vuoi semplicemente chiedermi consigli per l'asta del Fantacalcio? Scrivimi, rispondo sempre.",

    // Project detail page
    'project.back': '← Tutti i progetti',
    'project.overview': 'Panoramica',
    'project.features': 'Funzionalità principali',
    'project.stack': 'Stack tecnologico',
    'project.cta.all': '← Tutti i progetti',
    'project.cta.github': 'Vedi su GitHub ↗',
    'project.cta.live': 'Live ↗',
  },

  en: {
    // Meta
    'meta.title': 'Marco Luigi Botrugno — Full-Stack Developer',
    'meta.description': "Portfolio of Marco Luigi Botrugno, Italian Full-Stack Developer specialised in Vue, React, Node.js and mobile development with Ionic.",

    // Navbar
    'nav.about': 'About',
    'nav.matchready': 'Match Ready',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'Resume',
    'nav.skip': 'Skip to content',

    // CV page
    'cv.back': '← Back to home',
    'cv.download': 'Download PDF ↓',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.certifications': 'Certifications',
    'cv.skills': 'Skills',
    'cv.languages': 'Languages',
    'cv.hobbies': 'Hobbies & Interests',
    'cv.projects': 'Projects',
    'cv.role': 'Full-Stack Developer',
    'cv.summary': "Full-stack developer with over {years} years of experience. I build complete applications: web apps, backends and APIs, databases, iOS and Android apps, all the way to going live on servers and app stores. I study Computer Science at the University of Bari.",
    'cv.present': 'Present',

    // Hero
    'hero.eyebrow': 'Full-Stack Developer',
    'hero.bio': "I build complete applications, from the database to the interface: web apps, backends and APIs, iOS and Android apps. I also handle servers, deployment and app store releases.",
    'hero.fact.work': 'At BarbarHouse since 2022',
    'hero.fact.app': 'Match Ready on the App Store and Play Store',
    'hero.cta.projects': 'My projects',
    'hero.cta.contact': 'Contact me',

    // About
    'about.title': 'About me',
    "about.bio1": "I'm Marco, from Salento, {age} years old. Since 2022 I have been working as a full-stack developer at BarbarHouse, and I study Computer Science at the University of Bari.",
    'about.bio2': "I follow projects from start to finish: database, APIs, web and mobile interface, servers and going live. I designed, built and published Match Ready on my own.",
    'about.bio3': "Solo development demands agility: jumping between technologies without losing sight of the big picture (a skill that, as a huge Spider-Man fan, I've always appreciated).",
    'about.bio4': 'Outside of code I play five-a-side football and volleyball, follow fantasy football and keep an eye on cybersecurity and IoT.',
    'about.personal.sport': 'Football',

    // MatchReady section
    'mr.app.sub': 'Organize amateur matches',
    'mr.description': 'An app for organising amateur matches among friends: events, line-ups, chat, player ratings and standings. I designed, built and published it on my own on the App Store and Play Store.',
    'mr.available': 'Available on',
    'mr.details': 'How it is built: project details →',
    'mr.mock.match': 'Saturday match',
    'mr.mock.players': 'Players',
    'mr.feat1.label': 'Create events',
    'mr.feat1.desc': 'Date, venue, costs and players',
    'mr.feat2.label': 'Line-ups',
    'mr.feat2.desc': 'Team A vs B with drag & drop',
    'mr.feat3.label': 'Ratings and standings',
    'mr.feat3.desc': 'Votes, MVP and season standings',
    'mr.feat4.label': 'Real-time chat',
    'mr.feat4.desc': 'Between players, with Socket.io',
    'mr.feat5.label': 'Maps',
    'mr.feat5.desc': 'Pitch selection with Leaflet',
    'mr.feat6.label': 'Push notifications',
    'mr.feat6.desc': 'On iOS and Android, with Firebase',

    // Projects
    'projects.title': 'Projects',
    'projects.github': 'All repositories on GitHub ↗',

    // Contact
    'contact.label': 'Contact',
    'footer.privacy': 'Privacy',
    'footer.source': 'Site source',
    'contact.title': 'Get in touch',
    'contact.lead': "Got a complex idea to develop, a management system to architect, or just want to ask for Fantasy Football auction tips? Write to me — I always reply.",

    // Project detail page
    'project.back': '← All projects',
    'project.overview': 'Overview',
    'project.features': 'Main features',
    'project.stack': 'Tech stack',
    'project.cta.all': '← All projects',
    'project.cta.github': 'View on GitHub ↗',
    'project.cta.live': 'Live ↗',
  },
} as const

export type UiKey = keyof typeof ui['it']
