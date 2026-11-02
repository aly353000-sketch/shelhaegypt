import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  Truck, 
  ShieldCheck, 
  Phone, 
  Sparkles, 
  Check, 
  ShoppingCart, 
  Plus, 
  Minus, 
  RotateCcw, 
  Clock, 
  Layers, 
  Box, 
  HelpCircle,
  BadgePercent,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

export interface PackagingProduct {
  id: string;
  name: string;
  category: 'boxes' | 'bags' | 'wrap' | 'tape' | 'bundles';
  tag: string;
  dimensions?: string;
  specs: string;
  idealFor: string;
  price: number;
  unit: string;
  badge?: string;
  image: string;
  popular?: boolean;
}

const PACKAGING_CATALOG: PackagingProduct[] = [
  {
    id: 'box-m',
    name: 'كرتونة شِلها المقواة - مقاس وسط (5 طبقات)',
    category: 'boxes',
    tag: 'الأكثر طلباً للأواني والأجهزة',
    dimensions: '50 × 40 × 40 سم',
    specs: 'كرتون مضلع 5 طبقات عالي الكثافة (Double Wall)، يتحمل حتى 30 كجم',
    idealFor: 'أطقم الصيني، أواني المطبخ، الأجهزة الكهربائية الصغيرة، الكتب والمجلدات الثقيلة',
    price: 45,
    unit: 'كرتونة',
    badge: 'الأكثر مبيعاً ⭐',
    popular: true,
    image: '/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg',
  },
  {
    id: 'box-l',
    name: 'كرتونة شِلها الكبيرة - مقاس جامبو (5 طبقات)',
    category: 'boxes',
    tag: 'للشاشات والتحف والملابس',
    dimensions: '60 × 45 × 50 سم',
    specs: 'كرتون مضلع سميك 5 طبقات يتحمل أوزان حتى 40 كجم مع حواف مدعمة',
    idealFor: 'الشاشات، أجهزة المايكروويف، اللوحات والبراويز، التحف والمفروشات الخفيفة',
    price: 55,
    unit: 'كرتونة',
    badge: 'مقاس جامبو',
    image: '/assets/aistudio/FB_IMG_1793372075500_f4e6d910.jpg',
  },
  {
    id: 'box-s',
    name: 'كرتونة شِلها الصغيرة - متينة جداً للمقتنيات الثمينة',
    category: 'boxes',
    tag: 'للأشياء الدقيقة والثقيلة',
    dimensions: '40 × 30 × 30 سم',
    specs: '5 طبقات مضغوطة بقوة لمنع الانحناء أثناء الرص والتحميل بالسيارات أو الونش',
    idealFor: 'المستندات الهامة، أدوات العناية، البهارات، المقتنيات القابلة للكسر',
    price: 35,
    unit: 'كرتونة',
    image: '/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg',
  },
  {
    id: 'bags-jumbo',
    name: 'شنط وحقائب نقل المفروشات الكبيرة المقواة بسوستة محكمة',
    category: 'bags',
    tag: 'حصري لحماية المفروشات والملابس',
    dimensions: 'جامبو (100 × 60 × 45 سم تقريباً)',
    specs: 'قماش مقوى ووتربروف مبطن عالي المتانة، مزود بسوستة دائرية محكمة ومقابض يد مزدوجة',
    idealFor: 'البطاطين، الألحفة، الوسائد، المفروشات، الملابس المعلقة بدون تكسير أو أتربة',
    price: 85,
    unit: 'شنطة',
    badge: 'حماية 100% من الأتربة ✨',
    popular: true,
    image: '/assets/aistudio/FB_IMG_1793372080528_48a6e047.jpg',
  },
  {
    id: 'bubble-roll-large',
    name: 'رول بابلز هوائي أصلي كثيف (Bubble Wrap)',
    category: 'wrap',
    tag: 'درع الحماية الأول ضد الصدمات',
    dimensions: 'عرض 1 متر × طول 50 متر',
    specs: 'فقاعات هوائية مشبعة مضادة للصدمات والاحتكاك، لا تفقد هواءها تحت الضغط',
    idealFor: 'لف وتغليف أطقم الصيني، الكريستال، النجف، الشاشات، المرايا، والتحف النادرة',
    price: 320,
    unit: 'رول كامل (50م)',
    badge: 'جودة تصدير',
    image: '/assets/aistudio/FB_IMG_1793372075500_f4e6d910.jpg',
  },
  {
    id: 'stretch-film',
    name: 'رول استريتش بلاستيك مطاطي صناعي (Stretch Film)',
    category: 'wrap',
    tag: 'مانع تام للغبار والأتربة والرطوبة',
    dimensions: 'عرض 50 سم × وزن 2 كجم فائق الشد',
    specs: 'بلاستيك صناعي نقي ذو مرونة عالية والتصاق ذاتي قوي دون ترك أي آثار صمغية',
    idealFor: 'إحكام غلق الدواليب بعد تفكيكها، لف المراتب والصالونات والأنتريهات والأجهزة',
    price: 180,
    unit: 'رول',
    image: '/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg',
  },
  {
    id: 'corrugated-cardboard',
    name: 'رول كرتون مضلع مبطن لحماية الموبيليا والأخشاب',
    category: 'wrap',
    tag: 'ممتص للخدوش والتجريح',
    dimensions: 'عرض 1.2 متر × طول 30 متر تقريباً',
    specs: 'طبقات كرتون مقوى مضلع عالي المتانة يوضع بين قطع الأثاث داخل السيارة',
    idealFor: 'تغليف غرف النوم، السفرة، الطاولات الرخامية، وحماية حواف الأبواب والأثاث',
    price: 240,
    unit: 'رول',
    image: '/assets/aistudio/FB_IMG_1793372075500_f4e6d910.jpg',
  },
  {
    id: 'tape-pack',
    name: 'باكت أشرطة لاصقة عريضة فائقة الالتصاق (شكرتون عريض)',
    category: 'tape',
    tag: 'إغلاق محكم لا ينفتح',
    dimensions: 'عرض 5 سم × طول 100 ياردة',
    specs: 'مادة لاصقة قوية جداً تتحمل درجات الحرارة والوزن الثقيل أثناء النقل والتخزين',
    idealFor: 'إحكام غلق أسفل وأعلى الكراتين وتثبيت رولات البابلز والاستريتش',
    price: 130,
    unit: 'باكت (6 بكرات)',
    image: '/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg',
  },
  {
    id: 'bundle-apartment',
    name: 'باقة شقة كاملة (غرفتين أو 3 غرف) - العرض الأوفر',
    category: 'bundles',
    tag: 'كل ما تحتاجه في طلبية واحدة',
    specs: '20 كرتونة مقواة 5 طبقات (10 وسط + 10 كبيرة) + 1 رول بابلز 50م + 2 رول استريتش + 3 بكرات شكرتون عريض + 2 شنطة مفروشات سوستة',
    idealFor: 'العائلات التي ترغب في تجهيز وتعبئة شقتها ذاتياً بأعلى خامات شِلها المعتمدة',
    price: 1550,
    unit: 'باقة كاملة شاملة التوصيل',
    badge: 'وفر 250 ج.م 💥',
    popular: true,
    image: '/assets/aistudio/FB_IMG_1793372075500_f4e6d910.jpg',
  },
];

