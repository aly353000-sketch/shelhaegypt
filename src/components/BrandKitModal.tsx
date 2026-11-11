import React, { useState } from 'react';
import { X, Download, CheckCircle, Sparkles, Image as ImageIcon, Eye, Layers, Palette, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ isOpen, onClose }) => {
  const { t } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'ads' | 'social' | 'board'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const brandAssets = [
    {
      id: 'logo_vip_square_ads',
      title: 'شعار جوجل ادز المربع الرسمي (Google Ads Square 1:1) - مع VIP',
      subtitle: 'نفس اللوجو المعتمد تماماً مع إضافة VIP للاسم: رويال موفرز | ROYAL MOVERS VIP',
      category: 'ads',
      path: '/assets/brand_royal/royal_movers_vip_square_ads.jpg',
      filename: 'royal_movers_vip_google_ads_square.jpg',
      specs: 'مربع متناسق 1:1 فائق الدقة (2048x2048)',
      bestFor: 'إعلانات جوجل ادز (Google Ads Responsive & Display) · ترويسة الموقع · المطبوعات الرسمية',
      tag: 'جوجل ادز مربعة (1:1) ⭐',
      bgClass: 'bg-white',
    },
    {
      id: 'logo_vip_landscape_ads',
      title: 'شعار جوجل ادز المستطيل الأفقي (Google Ads Landscape 16:9) - مع VIP',
      subtitle: 'نسخة مستطيلة أفقية عريضة معتمدة لإعلانات شبكة جوجل الإعلانية، وبانرات الويب وغلاف فيسبوك',
      category: 'ads',
      path: '/assets/brand_royal/royal_movers_vip_landscape_ads.jpg',
      filename: 'royal_movers_vip_google_ads_landscape.jpg',
      specs: 'مستطيل أفقي 16:9 عالي الدقة (1920x1080)',
      bestFor: 'إعلانات جوجل ادز العريضة (Landscape Ads) · غلاف صفحات الفيسبوك · ترويسة المواقع الإخبارية',
      tag: 'جوجل ادز مستطيلة (16:9) 🎯',
      bgClass: 'bg-white',
    },
    {
      id: 'logo_vip_social_media',
      title: 'نسخة السوشيال ميديا والبروفايل المجهزة (Social Media 1:1) - مع VIP',
      subtitle: 'مؤطرة بإطار كحلي ملكي فخم ولمسة ذهبية، مجهزة للاستخدام الفوري كصورة حساب وبروفايل',
      category: 'social',
      path: '/assets/brand_royal/royal_movers_vip_social_media.jpg',
      filename: 'royal_movers_vip_social_media.jpg',
      specs: 'مربع بروفايل 1:1 مهيأ لقص الصور الدائرية',
      bestFor: 'بروفايل فيسبوك وانستجرام · صورة واتساب بيزنس الرسمية · بوستات السوشيال ميديا المربعة',
      tag: 'بروفايل السوشيال ميديا 📱',
      bgClass: 'bg-[#020b18]',
    },
    {
      id: 'badge_truck_3d',
      title: 'الوسام والدرع ثلاثي الأبعاد لشاحنة السرعة (3D Truck Emblem Badge)',
      subtitle: 'شارة دائرية ميتاليك 3D بقرص كحلي وإطار ذهبي وكروم لامع، تتوسطها شاحنة النقل وخطوط السرعة المعدنية',
      category: 'social',
      path: '/assets/brand_royal/royal_movers_truck_3d_badge.jpg',
      filename: 'royal_movers_truck_3d_badge.jpg',
      specs: 'شارة دائرية 1:1 مخصصة للسوشيال ميديا',
      bestFor: 'بروفايل فيسبوك وانستجرام · صورة واتساب بيزنس · أيقونة التطبيق · إعلانات السوشيال ميديا المربعة',
      tag: 'الأفضل لفيسبوك وانستجرام 📱',
      bgClass: 'bg-[#030d22]',
    },
    {
      id: 'truck_brand_board',
      title: 'لوحة الهوية الشاملة لشعار الشاحنة وموك أب الأسطول (Identity Board)',
      subtitle: 'عرض كامل يضم: شاحنة مرسيدس كحلية، كراتين رويال، تيشرت الطاقم، كروت مذهبة، شريط التغليف، وتطبيق الموبايل',
      category: 'board',
      path: '/assets/brand_royal/royal_movers_truck_brand_board.jpg',
      filename: 'royal_movers_truck_brand_board.jpg',
      specs: 'لوحة هوية كاملة وموك أب واقعي عالي الدقة',
      bestFor: 'دليل الهوية المعتمد للمصممين والمطابع · بوستات فيسبوك الترويجية وإعلانات الثقة',
      tag: 'الهوية الكاملة لأسطول النقل 🚛',
      bgClass: 'bg-slate-100',
    },
    {
      id: 'logo_master',
      title: 'نسخة التاج الملكي الماستر (عربي + إنجليزي)',
      subtitle: 'التاج الملكي مع فيلا وسهم الانطلاق ونصوص رويال موفرز | ROYAL MOVERS VIP',
      category: 'ads',
      path: '/assets/brand_royal/royal_movers_logo_master.jpg',
      filename: 'royal_movers_master_logo.jpg',
      specs: 'مربع 1:1 عالي الدقة (2048x2048)',
      bestFor: 'إعلانات جوجل ادز (Google Ads) · موقع الويب · المطبوعات الرسمية · الفواتير',
      tag: 'نسخة التاج الملكي 👑',
      bgClass: 'bg-white',
    },
    {
      id: 'badge_3d',
      title: 'الوسام والدرع الملكي ثلاثي الأبعاد (3D Emblem)',
      subtitle: 'شارة دائرية ميتاليك بقرص كحلي وإطار ذهب 24 قيراط وكروم لامع محفورة بدقة',
      category: 'social',
      path: '/assets/brand_royal/royal_movers_badge_3d.jpg',
      filename: 'royal_movers_3d_emblem_badge.jpg',
      specs: 'دائري 1:1 مخصص للسوشيال ميديا',
      bestFor: 'بروفايل فيسبوك وانستجرام · صورة واتساب بيزنس · أيقونة التطبيق · إعلانات الميتا المربعة',
      tag: 'الأفضل للسوشيال ميديا',
      bgClass: 'bg-[#030d22]',
    },
    {
      id: 'brand_board',
      title: 'لوحة الهوية البصرية والموك أب الشاملة (Brand Board)',
      subtitle: 'عرض كامل يضم: سيارة مرسيدس كحلية، كراتين رويال، يونيفورم، كروت مذهبة، شريط لاصق، تطبيق',
      category: 'board',
      path: '/assets/brand_royal/royal_movers_brand_board.jpg',
      filename: 'royal_movers_brand_identity_board.jpg',
      specs: 'لوحة متكاملة عالية الدقة مع شاحنة النقل والزي الرسمي',
      bestFor: 'دليل الهوية للمصممين · بوستات فيسبوك الترويجية · إعلانات الثقة · مطابع الدعاية',
      tag: 'الهوية الكاملة والموك أب',
      bgClass: 'bg-slate-100',
    },
    {
      id: 'carpenter_photo',
      title: 'صورة نجار رويال موفرز المعتمد لفك وتركيب القصور',
      subtitle: 'فني معتمد بزي رويال موفرز الرسمي وأدوات دقيقة أثناء فك وتركيب غرف النوم والدواليب',
      category: 'social',
      path: '/assets/images/royal_movers_carpenter_vip.jpg',
      filename: 'royal_movers_carpenter_vip.jpg',
      specs: 'صورة واقعية عالية الدقة 4:3',
      bestFor: 'حملات إعلانات فيسبوك وانستجرام لخدمة فك وتركيب أثاث الفلل',
      tag: 'صور ميدانية معتمدة',
      bgClass: 'bg-slate-900',
    },
    {
      id: 'winch_villa_photo',
      title: 'صورة الونش الهيدروليكي أمام فيلا كمبوند راقٍ',
      subtitle: 'ونش رويال موفرز الحديث ممتد لبلكونة فيلا فخمة مع الشاحنة الكحلية المجهزة وطاقم العمل',
      category: 'ads',
      path: '/assets/images/royal_winch_villa.jpg',
      filename: 'royal_movers_winch_villa.jpg',
      specs: 'صورة إعلانية أفقية 4:3 فائقة الجودة',
      bestFor: 'إعلانات جوجل ادز لسكان التجمع وزايد والكمبوندات الفاخرة',
      tag: 'إعلانات الونش VIP',
      bgClass: 'bg-slate-900',
    },
    {
      id: 'ac_technician_photo',
      title: 'صورة فني تكييف رويال موفرز المعتمد',
      subtitle: 'فني تكييف بزي رويال موفرز الرسمي على سلم ألومنيوم داخل شقة راقية بفيو الفلل',
      category: 'social',
      path: '/assets/images/royal_ac_technician.jpg',
      filename: 'royal_movers_ac_technician.jpg',
      specs: 'صورة واقعية عالية الدقة 4:3',
      bestFor: 'حملات التكييف والأجهزة الكهربائية وحفظ شحنة الفريون',
      tag: 'خدمات التكييف VIP',
      bgClass: 'bg-slate-900',
    },
    {
      id: 'delicate_packing_photo',
      title: 'صورة تغليف ونقل المقتنيات والتحف الحساسة',
      subtitle: 'طاقم رويال موفرز بقفازات بيضاء وبابلز الفيروز الثقيل داخل صالون فيلا فاخرة',
      category: 'ads',
      path: '/assets/images/royal_delicate_packing.jpg',
      filename: 'royal_movers_delicate_packing.jpg',
      specs: 'صورة ترويجية عالية الدقة 4:3',
      bestFor: 'إعلانات استهداف عملاء الفلل والقصور والتحف والنجف الكريستال',
      tag: 'العناية بالتحف والزجاج',
      bgClass: 'bg-slate-900',
    },
  ];

  const filteredAssets = activeCategory === 'all' 
    ? brandAssets 
    : brandAssets.filter(a => a.category === activeCategory);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      link.target = '_blank';
      link.click();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center animate-fadeIn text-right"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#031126] border-2 border-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative my-8"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 p-2.5 rounded-full transition-colors cursor-pointer border border-blue-800"
          title="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-lg shadow-amber-500/25">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-amber-300">
                مركز تحميل لوجوهات وهوية «رويال موفرز VIP» الرسمية
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              نسخ مجهزة بأعلى جودة للاستخدام المباشر في إعلانات جوجل ادز، صفحات الفيسبوك، الإنستجرام والمطبوعات
            </p>
          </div>
        </div>

        {/* Color Palette Guide Bar */}
        <div className="p-4 rounded-2xl bg-[#020b18] border border-blue-900/60 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>بالتة ألوان الهوية الملكية الرسمية:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#020b18] border border-blue-700 text-white font-bold">
              <span className="w-3 h-3 rounded-full bg-[#020b18] border border-white" />
              كحلي ملكي #020B18
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#071d49] border border-blue-600 text-white font-bold">
              <span className="w-3 h-3 rounded-full bg-[#071d49]" />
              أزرق إمبراطوري #071D49
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-bold">
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-slate-900" />
              ذهب ملكي 24k #D4AF37
            </span>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-blue-900/80 pb-4">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-blue-950/60 text-slate-300 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            جميع اللوجوهات والتصميمات ({brandAssets.length})
          </button>
          <button
            onClick={() => setActiveCategory('ads')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'ads'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-blue-950/60 text-slate-300 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            🎯 مخصصة لجوجل ادز والموقع (Google Ads)
          </button>
          <button
            onClick={() => setActiveCategory('social')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'social'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-blue-950/60 text-slate-300 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            📱 مخصصة لفيسبوك وانستجرام وواتساب
          </button>
          <button
            onClick={() => setActiveCategory('board')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeCategory === 'board'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-blue-950/60 text-slate-300 hover:text-white hover:bg-blue-900/60'
            }`}
          >
            🚚 لوحة الهوية الشاملة والموك أب
          </button>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-1">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="rounded-2xl border-2 border-blue-900/70 bg-[#020b18] overflow-hidden flex flex-col justify-between shadow-xl hover:border-amber-400/80 transition-all group"
            >
              {/* Asset Preview Container */}
              <div className={`relative h-56 sm:h-64 ${asset.bgClass} flex items-center justify-center p-3 overflow-hidden`}>
                <img
                  src={asset.path}
                  alt={asset.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Tag pill */}
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-1 rounded-lg shadow-md">
                  {asset.tag}
                </span>

                {/* Fullscreen Preview overlay trigger */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(asset.path)}
                  className="absolute bottom-3 left-3 bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-xl backdrop-blur-md transition-all shadow-md cursor-pointer border border-white/20"
                  title="معاينة بالحجم الكامل"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Asset Info & Download Action */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {asset.subtitle}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-blue-900/50 text-[11px] font-medium text-slate-400">
                  <div className="flex items-center gap-1.5 text-sky-300">
                    <span className="font-bold text-amber-400">الاستخدام الأفضل:</span>
                    <span className="line-clamp-1">{asset.bestFor}</span>
                  </div>
                  <div className="text-slate-400">
                    المواصفات: {asset.specs}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleDownload(asset.path, asset.filename)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل بجودة عالية (HD)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Image Preview Modal */}
        {previewImage && (
          <div
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl p-4 flex items-center justify-center animate-fadeIn"
            onClick={() => setPreviewImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] p-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 left-0 text-white bg-slate-800 p-2.5 rounded-full hover:bg-slate-700 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={previewImage}
                alt="معاينة الشعار"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border-2 border-amber-400 shadow-2xl"
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
