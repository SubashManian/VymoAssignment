export type LeadFieldType =
  | 'text'
  | 'email'
  | 'select'
  | 'textarea'
  | 'checkbox';
export type LeadFieldLayout = 'full' | 'half';

export type FieldValidationRules = {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
  digitsOnly?: boolean;
};

export type LeadFieldConfig = {
  name: string;
  type: LeadFieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  layout?: LeadFieldLayout;
  options?: string[];
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  validations?: FieldValidationRules;
};

export const LEAD_FORM_CONFIG: LeadFieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    placeholder: 'Subash Manian',
    required: true,
    layout: 'half',
    keyboardType: 'default',
    autoCapitalize: 'words',
    validations: { required: true, minLength: 2 },
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'xyz@vymo.com',
    required: true,
    layout: 'half',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    validations: { required: true, email: true },
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    required: true,
    layout: 'full',
    options: ['Individual', 'Company'],
    validations: { required: true },
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    placeholder: 'Vymo Technologies',
    required: false,
    layout: 'full',
    validations: { minLength: 2 },
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    placeholder: '1234567890',
    required: true,
    layout: 'full',
    keyboardType: 'phone-pad',
    validations: { required: true, exactLength: 10, digitsOnly: true },
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    placeholder: 'Tell us about your project',
    hint: 'Optional',
    layout: 'full',
    validations: { maxLength: 200 },
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I consent to being contacted about this lead.',
    required: true,
    layout: 'full',
    validations: { required: true },
  },
];

export const DEFAULT_LEAD_VALUES: Record<string, string | boolean> = {
  fullName: '',
  email: '',
  leadType: 'Individual',
  companyName: '',
  phone: '',
  notes: '',
  consent: false,
};
