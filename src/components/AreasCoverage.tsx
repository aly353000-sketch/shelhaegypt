import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const AreasCoverage: React.FC = () => {
  const { t, theme } = useApp();
  const [selectedCity, setSelectedCity] = useState<string>('الكل');

  const cities = [
    { key: 'الكل', label: t('الكل', 'All') },
    { key: 'القاهرة', label: t('القاهرة', 'Cairo') },
    { key: 'الجيزة', label: t('الجيزة', 'Giza') },
    { key: 'المحافظات', label: t('المحافظات', 'Governorates') },
  ];

  const filteredDistricts = selectedCity === 'الكل'
    ? COMPANY_DATA.districts
    : COMPANY_DATA.districts.filter(d => d.city === selectedCity);

  return (
    <section id="areas" className={`py-16 lg:py-24 text-right transition-colors duration-300 ${
      theme === 'light' ? 'bg-white' : 'bg-[#030d20]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 border text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full ${
            theme === 'light'
              ? 'bg-blue-100 border-blue-300 text-blue-900'
              : 'bg-blue-500/10 border-blue-500/30 text-sky-300'
          }`}>
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>{t('تغطية جغرافية واسعة وسريعة', 'Fast & Wide Geographic Coverage')}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {t('في أي مكان.. إحنا واقعينك!', 'Anywhere You Are.. Shilha Reaches You!')}
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t(
              'خدمات نقل وتغليف الأثاث مع شلها متوفرة في كافة أحياء القاهرة، القاهرة الجديدة، الجيزة، وجميع محافظات الجمهورية.',
              'Furniture moving & packing available across Cairo, New Cairo, Giza, and all Egypt governorates.'
            )}
          </p>
        </div>

        {/* Poster & Slogan Banner in Royal Blue & White Gradient */}
        <div className={`relative rounded-3xl overflow-hidden border p-6 sm:p-10 shadow-2xl transition-colors ${
          theme === 'light'
            ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white border-blue-400'
            : 'bg-gradient-to-r from-[#031126] via-[#042456] to-[#031126] text-white border-blue-800/80'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="text-sky-200 font-extrabold text-lg sm:text-2xl">
                {t(
                  'بنخدمك في مدينة نصر، التجمع الخامس، زايد، وكل مصر!',
                  'Serving Nasr City, New Cairo, Zayed, and all of Egypt!'
                )}
              </div>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                {t(
                  'أسطول سيارات شلها وأوناشنا الهيدروليكية متمركزة في نقاط حيوية في القاهرة والجيزة (التجمع، مدينة نصر، أكتوبر، المعادي) لسرعة الوصول لموقعك في أقل من 45 دقيقة من تأكيد الحجز، مع جداول منتظمة لنقل العفش إلى الإسكندرية والساحل الشمالي ومحافظات الدلتا والصعيد.',
                  'Shilha fleet and winches are stationed at key points in Cairo & Giza to ensure arrival under 45 minutes, with regular trips to Alexandria, North Coast, Delta, and Upper Egypt.'
                )}
              </p>

              {/* District filters */}
              <div className="flex flex-wrap gap-2 pt-2">
                {cities.map((city) => (
                  <button
                    type="button"
                    key={city.key}
                    onClick={() => setSelectedCity(city.key)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCity === city.key
                        ? 'bg-white text-blue-900 font-black shadow-lg scale-105'
                        : 'bg-blue-900/60 text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick ETA Card */}
            <div className="lg:col-span-5 bg-slate-950/60 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>{t('متوسط زمن الوصول للتحميل:', 'Average Arrival Time for Loading:')}</span>
              </div>
              
              <div className="text-3xl font-black text-white font-mono">
                30 - 45 {t('دقيقة', 'Minutes')}
              </div>

              <div className="space-y-2 text-xs text-sky-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>{t('سيارات مغلقة مبطنة تناسب جميع الأجواء والأمطار', 'Padded covered trucks suited for all weather')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                  <span>{t('تصاريح سير رسمية داخل الكمبوندات والمناطق الحيوية', 'Official transit permits inside gated compounds')}</span>
                </div>
              </div>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-400 hover:to-sky-300 text-white font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t('تأكيد أقرب سيارة لموقعك', 'Confirm Nearest Truck to You')}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredDistricts.map((district, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all text-center group cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                  : 'bg-[#031126] border-blue-900/60 hover:border-sky-400/60 hover:bg-[#051a3d]'
              }`}
            >
              <div className="text-sky-400 flex justify-center mb-1 group-hover:scale-110 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <div className={`text-xs sm:text-sm font-bold transition-colors ${
                theme === 'light' ? 'text-slate-800 group-hover:text-blue-600' : 'text-slate-200 group-hover:text-white'
              }`}>
                {district.name}
              </div>
              <div className={`text-[10px] mt-1 ${
                theme === 'light' ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {t('وصول خلال', 'ETA:')} {district.eta}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
