import {createFileRoute} from '@tanstack/react-router';
import {AboutPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/about')({head:({params})=>pageHead(params.locale,'/about','About Al Dar','من نحن','A UAE legal consultancy established in 2019, focused on clear advice and client-first solutions.','استشارات قانونية إماراتية تأسست عام 2019 تركز على الوضوح واحتياجات العملاء.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<AboutPage locale={locale}/>:null;}
