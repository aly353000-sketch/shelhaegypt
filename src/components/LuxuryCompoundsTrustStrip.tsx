import React from 'react';
import { ShieldCheck, Award, Building2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface DeveloperBadge {
  nameAr: string;
  nameEn: string;
  project: string;
  iconText: string;
  areaSlug?: string;
}

interface LuxuryCompoundsTrustStripProps {
  onSelectArea?: (slug: string) => void;
}

export const LuxuryCompoundsTrustStrip: React.FC<LuxuryCompoundsTrustStripProps> = ({ onSelectArea }) => {
  const { t } = useApp();

  const developers: DeveloperBadge[] = [
    {
      nameAr: 'بالم هيلز',
      nameEn: 'PALM HILLS',
      project: 'بالم هيلز زايد · بالم باركس · بادية',
      iconText: 'PH',
      areaSlug: 'sheikh-zayed',
    },
    {
      nameAr: 'هايد بارك',
      nameEn: 'HYDE PARK',
      project: 'هايد بارك التجمع · جولدن إيدج',
      iconText: 'HP',
      areaSlug: 'new-cairo',
    },
    {
      nameAr: 'مدينتي',
      nameEn: 'MADINATY',
      project: 'فلل مدينتي · الرحاب · طلعت مصطفى',
      iconText: 'TMG',
      areaSlug: 'madinaty',
    },
    {
      nameAr: 'ميفيدا إعمار',
      nameEn: 'MIVIDA EMAAR',
      project: 'ميفيدا التجمع الخامس · كايرو جيت',
      iconText: 'EMAAR',
      areaSlug: 'new-cairo',
    },
    {
      nameAr: 'تاج سيتي',
      nameEn: 'TAJ CITY',
      project: 'تاج سلطان · تاج فيلاس · مدينة مصر',
      iconText: 'TAJ',
      areaSlug: 'new-cairo',
    },
    {
      nameAr: 'سوديك',
      nameEn: 'SODIC',
      project: 'بيفرلي هيلز · فيليت · كرميل زايد',
      iconText: 'SODIC',
      areaSlug: 'sheikh-zayed',
    },
    {
      nameAr: 'ماونتن فيو',
      nameEn: 'MOUNTAIN VIEW',
      project: 'أي سيتي التجمع · تشيل أوت بارك',
      iconText: 'MV',
      areaSlug: 'october',
    },
    {
      nameAr: 'سوان ليك',
      nameEn: 'SWAN LAKE',
      project: 'حسن علام ريزيدنس · سوان ليك التجمع',
      iconText: 'HA',
      areaSlug: 'new-cairo',
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-r from-[#020b18] via-[#041635] to-[#020b18] border-y border-blue-900/40 relative overflow-hidden text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-900/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-black">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{t('تثق بنا نخبة عائلات أرقى كمبوندات مصر 👑', 'Trusted by elite families across Egypt premier compounds')}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white">
              {t('تصاريح دخول رسمية معتمدة لأكثر من 120 كمبوند سكني وفندقي', 'Official access permits for 120+ gated luxury compounds')}
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-sky-300 text-xs font-bold shrink-0 self-start md:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('طواقم مسجلة ومفحوصة أمنياً بنسبة 100%', '100% Security-cleared crew & trucks')}</span>
          </div>
        </div>

        {/* Developers Badges Grid (Matching Reference Screenshot 7) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 pt-6">
          {developers.map((dev, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => dev.areaSlug && onSelectArea && onSelectArea(dev.areaSlug)}
              className="group p-3.5 rounded-2xl bg-[#020d20]/80 hover:bg-[#071d49] border border-blue-900/60 hover:border-amber-400/70 transition-all duration-300 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              title={`استعراض خدمات رويال موفرز في كمبوندات ${dev.nameAr}`}
            >
              {/* Minimalist Monogram / Logo Mark */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900/60 to-slate-900 border border-blue-700/50 group-hover:border-amber-400/80 text-amber-300 flex items-center justify-center font-black text-xs sm:text-sm tracking-wider shadow-inner transition-colors">
                {dev.iconText}
              </div>

              <div>
                <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors block">
                  {dev.nameAr}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tighter block uppercase">
                  {dev.nameEn}
                </span>
              </div>

              <span className="text-[10px] text-sky-300/80 font-medium line-clamp-1">
                {dev.project.split('·')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Micro note */}
        <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {t(
              'تنسيق مسبق لحجز مكان سيارة النقل والونش مع جهاز وإدارة أمن كل كمبوند دون أي عناء على العميل.',
              'Prior coordination with security & compound administration for winch & truck parking spaces.'
            )}
          </span>
        </div>

      </div>
    </section>
  );
};
