import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, User, CheckCircle2, RotateCcw, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
import { trackWhatsAppClick } from '../utils/analytics';

export const QuickContactForm: React.FC = () => {
  const { t, theme } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent, viaWhatsapp: boolean) => {
    e.preventDefault();
    if (!phone) return;

    const ref = `ROYAL-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);

    if (viaWhatsapp) {
      const msg = encodeURIComponent(
        `السلام عليكم، أرغب في حجز موعد نقل عفش مع رويال موفرز VIP:\n` +
        `• كود الطلب: ${ref}\n` +
        `• اسم العميل: ${name || 'عميل رويال موفرز VIP'}\n` +
        `• رقم الهاتف: ${phone}\n` +
        `"مش مجرد عمال نقل.. إحنا حراس لرفاهيتك."\n` +
        `برجاء التواصل لتأكيد الموعد والمعاينة الفنية المجانية.`
      );
      const waUrl = `https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${msg}`;
      trackWhatsAppClick(waUrl, 'نموذج الحجز السريع');
      window.open(waUrl, '_blank');
    }

    setSubmitted(true);
  };

  return (
    <section id="quick-contact" data-alt-id="contact-form" className="py-16 border-t text-right bg-[#020b18] border-blue-900/60 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border-2 border-blue-900/70 rounded-3xl p-6 sm:p-10 shadow-2xl bg-[#031126] relative overflow-hidden">
          
          {/* Subtle Ambient Royal Navy Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>حجز موعد ومعاينة مجانية 👑</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ابعتلنا دلوقتي.. سيبها على رويال موفرز VIP وإنت مرتاح!
            </h3>

            {/* Requested Brand Slogan */}
            <p className="text-base sm:text-xl font-black text-amber-400 tracking-wide pt-1">
              "مش مجرد عمال نقل.. إحنا حراس لرفاهيتك."
            </p>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              سجل اسمك ورقم هاتفك وسيتم التواصل معك خلال 10 دقائق لتأكيد الموعد وتوفير أفضل طاقم وونش هيدروليكي.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success-box"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="bg-gradient-to-b from-[#041633] to-[#031126] border-2 border-emerald-500/80 p-8 sm:p-10 rounded-3xl text-center space-y-6 shadow-xl relative z-10"
              >
                {/* Animated Success Checkmark */}
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                    <span>كود الحجز:</span>
                    <strong className="font-mono text-amber-300 font-black">{bookingRef}</strong>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-black text-white">
                    تم استلام طلبك بنجاح!
                  </h4>

                  <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto leading-relaxed">
                    شكراً لثقتك في رويال موفرز VIP. سيتصل بك مسؤول الحجوزات على الرقم{' '}
                    <strong className="text-amber-400 font-mono" dir="ltr">{phone}</strong>{' '}
                    خلال 10 دقائق لتأكيد تفاصيل الموعد والمعاينة المجانية.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-800 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إرسال طلب إضافي</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-5 relative z-10">
                
                {/* Exactly 2 Inputs as explicitly requested: Name & Phone only */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* 1. Name Input */}
                  <div>
                    <label className="block text-sm sm:text-base font-black mb-2 text-slate-200">
                      اسمك الكريم:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أ/ أحمد محمد"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm sm:text-base font-bold border-2 border-blue-900/80 bg-[#020b18] text-white focus:border-amber-400 focus:bg-[#031126] outline-none transition-all placeholder:text-slate-500 shadow-inner"
                      />
                      <User className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* 2. Phone Input */}
                  <div>
                    <label className="block text-sm sm:text-base font-black mb-2 text-slate-200">
                      رقم الهاتف المحمول (مطلوب):
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm sm:text-base font-bold border-2 border-blue-900/80 bg-[#020b18] text-white focus:border-amber-400 focus:bg-[#031126] outline-none transition-all placeholder:text-slate-500 shadow-inner"
                        dir="ltr"
                      />
                      <Phone className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-5 rounded-2xl text-sm sm:text-base lg:text-lg shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>إرسال الطلب فورياً عبر واتساب</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 px-5 rounded-2xl text-sm sm:text-base lg:text-lg shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <Phone className="w-5 h-5 text-slate-950" />
                    <span>اطلب اتصالاً من خدمة العملاء</span>
                  </button>
                </div>

                <div className="text-center text-xs text-slate-400 pt-1 font-medium">
                  🔒 بياناتك في سرية وخصوصية تامة ولن يتم استخدامها إلا للتواصل معك بخصوص موعد النقل.
                </div>
              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
