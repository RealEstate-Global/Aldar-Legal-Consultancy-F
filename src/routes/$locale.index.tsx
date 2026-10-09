import {createFileRoute} from '@tanstack/react-router';
import {HomePage} from '@/components/legal-site';
import {isLocale} from '@/lib/i18n';
import {pageHead} from '@/lib/page-head';
import hero from '@/assets/aldar-hero.jpg.asset.json';
export const Route=createFileRoute('/$locale/')({head:({params})=>pageHead(params.locale,'','Legal Consultancy in the UAE','استشارات قانونية في الإمارات','Clear legal advice for individuals and businesses. Al Dar Legal Consultancy, Fujairah, UAE.','مشورة قانونية واضحة للأفراد والشركات. الدار للاستشارات القانونية، الفجيرة، الإمارات.',hero.url),component:Page});
function Page(){const {locale}=Route.useParams();return isLocale(locale)?<HomePage locale={locale}/>:null;}
