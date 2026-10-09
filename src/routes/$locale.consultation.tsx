import {createFileRoute} from '@tanstack/react-router';
import {InquiryPage} from '@/components/inquiry-form';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/consultation')({head:({params})=>pageHead(params.locale,'/consultation','Request a Consultation','طلب استشارة','Submit a confidential request for legal consultancy with Al Dar in Fujairah, UAE.','قدموا طلباً سرياً للاستشارة القانونية مع الدار في الفجيرة، الإمارات.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<InquiryPage locale={locale}/>:null;}
