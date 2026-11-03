import React, { useState } from 'react';
import { ShieldCheck, Zap, ArrowUp, Layers, CheckCircle2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HydraulicWinchIllustration: React.FC = () => {
  const { t, theme } = useApp();
  const [activeTab, setActiveTab] = useState<'illustration' | 'photo'>('illustration');

  return (
    <div className={`rounded-3xl border overflow-hidden shadow-2xl transition-all duration-300 ${
      theme === 'light'
        ? 'bg-white border-blue-200'
        : 'bg-[#031126] border-blue-800/70'
    }`}>
      {/* Header bar with toggle */}
      <div className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-2 ${
        theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-blue-900/60'
      }`}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span className="text-xs sm:text-sm font-black text-sky-500">
            {t('منظومة الونش الهيدروليكي المحمل بالأثاث', 'Hydraulic Furniture Winch System')}
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('illustration')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'illustration'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
            }`}
          >
            {t('رسم توضيحي محمل بالعفش', 'Technical Diagram')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-500'
            }`}
          >
            {t('صورة ميدانية', 'Field Photo')}
          </button>
        </div>
      </div>

      {activeTab === 'illustration' ? (
        <div className="relative p-4 sm:p-6 bg-gradient-to-b from-sky-950 via-[#031126] to-[#020b18] text-white">
          {/* Top Indicators */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 pointer-events-none">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" />
              {t('حمولة قصوى 400 كجم', 'Max Load 400 kg')}
            </span>
            <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-400/40">
              {t('يصل حتى الدور 25 (75 متر)', 'Reach up to floor 25')}
            </span>
          </div>

          {/* SVG Vector Technical Illustration of Hydraulic Winch Lifting Wrapped Furniture */}
          <div className="relative w-full aspect-[4/3] max-h-[380px] flex items-center justify-center">
            <svg
              viewBox="0 0 600 450"
              className="w-full h-full drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0c2340" />
                  <stop offset="100%" stopColor="#030c1d" />
                </linearGradient>
                <linearGradient id="boomGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="truckGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="sofaGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
              </defs>

              {/* Background Sky & Grid */}
              <rect width="600" height="450" rx="16" fill="url(#skyGrad)" />
              <g opacity="0.08" stroke="#38bdf8" strokeWidth="1">
                <line x1="0" y1="75" x2="600" y2="75" />
                <line x1="0" y1="150" x2="600" y2="150" />
                <line x1="0" y1="225" x2="600" y2="225" />
                <line x1="0" y1="300" x2="600" y2="300" />
                <line x1="0" y1="375" x2="600" y2="375" />
                <line x1="120" y1="0" x2="120" y2="450" />
                <line x1="240" y1="0" x2="240" y2="450" />
                <line x1="360" y1="0" x2="360" y2="450" />
                <line x1="480" y1="0" x2="480" y2="450" />
              </g>

              {/* High-Rise Residential Tower on the Right (Destination Balcony) */}
              <g id="building">
                <rect x="420" y="20" width="160" height="400" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                {/* Windows and Balconies */}
                {[40, 100, 160, 220, 280, 340].map((y, i) => (
                  <g key={i}>
                    <rect x="440" y={y} width="40" height="35" rx="3" fill="#1e293b" stroke="#334155" />
                    <rect x="495" y={y} width="65" height="35" rx="3" fill="#1e293b" stroke="#334155" />
                    {/* Window Lights */}
                    <rect x="445" y={y + 5} width="14" height="25" fill="#fef08a" opacity={i % 2 === 0 ? "0.8" : "0.3"} />
                    <rect x="463" y={y + 5} width="14" height="25" fill="#fef08a" opacity={i % 2 === 0 ? "0.6" : "0.2"} />
                  </g>
                ))}
                {/* Destination Balcony Target at Floor 12 (y: 100) */}
                <rect x="480" y="95" width="80" height="8" fill="#38bdf8" />
                <line x1="480" y1="80" x2="560" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="520" y="72" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  شرفة الدور المستهدف
                </text>
              </g>

              {/* Ground & Asphalt */}
              <rect x="0" y="410" width="600" height="40" fill="#1e293b" />
              <line x1="0" y1="410" x2="600" y2="410" stroke="#334155" strokeWidth="3" />
              <line x1="0" y1="430" x2="600" y2="430" stroke="#facc15" strokeWidth="3" strokeDasharray="20 15" />

              {/* Winch Truck Base parked on street */}
              <g id="truck">
                {/* Hydraulic Outriggers (Stabilizer Legs) planted on ground */}
                <polygon points="60,410 70,410 80,380 70,380" fill="#f59e0b" stroke="#000" strokeWidth="1" />
                <rect x="55" y="405" width="20" height="7" rx="2" fill="#334155" />

                <polygon points="210,410 220,410 230,380 220,380" fill="#f59e0b" stroke="#000" strokeWidth="1" />
                <rect x="205" y="405" width="20" height="7" rx="2" fill="#334155" />

                {/* Truck Chassis */}
                <rect x="60" y="340" width="180" height="45" rx="6" fill="url(#truckGrad)" stroke="#0284c7" strokeWidth="2" />
                {/* Truck Cabin */}
                <path d="M 60,340 L 60,385 L 115,385 L 115,325 L 90,325 Z" fill="#0369a1" stroke="#0284c7" strokeWidth="1.5" />
                {/* Windshield */}
                <polygon points="65,342 85,330 110,330 110,350 65,350" fill="#e0f2fe" opacity="0.8" />
                {/* Wheels */}
                <circle cx="90" cy="385" r="16" fill="#0f172a" stroke="#475569" strokeWidth="4" />
                <circle cx="90" cy="385" r="6" fill="#94a3b8" />
                <circle cx="195" cy="385" r="16" fill="#0f172a" stroke="#475569" strokeWidth="4" />
                <circle cx="195" cy="385" r="6" fill="#94a3b8" />

                {/* Company Name on Truck */}
                <text x="160" y="365" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                  شلها
                </text>
                <text x="160" y="376" fill="#bae6fd" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  ونش هيدروليكي معتمد
                </text>

                {/* Rotating Turntable / Hydraulic Turret */}
                <ellipse cx="180" cy="336" rx="28" ry="8" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                <rect x="168" y="318" width="24" height="20" rx="3" fill="#475569" />
              </g>

              {/* Telescopic Hydraulic Boom / Ladder extending at ~55-degree angle towards building */}
              <g id="ladder_boom">
                {/* Heavy Main Boom Base */}
                <line x1="180" y1="325" x2="480" y2="95" stroke="#475569" strokeWidth="22" strokeLinecap="round" />
                {/* Telescopic Extension Rails (Yellow / Amber) */}
                <line x1="180" y1="325" x2="480" y2="95" stroke="url(#boomGrad)" strokeWidth="16" strokeLinecap="round" />
                {/* Internal Hydraulic Ladder Rungs */}
                {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((ratio, idx) => {
                  const x = 180 + (480 - 180) * ratio;
                  const y = 325 + (95 - 325) * ratio;
                  return (
                    <circle key={idx} cx={x} cy={y} r="2.5" fill="#ffffff" />
                  );
                })}
                {/* Main Hydraulic Piston Cylinder under boom */}
                <line x1="150" y1="340" x2="230" y2="280" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
                <line x1="230" y1="280" x2="255" y2="260" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" />
              </g>

              {/* The Ascending Winch Carriage Platform Carrying Strapped Furniture! */}
              {/* Positioned midway up at ratio ~0.65 */}
              <g id="winch_platform" transform="translate(370, 175) rotate(-37)">
                {/* Wheeled guide carriage on tracks */}
                <rect x="-30" y="-8" width="60" height="14" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="-22" cy="7" r="4" fill="#64748b" />
                <circle cx="22" cy="7" r="4" fill="#64748b" />

                {/* Level Tilting Platform Tray */}
                <g transform="rotate(37)">
                  {/* Heavy-duty steel platform floor */}
                  <rect x="-65" y="0" width="130" height="10" rx="2" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
                  {/* Safety side rails */}
                  <line x1="-63" y1="0" x2="-63" y2="-25" stroke="#f59e0b" strokeWidth="3" />
                  <line x1="63" y1="0" x2="63" y2="-25" stroke="#f59e0b" strokeWidth="3" />
                  <line x1="-63" y1="-25" x2="63" y2="-25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />

                  {/* Wrapped Luxury Sofa on Platform (Bubble Wrap & Stretch Sheen) */}
                  <rect x="-55" y="-50" width="70" height="48" rx="6" fill="url(#sofaGrad)" stroke="#38bdf8" strokeWidth="2" />
                  {/* Bubble wrap pattern texture on sofa */}
                  <circle cx="-40" cy="-35" r="3" fill="#ffffff" opacity="0.7" />
                  <circle cx="-30" cy="-35" r="3" fill="#ffffff" opacity="0.7" />
                  <circle cx="-20" cy="-35" r="3" fill="#ffffff" opacity="0.7" />
                  <circle cx="-40" cy="-22" r="3" fill="#ffffff" opacity="0.7" />
                  <circle cx="-30" cy="-22" r="3" fill="#ffffff" opacity="0.7" />
                  <circle cx="-20" cy="-22" r="3" fill="#ffffff" opacity="0.7" />

                  {/* Heavy Duty Moving Boxes Next to Sofa */}
                  <rect x="18" y="-45" width="40" height="43" rx="3" fill="#d97706" stroke="#92400e" strokeWidth="1.5" />
                  {/* Shilha box label */}
                  <text x="38" y="-24" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                    شلها
                  </text>
                  <text x="38" y="-14" fill="#fef08a" fontSize="5" textAnchor="middle" fontFamily="sans-serif">
                    FRAGILE ⚠️
                  </text>

                  {/* Bright Orange Heavy-Duty Ratchet Tie-Down Straps */}
                  <line x1="-58" y1="-2" x2="60" y2="-45" stroke="#ea580c" strokeWidth="2.5" />
                  <line x1="58" y1="-2" x2="-55" y2="-45" stroke="#ea580c" strokeWidth="2.5" />

                  {/* Upward Movement Motion Waves */}
                  <g opacity="0.8">
                    <line x1="0" y1="-62" x2="0" y2="-76" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                    <polyline points="-6,-68 0,-76 6,-68" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </g>
              </g>

              {/* Safety Distance Cones on Street */}
              <polygon points="35,410 45,410 40,395" fill="#f97316" stroke="#ffffff" strokeWidth="1" />
              <polygon points="260,410 270,410 265,395" fill="#f97316" stroke="#ffffff" strokeWidth="1" />

              {/* Ground Operator Controlling Winch via Remote Console */}
              <g id="operator" transform="translate(285, 360)">
                {/* Body */}
                <rect x="-8" y="16" width="16" height="26" rx="3" fill="#6e0f24" />
                {/* Head with cap */}
                <circle cx="0" cy="8" r="7" fill="#fbcfe8" />
                <path d="M -8,5 Q 0,0 8,5 L 12,5 L 8,9 L -8,9 Z" fill="#000000" />
                {/* Remote control unit */}
                <rect x="8" y="20" width="10" height="7" rx="1" fill="#facc15" />
                <line x1="13" y1="20" x2="13" y2="15" stroke="#ffffff" strokeWidth="1" />
              </g>

              {/* Technical Callout Badges */}
              <g id="callouts">
                <rect x="20" y="20" width="150" height="48" rx="8" fill="#0f172a" opacity="0.9" stroke="#38bdf8" strokeWidth="1" />
                <text x="32" y="38" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                  منظومة الصعود الآمن:
                </text>
                <text x="32" y="52" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">
                  • صينية مانعة للانزلاق ومبطنة
                </text>
                <text x="32" y="62" fill="#e2e8f0" fontSize="8" fontFamily="sans-serif">
                  • أحزمة تثبيت مزدوجة ومحكمة
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Descriptive Caption */}
          <div className="pt-4 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-sky-300 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('صورة توضيحية: ونش شلها الهيدروليكي يرفع طقم كنب وكراتين مع أحزمة أمان متطورة', 'Illustration: Shilha Winch Lifting Wrapped Sofa & Boxes with Safety Straps')}</span>
            </div>
            <span className="text-[11px] text-slate-400">
              {t('سرعة وأمان 100% بدون تجريح الجدران أو السلالم', 'Zero scratch on narrow stairs & elevators')}
            </span>
          </div>
        </div>
      ) : (
        /* Real Field Photo of Hydraulic Winch */
        <div className="relative p-2 bg-slate-950">
          <div className="rounded-2xl overflow-hidden max-h-[420px] flex items-center justify-center">
            <img
              src="/assets/aistudio/FB_IMG_1793231505624_3f6ca3c9.jpg"
              alt={t('أوناش رفع الأثاث الهيدروليكية لشركة شلها لنقل العفش', 'Shilha Hydraulic Winch Real Field Photo')}
              className="w-full h-auto object-cover object-center"
              loading="lazy"
            />
          </div>
          <div className="p-3 text-center text-xs font-bold text-slate-300">
            {t('منظومة شلها الميدانية: شاحنة النقل المغلقة والونش الهيدروليكي في خدمة عميل بمصر', 'Shilha Field Team: Closed Padded Truck & Hydraulic Winch on Duty')}
          </div>
        </div>
      )}
    </div>
  );
};
