export const sections = [
  "blog",
  "snippets",
  "projects",
  "about",
  "contact",
] as const;

export type Section = (typeof sections)[number];

export const projectStatuses = [
  "active",
  "maintained",
  "paused",
  "archived",
  "completed",
  "experimental",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

type ArchivePageDictionary = {
  title: string;
  description: string;
  empty: string;
};

type BlogPageDictionary = ArchivePageDictionary & {
  entryCount: (count: number) => string;
};

type SnippetsPageDictionary = ArchivePageDictionary & {
  entryCount: (count: number) => string;
};

export type Dictionary = {
  meta: {
    siteDescription: string;
  };
  navigation: Record<Section, string>;
  common: {
    skipToContent: string;
    language: string;
    openLanguageMenu: string;
    latest: string;
    featured: string;
    viewAll: string;
    readMore: string;
    email: string;
    github: string;
    rss: string;
    externalLink: string;
    published: string;
    updated: string;
    availableInEnglish: string;
    backToBlog: string;
    backToSnippets: string;
    backToProjects: string;
    tableOfContents: string;
    footerNote: string;
    minuteRead: (minutes: number) => string;
  };
  projectStatuses: Record<ProjectStatus, string>;
  home: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    statement: string;
    statementHighlight: string;
    statementDetail: string;
    exploreTitle: string;
    exploreDescription: string;
  };
  pages: {
    blog: BlogPageDictionary;
    snippets: SnippetsPageDictionary;
    projects: ArchivePageDictionary;
    about: {
      title: string;
      description: string;
      paragraphs: string[];
      careTitle: string;
      careItems: string[];
    };
    contact: {
      title: string;
      description: string;
      note: string;
      emailLabel: string;
      githubLabel: string;
    };
  };
};
