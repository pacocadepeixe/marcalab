/**
 * ============================================================
 *  CONFIGURAÇÃO CENTRAL DO SITE — MARCA LAB
 * ============================================================
 *  Edite aqui nome, domínio, contatos e dados da empresa.
 *  Tudo no site (SEO, schemas, footer, contatos) é lido
 *  deste arquivo — mudou aqui, mudou em todo o site.
 * ============================================================
 */

export const SITE = {
  name: 'Marca Lab',
  legalName: 'Marca Lab Indústria de Suplementos LTDA',
  /** Troque pelo domínio real quando estiver no ar (sem barra final) */
  url: 'https://marcalab.com.br',
  title: 'Marca Lab — Suplementos White Label com a Sua Marca',
  description:
    'Indústria de suplementos white label: criatina, whey protein, ômega 3, colágeno, vitaminas e mais com a sua marca. Formulação, registro, produção e entrega em um só lugar.',
  /** CNPJ, endereço e razão social — preencher com os dados reais */
  cnpj: '',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  contact: {
    email: 'contato@marcalab.com.br',
    phone: '',
    /** Link direto do WhatsApp (com DDI + DDD + número, sem símbolos) */
    whatsapp: 'https://wa.me/5511999999999',
    whatsappDisplay: '(11) 99999-9999',
  },
  social: {
    instagram: 'https://instagram.com/marcalab',
    linkedin: 'https://linkedin.com/company/marcalab',
  },
  author: 'Equipe Marca Lab',
  foundingDate: '2026',
};

export const NAV = [
  { label: 'Início', href: '/' },
  { label: 'Como Funciona', href: '/como-funciona' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'FAQ', href: '/faq' },
];

