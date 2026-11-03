import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Clock, 
  ChevronDown, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenCalculator: () => void;
  onOpenGoldenTips?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, onOpenGoldenTips }) => {
  const { t, theme, lang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phonesDropdownOpen, setPhonesDropdownOpen] = useState(false);

  // Smart Navbar Hide on Scroll Down, Show on Scroll Up
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at the very top
      if (currentScrollY < 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
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

  const navLinks = [
    { label: t('الرئيسية', 'Home'), href: '#hero' },
    { label: t('خدماتنا', 'Services'), href: '#services' },
    { label: t('متجر الكراتين والتغليف', 'Boxes Store'), href: '#boxes-store' },
    { label: t('الونش الهيدروليكي', 'Hydraulic Winch'), href: '#winch-section' },
    { label: t('قبل وبعد التغليف', 'Before & After'), href: '#case-study-article' },
    { label: t('التغليف والفك', 'Packing & AC'), href: '#packing-section' },
    { label: t('نصائح قبل النقل', 'Moving Tips'), href: '#moving-tips' },
    { label: t('مناطق التغطية', 'Areas'), href: '#areas' },
    { label: t('معرض الأعمال', 'Gallery'), href: '#gallery' },
    { label: t('الأسئلة الشائعة', 'FAQs'), href: '#faqs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 shadow-xl ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Banner with Royal Blue Gradient */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white font-medium text-xs sm:text-sm py-2 px-3 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white text-blue-900 font-black px-2 py-0.5 rounded-full text-xs shadow-sm">
              {t('عرض خاص اليوم ⚡', 'Special Deal Today ⚡')}
            </span>
            <span className="font-bold">
              {t('خصم 10% على باقات نقل الفلل والشقق + معاينة مجانية!', '10% OFF moving packages + free site inspection in Cairo & Giza!')}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-200" />
              <span>{t('متاحون 24 ساعة طوال الأسبوع', '24/7 Available')}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 font-bold">
              <Phone className="w-3.5 h-3.5 text-sky-200" />
              <span>{t('اتصل الآن:', 'Call:')}</span>
              <a
                href="tel:01099649897"
                className="underline hover:text-sky-200 transition-colors font-mono"
                dir="ltr"
              >
                01099649897
              </a>
              <span className="text-sky-300 font-normal">|</span>
              <a
                href="tel:01128418399"
                className="underline hover:text-sky-200 transition-colors font-mono"
                dir="ltr"
              >
                01128418399
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar with Blue / White Theme styling */}
      <nav
        className={`border-b transition-colors duration-300 ${
          theme === 'light'
            ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-800'
            : 'bg-[#030d20]/95 backdrop-blur-md border-blue-900/40 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name (Bilingual Arabic & English) - Enlarged with Luxury Styling */}
          <a href="#hero" className="flex flex-col text-right group select-none py-1">
            <div className="flex items-baseline gap-1.5 sm:gap-2.5">
              <span className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none transition-all duration-300 font-alexandria ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-sky-700 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-sky-500'
                  : 'text-white group-hover:text-sky-300'
              }`}>
                شلـهـا
              </span>
              <span className="text-xs sm:text-sm md:text-base font-black text-blue-700 dark:text-sky-400 leading-none pb-0.5">
                لنقل وتغليف الأثاث
              </span>
              <span className="text-[10px] font-black tracking-widest text-sky-700 bg-sky-50 dark:bg-blue-950/60 dark:text-sky-300 border border-sky-200 dark:border-blue-800 px-2 py-0.5 rounded-full font-mono hidden md:inline-block">
                SHELHA EGYPT
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>الرائدة لنقل العفش بمصر • Shelha Egypt</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#moving-tips' && onOpenGoldenTips) {
                    e.preventDefault();
                    onOpenGoldenTips();
                  }
                }}
                className="text-xs font-bold transition-colors py-1 text-slate-700 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Hotline & Instant Calculator CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone numbers trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPhonesDropdownOpen(!phonesDropdownOpen)}
                className="flex items-center gap-2 border px-3 py-2 rounded-xl text-xs font-bold transition-all bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm"
                aria-expanded={phonesDropdownOpen}
                aria-label="عرض أرقام الهواتف المتاحة"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span dir="ltr">{COMPANY_DATA.phones[0].number}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${phonesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {phonesDropdownOpen && (
                <div
                  className={`absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl py-2 z-50 text-right border ${
                    theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-blue-800'
                  }`}
                >
                  <div className={`px-3 py-1.5 text-xs font-bold border-b ${
                    theme === 'light' ? 'text-slate-500 border-slate-100' : 'text-slate-400 border-slate-800'
                  }`}>
                    {t('أرقام التواصل والحجوزات الفورية', 'Direct Contact & Booking Lines')}
                  </div>
                  {COMPANY_DATA.phones.map((phone) => (
                    <a
                      key={phone.number}
                      href={`tel:${phone.number}`}
                      className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                        theme === 'light' ? 'hover:bg-slate-50 text-slate-800' : 'hover:bg-blue-950/60 text-slate-200'
                      }`}
                      onClick={() => setPhonesDropdownOpen(false)}
                    >
                      <span className="text-slate-400">{phone.label}</span>
                      <span className="font-bold text-sky-400" dir="ltr">{phone.number}</span>
                    </a>
                  ))}
                  <div className={`p-2 border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'}`}>
                    <a
                      href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                        t('السلام عليكم، استفسار عن خدمات نقل العفش وتغليف الأثاث مع شركة شلها', 'Hello, I want to inquire about moving and packing services.')
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2 text-xs font-bold transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>{t('تواصل واتساب مباشرة', 'WhatsApp Directly')}</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Instant Calculator CTA */}
            <button
              type="button"
              onClick={onOpenCalculator}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white px-4 py-2 rounded-xl text-xs font-black shadow-md hover:shadow-sky-500/25 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>{t('احسب التكلفة', 'Calculate Price')}</span>
              <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded font-black">
                {t('فوري', 'Instant')}
              </span>
            </button>
          </div>

          {/* Mobile menu and tools - visible on all screens below lg (desktop links) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenCalculator}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-3 py-2 rounded-xl text-xs font-black shadow-sm cursor-pointer active:scale-95 transition-all"
            >
              {t('احسب السعر', 'Quote')}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-900 shadow-sm flex items-center gap-1.5 font-black text-xs cursor-pointer active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'أقسام الموقع'}
              title="أقسام الموقع"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-rose-600 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 text-blue-700 stroke-[2.5]" />
              )}
              <span className="hidden xs:inline sm:inline text-xs font-black text-slate-900">
                {mobileMenuOpen ? 'إغلاق' : 'الأقسام'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-3 pb-6 space-y-3 border-b ${
            theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#030d20] border-blue-900/60'
          }`}>
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/40">
              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                <Phone className="w-4 h-4" />
                <span>{t('اتصال سريع', 'Call')}</span>
              </a>
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                  t('السلام عليكم، استفسار عن خدمات نقل وتغليف الأثاث مع شركة شلها', 'Hello, inquiry about moving services')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t('واتساب مباشر', 'WhatsApp')}</span>
              </a>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.href === '#moving-tips' && onOpenGoldenTips) {
                      e.preventDefault();
                      onOpenGoldenTips();
                    }
                  }}
                  className={`block px-3 py-2 rounded-lg text-sm font-bold ${
                    theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-blue-950'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
