import React, { useState } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const RealGallery: React.FC = () => {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const filters = ['الكل', 'أوناش', 'تغليف', 'فريق', 'سيارات'];

  const filterLabels: Record<string, string> = {
    'الكل': 'جميع الصور الحقيقية',
    'أوناش': 'الونش الهيدروليكي',
    'تغليف': 'التغليف الفاخر VIP',
    'فريق': 'فريق العمل والزي الموحد',
    'سيارات': 'السيارات المجهزة',
  };

  const filteredGallery = activeFilter === 'الكل'
    ? COMPANY_DATA.gallery
    : COMPANY_DATA.gallery.filter(g => g.category === activeFilter);

  return (
    <section id="gallery" className="py-16 lg:py-24 text-right bg-gradient-to-b from-[#020b18] via-[#041633] to-[#020b18] text-white border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Larger Font Sizes */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-sm sm:text-base font-black px-5 py-2 rounded-full shadow-sm">
            <Camera className="w-5 h-5 text-amber-400" />
            <span>معرض الصور والتوثيق الميداني المباشر 📸</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            صور حقيقية وغير معدلة من أرض الواقع
          </h2>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            شاهد كواليس عمليات نقل وتغليف الأثاث، سياراتنا المبطنة من الداخل، وأوناشنا الهيدروليكية، وفريق عمل رويال موفرز VIP أثناء تنفيذ المهام بأعلى درجات الاحترافية.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-lg shadow-blue-500/25 scale-105 border border-sky-400'
                  : 'bg-[#031126] text-slate-300 hover:bg-[#071d49] border border-blue-900 shadow-xs'
              }`}
            >
              {filterLabels[f] || f}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage({ url: item.url, title: item.title, desc: item.desc })}
              className="group relative rounded-3xl overflow-hidden border-2 border-blue-900/70 hover:border-amber-400 bg-[#031126] shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-950">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Hover overlay icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-7 h-7" />
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-sky-400/40 text-amber-300 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md">
                  {filterLabels[item.category] || item.category}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 left-4 z-10 w-11 h-11 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-950 transition-colors cursor-pointer shadow-lg"
                aria-label="إغلاق"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative max-h-[75vh] bg-black flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-7 bg-white space-y-2.5 text-right">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-black text-blue-950">
                    {selectedImage.title}
                  </h3>
                  <span className="text-xs sm:text-sm font-black text-sky-800 bg-sky-100 border border-sky-300 px-3.5 py-1.5 rounded-xl shrink-0">
                    توثيق حقيقي ✅
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {selectedImage.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
