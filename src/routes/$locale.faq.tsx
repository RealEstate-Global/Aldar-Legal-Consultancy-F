import {createFileRoute} from '@tanstack/react-router';
import {FaqPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/faq')({head:({params})=>pageHead(params.locale,'/faq','Frequently Asked Questions','الأسئلة الشائعة','Answers about requesting legal advice, confidentiality, and consultation appointments.','إجابات عن طلب المشورة القانونية والخصوصية ومواعيد الاستشارة.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<FaqPage locale={locale}/>:null;}
