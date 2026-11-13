import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { TrustBadges } from './TrustBadges';
import { HeroMediaSlider } from './HeroMediaSlider';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

interface HeroProps {
  onOpenGoldenTips?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGoldenTips }) => {
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
      className="relative overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16 border-b transition-colors duration-300 bg-gradient-to-b from-[#020b18] via-[#041633] to-[#020b18] border-blue-900/60 text-white"
    >
      {/* Decorative ambient background glows in soothing royal and sky blues */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Right Column (Text & Value Proposition) */}
          <div className="lg:col-span-7 space-y-5 text-right">
            
            {/* Trust Slogan Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm sm:text-base font-black shadow-sm border bg-amber-500/15 border-amber-400/40 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>أفضل شركة نقل أثاث للشقق والفلل — جودة VIP وسعر اقتصادي يناسبك 👑</span>
            </div>

            {/* Main Advertising Headline - Value-Luxury Positioning (High Quality + Fair Price) */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-black leading-tight tracking-tight text-white">
                <span className="block text-amber-400 text-base sm:text-lg lg:text-xl font-black mb-1.5 tracking-wide flex items-center gap-2">
                  <span>👑</span>
                  <span>{t('رويال موفرز VIP | أفضل شركة نقل أثاث بالقاهرة والجيزة', 'Royal Movers VIP | Best Moving Company in Cairo & Egypt')}</span>
                </span>
                {t('فخامة وجودة VIP لنقل أثاث بيتك..', 'White-glove luxury relocation service..')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-500">
                  {t('بأسعار عادلة ومناسبة للشقق والفلل!', 'At fair prices for apartments & villas!')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-black leading-relaxed text-sky-300">
                {t(
                  'باقات نقل مرنة تناسب ميزانيتك في القاهرة، التجمع، مدينتي، الرحاب، المقطم، زايد و6 أكتوبر ✨',
                  'Flexible moving packages tailored to your budget across Cairo & Giza ✨'
                )}
              </p>
            </div>

            {/* Sub-description emphasizing Apartments + Villas + Fair Transparent Pricing */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-medium text-slate-200">
              {t(
                'سواء كنت بتنقل شقة أو فيلا أو مكتب، بنوفرلك معاملة راقية وجودة VIP بأفضل سعر مقابل خدمة في مصر: نجارين وفنيين محترفين، تغليف قوي يحمي عفشك من أي خدش، ونش رفع عفش حديث، وسيارات مغلقة مبطنة — بسعر واضح يناسب ميزانيتك بدون أي مصاريف خفية.',
                'Whether moving an apartment, villa, or office, enjoy white-glove VIP care at a fair, budget-friendly rate with no hidden fees.'
              )}
            </p>

            {/* Primary Call-To-Action Buttons Right Above the Fold */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                  t('السلام عليكم، أرغب في معرفة أسعار وباقات نقل العفش المناسبة مع رويال موفرز VIP', 'Hello, I want to inquire about moving packages & pricing with Royal Movers VIP')
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-emerald-600/30 hover:scale-[1.03] active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span>{t('اسأل عن السعر عبر واتساب', 'Ask Price via WhatsApp')}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white px-6 py-3.5 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-blue-500/25 hover:scale-[1.03] active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>{t('اتصل فوراً: 01233391255', 'Call Now: 01233391255')}</span>
              </a>
            </div>

            {/* Encouraging Exploration Banner (Customer Decision Booster) */}
            <div className="p-4 sm:p-5 rounded-2xl border border-amber-400/40 shadow-lg bg-gradient-to-r from-[#031126] via-[#071d49] to-[#031126] text-white">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md text-xl font-black">
                  ✨
                </div>
                <div className="space-y-2 flex-1 text-right">
                  <div className="text-sm sm:text-base font-black text-amber-300">
                    {t(
                      'قبل أن تقرر من ينقل بيتك وتخاطر بذكرياتك.. خذ دقيقة لتصفّح موقعنا!',
                      'Before deciding who moves your home and risking your memories.. Take a minute to explore our site!'
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                    {t(
                      '✨ "بنغلف ذكرياتك.. مش بس أثاثك." شاهد أوناشنا وسياراتنا بالصوت والصورة، واقرأ دليل نصائح الخبراء قبل النقل، لنوفر لك تجربة نقل فندقية راقية تليق ببيتك!',
                      '✨ "We pack your memories.. Not just your furniture."'
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold">
                    <button
                      type="button"
                      onClick={handleGoldenTipsClick}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition-colors cursor-pointer border border-amber-300 shadow-sm"
                    >
                      📖 {t('نصائح ذهبية قبل النقل (اضغط للقراءة)', 'Golden Pre-Move Tips (Click to Read)')}
                    </button>
                    <a
                      href="#winch-section"
                      onClick={handleWinchClick}
                      className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-black transition-colors cursor-pointer border border-sky-300 shadow-sm flex items-center gap-1.5"
                    >
                      <span className="text-sm">🏗️</span>
                      <span>{t('ونش رفع عفش هيدروليكي (2500ج)', 'Hydraulic Winch (2500 EGP)')}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Requested Brand Slogan Banner (Screenshot 3) - High-Contrast Luxury Card */}
            <div className="rounded-3xl p-6 sm:p-7 border-2 shadow-2xl bg-gradient-to-br from-[#020b18] via-[#091f4a] to-[#041635] border-amber-400/50 text-white relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2.5 flex-1 text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👑</span>
                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-black text-amber-300 tracking-wide">
                      {t('شعارنا الراسخ: "عفشك مش مجرد حاجات.. دي ذكريات وتعب سنين"', 'Our Motto: "Your furniture is not just things.. It is memories and life effort"')}
                    </h3>
                  </div>
                  <div className="text-base sm:text-lg font-black text-sky-200 flex items-center gap-2">
                    <span>✨</span>
                    <span>{t('بنغلف ذكرياتك.. مش بس أثاثك.', 'We pack your memories.. Not just your furniture.')}</span>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-slate-100 font-medium pt-1">
                    {t(
                      'في شركة رويال موفرز VIP، نتعامل مع كل كرسي ودولاب وتحفة وكأنها ملك خاص بنا. نحرص على استخدام أفضل رولات بابلز الفيروز الثقيل والاسترتش المستورد المقاوم للصدمات، لأن راحتك وحماية ذكرياتك هما أساس نجاحنا وثقة أرقى عائلات مصر بنا.',
                      'At Royal Movers VIP, we treat every single piece of furniture as our own. We use the finest heavy turquoise bubble wrap and imported stretch film, because your peace of mind and protecting your memories are the foundation of our success.'
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center shrink-0 text-2xl shadow-inner">
                  💛
                </div>
              </div>
            </div>

            {/* Hotline & Reassurance Block */}
            <div className="space-y-3 pt-1">
              {/* Direct Phone Numbers for instant dial without clicks */}
              <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-50 to-amber-50/70 border border-amber-300/60 text-xs sm:text-sm font-bold shadow-sm">
                <span className="text-amber-900 dark:text-amber-300 flex items-center gap-1 font-black">
                  <span>👑</span>
                  <span>{t('الخط الساخن الموحد للحجوزات والمتابعة (24 ساعة):', 'Unified 24/7 Hotline:')}</span>
                </span>
                <a href="tel:01233391255" className="font-mono font-black text-blue-700 dark:text-amber-300 hover:underline text-base sm:text-lg tracking-wider" dir="ltr">
                  01233391255
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
                      'نظراً للإقبال الشديد على حجوزات النقل والونش، قد يستغرق الرد بضع دقائق عبر الواتساب أو الهاتف؛ في هذه الحالة يُرجى التكرم بترك بياناتك وموعد النقل المطلوب، وسيقوم مسؤول الحجوزات بالاتصال بك فوراً لتأكيد الحجز بأفضل سعر متاح.',
                      'Due to high demand on moving & winch bookings, replies might take a few minutes. In this case, please leave your details and our coordinator will call you back right away to confirm your booking at the best rate.'
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
