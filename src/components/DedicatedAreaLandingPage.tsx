import React from 'react';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Star, 
  Layers, 
  Truck, 
  Wrench, 
  Wind, 
  Boxes, 
  Gem, 
  CheckCircle2, 
  ChevronLeft,
  Sparkles,
  Building2,
  Calendar,
  Compass
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { LUXURY_AREAS_DATA, LuxuryAreaDetail } from '../data/luxuryAreasData';
import { useApp } from '../context/AppContext';

interface DedicatedAreaLandingPageProps {
  areaSlug: string;
  onBackToHome: () => void;
  onSelectArea: (slug: string) => void;
}

export const DedicatedAreaLandingPage: React.FC<DedicatedAreaLandingPageProps> = ({
  areaSlug,
  onBackToHome,
  onSelectArea,
}) => {
  const { theme, t } = useApp();

  // Fallback to sheikh-zayed if slug not found
  const area: LuxuryAreaDetail = LUXURY_AREAS_DATA[areaSlug] || LUXURY_AREAS_DATA['sheikh-zayed'];

  const allAreaKeys = Object.keys(LUXURY_AREAS_DATA);

  const servicesList = [
    {
      title: 'نقل الأثاث والعفش',
      desc: 'بسيارات مغلقة ومبطنة خصيصاً للشوارع والكمبوندات.',
      icon: Truck,
      badge: 'سيارات مغلقة',
    },
    {
      title: 'فك وتركيب الأثاث',
      desc: 'فنيون ونجارون متخصصون في غرف النوم الإيطالية والمطابخ.',
      icon: Wrench,
      badge: 'نجارون محترفون',
    },
    {
      title: 'فك وتركيب التكييفات',
      desc: 'فنيو تكييف معتمدون مع حفظ شحنة الفريون بـ 800 ج للوحدة.',
      icon: Wind,
      badge: '800 ج.م للوحدة ❄️',
    },
    {
      title: 'تغليف الأثاث الشامل',
      desc: 'بابلز 3 طبقات، فوم عازل، واسترتش لمنع أي خدوش.',
      icon: Boxes,
      badge: 'تغليف ألماني VIP',
    },
    {
      title: 'ونش رفع الأثاث الهيدروليكي',
      desc: 'رفع وتنزيل حتى الدور 25 دون لمس السلالم بـ 2500 ج.',
      icon: Layers,
      badge: 'يبدأ من 2500 ج 🏗️',
    },
    {
      title: 'نقل المقتنيات الحساسة',
      desc: 'حماية فائقة للأنتيكات، النجف الكريستال، والأطقم الصيني.',
      icon: Gem,
      badge: 'عناية فائقة 💎',
    },
  ];

  const handleWhatsAppBooking = (extraContext?: string) => {
    const text = extraContext 
      ? `السلام عليكم، أرغب في حجز نقل أثاث لـ (${extraContext}) في منطقة (${area.name}) مع رويال موفرز VIP`
      : `السلام عليكم، أود حجز موعد لنقل أثاث في منطقة (${area.name}) مع شركة رويال موفرز VIP والاستفادة من المعاينة المجانية`;
    
    window.open(`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`min-h-screen text-right font-sans transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#020b18] text-slate-100'
    }`}>
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        theme === 'light' ? 'bg-white/95 border-slate-200 shadow-xs' : 'bg-[#031126]/95 border-blue-900/60 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back Button */}
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900 text-blue-900 dark:text-sky-300 font-black px-4 py-2 rounded-xl text-xs sm:text-sm border border-blue-200 dark:border-blue-800 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-sky-400" />
            <span>العودة للرئيسية</span>
          </button>

          {/* Breadcrumb (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span 
              onClick={onBackToHome} 
              className="hover:text-blue-600 dark:hover:text-sky-400 cursor-pointer"
            >
              الرئيسية
            </span>
            <span>/</span>
            <span>مناطق الخدمة</span>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 font-black">
              {area.name}
            </span>
          </div>

          {/* Direct Hotline Badge */}
          <a
            href={`tel:${COMPANY_DATA.phones[0].number}`}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-sm hover:scale-105 transition-transform"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>01233391255</span>
          </a>
        </div>
      </div>

      {/* Quick Area Switcher Tabs */}
      <div className={`py-3 border-b overflow-x-auto ${
        theme === 'light' ? 'bg-slate-100/90 border-slate-200' : 'bg-[#041633]/90 border-blue-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 min-w-max">
          <span className="text-xs font-black text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0 ml-1">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>اختر منطقة فاخرة:</span>
          </span>
          {allAreaKeys.map((key) => {
            const a = LUXURY_AREAS_DATA[key];
            const isCurrent = a.slug === area.slug;
            return (
              <button
                type="button"
                key={a.slug}
                onClick={() => onSelectArea(a.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/30 scale-105 border border-sky-400'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Area Hero Banner */}
      <section className="relative py-14 lg:py-20 overflow-hidden bg-gradient-to-b from-blue-950 via-[#071739] to-[#020b18] text-white border-b border-blue-900/60">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* VIP Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-amber-500/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-black px-5 py-2 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{area.badge}</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
              {area.fullName}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl text-slate-200 max-w-3xl mx-auto font-medium leading-relaxed">
              {area.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Phone className="w-5 h-5 text-slate-950" />
                <span>احجز موعدك الآن (اتصال مباشر)</span>
              </a>

              <button
                type="button"
                onClick={() => handleWhatsAppBooking()}
                className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>واتساب مباشر للمعاينة</span>
              </button>
            </div>
          </div>

          {/* Area Metrics Counter Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
            <div className="bg-white/10 dark:bg-blue-950/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">{area.stats.years}</span>
              <span className="text-xs sm:text-sm text-slate-200 font-bold">سنوات خبرة بالمنطقة</span>
            </div>
            <div className="bg-white/10 dark:bg-blue-950/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">{area.stats.moves}</span>
              <span className="text-xs sm:text-sm text-slate-200 font-bold">عمليات نقل منجزة</span>
            </div>
            <div className="bg-white/10 dark:bg-blue-950/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 block">{area.stats.rating}</span>
              <span className="text-xs sm:text-sm text-slate-200 font-bold">تقييم العملاء الفعلي</span>
            </div>
            <div className="bg-white/10 dark:bg-blue-950/50 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">{area.stats.service}</span>
              <span className="text-xs sm:text-sm text-slate-200 font-bold">جاهزية مستمرة</span>
            </div>
          </div>

        </div>
      </section>

      {/* Deep Experience Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`rounded-3xl p-6 sm:p-10 border shadow-lg ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#031126] border-blue-900/60'
        }`}>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-sky-300 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-700">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                <span>خدمتنا في {area.name}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-snug">
                خبرتنا العميقة في {area.name}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {area.experienceText}
              </p>
            </div>

            {/* Quick Free Quote Card (Inspired by Khatwa Video) */}
            <div className="w-full lg:w-96 shrink-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4 border border-emerald-400/30">
              <div className="flex items-center justify-between">
                <span className="bg-white/20 text-white font-black text-xs px-3 py-1 rounded-xl">
                  عرض خاص لـ {area.name}
                </span>
                <span className="text-amber-300 text-xs font-black flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  4.9/5 (عملاء موثقون)
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  معاينة فنية مجانية في {area.name}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed mt-1">
                  فريقنا يزور موقعك لتحديد حجم الأثاث واختيار أفضل زاوية للونش وتقديم عرض سعر دقيق وثابت دون أي التزام.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${COMPANY_DATA.phones[0].number}`}
                  className="w-full flex items-center justify-center gap-2 bg-white text-emerald-950 hover:bg-slate-100 font-black py-3 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>اتصل الآن: 01233391255</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleWhatsAppBooking('معاينة مجانية')}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-950 text-white font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm border border-emerald-400/40 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>احجز المعاينة عبر واتساب</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services in this Area Grid */}
      <section className={`py-14 border-t ${
        theme === 'light' ? 'bg-slate-100/70 border-slate-200' : 'bg-[#020b18] border-blue-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs sm:text-sm font-black text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-4 py-1.5 rounded-full inline-block">
              باقة متكاملة
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
              خدماتنا المصممة لسكان {area.name}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
              كل خدمة يتم تنفيذها بطاقم متمرس وأدوات مخصصة لتلبية أعلى معايير الأمان والفخامة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {servicesList.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl p-6 border-2 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 hover:border-blue-500'
                      : 'bg-[#031126] border-blue-900/70 hover:border-amber-400'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-700 to-sky-600 text-white shadow-md">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-400/30 px-3 py-1 rounded-xl">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {srv.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-200 dark:border-blue-900/60">
                    <button
                      type="button"
                      onClick={() => handleWhatsAppBooking(srv.title)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 dark:bg-blue-950/80 dark:hover:bg-blue-900 dark:text-sky-300 dark:hover:text-white font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-blue-800 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                      <span>اطلب الخدمة في {area.name}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Famous Compounds in Area Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>ننسق مع إدارات الأمن لتسهيل جميع الإجراءات</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            نخدم أشهر كمبوندات {area.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
            اضغط على اسم أي كمبوند للحجز المباشر مع استخراج تصاريح الدخول للبوابات فورياً.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {area.compounds.map((comp, idx) => (
            <div
              key={idx}
              onClick={() => handleWhatsAppBooking(`كمبوند ${comp.nameAr} - ${comp.name}`)}
              className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-sm group ${
                theme === 'light'
                  ? 'bg-white border-slate-200 hover:border-blue-500 hover:shadow-md'
                  : 'bg-[#031126] border-blue-900/60 hover:border-amber-400 hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-blue-900/50">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                  {comp.badge}
                </span>
                <Building2 className="w-5 h-5 text-blue-600 dark:text-sky-400 group-hover:text-amber-400 transition-colors" />
              </div>

              <div className="pt-3 space-y-1">
                <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors">
                  {comp.nameAr}
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block" dir="ltr">
                  {comp.name}
                </span>
                <span className="text-xs text-blue-700 dark:text-sky-300 font-medium block pt-1">
                  {comp.type}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-blue-900/40 flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>حجز فوري للكمبوند</span>
                <ChevronLeft className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sub-Districts and Streets Section */}
      <section className={`py-12 border-t ${
        theme === 'light' ? 'bg-slate-100/60 border-slate-200' : 'bg-[#041633]/60 border-blue-900/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400">
              الأحياء والمناطق الفرعية
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              نغطي جميع أحياء ومربعات {area.name} دون استثناء
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto">
            {area.subDistricts.map((dist, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                <span>{dist.name}</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md font-black">
                  {dist.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence in Area */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-400/30 px-4 py-1.5 rounded-full inline-block">
            معايير الفخامة والخصوصية
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            خبرة تصنع الفارق في {area.name}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
            معرفة محلية عميقة تجعلنا الخيار الأول لسكان الفلل والقصور والكمبوندات.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {area.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 border flex items-start gap-4 shadow-sm ${
                theme === 'light'
                  ? 'bg-white border-slate-200'
                  : 'bg-[#031126] border-blue-900/60'
              }`}
            >
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 font-black shrink-0 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {pillar.title}
                </h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Area Custom FAQs */}
      {area.customFaqs.length > 0 && (
        <section className={`py-14 border-t ${
          theme === 'light' ? 'bg-slate-100/70 border-slate-200' : 'bg-[#020b18] border-blue-900/50'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white text-center">
              أسئلة شائعة حول نقل الأثاث في {area.name}
            </h3>

            <div className="space-y-4">
              {area.customFaqs.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-5 border ${
                    theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#031126] border-blue-900/60'
                  }`}
                >
                  <h4 className="text-lg font-black text-blue-950 dark:text-amber-400 mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Sticky-like Booking Bar */}
      <section className="py-12 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white text-center border-t border-blue-900/80">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h3 className="text-2xl sm:text-4xl font-black text-white">
            جاهزون لنقل أثاثك في {area.name} بأمان تام 👑
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium">
            تواصل معنا الآن للحصول على معاينة فنية مجانية، تحديد موعد الونش والسيارات، واستخراج تصاريح البوابات الرسمية فورياً.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${COMPANY_DATA.phones[0].number}`}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-lg transition-transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              <span>اتصال هاتفي مباشر: 01233391255</span>
            </a>

            <button
              type="button"
              onClick={() => handleWhatsAppBooking()}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>احجز عبر واتساب: 01233391255</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl text-sm transition-all cursor-pointer border border-white/20"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للرئيسية</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
