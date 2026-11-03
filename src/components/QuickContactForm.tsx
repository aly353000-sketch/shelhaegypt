import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Phone, MessageCircle, Calendar, MapPin, User, CheckCircle2, RotateCcw, Clock, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
import { trackWhatsAppClick } from '../utils/analytics';

export const QuickContactForm: React.FC = () => {
  const { t, theme } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fromLocation, setFromLocation] = useState('مدينة نصر');
  const [toLocation, setToLocation] = useState('التجمع الخامس');
  const [moveDate, setMoveDate] = useState('');
  const [serviceType, setServiceType] = useState('شقة سكنية شامل الفك والتركيب والتغليف');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent, viaWhatsapp: boolean) => {
    e.preventDefault();
    if (!phone) return;

    const ref = `SH-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);

    if (viaWhatsapp) {
      const msg = encodeURIComponent(
        `السلام عليكم، عايز أحجز موعد نقل عفش:\n` +
        `• كود الطلب: ${ref}\n` +
        `• الاسم: ${name || 'عميل شلها'}\n` +
        `• رقم الهاتف: ${phone}\n` +
        `• الخدمة: ${serviceType}\n` +
        `• من: ${fromLocation}\n` +
        `• إلى: ${toLocation}\n` +
        `• ميعاد النقل المقترح: ${moveDate || 'في أقرب وقت'}\n` +
        `برجاء التواصل لتأكيد التفاصيل وحجز الطاقم والونش.`
      );
      const waUrl = `https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${msg}`;
      trackWhatsAppClick(waUrl, 'نموذج الحجز السريع');
      window.open(waUrl, '_blank');
    }

    setSubmitted(true);
  };

  return (
    <section id="quick-contact" data-alt-id="contact-form" className="py-16 border-t text-right bg-slate-100 border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl bg-white">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-xs font-bold border border-blue-200 bg-blue-50 text-blue-900 px-3.5 py-1.5 rounded-full inline-block shadow-xs">
              حجز موعد ومعاينة مجانية
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              ابعتلنا دلوقتي.. سيبها على شلها وإنت مرتاح!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              سجل بياناتك وسيتم التواصل معك خلال 10 دقائق لتأكيد الموعد وتوفير أفضل طاقم وونش هيدروليكي.
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
                className="bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-400 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden"
              >
                {/* Subtle emerald ambient decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />

                {/* Animated Success Checkmark */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  {/* Subtle Expanding Ripple */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.7 }}
                    animate={{ scale: [0.9, 1.4, 1.7], opacity: [0.6, 0.25, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-emerald-400 pointer-events-none"
                  />

                  {/* Circular Badge with Spring Pop */}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: [0, 1.15, 1], rotate: 0 }}
                    transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 relative z-10"
                  >
                    {/* SVG Checkmark with path drawing animation */}
                    <svg
                      className="w-10 h-10 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.45, delay: 0.3, ease: 'easeInOut' }}
                      />
                    </svg>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold"
                  >
                    <span>كود الحجز المرجعي:</span>
                    <strong className="font-mono text-emerald-950 font-black">{bookingRef}</strong>
                  </motion.div>

                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-2xl sm:text-3xl font-black text-slate-900"
                  >
                    تم استلام طلبك بنجاح!
                  </motion.h4>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.45 }}
                    className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed"
                  >
                    شكراً لثقتك في شركة شلها. فريق خدمة العملاء سيتصل بك على الرقم{' '}
                    <strong className="text-blue-700 font-bold" dir="ltr">{phone}</strong>{' '}
                    خلال 10 دقائق لتأكيد الموعد والمعاينة وتفاصيل النقل.
                  </motion.p>
                </div>

                {/* Features recap for peace of mind */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2"
                >
                  <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700 font-bold shadow-xs">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>متابعة فورية 24/7</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700 font-bold shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>تغليف أوروبي وحماية فائقة</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700 font-bold shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>معاينة مجانية</span>
                  </div>
                </motion.div>

                {/* Reset Action */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="pt-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إرسال طلب نقل إضافي</span>
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      الاسم بالكامل:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أ/ أحمد محمد"
                        className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      رقم الهاتف المحمول (مطلوب):
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010XXXXXXXX"
                        className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                        dir="ltr"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      مكان النقل الحالي (من):
                    </label>
                    <input
                      type="text"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      placeholder="مثال: مدينة نصر - مكرم عبيد"
                      className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      مكان النقل الجديد (إلى):
                    </label>
                    <input
                      type="text"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      placeholder="مثال: التجمع الخامس - النرجس"
                      className="w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      الخدمات المطلوبة:
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full rounded-xl px-3 py-2.5 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                    >
                      <option value="نقل شقة سكنية شامل الفك والتركيب والتغليف">نقل شقة سكنية شامل الفك والتركيب والتغليف</option>
                      <option value="نقل فيلا / دوبلكس مع ونش هيدروليكي">نقل فيلا / دوبلكس مع ونش هيدروليكي</option>
                      <option value="نقل مقر شركة / مكاتب / عيادات">نقل مقر شركة / مكاتب / عيادات</option>
                      <option value="طلب ونش رفع هيدروليكي فقط (1700ج)">طلب ونش رفع هيدروليكي فقط (يبدأ من 1700ج)</option>
                      <option value="تغليف أثاث وفك وتركيب تكييفات فقط (800ج)">تغليف أثاث وفك وتركيب تكييفات فقط (800ج)</option>
                      <option value="نقل عفش لمحافظة أخرى / الساحل">نقل عفش لمحافظة أخرى / الساحل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 text-slate-700">
                      ميعاد النقل المقترح:
                    </label>
                    <input
                      type="date"
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full rounded-xl px-4 py-2 text-xs sm:text-sm border border-slate-300 bg-slate-50 text-slate-900 focus:border-blue-500 focus:bg-white outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>إرسال الطلب فورياً عبر واتساب</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-600 hover:to-sky-500 text-white font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <Phone className="w-5 h-5" />
                    <span>اطلب اتصالاً من خدمة العملاء</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  🔒 بياناتك في سرية تامة ولن يتم استخدامها إلا للتواصل معك بخصوص موعد النقل.
                </div>
              </form>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
