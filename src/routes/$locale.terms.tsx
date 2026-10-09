import {createFileRoute} from '@tanstack/react-router';
import {PolicyPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/terms')({head:({params})=>pageHead(params.locale,'/terms','Terms of Use','شروط الاستخدام','Terms for using the Al Dar Legal Consultancy website and submitting consultation requests.','شروط استخدام موقع الدار للاستشارات القانونية وتقديم طلبات الاستشارة.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<PolicyPage locale={locale} kind="terms"/>:null;}
