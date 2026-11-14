import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeDigits,
  normalizeEgyptianPhone,
  isValidEgyptianPhone,
} from './phoneValidation';

test('normalizes Arabic-Indic and Extended Arabic-Indic numerals', () => {
  assert.equal(normalizeDigits('٠١٢٣٣٣٩١٢٥٥'), '01233391255');
  assert.equal(normalizeDigits('۰۱۲۳۴۵۶۷۸۹'), '0123456789');
});

test('normalizes +20 and 0020 prefixes to local Egyptian 01x format', () => {
  assert.equal(normalizeEgyptianPhone('+20 123 339 1255'), '01233391255');
  assert.equal(normalizeEgyptianPhone('00201012345678'), '01012345678');
  assert.equal(normalizeEgyptianPhone('٠١١-٢٣٤٥-٦٧٨٩'), '01123456789');
});

test('validates valid Egyptian mobile and landline numbers and rejects invalid ones', () => {
  assert.equal(isValidEgyptianPhone('01233391255'), true);
  assert.equal(isValidEgyptianPhone('٠١٠٠١٢٣٤٥٦٧'), true);
  assert.equal(isValidEgyptianPhone('+201555555555'), true);
  assert.equal(isValidEgyptianPhone('0225081234'), true);

  assert.equal(isValidEgyptianPhone('01234'), false);
  assert.equal(isValidEgyptianPhone('01912345678'), false);
  assert.equal(isValidEgyptianPhone(''), false);
});
