import React, { useState } from 'react';
import { 
  RotateCw, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Layers, 
  Wrench, 
  Wind, 
  Boxes, 
  Gem,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface FlipCardItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  specs: string;
  whatsappMessage: string;
}

export const InteractiveServicesFlipCards: React.FC = () => {
  const { t } = useApp();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const cards: FlipCardItem[] = [
    {
      id: 'trucks',
      title: 'نقل الأثاث بسيارات مغلقة ومجهزة',
      subtitle: 'عربيات مقفولة ومبطنة تحمي العفش من التراب والمطبات طول الطريق',
      badge: 'أسطول VIP مبطن',
      image: '/assets/images/royal_movers_workers_loading.jpg',
      icon: Truck,
      features: [
        'صناديق شاحنات مغلقة ومعزولة 100% ضد الأتربة والأمطار وحرارة الشمس',
        'تبطين داخلي كامل بشرائح خشبية سويدي وأحزمة أمان مطاطية لتثبيت المنقولات',
        'سائقون محترفون ملتزمون بتهدئة السرعة والقيادة الآمنة بين المحافظات والكمبوندات',
        'مقاسات سيارات تناسب الشقق الصغيرة والكبيرة والفلل في نقلة واحدة اقتصادية'
      ],
      specs: 'سيارات جامبو ودبابة مجهزة ومبطنة مرخصة ومصرح لها بدخول كافة الكمبوندات',
      whatsappMessage: 'السلام عليكم، أرغب في حجز سيارة نقل عفش مغلقة ومبطنة من رويال موفرز VIP',
    },
    {
      id: 'winch',
      title: 'أوناش هيدروليكية حديثة للأدوار العليا',
      subtitle: 'رفع وتنزيل آمن حتى الدور 25 من غير خبط في السلالم أو جدران العمارات',
      badge: 'يبدأ من 2500 ج.م فقط',
      image: '/assets/images/royal_winch_villa.jpg',
      icon: Layers,
      features: [
        'حماية قصوى للأثاث الضخم والرخام والزجاج من ضيق السلالم والمصاعد',
        'أقصى ارتفاع هيدروليكي فائق الأمان يصل حتى الطابق الـ 25',
        'منصة رفع واسعة ومؤمنة بأحزمة مطاطية لامتصاص الاهتزازات تماماً',
        'مشغلون ومهندسو أوناش معتمدون بخبرة تفوق 12 عاماً في الأبراج والفلل'
      ],
      specs: 'حمولة تصل إلى 400 كجم في الرفعة الواحدة، وإنجاز شقة كاملة في أقل من ساعتين',
      whatsappMessage: 'السلام عليكم، أرغب في حجز ونش رفع أثاث هيدروليكي بسعر يبدأ من 2500ج مع رويال موفرز VIP',
    },
    {
      id: 'carpentry',
      title: 'فنيون ونجارون لفك وتركيب الأثاث والمطابخ',
      subtitle: 'فك وتركيب الدواليب الإيطالية، النيش، والمطابخ وغرف النوم المودرن باحترافية',
      badge: 'نجارون متخصصون',
      image: '/assets/images/royal_movers_carpenter_vip.jpg',
      icon: Wrench,
      features: [
        'خبرة عميقة في فك غرف النوم الإيطالية والمودرن وغرف الأطفال والدواليب الجرار',
        'ترقيم دقيق لكل قطعة ومسمار في أكياس مخصصة لضمان التركيب الأصلي الدقيق',
        'فك وتركيب المطابخ الخشب والألوميتال وضبط مفصلات الأبواب بدقة متناهية',
        'تثبيت الستائر، البلتكانات، واللوحات الديكورية في المنزل الجديد فورياً'
      ],
      specs: 'أدوات ومعدات نجارة ألمانية حديثة تحافظ على الأخشاب والدهانات دون أي تجريح',
      whatsappMessage: 'السلام عليكم، استفسار عن خدمات فك وتركيب الأثاث والمطابخ مع نجارين رويال موفرز VIP',
    },
    {
      id: 'ac',
      title: 'فنيو تكييف وأجهزة كهربائية معتمدة',
      subtitle: 'فك وتركيب التكييف بعناية مع حفظ شحنة الفريون وضمان التشغيل الفوري',
      badge: '800 ج.م للوحدة ❄️',
      image: '/assets/images/royal_ac_technician.jpg',
      icon: Wind,
      features: [
        'فك وحدات التكييف الداخلية والخارجية باحترافية مع غلق محابس الفريون',
        'نقل التكييف وإعادة تركيبه وضبط ميزان المياه لتفادي أي تنقيط',
        'فحص ضغط الشحنة وضمان تشغيل التبريد بأعلى كفاءة فور انتهاء التركيب',
        'فنيو كهرباء متخصصون لفك النجف الكريستال، الشفاطات، والوصلات الكهربائية'
      ],
      specs: 'فنيون مدربون بخبرة أكثر من 10 سنوات في صيانة وتثبيت كبرى ماركات التكييف',
      whatsappMessage: 'السلام عليكم، أرغب في حجز خدمة فك وتركيب تكييف مع رويال موفرز VIP',
    },
    {
      id: 'delicate',
      title: 'نقل وتغليف المقتنيات والتحف الحساسة',
      subtitle: 'عناية فائقة بالزجاج، الأطقم الصيني، النجف الكريستال، والقطع القابلة للكسر',
      badge: 'عناية فائقة 💎',
      image: '/assets/images/royal_delicate_packing.jpg',
      icon: Gem,
      features: [
        'تغليف كل كأس، طبق صيني، وقطعة كريستال منفردة ببابلز الفيروز الثقيل',
        'رص محكم داخل كراتين نيش مبطنة مع ملء الفراغات لمنع أي احتكاك',
        'فك ونقل النجف الكريستال الفاخر في صناديق خشبية مبطنة مخصصة للثريات',
        'قفازات بيضاء خاصة للتعامل مع المقتنيات الملكية دون ترك أي أثر'
      ],
      specs: 'ضمان كامل على سلامة كافة الكريستالات والأطقم الصيني من أي تلف أو كسر',
      whatsappMessage: 'السلام عليكم، أرغب في حجز خدمة نقل وتغليف المقتنيات الحساسة مع رويال موفرز VIP',
    },
    {
      id: 'packing',
      title: 'تغليف الصالونات والأنتريهات الفاخرة',
      subtitle: 'طبقات متعددة من البابلز والاسترتش المقاوم للصدمات لحماية الأقمشة والجلد',
      badge: 'بابلز واسترتش VIP',
      image: '/assets/images/royal_movers_sofa_wrap.jpg',
      icon: Boxes,
      features: [
        'حماية كاملة لأقمشة الصالونات والجلد الطبيعي من أي غبار أو اتساخ أثناء النقل',
        'تدعيم الزوايا الكرتونية المقواة لمنع خدش أرجل الخشب المذهب واللاكيه',
        'إحكام لف الاسترتش بشرائط لاصقة رسمية تحافظ على ثبات التغليف طوال الطريق',
        'خامات تغليف مستوردة عديمة الرائحة لا تترك أي أثر على الأثاث'
      ],
      specs: 'استخدام رولات بابلز الفيروز الثقيل 3 طبقات ممتص للصدمات ومقاوم للخدوش',
      whatsappMessage: 'السلام عليكم، أرغب في معرفة تفاصيل تغليف الصالونات مع رويال موفرز VIP',
    },
  ];

  return (
    <section id="interactive-services" className="py-16 lg:py-24 text-right bg-gradient-to-b from-[#020b18] via-[#03142e] to-[#020b18] border-t border-blue-900/50 text-white relative">
      <div id="services" className="scroll-mt-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black px-5 py-2 rounded-full shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('كل ما تحتاجه لنقل وتغليف عفش بيتك في فريق متكامل 👑', 'All-in-One VIP Moving & Packing Solutions')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            {t('خدمات رويال موفرز VIP المتكاملة.. اضغط على أي كارت للتفاصيل!', 'Interactive VIP Moving Services - Tap to Flip!')}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            {t(
              'اضغط على أي كارت بالكامل لرؤية المواصفات والأسعار ومواد التغليف المعتمدة مع إمكانية الحجز المباشر عبر واتساب.',
              'Click anywhere on the card to flip and view full VIP specifications.'
            )}
          </p>

          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-amber-300 bg-amber-500/10 border border-amber-400/40 px-5 py-2 rounded-full shadow-xs animate-pulse">
            <RotateCw className="w-4 h-4 text-amber-400" />
            <span>انقر على الكارت من أي مكان لقلبه 180 درجة ورؤية المواصفات 🔄</span>
          </div>
        </div>

        {/* 3D Interactive Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {cards.map((card) => {
            const isFlipped = Boolean(flippedCards[card.id]);
            const IconComponent = card.icon;

            return (
              <div 
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-[490px] sm:h-[510px] cursor-pointer group select-none relative"
                style={{ perspective: '1200px' }}
                title="اضغط لقلب الكارت ورؤية التفاصيل"
              >
                {/* Flipping Container */}
                <div
                  className="relative w-full h-full rounded-3xl shadow-2xl transition-all duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  
                  {/* FRONT SIDE */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border-2 flex flex-col justify-between transition-all bg-[#03142e] border-blue-900/80 shadow-2xl group-hover:border-amber-400/80"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isFlipped ? 'none' : 'auto',
                    }}
                  >
                    {/* Top Image Container */}
                    <div className="relative h-60 sm:h-64 overflow-hidden shrink-0">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#03142e] via-slate-950/40 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3.5 right-3.5 left-3.5 flex items-center justify-between">
                        <span className="bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-lg flex items-center gap-1">
                          <span>👑</span>
                          <span>{card.badge}</span>
                        </span>

                        {/* Flip Button on Front */}
                        <button
                          type="button"
                          onClick={(e) => toggleFlip(card.id, e)}
                          className="bg-slate-950/85 hover:bg-amber-400 hover:text-slate-950 text-white p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg cursor-pointer flex items-center gap-1.5 text-xs font-black border border-white/20 active:scale-95"
                          title="اقلب الكارت للتفاصيل"
                        >
                          <RotateCw className="w-4 h-4 text-amber-400 hover:text-slate-950" />
                          <span>اقلب الكارت</span>
                        </button>
                      </div>

                      {/* Icon overlay on bottom right of image */}
                      <div className="absolute bottom-3 right-4 bg-gradient-to-br from-blue-700 to-sky-600 text-white p-3 rounded-2xl shadow-lg border border-white/20">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Content on Front */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-amber-300 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Tap to flip prompt */}
                      <div className="w-full mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white font-black py-3 px-4 rounded-2xl text-xs sm:text-sm shadow-md group-hover:scale-[1.02] transition-transform">
                        <RotateCw className="w-4 h-4 text-amber-300 animate-spin-slow" />
                        <span>اضغط لقلب الكارت ورؤية تفاصيل VIP 🔄</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between border-2 shadow-2xl bg-gradient-to-br from-[#020b18] via-[#041635] to-[#020b18] text-white border-amber-400"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      pointerEvents: isFlipped ? 'auto' : 'none',
                    }}
                  >
                    {/* Back Header */}
                    <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-amber-400">
                            {card.title}
                          </h4>
                          <span className="text-[11px] text-sky-200 font-bold block">
                            جودة VIP المعتمدة للشقق والفلل بسعر مناسب
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(card.id, e)}
                        className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1 shadow-md active:scale-95"
                        title="اقلب الكارت للواجهة"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>الواجهة</span>
                      </button>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 py-2 overflow-y-auto max-h-56 pr-1 text-right">
                      {card.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Specifications Pill */}
                    <div className="p-3 rounded-2xl bg-blue-950/80 border border-blue-800/80 text-[11px] sm:text-xs text-sky-200 leading-relaxed font-bold">
                      <span className="text-amber-400 ml-1">المواصفات الفنية:</span>
                      {card.specs}
                    </div>

                    {/* Quick WhatsApp Booking from back of card */}
                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(card.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-3 rounded-xl text-xs shadow-md transition-all active:scale-95"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>احجز هذه الخدمة واتساب</span>
                      </a>

                      <a
                        href={`tel:${COMPANY_DATA.phones[0].number}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white shadow-md transition-all active:scale-95"
                        title="اتصل الآن"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
