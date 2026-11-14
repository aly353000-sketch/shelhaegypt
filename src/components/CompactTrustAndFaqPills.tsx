import React from 'react';
import { HelpCircle, Star, MessageSquareQuote, ChevronLeft, ShieldCheck } from 'lucide-react';

interface CompactTrustAndFaqPillsProps {
  onOpenFaq: () => void;
  onOpenReviews: () => void;
}

export const CompactTrustAndFaqPills: React.FC<CompactTrustAndFaqPillsProps> = ({
  onOpenFaq,
  onOpenReviews,
}) => {
  return (
    <section id="faqs" className="py-8 bg-[#020b18] border-t border-blue-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* FAQ Compact Pill / Card */}
          <button
            type="button"
            onClick={onOpenFaq}
            className="w-full p-5 rounded-3xl bg-[#031126] hover:bg-[#071d49] border-2 border-blue-900/70 hover:border-amber-400 text-white shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group text-right"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    الأسئلة الشائعة وإجابات فورية
                  </h3>
                  <span className="text-[10px] font-black bg-blue-900 text-sky-300 px-2 py-0.5 rounded-full border border-blue-700">
                    10 أسئلة
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  كل ما يهمك عن تكلفة الونش (2500ج)، التكييف (800ج)، ومواد التغليف.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-black text-amber-400 shrink-0">
              <span className="hidden sm:inline">افتح الأسئلة</span>
              <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Reviews Compact Pill / Card */}
          <button
            type="button"
            onClick={onOpenReviews}
            className="w-full p-5 rounded-3xl bg-[#031126] hover:bg-[#071d49] border-2 border-blue-900/70 hover:border-amber-400 text-white shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group text-right"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 fill-current text-amber-400" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    تقييمات وتجارب العملاء
                  </h3>
                  <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                    4.95 / 5 ⭐
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  شاهد تجارب مهندسين وأطباء وأصحاب شقق وفلل نقلوا مع رويال موفرز VIP.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-black text-amber-400 shrink-0">
              <span className="hidden sm:inline">آراء العملاء</span>
              <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};
