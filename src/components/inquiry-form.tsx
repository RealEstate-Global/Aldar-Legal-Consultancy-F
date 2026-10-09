import { useState, type FormEvent } from 'react';
import { ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { FormField } from './ui/form-field';
import { OptionSelect } from './ui/option-select';
import { PageIntro, ContactPanel } from './legal-site';
import { BUSINESS, t, type Locale } from '@/lib/i18n';
import { local, services } from '@/lib/legal-content';
import { inquirySchema } from '@/lib/inquiry-schema';

export function InquiryPage({ locale, kind = 'consultation' }: { locale: Locale; kind?: 'consultation' | 'contact' }) {
  const [clientType, setClientType] = useState('individual');
  const [service, setService] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState('');
  const l = (en: string, ar: string) => local(locale,en,ar);
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = inquirySchema.safeParse({ ...data, locale, kind, client_type: clientType, service, contact_method: contactMethod, consent, preferred_date: data['preferred_date'] ?? '', website: '' });
    if (!parsed.success) {
      const next: Record<string,string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = l('Please check this field.','يرجى مراجعة هذا الحقل.');
      setErrors(next); return;
    }
    setErrors({});
    const value = parsed.data;
    const selected = services.find(item => item.slug === service);
    const body = `${value.full_name}\n${value.email}\n${value.phone}\n\n${t(locale,'form.clientType')}: ${clientType}\n${t(locale,'form.service')}: ${selected ? local(locale,selected.en,selected.ar) : service}\n${t(locale,'form.contactPreference')}: ${contactMethod}\n${t(locale,'form.preferredDate')}: ${value.preferred_date || '—'}\n\n${value.description}`;
    setDraft(`mailto:${BUSINESS.email}?subject=${encodeURIComponent(t(locale,kind === 'contact' ? 'contact.form.title' : 'consultation.title'))}&body=${encodeURIComponent(body)}`);
  }
  const fieldProps = (id: string) => ({ id, 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? `${id}-error` : undefined });
  return <><PageIntro locale={locale} title={t(locale,kind === 'contact' ? 'contact.title' : 'consultation.title')} description={t(locale,kind === 'contact' ? 'contact.sub' : 'consultation.sub')}/><section className="section"><div className="site-container form-layout"><div><div className="eyebrow">{l('A confidential first conversation','حوار أول يحترم الخصوصية')}</div><h2 className="text-2xl mb-8">{t(locale,kind === 'contact' ? 'contact.form.title' : 'cta.discussMatter')}</h2>
    <form className="inquiry-form" onSubmit={onSubmit} onChange={() => setDraft('')}>
      <FormField id="full_name" label={t(locale,'form.fullName')} required error={errors['full_name']}><Input {...fieldProps('full_name')} name="full_name" autoComplete="name" required minLength={2} maxLength={100}/></FormField>
      <FormField id="email" label={t(locale,'form.email')} required error={errors['email']}><Input {...fieldProps('email')} name="email" type="email" autoComplete="email" required maxLength={255}/></FormField>
      <FormField id="phone" label={t(locale,'form.phone')} required error={errors['phone']}><Input {...fieldProps('phone')} name="phone" type="tel" autoComplete="tel" required pattern="[+0-9 ()\-]{7,30}" maxLength={30} dir="ltr" placeholder="+971"/></FormField>
      <FormField id="client_type" label={t(locale,'form.clientType')}><OptionSelect id="client_type" name="client_type" label={t(locale,'form.clientType')} value={clientType} onValueChange={value => {setClientType(value);setDraft('');}} locale={locale} options={[{value:'individual',label:t(locale,'form.individual')},{value:'business',label:t(locale,'form.business')}]}/></FormField>
      <FormField id="service" label={t(locale,'form.service')} required full error={errors['service']}><OptionSelect id="service" name="service" label={t(locale,'form.service')} placeholder={l('Select a service','اختاروا الخدمة')} value={service} onValueChange={value => {setService(value);setDraft('');}} locale={locale} required options={services.map(item => ({value:item.slug,label:local(locale,item.en,item.ar)}))}/></FormField>
      <FormField id="description" label={t(locale,'form.description')} required full error={errors['description']}><Textarea {...fieldProps('description')} name="description" required minLength={10} maxLength={3000}/></FormField>
      {kind === 'consultation' && <FormField id="preferred_date" label={t(locale,'form.preferredDate')} error={errors['preferred_date']}><Input {...fieldProps('preferred_date')} name="preferred_date" type="date"/></FormField>}
      <FormField id="contact_method" label={t(locale,'form.contactPreference')}><OptionSelect id="contact_method" name="contact_method" label={t(locale,'form.contactPreference')} value={contactMethod} onValueChange={value => {setContactMethod(value);setDraft('');}} locale={locale} options={[{value:'email',label:t(locale,'form.email')},{value:'phone',label:t(locale,'form.phone')},{value:'whatsapp',label:t(locale,'cta.whatsapp')}]}/></FormField>
      <div className="full-field"><div className="consent-label"><Checkbox id="consent" checked={consent} onCheckedChange={value => {setConsent(value === true);setDraft('');}} required aria-invalid={!!errors['consent']}/><label htmlFor="consent">{t(locale,'form.consent')}</label></div>{errors['consent'] && <p className="error-note" role="alert">{errors['consent']}</p>}</div>
      <div className="full-field"><Button type="submit" variant="gold" size="lg">{l('Prepare email','إعداد البريد الإلكتروني')}<ArrowRight className="direction-arrow"/></Button><p className="section-copy flex items-center gap-2 text-xs mt-4"><ShieldCheck size={14}/>{l('A request is not a confirmed appointment.','الطلب ليس موعداً مؤكداً.')}</p></div>
      {draft && <div className="full-field email-draft" role="status"><p>{l('Your email is ready. Send it from your email app to contact Al Dar.','بريدكم جاهز. أرسلوه من تطبيق البريد للتواصل مع الدار.')}</p><Button asChild variant="outline"><a href={draft}><Mail/>{l('Open email','فتح البريد الإلكتروني')}</a></Button></div>}
    </form></div><ContactPanel locale={locale}/></div></section></>;
}