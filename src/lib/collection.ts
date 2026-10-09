export type CollectionSort = 'original' | 'asc' | 'desc';
export type CollectionState = { query: string; category: string; sort: CollectionSort; page: number; pageSize: number };
export const defaultCollectionState: CollectionState = { query: '', category: 'all', sort: 'original', page: 1, pageSize: 6 };

export function collectItems<T>(items: readonly T[], state: CollectionState, text: (item: T) => string, title: (item: T) => string, category: (item: T) => string, locale: string) {
  const query = state.query.trim().toLocaleLowerCase(locale);
  const filtered = items.filter(item => text(item).toLocaleLowerCase(locale).includes(query) && (state.category === 'all' || category(item) === state.category));
  if (state.sort !== 'original') filtered.sort((a, b) => title(a).localeCompare(title(b), locale) * (state.sort === 'desc' ? -1 : 1));
  const pageSize = Math.max(1, state.pageSize);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.max(1, Math.min(state.page, pages));
  const start = filtered.length ? (page - 1) * pageSize + 1 : 0;
  return { items: filtered.slice((page - 1) * pageSize, page * pageSize), total: filtered.length, pages, page, start, end: Math.min(page * pageSize, filtered.length) };
}