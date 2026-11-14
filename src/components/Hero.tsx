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
  const { t } = useApp();

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
      className="relative overflow-hidden pt-32 pb-10 lg:pt-32 lg:pb-14 border-b transition-colors duration-300 bg-gradient-to-b from-[#020b18] via-[#041633] to-[#020b18] border-blue-900/60 text-white"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* Right Column Top (Headline + Value Prop + Instant CTAs - Always Above the Fold) */}
          <div className="lg:col-span-7 space-y-4 text-right order-1">
            {/* Value Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-black shadow-sm border bg-amber-500/15 border-amber-400/40 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>أفضل شركة نقل أثاث للشقق والفلل — جودة VIP وسعر اقتصادي يناسبك 👑</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                <span className="text-amber-400 text-sm sm:text-lg font-black mb-1 tracking-wide flex items-center gap-2">
                  <span>👑</span>
                  <span>{t('رويال موفرز VIP | أفضل شركة نقل أثاث بالقاهرة والجيزة', 'Royal Movers VIP | Best Moving Company in Cairo & Egypt')}</span>
                </span>
                {t('فخامة وجودة VIP لنقل أثاث بيتك..', 'White-glove luxury relocation service..')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-500">
                  {t('بأسعار عادلة ومناسبة للشقق والفلل!', 'At fair prices for apartments & villas!')}
                </span>
              </h1>
              <p className="text-base sm:text-xl font-black leading-relaxed text-sky-300">
                {t(
                  'باقات نقل مرنة تناسب ميزانيتك في القاهرة، التجمع، مدينتي، الرحاب، المقطم، زايد و6 أكتوبر ✨',
                  'Flexible moving packages tailored to your budget across Cairo & Giza ✨'
                )}
              </p>
            </div>

            {/* Crisp Value Description */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-medium text-slate-200">
              {t(
                'سواء كنت بتنقل شقة أو فيلا أو مكتب، بنوفرلك معاملة راقية وجودة VIP بأفضل سعر مقابل خدمة في مصر: نجارين وفنيين محترفين، تغليف قوي بدون خدش، ونش رفع حديث، وسيارات مغلقة مبطنة بدون أي مصاريف خفية.',
                'Whether moving an apartment, villa, or office, enjoy white-glove VIP care at a fair, budget-friendly rate with no hidden fees.'
              )}
            </p>

            {/* Primary Above-the-Fold Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                  t(
                    'السلام عليكم، أرغب في معرفة أسعار وباقات نقل العفش المناسبة للشقق والفلل مع رويال موفرز VIP',
                    'Hello, I want to inquire about moving packages & pricing with Royal Movers VIP'
                  )
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-xl font-black text-sm sm:text-lg shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <span>{t('اسأل عن السعر عبر واتساب', 'Ask Price via WhatsApp')}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white px-5 py-3.5 rounded-xl font-black text-sm sm:text-lg shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <span>{t('اتصل فوراً: 01233391255', 'Call Now: 01233391255')}</span>
              </a>
            </div>

            {/* Quick Action Shortcut Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={handleGoldenTipsClick}
                className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition-colors cursor-pointer border border-amber-300 shadow-sm"
              >
                📖 {t('نصائح ذهبية قبل النقل', 'Golden Pre-Move Tips')}
              </button>
              <a
                href="#winch-section"
                onClick={handleWinchClick}
                className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black transition-colors cursor-pointer border border-sky-300 shadow-sm flex items-center gap-1.5"
              >
                <span>🏗️</span>
                <span>{t('ونش رفع عفش هيدروليكي (2500ج)', 'Hydraulic Winch (2500 EGP)')}</span>
              </a>
            </div>
          </div>

          {/* Real Media Slider: Appears right after CTAs on Mobile, and in Left Column on Desktop */}
          <div className="lg:col-span-5 lg:row-span-2 relative order-2 lg:order-2">
            <HeroMediaSlider />
          </div>

          {/* Consolidated Motto, Hotline & Reassurance Card + Trust Badges (Below Slider on Mobile, Below CTAs on Desktop) */}
          <div className="lg:col-span-7 space-y-4 text-right order-3 lg:order-3">
            <div className="rounded-3xl p-5 sm:p-6 border border-amber-400/40 shadow-xl bg-gradient-to-br from-[#031126] via-[#071d49] to-[#031126] text-white space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👑</span>
                    <h3 className="text-base sm:text-xl font-black text-amber-300">
                      {t('شعارنا: "عفشك مش مجرد حاجات.. دي ذكريات وتعب سنين"', 'Our Motto: "Your furniture is memories and life effort"')}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                    {t(
                      'بنغلف ذكرياتك بأجود رولات البابلز الفيروز الثقيل والاسترتش المستورد وكراتين 5 طبقات، مع معاينة وتسعير ثابت قبل التنفيذ.',
                      'We wrap your memories with heavy turquoise bubble wrap, stretch film, and 5-ply cartons at a clear fixed price.'
                    )}
                  </p>
                </div>
              </div>

              {/* Unified Dark-Harmony Hotline & Callback Shortcut Bar */}
              <div className="pt-3 border-t border-blue-800/70 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-amber-300 font-black">📞 الخط الساخن (24 ساعة):</span>
                  <a href="tel:01233391255" className="font-mono font-black text-sky-300 hover:text-amber-300 underline-offset-4 hover:underline text-base tracking-wider" dir="ltr">
                    01233391255
                  </a>
                </div>
                <a
                  href="#quick-contact"
                  className="inline-flex items-center gap-1.5 font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                >
                  <span>احجز معاينة مجانية واتصل بي</span>
                  <span>👈</span>
                </a>
              </div>
            </div>

            <TrustBadges />
          </div>

        </div>
      </div>
    </section>
  );
};
