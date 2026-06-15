import type { Dictionary } from "@/i18n/types";

export const ja = {
  meta: {
    siteDescription:
      "Yuri Cunha がソフトウェア、プライバシー、セルフホスティング、自動化、小さく役立つ仕組みについて書くサイトです。",
  },
  navigation: {
    blog: "ブログ",
    snippets: "技術ノート",
    projects: "プロジェクト",
    about: "自己紹介",
    contact: "連絡先",
  },
  common: {
    skipToContent: "本文へ移動",
    language: "言語",
    openLanguageMenu: "言語を選択",
    latest: "最新",
    featured: "最近の記録",
    viewAll: "すべて見る",
    readMore: "続きを読む",
    email: "メール",
    github: "GitHub",
    rss: "RSS",
    externalLink: "外部リンク",
    published: "公開",
    updated: "更新",
    availableInEnglish: "英語版を表示",
    backToBlog: "ブログ一覧へ戻る",
    backToSnippets: "技術ノートへ戻る",
    backToProjects: "プロジェクトへ戻る",
    tableOfContents: "目次",
    footerNote: "丁寧に作り、意図して簡素に保つ。",
    minuteRead: (minutes) => `約${minutes}分`,
  },
  projectStatuses: {
    active: "進行中",
    maintained: "保守中",
    paused: "一時停止",
    archived: "アーカイブ",
    completed: "完了",
    experimental: "実験中",
  },
  home: {
    eyebrow: "オープンウェブからの個人的な記録",
    title: "自分とオープンウェブのために、静かでプライベートな仕組みを作っています。",
    titleHighlight: "静か",
    description:
      "ソフトウェア、セルフホスティング、プライバシー、自動化、小さく役立つもの。ここには成果と、その背景にある考えを残します。",
    statement: "デジタルの自由は、最初から与えられるものではありません。",
    statementHighlight: "自由",
    statementDetail:
      "意図を持った道具、理解できる仕組み、そしてデジタル生活を自分で所有する選択によって築かれます。",
    exploreTitle: "意図を持って残す、小さなアーカイブ。",
    exploreDescription:
      "長い文章はブログに、実用的な記録は技術ノートに、選んだ仕組みや実験はプロジェクトにまとめています。",
  },
  pages: {
    blog: {
      title: "ブログ",
      description:
        "ソフトウェア開発や自分のシステム運用から生まれたエッセイ、技術的な判断、個人的な記録、考察。",
      empty: "最初の記事を準備しています。",
      entryCount: (count) => `${count}件の記録`,
    },
    snippets: {
      title: "技術ノート",
      description:
        "コマンド、設定、パターンと、それらが役立つ理由をまとめる実用的なノートです。",
      empty: "ノートを整理しています。",
    },
    projects: {
      title: "プロジェクト",
      description:
        "選んだツール、インフラ、翻訳、実験、公開活動。履歴書ではなく、作ったものの記録です。",
      empty: "選んだ活動をまもなく掲載します。",
    },
    about: {
      title: "自己紹介",
      description:
        "Yuri です。プライベートなコンピューティング、役立つ自動化、静かなウェブに関心を持つソフトウェア開発者です。",
      paragraphs: [
        "使う人が理解し、修理し、所有できる仕組みが好きです。その関心は、オープンソース、セルフホスティング、プライバシー、意図的に小さなソフトウェアへつながっています。",
        "このサイトでは、学んだこと、作るときの判断、その背景を記録し、注目を集めるために設計されたプラットフォームの外に個人的な場所を保ちます。",
      ],
      careTitle: "大切にしていること",
      careItems: [
        "使う人を尊重するソフトウェア",
        "運用上の境界が明確なセルフホスト環境",
        "制御を隠さずに手間を減らす自動化",
        "結果だけでなく背景も伝える文章",
      ],
    },
    contact: {
      title: "連絡先",
      description:
        "連絡にはメールが最適です。コード、issue、公開活動については GitHub を利用してください。",
      note: "フォーム、追跡ピクセル、自動化された導線はありません。直接つながるリンクだけです。",
      emailLabel: "メールを送る",
      githubLabel: "GitHub を見る",
    },
  },
} satisfies Dictionary;
