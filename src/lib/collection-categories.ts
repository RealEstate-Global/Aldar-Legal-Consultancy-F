import type { Locale } from './i18n';
import { local } from './legal-content';
export const serviceCategory = (slug: string) => {
  if (['litigation','arbitration','criminal-cases','dispute-resolution'].includes(slug)) return 'disputes';
  if (['contracts','company-formation','labour-law','government-transactions','legal-translation'].includes(slug)) return 'business';
  if (['real-estate','vehicle-transactions'].includes(slug)) return 'property';
  return 'personal';
};
export const serviceCategories = (locale: Locale) => [
  { value: 'disputes', label: local(locale,'Disputes & proceedings','النزاعات والإجراءات') },
  { value: 'business', label: local(locale,'Business & employment','الأعمال والتوظيف') },
  { value: 'property', label: local(locale,'Property & transactions','العقارات والمعاملات') },
  { value: 'personal', label: local(locale,'Personal & family','الأفراد والأسرة') },
];
export const faqCategory = (question: string) => question.includes('confidential') ? 'privacy' : /located|opening hours/.test(question) ? 'office' : 'consultation';
export const faqCategories = (locale: Locale) => [
  { value: 'consultation', label: local(locale,'Consultations','الاستشارات') },
  { value: 'privacy', label: local(locale,'Confidentiality','الخصوصية') },
  { value: 'office', label: local(locale,'Our office','مكتبنا') },
];