import type { Dictionary } from "@/i18n/types";

export const fr = {
  meta: {
    siteDescription:
      "Yuri Cunha écrit sur le logiciel, la vie privée, l’auto-hébergement, l’automatisation et les petits systèmes utiles.",
  },
  navigation: {
    blog: "Blog",
    snippets: "Notes",
    projects: "Projets",
    about: "À propos",
    contact: "Contact",
  },
  common: {
    skipToContent: "Aller au contenu",
    language: "Langue",
    openLanguageMenu: "Choisir la langue",
    latest: "Récent",
    featured: "Notes récentes",
    viewAll: "Tout voir",
    readMore: "Lire la suite",
    email: "E-mail",
    github: "GitHub",
    rss: "RSS",
    externalLink: "Lien externe",
    published: "Publié",
    updated: "Mis à jour",
    availableInEnglish: "Disponible en anglais",
    backToBlog: "Retour à tous les articles",
    backToSnippets: "Retour aux notes",
    backToProjects: "Retour aux projets",
    tableOfContents: "Dans cette page",
    footerNote: "Construit avec soin. Gardé simple par choix.",
    minuteRead: (minutes) => `${minutes} min de lecture`,
  },
  projectStatuses: {
    active: "Actif",
    maintained: "Maintenu",
    paused: "En pause",
    archived: "Archivé",
    completed: "Terminé",
    experimental: "Expérimental",
  },
  home: {
    eyebrow: "Notes personnelles depuis le web ouvert",
    title: "Je construis des systèmes privés et calmes pour moi-même et le web ouvert.",
    titleHighlight: "calmes",
    description:
      "Logiciel, auto-hébergement, vie privée, automatisation et petites choses utiles. Je conserve ici le travail et les idées qui l’accompagnent.",
    statement: "La liberté numérique n’est pas acquise.",
    statementHighlight: "liberté",
    statementDetail:
      "Elle se construit avec des outils choisis, des systèmes compréhensibles et la décision de posséder une plus grande part de notre vie numérique.",
    exploreTitle: "Une petite archive, entretenue avec intention.",
    exploreDescription:
      "Les réflexions longues vivent dans le blog. Les conseils pratiques restent dans les notes. Les systèmes et expériences choisis sont conservés dans les projets.",
  },
  pages: {
    blog: {
      title: "Blog",
      description:
        "Essais, décisions techniques, notes personnelles et réflexions issues de la création de logiciels et de la gestion de mes propres systèmes.",
      empty: "Les premières notes sont en préparation.",
      entryCount: (count) => `${count} ${count === 1 ? "note" : "notes"}`,
    },
    snippets: {
      title: "Notes",
      description:
        "Un carnet pratique de commandes, de configurations, de méthodes et du contexte qui les rend utiles.",
      empty: "Le carnet prend encore forme.",
      entryCount: (count) => `${count} ${count === 1 ? "note" : "notes"}`,
    },
    projects: {
      title: "Projets",
      description:
        "Outils, infrastructure, traductions, expériences et travaux publics sélectionnés. Une archive, pas un CV.",
      empty: "Une sélection de travaux apparaîtra bientôt ici.",
    },
    about: {
      title: "À propos",
      description:
        "Je suis Yuri, développeur logiciel intéressé par l’informatique privée, l’automatisation utile et les espaces plus calmes du web.",
      paragraphs: [
        "J’aime les systèmes que les personnes qui en dépendent peuvent comprendre, réparer et posséder. Cela me conduit souvent vers l’open source, l’auto-hébergement, la vie privée et les logiciels volontairement simples.",
        "Ce site me permet de documenter ce que j’apprends, d’expliquer les choix derrière ce que je construis et de garder une trace personnelle hors des plateformes conçues autour de l’attention.",
      ],
      careTitle: "Ce qui compte pour moi",
      careItems: [
        "Des logiciels qui respectent les personnes qui les utilisent",
        "Des systèmes auto-hébergés aux limites opérationnelles claires",
        "Une automatisation qui réduit les frictions sans masquer le contrôle",
        "Des textes qui expliquent le contexte, pas seulement le résultat",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "L’e-mail est le meilleur moyen de me joindre. Pour le code, les issues et le travail public, GitHub est généralement plus adapté.",
      note: "Pas de formulaire, de pixel de suivi ou de parcours automatisé. Seulement des liens directs.",
      emailLabel: "Envoyer un e-mail",
      githubLabel: "Me trouver sur GitHub",
    },
  },
} satisfies Dictionary;
