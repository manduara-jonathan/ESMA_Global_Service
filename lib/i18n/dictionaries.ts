/**
 * Dictionnaire de traduction bilingue (FR / EN) pour ESMA GLOBAL SERVICE.
 * Bilingual translation dictionary (FR / EN) for ESMA GLOBAL SERVICE.
 *
 * Structure : chaque section de l'application possède sa propre clé.
 * Le français (fr) est la langue de référence ; l'anglais (en) doit rester synchronisé.
 */

export type Locale = "fr" | "en"

export const LOCALES: Locale[] = ["fr", "en"]
export const DEFAULT_LOCALE: Locale = "fr"

// On dérive le type du dictionnaire à partir de la version française (source de vérité).
export type Dictionary = (typeof dictionaries)[Locale]

export const dictionaries = {
  fr: {
    /* ------------------------------ Commun ------------------------------ */
    common: {
      brand: "ESMA GLOBAL SERVICE",
      bookNow: "Réserver",
      learnMore: "En savoir plus",
      contactUs: "Nous contacter",
      requestQuote: "Demander un devis",
      viewAll: "Tout voir",
      search: "Rechercher",
      loading: "Chargement...",
      from: "À partir de",
      language: "Langue",
      french: "Français",
      english: "Anglais",
      backHome: "Retour à l'accueil",
    },

    /* ---------------------------- Navigation ---------------------------- */
    nav: {
      home: "Accueil",
      flights: "Vols & Tarifs",
      services: "Services",
      about: "À propos",
      contact: "Contact",
      faq: "FAQ",
    },

    /* ------------------------------- Hero ------------------------------- */
    hero: {
      badge: "Agence de voyage & services premium",
      title: "Voyagez sans frontières avec ESMA",
      subtitle:
        "Billets d'avion, visas, monnaie mobile et bien plus. Des services fiables et rapides pour particuliers et entreprises en RDC et à l'international.",
      ctaPrimary: "Voir nos tarifs de vols",
      ctaSecondary: "Demander un devis",
      searchPlaceholder: "Où souhaitez-vous voyager ?",
      searchButton: "Rechercher un trajet",
      stats: {
        destinations: "Destinations",
        clients: "Clients satisfaits",
        experience: "Ans d'expérience",
      },
    },

    /* ------------------------------ Vols -------------------------------- */
    flights: {
      sectionBadge: "Grille tarifaire",
      sectionTitle: "Nos tarifs de vols",
      sectionSubtitle:
        "Des prix transparents pour vos voyages nationaux et internationaux au départ de Kinshasa.",
      tabInternational: "Vols internationaux",
      tabNational: "Vols nationaux (RDC)",
      searchPlaceholder: "Filtrer par destination...",
      noResults: "Aucune destination ne correspond à votre recherche.",
      priceRange: "Fourchette de prix",
      fixedPrice: "Prix fixe",
      roundTrip: "Aller-retour",
      oneWay: "Aller simple",
      from: "Kinshasa",
      pageTitle: "Vols & Tarifs",
      pageSubtitle:
        "Consultez notre grille tarifaire complète et réservez votre prochain vol en toute simplicité.",
      resultsCount: "destination(s) trouvée(s)",
      bookThisFlight: "Réserver ce vol",
      previewTitle: "Aperçu de nos tarifs",
      previewSubtitle: "Quelques-unes de nos destinations les plus demandées.",
      viewAllFlights: "Voir tous les vols et tarifs",
    },

    /* ---------------------------- Services ------------------------------ */
    services: {
      sectionBadge: "Nos expertises",
      sectionTitle: "Des services conçus pour vous",
      sectionSubtitle:
        "Une gamme complète de services pour simplifier votre quotidien et vos voyages.",
      pageTitle: "Nos Services",
      pageSubtitle:
        "Découvrez l'ensemble des prestations proposées par ESMA GLOBAL SERVICE.",
      items: {
        flights: {
          title: "Billets d'avion",
          description:
            "Réservation de vols nationaux et internationaux aux meilleurs tarifs.",
        },
        visa: {
          title: "Facilitation de visas",
          description:
            "Accompagnement complet pour l'obtention de vos visas de voyage.",
        },
        mobileMoney: {
          title: "Monnaie mobile",
          description:
            "Transferts et paiements mobiles rapides, sécurisés et fiables.",
        },
        cleaning: {
          title: "Nettoyage d'immeubles",
          description:
            "Services de nettoyage professionnel pour bureaux et immeubles.",
        },
        catering: {
          title: "Service traiteur",
          description:
            "Traiteur événementiel de qualité pour toutes vos occasions.",
        },
      },
    },

    /* ----------------------------- À propos ----------------------------- */
    about: {
      sectionBadge: "Qui sommes-nous",
      sectionTitle: "Votre partenaire de confiance",
      pageTitle: "À propos d'ESMA GLOBAL SERVICE",
      intro:
        "ESMA GLOBAL SERVICE est une entreprise multiservices basée en RDC, dédiée à offrir des prestations de haute qualité dans le voyage, les services financiers et les services aux entreprises.",
      missionTitle: "Notre mission",
      mission:
        "Faciliter la vie de nos clients en proposant des services fiables, rapides et accessibles.",
      visionTitle: "Notre vision",
      vision:
        "Devenir la référence des services intégrés en Afrique centrale et au-delà.",
      valuesTitle: "Nos valeurs",
      values: {
        trust: "Confiance",
        excellence: "Excellence",
        speed: "Rapidité",
        proximity: "Proximité",
      },
    },

    /* ----------------------------- Contact ------------------------------ */
    contact: {
      sectionBadge: "Restons en contact",
      pageTitle: "Contactez-nous",
      pageSubtitle:
        "Notre équipe est à votre écoute pour répondre à toutes vos questions.",
      formName: "Nom complet",
      formEmail: "Adresse e-mail",
      formPhone: "Téléphone",
      formSubject: "Sujet",
      formMessage: "Votre message",
      formSubmit: "Envoyer le message",
      formSending: "Envoi en cours...",
      formSuccess: "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
      formError: "Une erreur est survenue. Veuillez réessayer.",
      infoTitle: "Informations",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      hoursLabel: "Horaires",
      hours: "Lun - Sam : 08h00 - 18h00",
    },

    /* ------------------------------- FAQ -------------------------------- */
    faq: {
      sectionBadge: "Questions fréquentes",
      pageTitle: "Foire aux questions",
      pageSubtitle: "Retrouvez les réponses aux questions les plus courantes.",
    },

    /* ------------------------------ Footer ------------------------------ */
    footer: {
      tagline:
        "Votre partenaire multiservices de confiance pour le voyage, la finance et bien plus.",
      quickLinks: "Liens rapides",
      ourServices: "Nos services",
      contact: "Contact",
      newsletter: "Newsletter",
      newsletterText: "Recevez nos offres et actualités.",
      newsletterPlaceholder: "Votre e-mail",
      subscribe: "S'abonner",
      rights: "Tous droits réservés.",
      legal: "Mentions légales",
      privacy: "Confidentialité",
    },

    /* ------------------------------ Admin ------------------------------- */
    admin: {
      nav: {
        dashboard: "Tableau de bord",
        notifications: "Notifications",
        messages: "Messages",
        bookings: "Réservations",
        site: "Contrôle du site",
        settings: "Paramètres",
        logout: "Déconnexion",
      },
      role: "Sécurisé",
      dashboard: {
        title: "Tableau de bord",
        subtitle: "Vue d'ensemble du flux réel du site",
        activeVisitors: "Visiteurs actifs",
        onlineNow: "En ligne maintenant",
        totalVisits: "Visites totales",
        today: "Aujourd'hui",
        pageViews: "Pages vues",
        avgTime: "Temps moyen",
        unreadMessages: "Messages non lus",
        pendingBookings: "Réservations en attente",
        activeNotifications: "Notifications actives",
        hourlyTraffic: "Trafic horaire (24 dernières heures)",
        hourlyTrafficSubtitle: "Nombre de pages vues par heure - Données réelles",
      },
      common: {
        save: "Enregistrer",
        cancel: "Annuler",
        delete: "Supprimer",
        edit: "Modifier",
        confirm: "Confirmer",
        loading: "Chargement...",
      },
    },
  },

  en: {
    /* ------------------------------ Common ------------------------------ */
    common: {
      brand: "ESMA GLOBAL SERVICE",
      bookNow: "Book Now",
      learnMore: "Learn more",
      contactUs: "Contact us",
      requestQuote: "Request a quote",
      viewAll: "View all",
      search: "Search",
      loading: "Loading...",
      from: "From",
      language: "Language",
      french: "French",
      english: "English",
      backHome: "Back to home",
    },

    /* ---------------------------- Navigation ---------------------------- */
    nav: {
      home: "Home",
      flights: "Flights & Fares",
      services: "Services",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
    },

    /* ------------------------------- Hero ------------------------------- */
    hero: {
      badge: "Premium travel agency & services",
      title: "Travel without borders with ESMA",
      subtitle:
        "Flight tickets, visas, mobile money and much more. Reliable and fast services for individuals and businesses in DRC and worldwide.",
      ctaPrimary: "View our flight fares",
      ctaSecondary: "Request a quote",
      searchPlaceholder: "Where do you want to travel?",
      searchButton: "Search a route",
      stats: {
        destinations: "Destinations",
        clients: "Happy clients",
        experience: "Years of experience",
      },
    },

    /* ------------------------------ Flights ----------------------------- */
    flights: {
      sectionBadge: "Fare grid",
      sectionTitle: "Our flight fares",
      sectionSubtitle:
        "Transparent prices for your domestic and international trips departing from Kinshasa.",
      tabInternational: "International flights",
      tabNational: "Domestic flights (DRC)",
      searchPlaceholder: "Filter by destination...",
      noResults: "No destination matches your search.",
      priceRange: "Price range",
      fixedPrice: "Fixed price",
      roundTrip: "Round trip",
      oneWay: "One way",
      from: "Kinshasa",
      pageTitle: "Flights & Fares",
      pageSubtitle:
        "Browse our full fare grid and book your next flight with ease.",
      resultsCount: "destination(s) found",
      bookThisFlight: "Book this flight",
      previewTitle: "A glance at our fares",
      previewSubtitle: "A few of our most requested destinations.",
      viewAllFlights: "View all flights and fares",
    },

    /* ---------------------------- Services ------------------------------ */
    services: {
      sectionBadge: "Our expertise",
      sectionTitle: "Services designed for you",
      sectionSubtitle:
        "A complete range of services to simplify your daily life and your travels.",
      pageTitle: "Our Services",
      pageSubtitle:
        "Discover the full range of services offered by ESMA GLOBAL SERVICE.",
      items: {
        flights: {
          title: "Flight tickets",
          description:
            "Booking of domestic and international flights at the best rates.",
        },
        visa: {
          title: "Visa facilitation",
          description:
            "Complete support for obtaining your travel visas.",
        },
        mobileMoney: {
          title: "Mobile money",
          description:
            "Fast, secure and reliable mobile transfers and payments.",
        },
        cleaning: {
          title: "Building cleaning",
          description:
            "Professional cleaning services for offices and buildings.",
        },
        catering: {
          title: "Catering service",
          description:
            "Quality event catering for all your occasions.",
        },
      },
    },

    /* ----------------------------- About -------------------------------- */
    about: {
      sectionBadge: "Who we are",
      sectionTitle: "Your trusted partner",
      pageTitle: "About ESMA GLOBAL SERVICE",
      intro:
        "ESMA GLOBAL SERVICE is a multi-service company based in the DRC, dedicated to providing high-quality services in travel, financial services and business services.",
      missionTitle: "Our mission",
      mission:
        "Make our clients' lives easier by offering reliable, fast and accessible services.",
      visionTitle: "Our vision",
      vision:
        "Become the reference for integrated services in Central Africa and beyond.",
      valuesTitle: "Our values",
      values: {
        trust: "Trust",
        excellence: "Excellence",
        speed: "Speed",
        proximity: "Proximity",
      },
    },

    /* ----------------------------- Contact ------------------------------ */
    contact: {
      sectionBadge: "Let's stay in touch",
      pageTitle: "Contact us",
      pageSubtitle:
        "Our team is here to answer all your questions.",
      formName: "Full name",
      formEmail: "Email address",
      formPhone: "Phone",
      formSubject: "Subject",
      formMessage: "Your message",
      formSubmit: "Send message",
      formSending: "Sending...",
      formSuccess: "Your message has been sent. We will reply shortly.",
      formError: "An error occurred. Please try again.",
      infoTitle: "Information",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      hoursLabel: "Hours",
      hours: "Mon - Sat: 8:00 AM - 6:00 PM",
    },

    /* ------------------------------- FAQ -------------------------------- */
    faq: {
      sectionBadge: "Frequently asked questions",
      pageTitle: "Frequently asked questions",
      pageSubtitle: "Find answers to the most common questions.",
    },

    /* ------------------------------ Footer ------------------------------ */
    footer: {
      tagline:
        "Your trusted multi-service partner for travel, finance and much more.",
      quickLinks: "Quick links",
      ourServices: "Our services",
      contact: "Contact",
      newsletter: "Newsletter",
      newsletterText: "Get our offers and news.",
      newsletterPlaceholder: "Your email",
      subscribe: "Subscribe",
      rights: "All rights reserved.",
      legal: "Legal notice",
      privacy: "Privacy",
    },

    /* ------------------------------ Admin ------------------------------- */
    admin: {
      nav: {
        dashboard: "Dashboard",
        notifications: "Notifications",
        messages: "Messages",
        bookings: "Bookings",
        site: "Site control",
        settings: "Settings",
        logout: "Logout",
      },
      role: "Secured",
      dashboard: {
        title: "Dashboard",
        subtitle: "Overview of the site's real-time flow",
        activeVisitors: "Active visitors",
        onlineNow: "Online now",
        totalVisits: "Total visits",
        today: "Today",
        pageViews: "Page views",
        avgTime: "Average time",
        unreadMessages: "Unread messages",
        pendingBookings: "Pending bookings",
        activeNotifications: "Active notifications",
        hourlyTraffic: "Hourly traffic (last 24 hours)",
        hourlyTrafficSubtitle: "Page views per hour - Real data",
      },
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        confirm: "Confirm",
        loading: "Loading...",
      },
    },
  },
} as const
