import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Truck, Package, Phone, ArrowLeft, HelpCircle, Film, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'services' | 'tools';
  categoryLabel: string;
  badgeColor: string;
  icon: React.ReactNode;
  actionType: 'scroll' | 'goldentips' | 'phone' | 'whatsapp';
  targetId?: string;
  keywords: string[];
}

interface SiteSearchBarProps {
  onOpenGoldenTips?: () => void;
  onClose?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const SiteSearchBar: React.FC<SiteSearchBarProps> = ({
  onOpenGoldenTips,
  onClose,
  className = '',
  autoFocus = false,
}) => {
  const { t, theme } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  // Search items database (VIP Services & Direct actions only)
  const searchItems: SearchResultItem[] = useMemo(() => [
    {
      id: 'srv-winch',
      title: 'ونش رفع الأثاث الهيدروليكي (يبدأ من 2500 ج.م)',
      subtitle: 'أحدث أوناش رفع العفش حتى الدور 25 بأمان تام وحماية من ضيق السلالم والتجريح',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'winch-section',
      keywords: ['ونش', 'ونش رفع', 'ونش هيدروليك', 'ونش عفش', 'ونش اثاث', 'دور عالي', 'ادوار عليا', 'اسعار الونش', 'حجز ونش', 'winch', '2500']
    },
    {
      id: 'srv-trucks',
      title: 'سيارات نقل عفش مغلقة ومجهزة',
      subtitle: 'أسطول سيارات صندوق مغلق بأرضيات وجوانب مبطنة لحماية الأثاث من الأتربة والأمطار',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'services-section',
      keywords: ['عربيات', 'سيارات', 'عربيات مقفولة', 'عربيات نقل', 'سيارات مغلقة', 'دينا', 'جامبو', 'صندوق', 'شاحنات', 'اسطول']
    },
    {
      id: 'srv-packing',
      title: 'تغليف الأثاث والعفش الشامل VIP',
      subtitle: 'تغليف فندقي أوروبي لحماية غرف النوم والتحف والصيني والزجاج من الخدوش والكسر',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Package className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'packing-section',
      keywords: ['تغليف', 'تغليف عفش', 'تغليف اثاث', 'بابلز', 'استرتش', 'تغليف صيني', 'تغليف تحف', 'تغليف زجاج', 'حماية']
    },
    {
      id: 'srv-carpentry',
      title: 'فك وتركيب غرف النوم والمطابخ والأثاث',
      subtitle: 'نجارون متخصصون لفك وتركيب الدواليب، السفرة، المطابخ، والستائر بدقة متناهية',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'services-section',
      keywords: ['فك وتركيب', 'نجار', 'نجارين', 'غرفة نوم', 'دواليب', 'مطابخ', 'تركيب مطبخ', 'ستاير', 'فك السرير']
    },
    {
      id: 'srv-ac',
      title: 'فك وتركيب وصيانة التكييفات',
      subtitle: 'فنيون معتمدون لفك وإعادة تركيب أجهزة التكييف الاسبليت والشباك وشحن الفريون',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'winch-section',
      keywords: ['تكييف', 'تكييفات', 'فك تكييف', 'تركيب تكييف', 'صيانة تكييف', 'فريون', 'فني تكييف', 'تكييف سبليت']
    },
    {
      id: 'srv-corporate',
      title: 'نقل مقار الشركات والمكاتب والعيادات',
      subtitle: 'نقل سريع واحترافي لأثاث المكاتب، غرف الاجتماعات، السيرفرات، والأجهزة الطبية',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'services',
      keywords: ['شركات', 'مكاتب', 'نقل مكاتب', 'عيادات', 'نقل شركات', 'سيرفرات', 'مؤسسات', 'مقرات']
    },
    {
      id: 'srv-compounds',
      title: 'نقل عفش أشهر كمبوندات مصر (بتصاريح دخول معتمدة)',
      subtitle: 'ميفيدا، قطامية هايتس، أليجريا، بيفرلي هيلز، أبراج زد، مدينتي، بالم هيلز، نيو جيزة، والعاصمة الإدارية',
      category: 'services',
      categoryLabel: 'كمبوندات فاخرة',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
      icon: <Truck className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'luxury-compounds',
      keywords: ['كمبوند', 'كمبوندات', 'ميفيدا', 'اليجريا', 'بيفرلي هيلز', 'زد', 'مدينتي', 'بالم هيلز', 'نيو جيزة', 'قطامية هايتس', 'هايد بارك', 'سوان ليك', 'سوديك', 'العاصمة الادارية', 'الساحل', 'مراسي', 'الجونة', 'فلل']
    },
    {
      id: 'srv-interactive-flip',
      title: 'خدمات رويال موفرز VIP التفاعلية (كروت 3D)',
      subtitle: 'استكشف مواصفات كل خدمة بضغطة واحدة مع مميزات VIP وضمان الأمان وسرعة الإنجاز',
      category: 'services',
      categoryLabel: 'خدمات تفاعلية',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-200',
      icon: <Truck className="w-4 h-4 text-sky-600" />,
      actionType: 'scroll',
      targetId: 'interactive-services',
      keywords: ['تفاعلي', 'كروت', 'تفاصيل الخدمة', 'مواصفات', 'اسطول', 'نجارين', 'تكييفات', 'صيني', 'كراتين']
    },
    {
      id: 'area-zayed',
      title: 'نقل عفش وفلل الشيخ زايد (صفحة مخصصة ومميزات VIP)',
      subtitle: 'سوديك أليجريا، بيفرلي هيلز، أبراج زد، بالم هيلز، نيو جيزة، وتصاريح بوابات جاهزة',
      category: 'services',
      categoryLabel: 'مناطق النخبة 🏰',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200',
      icon: <Truck className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'area/sheikh-zayed',
      keywords: ['الشيخ زايد', 'زايد', 'اليجريا', 'بيفرلي هيلز', 'زد', 'سوديك ويست', 'نيو جيزة', 'zayed']
    },
    {
      id: 'area-new-cairo',
      title: 'نقل عفش وفلل التجمع الخامس والقاهرة الجديدة (صفحة مخصصة)',
      subtitle: 'ميفيدا، قطامية هايتس، سوان ليك، هايد بارك، بيت الوطن، والنرجس',
      category: 'services',
      categoryLabel: 'مناطق النخبة 👑',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200',
      icon: <Truck className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'area/new-cairo',
      keywords: ['التجمع', 'التجمع الخامس', 'القاهرة الجديدة', 'ميفيدا', 'قطامية هايتس', 'سوان ليك', 'new cairo', 'tagamoa']
    },
    {
      id: 'area-october',
      title: 'نقل عفش وفلل 6 أكتوبر والحدائق (صفحة مخصصة)',
      subtitle: 'غرب سوميد، بالم هيلز أكتوبر، ماونتن فيو، وحي الأشجار وسيارات مغلقة',
      category: 'services',
      categoryLabel: 'مناطق النخبة 🛡️',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'area/october',
      keywords: ['اكتوبر', '6 اكتوبر', 'حدائق اكتوبر', 'غرب سوميد', 'حي الاشجار', 'october']
    },
    {
      id: 'area-madinaty',
      title: 'نقل عفش وفلل مدينتي والرحاب ومستقبل سيتي (صفحة مخصصة)',
      subtitle: 'فلل مدينتي، عمارات B1-B12، الرحاب، وتصاريح بوابات طلعت مصطفى',
      category: 'services',
      categoryLabel: 'مناطق النخبة 🌴',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-200',
      icon: <Truck className="w-4 h-4 text-teal-600" />,
      actionType: 'scroll',
      targetId: 'area/madinaty',
      keywords: ['مدينتي', 'الرحاب', 'مستقبل سيتي', 'الشروق', 'طلعت مصطفى', 'madinaty', 'rehab']
    },
    {
      id: 'area-capital',
      title: 'نقل عفش ومقرات العاصمة الإدارية الجديدة (صفحة مخصصة)',
      subtitle: 'سيليا، كمبوند المقصد، الحي السكني R7 و R8، والمقرات والشركات',
      category: 'services',
      categoryLabel: 'مناطق النخبة 🏛️',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-200',
      icon: <Truck className="w-4 h-4 text-purple-600" />,
      actionType: 'scroll',
      targetId: 'area/new-capital',
      keywords: ['العاصمة الادارية', 'سيليا', 'المقصد', 'r7', 'r8', 'capital']
    },
    {
      id: 'area-coast',
      title: 'نقل شاليهات الساحل الشمالي والعلمين والجونة (صفحة مخصصة)',
      subtitle: 'مراسي، هاسيندا، العلمين الجديدة، وسيارات شحن مغلقة مبطنة للسفر',
      category: 'services',
      categoryLabel: 'مناطق النخبة 🌊',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-200',
      icon: <Truck className="w-4 h-4 text-sky-600" />,
      actionType: 'scroll',
      targetId: 'area/north-coast',
      keywords: ['الساحل', 'الساحل الشمالي', 'مراسي', 'هاسيندا', 'العلمين', 'الجونة', 'شاليهات', 'marassi']
    },

    // Tools & Quick Actions
    {
      id: 'tool-tips',
      title: 'دليل النصائح الذهبية قبل نقل العفش',
      subtitle: 'إرشادات الخبراء لنقل الذهب والأموال في سيارتك الخاصة وكيفية ترتيب الشقة قبل وصول العمال',
      category: 'tools',
      categoryLabel: 'أدوات وإرشادات',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      actionType: 'goldentips',
      keywords: ['نصائح', 'دليل', 'نصائح ذهبية', 'نصيحة', 'دهب', 'اموال', 'ترتيب الشقة', 'ارشادات', 'تعليمات']
    },
    {
      id: 'tool-videos',
      title: 'فيديوهات حية من مواقع العمل الواقعية',
      subtitle: 'شاهد أوناش وسيارات وفريق عمل رويال موفرز أثناء تنزيل ورفع الأثاث بالصوت والصورة',
      category: 'tools',
      categoryLabel: 'فيديوهات ومعرض',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <Film className="w-4 h-4 text-purple-600" />,
      actionType: 'scroll',
      targetId: 'video-showcase',
      keywords: ['فيديو', 'فيديوهات', 'شاهد', 'تصوير', 'على الطبيعة', 'يوتيوب', 'ريلز']
    },
    {
      id: 'tool-phone',
      title: 'اتصال هاتفي مباشر بالخط الساخن الموحد VIP',
      subtitle: 'تحدث فوراً مع ممثل الحجوزات 24 ساعة: 01233391255',
      category: 'tools',
      categoryLabel: 'تواصل سريع',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Phone className="w-4 h-4 text-blue-600" />,
      actionType: 'phone',
      keywords: ['اتصال', 'تليفون', 'رقم', 'هاتف', 'خدمة العملاء', 'مكالمة', '01233391255', 'رويال', 'royal']
    },
    {
      id: 'tool-whatsapp',
      title: 'محادثة فورية عبر واتساب رويال موفرز VIP',
      subtitle: 'أرسل تفاصيل نقلك أو صور العفش وتلقَ الرد الفوري وعرض السعر المباشر',
      category: 'tools',
      categoryLabel: 'تواصل سريع',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <WhatsAppIcon className="w-4 h-4 text-emerald-600" />,
      actionType: 'whatsapp',
      keywords: ['واتساب', 'واتس', 'شات', 'محادثة', 'رسالة', 'whatsapp']
    },
    {
      id: 'tool-faq',
      title: 'الأسئلة الشائعة وضمانات سلامة المنقولات',
      subtitle: 'إجابات على أسئلة الأمان والتعويضات والأسعار ومواعيد العمل والأدوار',
      category: 'tools',
      categoryLabel: 'الأسئلة الشائعة',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
      actionType: 'scroll',
      targetId: 'faq-section',
      keywords: ['اسئلة', 'سؤال', 'ضمان', 'أمان', 'تعويض', 'سعر', 'شروط', 'معلومات']
    }
  ], []);

  // Quick suggestions chips
  const quickSuggestions = [
    { label: '🏗️ ونش هيدروليكي (2500ج)', query: 'ونش' },
    { label: '📦 تغليف VIP', query: 'تغليف' },
    { label: '❄️ فك التكييفات', query: 'تكييف' },
    { label: '🚚 سيارات مغلقة', query: 'سيارات' },
    { label: '🛠️ فك وتركيب', query: 'فك وتركيب' },
  ];

  // Filtering results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchItems.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [query, selectedCategory, searchItems]);

  const handleSelectItem = (item: SearchResultItem) => {
    if (onClose) onClose();

    if (item.actionType === 'goldentips') {
      if (onOpenGoldenTips) {
        onOpenGoldenTips();
      } else {
        const el = document.getElementById('moving-tips') || document.getElementById('prep-guide');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (item.actionType === 'phone') {
      window.location.href = `tel:${COMPANY_DATA.phones[0].number}`;
      return;
    }

    if (item.actionType === 'whatsapp') {
      window.open(
        `https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
          'السلام عليكم، استفسار عن خدمات شركة رويال موفرز لنقل وتغليف الأثاث VIP'
        )}`,
        '_blank'
      );
      return;
    }

    if (item.actionType === 'scroll' && item.targetId) {
      if (item.targetId.startsWith('area/')) {
        window.location.hash = `#${item.targetId}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('ring-4', 'ring-blue-500/50', 'transition-all', 'duration-500');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-blue-500/50');
        }, 2000);
      }
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search Input Box */}
      <div
        className={`rounded-2xl transition-all duration-300 shadow-xl overflow-hidden ${
          theme === 'light'
            ? 'bg-white border-2 border-blue-400 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 shadow-blue-900/10'
            : 'bg-[#051532] border-2 border-blue-500 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-500/20 shadow-black/60'
        }`}
      >
        <div className="flex items-center px-4 py-3 sm:py-3.5 gap-3">
          {/* Magnifying Glass Icon */}
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Search className="w-5 h-5 text-white" />
          </div>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(
              'ابحث عن أي خدمة، ونش هيدروليكي، أو استفسار...',
              'Search any service, winch, or inquiry...'
            )}
            className={`w-full bg-transparent text-sm sm:text-base font-bold outline-none placeholder:text-slate-400 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="مسح البحث"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Close button if in modal mode */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 text-slate-600 hover:text-rose-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0"
              title="إغلاق البحث"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 pb-3 pt-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-blue-900/40">
          <span className="text-[11px] sm:text-xs font-black text-slate-400 dark:text-slate-500 shrink-0">
            {t('الأكثر بحثاً:', 'Popular:')}
          </span>
          {quickSuggestions.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(s.query)}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 transition-colors cursor-pointer border ${
                theme === 'light'
                  ? 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                  : 'bg-blue-950/60 hover:bg-blue-900 text-slate-300 hover:text-white border-blue-900 hover:border-blue-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Category Filter Tabs */}
        <div className="p-2.5 border-t border-slate-200 dark:border-blue-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50/60 dark:bg-blue-950/40">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'services', label: '🚚 خدمات النقل' },
            { id: 'tools', label: '⚡ أدوات وتواصل' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`text-xs font-black px-3 py-1.5 rounded-xl shrink-0 cursor-pointer transition-all ${
                selectedCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : theme === 'light'
                  ? 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  : 'bg-blue-900/50 hover:bg-blue-900 text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto max-h-80 divide-y divide-slate-100 dark:divide-blue-900/40 p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectItem(item)}
                className={`w-full text-right p-3 rounded-xl flex items-start gap-3 transition-colors cursor-pointer group ${
                  theme === 'light'
                    ? 'hover:bg-blue-50/80'
                    : 'hover:bg-blue-900/40'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                      {item.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <div className="shrink-0 self-center text-slate-400 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </button>
            ))
          ) : (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <div className="text-sm font-black text-slate-800 dark:text-slate-200">
                لم نعثر على نتائج مطابقة لـ &quot;{query}&quot;
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                فريق رويال موفرز جاهز لخدمتك على مدار الساعة للرد على أي استفسار خاص!
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <a
                  href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                    `السلام عليكم، أبحث عن خدمة: ${query}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>تواصل معنا واتساب فوراً</span>
                </a>
                <a
                  href="tel:01233391255"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md tracking-wider font-mono"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>01233391255</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
