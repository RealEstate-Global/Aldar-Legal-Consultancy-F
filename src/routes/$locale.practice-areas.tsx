import {createFileRoute} from '@tanstack/react-router';
import {ServicesPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/practice-areas')({head:({params})=>pageHead(params.locale,'/practice-areas','Practice Areas','مجالات الممارسة','Legal guidance across the practice areas that matter to individuals and businesses in the UAE.','إرشاد قانوني في مجالات الممارسة التي تهم الأفراد والشركات في الإمارات.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<ServicesPage locale={locale} practice/>:null;}
