import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, MapPin, Truck, Package, Calculator, Phone, ArrowLeft, Sparkles, HelpCircle, Film, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useApp } from '../context/AppContext';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'services' | 'areas' | 'store' | 'tools';
  categoryLabel: string;
  badgeColor: string;
  icon: React.ReactNode;
  actionType: 'scroll' | 'calculator' | 'goldentips' | 'phone' | 'whatsapp';
  targetId?: string;
  keywords: string[];
}

interface SiteSearchBarProps {
  onOpenCalculator?: () => void;
  onOpenGoldenTips?: () => void;
  className?: string;
}

export const SiteSearchBar: React.FC<SiteSearchBarProps> = ({
  onOpenCalculator,
  onOpenGoldenTips,
  className = '',
}) => {
  const { t, theme } = useApp();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search items database
  const searchItems: SearchResultItem[] = useMemo(() => [
    // Services
    {
      id: 'srv-winch',
      title: 'ونش رفع الأثاث الهيدروليكي',
      subtitle: 'أحدث أوناش رفع العفش حتى الدور 25 بأمان تام وحماية من ضيق السلالم',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Truck className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'winch-section',
      keywords: ['ونش', 'ونش رفع', 'ونش هيدروليك', 'ونش عفش', 'ونش اثاث', 'دور عالي', 'ادوار عليا', 'اسعار الونش', 'حجز ونش', 'winch']
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
      id: 'srv-packing',
      title: 'تغليف الأثاث والعفش الشامل VIP',
      subtitle: 'تغليف أوروبي 3 طبقات بالبابلز الهوائي والاسترتش المقوى والكرتون لحماية 100%',
      category: 'services',
      categoryLabel: 'خدمات النقل',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-200',
      icon: <Package className="w-4 h-4 text-blue-600" />,
      actionType: 'scroll',
      targetId: 'winch-section',
      keywords: ['تغليف', 'تغليف عفش', 'تغليف اثاث', 'بابلز', 'استرتش', 'تغليف صيني', 'تغليف تحف', 'تغليف زجاج', 'حماية']
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
      targetId: 'services-section',
      keywords: ['شركات', 'مكاتب', 'نقل مكاتب', 'عيادات', 'نقل شركات', 'سيرفرات', 'مؤسسات', 'مقرات']
    },

    // Coverage Areas
    {
      id: 'area-tagamoa',
      title: 'نقل أثاث بالتجمع الخامس والقاهرة الجديدة',
      subtitle: 'تغطية شاملة لكل أحياء التجمع: الرحاب، مدينتي، بيت الوطن، النرجس، اللوتس، الياسمين',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['التجمع', 'التجمع الخامس', 'القاهرة الجديدة', 'الرحاب', 'مدينتي', 'بيت الوطن', 'النرجس', 'اللوتس', 'الياسمين', 'البنفسج', 'المستثمرين']
    },
    {
      id: 'area-zayed',
      title: 'نقل عفش بالشيخ زايد و 6 أكتوبر',
      subtitle: 'أوناش وسيارات متمركزة بالشيخ زايد: بيفرلي هيلز، زايد ديونز، الحي المتميز، حدائق أكتوبر',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['زايد', 'الشيخ زايد', 'أكتوبر', '6 أكتوبر', 'اكتوبر', 'حدائق الاهرام', 'حدائق اكتوبر', 'بيفرلي هيلز', 'زايد 2000', 'الحي المتميز']
    },
    {
      id: 'area-nasrcity',
      title: 'نقل عفش بمدينة نصر ومصر الجديدة',
      subtitle: 'أسرع وصول في عباس العقاد، مكرم عبيد، النزهة الجديدة، الكوربة، هليوبوليس، جسر السويس',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['مدينة نصر', 'مصر الجديدة', 'عباس العقاد', 'مكرم عبيد', 'النزهة', 'الكوربة', 'هليوبوليس', 'جسر السويس', 'المنطقة التاسعة', 'الحي السابع']
    },
    {
      id: 'area-maadi',
      title: 'نقل عفش بالمعادي والمقطم والزهراء',
      subtitle: 'خدمة دقيقة للفيلات والشقق: دجلة، ثكنات المعادي، كورنيش النيل، الهضبة الوسطى',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['المعادي', 'دجلة المعادي', 'زهراء المعادي', 'المقطم', 'الهضبة الوسطى', 'كورنيش المعادي', 'ثكنات المعادي']
    },
    {
      id: 'area-capital',
      title: 'نقل أثاث للعاصمة الإدارية والشروق ومدينتي',
      subtitle: 'تغطية كاملة للأحياء السكنية R7, R8، حي المال والأعمال، المستقبل سيتي، العبور، وبدر',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['العاصمة الادارية', 'العاصمة الإدارية', 'الشروق', 'مدينة الشروق', 'بدر', 'مدينة بدر', 'المستقبل سيتي', 'العبور', 'مدينة العبور', 'R7', 'R8']
    },
    {
      id: 'area-giza',
      title: 'نقل أثاث بالجيزة، المهندسين، الدقي، والزمالك',
      subtitle: 'سيارات مجهزة وأوناش لكافة أحياء الجيزة: الهرم، فيصل، الدقي، المهندسين، العجوزة',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['الجيزة', 'المهندسين', 'الدقي', 'الزمالك', 'العجوزة', 'الهرم', 'فيصل', 'شارع الهرم', 'شارع فيصل', 'امبابة', 'العمرانية']
    },
    {
      id: 'area-alex',
      title: 'نقل عفش الإسكندرية والساحل الشمالي ومطروح',
      subtitle: 'رحلات منتظمة بين القاهرة والإسكندرية والساحل ومارينا والعلمين الجديدة',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['الاسكندرية', 'الإسكندرية', 'اسكندرية', 'الساحل', 'الساحل الشمالي', 'العلمين', 'مارينا', 'مطروح', 'مرسى مطروح', 'سيدي عبد الرحمن']
    },
    {
      id: 'area-governorates',
      title: 'نقل عفش بين المحافظات (الدلتا، القناة، والصعيد)',
      subtitle: 'سيارات مغلقة مبطنة تسافر يومياً إلى: طنطا، المنصورة، الزقازيق، بورسعيد، السويس، أسيوط',
      category: 'areas',
      categoryLabel: 'مناطق التغطية',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/60 dark:text-emerald-200',
      icon: <MapPin className="w-4 h-4 text-emerald-600" />,
      actionType: 'scroll',
      targetId: 'coverage-areas',
      keywords: ['المحافظات', 'بين المحافظات', 'طنطا', 'المنصورة', 'الزقازيق', 'بنها', 'المحلة', 'بورسعيد', 'السويس', 'الاسماعيلية', 'اسيوط', 'سوهاج', 'المنيا', 'قنا', 'الغردقة']
    },

    // Store & Packaging
    {
      id: 'store-boxes',
      title: 'كراتين نقل عفش 5 طبقات للبيع وتوصيل للبيت',
      subtitle: 'كراتين مقواة للشحن وتعبئة الملابس وأدوات المطبخ مع خدمة توصيل فورية',
      category: 'store',
      categoryLabel: 'متجر التغليف والكراتين',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-200',
      icon: <Package className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'boxes-store',
      keywords: ['كراتين', 'كرتونه', 'كرتون', 'كراتين للبيع', 'شراء كراتين', 'كراتين نقل', 'كراتين نقل عفش', 'توصيل كراتين', 'كراتين 5 طبقات']
    },
    {
      id: 'store-bubble',
      title: 'رول بابلز هوائي أصلي ممتص للصدمات',
      subtitle: 'فقاعات هوائية لحماية الأجهزة والشاشات والصيني والتحف والأنتيكات من الكسر',
      category: 'store',
      categoryLabel: 'متجر التغليف والكراتين',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-200',
      icon: <Package className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'boxes-store',
      keywords: ['بابلز', 'فقاعات', 'رول بابلز', 'بابل', 'تغليف زجاج', 'تغليف شاشات', 'حماية الشاشات']
    },
    {
      id: 'store-stretch',
      title: 'بكرات استرتش صناعي عالي التمدد',
      subtitle: 'استرتش عالي الجودة لعزل الأثاث والمفروشات والكنب والأنتريهات ضد الأتربة والرطوبة',
      category: 'store',
      categoryLabel: 'متجر التغليف والكراتين',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-200',
      icon: <Package className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'boxes-store',
      keywords: ['استرتش', 'رول استرتش', 'بلاستيك رول', 'تغليف كنب', 'تغليف انتريه', 'عازل اتربة']
    },
    {
      id: 'store-tape',
      title: 'شريط لاصق عريض وأكياس مفروشات كبيرة',
      subtitle: 'سولوتيب عالي الالتصاق + أكياس مقواة للمراتب والبطاطين واللحافات لحفظها نظيفة',
      category: 'store',
      categoryLabel: 'متجر التغليف والكراتين',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/60 dark:text-amber-200',
      icon: <Package className="w-4 h-4 text-amber-600" />,
      actionType: 'scroll',
      targetId: 'boxes-store',
      keywords: ['شريط لاصق', 'سولوتيب', 'تيب', 'اكياس مراتب', 'اكياس بطاطين', 'تعبئة', 'لوازم نقل']
    },

    // Tools & Quick Actions
    {
      id: 'tool-calculator',
      title: 'حاسبة تكلفة النقل الفورية (احسب تكلفة نقلك الآن)',
      subtitle: 'حدد عدد الغرف والأدوار والمسافة واعرف التكلفة التقديرية بدقة دون مفاجآت',
      category: 'tools',
      categoryLabel: 'أدوات وتواصل سريع',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <Calculator className="w-4 h-4 text-purple-600" />,
      actionType: 'calculator',
      keywords: ['حاسبة', 'احسب', 'حاسبة التكلفة', 'اسعار', 'سعر', 'كم تكلفة', 'تكلفة النقل', 'حساب التكلفة', 'عرض سعر']
    },
    {
      id: 'tool-tips',
      title: 'دليل النصائح الذهبية قبل نقل العفش',
      subtitle: 'إرشادات الخبراء لنقل الذهب والأموال في سيارتك الخاصة وكيفية ترتيب الشقة قبل وصول العمال',
      category: 'tools',
      categoryLabel: 'أدوات وتواصل سريع',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      actionType: 'goldentips',
      keywords: ['نصائح', 'دليل', 'نصائح ذهبية', 'نصيحة', 'دهب', 'اموال', 'ترتيب الشقة', 'ارشادات', 'تعليمات']
    },
    {
      id: 'tool-videos',
      title: 'فيديوهات حية من مواقع العمل الواقعية',
      subtitle: 'شاهد أوناش وسيارات وفريق عمل شلها أثناء تنزيل ورفع الأثاث بالصوت والصورة',
      category: 'tools',
      categoryLabel: 'أدوات وتواصل سريع',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <Film className="w-4 h-4 text-purple-600" />,
      actionType: 'scroll',
      targetId: 'video-showcase',
      keywords: ['فيديو', 'فيديوهات', 'شاهد', 'تصوير', 'على الطبيعة', 'يوتيوب', 'ريلز']
    },
    {
      id: 'tool-phone',
      title: 'اتصال هاتفي مباشر بفريق خدمة العملاء',
      subtitle: 'تحدث فوراً مع ممثل الحجوزات 24 ساعة: 01099649897 أو 01128418399',
      category: 'tools',
      categoryLabel: 'أدوات وتواصل سريع',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <Phone className="w-4 h-4 text-purple-600" />,
      actionType: 'phone',
      keywords: ['اتصال', 'تليفون', 'رقم', 'هاتف', 'خدمة العملاء', 'مكالمة', '01099649897', '01128418399']
    },
    {
      id: 'tool-whatsapp',
      title: 'محادثة فورية عبر واتساب شلها',
      subtitle: 'أرسل تفاصيل نقلك أو صور العفش وتلقَ الرد الفوري وعرض السعر المباشر',
      category: 'tools',
      categoryLabel: 'أدوات وتواصل سريع',
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
      categoryLabel: 'أدوات وتواصل سريع',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/60 dark:text-purple-200',
      icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
      actionType: 'scroll',
      targetId: 'faq-section',
      keywords: ['اسئلة', 'سؤال', 'ضمان', 'أمان', 'تعويض', 'سعر', 'شروط', 'معلومات']
    }
  ], []);

  // Quick suggestions chips
  const quickSuggestions = [
    { label: '🏗️ ونش هيدروليكي', query: 'ونش' },
    { label: '🧮 حاسبة التكلفة', query: 'حاسبة' },
    { label: '📍 التجمع الخامس', query: 'التجمع' },
    { label: '📍 الشيخ زايد', query: 'الشيخ زايد' },
    { label: '📦 كراتين نقل عفش', query: 'كراتين' },
    { label: '❄️ فك التكييفات', query: 'تكييف' },
    { label: '🌊 الإسكندرية', query: 'الإسكندرية' },
    { label: '🚚 سيارات مغلقة', query: 'سيارات' },
  ];

  // Filtering results
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return searchItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Match query against title, subtitle, categoryLabel or keywords
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchKeywords;
    });
  }, [query, selectedCategory, searchItems]);

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    if (item.actionType === 'calculator') {
      if (onOpenCalculator) {
        onOpenCalculator();
      } else {
        const el = document.getElementById('calculator-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

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
          'السلام عليكم، استفسار عن خدمات شركة شلها لنقل وتغليف الأثاث'
        )}`,
        '_blank'
      );
      return;
    }

    if (item.actionType === 'scroll' && item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // subtle highlight animation
        el.classList.add('ring-4', 'ring-blue-500/50', 'transition-all', 'duration-500');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-blue-500/50');
        }, 2000);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div
        className={`relative rounded-2xl transition-all duration-300 shadow-lg ${
          theme === 'light'
            ? 'bg-white border-2 border-blue-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 shadow-blue-900/5'
            : 'bg-[#051532] border-2 border-blue-500/50 focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-500/20 shadow-black/40'
        }`}
      >
        <div className="flex items-center px-4 py-3.5 sm:py-4 gap-3">
          {/* Magnifying Glass Icon with pulsating badge */}
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Search className="w-5 h-5 text-white" />
          </div>

          {/* Text Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={t(
              'ابحث عن أي خدمة، منطقة، ونش، كراتين، أو حاسبة التكلفة...',
              'Search any service, area, winch, boxes, or price calculator...'
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
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="مسح البحث"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Direct Search Trigger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-md cursor-pointer transition-colors shrink-0"
          >
            <span>بحث</span>
          </button>
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
              onClick={() => {
                setQuery(s.query);
                setIsOpen(true);
              }}
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
      </div>

      {/* Autocomplete & Results Dropdown */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-2 rounded-2xl border shadow-2xl z-50 overflow-hidden backdrop-blur-md transition-all ${
            theme === 'light'
              ? 'bg-white/95 border-blue-200 text-slate-900 shadow-blue-950/15'
              : 'bg-[#030d22]/95 border-blue-800 text-slate-100 shadow-black/80'
          }`}
          style={{ maxHeight: '460px' }}
        >
          {/* Category Filter Tabs */}
          <div className="p-3 border-b border-slate-200 dark:border-blue-900/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'الكل (شامل)' },
              { id: 'services', label: '🚚 خدمات النقل' },
              { id: 'areas', label: '📍 المناطق والمحافظات' },
              { id: 'store', label: '📦 كراتين ومواد التغليف' },
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
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-blue-950/80 hover:bg-blue-900 text-slate-300'
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
              // Empty search state
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center mx-auto text-xl">
                  🔍
                </div>
                <div className="text-sm font-black text-slate-800 dark:text-slate-200">
                  لم نعثر على نتائج مطابقة لـ &quot;{query}&quot;
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  مهما كان طلبك (منطقة غير مذكورة أو طلب خاص)، فريق شلها جاهز لخدمتك على مدار الساعة!
                </p>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <a
                    href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                      `السلام عليكم، أبحث عن خدمة أو منطقة: ${query}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>تواصل معنا واتساب فوراً</span>
                  </a>
                  <a
                    href="tel:01099649897"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-md"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>01099649897</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Footer note in dropdown */}
          <div className="p-2.5 bg-slate-50 dark:bg-[#04122b] border-t border-slate-200 dark:border-blue-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-4">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>موقع شلها يغطي كافة محافظات ومدن مصر 24/7</span>
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-blue-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
