import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GOOGLE_ADS_CALL_SEND_TO,
  GOOGLE_ADS_CONTACT_SEND_TO,
  trackPhoneClick,
  handlePhoneCallClick,
  trackWhatsAppClick,
  trackBookingLead,
} from './analytics';

function setupMockWindow(withReportConversion = false) {
  const calls: any[][] = [];
  const reportConversionUrls: Array<string | undefined> = [];
  const store: Record<string, string> = {};

  (globalThis as any).window = {
    gtag: (...args: any[]) => {
      calls.push(args);
    },
    ...(withReportConversion
      ? {
          gtag_report_conversion: (url?: string) => {
            reportConversionUrls.push(url);
            calls.push([
              'event',
              'conversion',
              {
                send_to: GOOGLE_ADS_CALL_SEND_TO,
                value: 1.0,
                currency: 'EGP',
              },
            ]);
            return false;
          },
        }
      : {}),
    dispatchEvent: () => {},
    __lastGaEventTime: {},
    __lastLocalEventTime: {},
    __lastCallConversionTime: {},
  };
  (globalThis as any).localStorage = {
    getItem: (k: string) => (k in store ? store[k] : null),
    setItem: (k: string, v: string) => {
      store[k] = v;
    },
    removeItem: (k: string) => {
      delete store[k];
    },
  };
  (globalThis as any).CustomEvent = class CustomEvent {
    type: string;
    detail: any;
    constructor(type: string, opts?: { detail?: any }) {
      this.type = type;
      this.detail = opts?.detail;
    }
  };

  return { calls, reportConversionUrls };
}

test('Google Ads call conversion fires exact AW-18544594401/Zg7tCM6j1r0dEOGb4IpF and contact conversion fires on WhatsApp & booking', () => {
  const { calls, reportConversionUrls } = setupMockWindow(true);

  let prevented = false;
  const ret = handlePhoneCallClick({ preventDefault: () => { prevented = true; } }, 'tel:01233391255', 'اتصال هاتفي');
  assert.equal(ret, false);
  assert.equal(prevented, true);
  assert.deepEqual(reportConversionUrls, ['tel:01233391255']);

  trackWhatsAppClick('https://wa.me/201233391255', 'واتساب');
  trackBookingLead('01012345678', 'عميل', 'ROYAL-1234');

  const conversionEvents = calls.filter((c) => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conversionEvents.length, 3);

  assert.equal(conversionEvents[0][2].send_to, GOOGLE_ADS_CALL_SEND_TO);
  assert.equal(conversionEvents[0][2].send_to, 'AW-18544594401/Zg7tCM6j1r0dEOGb4IpF');
  assert.equal(conversionEvents[0][2].value, 1.0);
  assert.equal(conversionEvents[0][2].currency, 'EGP');

  for (const [, , payload] of conversionEvents.slice(1)) {
    assert.equal(payload.send_to, GOOGLE_ADS_CONTACT_SEND_TO);
    assert.equal(payload.send_to, 'AW-18544594401/Mq04CNmS1LgdEOGb4IpF');
    assert.equal(payload.value, 1.0);
    assert.equal(payload.currency, 'EGP');
  }
});

test('deduplicates rapid repeated phone clicks within 800ms window', () => {
  const { calls } = setupMockWindow(false);

  trackPhoneClick('01233391255', 'اتصال');
  trackPhoneClick('01233391255', 'اتصال');

  const conversionEvents = calls.filter((c) => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conversionEvents.length, 1);
  assert.equal(conversionEvents[0][2].send_to, 'AW-18544594401/Zg7tCM6j1r0dEOGb4IpF');
});
