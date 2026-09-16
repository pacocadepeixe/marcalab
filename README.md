# Marca Lab — Site Institucional + Blog (SEO/GEO)

Site estático da **Marca Lab**, indústria de suplementos white label. Construído com
[Astro](https://astro.build) + Tailwind CSS 4. Gera HTML puro — perfeito para SEO, Core Web
Vitals e hospedagem gratuita.

## 🚀 Rodando localmente

Requisitos: Node.js 20+ instalado.

```bash
npm install      # instala dependências (só na primeira vez)
npm run dev      # ambiente de desenvolvimento em http://localhost:4321
npm run build    # gera o site final na pasta dist/
npm run preview  # visualiza o site compilado
```

## ✏️ Como editar (guia rápido)

### Dados da empresa (tudo em um lugar)
`src/data/site.ts` — nome, domínio, e-mail, WhatsApp, redes sociais, produtos, FAQ da home e
números exibidos. **Trocou aqui, mudou no site inteiro.**

### Publicar um artigo no blog
1. Crie um arquivo `.md` em `src/content/blog/` (o nome do arquivo = endereço do artigo, ex.:
   `meu-artigo.md` fica em `/blog/meu-artigo`);
2. Use este modelo de cabeçalho:

```yaml
---
title: 'Título do artigo (máx. 70 caracteres)'
description: 'Resumo para o Google (100 a 160 caracteres).'
quickAnswer: 'Resposta direta exibida no topo do artigo (250 a 550 caracteres).'
pubDate: 2026-09-20
category: negocios # negocios | produtos | marketing | mercado
tags: ['tag 1', 'tag 2']
featured: false
faq:
  - question: 'Pergunta?'
    answer: 'Resposta que entra no schema FAQPage (bônus de SEO).'
---

Aqui vai o conteúdo em **Markdown**...
```

3. Salve — o artigo entra automaticamente no blog, no sitemap e nos schemas JSON-LD.

### Editar páginas institucionais e de produto
- Páginas: `src/pages/` (`.astro`)
- Conteúdo das 8 páginas de produto: `src/data/productContent.ts`
- Aparência: classes utilitárias Tailwind + tokens em `src/styles/global.css`

## 🔍 Recursos de SEO/GEO incluídos

- Meta tags completas (title, description, canonical, Open Graph, Twitter Cards)
- Schemas JSON-LD: Organization, WebSite, Article, FAQPage, BreadcrumbList, Product, Service
- `sitemap-index.xml` gerado no build + `robots.txt`
- Bloco **"Resposta rápida"** em cada artigo (otimização para buscadores generativos como
  ChatGPT, Perplexity e Gemini — o chamado GEO)
- HTML semântico, mobile-first, fontes self-hosted

## 🌐 Colocando no ar (Vercel ou Netlify — grátis)

1. Suba este repositório para o GitHub;
2. Na [Vercel](https://vercel.com) (ou Netlify), clique em **Add New Project** e importe o
   repositório;
3. As configurações são detectadas automaticamente (framework: Astro; build: `npm run build`;
   output: `dist`);
4. Conecte o domínio `marcalab.com.br` nas configurações de domínio da plataforma.

> **Troca de domínio:** mude a constante `url` em `src/data/site.ts` e em
> `astro.config.mjs` (propriedade `site`) e também o `Sitemap:` em `public/robots.txt`.

## 📝 Integração do formulário de contato

O formulário em `/contato` abre o app de e-mail do visitante por padrão. Para capturar leads
de verdade, crie uma conta gratuita no [Formspree](https://formspree.io) (ou similar) e
substitua o `action` do `<form>` em `src/pages/contato.astro` pelo endpoint fornecido.

## 📁 Estrutura do projeto

```
├── public/              # favicon, robots.txt, og-image
├── scripts/             # geração da imagem OG
└── src/
    ├── components/      # Header, Footer, SEO, cards, FAQ, CTA, breadcrumbs
    ├── content/blog/    # ARTIGOS DO BLOG (.md) — edite aqui
    ├── data/            # site.ts (config central) + productContent.ts
    ├── layouts/         # BaseLayout e BlogPostLayout (SEO automático)
    ├── pages/           # todas as rotas do site
    └── styles/          # design system (Tailwind 4)
```
