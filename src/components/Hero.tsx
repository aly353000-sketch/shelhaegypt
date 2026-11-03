import React from 'react';
import { Phone, Calculator, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { TrustBadges } from './TrustBadges';
import { HeroMediaSlider } from './HeroMediaSlider';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onOpenCalculator: () => void;
  onOpenGoldenTips?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator, onOpenGoldenTips }) => {
  const { t, theme } = useApp();

  const handleGoldenTipsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenGoldenTips) {
      onOpenGoldenTips();
    } else {
      const el = document.getElementById('prep-guide') || document.getElementById('moving-tips');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWinchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('winch-section') || document.getElementById('winch-deep-dive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = '#winch-section';
    }
  };

  return (
    <section
      id="hero"
      className={`relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 border-b transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-blue-50/70 via-white to-sky-50/40 border-slate-200'
          : 'bg-gradient-to-b from-[#030d22] via-[#041633] to-[#030d22] border-blue-900/40'
      }`}
    >
      {/* Decorative ambient background glows in soothing royal and sky blues */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Right Column (Text & Value Proposition) */}
          <div className="lg:col-span-7 space-y-7 text-right">
            
            {/* Trust Slogan Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm sm:text-base font-black shadow-sm border bg-blue-100/90 border-blue-300 text-blue-950">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              <span>الشركة الأولى المعتمدة لنقل وتغليف الأثاث في مصر</span>
            </div>

            {/* Encouraging Exploration Banner (Customer Decision Booster) */}
            <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all ${
              theme === 'light'
                ? 'bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/70 border-blue-200 text-slate-800'
                : 'bg-gradient-to-r from-blue-950/70 via-[#061b3d]/90 to-blue-900/60 border-blue-700/60 text-slate-100'
            }`}>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md text-lg">
                  ✨
                </div>
                <div className="space-y-2 flex-1 text-right">
                  <div className="text-sm sm:text-base font-black text-blue-800 dark:text-sky-300">
                    {t(
                      'قبل أن تقرر من ينقل بيتك وتخاطر بذكرياتك.. خذ دقيقة لتصفّح موقعنا!',
                      'Before deciding who moves your home and risking your memories.. Take a minute to explore our site!'
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {t(
                      'احسب تكلفتك بنفسك بشفافية تامة دون مفاجآت، شاهد أوناشنا وسياراتنا بالصوت والصورة، واقرأ دليل نصائح الخبراء قبل النقل.. لتتأكد بنفسك لماذا تختارنا أكثر من 15,000 عائلة مصرية وتثق بنا!',
                      'Calculate your exact cost transparently with no surprises, watch our winches and trucks in live video, and read expert pre-move advice.. to see for yourself why 15,000+ Egyptian families choose and trust us!'
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold">
                    <button
                      type="button"
                      onClick={onOpenCalculator}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600 text-blue-800 dark:text-sky-300 hover:text-white transition-colors cursor-pointer shadow-sm"
                    >
                      🧮 {t('حاسبة الأسعار الفورية', 'Instant Calculator')}
                    </button>
                    <button
                      type="button"
                      onClick={handleGoldenTipsClick}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black transition-colors cursor-pointer border border-amber-300 shadow-sm"
                    >
                      📖 {t('نصائح ذهبية قبل النقل (اضغط للقراءة)', 'Golden Pre-Move Tips (Click to Read)')}
                    </button>
                    <a
                      href="#winch-section"
                      onClick={handleWinchClick}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-950 font-black transition-colors cursor-pointer border border-blue-300 shadow-sm flex items-center gap-1.5"
                    >
                      <span className="text-sm">🏗️</span>
                      <span>{t('الونش الهيدروليكي', 'Hydraulic Winch')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Advertising Headline - Increased Font Sizes */}
            <div className="space-y-3.5">
              <h1 className={`text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-black leading-tight sm:leading-tight tracking-tight ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                {t('مش أي حد يشيل عفشك..', 'Not anyone who moves your home..')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 via-sky-500 to-cyan-400">
                  {t('يستاهل ثقتك!', 'Deserves your trust!')}
                </span>
              </h1>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-extrabold leading-relaxed ${
                theme === 'light' ? 'text-blue-900' : 'text-sky-300'
              }`}>
                {t(
                  'إحنا مش بننقل عفش وبس.. إحنا بننقل بيتك بكل اللي فيه من ذكريات ❤️',
                  'We do not just move furniture.. We carry your memories and home with ultimate care ❤️'
                )}
              </p>
            </div>

            {/* Sub-description with larger comfortable typography */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl font-medium ${
              theme === 'light' ? 'text-slate-700' : 'text-slate-300'
            }`}>
              {t(
                'مع شركة شلها (شيلها) هتنقل شقتك أو فيلتك أو شركتك وإنت مرتاح البال تماماً. خدمة VIP شاملة: فك وتركيب نجارين محترفين، فك وتركيب التكييفات والأجهزة الكهربائية، تغليف أوروبي ثلاثي الطبقات، أوناش رفع هيدروليكية حتى الدور 25، وأسطول سيارات مغلقة مبطنة تغطي القاهرة الكبرى وجميع المحافظات.',
                'With Shilha, move your apartment, villa, or corporate office with complete peace of mind. Full VIP moving package: professional carpentry dismantling & assembly, AC technicians, 3-layer European packing, hydraulic winches up to floor 25, and padded closed trucks covering all Egypt.'
              )}
            </p>

            {/* Quick Slogan Badge */}
            <div className={`rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 border shadow-sm ${
              theme === 'light'
                ? 'bg-blue-50/80 border-blue-200'
                : 'bg-[#051530]/80 border-blue-800/60'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
                ⭐
              </div>
              <div>
                <div className={`text-base sm:text-lg font-black ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
                  {t('شلها.. راحتك مش رفاهية، دي أساس شغلنا!', 'Shilha.. Your comfort is not a luxury, it is our core duty!')}
                </div>
                <div className={`text-xs sm:text-sm mt-0.5 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {t(
                    'اتفاق واضح على السعر قبل التنفيذ بدون أي تكاليف خفية + تغليف محكم وحماية فائقة للمنقولات.',
                    'Clear, fixed upfront price agreement with zero hidden fees + premium protective packaging.'
                  )}
                </div>
              </div>
            </div>

            {/* CTAs Button Group */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-3">
                {/* WhatsApp Primary with official WhatsApp icon */}
                <a
                  href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                    t('السلام عليكم، استفسار عن حجز نقل عفش وتغليف أثاث مع شركة شلها', 'Hello, I want to book moving & packing with Shilha')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-4 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  <span>{t('احجز عبر واتساب الآن', 'Book via WhatsApp Now')}</span>
                </a>

                {/* Call Hotline */}
                <a
                  href={`tel:${COMPANY_DATA.phones[0].number}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white px-6 py-4 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{t('اتصل فوراً (24 ساعة)', 'Call Now (24/7)')}</span>
                </a>

                {/* Interactive Calculator Trigger */}
                <button
                  type="button"
                  onClick={onOpenCalculator}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 border px-6 py-4 rounded-xl font-black text-sm sm:text-base transition-all cursor-pointer ${
                    theme === 'light'
                      ? 'bg-white hover:bg-slate-50 text-blue-900 border-slate-300 hover:border-blue-500'
                      : 'bg-blue-950/70 hover:bg-blue-900 text-white border-blue-800 hover:border-sky-400'
                  }`}
                >
                  <Calculator className="w-5 h-5 text-sky-400" />
                  <span>{t('حاسبة التكلفة الفورية', 'Price Calculator')}</span>
                </button>
              </div>

              {/* Direct Phone Numbers for instant dial without clicks */}
              <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 py-2 px-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm font-bold">
                <span className="text-blue-900 dark:text-sky-200">📞 {t('للاتصال المباشر والفوري:', 'Direct Call:')}</span>
                <a href="tel:01099649897" className="font-mono font-black text-blue-700 dark:text-sky-300 hover:underline text-sm sm:text-base" dir="ltr">
                  01099649897
                </a>
                <span className="text-slate-400">|</span>
                <a href="tel:01128418399" className="font-mono font-black text-blue-700 dark:text-sky-300 hover:underline text-sm sm:text-base" dir="ltr">
                  01128418399
                </a>
              </div>

              {/* Sophisticated Reassurance & High-Demand Callback Note (Requested) */}
              <div className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-colors ${
                theme === 'light'
                  ? 'bg-amber-50/90 border-amber-300/80 text-amber-950 shadow-sm'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
              }`}>
                <span className="text-xl shrink-0 pt-0.5">💡</span>
                <div className="space-y-1 text-right flex-1">
                  <div className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
                    <span>{t('ملاحظة هامة لحرصنا على وقتك وراحتك:', 'Important note regarding your comfort & time:')}</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                    {t(
                      'نظراً للإقبال الشديد على حجوزات النقل والونش، قد يستغرق الرد بضع دقائق عبر الواتساب أو الهاتف؛ في هذه الحالة يُرجى التكرم بترك بياناتك وموعد النقل المطلوب، وسيقوم مسؤول الحجوزات بالاتصال بك فوراً لتأكيد الحجز وتثبيت الخصم 10%.',
                      'Due to high demand on moving & winch bookings, replies might take a few minutes. In this case, please leave your details and our coordinator will call you back right away to confirm booking & lock your 10% discount.'
                    )}
                  </p>
                  <div className="pt-1">
                    <a
                      href="#quick-contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-blue-700 dark:text-sky-300 hover:underline bg-blue-100/80 dark:bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-300/60 dark:border-blue-800"
                    >
                      <span>{t('اضغط هنا لترك بياناتك وسنتواصل معك فوراً 📞', 'Click here to leave details for immediate callback 📞')}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Requested Trust Badges Component Placed in Hero Section */}
            <TrustBadges />

          </div>

          {/* Left Column (5 Images + 1 Video Smooth Sliding Carousel) */}
          <div className="lg:col-span-5 relative">
            <HeroMediaSlider />
          </div>

        </div>
      </div>
    </section>
  );
};
