import {createFileRoute} from '@tanstack/react-router';
import {ServicesPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/services/')({head:({params})=>pageHead(params.locale,'/services','Our Legal Services','خدماتنا القانونية','Explore legal consultancy for litigation, arbitration, property, contracts, family, and business matters.','اكتشفوا خدماتنا في التقاضي والتحكيم والعقارات والعقود والأسرة والأعمال.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<ServicesPage locale={locale}/>:null;}
