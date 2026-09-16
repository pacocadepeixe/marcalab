import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(70, 'Title deve ter no máximo 70 caracteres para SEO'),
    description: z.string().min(50, 'Description deve ter ao menos 50 caracteres para SEO').max(165),
    /** Resposta direta de ~50 palavras exibida no topo (otimização GEO) */
    quickAnswer: z.string().min(80).max(600),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['negocios', 'produtos', 'marketing', 'mercado']),
    tags: z.array(z.string()).default([]),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog };
