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
    website: "ウェブサイト",
    externalLink: "外部リンク",
    primaryNavigation: "メインナビゲーション",
    externalLinks: "外部リンク",
    published: "公開",
    updated: "更新",
    availableInEnglish: "英語版を表示",
    backToBlog: "ブログ一覧へ戻る",
    backToSnippets: "技術ノートへ戻る",
    backToProjects: "プロジェクトへ戻る",
    tableOfContents: "目次",
    onThisNote: "このノートの内容",
    copyCode: "コードをコピー",
    copied: "コピー済み",
    footerNote: "丁寧に作り、意図して簡素に保つ。",
    minuteRead: (minutes) => `約${minutes}分`,
    relatedPosts: "関連記事",
    nextPost: "次の記事",
    previousPost: "前の記事",
    search: "検索",
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
      entryCount: (count) => `${count}件の技術ノート`,
    },
    projects: {
      title: "プロジェクト",
      description:
        "選んだツール、インフラ、翻訳、実験、公開活動。履歴書ではなく、作ったものの記録です。",
      empty: "選んだ活動をまもなく掲載します。",
      entryCount: (count) => `${count}件の制作物`,
      detail: {
        title: "制作物の詳細",
        status: "状態",
        type: "種類",
        stack: "技術",
        source: "ソース",
        started: "開始",
        links: "リンク",
      },
    },
    about: {
      title: "自己紹介",
      description:
        "Yuri です。理解し続けられるソフトウェア、注意を奪わないインフラ、人により多くの制御を返す道具が好きです。",
      paragraphs: [
        "自分とオープンウェブのために、小さな仕組みを作っています。スクリプト、サイト、自動化、セルフホストのサービス、そして何のために作ったのかを忘れないためのメモです。",
        "プライバシー、セルフホスティング、自動化、シンプルなソフトウェアに戻ってくるのは、デジタルな生活を借り物ではなく、修理できるものに近づけてくれるからです。",
        "このサイトには、その足跡を残しています。長い文章、実用的な技術ノート、選んだプロジェクト、チャットや issue や閉じたプラットフォームに消えてしまう小さな学びです。",
      ],
      careTitle: "小さな決めごと",
      careItems: [
        "理解し続けられるソフトウェア",
        "自分で直せる仕組み",
        "見せかけではないプライバシー",
        "手間を減らす自動化",
        "注意を奪わない道具",
      ],
      currentlyTitle: "いま",
      currentlyItems: [
        "小さな道具を作る",
        "実用的なノートを書く",
        "退屈なインフラを保つ",
      ],
      closing: "作ったものと学んだことを置いておく、静かな場所です。",
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
