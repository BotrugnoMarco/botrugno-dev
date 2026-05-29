export const languages = {
  it: 'Italiano',
  en: 'English',
} as const

export type Lang = keyof typeof languages

export const ui = {
  it: {
    // Meta
    'meta.title': 'Marco Botrugno — Full-Stack Developer',
    'meta.description': "Portfolio di Marco Botrugno, sviluppatore Full-Stack italiano e creator dell'app MatchReady.",

    // Navbar
    'nav.about': 'Chi sono',
    'nav.matchready': 'MatchReady',
    'nav.projects': 'Progetti',
    'nav.contact': 'Contatti',
    'nav.cv': 'Curriculum',

    // CV page
    'cv.back': '← Torna alla home',
    'cv.download': 'Scarica PDF ↓',
    'cv.experience': 'Esperienza',
    'cv.education': 'Formazione',
    'cv.certifications': 'Certificazioni',
    'cv.skills': 'Competenze',
    'cv.languages': 'Lingue',
    'cv.hobbies': 'Hobby e Interessi',
    'cv.present': 'Presente',

    // Hero
    'hero.eyebrow': 'Full-Stack Web Developer',
    'hero.bio': 'Trasformo logiche complesse in prodotti digitali concreti. Progetto, sviluppo e gestisco interi ecosistemi software in totale autonomia,',
    'hero.bio.highlight': "dal server all'app nativa",
    'hero.bio.end': '.',
    'hero.cta.projects': 'I miei progetti',
    'hero.cta.contact': 'Contattami',
    'hero.stat.experience': 'Anni di esperienza',
    'hero.stat.stores': 'Store pubblicati',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'Chi sono',
    'about.title': 'Codice pulito,',
    'about.title.gradient': 'prodotti che funzionano.',
    'about.bio1.pre': 'Sono Marco. Salentino,',
    'about.bio1.pre2': 'anni, studente di Informatica all\'Università di Bari e',
    'about.bio1.highlight': 'sviluppatore full-stack',
    'about.bio1.post': '. La mia specialità è prendere la responsabilità totale di un progetto: dal design del database fino al rilascio sugli store.',
    'about.bio2': 'Gestire lo sviluppo in solitaria richiede molta agilità per saltare da una tecnologia all\'altra senza mai perdere il quadro generale (una skill che, da grande fan di Spider-Man, ho sempre apprezzato).',
    'about.bio3': 'Tra gli esami, il lavoro di tutti i giorni e le partite a calcetto, il mio obiettivo è sempre lo stesso: scrivere codice pulito per costruire architetture solide e scalabili.',
    'about.personal.sport': 'Calcio',

    // MatchReady section
    'mr.label': 'App in produzione',
    'mr.title': "Dal fischio d'inizio",
    'mr.title.gradient': 'al database.',
    'mr.app.sub': 'Organizza partite amatoriali',
    'mr.description': "Nata per risolvere un'esigenza reale tra amici, MatchReady è diventata il mio ecosistema in produzione. Dalla logistica degli eventi alle formazioni interattive, fino a pagelle e classifiche: un'infrastruttura completa pensata, sviluppata e scalata interamente in solitaria.",
    'mr.available': 'Disponibile su',
    'mr.mock.match': 'Partita di sabato',
    'mr.mock.players': 'Giocatori',
    'mr.feat1.label': 'Crea eventi',
    'mr.feat1.desc': 'Data, luogo, costi e giocatori',
    'mr.feat2.label': 'Formazioni live',
    'mr.feat2.desc': 'Team A vs B con drag & drop',
    'mr.feat3.label': 'Gamification',
    'mr.feat3.desc': 'MVP, pagelle e classifiche',
    'mr.feat4.label': 'Chat real-time',
    'mr.feat4.desc': 'Socket.io tra i giocatori',
    'mr.feat5.label': 'Mappe',
    'mr.feat5.desc': 'Selezione campo su Leaflet',
    'mr.feat6.label': 'Notifiche push',
    'mr.feat6.desc': 'Firebase Cloud Messaging',

    // Projects
    'projects.label': 'Open Source',
    'projects.title': 'I miei',
    'projects.title.gradient': 'progetti',
    'projects.github': 'Tutti i repository su GitHub ↗',

    // Contact
    'contact.label': 'Contatti',
    'contact.title': 'Mettiamoci in contatto',
    'contact.lead': "Hai un'idea complessa da sviluppare, un gestionale da architettare o vuoi semplicemente chiedermi consigli per l'asta del Fantacalcio? Scrivimi, rispondo sempre.",

    // Project detail page
    'project.back': '← Tutti i progetti',
    'project.label': 'Progetto',
    'project.overview': 'Overview',
    'project.features': 'Funzionalità principali',
    'project.stack': 'Stack tecnologico',
    'project.cta.all': '← Tutti i progetti',
    'project.cta.github': 'Vedi su GitHub ↗',
    'project.cta.live': 'Live ↗',
  },

  en: {
    // Meta
    'meta.title': 'Marco Botrugno — Full-Stack Developer',
    'meta.description': "Portfolio of Marco Botrugno, Italian Full-Stack Developer and creator of the MatchReady app.",

    // Navbar
    'nav.about': 'About',
    'nav.matchready': 'MatchReady',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.cv': 'Resume',

    // CV page
    'cv.back': '← Back to home',
    'cv.download': 'Download PDF ↓',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.certifications': 'Certifications',
    'cv.skills': 'Skills',
    'cv.languages': 'Languages',
    'cv.hobbies': 'Hobbies & Interests',
    'cv.present': 'Present',

    // Hero
    'hero.eyebrow': 'Full-Stack Web Developer',
    'hero.bio': 'I turn complex logic into concrete digital products. I design, build and manage entire software ecosystems independently,',
    'hero.bio.highlight': 'from server to native app',
    'hero.bio.end': '.',
    'hero.cta.projects': 'My projects',
    'hero.cta.contact': 'Contact me',
    'hero.stat.experience': 'Years of experience',
    'hero.stat.stores': 'Published stores',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'About me',
    'about.title': 'Clean code,',
    'about.title.gradient': 'products that work.',
    'about.bio1.pre': "I'm Marco. From Salento,",
    'about.bio1.pre2': 'years old, Computer Science student at the University of Bari and',
    'about.bio1.highlight': 'full-stack developer',
    'about.bio1.post': '. My specialty is taking full ownership of a project: from database design to release on the stores.',
    'about.bio2': "Solo development demands agility — jumping between technologies without losing sight of the big picture (a skill that, as a huge Spider-Man fan, I've always appreciated).",
    'about.bio3': 'Between exams, daily work and amateur matches, my goal is always the same: write clean code to build solid, scalable architectures.',
    'about.personal.sport': 'Football',

    // MatchReady section
    'mr.label': 'In production',
    'mr.title': 'From kickoff',
    'mr.title.gradient': 'to database.',
    'mr.app.sub': 'Organize amateur matches',
    'mr.description': 'Born out of a real need to organize matches with friends, MatchReady became my production ecosystem. From event logistics to interactive line-ups, post-match ratings and leaderboards: a complete infrastructure designed, built and scaled entirely solo.',
    'mr.available': 'Available on',
    'mr.mock.match': 'Saturday match',
    'mr.mock.players': 'Players',
    'mr.feat1.label': 'Create events',
    'mr.feat1.desc': 'Date, venue, costs and players',
    'mr.feat2.label': 'Live line-ups',
    'mr.feat2.desc': 'Team A vs B with drag & drop',
    'mr.feat3.label': 'Gamification',
    'mr.feat3.desc': 'MVP, ratings and leaderboards',
    'mr.feat4.label': 'Real-time chat',
    'mr.feat4.desc': 'Socket.io between players',
    'mr.feat5.label': 'Maps',
    'mr.feat5.desc': 'Field selection on Leaflet',
    'mr.feat6.label': 'Push notifications',
    'mr.feat6.desc': 'Firebase Cloud Messaging',

    // Projects
    'projects.label': 'Open Source',
    'projects.title': 'My',
    'projects.title.gradient': 'projects',
    'projects.github': 'All repositories on GitHub ↗',

    // Contact
    'contact.label': 'Contact',
    'contact.title': 'Get in touch',
    'contact.lead': "Got a complex idea to develop, a management system to architect, or just want to ask for Fantasy Football auction tips? Write to me — I always reply.",

    // Project detail page
    'project.back': '← All projects',
    'project.label': 'Project',
    'project.overview': 'Overview',
    'project.features': 'Main features',
    'project.stack': 'Tech stack',
    'project.cta.all': '← All projects',
    'project.cta.github': 'View on GitHub ↗',
    'project.cta.live': 'Live ↗',
  },
} as const

export type UiKey = keyof typeof ui['it']
