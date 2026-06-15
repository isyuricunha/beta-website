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
    latest: "Recentes",
    featured: "Destaques",
    viewAll: "Ver tudo",
    readMore: "Ler mais",
    email: "Email",
    github: "GitHub",
    rss: "RSS",
    externalLink: "Link externo",
    published: "Publicado",
    updated: "Atualizado",
    availableInEnglish: "Disponível em inglês",
    backToBlog: "Voltar para todos os posts",
    backToSnippets: "Voltar para as notas",
    backToProjects: "Voltar para os projetos",
    tableOfContents: "Nesta página",
    minuteRead: (minutes) => `${minutes} min de leitura`,
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
    },
    snippets: {
      title: "Notas",
      description:
        "Um caderno prático de comandos, configurações, padrões e do contexto que torna tudo isso útil.",
      empty: "O caderno ainda está tomando forma.",
    },
    projects: {
      title: "Projetos",
      description:
        "Ferramentas, infraestrutura, traduções, experimentos e trabalhos públicos selecionados. Um arquivo, não um currículo.",
      empty: "Os trabalhos selecionados aparecerão aqui em breve.",
    },
    about: {
      title: "Sobre",
      description:
        "Sou Yuri, desenvolvedor de software interessado em computação privada, automação útil e nos cantos mais tranquilos da web.",
      paragraphs: [
        "Gosto de sistemas que possam ser compreendidos, reparados e controlados pelas pessoas que dependem deles. Isso normalmente me leva a código aberto, self-hosting, privacidade e software deliberadamente pequeno.",
        "Este site é um lugar para documentar o que aprendo, explicar as escolhas por trás do que construo e manter um registro pessoal fora de plataformas projetadas em torno da atenção.",
      ],
      careTitle: "Coisas que importam para mim",
      careItems: [
        "Software que respeita quem o utiliza",
        "Sistemas self-hosted com limites operacionais claros",
        "Automação que remove atrito sem esconder o controle",
        "Textos que explicam o contexto, não apenas o resultado",
      ],
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
