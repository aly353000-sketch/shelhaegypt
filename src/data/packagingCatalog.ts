/**
 * Packaging Materials Catalog and Internal Pricing Data
 * Note: Individual unit margin prices are kept internally in site data and added
 * dynamically to total costs in quotes/quick calculations without exposing unit markup lists to clients.
 */

export interface PackagingItem {
  id: string;
  nameAr: string;
  category: 'cartons' | 'bubble' | 'stretch' | 'tape' | 'bags' | 'rolls' | 'tools';
  specsAr: string;
  unitPrice: number; // EGP (internal rate)
  descriptionAr: string;
  isPopular?: boolean;
}

export interface PackagingBundle {
  id: string;
  nameAr: string;
  shortDesc: string;
  recommendedFor: string;
  items: { itemId: string; count: number }[];
}

export const PACKAGING_CATALOG: PackagingItem[] = [
  // 5-Ply Cartons
  {
    id: 'box-40-40-60',
    nameAr: 'كرتونة 5 راق (40 * 40 * 60 سم)',
    category: 'cartons',
    specsAr: '40 عرض * 40 ارتفاع * 60 طول - 5 راق مقوى',
    unitPrice: 50,
    descriptionAr: 'كرتونة ممتازة مخصصة للنيش والصيني والزجاج والكريستال',
    isPopular: true,
  },
  {
    id: 'box-50-50-50',
    nameAr: 'كرتونة 5 راق (50 * 50 * 50 سم)',
    category: 'cartons',
    specsAr: '50 عرض * 50 ارتفاع * 50 طول - 5 راق مقوى',
    unitPrice: 60,
    descriptionAr: 'مخصصة لأواني المطبخ والحلل والأجهزة المتوسطة',
    isPopular: true,
  },
  {
    id: 'box-50-50-80',
    nameAr: 'كرتونة 5 راق (50 * 50 * 80 سم)',
    category: 'cartons',
    specsAr: '50 عرض * 50 ارتفاع * 80 طول - 5 راق مقوى',
    unitPrice: 70,
    descriptionAr: 'مخصصة للنجف، الكتب، الملابس، الأحذية، والتحف والأنتيكات',
    isPopular: true,
  },
  {
    id: 'box-70-70-70',
    nameAr: 'كرتونة 5 راق جامبو (70 * 70 * 70 سم)',
    category: 'cartons',
    specsAr: '70 عرض * 70 ارتفاع * 70 طول - 5 راق مقوى ثقيل',
    unitPrice: 100,
    descriptionAr: 'كرتونة ممتازة جداً مخصصة للأحجام الكبيرة والمفروشات الثقيلة',
  },
  {
    id: 'box-60-60-90',
    nameAr: 'كرتونة 5 راق عملاقة (60 * 60 * 90 سم)',
    category: 'cartons',
    specsAr: '60 عرض * 60 ارتفاع * 90 طول - 5 راق مقوى',
    unitPrice: 100,
    descriptionAr: 'كرتونة ممتازة جداً مخصصة للأحجام الكبيرة والبطاطين واللحافات',
  },
  // 3-Ply Cartons
  {
    id: 'box-30-30-40',
    nameAr: 'كرتونة 3 راق (30 * 30 * 40 سم)',
    category: 'cartons',
    specsAr: '30 عرض * 30 ارتفاع * 40 طول - 3 راق أبيض مطبوع',
    unitPrice: 20,
    descriptionAr: '3 راق كرتونة خفيفة للمقتنيات الخفيفة والورقيات',
  },
  {
    id: 'box-25-25-30',
    nameAr: 'كرتونة 3 راق صغيرة (25 * 25 * 30 سم)',
    category: 'cartons',
    specsAr: '25 عرض * 25 ارتفاع * 30 طول - 3 راق أبيض مطبوع',
    unitPrice: 15,
    descriptionAr: 'كرتونة 3 راق مخصصة للإكسسوارات والأغراض الصغيرة',
  },

  // Bubble Wrap
  {
    id: 'bubble-60m',
    nameAr: 'رول بابلز هوائي (عرض 1 متر × 60 متر)',
    category: 'bubble',
    specsAr: 'عرض 1 متر - طول 60 متر - فقاعات هوائية ممتصة للصدمات',
    unitPrice: 230,
    descriptionAr: 'حماية فائقة للمقتنيات الزجاجية والتحف والشاشات',
    isPopular: true,
  },
  {
    id: 'bubble-100m',
    nameAr: 'رول بابلز هوائي (عرض 1 متر × 100 متر)',
    category: 'bubble',
    specsAr: 'عرض 1 متر - طول 100 متر',
    unitPrice: 300,
    descriptionAr: 'رول كبير اقتصادي لتغليف الأثاث بالكامل',
    isPopular: true,
  },
  {
    id: 'bubble-fayrouz-100m',
    nameAr: 'رول بابل الفيروز فائق الكثافة (عرض 1 متر × 100 متر)',
    category: 'bubble',
    specsAr: 'خامة ثقيلة جداً - عرض 1 متر × طول 100 متر',
    unitPrice: 550,
    descriptionAr: 'خامة ثقيلة جداً ومقاومة للتمزق لأعلى معايير الحماية الأوروبية',
  },

  // Stretch Film
  {
    id: 'stretch-2kg',
    nameAr: 'رول استرتش مطاطي صناعي (وزن 2 كجم وكسور)',
    category: 'stretch',
    specsAr: 'عرض 50 سم - وزن 2 كجم وكسور - مطاطية فائقة',
    unitPrice: 250,
    descriptionAr: 'عازل تام للأتربة والغبار والرطوبة وحماية المفروشات والكنب',
    isPopular: true,
  },

  // Adhesive Tape
  {
    id: 'tape-pack-6',
    nameAr: 'عمود سلوتب عريض 6 بكرات (البكرة 100 متر)',
    category: 'tape',
    specsAr: 'عمود 6 بكرات لاصق قوي - طول البكرة 100 متر',
    unitPrice: 150,
    descriptionAr: 'إحكام غلق الكراتين والصناديق بقوة ومقاومة للفتح',
    isPopular: true,
  },
  {
    id: 'tape-300m',
    nameAr: 'بكرة سلوتب عملاقة (طول 300 متر)',
    category: 'tape',
    specsAr: 'بكرة لاصقة بطول 300 متر',
    unitPrice: 60,
    descriptionAr: 'بكرة شريط لاصق طويلة وعالية التحمل',
  },

  // Masking tape (شكرتون)
  {
    id: 'shakarton-5cm',
    nameAr: 'بكرة شكرتون مقوى (عرض 5 سم)',
    category: 'tape',
    specsAr: 'عرض 5 سم - لصق فائق التحمل',
    unitPrice: 60,
    descriptionAr: 'شريط شكرتون مقوى لتثبيت حواف الكراتين والأثاث',
  },
  {
    id: 'shakarton-7cm',
    nameAr: 'بكرة شكرتون عريض (عرض 7 سم)',
    category: 'tape',
    specsAr: 'عرض 7 سم - قوة التصاق عالية',
    unitPrice: 60,
    descriptionAr: 'شريط شكرتون عريض لحماية الزوايا والتثبيت الثقيل',
  },

  // Tools & Accessories
  {
    id: 'tape-dispenser',
    nameAr: 'ماكينة لصق وسحب السلوتب اليدوية',
    category: 'tools',
    specsAr: 'ماكينة فرد وقطع احترافية',
    unitPrice: 200,
    descriptionAr: 'ماكينة سهلة وسريعة لقطع ولصق السلوتب بكفاءة',
  },
  {
    id: 'dobara-twine',
    nameAr: 'لفة دوبارة ربط قوية',
    category: 'tools',
    specsAr: 'لفة دوبارة خيط متين ومقاوم للقطع',
    unitPrice: 50,
    descriptionAr: 'لإحكام ربط السجاد والمراتب وحزم الكراتين',
  },

  // Heavy Cardboard & Foam Rolls
  {
    id: 'cardboard-roll-20kg',
    nameAr: 'رول كرتون مضلع واقٍ للأرضيات والأثاث (وزن 20 كجم)',
    category: 'rolls',
    specsAr: 'وزن 20 كجم (28 ج.م / كجم)',
    unitPrice: 600,
    descriptionAr: 'كرتون مضلع سميك لحماية الممرات والأبواب وتبطين الأثاث الضخم',
  },
  {
    id: 'foam-roll-100m',
    nameAr: 'رول فوم عازل للصدمات (طول 100 متر - سُمك 2 مم)',
    category: 'rolls',
    specsAr: 'طول 100 متر - سُمك 2 مم أبيض ممتص للصدمات',
    unitPrice: 620,
    descriptionAr: 'طبقة فوم بيضاء ناعمة لحماية الشاشات والأسطح الحساسة والرخام',
  },

  // Plastic Bags & Zippered Bags
  {
    id: 'plastic-bags-1m',
    nameAr: 'شنط بلاستيك مقوى (مقاس متر - وزن 1 كجم)',
    category: 'bags',
    specsAr: 'شنط سميكة مقاس متر - وزن 1 كجم',
    unitPrice: 65,
    descriptionAr: 'حفظ وتعبئة الملابس والمفروشات والمخدات',
  },
  {
    id: 'plastic-bags-1.5m',
    nameAr: 'شنط بلاستيك مقوى كبيرة (مقاس متر ونصف - وزن 1 كجم)',
    category: 'bags',
    specsAr: 'شنط مقاس 1.5 متر - وزن 1 كجم',
    unitPrice: 65,
    descriptionAr: 'تعبئة البطاطين الكبيرة والمفارش الشتوية',
  },
  {
    id: 'zipper-bag-large',
    nameAr: 'شنطة بلاستيكية بسوستة (مقاس كبير)',
    category: 'bags',
    specsAr: 'شنطة قماشية بلاستيكية بسوستة مقاس كبير',
    unitPrice: 70,
    descriptionAr: 'شنطة متينة وقابلة لإعادة الاستخدام لحفظ الملابس والمفروشات',
  },
  {
    id: 'zipper-bag-medium',
    nameAr: 'شنطة بلاستيكية بسوستة (مقاس وسط)',
    category: 'bags',
    specsAr: 'شنطة بلاستيكية بسوستة مقاس وسط',
    unitPrice: 50,
    descriptionAr: 'شنطة بسوستة لحفظ الملايات والمفارش والأغراض الشخصية',
  },
];

