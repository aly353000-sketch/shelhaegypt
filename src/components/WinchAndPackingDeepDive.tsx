import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  PackageCheck, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  ZoomIn, 
  Layers, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const WinchAndPackingDeepDive: React.FC = () => {
  const { t } = useApp();
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <div className="space-y-20 py-16 text-right overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-t border-slate-200">
      
      {/* 1. Hydraulic Winch Dedicated Section */}
      <section id="winch-section" data-alt-id="winch-deep-dive" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div id="winch-deep-dive" className="scroll-mt-28" />
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          {/* Subtle Accent Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text & Features (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>أوناش هيدروليكية للأدوار المرتفعة حتى الدور 25</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-black shadow-xs">
                  سعر الونش يبدأ من ١,٧٠٠ ج.م فقط ⚡
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                ونش رفع وتنزيل الأثاث.. حماية تامة من ضيق السلالم والمصاعد
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                وداعاً لتجريح جدران السلالم أو تكسير الرخام وضيق المصاعد! توفر شركة شِلها أحدث أوناش رفع الأثاث الهيدروليكية المحمولة على شاحنات مجهزة. يحقق الونش وصول غرف النوم الضخمة والكنب والزجاج والأجهزة إلى شقتك حتى الطابق الـ 25 بدون أي خدش، مع مشغلين معتمدين وأحزمة أمان مطاطية.
              </p>

              {/* Highlights 4-box grid */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                {[
                  { title: 'سعر يبدأ من 1700ج', desc: 'تكلفة واضحة وثابتة بدون أي مصاريف خفية' },
                  { title: 'حتى الدور 25', desc: 'أقصى ارتفاع هيدروليكي فائق الأمان' },
                  { title: '400 كجم حمولة', desc: 'رفع وتنزيل أثقل غرف النوم والرخام' },
                  { title: 'أقل من ساعتين', desc: 'تنزيل أو رفع عفش شقة كاملة بسلام' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div className="text-blue-700 font-black text-base sm:text-lg">{item.title}</div>
                    <div className="text-xs mt-1 text-slate-600 font-medium">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${COMPANY_DATA.phones[0].number}`}
                  className="bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-600 hover:to-sky-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>طلب ونش هيدروليكي الآن (1700ج)</span>
                </a>
                <a
                  href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                    'السلام عليكم، استفسار عن حجز ونش رفع عفش هيدروليكي بسعر 1700ج من شركة شِلها'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border bg-emerald-600 hover:bg-emerald-500 text-white transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>معاينة مجانية وتحديد موعد الونش</span>
                </a>
              </div>
            </div>

            {/* Real Hydraulic Winch Photo (5 cols) - Increased Dimensions */}
            <div className="lg:col-span-5 relative group cursor-pointer" onClick={() => setZoomedImage('/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg')}>
              <div className="rounded-3xl overflow-hidden border-2 border-blue-200 shadow-2xl bg-slate-900 relative">
                <img
                  src="/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg"
                  alt="ونش رفع الأثاث الهيدروليكي شركة شِلها ممتد لواجهة عمارة سكنية"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />

                {/* Badges on image */}
                <div className="absolute top-4 right-4 bg-blue-700/90 text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md backdrop-blur-md">
                  ونش شِلها الهيدروليكي في الموقع ✅
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md text-white p-3.5 rounded-2xl border border-sky-400/30 text-xs flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sky-400">امتداد الونش للبلكونة بالدور السادس</div>
                    <div className="text-[11px] text-slate-300">منظومة رفع متوازنة مع أحزمة أمان متطورة</div>
                  </div>
                  <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </motion.div>
      </section>

      {/* 2. Packing Specialist Crew & AC Electrical Technician Section */}
      <section id="packing-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="bg-white border border-blue-200 rounded-3xl p-6 sm:p-10 shadow-xl"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Real Packing Photos Grid (5 cols) - Increased Dimensions */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {/* Photo 1: 3-man crew wrapping luxury sofa */}
                <div 
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer relative bg-slate-100"
                  onClick={() => setZoomedImage('/assets/aistudio/IMG-20261029-WA0010_1__f198d94c.jpg')}
                >
                  <img
                    src="/assets/aistudio/IMG-20261029-WA0010_1__f198d94c.jpg"
                    alt="فريق عمل شِلها الثلاثي يغلف كنبة صالون فاخرة"
                    className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2 right-2 left-2 text-[11px] font-bold text-white leading-tight">
                    طاقم شِلها يغلف كنبة صالون فاخرة
                  </div>
                </div>

                {/* Photo 2: Worker wrapping with seal */}
                <div 
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer relative bg-slate-100"
                  onClick={() => setZoomedImage('/assets/aistudio/IMG-20261029-WA0009_1__3127f7b9.jpg')}
                >
                  <img
                    src="/assets/aistudio/IMG-20261029-WA0009_1__3127f7b9.jpg"
                    alt="فني تغليف أثاث شِلها يثبت شريط الأمان"
                    className="w-full h-52 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-2 right-2 left-2 text-[11px] font-bold text-white leading-tight">
                    فني التغليف وأشرطة الأمان
                  </div>
                </div>
              </div>

              {/* Photo 3: Padded truck interior with wood battens */}
              <div 
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer relative bg-slate-100"
                onClick={() => setZoomedImage('/assets/aistudio/FB_IMG_1793372087782_e1c10367.jpg')}
              >
                <img
                  src="/assets/aistudio/FB_IMG_1793372087782_e1c10367.jpg"
                  alt="صندوق سيارة شِلها المبطن بشرائح خشبية سويدي وأحزمة ربط"
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-xs font-bold text-white">
                  <span>صندوق سيارة شِلها المبطن والمدعم بشرائح خشبية لحماية العفش</span>
                  <ZoomIn className="w-4 h-4 text-sky-300" />
                </div>
              </div>
            </div>

            {/* Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                  <PackageCheck className="w-4 h-4 text-blue-600" />
                  <span>تغليف أوروبي شامل وفنيو تكييف وكهرباء</span>
                </span>
                <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black shadow-xs">
                  فك وتركيب التكييف ٨٠٠ ج.م للوحدة ❄️
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                أجود خامات التغليف المعتمدة وفنيون محترفون للتكييف والأجهزة
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                كل قطعة أثاث لها خامات التغليف المخصصة لها: نستخدم بابلز الفيروز الثقيل للزجاج والتحف، كراتين دوبلكس 5 طبقات جديدة للملابس والمطبخ، فوم عازل للشاشات، وشنط قماشية بسحاب للمفروشات. كما يضم طاقمنا فنيين تكييف وهندسة كهرباء لفك التكييف مع حفظ شحنة الفريون وتركيبه فورياً بسعر ٨٠٠ ج.م للوحدة.
              </p>

              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {[
                  'تغليف الأطقم الصيني والكريستالات داخل كراتين 5 راق مبطنة بفقاقيع بابلز',
                  'فك وتركيب التكييفات الاسبليت والمركزي بسعر 800 ج.م مع الحفاظ على الفريون',
                  'تثبيت الشاشات الجدارية والنجف الكريستال وتوصيل الغسالات والسخانات بنفس اليوم',
                  'سيارات مغلقة مبطنة بشرائح خشبية سويدي وأحزمة ربط لمنع أي اهتزاز أثناء السفر',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                    'السلام عليكم، استفسار عن خدمات التغليف وفك وتركيب التكييفات (800ج) مع شركة شِلها'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>احجز خدمة التغليف والتكييفات</span>
                </a>

                <a
                  href={`tel:${COMPANY_DATA.phones[1].number}`}
                  className="font-bold px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center gap-2 border bg-white hover:bg-slate-50 text-blue-900 border-slate-300 transition-all hover:scale-105 active:scale-95 shadow-xs"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>اتصال مباشر: {COMPANY_DATA.phones[1].number}</span>
                </a>
              </div>

            </div>

          </div>

        </motion.div>
      </section>

      {/* Lightbox Modal for Photo Zoom */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomedImage}
              alt="معاينة مكبرة"
              className="max-h-[80vh] w-auto object-contain rounded-2xl border-2 border-sky-400 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between w-full text-white text-xs px-2">
              <span className="font-bold">شركة شِلها لنقل وتغليف الأثاث | Shelha Furniture Movers</span>
              <button
                type="button"
                onClick={() => setZoomedImage(null)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs cursor-pointer"
              >
                إغلاق ✕
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
