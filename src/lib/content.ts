import { getCollection } from 'astro:content';

export const isVisible = (entry: { data: { draft: boolean } }) => import.meta.env.DEV || !entry.data.draft;

export function formatDate(value: Date, options: Intl.DateTimeFormatOptions = {}) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  }).format(value);
}

export async function getVisibleCollections() {
  const [workflows, components, articles] = await Promise.all([
    getCollection('workflows', isVisible),
    getCollection('components', isVisible),
    getCollection('articles', isVisible),
  ]);
  return { workflows, components, articles };
}

export function href(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}` || '/';
}
