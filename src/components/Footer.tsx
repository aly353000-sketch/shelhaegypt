import React from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { useApp } from '../context/AppContext';
import { handlePhoneCallClick } from '../utils/analytics';

export const Footer: React.FC = () => {
  const { t, theme } = useApp();

  return (
    <footer className={`border-t text-right transition-colors duration-300 ${
      theme === 'light'
        ? 'bg-white border-slate-200 text-slate-700'
        : 'bg-[#010714] border-blue-900/40 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pb-24 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/logos/royal_movers_logo_sm.webp" 
                alt="ROYAL MOVERS VIP Logo" 
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="w-14 h-14 rounded-2xl bg-white p-1 border border-amber-400/40 shadow-lg object-contain" 
              />
              <div>
                <span className="text-2xl font-black text-amber-500 flex items-center gap-1.5">
                  <span>👑</span>
                  <span>رويال موفرز</span>
                </span>
                <span className="block text-xs text-amber-300 font-bold font-mono tracking-wider">
                  ROYAL MOVERS VIP
                </span>
              </div>
            </div>

            <p className={`text-sm sm:text-base lg:text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>
              {t(
                'رويال موفرز VIP لنقل وتغليف أثاث الشقق والفلل والشركات بمصر. نجمع بين الفخامة والجودة الفندقية والأسعار العادلة المناسبة لميزانيتك، بأحدث الأوناش الهيدروليكية والسيارات المغلقة.',
                'Royal Movers VIP Egypt: Quality moving & packing for apartments, villas, and offices at fair, transparent prices.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>{t('عناية فائقة وتغليف ألماني لحماية التحف والمقتنيات', 'German-Grade Protective Packing for Fine Antiques')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h2 className={`font-black text-lg sm:text-xl border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('خدماتنا الرئيسية', 'Our Key Services')}
            </h2>
            <ul className="space-y-0.5 text-sm sm:text-base font-bold">
              <li>
                <a href="#services" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('نقل عفش الشقق والفلل السكنية', 'Apartments & Villas Moving')}
                </a>
              </li>
              <li>
                <a href="#services" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('نقل مقرات الشركات والمكاتب والعيادات', 'Corporate & Clinic Moving')}
                </a>
              </li>
              <li>
                <a href="#winch-section" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('أوناش رفع الأثاث الهيدروليكية (حتى الدور 25)', 'Hydraulic Winches (Up to Floor 25)')}
                </a>
              </li>
              <li>
                <a href="#packing-section" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('التغليف الأوروبي فائق الجودة والأمان', 'European Multi-Layer Packing')}
                </a>
              </li>
              <li>
                <a href="#packing-section" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('فك وتركيب التكييفات وشحن الفريون', 'AC Dismantling & Freon Servicing')}
                </a>
              </li>
              <li>
                <a href="#services" className="inline-block py-1.5 hover:text-sky-400 transition-colors">
                  • {t('سيارات نقل عفش مغلقة ومبطنة للمحافظات', 'Padded Closed Trucks to All Governorates')}
                </a>
              </li>
              <li>
                <a href="/articles/" className="inline-block py-1.5 text-amber-300 hover:text-amber-200 transition-colors">
                  • {t('مقالات وأدلة نقل وتغليف الأثاث (موسوعة شاملة)', 'Moving & Packing SEO Guides Hub')}
                </a>
              </li>
            </ul>
          </div>

          {/* Areas Coverage */}
          <div className="space-y-3">
            <h2 className={`font-black text-lg sm:text-xl border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('مناطق نصل إليها سريعاً', 'Rapid ETA Areas')}
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base font-bold">
              <li>• {t('التجمع الخامس والقاهرة الجديدة', 'New Cairo & 5th Settlement')}</li>
              <li>• {t('مدينة نصر ومصر الجديدة والنزهة', 'Nasr City & Heliopolis')}</li>
              <li>• {t('الشيخ زايد و6 أكتوبر وحدائق الأهرام', 'Sheikh Zayed & 6th of October')}</li>
              <li>• {t('المعادي والمقطم وزهراء المعادي', 'Maadi & Mokattam')}</li>
              <li>• {t('الشروق ومدينتي والرحاب والمستقبل', 'Madinaty, Rehab & El Shorouk')}</li>
              <li>• {t('الإسكندرية والساحل الشمالي وجميع المحافظات', 'Alexandria & North Coast')}</li>
            </ul>
          </div>

          {/* Hotlines & Contact */}
          <div className="space-y-3">
            <h2 className={`font-black text-lg sm:text-xl border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('تواصل معنا على مدار الساعة', 'Contact 24/7')}
            </h2>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href="tel:01233391255"
                onClick={(e) => handlePhoneCallClick(e, 'tel:01233391255', 'أسفل الموقع (اتصال)')}
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors shadow-sm ${
                  theme === 'light'
                    ? 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-300 text-slate-800'
                    : 'bg-[#031126] hover:bg-blue-950 border-amber-500/40 text-white'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('الخط الساخن الموحد (24 ساعة):', 'Unified 24/7 Hotline:')}</span>
                </div>
                <span className="font-black text-amber-500 font-mono text-base tracking-wider" dir="ltr">01233391255</span>
              </a>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappInternational}?text=${encodeURIComponent(
                  t('السلام عليكم، أرغب في معرفة أسعار وباقات نقل العفش المناسبة مع رويال موفرز VIP', 'Hello, inquiry about moving packages & pricing.')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3 rounded-xl border transition-colors shadow-sm ${
                  theme === 'light'
                    ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-300 text-slate-800'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/40 text-white'
                }`}
              >
                <div className={`flex items-center gap-1.5 font-bold ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'}`}>
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t('واتساب الحجوزات السريعة:', 'WhatsApp Bookings:')}</span>
                </div>
                <span className={`font-black font-mono text-base tracking-wider ${theme === 'light' ? 'text-emerald-700' : 'text-emerald-300'}`} dir="ltr">01233391255</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('مواعيد العمل: 24 ساعة طوال أيام الأسبوع', 'Working Hours: 24/7 All Week')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 border-t text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'light' ? 'border-slate-200 text-slate-600' : 'border-blue-900/40 text-slate-300'
        }`}>
          <div>
            © {new Date().getFullYear()} {t('شركة رويال موفرز لنقل وتغليف الأثاث VIP - جميع الحقوق محفوظة.', 'Shilha Moving & Packing Company - All Rights Reserved.')}
          </div>
          <div className={`flex items-center gap-1 ${theme === 'light' ? 'text-sky-700' : 'text-sky-300'}`}>
            <span>{t('صُنع باحترافية لخدمتكم بأعلى معايير الأمان والراحة', 'Crafted with premium safety & comfort standards')}</span>
            <Heart className="w-3.5 h-3.5 text-sky-400 fill-sky-400" />
          </div>
        </div>

      </div>
    </footer>
  );
};
