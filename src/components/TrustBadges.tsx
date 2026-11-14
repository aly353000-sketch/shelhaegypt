import React from 'react';
import { Clock, Users, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrustBadges: React.FC = () => {
  const { t } = useApp();

  const badges = [
    {
      id: '24-7',
      title: t('خدمة 24/7 على مدار الساعة', '24/7 Non-stop Service'),
      desc: t('انطلاق سريع لخدمتك فورياً طوال اليوم', 'Instant response & dispatch around the clock'),
      icon: <Clock className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'team',
      title: t('طاقم عمل معتمد بالزي الرسمي', 'Professional Certified Team'),
      desc: t('نجارون وفنيو تكييف وعمالة مدربة بخبرة 12 عاماً', 'Carpenters, AC techs & certified trained crew'),
      icon: <Users className="w-5 h-5 text-sky-400" />,
    },
    {
      id: 'safe',
      title: t('تغليف وحماية ضد الخدش', '100% Safe & Professional Handling'),
      desc: t('بابلز ثقيل وكراتين 5 طبقات بأمان تام', 'Heavy bubble wrap & 5-ply protection'),
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
      {badges.map((b) => (
        <div
          key={b.id}
          className="flex items-center gap-3 p-3.5 rounded-2xl border border-blue-800/80 bg-[#031126]/90 hover:border-amber-400/60 transition-all duration-300 shadow-md"
        >
          <div className="p-2.5 rounded-xl shrink-0 bg-blue-950/90 border border-blue-800/80">
            {b.icon}
          </div>
          <div>
            <div className="text-xs sm:text-sm font-black text-white">
              {b.title}
            </div>
            <div className="text-[11px] mt-0.5 leading-snug text-slate-300">
              {b.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