/** Categorias do blog (clusters de conteúdo) */
export const BLOG_CATEGORIES = {
  negocios: {
    label: 'Negócio & White Label',
    description:
      'Tudo sobre criar, registrar e escalar uma marca própria de suplementos: custos, margens, fornecedores e legislação.',
  },
  produtos: {
    label: 'Produtos & Ciência',
    description:
      'Guias completos sobre creatina, whey protein, ômega 3, colágeno e os principais ingredientes do mercado de suplementos.',
  },
  marketing: {
    label: 'Marketing & Vendas',
    description:
      'Estratégias práticas para vender suplementos: Instagram, marketplaces, precificação, embalagens e anúncios.',
  },
  mercado: {
    label: 'Mercado & Tendências',
    description:
      'Análises do mercado de suplementos no Brasil e no mundo: números, oportunidades e tendências de consumo.',
  },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

/**
 * Portfólio completo de produção — espelha as capacidades da indústria.
 * As 8 primeiras linhas têm página própria otimizada para SEO.
 */
export const PRODUCTS = [
  {
    slug: 'creatina-white-label',
    name: 'Creatina White Label',
    short: 'Creatina monohidratada em pó ou cápsulas, pureza premium.',
    icon: 'bolt',
    headline: 'Creatina White Label: produção com a sua marca',
    description:
      'Produza creatina monohidratada em pó ou cápsulas com a sua marca: pureza a partir de 99,9%, laudo de qualidade, rótulo personalizado e pronta para vender.',
    forms: ['Pote 300 g (pó)', 'Pote 150 g (pó)', 'Cápsulas 60–120 un.'],
  },
  {
    slug: 'whey-protein-white-label',
    name: 'Whey Protein White Label',
    short: 'Whey concentrado e blends com dosagens competitivas.',
    icon: 'shield',
    headline: 'Whey Protein White Label: produção com sua marca',
    description:
      'Whey protein concentrado e blends em sabores variados, com dosagem de proteína competitiva, embalagem premium e a sua marca. Produção white label completa.',
    forms: ['Pote 900 g / 1 kg', ' Sachê 30 g', 'Pote 2 kg'],
  },
  {
    slug: 'omega-3-white-label',
    name: 'Ômega 3 White Label',
    short: 'Ômega 3 EPA/DHA em cápsulas gelatinosas ou óleo vegetal.',
    icon: 'drop',
    headline: 'Ômega 3 White Label: cápsulas EPA/DHA com sua marca',
    description:
      'Produza ômega 3 (EPA/DHA) em cápsulas gelatinosas e óleos vegetais — cártamo, linhaça, prímula e semente de abóbora — com a sua marca e laudo de qualidade.',
    forms: ['Cápsulas 60–120 un.', 'Frasco 250 ml (óleo)'],
  },
  {
    slug: 'colageno-white-label',
    name: 'Colágeno White Label',
    short: 'Colágeno hidrolisado, Verisol® e blends para pele e articulações.',
    icon: 'sparkle',
    headline: 'Colágeno White Label: hidrolisado e Verisol',
    description:
      'Colágeno hidrolisado, peptídeos bioativos (Verisol®) e blends com vitamina C e biotina: produção white label com sabor, embalagem e rótulo personalizados.',
    forms: ['Pote 300 g (pó)', 'Sachês 10 g', 'Cápsulas 60–120 un.'],
  },
  {
    slug: 'pre-treino-white-label',
    name: 'Pré-Treino White Label',
    short: 'Pré-treinos, cafeína e taurina para energia e foco.',
    icon: 'flame',
    headline: 'Pré-Treino White Label: energia e foco com sua marca',
    description:
      'Desenvolva pré-treinos com cafeína, taurina, beta-alanina e creatina, além de cápsulas de cafeína pura e taurina. Formulação white label sob medida.',
    forms: ['Pote 300 g (pó)', 'Cápsulas 60 un.', 'Shot 60 ml'],
  },
  {
    slug: 'termogenico-white-label',
    name: 'Termogênico White Label',
    short: 'Termogênicos, diuréticos e linha emagrecimento.',
    icon: 'fire',
    headline: 'Termogênico White Label: linha de emagrecimento',
    description:
      'Produza termogênicos, diuréticos naturais, óleo de cártamo e blends emagrecedores com a sua marca. Formulação, rótulo, registro e produção inclusos.',
    forms: ['Cápsulas 60–120 un.', 'Pote 150 g (pó)'],
  },
  {
    slug: 'vitaminas-minerais-white-label',
    name: 'Vitaminas e Minerais White Label',
    short: 'Multivitamínicos, magnésio, biotina, zinco e mais.',
    icon: 'leaf',
    headline: 'Vitaminas e Minerais White Label com sua marca',
    description:
      'Vitaminas e minerais com a sua marca: multivitamínicos A–Z, magnésio treonato e dimalato, biotina, zinco, cálcio, vitamina D e blends para público masculino e feminino.',
    forms: ['Cápsulas 60–120 un.', 'Pote 60–90 tabletes'],
  },
  {
    slug: 'hipercalorico-white-label',
    name: 'Hipercalórico White Label',
    short: 'Hipercalóricos e anabolizantes naturais para massa.',
    icon: 'chart',
    headline: 'Hipercalórico White Label: ganho de massa',
    description:
      'Hipercalóricos de alto valor calórico e anabolizantes naturais (como ZMA e blends) produzidos com a sua marca. Ideal para o público de ganho de massa.',
    forms: ['Pote 1–3 kg', 'Sachês 50 g'],
  },
] as const;

/**
 * Linhas adicionais do portfólio (produzíveis, sem página dedicada).
 * Espelha a capacidade industrial completa.
 */
export const EXTRA_PORTFOLIO = [
  { name: 'Ervas e Fitoterápicos', examples: 'Cápsulas de ervas naturais, extratos padronizados e blends fitoterápicos' },
  { name: 'Saúde da Mulher', examples: 'Óleo de prímula, colágeno + biotina, blends para menopausa e TPM' },
  { name: 'Saúde do Homem', examples: 'ZMA, tribulus, blends para vitality e performance' },
  { name: 'Saúde Óssea e Articular', examples: 'Cálcio MK2, condroitina, glucosamina, blends articulares' },
  { name: 'Linha Infantil', examples: 'Vitaminas e suplementos com dosagem e sabor para crianças' },
  { name: 'Antioxidantes e Longevidade', examples: 'Luteína + zeaxantina, fosfatidilserina, shot detox, vitaminas lipossolúveis' },
  { name: 'Óleos em Cápsulas', examples: 'Cártamo com vitamina E, linhaça, semente de abóbora, coco e alho' },
  { name: 'Bebidas Funcionais', examples: 'Shots detox, bebidas vitamínicas e blends em pó para diluir' },
];

/** Números exibidos na home (ajuste conforme a realidade da empresa) */
export const STATS = [
  { value: '+120', label: 'produtos no portfólio' },
  { value: '99,9%', label: 'pureza mínima em ingredientes-chave' },
  { value: '30 dias', label: 'prazo médio de produção' },
  { value: '100%', label: 'rastreabilidade de lotes' },
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Briefing e escolha dos produtos',
    description:
      'Você escolhe os produtos e formatos do nosso portfólio (ou propõe uma formulação exclusiva). Definimos sabores, dosagens, embalagem e público-alvo.',
  },
  {
    number: '02',
    title: 'Formulação e desenvolvimento',
    description:
      'Nossa equipe técnica desenvolve ou ajusta a formulação, com laudos de matéria-prima e teste de estabilidade, sabor e dissolução.',
  },
  {
    number: '03',
    title: 'Marca, rótulo e embalagem',
    description:
      'Criamos (ou adaptamos) a arte do seu rótulo dentro das normas da ANVISA. Você aprova a arte antes de qualquer impressão.',
  },
  {
    number: '04',
    title: 'Regularização na ANVISA',
    description:
      'Cuidamos do enquadramento do produto, notificação/registro e da regularização da sua marca como empresa de alimentos/suplementos.',
  },
  {
    number: '05',
    title: 'Produção e controle de qualidade',
    description:
      'Produção em ambiente adequado com boas práticas de fabricação, controle de lote, pesagem conferida e análise de acabamento.',
  },
  {
    number: '06',
    title: 'Entrega e reposição',
    description:
      'Logística para todo o Brasil com código de rastreio e política simples de reposição para você nunca ficar sem estoque.',
  },
];

