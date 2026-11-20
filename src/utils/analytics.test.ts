import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GOOGLE_ADS_CONTACT_SEND_TO,
  trackPhoneClick,
  trackWhatsAppClick,
  trackBookingLead,
} from './analytics';

function setupMockWindow() {
  const calls: any[][] = [];
  const store: Record<string, string> = {};

  (globalThis as any).window = {
    gtag: (...args: any[]) => {
      calls.push(args);
    },
    dispatchEvent: () => {},
    __lastGaEventTime: {},
    __lastLocalEventTime: {},
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

  return calls;
}

test('Google Ads contact conversion snippet fires exact send_to, value, and EGP currency on contact actions', () => {
  const calls = setupMockWindow();

  trackPhoneClick('01233391255', 'اتصال هاتفي');
  trackWhatsAppClick('https://wa.me/201233391255', 'واتساب');
  trackBookingLead('01012345678', 'عميل', 'ROYAL-1234');

  const conversionEvents = calls.filter((c) => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conversionEvents.length, 3);

  for (const [, , payload] of conversionEvents) {
    assert.equal(payload.send_to, GOOGLE_ADS_CONTACT_SEND_TO);
    assert.equal(payload.send_to, 'AW-18544594401/Mq04CNmS1LgdEOGb4IpF');
    assert.equal(payload.value, 1.0);
    assert.equal(payload.currency, 'EGP');
  }
});

test('deduplicates rapid repeated phone clicks within 800ms window', () => {
  const calls = setupMockWindow();

  trackPhoneClick('01233391255', 'اتصال');
  trackPhoneClick('01233391255', 'اتصال');

  const conversionEvents = calls.filter((c) => c[0] === 'event' && c[1] === 'conversion');
  assert.equal(conversionEvents.length, 1);
});
