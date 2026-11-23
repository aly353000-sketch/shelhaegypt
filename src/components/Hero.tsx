import React from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactInfo';
import { TrustBadges } from './TrustBadges';
import { HeroMediaSlider } from './HeroMediaSlider';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';
import { handlePhoneCallClick } from '../utils/analytics';

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

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-10 lg:pt-32 lg:pb-14 border-b transition-colors duration-300 bg-gradient-to-b from-[#020b18] via-[#041633] to-[#020b18] border-blue-900/60 text-white"
    >
      {/* Ambient glows (desktop only to avoid expensive mobile blur rasterization) */}
      <div className="hidden sm:block absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* Right Column Top (Headline + Value Prop + Instant CTAs - Always Above the Fold) */}
          <div className="lg:col-span-7 space-y-4 text-right order-1">
            {/* Value Pill */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-black shadow-sm border bg-amber-500/15 border-amber-400/40 text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('الخدمة الفندقية الأولى لنقل وتغليف الأثاث الفاخر والفلل والشقق الراقية 👑', 'Egypt’s #1 White-Glove VIP Packing & Luxury Relocation Service 👑')}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
                <span className="text-amber-400 text-sm sm:text-lg font-black mb-1 tracking-wide flex items-center gap-2">
                  <span>👑</span>
                  <span>{t('رويال موفرز VIP | حراس رفاهيتك لنقل وتغليف الأثاث الفاخر', 'Royal Movers VIP | Guardians of Your Comfort & Luxury Belongings')}</span>
                </span>
                {t('مش مجرد عمال نقل.. إحنا حراس لرفاهيتك!', 'Not just movers.. guardians of your comfort!')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 via-yellow-300 to-amber-500">
                  {t('خدمة نقل وتغليف فندقية تليق ببيتك!', 'White-glove hotel-grade packing & moving!')}
                </span>
              </h1>
              <p className="text-base sm:text-xl font-black leading-relaxed text-sky-300">
                {t(
                  'عناية فائقة بالتحف والنجف والصالونات والمقتنيات الثمينة في التجمع، مدينتي، الرحاب، الشيخ زايد، أكتوبر والمعادي ✨',
                  'Supreme care for antiques, chandeliers & luxury salons across New Cairo, Madinaty, Zayed, October & Maadi ✨'
                )}
              </p>
            </div>

            {/* Crisp Value Description */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl font-medium text-slate-200">
              {t(
                'نوفر لك تجربة انتقال فندقية هادئة ومتكاملة بدون أي مجهود: تغليف أوروبي 5 طبقات (بابلز ثقيل واسترتش مستورد)، نجارون محترفون لفك وتركيب الغرف والمطابخ، فنيو تكييفات معتمدون، وتصاريح كمبوندات جاهزة بسيارات مغلقة ومبطنة.',
                'Enjoy a serene, end-to-end VIP move: 5-ply European packing, master carpenters, certified AC technicians, pre-approved compound permits & padded closed trucks.'
              )}
            </p>

            {/* Primary Above-the-Fold Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappInternational}?text=${encodeURIComponent(
                  t(
                    'السلام عليكم، أرغب في حجز خدمة النقل والتغليف الفندقي VIP مع رويال موفرز',
                    'Hello, I would like to book VIP white-glove moving & packing with Royal Movers'
                  )
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-600 text-white px-5 py-3.5 rounded-xl font-black text-sm sm:text-lg shadow-xl shadow-emerald-700/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <span>{t('احجز خدمة VIP عبر واتساب', 'Book VIP Move via WhatsApp')}</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.primaryPhone}`}
                onClick={(e) => handlePhoneCallClick(e, `tel:${CONTACT_INFO.primaryPhone}`, 'القسم الرئيسي (اتصال مباشر)')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-5 py-3.5 rounded-xl font-black text-sm sm:text-lg shadow-xl shadow-blue-700/25 hover:scale-[1.02] active:scale-95 transition-all"
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
                📖 {t('نصائح ذهبية لحماية أثاثك', 'Golden Pre-Move Tips')}
              </button>
              <a
                href="#interactive-services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('interactive-services') || document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  else window.location.hash = '#interactive-services';
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-900/90 hover:bg-blue-800 text-amber-300 font-black transition-colors cursor-pointer border border-amber-400/50 shadow-sm flex items-center gap-1.5"
              >
                <span>🛡️</span>
                <span>{t('خدمات التغليف والنقل الفندقي', 'VIP Packing & Moving Services')}</span>
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
                    <h2 className="text-base sm:text-xl font-black text-amber-300">
                      {t('شعارنا: "عفشك مش مجرد حاجات.. دي ذكريات وتعب سنين"', 'Our Motto: "Your furniture is memories and life effort"')}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                    {t(
                      'تغليف أوروبي فائق الأمان للأنتيكات والكريستال والصالونات والأجهزة، مع معاينة مجانية وخطة نقل منظمة بسعر رسمي ثابت قبل التنفيذ.',
                      'European-grade multi-layer packing for antiques, crystal, salons & appliances, with free survey and a transparent fixed contract.'
                    )}
                  </p>
                </div>
              </div>

              {/* Unified Dark-Harmony Hotline & Callback Shortcut Bar */}
              <div className="pt-3 border-t border-blue-800/70 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold">
                  <span className="text-amber-300 font-black">📞 الخط الساخن (24 ساعة):</span>
                  <a
                    href="tel:01233391255"
                    onClick={(e) => handlePhoneCallClick(e, 'tel:01233391255', 'الخط الساخن الرئيسي')}
                    className="font-mono font-black text-sky-300 hover:text-amber-300 underline-offset-4 hover:underline text-base tracking-wider"
                    dir="ltr"
                  >
                    01233391255
                  </a>
                </div>
                <a
                  href="#quick-contact"
                  className="inline-flex items-center gap-1.5 font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                >
                  <span>احجز معاينة مجانية VIP</span>
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
