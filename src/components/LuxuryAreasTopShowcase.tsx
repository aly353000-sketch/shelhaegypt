import React from 'react';
import { MapPin, ChevronLeft, Sparkles, Building2, ShieldCheck, Compass } from 'lucide-react';
import { LUXURY_AREAS_DATA } from '../data/luxuryAreasData';

interface LuxuryAreasTopShowcaseProps {
  onSelectArea: (slug: string) => void;
}

export const LuxuryAreasTopShowcase: React.FC<LuxuryAreasTopShowcaseProps> = ({ onSelectArea }) => {
  const areas = [
    {
      slug: 'sheikh-zayed',
      name: 'الشيخ زايد',
      badge: 'كمبوندات النخبة 🏰',
      compounds: 'أليجريا، بيفرلي هيلز، أبراج زد، بالم هيلز، نيو جيزة',
      highlight: 'تصاريح جاهزة 100%',
      icon: '🏰',
    },
    {
      slug: 'new-cairo',
      name: 'التجمع الخامس والقاهرة الجديدة',
      badge: 'شقق وفلل VIP 👑',
      compounds: 'ميفيدا، قطامية هايتس، سوان ليك، هايد بارك، بيت الوطن',
      highlight: 'أوناش هيدروليكية',
      icon: '🏙️',
    },
    {
      slug: 'october',
      name: '6 أكتوبر وحدائق أكتوبر',
      badge: 'مجتمعات أكتوبر 🛡️',
      compounds: 'غرب سوميد، بالم هيلز أكتوبر، ماونتن فيو، حي الأشجار',
      highlight: 'سيارات مغلقة ومجهزة',
      icon: '🛡️',
    },
    {
      slug: 'madinaty',
      name: 'مدينتي والرحاب ومستقبل سيتي',
      badge: 'مجتمعات طلعت مصطفى 🌴',
      compounds: 'فلل مدينتي، عمارات B1-B12، الرحاب، بلوم فيلدز',
      highlight: 'تنسيق بوابات وأمن',
      icon: '🌴',
    },
    {
      slug: 'new-capital',
      name: 'العاصمة الإدارية الجديدة',
      badge: 'مقرات وفلل R7 & R8 🏛️',
      compounds: 'سيليا، المقصد، الحي السكني، مقرات البنوك والشركات',
      highlight: 'خدمة فندقية VIP',
      icon: '🏛️',
    },
    {
      slug: 'north-coast',
      name: 'الساحل الشمالي والعلمين والجونة',
      badge: 'منتجعات السواحل 🌊',
      compounds: 'مراسي، هاسيندا باي، أبراج العلمين، منتجع الجونة',
      highlight: 'رحلات شحن سفر مباشر',
      icon: '🌊',
    },
    {
      slug: 'maadi-zamalek',
      name: 'المعادي والزمالك وجاردن سيتي',
      badge: 'أرقى أحياء القاهرة 🏛️',
      compounds: 'المعادي السرايات، دجلة، الزمالك، جاردن سيتي',
      highlight: 'عناية فائقة بالأنتيكات',
      icon: '💎',
    },
  ];

  return (
    <section id="luxury-areas-showcase" className="py-12 bg-gradient-to-b from-[#020b18] via-[#041633] to-[#020b18] text-white border-y border-blue-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full shadow-xs">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>المناطق الراقية والكمبوندات التي نخدمها</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              اختر منطقتك لتصفح خدماتنا ومميزاتنا المخصصة 🏰
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              اضغط على أي منطقة للانتقال فورياً لصفحة التفاصيل، تصاريح البوابات، وأشهر الكمبوندات التي نخدمها.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-950/80 border border-blue-800/80 px-4 py-2 rounded-2xl text-xs text-sky-300 font-black shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>تصاريح دخول جاهزة لجميع الكمبوندات</span>
          </div>
        </div>

        {/* Clean, Fast-Clicking Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {areas.map((area) => (
            <div
              key={area.slug}
              onClick={() => onSelectArea(area.slug)}
              className="bg-[#031126] hover:bg-[#071d49] border-2 border-blue-900/70 hover:border-amber-400 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{area.icon}</span>
                  <span className="text-[11px] font-black text-amber-300 bg-amber-500/15 border border-amber-400/30 px-2.5 py-1 rounded-xl">
                    {area.highlight}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    <span>{area.name}</span>
                  </h3>
                  <span className="text-xs text-sky-300 font-bold block mt-0.5">
                    {area.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
                  {area.compounds}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-amber-400 group-hover:text-white transition-colors">
                <span>تصفح صفحة {area.name} 👈</span>
                <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
