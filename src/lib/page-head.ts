import { local } from './legal-content';
import { isLocale } from './i18n';
import hero from '@/assets/aldar-hero.jpg.asset.json';
import services from '@/assets/aldar-services.jpg.asset.json';
import team from '@/assets/aldar-team.jpg.asset.json';
import insights from '@/assets/aldar-insights.jpg.asset.json';
import contact from '@/assets/aldar-contact.jpg.asset.json';
import cta from '@/assets/aldar-cta.jpg.asset.json';

export function pageHead(value: string, path: string, titleEn: string, titleAr: string, descriptionEn: string, descriptionAr: string, image?: string) {
  const locale = isLocale(value) ? value : 'en';
  const title = `${local(locale, titleEn, titleAr)} — ${local(locale, 'Al Dar Legal Consultancy', 'الدار للاستشارات القانونية')}`;
  const description = local(locale, descriptionEn, descriptionAr);
  const url = `/${locale}${path}`;
  const cover = image ?? (/\/(services|practice-areas)/.test(path) ? services.url : path.includes('/team') ? team.url : path.includes('/insights') ? insights.url : /\/(contact|consultation)/.test(path) ? contact.url : path ? cta.url : hero.url);
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: local(locale, 'Al Dar Legal Consultancy', 'الدار للاستشارات القانونية') },
      { property: 'og:locale', content: locale === 'ar' ? 'ar_AE' : 'en_AE' },
      { property: 'og:locale:alternate', content: locale === 'ar' ? 'en_AE' : 'ar_AE' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      ...(cover.startsWith('https://') ? [{ property: 'og:image', content: cover }, { name: 'twitter:image', content: cover }] : []),
    ],
    links: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hrefLang: 'en', href: `/en${path}` },
      { rel: 'alternate', hrefLang: 'ar', href: `/ar${path}` },
      { rel: 'alternate', hrefLang: 'x-default', href: `/en${path}` },
    ],
  };
}
