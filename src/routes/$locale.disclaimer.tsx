import {createFileRoute} from '@tanstack/react-router';
import {PolicyPage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/disclaimer')({head:({params})=>pageHead(params.locale,'/disclaimer','Legal Disclaimer','إخلاء المسؤولية','Website information is general information and does not constitute individual legal advice.','معلومات الموقع عامة ولا تشكل مشورة قانونية فردية.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<PolicyPage locale={locale} kind="disclaimer"/>:null;}
