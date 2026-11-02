/**
 * Google Analytics 4 (GA4) Custom Event Tracking Utility
 * Measurement ID: G-2TFJ7D161W
 * 
 * Events:
 * - phone_click: Triggered on tel: links and phone call buttons
 * - whatsapp_click: Triggered on wa.me and api.whatsapp.com links
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __lastGaEventTime?: Record<string, number>;
  }
}

/**
 * Track phone call clicks safely without duplicates
 */
export function trackPhoneClick(phoneNumber: string, linkText?: string, linkUrl?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const key = `phone_${phoneNumber}`;
  const now = Date.now();
  window.__lastGaEventTime = window.__lastGaEventTime || {};
  
  // Deduplicate if fired within 800ms
  if (window.__lastGaEventTime[key] && now - window.__lastGaEventTime[key] < 800) {
    return;
  }
  window.__lastGaEventTime[key] = now;

  window.gtag('event', 'phone_click', {
    phone_number: phoneNumber,
    link_url: linkUrl || `tel:${phoneNumber}`,
    link_text: linkText || 'Phone Call',
    event_category: 'engagement',
    event_label: phoneNumber,
  });
}

/**
 * Track WhatsApp clicks safely without duplicates
 */
export function trackWhatsAppClick(url: string, linkText?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const key = `wa_${url}`;
  const now = Date.now();
  window.__lastGaEventTime = window.__lastGaEventTime || {};

  // Deduplicate if fired within 800ms
  if (window.__lastGaEventTime[key] && now - window.__lastGaEventTime[key] < 800) {
    return;
  }
  window.__lastGaEventTime[key] = now;

  window.gtag('event', 'whatsapp_click', {
    whatsapp_url: url,
    link_url: url,
    link_text: linkText || 'WhatsApp Link',
    event_category: 'engagement',
    event_label: url,
  });
}
