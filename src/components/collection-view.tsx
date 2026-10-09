import { useState, type ReactNode } from 'react';
import { Search, SlidersHorizontal, ArrowDownUp, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { OptionSelect, type SelectOption } from './ui/option-select';
import { local } from '@/lib/legal-content';
import type { Locale } from '@/lib/i18n';
import { collectItems, defaultCollectionState, type CollectionState, type CollectionSort } from '@/lib/collection';

type Props<T> = { locale: Locale; items: readonly T[]; searchText: (item: T) => string; title: (item: T) => string; category: (item: T) => string; categories: readonly SelectOption[]; searchPlaceholder: string; children: (items: T[]) => ReactNode; empty?: ReactNode; defaultPageSize?: number };
export function CollectionView<T>({ locale, items, searchText, title, category, categories, searchPlaceholder, children, empty, defaultPageSize = 6 }: Props<T>) {
  const initial = { ...defaultCollectionState, pageSize: defaultPageSize };
  const [state, setState] = useState<CollectionState>(initial);
  const result = collectItems(items, state, searchText, title, category, locale);
  const update = (patch: Partial<CollectionState>) => setState(previous => ({ ...previous, ...patch, page: 1 }));
  const active = !!state.query || state.category !== 'all' || state.sort !== 'original';
  const l = (en: string, ar: string) => local(locale, en, ar);
  return <div className="collection-view">
    <div className="collection-toolbar">
      <div className="collection-search"><Search size={17}/><Input aria-label={searchPlaceholder} placeholder={searchPlaceholder} value={state.query} onChange={event => update({ query: event.target.value })}/></div>
      <div className="collection-selector"><SlidersHorizontal size={15}/><OptionSelect label={l('Filter by category','تصفية حسب الفئة')} locale={locale} value={state.category} onValueChange={category => update({ category })} options={[{ value: 'all', label: l('All categories','جميع الفئات') }, ...categories]}/></div>
      <div className="collection-selector"><ArrowDownUp size={15}/><OptionSelect label={l('Sort results','ترتيب النتائج')} locale={locale} value={state.sort} onValueChange={sort => update({ sort: sort as CollectionSort })} options={[{ value: 'original', label: l('Recommended order','الترتيب المقترح') }, { value: 'asc', label: l('Name: A to Z','الاسم: تصاعدي') }, { value: 'desc', label: l('Name: Z to A','الاسم: تنازلي') }]}/></div>
    </div>
    <div className="collection-summary"><span role="status" aria-live="polite">{result.total} {l('results','نتيجة')}{state.query.trim() && <> {l('for','لـ')} “{state.query.trim()}”</>}</span>{active && <Button variant="ghost" size="sm" onClick={() => setState(initial)}><RotateCcw size={13}/>{l('Reset','إعادة ضبط')}</Button>}</div>
    {result.total ? children(result.items) : items.length === 0 && empty ? empty : <div className="collection-empty"><Search size={28}/><h3>{l('No matching results','لا توجد نتائج مطابقة')}</h3><p>{l('No results for the selected search and category.','لا توجد نتائج للبحث والفئة المحددة.')}</p><Button variant="outline" onClick={() => setState(initial)}><RotateCcw/>{l('Clear filters','مسح التصفيات')}</Button></div>}
    <div className="collection-pagination"><div className="collection-page-size"><span>{l('Per page','لكل صفحة')}</span><OptionSelect label={l('Results per page','عدد النتائج لكل صفحة')} locale={locale} value={String(state.pageSize)} onValueChange={value => update({ pageSize: Number(value) })} options={Array.from(new Set([defaultPageSize, 3, 6, 12])).sort((a,b) => a-b).map(value => ({ value: String(value), label: String(value) }))}/></div><span className="collection-range">{result.start}–{result.end} {l('of','من')} {result.total}</span><nav className="collection-pages" aria-label={l('Pagination','التنقل بين الصفحات')}><Button variant="outline" size="icon" aria-label={l('Previous page','الصفحة السابقة')} title={l('Previous page','الصفحة السابقة')} disabled={result.page <= 1 || !result.total} onClick={() => setState(previous => ({...previous, page: result.page - 1}))}><ChevronLeft className="direction-arrow"/></Button>{Array.from({length: result.pages}, (_, i) => i+1).filter(page => page === 1 || page === result.pages || Math.abs(page - result.page) <= 1).map((page,index,array) => <span key={page} className="collection-page"><>{index > 0 && page - (array[index-1] ?? page) > 1 && <span>…</span>}<Button variant={result.page === page ? 'default' : 'ghost'} size="icon" aria-label={`${l('Page','الصفحة')} ${page}`} aria-current={result.page === page ? 'page' : undefined} disabled={!result.total} onClick={() => setState(previous => ({...previous, page}))}>{page}</Button></></span>)}<Button variant="outline" size="icon" aria-label={l('Next page','الصفحة التالية')} title={l('Next page','الصفحة التالية')} disabled={result.page >= result.pages || !result.total} onClick={() => setState(previous => ({...previous, page: result.page + 1}))}><ChevronRight className="direction-arrow"/></Button></nav></div>
  </div>;
}