export const BoxesStoreSection: React.FC = () => {
  const { t, theme } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({});
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('القاهرة - التجمع الخامس');

  const filteredCatalog = useMemo(() => {
    if (activeCategory === 'all') return PACKAGING_CATALOG;
    return PACKAGING_CATALOG.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const updateQuantity = (id: string, delta: number) => {
    setCartQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartItems = useMemo(() => {
    return Object.entries(cartQuantities)
      .map(([id, qty]) => {
        const product = PACKAGING_CATALOG.find(p => p.id === id);
        return product ? { ...product, quantity: qty } : null;
      })
      .filter(Boolean) as (PackagingProduct & { quantity: number })[];
  }, [cartQuantities]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleOrderWhatsApp = () => {
    let orderDetails = '';
    if (cartItems.length > 0) {
      orderDetails = cartItems.map(item => `• ${item.name} × ${item.quantity} (${item.quantity * item.price} ج.م)`).join('\n');
    } else {
      orderDetails = '• استفسار عن طلب وتوصيل كراتين ومستلزمات تغليف شِلها';
    }

    const msg = encodeURIComponent(
      `السلام عليكم، أود طلب كراتين ومستلزمات تغليف من شركة شِلها (Shelha Egypt):\n\n` +
      `📋 قائمة الطلبات المقترحة:\n${orderDetails}\n\n` +
      (totalCartPrice > 0 ? `💰 إجمالي القيمة التقريبية: ${totalCartPrice.toLocaleString()} ج.م\n` : '') +
      `👤 الاسم: ${customerName || 'عميل شِلها'}\n` +
      `📱 الهاتف: ${customerPhone || 'متاح للتواصل'}\n` +
      `📍 عنوان التوصيل: ${deliveryArea}\n\n` +
      `برجاء إفادتي بميعاد التوصيل المتاح لباب المنزل وتأكيد الطلب.`
    );

    const waUrl = `https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${msg}`;
    trackWhatsAppClick(waUrl, 'متجر الكراتين ومستلزمات التغليف');
    window.open(waUrl, '_blank');
  };

  const handleCallSales = () => {
    trackPhoneClick(COMPANY_DATA.phones[0].number, 'طلب كراتين ومستلزمات');
    window.location.href = `tel:${COMPANY_DATA.phones[0].number}`;
  };

  return (
    <section 
      id="boxes-store" 
      data-alt-id="packaging-supplies"
      className="py-20 lg:py-28 text-right transition-colors duration-300 relative overflow-hidden bg-slate-50 text-slate-900"
    >
      {/* Ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header with High Contrast Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-950 text-xs sm:text-sm font-black shadow-sm">
            <Package className="w-4 h-4 text-amber-800" />
            <span>خدمة بيع وتوصيل الكراتين ومستلزمات التغليف لباب المنزل</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            كراتين شِلها 5 طبقات ومستلزمات التغليف الاحترافية
          </h2>

          <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed max-w-2xl mx-auto">
            مش أي كرتونة تشيل عفشك! نوفر لك كراتين تصدير مقواة عالية التحمل، رولات بابلز أصلية ضد الصدمات، وشنط مفروشات سوستة عملاقة تحمي أغراضك من الأتربة والرطوبة أثناء النقل والتخزين.
          </p>

          {/* Delivery & Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-100 text-blue-950 border-2 border-blue-300 text-xs font-black shadow-sm">
              <Truck className="w-4 h-4 text-blue-800" />
              <span>توصيل فوري بنفس اليوم في القاهرة والجيزة</span>
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border-2 border-emerald-300 text-xs font-black shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>كرتون 5 طبقات متين يتحمل حتى 40 كجم</span>
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 border-2 border-amber-400 text-xs font-black shadow-sm">
              <BadgePercent className="w-4 h-4 text-amber-800" />
              <span>أسعار جملة مع الدفع عند الاستلام بعد المعاينة</span>
            </span>
          </div>
        </div>

        {/* Real Visual Showcase (User Stock Photos Highlight) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Photo 1: Boxes Stack & Bubble Roll */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-300 dark:border-blue-900/60 shadow-xl bg-white dark:bg-slate-900 flex flex-col">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg"
                alt="كراتين نقل وتغليف 5 طبقات ورولات بابلز متينة من شِلها"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-600 text-white font-black text-xs shadow-md">
                خامات حقيقية معتمدة
              </span>
              <div className="absolute bottom-3 right-3 left-3 text-white space-y-1">
                <div className="text-sm font-black">أهرامات الكراتين 5 طبقات المقواة</div>
                <div className="text-xs text-sky-200 font-bold">سمك مضاعف لحماية الصيني والأجهزة والشاشات</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2.5">
              <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                كرتون مضلع متين لا ينثني ولا يتمزق عند رص العفش فوق بعضه داخل سيارات النقل المغلقة.
              </p>
              <div className="flex items-center justify-between font-black text-blue-700 dark:text-sky-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>متوفر مقاسات: وسط • كبير • جامبو</span>
                <span className="text-emerald-700 dark:text-emerald-400">جاهز للتوصيل فوراً</span>
              </div>
            </div>
          </div>

          {/* Photo 2: Warehouse Stock & Ready Delivery */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-300 dark:border-blue-900/60 shadow-xl bg-white dark:bg-slate-900 flex flex-col">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/assets/aistudio/FB_IMG_1793372075500_f4e6d910.jpg"
                alt="مستودع كراتين شِلها الجاهز للشحن الفوري لباب منزلك"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                مخزون ضخم جاهز 24/7
              </span>
              <div className="absolute bottom-3 right-3 left-3 text-white space-y-1">
                <div className="text-sm font-black">مستودع كراتين ومستلزمات شِلها</div>
                <div className="text-xs text-amber-200 font-bold">تجهيز وشحن فوري لأي عدد كراتين تحتاجه</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2.5">
              <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                مهما كان حجم شقتك أو فيلتك، نوفر لك جميع الكميات فورياً مع إمكانية إرجاع الفائض دون أي شروط.
              </p>
              <div className="flex items-center justify-between font-black text-blue-700 dark:text-sky-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>توصيل لكافة المحافظات</span>
                <span className="text-emerald-700 dark:text-emerald-400">دفع عند الاستلام</span>
              </div>
            </div>
          </div>

          {/* Photo 3: Patterned Zipper Storage Bags */}
          <div className="group relative rounded-3xl overflow-hidden border border-slate-300 dark:border-blue-900/60 shadow-xl bg-white dark:bg-slate-900 flex flex-col">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src="/assets/aistudio/FB_IMG_1793372080528_48a6e047.jpg"
                alt="شنط وأكياس نقل المفروشات والملابس المقواة بسوستة محكمة"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs shadow-md">
                حصري للمفروشات والملابس
              </span>
              <div className="absolute bottom-3 right-3 left-3 text-white space-y-1">
                <div className="text-sm font-black">شنط المفروشات والبطاطين الجامبو</div>
                <div className="text-xs text-emerald-200 font-bold">سوستة دائرية محكمة وقماش وتربروف مقاوم للأتربة</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between text-xs space-y-2.5">
              <p className="text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                الحل الأمثل لنقل البطاطين والمفروشات والملابس بدون كرمشة، تحميها 100% من الأتربة وعوادم السيارات أثناء النقل.
              </p>
              <div className="flex items-center justify-between font-black text-blue-700 dark:text-sky-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>قماش وتربروف متين بمقابض</span>
                <span className="text-amber-700 dark:text-amber-400">سعة ضخمة للبطاطين</span>
              </div>
            </div>
          </div>

        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'جميع المستلزمات' },
            { id: 'boxes', label: '📦 كراتين 5 طبقات' },
            { id: 'bags', label: '🎒 شنط المفروشات بسوستة' },
            { id: 'wrap', label: '🛡️ بابلز واستريتش وكرتون' },
            { id: 'tape', label: '🩹 شكرتون عريض' },
            { id: 'bundles', label: '💥 باقات التوفير المتكاملة' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer border ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white border-blue-700 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map(item => {
            const count = cartQuantities[item.id] || 0;
            return (
              <div
                key={item.id}
                className="rounded-3xl border-2 border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image header with badge */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {item.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs shadow-md">
                        {item.badge}
                      </span>
                    )}

                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-white">
                      <span className="text-xs font-black bg-blue-600/90 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
                        {item.tag}
                      </span>
                      {item.dimensions && (
                        <span className="text-[11px] font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded dir-ltr text-sky-200">
                          {item.dimensions}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-slate-950 leading-snug">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-900 font-bold leading-relaxed">
                      {item.specs}
                    </p>

                    <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs">
                      <span className="font-black text-blue-950">الاستخدام المثالي: </span>
                      <span className="text-slate-900 font-bold">{item.idealFor}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Add/Minus Controls */}
                <div className="p-5 pt-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-700 font-black">السعر للقطعة:</div>
                    <div className="text-lg sm:text-xl font-black text-blue-900">
                      {item.price} <span className="text-xs font-bold text-slate-900">ج.م / {item.unit}</span>
                    </div>
                  </div>

                  {/* Interactive Quantity Selector */}
                  <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-2xl p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={count === 0}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-900 font-black flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      title="تقليل العدد"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-8 text-center font-black text-sm text-slate-950 font-mono">
                      {count}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                      title="زيادة العدد"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Order Action Box / Cart Floating Summary */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white shadow-2xl border border-sky-400/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-amber-400 text-xs sm:text-sm font-black">
              <Sparkles className="w-4 h-4" />
              <span>جاهزون لتسليم طلبيتك فوراً حتى باب المنزل</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
              {totalCartCount > 0 
                ? `طلبيتك المختارة: ${totalCartCount} قطعة • الإجمالي: ${totalCartPrice.toLocaleString()} ج.م`
                : 'اطلب كراتين ومستلزمات شِلها الآن بأفضل سعر في مصر'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-bold max-w-xl">
              يمكنك طلب أي عدد كراتين أو مستلزمات تغليف بمفردها دون الحاجة لطلب سيارة نقل، ونوفر لك خدمة التوصيل الفوري السريع.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleOrderWhatsApp}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <WhatsAppIcon size={20} className="fill-white" />
              <span>{totalCartCount > 0 ? 'تأكيد الطلبية عبر واتساب' : 'اطلب كراتين عبر واتساب'}</span>
            </button>

            <button
              type="button"
              onClick={handleCallSales}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>اتصل للطلب الفوري: {COMPANY_DATA.phones[0].number}</span>
            </button>

            {totalCartCount > 0 && (
              <button
                type="button"
                onClick={() => setCartQuantities({})}
                className="p-3.5 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs transition-colors cursor-pointer"
                title="تفريغ السلة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
