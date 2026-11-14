import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, User, CheckCircle2, RotateCcw, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
import { trackWhatsAppClick, trackBookingLead } from '../utils/analytics';
import { normalizeEgyptianPhone, isValidEgyptianPhone } from '../utils/phoneValidation';

const CALLBACK_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/aly353000@gmail.com';

export const QuickContactForm: React.FC = () => {
  const { t } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMode, setSubmitMode] = useState<'callback' | 'whatsapp'>('callback');
  const [deliveryStatus, setDeliveryStatus] = useState<'sent' | 'fallback'>('sent');
  const [bookingRef, setBookingRef] = useState('');
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const buildWhatsAppUrl = (refCode: string, customerName: string, normalizedPhone: string) => {
    const msg = encodeURIComponent(
      `السلام عليكم، أرغب في حجز موعد نقل عفش مع رويال موفرز VIP:\n` +
        `• كود الطلب: ${refCode}\n` +
        `• اسم العميل: ${customerName || 'عميل رويال موفرز VIP'}\n` +
        `• رقم الهاتف: ${normalizedPhone}\n` +
        `"مش مجرد عمال نقل.. إحنا حراس لرفاهيتك."\n` +
        `برجاء التواصل لتأكيد الموعد والمعاينة الفنية المجانية.`
    );
    return `https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${msg}`;
  };

  const validatePhoneInput = (): string | null => {
    const normalized = normalizeEgyptianPhone(phone);
    if (!normalized) {
      setErrorMsg(t('يرجى إدخال رقم الهاتف المحمول أولاً لنتواصل معك.', 'Please enter your mobile number first.'));
      phoneInputRef.current?.focus();
      return null;
    }
    if (!isValidEgyptianPhone(normalized)) {
      setErrorMsg(t('يرجى إدخال رقم موبايل مصري صحيح (مثال: 01012345678).', 'Please enter a valid Egyptian phone number.'));
      phoneInputRef.current?.focus();
      return null;
    }
    setErrorMsg(null);
    return normalized;
  };

  const handleWhatsAppLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const normalized = validatePhoneInput();
    if (!normalized) {
      e.preventDefault();
      return;
    }

    const ref = `ROYAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const waUrl = buildWhatsAppUrl(ref, name.trim(), normalized);
    e.currentTarget.href = waUrl;
    trackWhatsAppClick(waUrl, 'نموذج الحجز السريع (واتساب)');
    setBookingRef(ref);
    setPhone(normalized);
    setSubmitMode('whatsapp');
    setDeliveryStatus('sent');
    setSubmitted(true);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalized = validatePhoneInput();
    if (!normalized) return;

    const cleanName = name.trim() || 'عميل موقع رويال موفرز VIP';
    const ref = `ROYAL-${Math.floor(1000 + Math.random() * 9000)}`;

    setIsSubmitting(true);
    setBookingRef(ref);
    setPhone(normalized);
    setSubmitMode('callback');

    let delivered = false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const response = await fetch(CALLBACK_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          phone: normalized,
          booking_ref: ref,
          source: 'https://shelhaegypt.com/#quick-contact',
          _subject: `طلب اتصال ومعاينة جديد (${ref}) - ${normalized}`,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        delivered = true;
      }
    } catch {
      delivered = false;
    }

    trackBookingLead(normalized, cleanName, ref);
    setDeliveryStatus(delivered ? 'sent' : 'fallback');
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const currentNormalizedPhone = normalizeEgyptianPhone(phone) || phone;
  const liveWaHref = buildWhatsAppUrl(
    bookingRef || 'ROYAL-VIP',
    name.trim() || 'عميل رويال موفرز VIP',
    currentNormalizedPhone || '01XXXXXXXXX'
  );

  return (
    <section id="quick-contact" data-alt-id="contact-form" className="py-16 border-t text-right bg-[#020b18] border-blue-900/60 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-2 border-blue-900/70 rounded-3xl p-6 sm:p-10 shadow-2xl bg-[#031126] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>حجز موعد ومعاينة مجانية 👑</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              ابعتلنا دلوقتي.. سيبها على رويال موفرز VIP وإنت مرتاح!
            </h3>

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
                className="bg-gradient-to-b from-[#041633] to-[#031126] border-2 border-emerald-500/80 p-6 sm:p-10 rounded-3xl text-center space-y-6 shadow-xl relative z-10"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs font-bold">
                    <span>كود الحجز:</span>
                    <strong className="font-mono text-amber-300 font-black">{bookingRef}</strong>
                  </div>

                  <h4 className="text-xl sm:text-3xl font-black text-white">
                    {submitMode === 'whatsapp'
                      ? 'تم تجهيز رسالتك عبر واتساب!'
                      : deliveryStatus === 'sent'
                      ? 'تم استلام طلب الاتصال بنجاح!'
                      : 'تم تسجيل طلبك — أكّد فوراً عبر واتساب أو الهاتف'}
                  </h4>

                  <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto leading-relaxed">
                    شكراً لثقتك في رويال موفرز VIP.{' '}
                    {deliveryStatus === 'sent'
                      ? 'سيتواصل معك مسؤول الحجوزات على الرقم '
                      : 'لضمان أسرع رد خلال دقائق على الرقم '}
                    <strong className="text-amber-400 font-mono" dir="ltr">
                      {currentNormalizedPhone}
                    </strong>{' '}
                    يمكنك أيضاً إرسال تأكيد مباشر عبر واتساب أو الاتصال بنا الآن:
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-1">
                  <a
                    href={liveWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>تأكيد سريع عبر واتساب</span>
                  </a>
                  <a
                    href={`tel:${COMPANY_DATA.phones[0].number}`}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black py-3.5 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Phone className="w-5 h-5 text-white" />
                    <span dir="ltr">{COMPANY_DATA.phones[0].number}</span>
                  </a>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setErrorMsg(null);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-800 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إرسال طلب إضافي</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleCallbackSubmit} noValidate className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quick-contact-name" className="block text-sm sm:text-base font-black mb-2 text-slate-200">
                      اسمك الكريم:
                    </label>
                    <div className="relative">
                      <input
                        id="quick-contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="أ/ أحمد محمد"
                        className="w-full rounded-2xl px-4 py-3.5 text-sm sm:text-base font-bold border-2 border-blue-900/80 bg-[#020b18] text-white focus:border-amber-400 focus:bg-[#031126] outline-none transition-all placeholder:text-slate-500 shadow-inner"
                      />
                      <User className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quick-contact-phone" className="block text-sm sm:text-base font-black mb-2 text-slate-200">
                      رقم الهاتف المحمول (مطلوب):
                    </label>
                    <div className="relative">
                      <input
                        ref={phoneInputRef}
                        id="quick-contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errorMsg) setErrorMsg(null);
                        }}
                        placeholder="010XXXXXXXX"
                        className={`w-full rounded-2xl px-4 py-3.5 text-sm sm:text-base font-bold border-2 bg-[#020b18] text-white outline-none transition-all placeholder:text-slate-500 shadow-inner ${
                          errorMsg
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-blue-900/80 focus:border-amber-400 focus:bg-[#031126]'
                        }`}
                        dir="ltr"
                      />
                      <Phone className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-300 bg-rose-950/60 border border-rose-500/50 rounded-xl px-4 py-2.5"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={liveWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppLinkClick}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-5 rounded-2xl text-sm sm:text-base lg:text-lg shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>إرسال الطلب فورياً عبر واتساب</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-70 text-slate-950 font-black py-4 px-5 rounded-2xl text-sm sm:text-base lg:text-lg shadow-lg shadow-amber-500/25 transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 text-slate-950 animate-spin" />
                        <span>جاري إرسال طلبك...</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-5 h-5 text-slate-950" />
                        <span>اطلب اتصالاً من خدمة العملاء</span>
                      </>
                    )}
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
