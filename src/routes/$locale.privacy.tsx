import {createFileRoute} from '@tanstack/react-router';
import {PolicyPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/privacy')({head:({params})=>pageHead(params.locale,'/privacy','Privacy Policy','سياسة الخصوصية','How Al Dar handles information submitted through legal inquiries.','كيف تتعامل الدار مع المعلومات المقدمة عبر الاستفسارات القانونية.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<PolicyPage locale={locale} kind="privacy"/>:null;}
