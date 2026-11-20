import React from 'react';
import { Phone, MessageCircle, Clock, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, theme } = useApp();

  const seoKeywords = [
    'شركة رويال موفرز لنقل الأثاث VIP',
    'شركة رويال موفرز VIP لنقل الاثاث',
    'شركة رويال موفرز VIP لنقل العفش',
    'شركة رويال موفرز لنقل وتغليف الأثاث VIP',
    'رويال موفرز لنقل الاثاث',
    'رويال موفرز لنقل العفش',
    'شركة رويال موفرز VIP للأثاث',
    'شركة رويال موفرز VIP',
    'رويال موفرز',
    'شركة نقل اثاث رويال موفرز',
    'شركة نقل عفش رويال موفرز',
    'شركة شيلها لنقل الأثاث',
    'شركة شيلها لنقل الاثاث',
    'شركة شيلها لنقل العفش',
    'شيلها لنقل الاثاث',
    'شيلها لنقل العفش',
    'شركة شيلها',
    'شيلها',
    'شركة نقل اثاث شيلها',
    'ونش رويال موفرز',
    'ونش شيلها',
    'ونش رفع اثاث رويال موفرز',
    'ونش رفع عفش رويال موفرز',
    'رقم شركة رويال موفرز VIP',
    'رقم شركة شيلها',
    'ارقام شركة رويال موفرز VIP',
    'تليفون شركة رويال موفرز VIP',
    'اسعار شركة رويال موفرز VIP',
    'عنوان شركة رويال موفرز VIP',
    'موقع شركة رويال موفرز VIP',
    'شركات نقل الاثاث بالقاهرة',
    'شركات نقل العفش بالقاهرة',
    'شركة نقل اثاث بالقاهرة',
    'شركة نقل عفش بالقاهرة',
    'افضل شركة نقل اثاث بالقاهرة',
    'ارخص شركة نقل اثاث بالقاهرة',
    'نقل اثاث التجمع الخامس',
    'نقل عفش التجمع الخامس',
    'نقل اثاث كمبوند ميفيدا',
    'نقل عفش ميفيدا التجمع',
    'نقل اثاث قطامية هايتس',
    'نقل اثاث قطامية ديونز',
    'نقل اثاث سوان ليك التجمع',
    'نقل اثاث ماونتن فيو اي سيتي',
    'نقل عفش هايد بارك التجمع',
    'نقل اثاث بالم هيلز التجمع',
    'نقل اثاث ليك فيو',
    'نقل اثاث فيليت سوديك',
    'نقل اثاث كايرو فيستيفال سيتي',
    'شركات نقل الاثاث بالتجمع الخامس',
    'شركة نقل اثاث القاهرة الجديدة',
    'نقل اثاث الشيخ زايد',
    'نقل عفش الشيخ زايد',
    'نقل اثاث كمبوند اليجريا',
    'نقل عفش اليجريا الشيخ زايد',
    'نقل اثاث بيفرلي هيلز',
    'نقل عفش بيفرلي هيلز زايد',
    'نقل اثاث ابراج زد الشيخ زايد',
    'نقل اثاث ويست تاون زايد',
    'نقل اثاث بالم هيلز زايد',
    'نقل اثاث نيو جيزة',
    'نقل عفش نيو جيزة',
    'نقل اثاث كمبوند ايتابا',
    'نقل اثاث بيل في زايد',
    'نقل اثاث ذا استيتس',
    'شركات نقل الاثاث بالشيخ زايد',
    'ونش رفع اثاث بالشيخ زايد',
    'نقل اثاث فلل مدينتي',
    'نقل عفش مدينتي',
    'نقل اثاث مدينتي بي 1 بي 2',
    'نقل اثاث مدينة الرحاب',
    'نقل عفش الرحاب',
    'نقل اثاث الشروق',
    'نقل اثاث المستقبل سيتي سراي',
    'نقل اثاث العاصمة الادارية المقصد',
    'نقل اثاث كمبوند سيليا العاصمة',
    'نقل اثاث كمبوند البوسكو',
    'نقل اثاث الساحل الشمالي مراسي',
    'نقل عفش مراسي هاسيندا',
    'نقل اثاث هاسيندا باي',
    'نقل اثاث تلال الساحل الشمالي',
    'نقل اثاث سي شيل والماظة باي',
    'نقل اثاث الجونة البحر الاحمر',
    'نقل اثاث الشقق والفلل VIP',
    'شركات نقل اثاث الكمبوندات',
    'ونش رفع اثاث كمبوندات مصر',
    'نقل اثاث 6 اكتوبر',
    'نقل عفش 6 اكتوبر',
    'شركات نقل الاثاث في 6 اكتوبر',
    'ونش رفع اثاث 6 اكتوبر',
    'نقل اثاث حدائق الاهرام',
    'نقل عفش حدائق الاهرام',
    'نقل اثاث حدائق اكتوبر',
    'نقل اثاث المهندسين',
    'نقل عفش المهندسين',
    'نقل اثاث الدقي',
    'نقل عفش الدقي',
    'نقل اثاث العجوزة',
    'نقل اثاث الهرم',
    'نقل عفش فيصل',
    'نقل اثاث الاسكندرية',
    'نقل عفش الاسكندرية',
    'شركات نقل الاثاث بالاسكندرية',
    'ونش رفع اثاث الاسكندرية',
    'نقل اثاث الساحل الشمالي',
    'نقل عفش الساحل الشمالي',
    'نقل اثاث العلمين',
    'نقل اثاث مطروح',
    'نقل اثاث القليوبية',
    'نقل اثاث بنها',
    'نقل اثاث شبرا الخيمة',
    'نقل اثاث الشرقية',
    'نقل اثاث الزقازيق',
    'نقل اثاث العاشر من رمضان',
    'نقل اثاث الغربية',
    'نقل اثاث طنطا',
    'نقل اثاث المحلة الكبرى',
    'نقل اثاث المنوفية',
    'نقل اثاث شبين الكوم',
    'نقل اثاث السادات',
    'نقل اثاث الدقهلية',
    'نقل اثاث المنصورة',
    'نقل اثاث ميت غمر',
    'نقل اثاث دمياط',
    'نقل اثاث كفر الشيخ',
    'نقل اثاث البحيرة',
    'نقل اثاث دمنهور',
    'نقل اثاث بورسعيد',
    'نقل اثاث الاسماعيلية',
    'نقل اثاث السويس',
    'نقل اثاث العين السخنة',
    'نقل اثاث البحر الاحمر',
    'نقل اثاث الغردقة',
    'نقل اثاث الجونة',
    'نقل اثاث شرم الشيخ',
    'نقل اثاث الفيوم',
    'نقل اثاث بني سويف',
    'نقل اثاث المنيا',
    'نقل اثاث اسيوط',
    'نقل اثاث سوهاج',
    'نقل اثاث قنا',
    'نقل اثاث الاقصر',
    'نقل اثاث اسوان',
    'نقل عفش للمحافظات',
    'نقل اثاث بين المحافظات',
    'عربيات نقل عفش للمحافظات',
    'سيارات نقل عفش مغلقة',
    'ونش رفع اثاث',
    'ونش رفع عفش',
    'ونش هيدروليكي',
    'سعر ونش رفع الاثاث',
    'تغليف اثاث وعفش بالبابلز',
    'فك وتركيب تكييفات نقل عفش',
    'نقل اثاث الشقق والفلل',
    'تغليف اثاث VIP بالضمان',
    'دينا نقل عفش',
    'Shelha Egypt',
    'Shelha Movers',
    'Shilha Movers',
    'Shelha Furniture Moving',
    'Cairo Moving Company',
    'Shelhaegypt.com'
  ];

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
            <ul className="space-y-2.5 text-sm sm:text-base font-bold">
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">
                  • {t('نقل عفش الشقق والفلل السكنية', 'Apartments & Villas Moving')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">
                  • {t('نقل مقرات الشركات والمكاتب والعيادات', 'Corporate & Clinic Moving')}
                </a>
              </li>
              <li>
                <a href="#winch-section" className="hover:text-sky-400 transition-colors">
                  • {t('أوناش رفع الأثاث الهيدروليكية (حتى الدور 25)', 'Hydraulic Winches (Up to Floor 25)')}
                </a>
              </li>
              <li>
                <a href="#packing-section" className="hover:text-sky-400 transition-colors">
                  • {t('التغليف الأوروبي فائق الجودة والأمان', 'European Multi-Layer Packing')}
                </a>
              </li>
              <li>
                <a href="#packing-section" className="hover:text-sky-400 transition-colors">
                  • {t('فك وتركيب التكييفات وشحن الفريون', 'AC Dismantling & Freon Servicing')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">
                  • {t('سيارات نقل عفش مغلقة ومبطنة للمحافظات', 'Padded Closed Trucks to All Governorates')}
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
                href={`https://wa.me/${COMPANY_DATA.whatsappInternational}?text=${encodeURIComponent(
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
