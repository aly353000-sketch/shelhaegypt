import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Clock, 
  ChevronDown, 
  ArrowRight, 
  Sparkles,
  Search,
  MapPin,
  Building2,
  Compass,
  BarChart3
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenGoldenTips?: () => void;
  onSelectArea?: (slug: string) => void;
  onOpenBrandKit?: () => void;
  onOpenConversions?: () => void;
  isOwner?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSearch, 
  onOpenGoldenTips,
  onSelectArea,
  onOpenBrandKit,
  onOpenConversions,
  isOwner = false
}) => {
  const { t, theme, lang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phonesDropdownOpen, setPhonesDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);

  // Discreet secret 5-tap on VIP badge to activate owner dashboard
  const [secretTaps, setSecretTaps] = useState(0);
  const handleSecretTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSecretTaps(prev => {
      const next = prev + 1;
      if (next >= 5) {
        if (onOpenConversions) onOpenConversions();
        return 0;
      }
      return next;
    });
    setTimeout(() => setSecretTaps(0), 3000);
  };

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

  const luxuryAreasList = [
    { name: 'نقل عفش الشيخ زايد', slug: 'sheikh-zayed', badge: 'كمبوندات النخبة 🏰' },
    { name: 'نقل عفش التجمع الخامس', slug: 'new-cairo', badge: 'قصور وفلل 👑' },
    { name: 'نقل عفش 6 أكتوبر', slug: 'october', badge: 'غرب سوميد والحدائق 🛡️' },
    { name: 'نقل عفش مدينتي والرحاب', slug: 'madinaty', badge: 'طلعت مصطفى 🌴' },
    { name: 'نقل عفش العاصمة الإدارية', slug: 'new-capital', badge: 'مقرات وفلل R7 & R8 🏛️' },
    { name: 'نقل عفش الساحل الشمالي والعلمين', slug: 'north-coast', badge: 'مراسي وهاسيندا 🌊' },
    { name: 'نقل عفش المعادي والزمالك', slug: 'maadi-zamalek', badge: 'مبانٍ كلاسيكية 🏛️' },
  ];

  const handleAreaClick = (slug: string) => {
    setAreasDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectArea) {
      onSelectArea(slug);
    } else {
      window.location.hash = `#area/${slug}`;
    }
  };

  const desktopNavLinks = [
    { label: t('الرئيسية', 'Home'), href: '#hero' },
    { label: t('الخدمات', 'Services'), href: '#interactive-services' },
    { label: t('الونش الهيدروليكي', 'Hydraulic Winch'), href: '#winch-section' },
    { label: t('معرض الأعمال', 'Gallery'), href: '#gallery' },
    { label: t('مقرنا بالمقطم 📍', 'Location'), href: '#location-section' },
    { label: t('الأسئلة الشائعة', 'FAQs'), href: '#faqs' },
  ];

  const mobileNavLinks = [
    { label: t('الرئيسية', 'Home'), href: '#hero' },
    { label: t('مقرنا بالمقطم 📍', 'Location'), href: '#location-section' },
    { label: t('خدمات الفلل والقصور', 'VIP Services'), href: '#services' },
    { label: t('خدمات تفاعلية 🔄', 'Interactive Services'), href: '#interactive-services' },
    { label: t('كمبوندات نخدمها 🏰', 'Compounds'), href: '#luxury-compounds' },
    { label: t('الونش الهيدروليكي', 'Hydraulic Winch'), href: '#winch-section' },
    { label: t('قبل وبعد التغليف', 'Before & After'), href: '#case-study-article' },
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
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold">
            <Clock className="w-4 h-4 text-sky-200" />
            <span>{t('متاحون 24 ساعة طوال الأسبوع', '24/7 Available')}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 font-bold">
            <Phone className="w-4 h-4 text-sky-200" />
            <span>{t('الخط الساخن الموحد:', 'Direct Hotline:')}</span>
            <a
              href="tel:01233391255"
              className="underline hover:text-sky-200 transition-colors font-mono text-sm sm:text-base font-black tracking-wider"
              dir="ltr"
            >
              01233391255
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar with Unified Royal Navy Blue Luxury Styling */}
      <nav className="border-b transition-colors duration-300 bg-[#020b18]/95 backdrop-blur-xl border-blue-900/60 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Name (Royal Movers VIP) - Compact, Crisp & Non-Wrapping */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 text-right group select-none py-1 shrink-0">
            <div className="relative shrink-0">
              <img 
                src="/assets/logos/royal_movers_logo.jpg" 
                alt="ROYAL MOVERS VIP Logo" 
                className="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-xl border-2 border-amber-400/80 shadow-lg bg-white p-0.5 group-hover:scale-105 transition-transform" 
              />
              <span 
                onClick={handleSecretTap}
                className="absolute -bottom-1 -left-1 bg-amber-500 text-slate-950 font-black text-[9px] px-1 py-0.5 rounded font-mono shadow-xs border border-white cursor-pointer select-none active:scale-90 transition-transform"
                title="VIP"
              >
                VIP
              </span>
            </div>

            <div className="flex flex-col justify-center shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight leading-none font-alexandria text-white group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  رويال موفرز
                </span>
                <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 border border-amber-300 px-1.5 py-0.5 rounded-md font-mono shadow-sm shrink-0">
                  VIP
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-amber-300 font-mono uppercase whitespace-nowrap" dir="ltr">
                  ROYAL MOVERS VIP
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            {desktopNavLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href === '#moving-tips' && onOpenGoldenTips) {
                    e.preventDefault();
                    onOpenGoldenTips();
                  }
                }}
                className="text-xs xl:text-sm font-bold transition-colors py-1 text-slate-100 hover:text-amber-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}

            {/* Desktop Areas Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAreasDropdownOpen(!areasDropdownOpen)}
                className="flex items-center gap-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap"
                aria-expanded={areasDropdownOpen}
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>أهم المناطق</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${areasDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {areasDropdownOpen && (
                <div 
                  className={`absolute left-0 mt-2 w-72 rounded-2xl shadow-2xl py-2 z-50 text-right border ${
                    theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#031126] border-blue-800'
                  }`}
                >
                  <div className={`px-4 py-2 text-xs font-black border-b ${
                    theme === 'light' ? 'text-slate-500 border-slate-100' : 'text-slate-400 border-blue-900/60'
                  }`}>
                    اختر منطقة للاطلاع على كافة التفاصيل والمميزات:
                  </div>

                  {luxuryAreasList.map((item) => (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => handleAreaClick(item.slug)}
                      className={`w-full text-right flex items-center justify-between px-4 py-2.5 text-xs font-black transition-colors cursor-pointer ${
                        theme === 'light' 
                          ? 'hover:bg-blue-50 text-slate-800 hover:text-blue-700' 
                          : 'hover:bg-blue-900/50 text-slate-200 hover:text-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] text-sky-600 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/60 px-2 py-0.5 rounded-md font-bold">
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Desktop Hotline & Search Button */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Phone numbers trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPhonesDropdownOpen(!phonesDropdownOpen)}
                className="flex items-center gap-1.5 border px-2.5 py-2 rounded-xl text-xs font-bold transition-all bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm cursor-pointer whitespace-nowrap"
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
                        t('السلام عليكم، استفسار عن خدمات نقل وتغليف أثاث الفلل والقصور مع رويال موفرز VIP', 'Hello, I want to inquire about VIP moving services with Royal Movers.')
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

            {/* Brand Kit & Logos Hub Trigger (Desktop) */}
            {onOpenBrandKit && (
              <button
                type="button"
                onClick={onOpenBrandKit}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-amber-400/50 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
                title="لوجو وهوية رويال موفرز VIP"
              >
                <span>👑</span>
                <span>هوية رويال</span>
              </button>
            )}

            {/* Conversions Analytics Dashboard (Desktop - Owner Only) */}
            {onOpenConversions && isOwner && (
              <button
                type="button"
                onClick={onOpenConversions}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-emerald-400/50 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-black text-xs shadow-sm transition-all cursor-pointer whitespace-nowrap"
                title="لوحة تحكم إحصائيات وتحويلات الإعلانات (خاصة بالمالك)"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>التحويلات</span>
              </button>
            )}

            {/* Search Icon Button (علامة العدسة) */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 rounded-xl border border-blue-800 bg-slate-900 hover:bg-blue-950 text-amber-400 shadow-sm transition-all flex items-center justify-center cursor-pointer shrink-0"
              aria-label="بحث في الموقع"
              title="بحث في الموقع"
            >
              <Search className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Mobile menu and tools - visible on all screens below lg */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Conversions Tracker Trigger (Mobile - Owner Only) */}
            {onOpenConversions && isOwner && (
              <button
                type="button"
                onClick={onOpenConversions}
                className="p-2.5 rounded-xl border border-emerald-400/60 bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 font-black text-xs shadow-sm transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                aria-label="التحويلات"
                title="إحصائيات التحويلات"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black hidden xs:inline">التحويلات</span>
              </button>
            )}

            {/* Brand Kit Trigger (Mobile) */}
            {onOpenBrandKit && (
              <button
                type="button"
                onClick={onOpenBrandKit}
                className="p-2.5 rounded-xl border border-amber-400/80 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                aria-label="لوجو رويال VIP"
                title="لوجوهات رويال موفرز VIP"
              >
                <span className="text-sm">👑</span>
                <span className="text-[11px] font-black hidden xs:inline">اللوجو</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2.5 rounded-xl border border-blue-700/80 bg-[#071d49] hover:bg-[#0c2b6b] text-amber-300 shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              aria-label="بحث في الموقع"
              title="بحث في الموقع"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl border border-blue-700/80 bg-[#071d49] hover:bg-[#0c2b6b] text-white shadow-md flex items-center gap-1.5 font-black text-xs cursor-pointer active:scale-95 transition-all"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'أقسام الموقع'}
              title="أقسام الموقع"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-rose-400 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 text-amber-400 stroke-[2.5]" />
              )}
              <span className="hidden xs:inline sm:inline text-xs font-black text-white">
                {mobileMenuOpen ? 'إغلاق' : 'الأقسام'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu (Drawer) */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-4 pb-8 space-y-4 border-b bg-[#020b18] border-blue-900/80 text-white max-h-[80vh] overflow-y-auto">
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
                  t('السلام عليكم، استفسار عن خدمات نقل وتغليف الأثاث مع رويال موفرز VIP', 'Hello, inquiry about Royal Movers VIP')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-xs"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{t('واتساب مباشر', 'WhatsApp')}</span>
              </a>
            </div>

            {/* Conversions Analytics Card in Mobile Drawer (Owner Only) */}
            {onOpenConversions && isOwner && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConversions();
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#041a22] border border-emerald-400/60 text-emerald-300 font-black text-xs shadow-md transition-all active:scale-95 text-right cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-300">لوحة قياس التحويلات والمكالمات اليومية</div>
                    <div className="text-[10px] text-slate-300 font-medium">متابعة دقيقة لنقرات الاتصال والواتساب مع Google Ads</div>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-lg">فتح</span>
              </button>
            )}

            {/* DEDICATED LUXURY AREAS LIST IN MOBILE (Direct from Khatwa Video) */}
            <div className="space-y-2 p-3 rounded-2xl bg-gradient-to-b from-blue-950/20 to-amber-500/10 border border-amber-400/30">
              <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 px-1">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>أهم المناطق وكمبوندات الفلل (صفحات مخصصة):</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {luxuryAreasList.map((area) => (
                  <button
                    key={area.slug}
                    type="button"
                    onClick={() => handleAreaClick(area.slug)}
                    className="w-full flex items-center justify-between text-right p-2.5 rounded-xl bg-white dark:bg-blue-950/70 border border-slate-200 dark:border-blue-900/60 text-xs font-black text-slate-800 dark:text-slate-100 hover:border-amber-400 cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                      <span>{area.name}</span>
                    </div>
                    <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">
                      عرض التفاصيل 👈
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* General Nav Links */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-400 px-3 py-1">
                أقسام الموقع:
              </div>
              {mobileNavLinks.map((link) => (
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
