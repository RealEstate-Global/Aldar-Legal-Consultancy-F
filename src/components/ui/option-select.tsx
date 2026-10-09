import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import type { Locale } from '@/lib/i18n';

export type SelectOption = { value: string; label: string };
type Props = { id?: string; name?: string; label: string; placeholder?: string; value: string; onValueChange: (value: string) => void; options: readonly SelectOption[]; locale: Locale; required?: boolean; disabled?: boolean };
export function OptionSelect({ id, name, label, placeholder, value, onValueChange, options, locale, required, disabled }: Props) {
  return <Select {...(name ? { name } : {})} value={value} onValueChange={onValueChange} dir={locale === 'ar' ? 'rtl' : 'ltr'} required={required ?? false} disabled={disabled ?? false}>
    <SelectTrigger id={id} aria-label={label} className="option-select"><SelectValue placeholder={placeholder ?? label}/></SelectTrigger>
    <SelectContent className="option-menu">{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent>
  </Select>;
}