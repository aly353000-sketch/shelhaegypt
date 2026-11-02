import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Eye, 
  ZoomIn, 
  Maximize2, 
  RotateCcw,
  Type,
  Minimize2,
  Clock,
  HeartHandshake,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FurnitureTransformationArticle: React.FC = () => {
  const { t, theme } = useApp();

  // Reader Mode state
  const [isReaderMode, setIsReaderMode] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Image modal preview
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);

  // Active step highlight
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const transformationSteps = [
    {
      titleAr: '1. الفحص الدقيق وتنظيف الأنسجة المخملية',
      titleEn: '1. Inspection & Microfiber Surface Cleaning',
      descAr: 'قبل وضع أي مادة تغليف، يتم فحص القماش المخملي والجلد بعناية للتأكد من خلوه من أي شوائب أو أتربة دقيقة قد تلتصق بالأقمشة تحت ضغط التغليف.',
      icon: Sparkles,
      tagAr: 'تهيئة أولية',
    },
    {
      titleAr: '2. درع حماية الأرجل والإطار الذهبي المنحوت',
      titleEn: '2. Carved Gold Leaf & Wooden Leg Shields',
      descAr: 'الأطراف المذهبة والأرجل الخشبية هي الأكثر عرضة للصدمات والخدوش. نضع شرائط فوم عازلة وأغطية كرتون مضلع خاصة على الكعوب لمنع الاحتكاك مع الأرضيات أو جدران السيارات.',
      icon: Layers,
      tagAr: 'حماية الهيكل',
    },
    {
      titleAr: '3. التبطين بفقاقيع بابلز هوائي ممتص للصدمات',
      titleEn: '3. High-Density Air Bubble Shock Absorption',
      descAr: 'تغليف الكرسي برول بابلز 3 طبقات عالي الكثافة لحماية الظهر المنجد والوسادة من أي ضغط أو احتكاك أثناء النقل والتحميل بالسيارات المبطنة.',
      icon: ShieldCheck,
      tagAr: 'امتصاص الصدمات',
    },
    {
      titleAr: '4. العزل المحكم برول استرتش حراري عالي الجودة',
      titleEn: '4. Vacuum-Grade Industrial Stretch Film Sealing',
      descAr: 'الإحكام التام باستخدام استرتش صناعي مطاطي يغلف القطعة مثل الشرنقة، مانعاً تسرب ذرة تراب واحدة أو قطرة مياه أو روائح، ليظل القماش نظيفاً كما تم تسليمه من المعرض.',
      icon: CheckCircle2,
      tagAr: 'عزل 100%',
    },
  ];

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-lg sm:text-xl leading-[2.2]';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-[2.4]';
      default:
        return 'text-base sm:text-lg leading-[2.0]';
    }
  };

  return (
    <section
      id="case-study-article"
      className={`py-16 lg:py-24 text-right transition-colors duration-500 relative ${
        isReaderMode
          ? 'bg-[#fbf7ee] text-[#2c2825]'
          : theme === 'light'
          ? 'bg-slate-50 text-slate-900 border-t border-slate-200'
          : 'bg-[#020b18] text-slate-100 border-t border-blue-900/50'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Reader Mode Bar Controls */}
        <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 shadow-sm transition-colors ${
          isReaderMode
            ? 'bg-[#f4eedb] border-[#e2d8be] text-[#3e3832]'
            : theme === 'light'
            ? 'bg-white border-slate-200 text-slate-700'
            : 'bg-[#031126] border-blue-900/70 text-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsReaderMode(!isReaderMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                isReaderMode
                  ? 'bg-amber-700 text-amber-50 border-amber-800 shadow-md scale-105'
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isReaderMode ? t('الخروج من وضع القراءة', 'Exit Reader Mode') : t('تفعيل وضع القراءة المريح 📖', 'Enable Reader Mode 📖')}</span>
            </button>

            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('وقت القراءة: 3 دقائق', '3 min read')}</span>
            </span>
          </div>

          {/* Reader Mode Typography Controls */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Type className="w-3.5 h-3.5" />
              <span>{t('حجم الخط:', 'Font Size:')}</span>
            </span>
            <div className="flex items-center rounded-lg border overflow-hidden">
              <button
                type="button"
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'normal' 
                    ? 'bg-blue-600 text-white' 
                    : isReaderMode ? 'bg-[#ece3cb] text-[#2c2825]' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title="حجم خط عادي"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('large')}
                className={`px-2.5 py-1 text-sm font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'large' 
                    ? 'bg-blue-600 text-white' 
                    : isReaderMode ? 'bg-[#ece3cb] text-[#2c2825]' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title="خط كبير"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-2.5 py-1 text-base font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'xlarge' 
                    ? 'bg-blue-600 text-white' 
                    : isReaderMode ? 'bg-[#ece3cb] text-[#2c2825]' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
                title="خط كبير جداً"
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Article Title & Intro Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t('دراسة حالة عملية من أرض الواقع | شركة شِلها', 'Real Life Case Study | Shilha Protection')}</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight ${
            isReaderMode ? 'text-[#231f1c]' : theme === 'light' ? 'text-slate-950' : 'text-white'
          }`}>
            {t(
              'سر التحول: كيف نحول أثاثك الفاخر إلى درع حصين يحميه من أي خدش أو أتربة؟',
              'The Secret Transformation: How We Shield Luxury Furniture from Any Scratch or Dust'
            )}
          </h2>

          <p className={`text-sm sm:text-base ${isReaderMode ? 'text-[#4e4741]' : theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {t(
              'شاهد بالصورة الحية من عمليات شِلها كيف تم تغليف هذا الكرسي الصالون الفاخر بحرفية تامة، ولماذا يعتبر التغليف الاحترافي أفضل استثمار لحماية مفروشاتك وذكرياتك.',
              'Live proof from Shilha operations showcasing meticulous chair wrapping and why professional packing is your best furniture investment.'
            )}
          </p>
        </div>

        {/* Featured Live Comparison Image Container with "قبل" and "بعد" */}
        <div className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-all ${
          isReaderMode 
            ? 'border-[#e0d6bd] bg-[#f2ecda]' 
            : theme === 'light' ? 'border-slate-300 bg-white' : 'border-blue-900/80 bg-[#031126]'
        }`}>
          {/* Main Attachment Image */}
          <div className="relative group cursor-pointer" onClick={() => setIsZoomModalOpen(true)}>
            <img
              src="/assets/aistudio/IMG-20261029-WA0039_a33b1140.jpg"
              alt="مقارنة قبل وبعد تغليف الكرسي الفاخر شركة شِلها لنقل الأثاث"
              className="w-full min-h-[360px] sm:min-h-[480px] max-h-[680px] object-cover sm:object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
              loading="lazy"
            />
            
            {/* Hover Prompt to Zoom */}
            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-slate-950/80 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur-md">
                <ZoomIn className="w-4 h-4 text-sky-400" />
                <span>{t('اضغط لتكبير الصورة بدقة كاملة', 'Click to zoom full photo')}</span>
              </span>
            </div>

            {/* Badges Overlay */}
            <div className="absolute top-4 right-4 bg-emerald-600/90 text-white font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
              {t('صورة حقيقية من تنفيذ طاقم شِلها ✅', 'Real Unedited Shilha Crew Work ✅')}
            </div>

            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-950/85 text-white p-3 rounded-2xl border border-sky-400/30 backdrop-blur-md text-xs space-y-1">
              <div className="font-bold text-sky-400">{t('كرسي صالون مخملي بإطار مذهب وأرجل خشبية كلاسيك', 'Luxury Velvet Salon Chair with Gold Trim')}</div>
              <div className="text-slate-300 text-[11px]">{t('يمين: الكرسي قبل التحريك | يسار: الكرسي محكم بالكامل بالبابلز والاسترتش', 'Right: Before moving | Left: Fully armored with multi-layer wrap')}</div>
            </div>
          </div>
        </div>

        {/* In-Depth Article Content with Reader Mode Styling */}
        <article className={`space-y-8 ${getFontSizeClass()} ${
          isReaderMode ? 'font-serif text-[#2c2825]' : ''
        }`}>
          {/* Section 1: The Challenge */}
          <div className="space-y-4">
            <h3 className={`text-xl sm:text-2xl font-black ${
              isReaderMode ? 'text-[#221e1a]' : theme === 'light' ? 'text-blue-950' : 'text-sky-300'
            }`}>
              {t('1. التحدي: لماذا لا يمكن نقل هذا الكرسي كما هو؟', '1. The Challenge: Why This Chair Cannot Be Moved Raw?')}
            </h3>
            <p>
              {t(
                'القطعة الظاهرة في الصورة على اليمين هي كرسي صالون راقٍ، مصنوع من قماش مخملي (قطيفة ناعمة) ذي لونين متناسقين، مع حواف مذهبة مطعمة بأزرار كلاسيكية وأرجل خشبية رقيقة. هذا النوع من الأثاث هو استثمار مكلف وتذكار عائلي ثمين، ونقله بدون تغليف احترافي يمثل مغامرة خطيرة:',
                'The piece on the right is a delicate luxury salon chair made of fine velvet fabric, with gold-leaf trimmed borders and slender wooden legs. Moving it without protection is a high-risk gamble:'
              )}
            </p>

            <ul className="list-disc list-inside space-y-2 pr-2 text-sm sm:text-base font-medium">
              <li>
                <strong className={isReaderMode ? 'text-amber-900' : 'text-sky-400'}>{t('حساسية المخمل للأتربة والبصمات: ', 'Velvet vulnerability: ')}</strong>
                {t('القماش المخملي يمتص الغبار وعرق الأيدي فوراً أثناء رفعه بالسلالم أو تحميله، وتنظيفه لاحقاً قد يترك بقعاً دائمة أو يتلف ملمس الوبرة.', 'Velvet traps dust and sweat instantly during transit, and post-move cleaning can permanently ruin its texture.')}
              </li>
              <li>
                <strong className={isReaderMode ? 'text-amber-900' : 'text-sky-400'}>{t('كشط الدهان الذهبي والمسامير الديكورية: ', 'Gold paint scratching: ')}</strong>
                {t('أي احتكاك بسيط بباب المصعد أو سور السلم يؤدي إلى تقشير اللون الذهبي وتشويه الإطار الدائري الفاخر.', 'Minor contact with elevator doors or stair rails peels the delicate gold finish.')}
              </li>
              <li>
                <strong className={isReaderMode ? 'text-amber-900' : 'text-sky-400'}>{t('كسر أو تجريح الأرجل الخشبية: ', 'Wooden legs impact: ')}</strong>
                {t('الأرجل النحيفة تتعرض لضغط شديد أثناء النقل بالسيارات مع مطبات الطريق إذا لم تُؤمن بوسائد خاصة.', 'Slender legs bear extreme road vibration stress if not securely cushioned.')}
              </li>
            </ul>
          </div>

          {/* Section 2: Step-by-Step Transformation */}
          <div className="space-y-4">
            <h3 className={`text-xl sm:text-2xl font-black ${
              isReaderMode ? 'text-[#221e1a]' : theme === 'light' ? 'text-blue-950' : 'text-sky-300'
            }`}>
              {t('2. كيف حوله فريق "شِلها" إلى الصورة التي تراها على اليسار؟', '2. The Transformation: How Shilha Turned It Into the Armored State?')}
            </h3>
            <p>
              {t(
                'التحول المذهل الظاهر على يسار الصورة لم يكن مجرد لف عشوائي بالبلاستيك، بل عملية هندسية مدروسة نفذها فنيو التغليف لدينا وفق الخطوات الأربع التالية:',
                'The remarkable transformation on the left is not random plastic wrapping; it is a meticulous 4-stage engineering protocol executed by our certified packing technicians:'
              )}
            </p>

            {/* Steps Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              {transformationSteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isReaderMode
                        ? 'bg-[#f4edd9] border-[#e2d8bd] text-[#2c2825]'
                        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700">
                        {step.tagAr}
                      </span>
                    </div>
                    <div className="text-sm font-bold mb-1 text-slate-900">{step.titleAr}</div>
                    <p className="text-xs leading-relaxed text-slate-600">{step.descAr}</p>
                  </div>
                );
              })}
            </div>

            {/* Real Packing Crew Visual Evidence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 not-prose">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <img
                  src="/assets/aistudio/IMG-20261029-WA0010_1__f198d94c.jpg"
                  alt="فريق عمل شِلها الثلاثي يغلف كنبة صالون فاخرة"
                  className="w-full h-52 sm:h-60 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs font-bold text-slate-700">
                  فريق شِلها المتخصص أثناء تغليف الكنب الصالون بالاسترتش والبابلز
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <img
                  src="/assets/aistudio/IMG-20261029-WA0009_1__3127f7b9.jpg"
                  alt="فني تغليف أثاث شِلها يثبت شريط الأمان وشعار الشركة"
                  className="w-full h-52 sm:h-60 object-cover"
                  loading="lazy"
                />
                <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs font-bold text-slate-700">
                  فني التغليف يثبت أشرطة الأمان المقواة على زوايا الأثاث
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: The True ROI and Value */}
          <div className="space-y-4">
            <h3 className={`text-xl sm:text-2xl font-black ${
              isReaderMode ? 'text-[#221e1a]' : theme === 'light' ? 'text-blue-950' : 'text-sky-300'
            }`}>
              {t('3. فايدة وكفاءة التغليف: وفر آلاف الجنيهات وراحة بالك التامة', '3. Packing Efficiency: Saving Thousands & Total Peace of Mind')}
            </h3>
            <p>
              {t(
                'عندما يقرر العميل الاستعانة بشركة شِلها لنقل أثاثه مع خدمة التغليف المعتمدة، فإن هذا الاستثمار الصغير يحقق له عوائد ملموسة تفوق تكلفته بأضعاف:',
                'When choosing Shilha with certified packing, this modest investment yields outsized returns:'
              )}
            </p>

            <div className="space-y-3 pr-2 text-sm sm:text-base">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <strong>{t('توفير تكاليف الصيانة وإعادة التنجيد:', 'Saving Upholstery Repair Costs:')} </strong>
                  <span>{t('إصلاح قطع قماش ممزق أو كشط دهان صالون مذهب في ورش الموبليا يكلف آلاف الجنيهات؛ التغليف يمنع هذا الضرر بنسبة 100%.', 'Fixing torn fabrics or scratched gold trims costs thousands; packing prevents damage 100%.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <strong>{t('الاستقرار الفوري والجاهزية في الشقة الجديدة:', 'Instant Readiness in Your New Home:')} </strong>
                  <span>{t('بمجرد فك الاسترتش في مسكنك الجديد، تستلم أثاثك نظيفاً كأنه خرج للتو من المصنع، دون الحاجة للاتصال بشركات غسيل الكنب أو الانتظار لأيام حتى يجف.', 'Unwrap and enjoy spotless furniture immediately with zero dry-cleaning needed.')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <strong>{t('أمان الرفع بالونش الهيدروليكي وسيارات السفر:', 'Safe Handling by Winch & Long-Distance Trucks:')} </strong>
                  <span>{t('القطعة المغلفة بإحكام تكون محمية بالكامل من أحزمة الونش ومطبات الطرق السريعة بين المحافظات، مما يمنحك راحة نفسية مطلقة.', 'Tightly wrapped pieces remain intact against winch safety harnesses and highway road bumps.')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slogan & Concluding Quote Box */}
          <div className={`p-6 rounded-3xl border-2 shadow-xl ${
            isReaderMode
              ? 'bg-[#f4ecd9] border-amber-600/40 text-[#2c2825]'
              : 'bg-gradient-to-r from-blue-900/30 via-sky-900/20 to-blue-900/30 border-sky-400/50'
          }`}>
            <div className="flex items-center gap-3 mb-2">
              <HeartHandshake className="w-6 h-6 text-amber-400" />
              <h4 className="font-black text-lg sm:text-xl text-sky-400">
                {t('شعارنا الراسخ: "عفشك مش مجرد حاجات.. دي ذكريات وتعب سنين"', 'Our Motto: Your furniture is not just things, it is years of hard work & memories')}
              </h4>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 dark:text-slate-200">
              {t(
                'في شركة شِلها، نتعامل مع كل كرسي وكل كرتونة وكأنها ملك خاص بنا. نحرص على استخدام أفضل رولات البابلز والفيروز الثقيل والاسترتش المقاوم للتمزق، لأن راحتك ورضاك هما أساس نجاحنا.',
                'At Shilha, we treat every single chair and box as our own precious possession, delivering unmatched peace of mind.'
              )}
            </p>
          </div>

        </article>

      </div>

      {/* Full-Screen Zoom Modal for the Chair Photo */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src="/assets/aistudio/IMG-20261029-WA0039_a33b1140.jpg"
              alt="تكبير صورة قبل وبعد تغليف الكرسي الفاخر"
              className="max-h-[80vh] w-auto object-contain rounded-2xl border-2 border-sky-400 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between w-full text-white text-xs px-2">
              <span>{t('قبل وبعد التغليف - شركة شِلها لنقل وتغليف الأثاث', 'Before & After Protection - Shilha Moving')}</span>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
              >
                {t('إغلاق ✕', 'Close ✕')}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
