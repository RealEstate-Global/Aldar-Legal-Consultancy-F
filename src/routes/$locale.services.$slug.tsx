import {createFileRoute,notFound} from '@tanstack/react-router';
import {ServiceDetail} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {services} from '@/lib/legal-content';
import {pageHead} from '@/lib/page-head';
export const Route=createFileRoute('/$locale/services/$slug')({beforeLoad:({params})=>{if(!services.some(s=>s.slug===params.slug))throw notFound();},head:({params})=>{const s=services.find(s=>s.slug===params.slug);return pageHead(params.locale,`/services/${params.slug}`,s?.en??'Service unavailable',s?.ar??'الخدمة غير متاحة',s?.description??'Legal service unavailable.',s?.description_ar??'الخدمة القانونية غير متاحة.');},component:Page});
function Page(){const {locale,slug}=Route.useParams();return isLocale(locale)?<ServiceDetail locale={locale} slug={slug}/>:null;}
