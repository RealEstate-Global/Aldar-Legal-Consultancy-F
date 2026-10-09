import {createFileRoute} from '@tanstack/react-router';
import {InquiryPage} from '@/components/inquiry-form';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/contact')({head:({params})=>pageHead(params.locale,'/contact','Contact Al Dar','اتصلوا بالدار','Contact our Fujairah office by phone, email, WhatsApp, or a confidential inquiry.','تواصلوا مع مكتبنا في الفجيرة عبر الهاتف أو البريد أو واتساب أو استفسار سري.'),component:Page});
function Page() {const {locale}=Route.useParams(); return isLocale(locale)?<InquiryPage locale={locale} kind="contact"/>:null;}
