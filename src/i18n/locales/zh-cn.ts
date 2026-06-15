import type { Dictionary } from "@/i18n/types";

export const zhCn = {
  meta: {
    siteDescription:
      "Yuri Cunha 在这里记录软件、隐私、自托管、自动化和小而实用的系统。",
  },
  navigation: {
    blog: "博客",
    snippets: "技术笔记",
    projects: "项目",
    about: "关于",
    contact: "联系",
  },
  common: {
    skipToContent: "跳到正文",
    language: "语言",
    openLanguageMenu: "选择语言",
    latest: "最新",
    featured: "精选",
    viewAll: "查看全部",
    readMore: "继续阅读",
    email: "邮箱",
    github: "GitHub",
    rss: "RSS",
    externalLink: "外部链接",
    published: "发布",
    updated: "更新",
    availableInEnglish: "提供英文版本",
    backToBlog: "返回全部文章",
    backToSnippets: "返回技术笔记",
    backToProjects: "返回项目",
    tableOfContents: "本页内容",
    minuteRead: (minutes) => `约 ${minutes} 分钟`,
  },
  projectStatuses: {
    active: "进行中",
    maintained: "维护中",
    paused: "已暂停",
    archived: "已归档",
    completed: "已完成",
    experimental: "实验性",
  },
  home: {
    eyebrow: "来自开放网络的个人记录",
    title: "我为自己和开放网络构建私密、安静的系统。",
    titleHighlight: "安静",
    description:
      "软件、自托管、隐私、自动化，以及小而实用的东西。这里保存我的工作，也保存它背后的思考。",
    statement: "数字自由从来不是默认选项。",
    statementHighlight: "自由",
    statementDetail:
      "它来自有意识选择的工具、可以理解的系统，以及对更多数字生活拥有所有权的决定。",
    exploreTitle: "一个有意维护的小型档案。",
    exploreDescription:
      "较长的思考放在博客，实用记录放在技术笔记，选定的系统与实验则收录在项目中。",
  },
  pages: {
    blog: {
      title: "博客",
      description:
        "关于软件开发和维护个人系统的文章、技术决策、个人记录与思考。",
      empty: "第一批文章正在准备中。",
    },
    snippets: {
      title: "技术笔记",
      description:
        "记录命令、配置、模式，以及让它们真正有用的背景与使用方式。",
      empty: "这本技术笔记仍在整理中。",
    },
    projects: {
      title: "项目",
      description:
        "精选的工具、基础设施、翻译、实验和公开工作。这是一份档案，不是简历。",
      empty: "精选项目即将出现在这里。",
    },
    about: {
      title: "关于",
      description:
        "我是 Yuri，一名关注私密计算、实用自动化和安静网络空间的软件开发者。",
      paragraphs: [
        "我喜欢那些能被依赖它的人理解、修复和拥有的系统。这通常让我走向开源、自托管、隐私，以及有意保持小巧的软件。",
        "这个网站用来记录我学到的内容，解释构建过程中的取舍，并在围绕注意力设计的平台之外保留一份个人档案。",
      ],
      careTitle: "我在意的事情",
      careItems: [
        "尊重使用者的软件",
        "运行边界清晰的自托管系统",
        "减少摩擦但不隐藏控制权的自动化",
        "不仅给出结果，也解释背景的写作",
      ],
    },
    contact: {
      title: "联系",
      description:
        "电子邮件是联系我的最佳方式。代码、issue 和公开工作通常更适合在 GitHub 上交流。",
      note: "没有表单、跟踪像素或自动营销流程，只有直接链接。",
      emailLabel: "发送邮件",
      githubLabel: "在 GitHub 上找到我",
    },
  },
} satisfies Dictionary;