/**
 * Convenient curated bundles so the client can easily choose by room need
 */
export const PACKAGING_BUNDLES: PackagingBundle[] = [
  {
    id: 'kitchen-china-pack',
    nameAr: 'باقة المطبخ والنيش والزجاج (تأمين كامل ضد الكسر)',
    shortDesc: 'كراتين 5 راق مخصصة + رول بابلز هوائي + سلوتب عريض',
    recommendedFor: 'لحماية أطقم الصيني، الكاسات، الحلل، ومستلزمات المطبخ الحساسة',
    items: [
      { itemId: 'box-40-40-60', count: 5 }, // 5 * 50 = 250
      { itemId: 'box-50-50-50', count: 3 }, // 3 * 60 = 180
      { itemId: 'bubble-60m', count: 1 },    // 1 * 230 = 230
      { itemId: 'tape-pack-6', count: 1 },   // 1 * 150 = 150
      // Total = 810
    ],
  },
  {
    id: 'wardrobe-clothes-pack',
    nameAr: 'باقة الملابس والدواليب والشنط بسوستة',
    shortDesc: 'كراتين ملابس 5 راق طويلة + شنط سوستة كبيرة ووسط + استرتش',
    recommendedFor: 'لتعبئة محتويات الدواليب بالكامل والملابس الشتوية والأحذية',
    items: [
      { itemId: 'box-50-50-80', count: 4 }, // 4 * 70 = 280
      { itemId: 'zipper-bag-large', count: 3 }, // 3 * 70 = 210
      { itemId: 'zipper-bag-medium', count: 2 }, // 2 * 50 = 100
      { itemId: 'stretch-2kg', count: 1 }, // 1 * 250 = 250
      // Total = 840
    ],
  },
  {
    id: 'salon-furniture-shield',
    nameAr: 'باقة حماية الصالونات والمفروشات الفاخرة (درع الأمان)',
    shortDesc: 'رول استرتش مطاطي + بابلز حماية + رول فوم عازل للشاشات والرخام',
    recommendedFor: 'لحماية الكنب المخملي، كراسي الصالون، الشاشات، والأسطح الحساسة',
    items: [
      { itemId: 'stretch-2kg', count: 2 }, // 2 * 250 = 500
      { itemId: 'bubble-60m', count: 1 }, // 1 * 230 = 230
      { itemId: 'shakarton-5cm', count: 2 }, // 2 * 60 = 120
      // Total = 850
    ],
  },
];

/**
 * Calculates total internal cost for selected materials.
 */
export function calculatePackagingTotal(selectedCounts: Record<string, number>): number {
  let total = 0;
  for (const [itemId, count] of Object.entries(selectedCounts)) {
    if (count > 0) {
      const item = PACKAGING_CATALOG.find((p) => p.id === itemId);
      if (item) {
        total += item.unitPrice * count;
      }
    }
  }
  return total;
}
