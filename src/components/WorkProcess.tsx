import React from 'react';
import { motion } from 'motion/react';
import { ClipboardCheck, Package, Truck, ArrowDownUp, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WorkProcess: React.FC = () => {
  const { t, theme } = useApp();

  const steps = [
    {
      num: '01',
      title: t('الاتصال والمعاينة المسبقة', 'Contact & Pre-Inspection'),
      desc: t(
        'تتواصل معنا عبر الهاتف أو الواتساب، ويتم حصر محتويات العفش والأدوار والمكان، وتحديد سعر نهائي ثابت بدون أي مصاريف خفية.',
        'Reach us via call or WhatsApp. We review your furniture, floors, and location, giving you a fixed transparent price.'
      ),
      icon: <ClipboardCheck className="w-6 h-6 text-sky-400" />,
    },
    {
      num: '02',
      title: t('الفك والتغليف المتقن', 'Dismantling & Master Packing'),
      desc: t(
        'يصل طاقم النجارين والفنيين لفك غرف النوم والمطابخ، وفك التكييفات وشاشات التلفزيون وتغليف كل قطعة بالبابلز والكرتون والاسترتش.',
        'Carpenters and AC technicians dismantle bedrooms, kitchens, and screens, packing every piece in bubbles, cardboard & stretch.'
      ),
      icon: <Package className="w-6 h-6 text-sky-400" />,
    },
    {
      num: '03',
      title: t('التنزيل بالونش الهيدروليكي', 'Hydraulic Winch Lowering'),
      desc: t(
        'تنزيل الأثاث الثقيل والقطع الكبيرة من الواجهة أو البلكونة بواسطة الونش الهيدروليكي بأمان وسرعة تامة دون لمس السلالم.',
        'Lowering large furniture from balconies safely and smoothly via hydraulic winch without touching stairways.'
      ),
      icon: <ArrowDownUp className="w-6 h-6 text-sky-400" />,
    },
    {
      num: '04',
      title: t('النقل بالسيارات المغلقة', 'Padded Truck Transport'),
      desc: t(
        'رص وتثبيت الأثاث داخل سيارات شِلها المجهزة والمبطنة من الداخل لمنع تعرضه لأي اهتزاز أو أتربة على الطريق.',
        'Fastening furniture inside padded, sealed trucks to guard against bumps, dust, and weather during transit.'
      ),
      icon: <Truck className="w-6 h-6 text-sky-400" />,
    },
    {
      num: '05',
      title: t('الرفع والتركيب والترتيب الكامل', 'Lifting, Assembly & Setup'),
      desc: t(
        'رفع الأثاث لمسكنك الجديد، وإعادة تجميع الغرف والمطابخ وتركيب التكييفات والشاشات وترتيب الأثاث حسب رغبتك بالظبط.',
        'Lifting into your new home, re-assembling all bedrooms, mounting TVs, reinstalling ACs, and arranging your rooms.'
      ),
      icon: <CheckCircle className="w-6 h-6 text-sky-400" />,
    },
  ];

  return (
    <section className={`py-16 lg:py-24 text-right overflow-hidden transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50' : 'bg-[#030d22]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className={`inline-flex items-center gap-2 border text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full ${
            theme === 'light'
              ? 'bg-blue-100 border-blue-300 text-blue-900'
              : 'bg-blue-500/10 border-blue-500/30 text-sky-300'
          }`}>
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>{t('نظام عمل دقيق كالساعة السويسرية', 'Precise 5-Step Workflow')}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            {t('رحلة نقلك مع شِلها في 5 خطوات سهلة', 'Your Moving Journey with Shilha in 5 Easy Steps')}
          </h2>
          <p className={`text-base sm:text-lg ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {t(
              'خطوات مرتبة تتيح إنهاء عملية النقل في يوم واحد وبأعلى درجات الراحة والأمان.',
              'Organized steps designed for same-day completion with highest safety and peace of mind.'
            )}
          </p>
        </motion.div>

        {/* Steps Grid with Staggered Scroll-Triggered Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative border rounded-2xl p-5 space-y-3 transition-all duration-300 shadow-lg group cursor-default ${
                theme === 'light'
                  ? 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-blue-500/10'
                  : 'bg-[#031126] border-blue-900/60 hover:border-sky-400/60 hover:shadow-sky-500/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-50 border-blue-100 text-blue-600'
                    : 'bg-[#041633] border-blue-800/80 text-sky-400'
                }`}>
                  {st.icon}
                </div>
                <span className={`text-2xl font-black transition-colors ${
                  theme === 'light'
                    ? 'text-slate-300 group-hover:text-blue-600'
                    : 'text-blue-900 group-hover:text-sky-400'
                }`}>
                  {st.num}
                </span>
              </div>

              <h3 className={`text-base font-black transition-colors ${
                theme === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-white group-hover:text-sky-300'
              }`}>
                {st.title}
              </h3>

              <p className={`text-xs leading-relaxed ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
