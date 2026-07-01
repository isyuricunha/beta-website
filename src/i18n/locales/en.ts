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
    featured: "Latest notes",
    viewAll: "View all",
    readMore: "Read more",
    email: "Email",
    github: "GitHub",
    rss: "RSS",
    website: "Website",
    externalLink: "External link",
    primaryNavigation: "Primary navigation",
    externalLinks: "External links",
    published: "Published",
    updated: "Updated",
    availableInEnglish: "Available in English",
    backToBlog: "Back to all posts",
    backToSnippets: "Back to snippets",
    backToProjects: "Back to projects",
    tableOfContents: "On this page",
    onThisNote: "On this note",
    copyCode: "Copy code",
    copied: "Copied",
    footerNote: "Built with care. Kept simple on purpose.",
    minuteRead: (minutes) => `${minutes} min read`,
    relatedPosts: "Related posts",
    nextPost: "Next post",
    previousPost: "Previous post",
    search: "Search",
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
    statementHighlight: "freedom",
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
      entryCount: (count) => `${count} ${count === 1 ? "note" : "notes"}`,
    },
    snippets: {
      title: "Snippets",
      description:
        "A practical notebook for commands, configurations, patterns, and the context that makes them useful.",
      empty: "The notebook is still taking shape.",
      entryCount: (count) => `${count} ${count === 1 ? "snippet" : "snippets"}`,
    },
    projects: {
      title: "Projects",
      description:
        "Selected tools, infrastructure, translations, experiments, and public work. An archive, not a résumé.",
      empty: "Selected work will appear here soon.",
      entryCount: (count) => `${count} ${count === 1 ? "artifact" : "artifacts"}`,
      detail: {
        title: "Artifact details",
        status: "Status",
        type: "Type",
        stack: "Stack",
        source: "Source",
        started: "Started",
        links: "Links",
      },
    },
    about: {
      title: "About",
      description:
        "I'm Yuri. I work close to the metal of the web: servers, databases, automation, and small private systems built to stay understandable.",
      paragraphs: [
        "I keep small systems for myself and the open web: servers, databases, scripts, automations, self-hosted services, and notes that explain why a thing exists.",
        "I like infrastructure that can be understood, repaired, and left alone when nothing needs attention. The best systems are usually boring in public and clear when they need work.",
        "Privacy, self-hosting, and automation keep showing up because they reduce dependence, noise, and the feeling that the tools around us belong to someone else.",
        "This site is where I keep the trail: longer notes, practical snippets, selected projects, and small lessons from systems I run, break, fix, and learn from.",
      ],
      careTitle: "Small rules",
      careItems: [
        "Systems that stay understandable",
        "Infrastructure I can repair",
        "Databases with clear boundaries",
        "Privacy without theater",
        "Automation that removes friction",
      ],
      currentlyTitle: "Currently",
      currentlyItems: [
        "Keeping servers boring",
        "Writing practical notes",
        "Automating small annoyances",
      ],
      closing: "A quiet corner for systems I keep, break, fix, and learn from.",
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
