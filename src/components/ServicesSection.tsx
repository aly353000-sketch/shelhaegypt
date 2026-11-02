import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Phone, 
  Sparkles,
  Search,
  X,
  ArrowLeft
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';
import {
  ResidentialMovingIcon,
  CorporateMovingIcon,
  HydraulicWinchIcon,
  ProtectivePackagingIcon,
  AcTechnicianIcon,
  CoveredTruckIcon,
} from './ServiceIcons';

export const ServicesSection: React.FC = () => {
  const { t, theme } = useApp();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(COMPANY_DATA.services[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map service ID or iconName to dedicated custom SVG icons
  const renderCustomServiceIcon = (serviceId: string, isSelected: boolean) => {
    const iconClass = `w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 ${
      isSelected ? 'scale-110 drop-shadow-[0_4px_8px_rgba(56,189,248,0.5)]' : ''
    }`;

    switch (serviceId) {
      case 'residential-moving':
        return <ResidentialMovingIcon className={iconClass} size={32} />;
      case 'corporate-moving':
        return <CorporateMovingIcon className={iconClass} size={32} />;
      case 'hydraulic-winch':
        return <HydraulicWinchIcon className={iconClass} size={32} />;
      case 'furniture-packing':
        return <ProtectivePackagingIcon className={iconClass} size={32} />;
      case 'ac-appliances':
        return <AcTechnicianIcon className={iconClass} size={32} />;
      case 'covered-trucks':
        return <CoveredTruckIcon className={iconClass} size={32} />;
      default:
        return <ResidentialMovingIcon className={iconClass} size={32} />;
    }
  };

  // Real-time search filter across service titles, descriptions, keywords, and features
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return COMPANY_DATA.services;
    const q = searchQuery.toLowerCase().trim();
    return COMPANY_DATA.services.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.shortDesc.toLowerCase().includes(q) ||
      s.fullDesc.toLowerCase().includes(q) ||
      s.keywords.some(k => k.toLowerCase().includes(q)) ||
      s.features.some(f => f.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const activeService = useMemo(() => {
    return filteredServices.find(s => s.id === selectedServiceId) || filteredServices[0] || COMPANY_DATA.services[0];
  }, [filteredServices, selectedServiceId]);

  return (
    <section
      id="services"
      className={`py-16 lg:py-24 text-right overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-slate-100/60' : 'bg-[#020b18]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-sky-400 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>{t('خدمات متكاملة بأيقونات ومعايير أوروبية', 'Comprehensive Services with Bespoke Icons & European Standards')}</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
            {t('كل ما تحتاجه لنقل أثاثك في مكان واحد', 'Everything You Need for Moving in One Place')}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
            {t(
              'قسّمنا خدماتنا لتغطي كل تفصيلة من الألف إلى الياء، لنوفر عليك عناء البحث والتنسيق مع أكثر من جهة.',
              'We organized our services to cover every detail from A to Z, saving you time and hassle.'
            )}
          </p>
        </motion.div>

        {/* Real-Time Search Bar Component */}
        <div className="max-w-md mx-auto mb-10">
          <div className={`relative flex items-center rounded-2xl border transition-all shadow-md ${
            theme === 'light'
              ? 'bg-white border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100'
              : 'bg-slate-900/90 border-blue-800/70 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20'
          }`}>
            <Search className="w-5 h-5 text-sky-400 mr-3.5 ml-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('ابحث عن خدمة (مثال: ونش، تكييف، فلل، تغليف)...', 'Search services (e.g. winch, AC, packing, villa)...')}
              className={`w-full bg-transparent py-3 text-xs sm:text-sm outline-none ${
                theme === 'light' ? 'text-slate-900 placeholder-slate-400' : 'text-white placeholder-slate-500'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-2 ml-2 text-slate-400 hover:text-white"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-[11px] text-sky-400 font-bold mt-1.5 text-center">
              {t(`تم العثور على ${filteredServices.length} خدمات مطابقة`, `Found ${filteredServices.length} matching services`)}
            </div>
          )}
        </div>

        {/* Custom SVG Icon Cards Grid Selector */}
        {filteredServices.length === 0 ? (
          <div className={`text-center p-8 rounded-2xl border mb-10 ${
            theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-blue-900 text-slate-300'
          }`}>
            <p className="text-sm font-bold">
              {t('لا توجد خدمات مطابقة لكلمة البحث الحالية.', 'No services matched your search.')}
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-2 text-xs font-bold text-sky-400 underline cursor-pointer"
            >
              {t('عرض جميع الخدمات', 'Show all services')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
            {filteredServices.map((service, idx) => {
              const isSelected = service.id === activeService?.id;
              return (
                <motion.button
                  type="button"
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: 'easeOut' }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-600 to-sky-600 text-white border-sky-300 font-extrabold shadow-xl shadow-blue-500/30 ring-2 ring-sky-400/40'
                      : theme === 'light'
                        ? 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                        : 'bg-slate-900/80 text-slate-300 border-blue-900/50 hover:border-blue-700 hover:text-white'
                  }`}
                >
                  <div className={`relative p-3.5 sm:p-4 rounded-2xl mb-2.5 transition-all duration-300 ${
                    isSelected
                      ? 'bg-white/20 text-white shadow-lg shadow-sky-500/30 scale-110 ring-2 ring-white/50'
                      : theme === 'light'
                        ? 'bg-blue-50/80 group-hover:bg-blue-100 text-blue-600 group-hover:scale-110 shadow-sm'
                        : 'bg-blue-950/80 group-hover:bg-blue-900/90 text-sky-400 group-hover:scale-110 shadow-sm'
                  }`}>
                    {isSelected && (
                      <span className="absolute inset-0 rounded-2xl bg-sky-300/30 animate-pulse pointer-events-none" />
                    )}
                    {renderCustomServiceIcon(service.id, isSelected)}
                  </div>
                  <span className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">
                    {service.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Selected Service In-Depth Showcase Card */}
        {activeService && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className={`border rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#031126] border-blue-800/70'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                
                {/* Image & Badge Column */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <motion.img
                    key={`img-${activeService.id}`}
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-l lg:from-[#031126] lg:to-transparent" />
                  
                  <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-sky-400/40 px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    {renderCustomServiceIcon(activeService.id, true)}
                    <span>{t('خدمة معتمدة 100%', '100% Certified Service')}</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4 p-3 bg-slate-950/85 backdrop-blur-md rounded-xl border border-blue-900/50">
                    <div className="text-xs text-sky-300 font-bold">{t('الفئة المستهدفة:', 'Target Audience:')}</div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      {activeService.targetAudience}
                    </div>
                  </div>
                </div>

                {/* Content & Details Column */}
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold px-3 py-1 rounded-full">
                        {t('شِلها للخدمات اللوجستية المتخصصة', 'Shilha Specialized Logistics')}
                      </span>
                      <span className={`text-xs ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                        {t('متاح في كافة المحافظات', 'Available Across All Governorates')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600/10 border border-sky-400/30 shrink-0">
                        {renderCustomServiceIcon(activeService.id, false)}
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-black leading-tight ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
                        {activeService.title}
                      </h3>
                    </div>

                    <p className={`text-sm sm:text-base leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                      {activeService.fullDesc}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                        {t('ماذا تشمل هذه الخدمة؟', 'What does this service include?')}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeService.features.map((feat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className={`flex items-start gap-2 text-xs sm:text-sm ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                          >
                            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Specs Grid */}
                    <div className={`grid grid-cols-3 gap-2 pt-4 border-t ${theme === 'light' ? 'border-slate-100' : 'border-blue-900/60'}`}>
                      {activeService.specs.map((sp, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border ${
                            theme === 'light'
                              ? 'bg-blue-50/60 border-blue-100'
                              : 'bg-blue-950/60 border-blue-900/50'
                          }`}
                        >
                          <div className={`text-[11px] ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{sp.label}</div>
                          <div className={`text-xs sm:text-sm font-bold mt-0.5 truncate ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>{sp.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`pt-6 border-t flex flex-wrap items-center gap-3 ${theme === 'light' ? 'border-slate-100' : 'border-blue-900/60'}`}>
                    <a
                      href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                        t(`السلام عليكم، أرغب في حجز والاستفسار عن خدمة: ${activeService.title} مع شركة شِلها`, `Hello, I want to book: ${activeService.title}`)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>{t('طلب الخدمة عبر واتساب', 'Request via WhatsApp')}</span>
                    </a>

                    <a
                      href={`tel:${COMPANY_DATA.phones[0].number}`}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white px-5 py-3 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{t('اتصال مباشر للحجز', 'Call to Book')}</span>
                    </a>

                    <div className="text-xs text-sky-400 font-medium w-full sm:w-auto text-center sm:text-right">
                      ⚡ {t('معاينة مجانية وتحديد سعر ثابت قبل البدء', 'Free inspection and fixed upfront price')}
                    </div>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
