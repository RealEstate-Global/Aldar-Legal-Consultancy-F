import { describe, expect, it } from 'vitest';
import { collectItems, defaultCollectionState } from '@/lib/collection';
import { services } from '@/lib/legal-content';
import { serviceCategory } from '@/lib/collection-categories';
const get = (state = defaultCollectionState) => collectItems(services,state,s => `${s.en} ${s.ar} ${s.description} ${s.description_ar}`,s => s.en,s => serviceCategory(s.slug),'en');
describe('Reusable collection behavior', () => {
  it('paginates the original data without changing it', () => {
    const result = get();
    expect(result.total).toBe(14); expect(result.pages).toBe(3); expect(result.items).toHaveLength(6);
    expect(get({...defaultCollectionState,page:3}).items).toHaveLength(2);
    expect(services[0]?.slug).toBe('litigation');
  });
  it('combines category and bilingual search before pagination', () => {
    expect(get({...defaultCollectionState,category:'business',query:'contracts'}).items[0]?.slug).toBe('contracts');
    expect(get({...defaultCollectionState,query:'العقاري'}).items[0]?.slug).toBe('real-estate');
    expect(get({...defaultCollectionState,category:'personal',query:'contracts'}).total).toBe(0);
  });
  it('sorts alphabetically and reverses direction', () => {
    const asc = get({...defaultCollectionState,sort:'asc',pageSize:20}).items;
    const desc = get({...defaultCollectionState,sort:'desc',pageSize:20}).items;
    expect(asc[0]?.en).toBe('Arbitration'); expect(desc.map(s => s.slug)).toEqual(asc.map(s => s.slug).reverse());
  });
  it('clamps stale pages and handles an empty result', () => {
    const result = get({...defaultCollectionState,page:999,query:'no-matching-service'});
    expect(result).toMatchObject({page:1,pages:1,total:0,start:0,end:0,items:[]});
    expect(get({...defaultCollectionState,page:999}).page).toBe(3);
  });
});