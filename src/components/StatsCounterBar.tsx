import React from 'react';
import { Award, Users, ShieldCheck, Clock, Crown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StatsCounterBar: React.FC = () => {
  const { t, theme } = useApp();

  const stats = [
    {
      id: 'experience',
      value: '15+',
      labelAr: 'سنوات خبرة معتمدة',
      subAr: 'في نقل الشقق والفلل والشركات',
      icon: Award,
    },
    {
      id: 'clients',
      value: '16,850+',
      labelAr: 'عائلة تم نقل بيتها',
      subAr: 'بجميع أحياء وكمبوندات القاهرة والجيزة',
      icon: Users,
    },
    {
      id: 'winch',
      value: '2500ج',
      labelAr: 'سعر الونش الهيدروليكي',
      subAr: 'وباقات اقتصادية تناسب نقل الشقق',
      icon: Crown,
    },
    {
      id: 'safety',
      value: '100%',
      labelAr: 'جودة وأمان وسعر عادل',
      subAr: 'فخامة VIP بدون أي مصاريف خفية',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className={`border-y transition-colors duration-300 relative ${
      theme === 'light'
        ? 'bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white border-amber-400/40 shadow-xl'
        : 'bg-gradient-to-r from-[#010817] via-[#02132e] to-[#010817] text-white border-amber-500/30 shadow-2xl'
    }`}>
      {/* Golden Top Glow Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center text-center">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="space-y-1.5 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400 font-mono tracking-tight flex items-center justify-center gap-1">
                  <span>{stat.value}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-white">
                  {stat.labelAr}
                </div>
                <div className="text-xs text-sky-200/80 font-medium">
                  {stat.subAr}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Bottom Glow Line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </div>
  );
};
