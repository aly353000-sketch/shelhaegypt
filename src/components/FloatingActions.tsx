import React, { useState, useEffect } from 'react';
import { Phone, ChevronUp, Copy, Check } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

export const FloatingActions: React.FC = () => {
  const { t } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const phoneNumber = COMPANY_DATA.phones[0]?.number || '01233391255';
  const waUrl = `https://wa.me/20${COMPANY_DATA.whatsappDefault || phoneNumber}?text=${encodeURIComponent(
    t(
      'السلام عليكم، استفسار عن خدمات وأسعار نقل وتغليف الأثاث مع رويال موفرز VIP',
      'Hello, inquiry about VIP moving services with Royal Movers Egypt.'
    )
  )}`;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2200);
    } catch {
      // Clipboard API fallback ignored if restricted
    }
  };

  return (
    <>
      {/* 1. Floating WhatsApp Button on the RIGHT */}
      <div className="fixed right-3.5 sm:right-6 bottom-4 sm:bottom-6 z-40 flex flex-col items-end">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(waUrl, 'زر الواتساب العائم')}
          className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl shadow-emerald-500/45 border-2 border-emerald-200/40 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
          aria-label={t('تواصل عبر الواتساب الآن', 'Chat on WhatsApp')}
        >
          <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0 group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm font-black whitespace-nowrap">
            {t('واتساب الآن', 'WhatsApp')}
          </span>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
        </a>
      </div>

      {/* 2. Floating Scroll-to-Top Pill (elevated above bottom bar on mobile, centered on desktop) */}
      {showScrollTop && (
        <div className="fixed bottom-[74px] sm:bottom-6 left-1/2 -translate-x-1/2 z-30 animate-in fade-in zoom-in-95 duration-300">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl border border-amber-400/50 bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 hover:from-blue-950 hover:to-slate-900 text-amber-300 hover:text-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group select-none"
            title={t('العودة لأعلى الصفحة', 'Scroll to top')}
            aria-label={t('العودة لأعلى الصفحة', 'Scroll to top')}
          >
            <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
              <ChevronUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            </div>
            <span className="text-[11px] sm:text-xs font-black text-white group-hover:text-amber-200 tracking-wide whitespace-nowrap">
              {t('رجوع للأعلى', 'Top')}
            </span>
          </button>
        </div>
      )}

      {/* 3. Floating Direct Call Pill on the LEFT with Clear Label, Direct tel: Action & Desktop Copy */}
      <div className="fixed left-3.5 sm:left-6 bottom-4 sm:bottom-6 z-40 flex flex-col items-start gap-2">
        {copiedPhone && (
          <div className="bg-emerald-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-xl border border-emerald-300/40 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
            <Check className="w-3.5 h-3.5" />
            <span>{t(`تم نسخ الرقم: ${phoneNumber}`, `Copied: ${phoneNumber}`)}</span>
          </div>
        )}

        <div className="flex items-center overflow-hidden rounded-full shadow-2xl shadow-blue-600/45 border-2 border-sky-300/45 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white transition-all duration-300 hover:shadow-blue-500/60">
          <a
            href={`tel:${phoneNumber}`}
            onClick={() => trackPhoneClick(phoneNumber, 'زر الاتصال العائم', `tel:${phoneNumber}`)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-white/10 active:scale-95 transition-all cursor-pointer group"
            aria-label={t(`اتصل الآن بشركة رويال موفرز VIP - ${phoneNumber}`, `Call Royal Movers VIP - ${phoneNumber}`)}
          >
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 animate-periodic-shake">
              <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5] group-hover:rotate-12 transition-transform" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-xs sm:text-sm font-black whitespace-nowrap">
                {t('اتصل الآن', 'Call Now')}
              </span>
              <span
                className="hidden sm:block text-[11px] font-mono font-bold text-sky-100 tracking-wider"
                dir="ltr"
              >
                {phoneNumber}
              </span>
            </span>
          </a>

          <button
            type="button"
            onClick={handleCopyPhone}
            className="hidden sm:flex items-center justify-center gap-1 px-3 py-3 border-s border-white/25 hover:bg-white/15 active:scale-95 transition-colors cursor-pointer text-xs font-bold"
            title={t('نسخ رقم الهاتف', 'Copy phone number')}
            aria-label={t(`نسخ رقم الهاتف ${phoneNumber}`, `Copy ${phoneNumber}`)}
          >
            {copiedPhone ? (
              <Check className="w-4 h-4 text-emerald-200" />
            ) : (
              <Copy className="w-4 h-4 text-sky-100" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
