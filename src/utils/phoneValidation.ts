/**
 * Pure helpers for normalizing and validating Egyptian phone numbers
 * (including Arabic-Indic numerals) and inferring click source labels.
 */

const ARABIC_INDIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const EXTENDED_ARABIC_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function normalizeDigits(input: string): string {
  return input
    .split('')
    .map((ch) => {
      const idx1 = ARABIC_INDIC_DIGITS.indexOf(ch);
      if (idx1 !== -1) return String(idx1);
      const idx2 = EXTENDED_ARABIC_DIGITS.indexOf(ch);
      if (idx2 !== -1) return String(idx2);
      return ch;
    })
    .join('');
}

export function normalizeEgyptianPhone(input: string): string {
  const normalized = normalizeDigits(input).trim();
  const hasPlus = normalized.startsWith('+');
  const digitsOnly = normalized.replace(/[^\d]/g, '');

  // Convert +2010xxxxxxxx or 002010xxxxxxxx or 2010xxxxxxxx to 010xxxxxxxx
  if (digitsOnly.startsWith('0020') && digitsOnly.length >= 13) {
    return '0' + digitsOnly.slice(4);
  }
  if ((hasPlus || digitsOnly.length === 12) && digitsOnly.startsWith('20') && digitsOnly.length >= 11) {
    return '0' + digitsOnly.slice(2);
  }
  return digitsOnly;
}

export function isValidEgyptianPhone(input: string): boolean {
  const phone = normalizeEgyptianPhone(input);
  // Accepts 11-digit Egyptian mobile (010/011/012/015...) or 8-10 digit Cairo/Giza landline (02...)
  return /^01[0125]\d{8}$/.test(phone) || /^0[2-9]\d{7,8}$/.test(phone);
}
