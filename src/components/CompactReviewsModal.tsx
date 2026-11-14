import React from 'react';
import { X, Star, Quote, CheckCircle2, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';

interface CompactReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompactReviewsModal: React.FC<CompactReviewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl rounded-3xl bg-[#031126] border-2 border-blue-800 text-white shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-900/80">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-400">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>تقييمات وتجارب العملاء الموثقة</span>
                <span className="text-xs font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-lg">
                  4.95 / 5 ⭐
                </span>
              </h3>
              <span className="text-xs text-sky-300 font-bold">
                أكثر من 16,850 عميل يثقون في رويال موفرز VIP لنقل الشقق والفلل بأسعار عادلة
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {COMPANY_DATA.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#041633] border border-blue-900/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white">{item.name}</h4>
                  <span className="text-xs text-sky-300 font-medium">{item.role}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{item.text}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-blue-900/40 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>عملية نقل موثقة ومؤكدة</span>
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-bold text-slate-300 text-center sm:text-right">
            انضم لآلاف العملاء الراضين وانقل بيتك براحة بال تامة.
          </span>
          <div className="flex items-center gap-2">
            <a
              href="tel:01233391255"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>01233391255</span>
            </a>
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent('السلام عليكم، استفسار عن حجز نقل عفش مع رويال موفرز VIP')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-2 rounded-xl flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>احجز الآن</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
