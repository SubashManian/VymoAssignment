import { LeadFieldConfig } from './config';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateForm(
  config: LeadFieldConfig[],
  values: Record<string, string | boolean>,
): Record<string, string> {
  const errors: Record<string, string> = {};

  config.forEach(field => {
    const isCompanyField = field.name === 'companyName';
    const isVisible = !isCompanyField || values.leadType === 'Company';

    if (!isVisible) {
      return;
    }

    const value = values[field.name] ?? '';
    const valueText = typeof value === 'string' ? value.trim() : '';
    const isRequired = Boolean(
      field.required ||
        (isCompanyField && values.leadType === 'Company'),
    );

    if (field.type === 'checkbox') {
      if (isRequired && !value) {
        errors[field.name] = 'Consent is required.';
      }
      return;
    }

    if (field.type === 'select') {
      if (isRequired && (!value || String(value).trim() === '')) {
        errors[field.name] = 'Please select a lead type.';
      }
      return;
    }

    if (field.validations?.required && !valueText) {
      errors[field.name] = 'This field is required.';
      return;
    }

    if (isRequired && !valueText) {
      errors[field.name] = 'This field is required.';
      return;
    }

    if (field.type === 'email' && valueText && !EMAIL_REGEX.test(valueText)) {
      errors[field.name] = 'Enter a valid email address.';
    }

    if (
      field.validations?.minLength &&
      valueText.length > 0 &&
      valueText.length < field.validations.minLength
    ) {
      errors[field.name] = `Minimum ${field.validations.minLength} characters.`;
    }

    if (
      field.validations?.maxLength &&
      valueText.length > field.validations.maxLength
    ) {
      errors[field.name] = `Maximum ${field.validations.maxLength} characters.`;
    }

    if (
      field.validations?.exactLength &&
      valueText.length > 0 &&
      valueText.length !== field.validations.exactLength
    ) {
      errors[field.name] = `Must be ${field.validations.exactLength} digits.`;
    }

    if (
      field.validations?.digitsOnly &&
      valueText.length > 0 &&
      !/^\d+$/.test(valueText)
    ) {
      errors[field.name] = 'Use only digits.';
    }
  });

  return errors;
}
