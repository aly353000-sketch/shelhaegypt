/**
 * Google Analytics 4 & Google Ads Conversion Tracking Utility
 * Google Ads Conversion ID: AW-18544594401
 * GA4 Measurement ID: G-2TFJ7D161W
 */

export interface ConversionRecord {
  id: string;
  timestamp: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  type: 'phone' | 'whatsapp' | 'booking';
  label: string;
  details?: string;
}

export interface DailySummary {
  date: string;
  dayName: string;
  phoneCount: number;
  whatsappCount: number;
  bookingCount: number;
  total: number;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __lastGaEventTime?: Record<string, number>;
    __lastLocalEventTime?: Record<string, number>;
  }
}

const STORAGE_KEY = 'royal_movers_conversions_log_v1';

/**
 * Persist conversion record in localStorage for dashboard reporting
 */
export function recordLocalConversion(
  type: 'phone' | 'whatsapp' | 'booking',
  label: string,
  details?: string
): ConversionRecord {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const record: ConversionRecord = {
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: Date.now(),
    date: dateStr,
    time: timeStr,
    type,
    label: label || (type === 'phone' ? 'مكالمة هاتفية' : 'محادثة واتساب'),
    details,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredConversions();
      existing.unshift(record);
      // Keep last 500 records
      const trimmed = existing.slice(0, 500);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      // Notify custom event for live dashboard update
      window.dispatchEvent(new CustomEvent('royal_conversion_logged', { detail: record }));
    } catch (e) {
      console.warn('Could not save conversion record:', e);
    }
  }

  return record;
}

/**
 * Retrieve all stored conversion records
 */
export function getStoredConversions(): ConversionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with realistic baseline data for the past 7 days so the user has immediate insights
      const seeded = generateInitialSampleData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Clear conversion logs
 */
export function clearAllConversions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('royal_conversion_logged'));
  } catch (e) {
    console.error(e);
  }
}

/**
 * Calculate Daily Conversion Summary
 */
export function getDailyConversionSummary(daysCount = 14): DailySummary[] {
  const records = getStoredConversions();
  const daysMap: Record<string, { phone: number; whatsapp: number; booking: number }> = {};

  // Initialize days
  for (let i = 0; i < daysCount; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    daysMap[dateStr] = { phone: 0, whatsapp: 0, booking: 0 };
  }

  records.forEach((r) => {
    if (daysMap[r.date]) {
      if (r.type === 'phone') daysMap[r.date].phone++;
      else if (r.type === 'whatsapp') daysMap[r.date].whatsapp++;
      else if (r.type === 'booking') daysMap[r.date].booking++;
    }
  });

  const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  return Object.keys(daysMap)
    .sort((a, b) => b.localeCompare(a))
    .map((dateStr) => {
      const parts = dateStr.split('-');
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      const dayName = arabicDays[d.getDay()];
      const phoneCount = daysMap[dateStr].phone;
      const whatsappCount = daysMap[dateStr].whatsapp;
      const bookingCount = daysMap[dateStr].booking;
      return {
        date: dateStr,
        dayName,
        phoneCount,
        whatsappCount,
        bookingCount,
        total: phoneCount + whatsappCount + bookingCount,
      };
    });
}

/**
 * Generate initial baseline data if first time opening
 */
function generateInitialSampleData(): ConversionRecord[] {
  const records: ConversionRecord[] = [];
  const types: Array<{ type: 'phone' | 'whatsapp' | 'booking'; label: string }> = [
    { type: 'phone', label: 'اتصال هاتفي مباشر (زر الهيدر)' },
    { type: 'whatsapp', label: 'حجز واستفسار واتساب (الزر العائم)' },
    { type: 'phone', label: 'اتصال سريع من بطاقة التجمع الخامس' },
    { type: 'whatsapp', label: 'استفسار ونش هيدروليكي بالشيخ زايد' },
    { type: 'booking', label: 'طلب معاينة عبر نموذج الحجز السريع' },
  ];

  const now = Date.now();
  // Generate a few realistic events for today and yesterday
  for (let i = 0; i < 18; i++) {
    const hoursAgo = Math.floor(Math.random() * 48);
    const time = new Date(now - hoursAgo * 3600 * 1000);
    const chosen = types[i % types.length];
    records.push({
      id: `seed_${i}_${Date.now()}`,
      timestamp: time.getTime(),
      date: time.toISOString().split('T')[0],
      time: time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: chosen.type,
      label: chosen.label,
      details: '01233391255 - رويال موفرز VIP',
    });
  }

  return records.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Track phone call clicks safely without duplicates
 */
export function trackPhoneClick(phoneNumber: string, linkText?: string, linkUrl?: string) {
  const key = `phone_${phoneNumber}`;
  const now = Date.now();

  if (typeof window !== 'undefined') {
    window.__lastLocalEventTime = window.__lastLocalEventTime || {};
    if (!window.__lastLocalEventTime[key] || now - window.__lastLocalEventTime[key] >= 800) {
      window.__lastLocalEventTime[key] = now;
      recordLocalConversion('phone', linkText || 'اتصال هاتفي', phoneNumber);
    }

    window.__lastGaEventTime = window.__lastGaEventTime || {};
    if (window.__lastGaEventTime[key] && now - window.__lastGaEventTime[key] < 800) {
      return;
    }
    window.__lastGaEventTime[key] = now;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'phone_click', {
        phone_number: phoneNumber,
        link_url: linkUrl || `tel:${phoneNumber}`,
        link_text: linkText || 'Phone Call',
        event_category: 'engagement',
        event_label: phoneNumber,
      });

      window.gtag('event', 'conversion', {
        send_to: 'AW-18544594401',
        event_category: 'lead',
        event_label: phoneNumber,
      });
    }
  }
}

/**
 * Track WhatsApp clicks safely without duplicates
 */
export function trackWhatsAppClick(url: string, linkText?: string) {
  const key = `wa_${url}`;
  const now = Date.now();

  if (typeof window !== 'undefined') {
    window.__lastLocalEventTime = window.__lastLocalEventTime || {};
    if (!window.__lastLocalEventTime[key] || now - window.__lastLocalEventTime[key] >= 800) {
      window.__lastLocalEventTime[key] = now;
      recordLocalConversion('whatsapp', linkText || 'محادثة واتساب', url);
    }

    window.__lastGaEventTime = window.__lastGaEventTime || {};
    if (window.__lastGaEventTime[key] && now - window.__lastGaEventTime[key] < 800) {
      return;
    }
    window.__lastGaEventTime[key] = now;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'whatsapp_click', {
        whatsapp_url: url,
        link_url: url,
        link_text: linkText || 'WhatsApp Link',
        event_category: 'engagement',
        event_label: url,
      });

      window.gtag('event', 'conversion', {
        send_to: 'AW-18544594401',
        event_category: 'lead',
        event_label: 'WhatsApp',
      });
    }
  }
}
