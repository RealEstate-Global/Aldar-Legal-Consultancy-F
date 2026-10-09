import {createFileRoute} from '@tanstack/react-router';
import {EmptyPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/team')({head:({params})=>pageHead(params.locale,'/team','Our Team','فريق العمل','Contact Al Dar to learn more about the consultants who will handle your legal matter.','تواصلوا مع الدار للتعرف على المستشارين الذين سيتولون مسائلكم القانونية.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<EmptyPage locale={locale} kind="team"/>:null;}