export const FAQ_HOME = [
  {
    question: 'O que é suplemento white label?',
    answer:
      'White label é um modelo de negócio em que uma indústria (como a Marca Lab) produz o suplemento e você vende com a sua própria marca. Você não precisa de fábrica própria: cuidamos de formulação, produção, laudos e embalagem, enquanto você constrói a marca e as vendas.',
  },
  {
    question: 'Qual é o pedido mínimo para produzir com a minha marca?',
    answer:
      'O pedido mínimo varia por produto e formato — em geral, trabalhamos com lotes a partir de algumas centenas de unidades para tornar a operação viável para marcas iniciantes. Solicite uma cotação e informamos o mínimo exato do produto que você deseja.',
  },
  {
    question: 'Vocês ajudam com o registro na ANVISA?',
    answer:
      'Sim. Orientamos todo o processo: enquadramento do produto como alimento/suplemento, elaboração de rótulo conforme RDC 710/2022, notificação junto à ANVISA e adequação da sua empresa. A maior parte dos suplementos vendidos no Brasil é notificada, o que torna o processo mais simples e rápido.',
  },
  {
    question: 'Quanto tempo leva para lançar minha marca?',
    answer:
      'Do briefing à entrega, o ciclo típico leva de 30 a 60 dias, dependendo da complexidade da formulação, da aprovação da arte e do prazo de produção do lote. Produtos de portfólio prontos são mais rápidos; formulações exclusivas levam mais tempo para desenvolvimento.',
  },
  {
    question: 'Posso criar formulação exclusiva ou devo usar as formulações prontas?',
    answer:
      'As duas opções existem. Formulações prontas do portfólio são mais rápidas e baratas de lançar. Formulações exclusivas diferenciam sua marca no mercado — nossa equipe técnica desenvolve a partir da sua demanda de dosagem, sabor e público-alvo.',
  },
  {
    question: 'Quais produtos a Marca Lab produz?',
    answer:
      'Creatina, whey protein, ômega 3, colágeno, pré-treinos, termogênicos, vitaminas e minerais, hipercalóricos, ervas e fitoterápicos, linha infantil, óleos em cápsulas e bebidas funcionais. Veja a página de produtos para o portfólio completo.',
  },
];
