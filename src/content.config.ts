import { defineCollection, z } from 'astro:content';

const common = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  status: z.string(),
  draft: z.boolean().default(false),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const related = z.object({
  workflows: z.array(z.string()).default([]),
  components: z.array(z.string()).default([]),
  articles: z.array(z.string()).default([]),
});

const workflows = defineCollection({
  type: 'content',
  schema: common.extend({
    goal: z.string(),
    input: z.string(),
    output: z.string(),
    tools: z.array(z.string()).default([]),
    version: z.string(),
    lastVerified: z.coerce.date(),
    steps: z.array(z.object({
      title: z.string(),
      detail: z.string(),
      note: z.string().optional(),
    })),
    prompt: z.string(),
    related: related.default({}),
  }),
});

const components = defineCollection({
  type: 'content',
  schema: common.extend({
    category: z.string(),
    technology: z.array(z.string()).default([]),
    source: z.string().url(),
    used: z.boolean().default(false),
    preview: z.enum(['command', 'table', 'empty', 'editor']),
    reason: z.string(),
    scenarios: z.array(z.string()).default([]),
    implementationNotes: z.string(),
    related: related.default({}),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: common.extend({
    author: z.string(),
    source: z.string(),
    publishedAt: z.coerce.date(),
    url: z.string().url(),
    readingStatus: z.enum(['unread', 'read', 'revisit']),
    featured: z.boolean().default(false),
    keyPoints: z.array(z.string()).default([]),
    personalJudgment: z.string(),
    diagram: z.object({
      kind: z.string(),
      alt: z.string(),
      caption: z.string(),
      source: z.string().url(),
    }).optional(),
    related: related.default({}),
  }),
});

export const collections = { workflows, components, articles };
