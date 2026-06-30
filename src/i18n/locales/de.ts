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
    website: "Website",
    externalLink: "Externer Link",
    primaryNavigation: "Hauptnavigation",
    externalLinks: "Externe Links",
    published: "Veröffentlicht",
    updated: "Aktualisiert",
    availableInEnglish: "Auf Englisch verfügbar",
    backToBlog: "Zurück zu allen Beiträgen",
    backToSnippets: "Zurück zu den Notizen",
    backToProjects: "Zurück zu den Projekten",
    tableOfContents: "Auf dieser Seite",
    onThisNote: "In dieser Notiz",
    copyCode: "Code kopieren",
    copied: "Kopiert",
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
      entryCount: (count) => `${count} ${count === 1 ? "Notiz" : "Notizen"}`,
    },
    snippets: {
      title: "Notizen",
      description:
        "Ein praktisches Notizbuch für Befehle, Konfigurationen, Muster und den Kontext, der sie nützlich macht.",
      empty: "Das Notizbuch nimmt noch Form an.",
      entryCount: (count) => `${count} ${count === 1 ? "Notiz" : "Notizen"}`,
    },
    projects: {
      title: "Projekte",
      description:
        "Ausgewählte Werkzeuge, Infrastruktur, Übersetzungen, Experimente und öffentliche Arbeiten. Ein Archiv, kein Lebenslauf.",
      empty: "Ausgewählte Arbeiten erscheinen bald hier.",
      entryCount: (count) =>
        `${count} ${count === 1 ? "Artefakt" : "Artefakte"}`,
      detail: {
        title: "Artefakt-Details",
        status: "Status",
        type: "Typ",
        stack: "Stack",
        source: "Quelle",
        started: "Begonnen",
        links: "Links",
      },
    },
    about: {
      title: "Über mich",
      description:
        "Ich bin Yuri. Ich mag Software, die verständlich bleibt, Infrastruktur, die keine Aufmerksamkeit verlangt, und Werkzeuge, die Menschen mehr Kontrolle geben.",
      paragraphs: [
        "Ich baue kleine Systeme für mich und das offene Web: Skripte, Websites, Automatisierungen, selbst gehostete Dienste und Notizen, die festhalten, warum etwas existiert.",
        "Datenschutz, Self-Hosting, Automatisierung und einfache Software tauchen immer wieder auf, weil sie das digitale Leben weniger geliehen und besser reparierbar machen.",
        "Diese Website bewahrt die Spur davon: längere Gedanken, praktische Notizen, ausgewählte Projekte und kleine Erkenntnisse, die sonst in Chats, Issues oder geschlossenen Plattformen verschwinden würden.",
      ],
      careTitle: "Kleine Regeln",
      careItems: [
        "Software, die verständlich bleibt",
        "Systeme, die ich reparieren kann",
        "Datenschutz ohne Theater",
        "Automatisierung, die Reibung verringert",
        "Werkzeuge, die keine Aufmerksamkeit verlangen",
      ],
      currentlyTitle: "Gerade",
      currentlyItems: [
        "Kleine Werkzeuge bauen",
        "Praktische Notizen schreiben",
        "Infrastruktur langweilig halten",
      ],
      closing: "Eine ruhige Ecke für Dinge, die ich baue und lerne.",
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
