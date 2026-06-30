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
    website: "Site",
    externalLink: "Lien externe",
    primaryNavigation: "Navigation principale",
    externalLinks: "Liens externes",
    published: "Publié",
    updated: "Mis à jour",
    availableInEnglish: "Disponible en anglais",
    backToBlog: "Retour à tous les articles",
    backToSnippets: "Retour aux notes",
    backToProjects: "Retour aux projets",
    tableOfContents: "Dans cette page",
    onThisNote: "Dans cette note",
    copyCode: "Copier le code",
    copied: "Copié",
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
      entryCount: (count) =>
        `${count} ${count === 1 ? "artefact" : "artefacts"}`,
      detail: {
        title: "Détails de l’artefact",
        status: "Statut",
        type: "Type",
        stack: "Stack",
        source: "Source",
        started: "Début",
        links: "Liens",
      },
    },
    about: {
      title: "À propos",
      description:
        "Je suis Yuri. J’aime les logiciels qui restent compréhensibles, l’infrastructure qui ne réclame pas d’attention et les outils qui redonnent du contrôle.",
      paragraphs: [
        "Je construis de petits systèmes pour moi-même et le web ouvert : scripts, sites, automatisations, services auto-hébergés et notes qui m’aident à me souvenir pourquoi une chose existe.",
        "La vie privée, l’auto-hébergement, l’automatisation et les logiciels simples reviennent souvent, parce qu’ils rendent la vie numérique moins empruntée et plus réparable.",
        "Ce site conserve cette trace : réflexions longues, notes pratiques, projets choisis et petits apprentissages qui disparaîtraient sinon dans des chats, des issues ou des plateformes fermées.",
      ],
      careTitle: "Petites règles",
      careItems: [
        "Des logiciels qui restent compréhensibles",
        "Des systèmes que je peux réparer",
        "La vie privée sans théâtre",
        "Une automatisation qui réduit les frictions",
        "Des outils qui ne réclament pas d’attention",
      ],
      currentlyTitle: "En ce moment",
      currentlyItems: [
        "Construire de petits outils",
        "Écrire des notes pratiques",
        "Garder l’infrastructure ennuyeuse",
      ],
      closing: "Un coin calme pour ce que je construis et apprends.",
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
