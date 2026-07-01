import type { Dictionary } from "@/i18n/types";

export const ptBr = {
  meta: {
    siteDescription:
      "Yuri Cunha escreve sobre software, privacidade, self-hosting, automação e pequenos sistemas úteis.",
  },
  navigation: {
    blog: "Blog",
    snippets: "Notas",
    projects: "Projetos",
    about: "Sobre",
    contact: "Contato",
  },
  common: {
    skipToContent: "Ir para o conteúdo",
    language: "Idioma",
    openLanguageMenu: "Escolher idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    latest: "Recentes",
    featured: "Notas recentes",
    viewAll: "Ver tudo",
    readMore: "Ler mais",
    email: "Email",
    github: "GitHub",
    rss: "RSS",
    website: "Site",
    externalLink: "Link externo",
    primaryNavigation: "Navegação principal",
    externalLinks: "Links externos",
    published: "Publicado",
    updated: "Atualizado",
    availableInEnglish: "Disponível em inglês",
    backToBlog: "Voltar para todos os posts",
    backToSnippets: "Voltar para as notas",
    backToProjects: "Voltar para os projetos",
    tableOfContents: "Nesta página",
    onThisNote: "Nesta nota",
    copyCode: "Copiar código",
    copied: "Copiado",
    footerNote: "Feito com cuidado. Mantido simples de propósito.",
    minuteRead: (minutes) => `${minutes} min de leitura`,
    relatedPosts: "Posts relacionados",
    nextPost: "Próximo post",
    previousPost: "Post anterior",
    search: "Buscar",
  },
  projectStatuses: {
    active: "Ativo",
    maintained: "Mantido",
    paused: "Pausado",
    archived: "Arquivado",
    completed: "Concluído",
    experimental: "Experimental",
  },
  home: {
    eyebrow: "Notas pessoais da web aberta",
    title: "Eu construo sistemas privados e tranquilos para mim e para a web aberta.",
    titleHighlight: "tranquilos",
    description:
      "Software, self-hosting, privacidade, automação e pequenas coisas úteis. Aqui guardo o trabalho e as ideias por trás dele.",
    statement: "Liberdade digital não é o padrão.",
    statementHighlight: "Liberdade",
    statementDetail:
      "Ela é construída com ferramentas deliberadas, sistemas compreensíveis e a escolha de possuir mais da nossa vida digital.",
    exploreTitle: "Um pequeno arquivo, mantido de propósito.",
    exploreDescription:
      "Textos mais longos ficam no blog. Notas práticas ficam nos snippets. Sistemas e experimentos selecionados ficam nos projetos.",
  },
  pages: {
    blog: {
      title: "Blog",
      description:
        "Ensaios, decisões técnicas, notas pessoais e reflexões sobre construir software e manter meus próprios sistemas.",
      empty: "As primeiras notas estão sendo preparadas.",
      entryCount: (count) => `${count} ${count === 1 ? "nota" : "notas"}`,
    },
    snippets: {
      title: "Notas",
      description:
        "Um caderno prático de comandos, configurações, padrões e do contexto que torna tudo isso útil.",
      empty: "O caderno ainda está tomando forma.",
      entryCount: (count) =>
        `${count} ${count === 1 ? "nota técnica" : "notas técnicas"}`,
    },
    projects: {
      title: "Projetos",
      description:
        "Ferramentas, infraestrutura, traduções, experimentos e trabalhos públicos selecionados. Um arquivo, não um currículo.",
      empty: "Os trabalhos selecionados aparecerão aqui em breve.",
      entryCount: (count) => `${count} ${count === 1 ? "artefato" : "artefatos"}`,
      detail: {
        title: "Detalhes do artefato",
        status: "Status",
        type: "Tipo",
        stack: "Stack",
        source: "Fonte",
        started: "Início",
        links: "Links",
      },
    },
    about: {
      title: "Sobre",
      description:
        "Sou Yuri. Gosto de software que continua compreensível, infraestrutura que não exige atenção e ferramentas que dão mais controle às pessoas.",
      paragraphs: [
        "Construo pequenos sistemas para mim e para a web aberta: scripts, sites, automações, serviços self-hosted e notas que me ajudam a lembrar por que algo existe.",
        "Privacidade, self-hosting, automação e software simples continuam aparecendo porque tornam a vida digital menos emprestada e mais reparável.",
        "Este site é onde guardo esse rastro: textos longos, notas práticas, projetos selecionados e pequenos aprendizados que sumiriam em chats, issues ou plataformas fechadas.",
      ],
      careTitle: "Pequenas regras",
      careItems: [
        "Software que continua compreensível",
        "Sistemas que eu consigo reparar",
        "Privacidade sem teatro",
        "Automação que remove atrito",
        "Ferramentas que não exigem atenção",
      ],
      currentlyTitle: "Agora",
      currentlyItems: [
        "Construindo pequenas ferramentas",
        "Escrevendo notas práticas",
        "Mantendo infraestrutura previsível",
      ],
      closing: "Um canto quieto para coisas que construo e aprendo.",
    },
    contact: {
      title: "Contato",
      description:
        "Email é a melhor forma de falar comigo. Para código, issues e trabalho público, o GitHub costuma ser o lugar certo.",
      note: "Sem formulários, pixels de rastreamento ou funis automáticos. Apenas links diretos.",
      emailLabel: "Enviar um email",
      githubLabel: "Encontrar no GitHub",
    },
  },
} satisfies Dictionary;
