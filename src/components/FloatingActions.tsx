import React, { useState, useEffect } from 'react';
import { Phone, ChevronUp, ArrowRight } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

export const FloatingActions: React.FC = () => {
  const { t, theme, lang } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [callHovered, setCallHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Floating WhatsApp Button on the RIGHT (عائم عاليمين) with authentic WhatsApp logo */}
      <div className="fixed right-4 sm:right-6 bottom-6 z-50 flex flex-col items-end">
        {/* Pulsing notification badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full shadow-lg mb-2 animate-bounce">
          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t('راسلنا واتساب الآن', 'Chat on WhatsApp')}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <a
          href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
            t('السلام عليكم، استفسار عن خدمات نقل وتغليف أثاث الفلل والقصور مع رويال موفرز VIP', 'Hello, inquiry about VIP moving services with Royal Movers Egypt.')
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="تواصل عبر الواتساب"
        >
          <WhatsAppIcon className="w-8 h-8 fill-current group-hover:rotate-12 transition-transform" />
          <span className="sr-only">تواصل عبر الواتساب</span>
        </a>
      </div>

      {/* 2. Floating Distinctive 'رجوع للأعلى' (Scroll to Top) Button with Rich Visuals & Comfort Palette */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in zoom-in-95 duration-300">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl border border-amber-400/50 bg-gradient-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 hover:from-blue-950 hover:to-slate-900 text-amber-300 hover:text-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group select-none"
            title={t('العودة لأعلى الصفحة', 'Scroll to top')}
            aria-label={t('العودة لأعلى الصفحة', 'Scroll to top')}
          >
            <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center group-hover:bg-amber-400/30 transition-colors">
              <ChevronUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
            </div>
            <span className="text-xs font-black text-white group-hover:text-amber-200 tracking-wide">
              {t('رجوع للأعلى', 'Top')}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
          </button>
        </div>
      )}

      {/* 3. Floating Go Back Arrow Button on Left */}
      <div className="fixed left-4 sm:left-6 bottom-24 z-40 hidden sm:flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={handleGoBack}
          className={`flex items-center gap-2 border px-3.5 py-2 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer ${
            theme === 'light'
              ? 'bg-white/95 text-blue-900 border-slate-300 hover:border-blue-500 hover:text-blue-600'
              : 'bg-slate-900/95 text-slate-200 border-blue-900 hover:border-sky-400 hover:text-sky-300'
          }`}
          title={t('الرجوع للصفحة السابقة', 'Go back')}
          aria-label={t('سهم الرجوع للصفحة السابقة', 'Back arrow')}
        >
          <ArrowRight className={`w-4 h-4 text-sky-400 transition-transform ${lang === 'en' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          <span className="text-xs font-bold">{t('رجوع', 'Back')}</span>
        </button>
      </div>

      {/* 3. Floating Call Button on the LEFT (عائم على الشمال) with 'اتصل الآن' Tooltip on Hover & 10s Periodic Shake */}
      <div className="fixed left-4 sm:left-6 bottom-6 z-50 flex flex-col items-start">
        
        {/* Tooltip 'اتصل الآن' appears smoothly when hovered or active */}
        <div
          className={`transition-all duration-300 pointer-events-none mb-2 ${
            callHovered
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95 hidden sm:block'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-700 to-sky-600 text-white font-black text-xs px-3.5 py-1.5 rounded-full shadow-xl border border-sky-300/40 flex items-center gap-1.5 animate-pulse">
            <Phone className="w-3.5 h-3.5" />
            <span>{t('اتصل الآن', 'Call Now')}</span>
          </div>
        </div>

        {/* Main Floating Call Button with Direct Phone Link (Instant Call on Click) */}
        <a
          href="tel:01233391255"
          onMouseEnter={() => setCallHovered(true)}
          onMouseLeave={() => setCallHovered(false)}
          className="animate-periodic-shake w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 hover:from-blue-600 hover:to-sky-300 text-white flex items-center justify-center shadow-2xl shadow-blue-600/50 hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer border-2 border-white/30"
          aria-label={t('اتصل الآن بشركة رويال موفرز VIP - 01233391255', 'Call Royal Movers VIP - 01233391255')}
        >
          <Phone className="w-7 h-7 group-hover:rotate-12 transition-transform stroke-[2.5]" />
          <span className="sr-only">{t('اتصل الآن', 'Call Now')}</span>
        </a>
      </div>
    </>
  );
};
