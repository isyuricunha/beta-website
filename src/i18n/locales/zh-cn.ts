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
    featured: "最新记录",
    viewAll: "查看全部",
    readMore: "继续阅读",
    email: "邮箱",
    github: "GitHub",
    rss: "RSS",
    website: "网站",
    externalLink: "外部链接",
    primaryNavigation: "主导航",
    externalLinks: "外部链接",
    published: "发布",
    updated: "更新",
    availableInEnglish: "提供英文版本",
    backToBlog: "返回全部文章",
    backToSnippets: "返回技术笔记",
    backToProjects: "返回项目",
    tableOfContents: "本页内容",
    onThisNote: "本篇笔记",
    copyCode: "复制代码",
    copied: "已复制",
    footerNote: "用心构建，有意保持简单。",
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
      entryCount: (count) => `${count} 条记录`,
    },
    snippets: {
      title: "技术笔记",
      description:
        "记录命令、配置、模式，以及让它们真正有用的背景与使用方式。",
      empty: "这本技术笔记仍在整理中。",
      entryCount: (count) => `${count} 条技术笔记`,
    },
    projects: {
      title: "项目",
      description:
        "精选的工具、基础设施、翻译、实验和公开工作。这是一份档案，不是简历。",
      empty: "精选项目即将出现在这里。",
      entryCount: (count) => `${count} 件作品`,
      detail: {
        title: "作品详情",
        status: "状态",
        type: "类型",
        stack: "技术栈",
        source: "源码",
        started: "开始",
        links: "链接",
      },
    },
    about: {
      title: "关于",
      description:
        "我是 Yuri。我喜欢始终能被理解的软件、不争夺注意力的基础设施，以及把更多控制权交还给人的工具。",
      paragraphs: [
        "我为自己和开放网络构建小系统：脚本、网站、自动化、自托管服务，以及帮助我记住一件东西为何存在的笔记。",
        "隐私、自托管、自动化和简单软件反复出现，是因为它们让数字生活少一点借来的感觉，多一点可以修理的余地。",
        "这个网站保存这些痕迹：较长的思考、实用笔记、选定项目，以及那些本来会消失在聊天、issue 或封闭平台里的小经验。",
      ],
      careTitle: "小规则",
      careItems: [
        "始终能被理解的软件",
        "我能修理的系统",
        "没有表演感的隐私",
        "减少摩擦的自动化",
        "不争夺注意力的工具",
      ],
      currentlyTitle: "现在",
      currentlyItems: [
        "构建小工具",
        "写实用笔记",
        "保持基础设施平淡可靠",
      ],
      closing: "一个安静的角落，用来放下我构建和学到的东西。",
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
