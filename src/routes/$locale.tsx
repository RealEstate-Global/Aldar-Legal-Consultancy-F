import { createFileRoute, Outlet, notFound, useRouterState } from '@tanstack/react-router';
import { isLocale } from '@/lib/i18n';
import { SiteHeader, SiteFooter } from '@/components/legal-site';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
export const Route=createFileRoute('/$locale')({beforeLoad:({params})=>{if(!isLocale(params.locale)) throw notFound();},component:LocaleLayout});
function LocaleLayout(){const {locale}=Route.useParams();const path=useRouterState({select:s=>s.location.pathname});useScrollReveal(path);if(!isLocale(locale))return null;return <div dir={locale==='ar'?'rtl':'ltr'} lang={locale}><div className="scroll-progress" aria-hidden="true"/><SiteHeader locale={locale}/><main className="page-main"><Outlet/></main><SiteFooter locale={locale}/></div>;}
