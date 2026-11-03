import React from 'react';
import { ShieldCheck, Users, Clock, Award, CheckCircle, HeartHandshake, AlertTriangle, Smile } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const WhyChooseUs: React.FC = () => {
  const { t, theme } = useApp();

  return (
    <section id="why-choose-us" className={`py-16 lg:py-24 text-right transition-colors duration-300 ${
      theme === 'light' ? 'bg-blue-50/50' : 'bg-[#020b18]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 border text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full ${
            theme === 'light'
              ? 'bg-blue-100 border-blue-300 text-blue-900'
              : 'bg-blue-500/10 border-blue-500/30 text-sky-300'
          }`}>
            <Award className="w-4 h-4 text-sky-400" />
            <span>{t('معايير الأمان والاحترافية', 'Safety & Professional Standards')}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {t('ليه تختار شركة شلها؟', 'Why Choose Shilha Moving Company?')}
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t(
              'لأننا عارفين إن عفشك مش مجرد حاجات.. دي ذكريات وتعب سنين!',
              'Because we know your furniture is not just objects.. It is memories and years of care!'
            )}
          </p>
        </div>

        {/* 6 Core Reasons Grid (Matches the user flyer) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANY_DATA.advantages.map((adv, idx) => (
            <div
              key={idx}
              className={`border rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between ${
                theme === 'light'
                  ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl shadow-sm'
                  : 'bg-[#031126] border-blue-900/60 hover:border-sky-400/60 hover:shadow-xl hover:shadow-sky-500/5'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform ${
                    theme === 'light'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-blue-950 text-sky-300 border border-blue-800'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    theme === 'light'
                      ? 'text-blue-700 bg-blue-50 border-blue-200'
                      : 'text-sky-300 bg-blue-950/80 border-blue-800'
                  }`}>
                    {adv.badge}
                  </span>
                </div>

                <h3 className={`text-lg sm:text-xl font-black transition-colors ${
                  theme === 'light'
                    ? 'text-slate-900 group-hover:text-blue-600'
                    : 'text-white group-hover:text-sky-300'
                }`}>
                  {adv.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  {adv.desc}
                </p>
              </div>

              <div className={`pt-4 mt-4 border-t flex items-center gap-2 text-xs font-bold ${
                theme === 'light'
                  ? 'border-slate-100 text-blue-700'
                  : 'border-blue-900/60 text-sky-400'
              }`}>
                <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>{t('مطبق في كل عملية نقل مع شلها', 'Standard in every Shilha move')}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Comparison: Amateur Movers vs Shilha */}
        <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl transition-colors ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#030d22] border-blue-900/60'
        }`}>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <h3 className={`text-2xl sm:text-3xl font-black ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              {t('الفرق بين النقل العشوائي ونقل شلها الاحترافي', 'Comparison: Random Street Movers vs Professional Shilha')}
            </h3>
            <p className={`text-xs sm:text-sm ${
              theme === 'light' ? 'text-slate-500' : 'text-slate-400'
            }`}>
              {t(
                'مقارنة واقعية توضح لماذا يعتبر اختيار شلها استثماراً يحمي أثاثك ويوفر مالك',
                'Real comparison showing why Shilha is the investment that protects your furniture and wallet'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* The Amateur / Random movers Nightmare */}
            <div className="border-2 border-rose-300 rounded-3xl p-6 space-y-5 flex flex-col justify-between bg-rose-50 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rose-800 font-black text-base sm:text-lg">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{t('مخاطر الاعتماد على عمال الشارع أو جهات غير معتمدة:', 'Risks of amateur street movers:')}</span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-rose-300 max-h-48 shadow-inner">
                  <img
                    src="/assets/aistudio/FB_IMG_1793231462178_eee5b4ef.jpg"
                    alt="التعب والإحباط مع النقل العشوائي"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-900 font-bold">
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm shrink-0 mt-0.5">✕</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('تجريح وخدش أطقم الصالون وغرف النوم على السلالم الضيقة.', 'Scratches on bedroom sets and sofas on narrow staircases.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm shrink-0 mt-0.5">✕</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('تكسير أواني المطبخ والتحف والزجاجيات بسبب التغليف الرديء أو انعدامه.', 'Broken kitchenware, porcelain, and crystal due to lack of packing.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm shrink-0 mt-0.5">✕</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('مفاجآت في الأسعار بعد التحميل وطلب إكراميات إجبارية لا تنتهي.', 'Price surprises after loading and endless forced tips.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-rose-600 font-black text-sm shrink-0 mt-0.5">✕</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('تلف شحنة فريون التكييفات بسبب فك عشوائي بدون فني متخصص.', 'AC freon gas leaks caused by unskilled laborers.')}</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-100 border border-rose-300 text-xs sm:text-sm text-rose-950 font-black leading-relaxed">
                {t('النتيجة: توتر وقلق، تلفيات باهظة، ومصاريف إضافية غير محسوبة.', 'Outcome: Extreme stress, costly damages, and surprise expenses.')}
              </div>
            </div>

            {/* The Shilha VIP Experience */}
            <div className="border-2 border-blue-400 rounded-3xl p-6 space-y-5 flex flex-col justify-between bg-blue-50/90 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-900 font-black text-base sm:text-lg">
                  <ShieldCheck className="w-5 h-5 shrink-0 text-blue-700" />
                  <span>{t('تجربة نقل VIP الآمنة والمنظمة مع شلها:', 'VIP Safe & Organized Experience with Shilha:')}</span>
                </div>

                <div className="rounded-2xl overflow-hidden border border-blue-300 max-h-48 shadow-inner">
                  <img
                    src="/assets/aistudio/FB_IMG_1793231464813_9511a619.jpg"
                    alt="طاقم شلها المحترف"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-900 font-bold">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black text-base shrink-0">✓</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('أوناش هيدروليكية ترفع وتنزل العفش من الواجهة بدون لمس السلالم.', 'Hydraulic winches lift/lower furniture outside without touching stairs.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black text-base shrink-0">✓</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('تغليف كامل بابلز واسترتش وكارتون مقوى لكل قطعة خشبية وزجاجية.', 'Full bubble, stretch, and cardboard wrap for every wooden and glass item.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black text-base shrink-0">✓</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('سعر ثابت متفق عليه مسبقاً في فاتورة واضحة وبدون أي زيادات أو إكراميات.', 'Fixed upfront price agreement with zero hidden fees.')}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-700 font-black text-base shrink-0">✓</span>
                    <span className="text-slate-900 font-bold leading-relaxed">{t('فنيون تكييف وكهرباء معتمدون لفك وإعادة تشغيل الأجهزة فورياً.', 'Certified AC & electrical technicians safely reinstall appliances.')}</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-100 border border-blue-300 text-xs sm:text-sm text-blue-950 font-black leading-relaxed">
                {t('النتيجة: راحة بال تامة، أثاثك سليم 100%، وسكنك الجديد جاهز في نفس اليوم!', 'Outcome: 100% peace of mind, undamaged furniture, ready on day one!')}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
