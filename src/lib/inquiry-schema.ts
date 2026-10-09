import { z } from 'zod';
export const inquirySchema = z.object({
 kind:z.enum(['consultation','contact']),
 full_name:z.string().trim().min(2).max(100), email:z.string().trim().email().max(255),
 phone:z.string().trim().regex(/^[+\d\s()\-]{7,30}$/), locale:z.enum(['en','ar']),
 client_type:z.enum(['individual','business']), service:z.string().trim().min(1).max(100),
 description:z.string().trim().min(10).max(3000), preferred_date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal('')),
 contact_method:z.enum(['email','phone','whatsapp']), consent:z.literal(true),
 website:z.string().max(0),
});
