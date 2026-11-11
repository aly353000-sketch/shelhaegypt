import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, Sparkles, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';

interface CompactFaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompactFaqModal: React.FC<CompactFaqModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const categories = ['الكل', 'أسعار', 'ونش', 'أمان', 'تغليف', 'تكييف', 'مواعيد'];

  const filteredFaqs = activeCategory === 'الكل'
    ? COMPANY_DATA.faqs
    : COMPANY_DATA.faqs.filter(f => f.category === activeCategory);

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
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                الأسئلة الشائعة وإجابات فورية
              </h3>
              <span className="text-xs text-sky-300 font-bold">
                كل ما يدور في ذهنك عن أسعار الونش، التغليف، والضمان
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

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/70 hover:bg-blue-900 text-slate-300 border border-blue-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Faq Items Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-blue-900/70 bg-[#041633] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-right p-4 sm:p-5 flex items-center justify-between gap-3 text-sm sm:text-base font-black text-white hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium border-t border-blue-900/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Strip */}
        <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-bold text-slate-300 text-center sm:text-right">
            لديك سؤال آخر؟ فريق خدمة العملاء متاح 24/7 للإجابة الفورية.
          </span>
          <div className="flex items-center gap-2">
            <a
              href="tel:01233391255"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>01233391255</span>
            </a>
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent('السلام عليكم، لدي استفسار عن خدمات رويال موفرز VIP')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>واتساب</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
