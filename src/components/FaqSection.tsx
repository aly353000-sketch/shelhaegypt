import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  X, 
  Sparkles, 
  Phone, 
  SlidersHorizontal,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA, FaqItem } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const FaqSection: React.FC = () => {
  const { t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // First item open by default

  const categories = [
    { id: 'الكل', label: 'جميع الأسئلة' },
    { id: 'أسعار', label: 'الأسعار والتكاليف' },
    { id: 'ونش', label: 'الونش الهيدروليكي (1700ج)' },
    { id: 'تكييف', label: 'التكييف والأجهزة (800ج)' },
    { id: 'تغليف', label: 'التغليف والصيني' },
    { id: 'أمان', label: 'الأمان والسلامة' },
    { id: 'مواعيد', label: 'المواعيد والمحافظات' },
  ];

  const filteredFaqs = useMemo(() => {
    return COMPANY_DATA.faqs.filter((faq) => {
      const matchesCategory = selectedCategory === 'الكل' || faq.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q || 
        faq.q.toLowerCase().includes(q) || 
        faq.a.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandAll = () => {
    setOpenIndices(filteredFaqs.map((_, idx) => idx));
  };

  const handleCollapseAll = () => {
    setOpenIndices([]);
  };

  return (
    <section id="faqs" className="py-16 lg:py-24 text-right bg-gradient-to-b from-white via-slate-50 to-blue-50/40 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-900 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-sm">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>الأسئلة الشائعة والأجوبة الدقيقة الشاملة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            كل ما يدور بذهنك عن نقل وتغليف الأثاث
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            إجابات واضحة وشفافة تساعدك على اتخاذ القرار الصحيح والتخطيط لنقل منزلك أو شركتك بكل راحة واطمئنان.
          </p>
        </div>

        {/* Dynamic Search & Category Controls */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative flex items-center bg-white rounded-2xl border border-slate-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all p-1">
            <Search className="w-5 h-5 text-blue-600 mr-3.5 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأسئلة (مثال: سعر الونش، التكييف، الصيني، التغليف، السيارات)..."
              className="w-full bg-transparent py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-2 ml-1 text-slate-400 hover:text-slate-600"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Tab Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = cat.id === 'الكل' 
                ? COMPANY_DATA.faqs.length 
                : COMPANY_DATA.faqs.filter(f => f.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setOpenIndices([0]);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-md shadow-blue-500/20 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Expand / Collapse Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
            <span>
              عرض <strong className="text-blue-700">{filteredFaqs.length}</strong> سؤال وجواب
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleExpandAll}
                className="hover:text-blue-600 font-bold underline cursor-pointer"
              >
                فتح الكل
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={handleCollapseAll}
                className="hover:text-blue-600 font-bold underline cursor-pointer"
              >
                إغلاق الكل
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-base mb-1">
              لم نعثر على أسئلة مطابقة لبحثك "{searchQuery}"
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              يمكنك مسح البحث أو التواصل معنا مباشرة للإجابة على أي استفسار فورياً.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('الكل');
              }}
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
            >
              عرض جميع الأسئلة
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndices.includes(idx);

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-blue-400 shadow-md ring-1 ring-blue-200'
                      : 'bg-white/90 border-slate-200 hover:border-blue-300 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-right font-black transition-colors cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors ${
                        isOpen ? 'bg-blue-600' : 'bg-slate-300 group-hover:bg-blue-400'
                      }`} />
                      <span className={`text-sm sm:text-base leading-snug transition-colors ${
                        isOpen ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-600'
                      }`}>
                        {faq.q}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded-xl shrink-0 mr-3 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-180 shadow-xs'
                        : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                          <p>{faq.a}</p>
                          <div className="flex items-center gap-2 pt-2 text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>معتمد من شركة شِلها لنقل وتغليف الأثاث | Shelha Furniture Movers</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Support Direct Help Card */}
        <div className="bg-gradient-to-r from-blue-900 to-sky-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-lg sm:text-xl font-black">
              عندك استفسار خاص أو محتاج معاينة مجانية؟
            </h3>
            <p className="text-xs sm:text-sm text-sky-100 max-w-lg">
              فريق خدمة عملاء شِلها متاح 24 ساعة للرد على استفسارك ومساعدتك في اختيار أنسب باقة لنقل بيتك.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                'السلام عليكم، عندي استفسار عن خدمات نقل وتغليف الأثاث مع شركة شِلها'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>واتساب فوري</span>
            </a>

            <a
              href={`tel:${COMPANY_DATA.phones[0].number}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-slate-100 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-blue-700" />
              <span>اتصال مباشر</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
