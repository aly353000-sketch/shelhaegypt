import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Heart, Globe, Copy, Check } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
export const Footer: React.FC = () => {
  const { t, theme } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyWebsiteLink = () => {
    const url = 'https://shelhaegypt.com';
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const seoKeywords = [
    'شركة شلها لنقل الأثاث',
    'شركة شلها لنقل الاثاث',
    'شركة شلها لنقل العفش',
    'شركة شلها لنقل وتغليف الأثاث',
    'شلها لنقل الاثاث',
    'شلها لنقل العفش',
    'شركة شلها للأثاث',
    'شركة شلها',
    'شلها',
    'شركة نقل اثاث شلها',
    'شركة نقل عفش شلها',
    'شركة شيلها لنقل الأثاث',
    'شركة شيلها لنقل الاثاث',
    'شركة شيلها لنقل العفش',
    'شيلها لنقل الاثاث',
    'شيلها لنقل العفش',
    'شركة شيلها',
    'شيلها',
    'شركة نقل اثاث شيلها',
    'ونش شلها',
    'ونش شيلها',
    'ونش رفع اثاث شلها',
    'ونش رفع عفش شلها',
    'رقم شركة شلها',
    'رقم شركة شيلها',
    'ارقام شركة شلها',
    'تليفون شركة شلها',
    'اسعار شركة شلها',
    'عنوان شركة شلها',
    'موقع شركة شلها',
    'شركات نقل الاثاث بالقاهرة',
    'شركات نقل العفش بالقاهرة',
    'شركة نقل اثاث بالقاهرة',
    'شركة نقل عفش بالقاهرة',
    'افضل شركة نقل اثاث بالقاهرة',
    'ارخص شركة نقل اثاث بالقاهرة',
    'نقل اثاث التجمع الخامس',
    'نقل عفش التجمع الخامس',
    'شركات نقل الاثاث بالتجمع الخامس',
    'شركة نقل اثاث القاهرة الجديدة',
    'نقل اثاث مدينة نصر',
    'نقل عفش مدينة نصر',
    'شركات نقل الاثاث بمدينة نصر',
    'نقل اثاث مصر الجديدة',
    'نقل عفش مصر الجديدة',
    'شركات نقل الاثاث بمصر الجديدة',
    'نقل اثاث المعادي',
    'نقل عفش المعادي',
    'نقل اثاث المقطم',
    'نقل عفش المقطم',
    'نقل اثاث الشروق',
    'نقل عفش مدينتي',
    'نقل اثاث الرحاب',
    'نقل اثاث العاصمة الادارية',
    'نقل اثاث المستقبل سيتي',
    'نقل اثاث بدر',
    'نقل اثاث العبور',
    'نقل اثاث شبرا',
    'نقل اثاث حلوان',
    'نقل اثاث وسط البلد',
    'نقل اثاث الزمالك',
    'نقل اثاث بالجيزة',
    'نقل عفش بالجيزة',
    'شركات نقل الاثاث بالجيزة',
    'نقل اثاث الشيخ زايد',
    'نقل عفش الشيخ زايد',
    'شركات نقل الاثاث بالشيخ زايد',
    'ونش رفع اثاث بالشيخ زايد',
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
    'نجار فك وتركيب غرف نوم',
    'كراتين نقل عفش',
    'اماكن بيع كراتين نقل العفش',
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
        ? 'bg-white border-slate-200 text-slate-600'
        : 'bg-[#010714] border-blue-900/40 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white font-black text-2xl shadow-md">
                ش
              </div>
              <div>
                <span className="text-3xl font-black text-blue-950">
                  شلـهـا
                </span>
                <span className="block text-sm text-blue-700 font-bold">
                  شركة شلها لنقل وتغليف الأثاث في مصر
                </span>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {t(
                'مش أي حد يشيل عفشك.. يستاهل ثقتك! إحنا مش بننقل عفش وبس، إحنا بننقل بيتك بكل اللي فيه من ذكريات وتعب سنين. سيبها على شلها وإنت مرتاح.',
                'We carry your home and precious memories with the utmost professional care and dedication. Relax and leave it to Shilha.'
              )}
            </p>

            <div className="flex items-center gap-2 text-xs text-sky-600 font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>{t('عناية فائقة وتغليف أوروبي لحماية المنقولات', 'Premium European Packing for Furniture Protection')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className={`font-black text-base border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('خدماتنا الرئيسية', 'Our Key Services')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
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
            <h4 className={`font-black text-base border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('مناطق نصل إليها سريعاً', 'Rapid ETA Areas')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
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
            <h4 className={`font-black text-base border-b pb-2 ${
              theme === 'light' ? 'text-slate-900 border-slate-200' : 'text-white border-blue-900/60'
            }`}>
              {t('تواصل معنا على مدار الساعة', 'Contact 24/7')}
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                    : 'bg-[#031126] hover:bg-blue-950 border-blue-900/60 text-white'
                }`}
              >
                <span>{t('الخط الساخن:', 'Hotline:')}</span>
                <span className="font-bold text-sky-400 font-mono" dir="ltr">{COMPANY_DATA.phones[0].number}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[1].number}`}
                className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                    : 'bg-[#031126] hover:bg-blue-950 border-blue-900/60 text-white'
                }`}
              >
                <span>{t('خدمة العملاء:', 'Customer Care:')}</span>
                <span className="font-bold text-sky-400 font-mono" dir="ltr">{COMPANY_DATA.phones[1].number}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[2].number}`}
                className={`flex items-center justify-between p-2 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-slate-50 hover:bg-blue-50 border-slate-200 text-slate-800'
                    : 'bg-[#031126] hover:bg-blue-950 border-blue-900/60 text-white'
                }`}
              >
                <span>{t('إدارة العمليات:', 'Operations:')}</span>
                <span className="font-bold text-sky-400 font-mono" dir="ltr">{COMPANY_DATA.phones[2].number}</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('مواعيد العمل: 24 ساعة طوال أيام الأسبوع', 'Working Hours: 24/7 All Week')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Google & Digital Ad Campaigns Readiness Card */}
        <div className="p-5 rounded-3xl border bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/80 border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm text-right">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-blue-950 flex flex-wrap items-center gap-2">
                <span>رابط الموقع الرسمي للإعلانات ومحركات البحث Google</span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs">
                  جاهز 100% للأرشفة والإعلانات
                </span>
              </div>
              <div className="text-xs text-blue-800 font-mono mt-1 dir-ltr select-all break-all">
                https://shelhaegypt.com
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyWebsiteLink}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer whitespace-nowrap ${
              copiedLink
                ? 'bg-emerald-600 text-white scale-105'
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 active:scale-95'
            }`}
          >
            {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span>{copiedLink ? 'تم نسخ الرابط بنجاح ✓' : 'نسخ رابط الموقع للحملات الإعلانية 📋'}</span>
          </button>
        </div>

        {/* SEO Keywords Cloud */}
        <div className={`pt-8 border-t space-y-3 ${
          theme === 'light' ? 'border-slate-200' : 'border-blue-900/40'
        }`}>
          <div className="text-xs font-bold text-sky-400">
            {t('كلمات البحث الدلالية ومحركات البحث (Google Ads & SEO):', 'Search Engine Keywords (Google Ads & SEO):')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw, idx) => (
              <span
                key={idx}
                className={`text-[11px] px-2 py-1 rounded border transition-colors ${
                  theme === 'light'
                    ? 'bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border-slate-200'
                    : 'bg-[#031126] hover:bg-blue-950 text-slate-400 hover:text-sky-300 border-blue-900/60'
                }`}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-6 border-t text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${
          theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-blue-900/40 text-slate-500'
        }`}>
          <div>
            © {new Date().getFullYear()} {t('شركة شلها لنقل وتغليف الأثاث - جميع الحقوق محفوظة.', 'Shilha Moving & Packing Company - All Rights Reserved.')}
          </div>
          <div className="flex items-center gap-1 text-sky-600">
            <span>{t('صُنع باحترافية لخدمتكم بأعلى معايير الأمان والراحة', 'Crafted with premium safety & comfort standards')}</span>
            <Heart className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
          </div>
        </div>

      </div>
    </footer>
  );
};
