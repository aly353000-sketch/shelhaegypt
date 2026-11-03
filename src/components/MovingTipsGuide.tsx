import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Car, 
  Refrigerator, 
  FileText, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Luggage, 
  Baby, 
  Truck, 
  Key, 
  CheckCircle2, 
  HelpCircle,
  Lightbulb,
  BookOpen,
  Type
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MovingTipsGuide: React.FC = () => {
  const { t, theme } = useApp();

  // Reader Mode state for tips
  const [isReaderMode, setIsReaderMode] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Interactive Checklist states for pre-moving prep
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    0: true, // Gold & cash checked as reminder
  });

  const toggleCheck = (id: number) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklist = [
    {
      id: 0,
      titleAr: 'نقل الذهب، المجوهرات، والأموال النقدية في سيارتك الخاصة مسبقاً',
      titleEn: 'Transport gold, jewelry, and cash in your personal car beforehand',
      critical: true,
    },
    {
      id: 1,
      titleAr: 'جمع المستندات الرسمية، عقود الملكية، وجوازات السفر في حقيبة يد معك',
      titleEn: 'Keep official papers, title deeds, and passports in your handbag',
      critical: true,
    },
    {
      id: 2,
      titleAr: 'فصل الثلاجة والديب فريزر قبل النقل بـ 12-24 ساعة وتجفيفها تماماً',
      titleEn: 'Unplug and defrost refrigerators & deep freezers 12-24h in advance',
      critical: false,
    },
    {
      id: 3,
      titleAr: 'تجهيز "حقيبة الليلة الأولى" (ملابس، شواحن، أدوية، مستلزمات نظافة)',
      titleEn: 'Prepare "First-Night Bag" (chargers, clothes, personal meds, toiletries)',
      critical: false,
    },
    {
      id: 4,
      titleAr: 'تفريغ محتويات الدواليب والأدراج وتجميع المفاتيح في مكان محدد',
      titleEn: 'Empty drawers and wardrobes, and store all keys in a safe spot',
      critical: false,
    },
    {
      id: 5,
      titleAr: 'التنسيق مع إدارة المبنى أو الكومباوند لحجز مكان لركن سيارة النقل والونش',
      titleEn: 'Coordinate building/compound security for truck & winch parking spot',
      critical: false,
    },
  ];

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-base sm:text-lg leading-[2.2]';
      case 'xlarge':
        return 'text-lg sm:text-xl leading-[2.4]';
      default:
        return 'text-xs sm:text-sm leading-relaxed';
    }
  };

  return (
    <section
      id="prep-guide"
      data-alt-id="moving-tips"
      className={`py-16 lg:py-24 border-t text-right transition-colors duration-500 ${
        isReaderMode
          ? 'bg-[#fbf7ee] text-[#2c2825]'
          : 'bg-slate-50 border-slate-200 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Reader Mode Bar */}
        <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 shadow-sm transition-colors ${
          isReaderMode
            ? 'bg-[#f4eedb] border-[#e2d8be] text-[#3e3832]'
            : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsReaderMode(!isReaderMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                isReaderMode
                  ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-md scale-105'
                  : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isReaderMode ? 'الخروج من وضع القراءة' : 'تفعيل وضع القراءة المريح للنصائح 📖'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-blue-700" />
              <span>حجم الخط:</span>
            </span>
            <div className="flex items-center rounded-lg border border-slate-300 overflow-hidden bg-white shadow-xs">
              <button
                type="button"
                onClick={() => setFontSizeLevel('normal')}
                className={`px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'normal' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('large')}
                className={`px-3 py-1 text-sm font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'large' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-3 py-1 text-base font-bold transition-colors cursor-pointer ${
                  fontSizeLevel === 'xlarge' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                A++
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
            <Lightbulb className="w-4 h-4 text-blue-700" />
            <span>دليل شلها الذهبي قبل يوم النقل</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            نصائح ذهبية لتجهيز بيتك وتأمين مقتنياتك قبل النقل
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-slate-700 max-w-2xl mx-auto">
            حرصاً من شركة شلها على راحتك التامة وأمان ممتلكاتك، نضع بين يديك هذا الدليل الإرشادي المفصل ليوم نقل مريح وهادئ بدون أي مفاجآت.
          </p>
        </div>

        {/* Featured Critical Advice Box: Gold, Money, and Documents - High-Contrast & Clear Colors */}
        <div className={`relative rounded-3xl overflow-hidden border-2 p-6 sm:p-8 shadow-xl transition-all ${
          isReaderMode
            ? 'bg-[#f4ecd9] border-amber-600/70 text-[#2c2825]'
            : 'bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50 border-amber-400 text-slate-900'
        }`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <Car className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-200 border border-amber-400 text-amber-950 px-3.5 py-1 rounded-full text-xs font-black shadow-xs">
                <ShieldAlert className="w-4 h-4 text-amber-900" />
                <span>التوجيه الأهم والأول لسلامة مقتنياتك الخاصة ⚠️</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                انقل الذهب، الأموال، والوثائق الهامة مسبقاً في سيارتك الخاصة!
              </h3>

              <p className={`${getFontSizeClass()} text-slate-800 font-medium leading-relaxed`}>
                المصوغات الذهبية، الساعات الثمينة، المبالغ النقدية، بطاقات الائتمان، عقود الشقق والشهادات الرسمية، وجوازات السفر لا يتم وضعها نهائياً داخل كراتين العفش أو سيارات النقل. نوصي دائماً بوضعها في حقيبة يد مغلقة ونقلها بسيارتك الخاصة قبل وصول طاقم العمل أو الاحتفاظ بها بحوزتك شخصياً طوال عملية النقل.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Step-by-Step Preparation Cards Grid with Crisp High-Contrast Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Refrigerator & Freezers */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <Refrigerator className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              تجهيز الثلاجات والديب فريزر
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              افصل التيار الكهربائي قبل النقل بـ 12 إلى 24 ساعة. قم بإذابة الثلج وتجفيف الأرفف والأدراج تماماً لمنع تسرب المياه أثناء النقل أو صدور روائح كريهة، وتخلص من الأطعمة سريعة التلف.
            </p>
          </div>

          {/* Card 2: Personal Essentials Bag */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <Luggage className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              حقيبة الليلة الأولى (الطوارئ)
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              جهز شنطة سفر صغيرة تحتوي على مستلزمات اليوم الأول: غيار ملابس لكل فرد، شواحن الهواتف، الأدوية الضرورية، أدوات النظافة الشخصية، وزجاجات مياه، حتى لا تضطر لفتح الكراتين في أول ليلة.
            </p>
          </div>

          {/* Card 3: Wardrobes & Drawers */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <Key className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              تفريغ الأدراج وسحب المفاتيح
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              أفرغ جميع المحتويات القابلة للكسر والملابس من الدواليب والكومودينو لتخفيف وزنها. اسحب جميع المفاتيح من الكوالين وضعها في كيس صغير محكم الإغلاق حتى لا تنكسر أو تُفقد أثناء التحريك.
            </p>
          </div>

          {/* Card 4: Parking & Winch Access */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              تأمين مكان الركن ومسار الونش
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              تواصل مع جيرانك أو أمن العمارة/الكومباوند لحجز مكان فارغ أمام المدخل أو أسفل البلكونة لسيارة النقل والونش، وتأكد من سهولة فتح البوابات والمصاعد لتوفير الوقت وسلاسة النقل.
            </p>
          </div>

          {/* Card 5: Kids & Pets Safety */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <Baby className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              أمان الأطفال والحيوانات الأليفة
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              لأمانهم وسلامتهم التامة، يُفضل أن يقضي الأطفال الصغار يوم النقل في ضيافة الأقارب أو في غرفة خاصة هادئة بعيداً عن مسارات حركة العمال والسلالم حتى اكتمال نقل وتنزيل الأثاث بالكامل.
            </p>
          </div>

          {/* Card 6: Labelling & Organization */}
          <div className="p-6 rounded-2xl border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black mb-2 text-slate-900">
              ترقيم وتسمية الكراتين
            </h4>
            <p className={`${getFontSizeClass()} text-slate-700 font-normal leading-relaxed`}>
              اكتب اسم الغرفة على كل كرتونة (مثال: "مطبخ"، "غرفة أطفال")، وضع علامة واضحة "قابل للكسر" على كراتين الزجاج والأنتيكات ليقوم طاقم شلها بوضعها في مكانها المحدد في شقتك الجديدة مباشرة.
            </p>
          </div>

        </div>

        {/* Interactive Pre-Moving Checklist Box - High Contrast Colors */}
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                القائمة التفقدية السريعة قبل وصول طاقم شلها
              </h3>
              <p className="text-xs sm:text-sm mt-1 text-slate-600">
                علّم على المهام التي قمت بإنجازها لتتأكد من جاهزيتك التامة بنسبة 100%:
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-900 border border-blue-300 font-black px-3.5 py-1.5 rounded-full shadow-xs">
              {Object.values(checkedItems).filter(Boolean).length} / {checklist.length} مكتمل ✓
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-6">
            {checklist.map((item) => {
              const isChecked = Boolean(checkedItems[item.id]);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'bg-blue-50/80 border-blue-400 shadow-sm text-slate-900'
                      : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-blue-600 fill-blue-100" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'text-blue-950 font-black' : 'text-slate-800'}`}>
                      {item.titleAr}
                    </span>
                    {item.critical && (
                      <span className="text-[11px] bg-amber-100 text-amber-950 border border-amber-300 px-2 py-0.5 rounded-md font-black mt-1.5 inline-block">
                        ⚡ أولوية قصوى قبل النقل
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
