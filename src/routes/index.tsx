import { createFileRoute, redirect } from '@tanstack/react-router';
import { pageHead } from '@/lib/page-head';
export const Route = createFileRoute('/')({
  head: () => pageHead('en', '', 'Legal Consultancy in the UAE', 'استشارات قانونية في الإمارات', 'Al Dar Legal Consultancy, Fujairah. Legal services and practical advice for individuals and businesses.', 'الدار للاستشارات القانونية، الفجيرة. خدمات ومشورة قانونية للأفراد والشركات.'),
  beforeLoad: () => { throw redirect({ to: '/$locale', params: { locale: 'en' } }); },
});
