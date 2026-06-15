import type { Dictionary } from "@/i18n/types";

export const en = {
  meta: {
    siteDescription:
      "Yuri Cunha writes about software, privacy, self-hosting, automation, and small useful systems.",
  },
  navigation: {
    blog: "Blog",
    snippets: "Snippets",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  common: {
    skipToContent: "Skip to content",
    language: "Language",
    openLanguageMenu: "Choose language",
    latest: "Latest",
    featured: "Featured",
    viewAll: "View all",
    readMore: "Read more",
    email: "Email",
    github: "GitHub",
    rss: "RSS",
    externalLink: "External link",
    published: "Published",
    updated: "Updated",
    availableInEnglish: "Available in English",
    backToBlog: "Back to all posts",
    backToSnippets: "Back to snippets",
    backToProjects: "Back to projects",
    tableOfContents: "On this page",
    minuteRead: (minutes) => `${minutes} min read`,
  },
  projectStatuses: {
    active: "Active",
    maintained: "Maintained",
    paused: "Paused",
    archived: "Archived",
    completed: "Completed",
    experimental: "Experimental",
  },
  home: {
    eyebrow: "Personal notes from the open web",
    title: "I build private, quiet systems for myself and the open web.",
    titleHighlight: "quiet",
    description:
      "Software, self-hosting, privacy, automation, and small useful things. This is where I keep the work and the thinking behind it.",
    statement: "Digital freedom is not default.",
    statementDetail:
      "It is built through deliberate tools, understandable systems, and the choice to own more of our digital lives.",
    exploreTitle: "A small archive, kept on purpose.",
    exploreDescription:
      "Longer thoughts live in the blog. Practical notes stay in snippets. Selected systems and experiments are kept as projects.",
  },
  pages: {
    blog: {
      title: "Blog",
      description:
        "Essays, technical decisions, personal notes, and reflections from building software and running my own systems.",
      empty: "The first notes are being prepared.",
    },
    snippets: {
      title: "Snippets",
      description:
        "A practical notebook for commands, configurations, patterns, and the context that makes them useful.",
      empty: "The notebook is still taking shape.",
    },
    projects: {
      title: "Projects",
      description:
        "Selected tools, infrastructure, translations, experiments, and public work. An archive, not a résumé.",
      empty: "Selected work will appear here soon.",
    },
    about: {
      title: "About",
      description:
        "I am Yuri, a software developer interested in private computing, useful automation, and the quieter parts of the web.",
      paragraphs: [
        "I like systems that can be understood, repaired, and owned by the people who depend on them. That usually leads me toward open source, self-hosting, privacy, and deliberately small software.",
        "This website is a place to document what I learn, explain the tradeoffs behind what I build, and keep a personal record outside platforms designed around attention.",
      ],
      careTitle: "Things I care about",
      careItems: [
        "Software that respects the person using it",
        "Self-hosted systems with clear operational boundaries",
        "Automation that removes friction without hiding control",
        "Writing that explains context, not only outcomes",
      ],
    },
    contact: {
      title: "Contact",
      description:
        "Email is the best way to reach me. For code, issues, and public work, GitHub is usually the right place.",
      note: "No forms, tracking pixels, or automated funnels. Just direct links.",
      emailLabel: "Send an email",
      githubLabel: "Find me on GitHub",
    },
  },
} satisfies Dictionary;
