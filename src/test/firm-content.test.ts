import { describe, expect, it } from 'vitest';
import { guides, serviceScopes } from '@/lib/editorial-content';
import { services } from '@/lib/legal-content';
import { policySections, teamSupport } from '@/lib/firm-content';
import { collectItems, defaultCollectionState } from '@/lib/collection';

describe('Completed bilingual page content', () => {
  it('provides a distinct scope for every service', () => {
    for (const service of services) {
      const scope = serviceScopes[service.slug];
      expect(scope?.topics.length).toBeGreaterThanOrEqual(3);
      expect(scope?.documents.en).toBeTruthy();
      expect(scope?.documents.ar).toBeTruthy();
      expect(scope?.audience.ar).toBeTruthy();
    }
  });
  it('populates guides with bilingual sections and official references', () => {
    expect(guides).toHaveLength(6);
    for (const guide of guides) {
      expect(guide.sections).toHaveLength(3);
      expect(new URL(guide.source.url).protocol).toBe('https:');
      for (const section of guide.sections) {
        expect(section.title.ar).toBeTruthy();
        expect(section.body.en).toBeTruthy();
        expect(section.body.ar).toBeTruthy();
      }
    }
    const filtered = collectItems(guides, { ...defaultCollectionState, query: 'العقد', category: 'business' }, guide => `${guide.title.en} ${guide.title.ar}`, guide => guide.title.ar, guide => guide.category, 'ar');
    expect(filtered.items[0]?.slug).toBe('contract-review');
  });
  it('links every collective support area to a real service', () => {
    expect(teamSupport.length).toBeGreaterThan(0);
    for (const area of teamSupport) expect(services.some(service => service.slug === area.service)).toBe(true);
  });
  it('expands policies and accurately describes email-only inquiries', () => {
    for (const sections of Object.values(policySections)) expect(sections.length).toBeGreaterThanOrEqual(4);
    expect(policySections.privacy[1]?.body.en).toContain('does not save or send');
  });
});