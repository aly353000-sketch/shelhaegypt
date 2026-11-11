import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Car, 
  Refrigerator, 
  FileText, 
  Luggage, 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Baby, 
  Lightbulb, 
  CheckSquare, 
  Square,
  Phone,
  BookmarkCheck
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface GoldenTipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoldenTipsModal: React.FC<GoldenTipsModalProps> = ({ isOpen, onClose }) => {
  const { t, theme } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'valuables' | 'appliances' | 'bags' | 'packing' | 'building'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'v1': true, // Pre-checked as golden reminder
    'v2': true,
  });

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', label: 'جميع النصائح', icon: Sparkles },
    { id: 'valuables', label: 'الذهب والمقتنيات الثمينة', icon: ShieldAlert },
    { id: 'appliances', label: 'تجهيز الأجهزة والثلاجات', icon: Refrigerator },
    { id: 'bags', label: 'حقيبة الليلة الأولى', icon: Luggage },
    { id: 'packing', label: 'الفرز والكراتين', icon: BookmarkCheck },
    { id: 'building', label: 'تأمين مكان الونش', icon: Truck },
  ];

  const tipsList = [
    {
      id: 'v1',
      category: 'valuables',
      tag: 'أهم نصيحة ذهبية ⚠️',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      title: 'انقل الذهب، المجوهرات، والأموال النقدية في سيارتك الخاصة مسبقاً',
      content: 'القاعدة الأولى لدى خبراء نقل الأثاث: لا تترك أي قطعة ذهب، ساعة ثمينة، أو مبالغ نقدية داخل الدواليب أو الخزائن أو الكراتين مهما كانت مقفلة. ضعها في حقيبتك الشخصية وانقلها بسيارتك الخاصة قبل يوم النقل أو احتفظ بها لدى شخص موثوق من عائلتك لتجنب أي قلق أو شبهة.',
      important: true,
    },
    {
      id: 'v2',
      category: 'valuables',
      tag: 'مستندات وأوراق رسمية 📄',
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300 font-black',
      title: 'عقود الملكية، جوازات السفر، وشهادات الميلاد في ملف يدوي معك',
      content: 'اجمع كافة الأوراق والشهادات والوثائق البنكية وعقود الشقة في شنطة يد مخصصة، واصطحبها معك طوال يوم النقل. ضياع ورقة رسمية وسط مئات الكراتين يسبب صداعاً كبيراً يمكن تجنبه بسهولة.',
      important: true,
    },
    {
      id: 'a1',
      category: 'appliances',
      tag: 'الأجهزة الكهربائية ❄️',
      tagColor: 'bg-sky-100 text-sky-950 border-sky-300 font-bold',
      title: 'افصل الثلاجة والديب فريزر قبل موعد النقل بـ 12 إلى 24 ساعة',
      content: 'تفريغ محتويات الثلاجة والفريزر وفصل الكهرباء يتيح إذابة الثلج وتجفيف المياه تماماً حتى لا تسيل داخل سيارة النقل على باقي الأثاث. بعد وصولها للمنزل الجديد، اترك الثلاجة واقفة لمدة 3 إلى 4 ساعات قبل توصيل الكهرباء ليستقر زيت الضاغط (الكومبروسر).',
      important: false,
    },
    {
      id: 'a2',
      category: 'appliances',
      tag: 'التكييفات والشاشات 📺',
      tagColor: 'bg-blue-100 text-blue-950 border-blue-300 font-bold',
      title: 'صوّر توصيلات الأسلاك وخلفيات الشاشات بالموبايل قبل الفك',
      content: 'التقط صورة واضحة للأسلاك وتوصيلات الرسيفر والواي فاي والمسرح المنزلي قبل فكها. هذا يوفر عليك ساعات عند إعادة التوصيل. واحرص على فك التكييف بأيدي فني معتمد (متوفر لدينا في رويال موفرز) لحفظ شحنة غاز الفريون.',
      important: false,
    },
    {
      id: 'b1',
      category: 'bags',
      tag: 'شنطة الطوارئ 🧳',
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-bold',
      title: 'جهّز "حقيبة اليوم الأول" لكل فرد في الأسرة',
      content: 'في أول ليلة بالمنزل الجديد، ستكون متعباً ولن تبحث داخل 30 كرتونة عن بيجامة أو شاحن موبايل! جهّز شنطة سفر صغيرة تحتوي على: ملابس مريحة لليوم الأول، شواحن الهواتف، أدويتك اليومية، فرشاة ومعجون الأسنان، ومستلزمات الأطفال الأساسية.',
      important: false,
    },
    {
      id: 'p1',
      category: 'packing',
      tag: 'تنظيم وفرز 📦',
      tagColor: 'bg-purple-100 text-purple-950 border-purple-300 font-bold',
      title: 'اكتب اسم الغرفة على كل كرتونة وعلامة "قابل للكسر" بوضوح',
      content: 'استخدم قلماً عريضاً واكتب بوضوح على كل كرتونة (مثال: "مطبخ - صيني قابل للكسر"، "غرفة نوم أطفال"). هذا يتيح لطاقم رويال موفرز وضع الكراتين فوراً في الغرفة المحددة لها بالمنزل الجديد بدلاً من تكديسها في الصالة.',
      important: false,
    },
    {
      id: 'p2',
      category: 'packing',
      tag: 'توفير التكلفة والجهد 💡',
      tagColor: 'bg-teal-100 text-teal-950 border-teal-300 font-bold',
      title: 'تخلص من الكراكيب والأغراض غير المستخدمة قبل أسبوع من النقل',
      content: 'النقل فرصة ذهبية لبداية جديدة! لا تدفع مصاريف نقل وتغليف على كراكيب أو ملابس لم تعد ترتديها منذ 3 سنوات. تبرع بها أو تخلص منها قبل النقل لتقليل عدد السيارات والكراتين وتوفير تكاليف النقل.',
      important: false,
    },
    {
      id: 'u1',
      category: 'building',
      tag: 'الشارع والونش 🅿️',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-bold',
      title: 'نسّق مع حارس العقار أو أمن الكومباوند لتأمين مكان سيارة النقل والونش',
      content: 'قبل موعد النقل بيوم، أبلغ حارس العقار والجيران بحجز مسافة خالية أمام مدخل العمارة أو أسفل البلكونة لسيارة النقل والونش الهيدروليكي، للتأكد من عدم وجود سيارات تعيق نصب ونش الرفع.',
      important: false,
    },
    {
      id: 'u2',
      category: 'building',
      tag: 'راحة وأمان الأطفال 👶',
      tagColor: 'bg-rose-100 text-rose-950 border-rose-300 font-bold',
      title: 'أبقِ الأطفال الصغار والحيوانات الأليفة في مكان آمن يوم النقل',
      content: 'حركة العمال ونقل القطع الثقيلة والأبواب المفتوحة قد تسبب توتراً أو خطراً على الأطفال الصغار والحيوانات الأليفة. من الأفضل تواجدهم لدى الأقارب أو الأصدقاء خلال ساعات العمل.',
      important: false,
    },
  ];

  const filteredTips = activeTab === 'all' 
    ? tipsList 
    : tipsList.filter(t => t.category === activeTab);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden my-auto text-right transition-colors ${
          theme === 'light' ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#031126] border-blue-800 text-slate-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 p-5 sm:p-7 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow">
              <Lightbulb className="w-4 h-4 fill-current" />
              <span>{t('دليل رويال موفرز الذهبي المجاني قبل يوم النقل', 'Free Golden Pre-Moving Advice')}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black">
              {t('نصائح ذهبية لتجهيز شقتك وتأمين مقتنياتك قبل النقل', 'Golden Tips to Prepare Your Apartment & Valuables')}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {t(
                'اقرأ هذه النصائح بتركيز وطبقها لتجربة نقل هادئة ومريحة بنسبة 100% بدون أي تلفيات أو توتر أو مفاجآت.',
                'Read and apply these expert tips to ensure a 100% peaceful move with zero surprises.'
              )}
            </p>
          </div>
        </div>

        {/* Categories Pills */}
        <div className={`p-3 sm:p-4 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-blue-900/60'
        }`}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id as any)}
                className={`whitespace-nowrap flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : theme === 'light'
                    ? 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-blue-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tips Content Scrollable Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {filteredTips.map((tip) => {
            const isChecked = !!checkedItems[tip.id];
            return (
              <div 
                key={tip.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  tip.important
                    ? 'border-2 border-amber-400 bg-amber-50/90 shadow-md ring-1 ring-amber-300/60'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleCheck(tip.id)}
                      className="cursor-pointer text-slate-500 hover:text-blue-600 transition-colors"
                      title={isChecked ? 'تم تنفيذ هذه النصيحة' : 'تحديد كمنفذة'}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${tip.tagColor}`}>
                      {tip.tag}
                    </span>
                  </div>

                  {isChecked && (
                    <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-md">
                      ✓ تم التأكد
                    </span>
                  )}
                </div>

                <h3 className={`text-base sm:text-lg font-black mb-2 ${
                  isChecked
                    ? 'line-through opacity-60 text-slate-500'
                    : tip.important
                    ? 'text-amber-950 font-black'
                    : 'text-slate-950 font-bold'
                }`}>
                  {tip.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${
                  tip.important ? 'text-amber-950/90 font-medium' : 'text-slate-700'
                }`}>
                  {tip.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer CTAs */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-blue-900/60'
        }`}>
          <div className="text-xs text-slate-400 text-center sm:text-right">
            <span>💡 لديك استفسار بخصوص تجهيز شقتك؟ فريق رويال موفرز يقدّم استشارة مجانية 24 ساعة.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                'السلام عليكم، قرأت نصائح رويال موفرز وعندي استفسار بخصوص تجهيز ونقل الشقة'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>استفسار واتساب</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-blue-950/70 hover:bg-blue-900 text-slate-300 border-blue-800'
              }`}
            >
              إغلاق الدليل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
