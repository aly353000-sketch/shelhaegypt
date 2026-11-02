import React from 'react';
import { Clock, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrustBadges: React.FC = () => {
  const { t, theme } = useApp();

  const badges = [
    {
      id: '24-7',
      title: t('خدمة 24/7 على مدار الساعة', '24/7 Non-stop Service'),
      desc: t('جاهزون للانطلاق لخدمتك فورياً طوال اليوم', 'Instant response & dispatch around the clock'),
      icon: <Clock className="w-5 h-5 text-sky-400" />,
      color: 'from-blue-500/20 to-sky-500/10 border-sky-500/30 text-sky-300',
    },
    {
      id: 'team',
      title: t('فريق عمل محترف ومعتمد', 'Professional Certified Team'),
      desc: t('نجارون وفنيو تكييف وعمالة مدربة بخبرة 12 عاماً', 'Carpenters, AC techs & certified trained crew'),
      icon: <Users className="w-5 h-5 text-blue-400" />,
      color: 'from-blue-600/20 to-indigo-500/10 border-blue-500/30 text-blue-300',
    },
    {
      id: 'safe',
      title: t('مناولة آمنة واحترافية تامة', '100% Safe & Professional Handling'),
      desc: t('تغليف أوروبي وحماية تامة ضد الخدش والأتربة', 'European packing & ultimate scratch protection'),
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
      {badges.map((b) => (
        <div
          key={b.id}
          className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 backdrop-blur-md shadow-md hover:scale-[1.02] ${
            theme === 'light'
              ? 'bg-white/95 border-sky-200 hover:border-blue-400 text-slate-800'
              : 'bg-gradient-to-br ' + b.color
          }`}
        >
          <div className={`p-2.5 rounded-xl shrink-0 ${
            theme === 'light' ? 'bg-sky-100 text-blue-600' : 'bg-blue-950/80 border border-blue-500/30'
          }`}>
            {b.icon}
          </div>
          <div>
            <div className={`text-xs sm:text-sm font-black ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
              {b.title}
            </div>
            <div className={`text-[11px] mt-0.5 leading-snug ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              {b.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
