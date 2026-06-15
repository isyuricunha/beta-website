import type { Dictionary } from "@/i18n/types";

export const de = {
  meta: {
    siteDescription:
      "Yuri Cunha schreibt über Software, Datenschutz, Self-Hosting, Automatisierung und kleine nützliche Systeme.",
  },
  navigation: {
    blog: "Blog",
    snippets: "Notizen",
    projects: "Projekte",
    about: "Über mich",
    contact: "Kontakt",
  },
  common: {
    skipToContent: "Zum Inhalt springen",
    language: "Sprache",
    openLanguageMenu: "Sprache wählen",
    latest: "Neu",
    featured: "Neue Notizen",
    viewAll: "Alle ansehen",
    readMore: "Weiterlesen",
    email: "E-Mail",
    github: "GitHub",
    rss: "RSS",
    externalLink: "Externer Link",
    published: "Veröffentlicht",
    updated: "Aktualisiert",
    availableInEnglish: "Auf Englisch verfügbar",
    backToBlog: "Zurück zu allen Beiträgen",
    backToSnippets: "Zurück zu den Notizen",
    backToProjects: "Zurück zu den Projekten",
    tableOfContents: "Auf dieser Seite",
    footerNote: "Mit Sorgfalt gebaut. Bewusst einfach gehalten.",
    minuteRead: (minutes) => `${minutes} Min. Lesezeit`,
  },
  projectStatuses: {
    active: "Aktiv",
    maintained: "Gepflegt",
    paused: "Pausiert",
    archived: "Archiviert",
    completed: "Abgeschlossen",
    experimental: "Experimentell",
  },
  home: {
    eyebrow: "Persönliche Notizen aus dem offenen Web",
    title: "Ich baue private, ruhige Systeme für mich und das offene Web.",
    titleHighlight: "ruhige",
    description:
      "Software, Self-Hosting, Datenschutz, Automatisierung und kleine nützliche Dinge. Hier bewahre ich die Arbeit und die Gedanken dahinter auf.",
    statement: "Digitale Freiheit ist nicht der Standard.",
    statementHighlight: "Freiheit",
    statementDetail:
      "Sie entsteht durch bewusst gewählte Werkzeuge, verständliche Systeme und die Entscheidung, mehr vom eigenen digitalen Leben zu besitzen.",
    exploreTitle: "Ein kleines Archiv, bewusst gepflegt.",
    exploreDescription:
      "Längere Gedanken stehen im Blog. Praktische Hinweise bleiben in den Notizen. Ausgewählte Systeme und Experimente finden sich unter Projekte.",
  },
  pages: {
    blog: {
      title: "Blog",
      description:
        "Essays, technische Entscheidungen, persönliche Notizen und Gedanken aus der Softwareentwicklung und dem Betrieb eigener Systeme.",
      empty: "Die ersten Beiträge werden vorbereitet.",
    },
    snippets: {
      title: "Notizen",
      description:
        "Ein praktisches Notizbuch für Befehle, Konfigurationen, Muster und den Kontext, der sie nützlich macht.",
      empty: "Das Notizbuch nimmt noch Form an.",
    },
    projects: {
      title: "Projekte",
      description:
        "Ausgewählte Werkzeuge, Infrastruktur, Übersetzungen, Experimente und öffentliche Arbeiten. Ein Archiv, kein Lebenslauf.",
      empty: "Ausgewählte Arbeiten erscheinen bald hier.",
    },
    about: {
      title: "Über mich",
      description:
        "Ich bin Yuri, Softwareentwickler mit Interesse an privatem Computing, nützlicher Automatisierung und den ruhigeren Teilen des Webs.",
      paragraphs: [
        "Ich mag Systeme, die von den Menschen, die auf sie angewiesen sind, verstanden, repariert und besessen werden können. Das führt mich meist zu Open Source, Self-Hosting, Datenschutz und bewusst kleiner Software.",
        "Diese Website dokumentiert, was ich lerne, erklärt die Abwägungen hinter meiner Arbeit und bewahrt eine persönliche Aufzeichnung außerhalb aufmerksamkeitsgetriebener Plattformen.",
      ],
      careTitle: "Was mir wichtig ist",
      careItems: [
        "Software, die ihre Nutzer respektiert",
        "Self-Hosting mit klaren betrieblichen Grenzen",
        "Automatisierung, die Reibung verringert, ohne Kontrolle zu verbergen",
        "Texte, die Kontext und nicht nur Ergebnisse erklären",
      ],
    },
    contact: {
      title: "Kontakt",
      description:
        "Per E-Mail bin ich am besten erreichbar. Für Code, Issues und öffentliche Arbeit ist GitHub meist der richtige Ort.",
      note: "Keine Formulare, Tracking-Pixel oder automatisierten Funnels. Nur direkte Links.",
      emailLabel: "E-Mail senden",
      githubLabel: "Auf GitHub finden",
    },
  },
} satisfies Dictionary;
