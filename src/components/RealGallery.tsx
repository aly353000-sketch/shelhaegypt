import React, { useState } from 'react';
import { Camera, X, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const RealGallery: React.FC = () => {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('الكل');
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  const filters = ['الكل', 'أوناش', 'تغليف', 'فريق', 'سيارات', 'اعلان'];

  const filterLabels: Record<string, string> = {
    'الكل': 'جميع الصور الحقيقية',
    'أوناش': 'الونش الهيدروليكي',
    'تغليف': 'أعمال وخامات التغليف',
    'فريق': 'فريق العمل والزي الموحد',
    'سيارات': 'السيارات المبطنة والمجهزة',
    'اعلان': 'حملاتنا وشعاراتنا',
  };

  const filteredGallery = activeFilter === 'الكل'
    ? COMPANY_DATA.gallery
    : COMPANY_DATA.gallery.filter(g => g.category === activeFilter);

  return (
    <section id="gallery" className="py-16 lg:py-24 text-right bg-gradient-to-b from-white via-slate-50 to-blue-50/30 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
            <Camera className="w-4 h-4 text-blue-600" />
            <span>معرض الصور والتوثيق الميداني المباشر</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            صور حقيقية وغير معدلة من أرض الواقع
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            شاهد كواليس عمليات نقل وتغليف الأثاث، سياراتنا المبطنة من الداخل، وأوناشنا الهيدروليكية، وفريق عمل شلها أثناء تنفيذ المهام بأعلى درجات الاحترافية.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white font-black shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              {filterLabels[f] || f}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Generous, Comfortable Sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage({ url: item.url, title: item.title, desc: item.desc })}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 bg-white shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              {/* Increased Image Height (h-72 to h-84) */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-slate-950">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover overlay icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/90 text-white flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-7 h-7" />
                  </div>
                </div>

                <div className="absolute top-3.5 right-3.5 bg-slate-950/85 backdrop-blur-md border border-sky-400/30 text-sky-300 text-xs font-bold px-3 py-1 rounded-xl shadow-md">
                  {filterLabels[item.category] || item.category}
                </div>
              </div>

              <div className="p-5 space-y-1.5">
                <h3 className="font-black text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
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
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-slate-950/70 text-white flex items-center justify-center hover:bg-slate-950 transition-colors cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="p-6 bg-white space-y-2 text-right">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg sm:text-xl font-black text-blue-950">
                    {selectedImage.title}
                  </h3>
                  <span className="text-xs font-bold text-sky-700 bg-sky-100 border border-sky-300 px-3 py-1 rounded-xl shrink-0">
                    توثيق حقيقي ✅
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
