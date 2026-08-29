import { getCollection } from 'astro:content';
import { isVisible } from '../lib/content';

export async function GET() {
  const [workflows, components, articles] = await Promise.all([
    getCollection('workflows', isVisible),
    getCollection('components', isVisible),
    getCollection('articles', isVisible),
  ]);
  const items = [
    ...workflows.map((entry) => ({ title: entry.data.title, description: entry.data.description, type: 'workflows', tags: entry.data.tags, path: `/workflows/${entry.slug}/` })),
    ...components.map((entry) => ({ title: entry.data.title, description: entry.data.description, type: 'components', tags: entry.data.tags, path: `/components/${entry.slug}/` })),
    ...articles.map((entry) => ({ title: entry.data.title, description: entry.data.description, type: 'articles', tags: entry.data.tags, path: `/articles/${entry.slug}/` })),
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
