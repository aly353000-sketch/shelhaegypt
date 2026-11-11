import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Phone, 
  CheckCircle2, 
  Clock, 
  BadgeCheck, 
  Home, 
  Compass, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface CompoundItem {
  id: string;
  nameAr: string;
  nameEn: string;
  type: string;
  permitStatus: string;
  winchAllowed: string;
  features: string[];
  ctaMessage: string;
}

interface RegionCategory {
  id: string;
  title: string;
  cityLabel: string;
  icon: string;
  description: string;
  compounds: CompoundItem[];
}

interface LuxuryCompoundsExplorerProps {
  onSelectArea?: (slug: string) => void;
}

export const LuxuryCompoundsExplorer: React.FC<LuxuryCompoundsExplorerProps> = ({ onSelectArea }) => {
  const { t, theme } = useApp();
  const [selectedRegion, setSelectedRegion] = useState<string>('new-cairo');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions: RegionCategory[] = [
    {
      id: 'new-cairo',
      title: 'التجمع الخامس والقاهرة الجديدة',
      cityLabel: 'New Cairo & 5th Settlement',
      icon: '🏙️',
      description: 'نغطي أرقى أحياء وكمبوندات التجمع الخامس، المستثمرين، بيت الوطن، والنرجس بتصاريح دخول رسمية.',
      compounds: [
        {
          id: 'mivida',
          nameAr: 'كمبوند ميفيدا - إعمار مصر',
          nameEn: 'Mivida Emaar New Cairo',
          type: 'فلل مستقلة وتوين هاوس وشقق فاخرة',
          permitStatus: 'تصاريح دخول جاهزة 100%',
          winchAllowed: 'متاح ونش هيدروليكي حتى الدور 25',
          features: ['تنسيق مسبق مع أمن ميفيدا', 'حماية الرخام والمصاعد', 'التزام بساعات الهدوء'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل عفش وتغليف فيلا في كمبوند ميفيدا التجمع الخامس مع رويال موفرز VIP',
        },
        {
          id: 'katameya-heights',
          nameAr: 'قطامية هايتس & قطامية ديونز',
          nameEn: 'Katameya Heights & Dunes',
          type: 'قصور وفلل جولف فاخرة',
          permitStatus: 'خدمة فندقية خاصة للقصور',
          winchAllowed: 'أوناش رفع هيدروليكية معتمدة',
          features: ['عناية فائقة بالتحف والنجف', 'سيارات مغلقة ومجهزة', 'فريق نجارين وفنيين معتمدين'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث قصر/فيلا في قطامية هايتس مع رويال موفرز VIP',
        },
        {
          id: 'mountain-view-cairo',
          nameAr: 'ماونتن فيو آي سيتي & هايد بارك',
          nameEn: 'Mountain View iCity & Hyde Park',
          type: 'آي فيلا، بنتهاوس، وشقق فاخرة',
          permitStatus: 'تنسيق دوري مع إدارة الكمبوند',
          winchAllowed: 'متاح ونش للبلكونات والواجهات',
          features: ['تغليف أوروبي بابلز واسترتش', 'فك وتركيب التكييفات 800ج', 'سيارات مبطنة بالسجاد'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث في ماونتن فيو التجمع مع رويال موفرز VIP',
        },
        {
          id: 'swan-lake',
          nameAr: 'سوان ليك ريزيدنس - حسن علام',
          nameEn: 'Swan Lake Residences New Cairo',
          type: 'فلل فاخرة وتاون هاوس',
          permitStatus: 'تصاريح أمنية سريعة',
          winchAllowed: 'أوناش مخصصة لواجهات الفلل',
          features: ['كسوة واقية لمداخل الفلل', 'كراتين 5 راق مقواة', 'سعر ثابت بدون زيادات'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل عفش في سوان ليك التجمع مع رويال موفرز VIP',
        },
        {
          id: 'palm-hills-cairo',
          nameAr: 'بالم هيلز نيو كايرو & فيليت سوديك',
          nameEn: 'Palm Hills New Cairo & Villette Sodic',
          type: 'فلل مودرن ودوبلكس',
          permitStatus: 'علاقات مباشرة لتسهيل الدخول',
          winchAllowed: 'ونش هيدروليكي فائق الهدوء',
          features: ['سرية تامة وخصوصية للعميل', 'فنيون محترفون للكهرباء', 'معاينة مجانية بالموقع'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث في بالم هيلز / فيليت التجمع مع رويال موفرز VIP',
        },
        {
          id: 'lake-view',
          nameAr: 'ليك فيو & كايرو فيستيفال سيتي',
          nameEn: 'Lake View & Cairo Festival City',
          type: 'قصور وفلل بحيرات وشقق فندقية',
          permitStatus: 'دخول معتمد للشاحنات المغلقة',
          winchAllowed: 'رفع آمن للرخام والأثاث الضخم',
          features: ['حماية الأطقم الصيني والكريستال', 'نجارون متخصصون للمطابخ', 'خدمة على مدار 24 ساعة'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل عفش في ليك فيو / كايرو فيستيفال مع رويال موفرز VIP',
        },
      ],
    },
    {
      id: 'zayed-october',
      title: 'الشيخ زايد و6 أكتوبر',
      cityLabel: 'Sheikh Zayed & 6th of October',
      icon: '🏰',
      description: 'خبرة أكثر من 12 عاماً في خدمة أشهر كمبوندات زايد وأكتوبر مع توفير أوناش وسيارات متمركزة بالمنطقة.',
      compounds: [
        {
          id: 'allegria',
          nameAr: 'كمبوند أليجريا - سوديك ويست',
          nameEn: 'Allegria Sodic West Sheikh Zayed',
          type: 'قصور وفلل جولف فخمة',
          permitStatus: 'تنسيق كامل مع إدارة سوديك',
          winchAllowed: 'ونش هيدروليكي آمن للواجهات',
          features: ['عناية خاصة بالأثاث المستورد', 'حفظ شحنة فريون التكييفات', 'فريق مدرب بزي موحد'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث فيلا في كمبوند أليجريا الشيخ زايد مع رويال موفرز VIP',
        },
        {
          id: 'beverly-hills',
          nameAr: 'بيفرلي هيلز & ويست تاون ريزيدنس',
          nameEn: 'Beverly Hills & Westown Residence',
          type: 'فلل، تاون هاوس، وشقق فاخرة',
          permitStatus: 'دخول يومي مستمر وتصاريح فورية',
          winchAllowed: 'أوناش لكافة الأدوار والمرتفعات',
          features: ['وصول خلال 30 دقيقة', 'كراتين مخصصة للنيش والمطبخ', 'سعر الونش يبدأ من 2500ج'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل عفش في بيفرلي هيلز الشيخ زايد مع رويال موفرز VIP',
        },
        {
          id: 'zed-towers',
          nameAr: 'أبراج زد الشيخ زايد - أورا',
          nameEn: 'Zed Towers Sheikh Zayed (ORA)',
          type: 'أبراج سكنية فندقية شاهقة',
          permitStatus: 'بروتوكول نقل فندقي فاخر',
          winchAllowed: 'نقل داخلي مخصص ومصاعد مبطنة',
          features: ['تبطنين كامل للمصاعد والسلالم', 'أعلى معايير الخصوصية والأمان', 'سيارات مغلقة تماماً'],
          ctaMessage: 'السلام عليكم، استفسار عن خدمات نقل العفش لأبراج زد الشيخ زايد مع رويال موفرز VIP',
        },
        {
          id: 'palm-hills-zayed',
          nameAr: 'بالم هيلز زايد & ذا إستيتس',
          nameEn: 'Palm Hills Zayed & The Estates',
          type: 'فلل وقصور مستقلة',
          permitStatus: 'تصاريح مسبقة جاهزة',
          winchAllowed: 'أحدث أوناش رفع هيدروليكية',
          features: ['نجارون لغرف النوم الإيطالية', 'تغليف ثلاثي بابلز وفوم', 'معاينة فنية مجانية'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل فيلا في بالم هيلز زايد مع رويال موفرز VIP',
        },
        {
          id: 'new-giza',
          nameAr: 'نيو جيزة & إيتابا وبيل في',
          nameEn: 'New Giza, Etapa & Belle Vie',
          type: 'فلل ربوة ومنازل فاخرة',
          permitStatus: 'تنسيق مع بوابات الدخول الرئيسية',
          winchAllowed: 'أوناش للأدوار والارتفاعات الصعبة',
          features: ['سيارات مجهزة للسفر والمطبات', 'أمانة تامة لطاقم العمل', 'ضمان 100% ضد الخدوش'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث في نيو جيزة مع رويال موفرز VIP',
        },
      ],
    },
    {
      id: 'madinaty-rehab',
      title: 'مدينتي، الرحاب، والشروق',
      cityLabel: 'Madinaty, Rehab & El Shorouk',
      icon: '🌴',
      description: 'تغطية شاملة لجميع مراحل وفلل مدينتي والرحاب مع معرفة تامة بإجراءات وتصاريح جهاز المدينة.',
      compounds: [
        {
          id: 'madinaty-villas',
          nameAr: 'منطقة الفلل في مدينتي (VG1, VG2, VG3, VG4)',
          nameEn: 'Madinaty Luxury Villas Area',
          type: 'فلل مستقلة وقصور نموذجية',
          permitStatus: 'تنسيق كامل مع جهاز مدينتي',
          winchAllowed: 'متاح ونش هيدروليكي للفلل',
          features: ['خبرة متراكمة بجميع النماذج', 'حماية المسطحات الخضراء والرخام', 'تغليف شامل لجميع المحتويات'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث فيلا في مدينتي مع رويال موفرز VIP',
        },
        {
          id: 'madinaty-apartments',
          nameAr: 'عمارات وشقق مدينتي (B1 حتى B12)',
          nameEn: 'Madinaty Luxury Apartments (B1-B12)',
          type: 'شقق عائلية وبنتهاوس',
          permitStatus: 'دخول سريع للشاحنات المغلقة',
          winchAllowed: 'ونش هيدروليكي حتى أعلى دور',
          features: ['وصول سريع وتثبيت للأثاث', 'فك وتركيب تكييفات بـ 800ج', 'سعر ثابت بدون أي إكراميات'],
          ctaMessage: 'السلام عليكم، استفسار عن نقل عفش شقة في مدينتي مع رويال موفرز VIP',
        },
        {
          id: 'rehab-city',
          nameAr: 'مدينة الرحاب (المرحلة الأولى والثانية)',
          nameEn: 'Al Rehab City (Villas & Buildings)',
          type: 'فلل وشقق سكنية',
          permitStatus: 'تغطية دائمة وتصاريح مسبقة',
          winchAllowed: 'أوناش متوفرة على مدار الساعة',
          features: ['نجارون للمطابخ والستائر', 'تغليف نيش وصيني احترافي', 'متابعة مباشرة مع العميل'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث في مدينة الرحاب مع رويال موفرز VIP',
        },
      ],
    },
    {
      id: 'new-capital',
      title: 'العاصمة الإدارية والمستقبل سيتي',
      cityLabel: 'New Capital & Mostakbal City',
      icon: '⭐',
      description: 'رواد نقل وتغليف أثاث مقرات الشركات والفلل السكنية بأحدث كمبوندات العاصمة الإدارية الجديدة.',
      compounds: [
        {
          id: 'al-maqsad',
          nameAr: 'كمبوند المقصد - سيتي إيدج',
          nameEn: 'Al Maqsad City Edge New Capital',
          type: 'فلل جاهزة للاستلام الفوري',
          permitStatus: 'تصاريح دخول جاهزة للعاصمة',
          winchAllowed: 'أوناش هيدروليكية حديثة',
          features: ['نقل سلس عبر الطرق السريعة', 'سيارات مبطنة مجهزة للسفر', 'ترتيب كامل للأثاث بالداخل'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث لكمبوند المقصد بالعاصمة الإدارية مع رويال موفرز VIP',
        },
        {
          id: 'celia-capital',
          nameAr: 'كمبوند سيليا & البوسكو مصر إيطاليا',
          nameEn: 'Celia (TMG) & IL Bosco New Capital',
          type: 'فلل بحيرات وشقق استثمارية',
          permitStatus: 'تنسيق مع إدارات المشروعات',
          winchAllowed: 'أوناش للأدوار المرتفعة',
          features: ['تغليف أوروبي ضد أتربة الإنشاءات', 'فنيو تكييف وكهرباء متكاملين', 'ضمان شامل على المنقولات'],
          ctaMessage: 'السلام عليكم، استفسار عن نقل وتغليف عفش في العاصمة الإدارية الجديدة مع رويال موفرز VIP',
        },
        {
          id: 'mostakbal-city',
          nameAr: 'المستقبل سيتي (سراي، بلوم فيلدز، هاب تاون)',
          nameEn: 'Mostakbal City (Sarai, Bloomfields)',
          type: 'كمبوندات سكنية متكاملة',
          permitStatus: 'تصاريح دخول مسبقة',
          winchAllowed: 'أوناش وسيارات نقل جامبو',
          features: ['عناية فائقة بالأجهزة والزجاج', 'فريق متخصص للفلل الكبيرة', 'تحديد تكلفة واضحة مقدماً'],
          ctaMessage: 'السلام عليكم، أرغب في نقل أثاث إلى المستقبل سيتي مع رويال موفرز VIP',
        },
      ],
    },
    {
      id: 'north-coast-gouna',
      title: 'الساحل الشمالي، العلمين، والجونة',
      cityLabel: 'North Coast, New Alamein & El Gouna',
      icon: '🌊',
      description: 'رحلات أسبوعية منتظمة بسيارات شحن مغلقة ومجهزة لنقل وتأمين أثاث الشاليهات والفلل الصيفية.',
      compounds: [
        {
          id: 'marassi',
          nameAr: 'مراسي & هاسيندا باي والعلمين الجديدة',
          nameEn: 'Marassi, Hacienda Bay & New Alamein',
          type: 'قصور بحرية وفلل شاطئية وشاليهات',
          permitStatus: 'تصاريح سارية لكافة بوابات الساحل',
          winchAllowed: 'أوناش مخصصة للشاليهات والأدوار العليا',
          features: ['عزل تام ضد الرطوبة وأملاح البحر', 'تغليف مضاعف باسترتش حراري ثقيل', 'سائقون خبراء بالطرق الساحلية'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث شاليه/فيلا في الساحل الشمالي (مراسي / هاسيندا) مع رويال موفرز VIP',
        },
        {
          id: 'gouna-redsea',
          nameAr: 'الجونة وسهل حشيش وشرم الشيخ',
          nameEn: 'El Gouna, Sahl Hasheesh & Red Sea',
          type: 'فلل لاجون وبنتهاوس فندقي',
          permitStatus: 'شحن ونقل مباشر بجدول مواعيد دقيق',
          winchAllowed: 'أوناش ومعدات رفع متطورة',
          features: ['تأمين شامل لكافة المنقولات', 'فريق نجارين يرافق الشحنة للتجميع', 'تسليم نظيف وجاهز للسكن الفوري'],
          ctaMessage: 'السلام عليكم، أرغب في حجز نقل أثاث إلى الجونة / البحر الأحمر مع رويال موفرز VIP',
        },
      ],
    },
  ];

  const currentRegion = regions.find((r) => r.id === selectedRegion) || regions[0];

  const filteredCompounds = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return currentRegion.compounds;

    return currentRegion.compounds.filter(
      (c) =>
        c.nameAr.toLowerCase().includes(query) ||
        c.nameEn.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query)
    );
  }, [currentRegion, searchQuery]);

  return (
    <section id="luxury-compounds" className={`py-16 lg:py-24 text-right transition-colors duration-300 relative ${
      theme === 'light' 
        ? 'bg-gradient-to-b from-white via-slate-50 to-blue-50/30' 
        : 'bg-[#010816] text-slate-100 border-t border-blue-900/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-black px-5 py-2 rounded-full shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t('الوجهة الأولى لسكان الفلل والقصور والكمبوندات الفاخرة بمصر 👑', 'The #1 Luxury Movers for Prestigious Compounds in Egypt')}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            {t('نخدم أشهر كمبوندات مصر.. تصاريح دخول جاهزة وتنسيق كامل!', 'We Serve Egypt’s Most Prestigious Compounds & Gated Communities')}
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            {t(
              'لا داعي للقلق بشأن تصاريح الأمن أو مسارات الونش أو ساعات الهدوء. يتولى فريق رويال موفرز VIP التنسيق المسبق مع إدارات الكمبوندات لتوفير تجربة نقل راقية وهادئة تليق بمكانتك.',
              'Zero gate hassle. We coordinate security permits, winch access, and quiet-hour compliance across all top gated estates.'
            )}
          </p>
        </div>

        {/* 4 Pillars of Compound Moving Excellence Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl border bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">تصاريح دخول جاهزة</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              علاقات وتنسيق مسبق مع أمن وإدارات الكمبوندات لضمان دخول الشاحنات والونش بدون أي تأخير عند البوابات.
            </p>
          </div>

          <div className="p-5 rounded-2xl border bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">حماية المداخل والرخام</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              تبطين جدران ومصاعد العمارات ومداخل الفلل بالسجاد والفوم الواقي مجاناً لمنع أي احتكاك أثناء النقل.
            </p>
          </div>

          <div className="p-5 rounded-2xl border bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">انضباط ساعات الهدوء</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              التزام صارم بضوابط الكمبوندات، عمل صامت ومنظم، ومعدات رفع هيدروليكية حديثة لا تسبب أي إزعاج للجيران.
            </p>
          </div>

          <div className="p-5 rounded-2xl border bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/80 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">سرية وخصوصية تامة</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              طاقم عمل فندقي معتمد بزي موحد وبطاقات تعريف رسمية يضمن أعلى درجات الخصوصية لمقتنياتك وأسرتك.
            </p>
          </div>
        </div>

        {/* Interactive Region Selector Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {regions.map((region) => {
              const isActive = selectedRegion === region.id;
              return (
                <button
                  type="button"
                  key={region.id}
                  onClick={() => {
                    setSelectedRegion(region.id);
                    setSearchQuery('');
                  }}
                  className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 via-blue-800 to-sky-700 text-white border-amber-400 shadow-lg shadow-blue-900/30 scale-105'
                      : 'bg-white dark:bg-[#031126] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-blue-950/70 border-slate-200 dark:border-blue-900/60 shadow-xs'
                  }`}
                >
                  <span className="text-base">{region.icon}</span>
                  <span>{region.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 dark:bg-blue-900 text-slate-600 dark:text-slate-300'
                  }`}>
                    {region.compounds.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Region Brief & Live Search Bar */}
          <div className="p-5 sm:p-6 rounded-3xl border bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/80 shadow-md flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-right">
              <div className="text-base sm:text-lg font-black text-blue-950 dark:text-sky-300 flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span>{currentRegion.title}</span>
                <span className="text-xs text-slate-500 font-mono font-bold hidden sm:inline">({currentRegion.cityLabel})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {currentRegion.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              {/* Button to open dedicated area landing page */}
              <button
                type="button"
                onClick={() => {
                  const slugMap: Record<string, string> = {
                    'zayed-october': 'sheikh-zayed',
                    'new-cairo': 'new-cairo',
                    'madinaty-rehab': 'madinaty',
                    'new-capital': 'new-capital',
                    'north-coast-gouna': 'north-coast',
                  };
                  const targetSlug = slugMap[currentRegion.id] || 'sheikh-zayed';
                  if (onSelectArea) {
                    onSelectArea(targetSlug);
                  } else {
                    window.location.hash = `#area/${targetSlug}`;
                  }
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Compass className="w-4 h-4" />
                <span>تصفح صفحة وخدمات {currentRegion.title.split('و')[0]} بالكامل 👈</span>
              </button>

              {/* Quick Filter Search inside Region */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن كمبوندك..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-blue-800 bg-slate-50 dark:bg-blue-950/50 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-amber-500 font-bold"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Compounds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCompounds.map((comp) => (
              <motion.div
                key={comp.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border-2 bg-white dark:bg-[#031126] border-slate-200 dark:border-blue-900/70 hover:border-amber-400 dark:hover:border-amber-400 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar with Badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{comp.permitStatus}</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                      خدمة VIP
                    </span>
                  </div>

                  {/* Compound Name */}
                  <div className="space-y-0.5">
                    <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-sky-400 transition-colors">
                      {comp.nameAr}
                    </h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                      {comp.nameEn}
                    </div>
                  </div>

                  {/* Property Type & Winch Notice */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-blue-950/50 border border-slate-200 dark:border-blue-900/60 text-xs space-y-1.5 font-medium">
                    <div className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                      <span>{comp.type}</span>
                    </div>
                    <div className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{comp.winchAllowed}</span>
                    </div>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-1.5 pt-1">
                    {comp.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Compound Booking Action */}
                <div className="pt-3 border-t border-slate-200 dark:border-blue-900/60 space-y-2">
                  <a
                    href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(comp.ctaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>حجز نقل لكمبوند {comp.nameAr.split('-')[0].replace('كمبوند', '')}</span>
                  </a>

                  <a
                    href={`tel:${COMPANY_DATA.phones[0].number}`}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-blue-900/40 dark:hover:bg-blue-900/70 text-slate-800 dark:text-slate-200 font-black py-2 px-3 rounded-xl text-xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                    <span>تنسيق فوري مع مسؤول الكمبوندات: 01233391255</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live Call-Out Card for Residents */}
        <div className="rounded-3xl p-6 sm:p-8 border-2 border-amber-400/80 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
              <span>👑 خدمة كبار العملاء VIP</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-amber-400">
              كمبوندك مش موجود في القائمة؟ جاهزون لخدمتك في أي مكان بمصر!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
              أسطول شاحنات رويال موفرز VIP وأوناشنا الهيدروليكية مصرح لها بالدخول لكافة المدن الجديدة والمجتمعات العمرانية المغلقة بجميع محافظات الجمهورية.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                'السلام عليكم، استفسار عن إمكانية نقل وتغليف أثاث فيلا/شقة في كمبوند مع رويال موفرز VIP'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>تواصل مع مسؤول الكمبوندات</span>
            </a>

            <a
              href={`tel:${COMPANY_DATA.phones[0].number}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>الخط الساخن: 01233391255</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
