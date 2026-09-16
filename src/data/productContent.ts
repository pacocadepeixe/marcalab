/**
 * Conteúdo editorial das páginas de produto (SEO único por página).
 * Estrutura GEO: resposta direta, diferenciais escaneáveis, FAQ.
 */
export interface ProductContent {
  /** Resposta direta (~60 palavras) exibida abaixo do H1 */
  quickAnswer: string;
  /** Parágrafos de introdução (2–3) */
  intro: string[];
  /** Por que este produto vende — bullets */
  why: string[];
  /** Diferenciais de produção */
  differentials: string[];
  faq: { question: string; answer: string }[];
}

export const PRODUCT_CONTENT: Record<string, ProductContent> = {
  'creatina-white-label': {
    quickAnswer:
      'Creatina white label é a produção de creatina monohidratada (em pó ou cápsulas) com a marca do cliente. É o suplemento mais vendido do mundo e um dos melhores pontos de partida para marcas próprias: alta demanda, fidelidade de consumo e formulação simples, o que reduz custos e prazos de lançamento.',
    intro: [
      'A creatina é o suplemento esportivo mais estudado e consumido do mundo — e o mais procurado nas prateleiras brasileiras. Para quem está lançando uma marca própria, é portas de entrada quase obrigatória: o consumidor compra, sente resultado e recompra todo mês.',
      'Na Marca Lab, você produz creatina monohidratada em pó (sabores neutro e cítros) ou em cápsulas, com pureza a partir de 99,9%, matéria-prima com laudo e rótulo personalizado com a sua identidade.',
      'Por ser uma formulação simples e de altíssimo giro, a creatina white label tem um dos menores custos de entrada do mercado de suplementos — e um dos melhores potenciais de recompra.',
    ],
    why: [
      'Suplemento mais vendido do mundo, com procura crescente ano após ano',
      'Consumo contínuo: o cliente usa diariamente e recompra a cada 30–60 dias',
      'Consciência de marca alta: o consumidor já chega procurando por creatina',
      'Formulação simples, com custo de produção competitivo',
      'Funciona para todos os públicos: musculação, crossfit, corrida e saúde geral',
    ],
    differentials: [
      'Creatina monohidratada com pureza a partir de 99,9%',
      'Pó (potes de 150 g e 300 g) ou cápsulas (60–120 unidades)',
      'Matéria-prima rastreada com laudo de análise por lote',
      'Rótulo personalizado conforme as normas vigentes de rotulagem',
      'Apoio no enquadramento e notificação do produto',
    ],
    faq: [
      {
        question: 'Qual é o pedido mínimo para creatina white label?',
        answer:
          'O pedido mínimo varia conforme o formato (pó ou cápsulas) e a embalagem escolhida. Em geral, trabalhamos com lotes acessíveis para marcas iniciantes. Solicite uma cotação para receber o mínimo exato e as condições do formato que você quer lançar.',
      },
      {
        question: 'Posso escolher a dosagem e o sabor?',
        answer:
          'Sim. Para pó, definimos a porção e os sabores (neutro, limão, laranja e outros sob consulta). Para cápsulas, a dosagem por cápsula e a quantidade por pote. Nossa equipe técnica orienta as dosagens mais usuais do mercado.',
      },
      {
        question: 'A creatina white label é igual às grandes marcas?',
        answer:
          'A matéria-prima é a mesma creatina monohidratada de alta pureza utilizada pelo mercado. A diferença é que o produto sai da indústria direto com a sua marca — sem as camadas de custo das grandes redes, o que amplia sua margem.',
      },
    ],
  },

  'whey-protein-white-label': {
    quickAnswer:
      'Whey protein white label é a produção de proteína de soro de leite (concentrado ou blends) com a marca do cliente, em sabores e dosagens definidos em conjunto com a indústria. É a categoria mais lucrativa do varejo de suplementos e a que mais constrói valor de marca no médio prazo.',
    intro: [
      'Whey protein é o coração do mercado de suplementos: praticamente todo lojista e influenciador do nicho começa por aqui. É o produto que gera maior ticket médio, maior recompra e maior conexão com a marca.',
      'A Marca Lab produz whey concentrado e blends com dosagens competitivas de proteína por dose, em sabores que passam no teste mais difícil: o do consumidor final. Você define o posicionamento — do whey de entrada ao premium — e nós produzimos com a sua marca.',
      'Trabalhamos potes de 900 g/1 kg, sachês individuais de 30 g e formatos maiores. O rótulo segue a sua identidade, com rotulagem conforme a legislação vigente.',
    ],
    why: [
      'Maior ticket médio do varejo de suplementos',
      'Alta recompra: quem treina consome whey todos os dias',
      'Produto que constrói percepção de marca e fideliza',
      'Versatilidade de portfólio: linha de entrada e linha premium',
      'Demanda consolidada e crescente no Brasil',
    ],
    differentials: [
      'Concentrado e blends com dosagens competitivas por dose',
      'Sabores desenvolvidos e testados (chocolate, baunilha, morango e sob consulta)',
      'Potes de 900 g / 1 kg / 2 kg e sachês de 30 g',
      'Teste de solubilidade e sabor antes da produção final',
      'Rótulo e embalagem com a sua identidade visual',
    ],
    faq: [
      {
        question: 'Qual a diferença entre whey concentrado, isolado e blend?',
        answer:
          'O concentrado tem boa relação custo-benefício e é o mais vendido; o isolado passa por filtragem adicional, com menos lactose e mais proteína por dose; o blend mistura fontes para equilibrar custo e perfil. A Marca Lab produz concentrados e blends — orientamos a melhor opção para o seu posicionamento e público.',
      },
      {
        question: 'Como funciona o desenvolvimento de sabores?',
        answer:
          'Você escolhe entre os sabores já validados da indústria (chocolate, baunilha, morango e variações) ou solicita desenvolvimentos sob consulta. Antes da produção final, você avalia o sabor, a solubilidade e a textura da amostra.',
      },
      {
        question: 'Consigo competir com as grandes marcas de whey?',
        answer:
          'Sim — o consumidor de whey é fiel a sabor, resultado e preço, não necessariamente a logotipo. Com qualidade consistente, bom sabor e precificação competitiva (possível no white label, pois você corta intermediários), marcas próprias crescem rápido no whey.',
      },
    ],
  },

  'omega-3-white-label': {
    quickAnswer:
      'Ômega 3 white label é a produção de cápsulas de ômega 3 (EPA/DHA) e óleos vegetais — cártamo, linhaça, prímula, semente de abóbora — com a marca do cliente. É uma categoria de saúde e bem-estar com apelo multirpúblico: do frequentador de academia ao consumidor preocupado com coração e colesterol.',
    intro: [
      'O ômega 3 é um dos suplementos mais recomendados por profissionais de saúde e um clássico das farmácias e lojas de produtos naturais. A demanda vem de todos os públicos: quem treina, quem cuida do coração, quem busca pele e cabelo mais saudáveis.',
      'A Marca Lab produz ômega 3 em cápsulas gelatinosas com concentrações de EPA e DHA definidas conforme o seu posicionamento. Também produzimos a linha completa de óleos em cápsulas: cártamo com vitamina E, linhaça, prímula e semente de abóbora.',
      'É uma categoria silenciosa de margens altas: produto de consumo contínuo, custo de produção estável e concorrência pulverizada — cenário perfeito para marcas próprias.',
    ],
    why: [
      'Recomendação médica e nutricional consolidada no mundo inteiro',
      'Público amplo: academia, saúde cardiovascular, beleza e longevidade',
      'Consumo contínuo com recompra previsível',
      'Custo de produção estável e margens consistentes',
      'Linha completa de óleos para compor a marca (cártamo, linhaça, prímula e mais)',
    ],
    differentials: [
      'Cápsulas gelatinosas com EPA/DHA nas concentrações do seu posicionamento',
      'Linha de óleos vegetais: cártamo + vitamina E, linhaça, prímula e abóbora',
      'Frasco 250 ml (óleo) e cápsulas 60–120 unidades',
      'Matéria-prima com laudo e rastreabilidade',
      'Rótulo personalizado e apoio na rotulagem conforme norma vigente',
    ],
    faq: [
      {
        question: 'Qual concentração de EPA/DHA devo escolher?',
        answer:
          'As concentrações mais comuns do mercado brasileiro ficam entre 180 mg de EPA + 120 mg de DHA por cápsula (padrão) até concentrações maiores em linhas premium. Nossa equipe orienta a concentração ideal conforme o público e o preço que você quer praticar.',
      },
      {
        question: 'Vale lançar a linha de óleos junto com o ômega 3?',
        answer:
          'Sim. Óleos como cártamo, linhaça e prímula compartilham o mesmo consumidor de saúde e bem-estar e podem usar a mesma linha de embalagem, diluindo custos de arte e produção. Muitos clientes lançam a "linha óleos" completa de uma vez.',
      },
      {
        question: 'O ômega 3 white label precisa de registro na ANVISA?',
        answer:
          'A maior parte dos suplementos é comercializada como alimento notificado, e não com registro — o que simplifica o processo. Orientamos o enquadramento correto do seu produto e a rotulagem conforme a legislação vigente (RDC 710/2022).',
      },
    ],
  },

  'colageno-white-label': {
    quickAnswer:
      'Colágeno white label é a produção de colágeno hidrolisado e peptídeos bioativos (como Verisol®) em pó, sachês ou cápsulas com a marca do cliente. É a categoria que mais cresce no público feminino, movida por beleza, pele e articulações — com altíssima recompra e forte apelo estético de marca.',
    intro: [
      'O colágeno virou fenômeno: do pó em potes aos sachês de vitamina C, ocupa prateleiras de farmácia, perfumaria e loja de suplementos. O motor é o público feminino 30+ — mas o produto cruza para articulações e esporte com o mesmo sucesso.',
      'A Marca Lab produz colágeno hidrolisado, peptídeos bioativos (Verisol®) e blends enriquecidos com vitamina C, biotina e zinco. Você define sabor, formato e posicionamento; nós entregamos o produto pronto com a sua marca.',
      'É uma categoria em que embalagem e estética pesam muito na decisão de compra — e é exatamente onde o white label brilha: você controla 100% da identidade.',
    ],
    why: [
      'Uma das categorias que mais crescem no suplemento brasileiro',
      'Público fiel com recompra mensal (uso contínuo para resultado)',
      'Forte apelo de marca: embalagem e storytelling vendem muito',
      'Blends valorizados: + vitamina C, biotina, zinco e ácido hialurônico',
      'Consome-se em todas as idades adultas — mercado enorme',
    ],
    differentials: [
      'Colágeno hidrolisado e peptídeos bioativos (Verisol®) sob consulta',
      'Blends prontos com vitamina C, biotina e minerais',
      'Sabores validados (frutas vermelhas, tangerina, neutro e sob consulta)',
      'Potes de 300 g, sachês de 10 g e cápsulas 60–120 un.',
      'Rótulo premium personalizado com a sua identidade',
    ],
    faq: [
      {
        question: 'Colágeno hidrolisado ou peptídeos bioativos: qual lançar?',
        answer:
          'O hidrolisado é o padrão de mercado, com melhor custo e óima adesão. Os peptídeos bioativos (como Verisol®) têm estudos específicos para pele e posicionamento premium. Estratégia comum: lançar o hidrolisado e migrar parte da linha para peptídeos conforme a marca cresce.',
      },
      {
        question: 'Quais ingredientes posso combinar com o colágeno?',
        answer:
          'Os mais usados são vitamina C (essencial para a síntese de colágeno), biotina, zinco, ácido hialurônico e elastina. A definição depende do público: beleza (vitamina C + biotina) ou articulações (vitamina C + minerais). Nossa equipe técnica sugere o blend ideal.',
      },
      {
        question: 'Pote ou sachê: qual formato escolher?',
        answer:
          'O pote tem melhor custo por dose e é o mais vendido. O sachê individual ganha em conveniência e permite venda em caixas — além de ser ótimo para amostras e divulgação. Muitas marcas mantêm os dois, cada um para um momento de consumo.',
      },
    ],
  },

  'pre-treino-white-label': {
    quickAnswer:
      'Pré-treino white label é a produção de suplementos de energia e foco pré-treino — com cafeína, taurina, beta-alanina e outros ingredientes — com a marca do cliente. É a categoria com maior engajamento emocional do fitness: o consumidor sente o efeito na primeira dose e vira fã da marca.',
    intro: [
      'Pré-treino é o produto mais "aspiracional" do fitness: promete energia, foco e pump — e o consumidor sente o efeito imediatamente. Isso cria uma conexão única com a marca: quando o pré-treino funciona, o cliente conta para todo mundo da academia.',
      'A Marca Lab produz pré-treinos em pó com formulações que vão do estimulante moderado ao high-stim, além de cápsulas de cafeína pura e taurina para a linha de conveniência.',
      'Desenvolvemos a formulação com você: cafeína anidra, taurina, beta-alanina, creatina e outros ativos nas dosagens que combinam com o posicionamento da sua marca.',
    ],
    why: [
      'Efeito percebido na primeira dose = fidelização imediata',
      'Categoria com maior boca a boca dentro das academias',
      'Espaço para formulação exclusiva (grande diferencial competitivo)',
      'Ticket médio bom com custo de produção controlado',
      'Linha complementar fácil: cafeína e taurina em cápsulas',
    ],
    differentials: [
      'Formulações prontas ou exclusivas (cafeína, taurina, beta-alanina e mais)',
      'Potes de 300 g em sabores cítricos validados',
      'Cápsulas de cafeína e taurina para linha de conveniência',
      'Dosagens alinhadas ao posicionamento (moderado ou high-stim)',
      'Rótulo personalizado com a sua identidade',
    ],
    faq: [
      {
        question: 'Como definir a formulação do meu pré-treino?',
        answer:
          'Comece pelo posicionamento: moderado (público iniciante e treinos à noite) ou high-stim (atuantes que buscam estímulo forte). Nossa equipe técnica propõe os ingredientes e dosagens, você valida e ajustamos até a formulação final.',
      },
      {
        question: 'Cafeína em cápsulas vale como produto próprio?',
        answer:
          'Sim — é um produto de custo baixíssimo, giro alto e demanda constante (energia, foco e emagrecimento). Funciona muito bem como "porta de entrada" da marca ou item de recompra enquanto o pré-treino em pó é o carro-chefe.',
      },
      {
        question: 'O pré-treino white label é legalizado?',
        answer:
          'Sim, desde que a formulação respeite os limites de ingredientes permitidos e a rotulagem siga a legislação vigente. Trabalhamos apenas com ingredientes autorizados e orientamos toda a parte regulatória do produto.',
      },
    ],
  },

  'termogenico-white-label': {
    quickAnswer:
      'Termogênico white label é a produção de suplementos para emagrecimento — termogênicos, diuréticos naturais e óleos como o de cártamo — com a marca do cliente. Emagrecimento é a maior promessa do mercado de suplementos e uma das categorias de maior volume de busca e venda no Brasil.',
    intro: [
      'Emagrecimento move o mercado de suplementos no Brasil: é a categoria com maior volume de buscas, maior impulso de compra e público que se renova constantemente a cada "segunda-feira" de dieta.',
      'A Marca Lab produz termogênicos (cápsulas e pó), diuréticos naturais e a linha de óleos associados ao emagrecimento, como o cártamo com vitamina E. Formulações com cafeína, gengibre, pimenta e blends clássicos do mercado.',
      'Atenção importante: produzimos apenas formulações dentro da legislação vigente, sem promessas milagrosas — posicionamento que, aliás, protege a sua marca e constrói credibilidade a longo prazo.',
    ],
    why: [
      'Maior volume de buscas do consumidor brasileiro em suplementos',
      'Compra por impulso com alta conversão em tráfego pago',
      'Público que se renova constantemente (mercado sempre cheio)',
      'Custo de produção baixo em cápsulas, com margens altas',
      'Linha completa: termogênico + diurético + óleo de cártamo',
    ],
    differentials: [
      'Termogênicos em cápsulas 60–120 un. e pó 150 g',
      'Diuréticos naturais e linha emagrecimento completa',
      'Óleo de cártamo com vitamina E em cápsulas',
      'Formulações 100% dentro da legislação vigente',
      'Rotulagem orientada para compliance (sem alegações proibidas)',
    ],
    faq: [
      {
        question: 'O que posso prometer no rótulo e no marketing?',
        answer:
          'A legislação brasileira proíbe promessas de emagrecimento e alegações terapêuticas em suplementos. No rótulo, seguimos rigorosamente a norma vigente; no marketing da sua marca, orientamos os limites para você vender com segurança jurídica.',
      },
      {
        question: 'Quais ingredientes entram num termogênico white label?',
        answer:
          'Os clássicos do mercado: cafeína, gengibre, pimenta (capsaicina), chá verde e blends associados. As combinações e dosagens seguem as quantidades permitidas por ingestão diária — nossa equipe técnica monta a fórmula dentro desses limites.',
      },
      {
        question: 'Termogênico em cápsulas ou em pó?',
        answer:
          'Cápsulas dominam a categoria emagrecimento: custo menor, conveniência e produção mais rápida. O pó compete com os "thermogênicos americanos" para público fitness avançado. Para começar, cápsulas costumam ser a escolha mais inteligente.',
      },
    ],
  },

  'vitaminas-minerais-white-label': {
    quickAnswer:
      'Vitaminas e minerais white label é a produção de multivitamínicos, magnésio (treonato e dimalato), biotina, zinco, vitamina D, cálcio e blends específicos com a marca do cliente. É a categoria mais transversal da saúde — vende na academia, na farmácia e no e-commerce de bem-estar para todos os públicos.',
    intro: [
      'Vitaminas e minerais são a porta de entrada da maior parte das pessoas no mundo dos suplementos: o consumidor começa com um multivitamínico ou uma vitamina D e nunca mais para. É também a categoria com mais nichos possíveis: imunidade, energia, pele, cabelo, sono, saúde óssea.',
      'A Marca Lab produz a linha completa: multivitamínicos A–Z, magnésio treonato e dimalato, biotina, zinco, quercetina, vitamina C e D, cálcio MK2 e blends específicos para público masculino e feminino.',
      'Para marcas próprias, é a categoria mais versátil para construir portfólio rapidamente: várias referências na mesma linha de embalagem, produção em cápsulas e tabletes com giro constante.',
    ],
    why: [
      'Porta de entrada do consumo de suplementos — público infinito',
      'Nichos claros: imunidade, beleza, energia, sono, 50+',
      'Produção em cápsulas/tabletes com custo previsível',
      'Recompra por hábito (consumo diário e permanente)',
      'Permite lançar portfólio completo de uma só vez',
    ],
    differentials: [
      'Multivitamínicos A–Z em tabletes e cápsulas',
      'Magnésio treonato, dimalato e quitinato',
      'Biotina, zinco, vitaminas C e D, quercetina, cálcio MK2',
      'Blends para saúde da mulher e do homem (linhas dedicadas)',
      'Cápsulas 60–120 un. e potes 60–90 tabletes',
    ],
    faq: [
      {
        question: 'Quais vitaminas vendem mais para marca própria?',
        answer:
          'Os campeões de procura são vitamina D, magnésio, vitamina C, complexo B, biotina (beleza) e zinco. O multivitamínico A–Z funciona como produto deentrada e recompra. A escolha ideal depende do seu público: beleza (biotina + colágeno), rotina corrida (multivitamínico), 50+ (D + cálcio).',
      },
      {
        question: 'Posso fazer um blend exclusivo de vitaminas?',
        answer:
          'Sim. Definimos juntas as vitaminas, minerais e dosagens conforme o público-alvo, sempre dentro dos limites de ingestão diária permitidos. A fórmula exclusiva é um diferencial competitivo real nessa categoria.',
      },
      {
        question: 'Tabletes ou cápsulas: qual formato produzir?',
        answer:
          'Tabletes permitem maiores dosagens e custo menor por dose (comum em multivitamínicos A–Z e cálcio). Cápsulas têm produção mais ágil e melhor aceitação para quem tem dificuldade em engolir. Muitas marcas usam os dois formatos na mesma linha.',
      },
    ],
  },

  'hipercalorico-white-label': {
    quickAnswer:
      'Hipercalórico white label é a produção de suplementos calóricos para ganho de massa muscular — carboidratos, maltodextrina, blends proteico-calóricos e anabolizantes naturais como ZMA — com a marca do cliente. É a categoria natural para quem já vende whey ou pré-treino e quer ampliar o ticket médio do público masculino.',
    intro: [
      'O hipercalórico resolve a dor de quem "não consegue ganhar peso": entrega calorias densas em pó, fáceis de consumir, com preço acessível por dose. É um público fiel e mal atendido pelas grandes marcas — ótimo espaço para marcas próprias.',
      'A Marca Lab produz hipercalóricos em potes grandes (1 a 3 kg) e sachês, com formulações de médio a altíssimo valor calórico. Também produzimos a linha de anabolizantes naturais, como ZMA e blends de apoio ao ganho de massa.',
      'Estrategicamente, é o produto que aumenta o ticket médio da sua marca: quem compra hipercalórico quase sempre leva whey e creatina junto.',
    ],
    why: [
      'Público fiel e engajado (hardgainers e bulking)',
      'Ticket médio alto: potes grandes e reposição frequente',
      'Combo natural com whey e creatina (aumenta o carrinho)',
      'Concorrência das grandes marcas é relativamente menor',
      'Formatos flexíveis: pote grande, sachês e cápsulas (ZMA)',
    ],
    differentials: [
      'Hipercalóricos de médio a altíssimo valor calórico',
      'Potes de 1 kg, 2 kg e 3 kg + sachês de 50 g',
      'Sabores validados (chocolate, baunilha, morango e sob consulta)',
      'Linha de anabolizantes naturais: ZMA e blends',
      'Formulação ajustada ao público e preço-alvo da sua marca',
    ],
    faq: [
      {
        question: 'Hipercalórico ainda vende bem?',
        answer:
          'Sim — é um mercado estável com público fiel: quem tem dificuldade em ganhar peso consome de forma contínua durante os períodos de bulking. A categoria convive muito bem com as tendências de emagrecimento porque atende ao público oposto, complementando o portfólio da marca.',
      },
      {
        question: 'Como definir a densidade calórica do produto?',
        answer:
          'Definimos conforme o posicionamento: hipercalóricos de médio valor (~400–600 kcal/dose) têm melhor sabor e custo; os de altíssimo valor (1000+ kcal/dose) atendem hardgainers extremos. Nossa equipe técnica balanceia calorias, sabor e preço por dose.',
      },
      {
        question: 'Vale lançar ZMA junto?',
        answer:
          'Sim. O ZMA (zinco + magnésio + B6) é um clássico de apoio ao ganho de massa com custo de produção baixo e boa margem — funciona como item complementar no carrinho de quem compra hipercalórico e whey.',
      },
    ],
  },
};
