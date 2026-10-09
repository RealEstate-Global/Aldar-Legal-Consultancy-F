import {createFileRoute} from '@tanstack/react-router';
import {EmptyPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/insights')({head:({params})=>pageHead(params.locale,'/insights','Legal Insights','المقالات القانونية','Practical perspectives on UAE law from Al Dar Legal Consultancy.','رؤى عملية حول قانون الإمارات من الدار للاستشارات القانونية.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<EmptyPage locale={locale} kind="insights"/>:null;}
