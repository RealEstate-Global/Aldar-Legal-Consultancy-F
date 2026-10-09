import type { ReactNode } from 'react';
import { Label } from './label';
export function FormField({ id, label, required, full, error, children }: { id: string; label: string; required?: boolean; full?: boolean; error?: string | undefined; children: ReactNode }) {
  return <div className={`field${full ? ' full-field' : ''}`}><Label htmlFor={id}>{label}{required && ' *'}</Label>{children}{error && <p className="error-note" id={`${id}-error`} role="alert">{error}</p>}</div>;
}