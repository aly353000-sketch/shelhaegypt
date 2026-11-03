import React, { useState, useEffect } from 'react';
import { Flame, Clock, Phone } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

export const CountdownTimer: React.FC = () => {
  const { t, theme } = useApp();

  // 48 hours countdown target that resets smoothly
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 1, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 1, hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className={`relative overflow-hidden rounded-3xl border shadow-2xl p-6 sm:p-10 ${
          theme === 'light'
            ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white border-blue-400'
            : 'bg-gradient-to-r from-[#031d44] via-[#043977] to-[#0a2463] text-white border-sky-500/40'
        }`}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Offer Details */}
          <div className="lg:col-span-7 space-y-4 text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-sky-200 px-3.5 py-1.5 rounded-full text-xs font-black shadow-sm">
              <Flame className="w-4 h-4 text-sky-300 animate-pulse" />
              <span>{t('عرض خاص محدود المدة لفترة قصيرة', 'Limited-Time Exclusive Offer')}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t('خصم 10% على نقل الفلل والشقق + معاينة فنية مجانية!', '10% OFF Moving Packages + Free Technical Inspection!')}
            </h3>

            <p className="text-sky-100 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {t(
                'استفد الآن من خصم شلها الحصري عند تأكيد حجزك قبل انتهاء العداد التنازلي. يشمل العرض معاينة مجانية، تغليف متقن للأجهزة والتكييفات، وسيارات نقل مبطنة.',
                'Claim Shilha special discount today before the countdown ends. Includes free site inspection, full appliance packing, and padded closed trucks.'
              )}
            </p>
          </div>

          {/* Countdown Clock & Actions */}
          <div className="lg:col-span-5 flex flex-col items-center sm:items-end gap-5">
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
              {[
                { label: t('ثانية', 'Sec'), value: formatNumber(timeLeft.seconds) },
                { label: t('دقيقة', 'Min'), value: formatNumber(timeLeft.minutes) },
                { label: t('ساعة', 'Hrs'), value: formatNumber(timeLeft.hours) },
                { label: t('يوم', 'Days'), value: formatNumber(timeLeft.days) },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/60 backdrop-blur-md border border-white/20 rounded-2xl p-2.5 sm:p-3 min-w-[62px] sm:min-w-[74px] shadow-lg"
                >
                  <div className="text-xl sm:text-3xl font-black text-sky-300 tracking-tight font-mono">
                    {item.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-sky-100/90 font-medium mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full">
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                  t(
                    'السلام عليكم، أرغب في الاستفادة من عرض الخم 10% مع شركة شلها قبل انتهاء العداد التنازلي',
                    'Hello, I want to claim the 10% discount offer from Shilha before it expires.'
                  )
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>{t('احجز العرض عبر واتساب', 'Claim via WhatsApp')}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-900 font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>{t('اتصل الآن فوراً', 'Call Now')}</span>
              </a>
            </div>

            <div className="text-sky-200/90 text-xs flex items-center gap-1.5 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('ينتهي العرض قريباً - أولوية الحجز حسب الاتصال', 'Offer ends soon - first call first served')}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
