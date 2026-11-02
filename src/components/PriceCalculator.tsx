import React, { useState, useMemo, useRef } from 'react';
import { 
  Calculator, 
  Phone, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw, 
  Package, 
  Truck, 
  Home, 
  Wrench, 
  ShieldCheck, 
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { PropertyType, QuoteRequest, calculateMovingQuote } from '../utils/pricing';
import { PACKAGING_CATALOG, PACKAGING_BUNDLES } from '../data/packagingCatalog';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

interface PriceCalculatorProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ isModal = false, onClose }) => {
  const { t, theme } = useApp();
  const wizardContainerRef = useRef<HTMLDivElement>(null);

  // Wizard Step (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [roomsCount, setRoomsCount] = useState<number>(3);
  const [trucksCount, setTrucksCount] = useState<number>(1);
  const [fromFloor, setFromFloor] = useState<number>(3);
  const [toFloor, setToFloor] = useState<number>(2);
  const [fromArea, setFromArea] = useState<string>('مدينة نصر');
  const [toArea, setToArea] = useState<string>('التجمع الخامس');
  const [isGovernorate, setIsGovernorate] = useState<boolean>(false);
  
  // Winch is strictly optional (1,700 EGP)
  const [needsWinch, setNeedsWinch] = useState<boolean>(false);

  // AC & Handyman (AC = 800 EGP per unit)
  const [acUnitsCount, setAcUnitsCount] = useState<number>(0);
  const [dismantleRoomsCount, setDismantleRoomsCount] = useState<number>(0);
  const [packedRoomsCount, setPackedRoomsCount] = useState<number>(0);
  const [needsAppliancesTechnician, setNeedsAppliancesTechnician] = useState<boolean>(false);
  const [needsKitchenDismantling, setNeedsKitchenDismantling] = useState<boolean>(false);

  // Packaging items & bundles (unit prices strictly kept internal)
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, number>>({});

  // Reset to clean defaults
  const handleReset = () => {
    setCurrentStep(1);
    setPropertyType('apartment');
    setRoomsCount(3);
    setTrucksCount(1);
    setFromFloor(3);
    setToFloor(2);
    setFromArea('مدينة نصر');
    setToArea('التجمع الخامس');
    setIsGovernorate(false);
    setNeedsWinch(false);
    setAcUnitsCount(0);
    setDismantleRoomsCount(0);
    setPackedRoomsCount(0);
    setNeedsAppliancesTechnician(false);
    setNeedsKitchenDismantling(false);
    setSelectedMaterials({});
  };

  const handleExitCalculator = () => {
    if (onClose) {
      onClose();
    }
    const targetEl = document.getElementById('services') || document.getElementById('hero');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGoBack = () => {
    handleExitCalculator();
  };

  const scrollToTopStep = () => {
    if (wizardContainerRef.current) {
      wizardContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      scrollToTopStep();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      scrollToTopStep();
    }
  };

  // Material count updater
  const updateMaterialCount = (itemId: string, delta: number) => {
    setSelectedMaterials((prev) => {
      const current = prev[itemId] || 0;
      const nextVal = Math.max(0, current + delta);
      if (nextVal === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: nextVal };
    });
  };

  // Add bundle items
  const applyBundle = (bundleId: string) => {
    const bundle = PACKAGING_BUNDLES.find((b) => b.id === bundleId);
    if (!bundle) return;
    setSelectedMaterials((prev) => {
      const copy = { ...prev };
      bundle.items.forEach(({ itemId, count }) => {
        copy[itemId] = (copy[itemId] || 0) + count;
      });
      return copy;
    });
  };

  const totalPackagingItemsCount = useMemo(() => {
    return Object.values(selectedMaterials).reduce((sum, c) => sum + (c > 0 ? c : 0), 0);
  }, [selectedMaterials]);

  const quoteRequest: QuoteRequest = useMemo(() => ({
    propertyType,
    roomsCount,
    trucksCount,
    fromFloor,
    toFloor,
    fromArea,
    toArea,
    isGovernorate,
    needsWinch,
    acUnitsCount,
    dismantleRoomsCount,
    needsDismantling: dismantleRoomsCount > 0,
    packedRoomsCount,
    needsPackaging: packedRoomsCount > 0,
    needsVipPackaging: packedRoomsCount > 0,
    needsAppliancesTechnician,
    needsKitchenDismantling,
    packagingItems: selectedMaterials,
  }), [
    propertyType,
    roomsCount,
    trucksCount,
    fromFloor,
    toFloor,
    fromArea,
    toArea,
    isGovernorate,
    needsWinch,
    acUnitsCount,
    dismantleRoomsCount,
    packedRoomsCount,
    needsAppliancesTechnician,
    needsKitchenDismantling,
    selectedMaterials,
  ]);

  const estimate = useMemo(() => calculateMovingQuote(quoteRequest), [quoteRequest]);

  const stepsList = [
    { num: 1, labelAr: 'العقار والموقع', icon: Home },
    { num: 2, labelAr: 'الغرف والسيارات', icon: Truck },
    { num: 3, labelAr: 'الفك والتكييف', icon: Wrench },
    { num: 4, labelAr: 'كراتين وخامات التغليف', icon: Package },
    { num: 5, labelAr: 'الونش والملخص النهائي', icon: Calculator },
  ];

  return (
    <div
      ref={wizardContainerRef}
      className={`relative border rounded-3xl p-4 sm:p-7 shadow-2xl text-right transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-[#031126] border-blue-900/70 text-slate-100'
      } ${isModal ? 'max-w-3xl w-full mx-auto my-6' : ''}`}
    >
      {/* Top Header & Navigation Bar with Prominent Back to Home Button */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={handleExitCalculator}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm shadow-sm transition-all cursor-pointer group active:scale-95"
          title={t('رجوع للصفحة الرئيسية', 'Back to Home')}
          aria-label={t('رجوع للصفحة الرئيسية', 'Back to Home')}
        >
          <ArrowRight className="w-4 h-4 text-blue-600 transition-transform group-hover:-translate-x-1" />
          <span>{t('رجوع للصفحة الرئيسية', 'Back to Home')}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-blue-950/70 hover:bg-blue-900 text-sky-300 border-blue-800'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('إعادة ضبط', 'Reset')}</span>
          </button>

          <span className="text-xs text-blue-700 font-black bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-full hidden sm:inline-block">
            {t('خصم 10% تلقائي', '10% Auto Discount')}
          </span>
        </div>
      </div>

      {/* Main Wizard Title */}
      <div className="mb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1 rounded-full mb-1.5">
          <Calculator className="w-3.5 h-3.5" />
          <span>{t('معالج حاسبة الأسعار المتطور (خطوة بخطوة)', 'Step-by-Step Smart Moving Wizard')}</span>
        </div>
        <h2 className={`text-lg sm:text-2xl font-black ${theme === 'light' ? 'text-blue-950' : 'text-white'}`}>
          {t('احسب تكلفة نقل عفشك في 5 خطوات سهلة', 'Calculate Moving Cost in 5 Simple Steps')}
        </h2>
        <p className={`text-xs sm:text-sm mt-0.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('سعر تقديري شفاف وعادل مع شِلها، وجميع الخدمات اختيارية 100% حسب رغبتك.', 'Transparent price estimate with Shilha. All services are 100% optional.')}
        </p>
      </div>

      {/* Mobile Wizard Steps Indicator Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2 text-sky-400">
          <span>{t(`الخطوة ${currentStep} من 5: ${stepsList[currentStep - 1].labelAr}`, `Step ${currentStep} of 5`)}</span>
          <span className="text-slate-400 text-[11px] font-medium">{Math.round((currentStep / 5) * 100)}% {t('مكتمل', 'Completed')}</span>
        </div>

        {/* Progress Bar (Enlarged and Prominent) */}
        <div className="w-full h-3 sm:h-3.5 rounded-full bg-slate-200 overflow-hidden mb-3.5 shadow-inner">
          <div
            className="h-full bg-gradient-to-l from-blue-700 via-sky-500 to-emerald-400 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Step Buttons (Clickable Tabs) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2">
          {stepsList.map((step) => {
            const Icon = step.icon;
            const isCurrent = step.num === currentStep;
            const isCompleted = step.num < currentStep;

            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num)}
                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-sky-400 shadow-md font-bold'
                    : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium'
                    : theme === 'light'
                    ? 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                    : 'bg-slate-900/60 text-slate-400 border-blue-950 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] sm:text-xs">{step.num}</span>
                </div>
                <span className="text-[10px] line-clamp-1 hidden md:block">
                  {step.labelAr}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Wizard Steps Content */}
      <div className={`p-4 sm:p-6 rounded-2xl border min-h-[340px] mb-6 ${
        theme === 'light' ? 'bg-slate-50/70 border-slate-200' : 'bg-[#020b18] border-blue-900/70'
      }`}>
        
        {/* STEP 1: العقار والموقع */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div>
              <label className={`block text-xs sm:text-sm font-bold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                1. {t('نوع العقار المراد نقله:', 'Property Type:')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'apartment', labelAr: 'شقة سكنية', labelEn: 'Apartment' },
                  { id: 'villa', labelAr: 'فيلا / دوبلكس', labelEn: 'Villa / Duplex' },
                  { id: 'office', labelAr: 'مكتب / شركة', labelEn: 'Office' },
                  { id: 'clinic', labelAr: 'عيادة / مركز طبي', labelEn: 'Clinic' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPropertyType(p.id as PropertyType)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      propertyType === p.id
                        ? 'bg-blue-600 text-white border-sky-400 shadow-md'
                        : theme === 'light'
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-blue-900/60'
                    }`}
                  >
                    {t(p.labelAr, p.labelEn)}
                  </button>
                ))}
              </div>
            </div>

            {/* Floors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {t('دور المكان الحالي (التحميل):', 'Current Floor:')}
                </label>
                <select
                  value={fromFloor}
                  onChange={(e) => setFromFloor(Number(e.target.value))}
                  className={`w-full rounded-xl px-3 py-2 text-xs sm:text-sm border outline-none ${
                    theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-blue-900 text-white'
                  }`}
                >
                  <option value={0}>{t('أرضي', 'Ground')}</option>
                  <option value={1}>{t('الدور الأول', 'Floor 1')}</option>
                  <option value={2}>{t('الدور الثاني', 'Floor 2')}</option>
                  <option value={3}>{t('الدور الثالث', 'Floor 3')}</option>
                  <option value={4}>{t('الدور الرابع', 'Floor 4')}</option>
                  <option value={5}>{t('الدور الخامس فما فوق', 'Floor 5+')}</option>
                  <option value={8}>{t('الدور الثامن فما فوق', 'Floor 8+')}</option>
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {t('دور المكان الجديد (التنزيل):', 'Destination Floor:')}
                </label>
                <select
                  value={toFloor}
                  onChange={(e) => setToFloor(Number(e.target.value))}
                  className={`w-full rounded-xl px-3 py-2 text-xs sm:text-sm border outline-none ${
                    theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-blue-900 text-white'
                  }`}
                >
                  <option value={0}>{t('أرضي', 'Ground')}</option>
                  <option value={1}>{t('الدور الأول', 'Floor 1')}</option>
                  <option value={2}>{t('الدور الثاني', 'Floor 2')}</option>
                  <option value={3}>{t('الدور الثالث', 'Floor 3')}</option>
                  <option value={4}>{t('الدور الرابع', 'Floor 4')}</option>
                  <option value={5}>{t('الدور الخامس فما فوق', 'Floor 5+')}</option>
                  <option value={8}>{t('الدور الثامن فما فوق', 'Floor 8+')}</option>
                </select>
              </div>
            </div>

            {/* Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {t('من منطقة / الحي:', 'From Area:')}
                </label>
                <input
                  type="text"
                  value={fromArea}
                  onChange={(e) => setFromArea(e.target.value)}
                  placeholder="مثال: مدينة نصر"
                  className={`w-full rounded-xl px-3 py-2 text-xs sm:text-sm border outline-none ${
                    theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-blue-900 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {t('إلى منطقة / الحي:', 'To Area:')}
                </label>
                <input
                  type="text"
                  value={toArea}
                  onChange={(e) => setToArea(e.target.value)}
                  placeholder="مثال: التجمع الخامس"
                  className={`w-full rounded-xl px-3 py-2 text-xs sm:text-sm border outline-none ${
                    theme === 'light' ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-blue-900 text-white'
                  }`}
                />
              </div>
            </div>

            {/* Travel / Governorate Toggle */}
            <div
              onClick={() => setIsGovernorate(!isGovernorate)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                isGovernorate
                  ? 'bg-blue-600/15 border-sky-400 text-sky-200'
                  : theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-blue-900/50 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  isGovernorate ? 'bg-blue-600 border-sky-400 text-white' : 'border-slate-500'
                }`}>
                  {isGovernorate && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-bold">
                  {t('نقل بين المحافظات أو الساحل الشمالي / الإسكندرية / الصعيد', 'Inter-Governorate / Coastal Transport')}
                </span>
              </div>
              <span className="text-[11px] font-bold text-sky-400">
                {isGovernorate ? t('سفر محافظات', 'Yes') : t('داخل القاهرة والجيزة', 'Cairo/Giza')}
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: الغرف والسيارات */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Rooms Count */}
            <div>
              <label className={`block text-xs sm:text-sm font-bold mb-2 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                {t('عدد الغرف / حجم الأثاث المراد نقله:', 'Number of Rooms:')}
              </label>
              <div className="grid grid-cols-5 gap-2 text-center">
                {[1, 2, 3, 4, 5].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setRoomsCount(count)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      roomsCount === count
                        ? 'bg-blue-600 text-white border-sky-400 shadow-md'
                        : theme === 'light'
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-blue-900/60'
                    }`}
                  >
                    {count === 5 ? t('+5 غرف', '5+ Rooms') : `${count} ${t('غرف', 'Rooms')}`}
                  </button>
                ))}
              </div>
              {roomsCount === 3 && (
                <div className="text-[11px] text-sky-400 font-semibold mt-2 p-2 rounded-lg bg-sky-500/10 border border-sky-400/20">
                  {t('✨ الحجم القياسي (3 غرف وسيارة داخل القاهرة): يبدأ من 4,000 إلى 7,000 ج.م ويشمل 5 عمال', 'Standard size (3 rooms + 1 truck in Cairo): 4,000 to 7,000 EGP with 5 crew members')}
                </div>
              )}
            </div>

            {/* Trucks Count */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-xs sm:text-sm font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                  {t('عدد سيارات النقل المغلقة والمجهزة (صندوق 6 متر مبطن):', 'Covered Padded Moving Trucks (6m):')}
                </label>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                  {t('كل سيارة تشمل 5 عمال أساسي', '5 Crew Members per Truck')}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5 text-center">
                {[
                  { count: 1, label: 'سيارة واحدة', sub: 'تشمل 5 عمال' },
                  { count: 2, label: 'سيارتان مجهزتان', sub: 'تشمل 10 عمال' },
                  { count: 3, label: '3 سيارات مجهزة', sub: 'تشمل 15 عامل' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setTrucksCount(item.count)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      trucksCount === item.count
                        ? 'bg-blue-600 text-white border-sky-400 shadow-md'
                        : theme === 'light'
                        ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-blue-900/60'
                    }`}
                  >
                    <div>{item.label}</div>
                    <div className={`text-[10px] mt-1 ${trucksCount === item.count ? 'text-sky-200' : 'text-slate-400'}`}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs ${
              theme === 'light' ? 'bg-blue-50/70 border-blue-200 text-blue-900' : 'bg-blue-950/40 border-blue-900 text-sky-200'
            }`}>
              <ShieldCheck className="w-4 h-4 inline-block ml-1 text-sky-400" />
              <span>{t('سيارات شِلها مجهزة بحوائط مبطنة موكيت ولباد وأحزمة ربط قوية لمنع اهتزاز أو تجريح الأثاث أثناء الطريق.', 'Shilha trucks have carpet-padded walls and safety straps.')}</span>
            </div>
          </div>
        )}

        {/* STEP 3: الفك والتركيب والتكييف والأجهزة */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-xs text-sky-400 font-bold mb-1">
              ⚡ {t('جميع خدمات الفنيين والنجارة اختيارية 100% حسب حاجتك وتضاف للتوتال تلقائياً:', 'Optional carpentry, AC & technician services (auto-calculated):')}
            </div>

            {/* AC Units Dismantling & Assembly (800 EGP) */}
            <div className={`flex items-center justify-between p-3.5 rounded-xl border ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-blue-900/60'
            }`}>
              <div>
                <span className={`text-xs sm:text-sm font-bold block ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                  {t('فك وتركيب التكييفات (مع فني تكييف مخصص):', 'AC Units Dismantle & Install:')}
                </span>
                <span className="text-[11px] text-sky-400 font-semibold">
                  {acUnitsCount === 0 
                    ? t('غير محدد (اختياري)', 'None (Optional)') 
                    : `${acUnitsCount} ${t('أجهزة (يشمل فني تكييف مخصص وشحن فريون)', 'Units (AC Tech included)')}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAcUnitsCount(Math.max(0, acUnitsCount - 1))}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-sky-400 text-sm">
                  {acUnitsCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAcUnitsCount(acUnitsCount + 1)}
                  className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center text-sm cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Furniture Dismantling & Assembly (فك وتركيب غرف الأثاث) */}
            <div className={`p-3.5 rounded-xl border ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/80 border-blue-900/60'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div>
                  <span className={`text-xs sm:text-sm font-bold block ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                    {t('نجار محترف لفك وتركيب غرف النوم والسفرة (اختياري):', 'Furniture Dismantling & Assembly:')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('فك وتركيب وترقيم القطع بعناية تامة بأيدي نجارين معتمدين', 'Carpentry dismantling by certified craftsmen')}
                  </span>
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded font-bold ${
                  dismantleRoomsCount > 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/20 text-slate-400'
                }`}>
                  {dismantleRoomsCount > 0 ? `${dismantleRoomsCount} ${t('غرف محددة', 'Rooms')}` : t('غير مطلوب', 'None')}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {[0, 1, 2, 3, 4, 5].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setDismantleRoomsCount(cnt)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      dismantleRoomsCount === cnt
                        ? 'bg-blue-600 text-white border-sky-400'
                        : theme === 'light'
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    {cnt === 0 ? t('بدون فك وتركيب', 'None') : `${cnt} ${t('غرف', 'Rooms')}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Electrical & Appliances Technician (Screens, chandeliers) */}
            <div
              onClick={() => setNeedsAppliancesTechnician(!needsAppliancesTechnician)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                needsAppliancesTechnician
                  ? 'bg-blue-600/15 border-sky-400 text-sky-200'
                  : theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-blue-900/50 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  needsAppliancesTechnician ? 'bg-blue-600 border-sky-400 text-white' : 'border-slate-500'
                }`}>
                  {needsAppliancesTechnician && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-bold">
                  {t('فني كهرباء لفك وتركيب الشاشات الجدارية والنجف والسخانات', 'Electrician for Screens, Chandeliers & Appliances')}
                </span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                needsAppliancesTechnician ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-700/20 text-slate-400'
              }`}>
                {needsAppliancesTechnician ? t('مطلوب (+فني)', 'Selected') : t('اختياري', 'Optional')}
              </span>
            </div>

            {/* Modern Kitchen Assembly */}
            <div
              onClick={() => setNeedsKitchenDismantling(!needsKitchenDismantling)}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                needsKitchenDismantling
                  ? 'bg-blue-600/15 border-sky-400 text-sky-200'
                  : theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-blue-900/50 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                  needsKitchenDismantling ? 'bg-blue-600 border-sky-400 text-white' : 'border-slate-500'
                }`}>
                  {needsKitchenDismantling && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs sm:text-sm font-bold">
                  {t('فك وتركيب وتعديل المطابخ الخشب والألوميتال بالموقع الجديد', 'Kitchen Dismantling & Dimensional Tailoring')}
                </span>
              </div>
              <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                needsKitchenDismantling ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-700/20 text-slate-400'
              }`}>
                {needsKitchenDismantling ? t('مطلوب', 'Selected') : t('اختياري', 'Optional')}
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: كراتين وخامات التغليف الذكية (بدون إظهار الأسعار الفردية للعميل) */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xs sm:text-sm font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                  {t('اختر كراتين وخامات التغليف المطلوبة لنقل أثاثك:', 'Select Packaging Materials & Cartons:')}
                </h3>
                <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
                  {t('يتم احتساب تكلفة الخامات وإضافتها للتوتال الإجمالي تلقائياً ⚡', 'Cost is automatically added to the total estimate.')}
                </span>
              </div>
              {totalPackagingItemsCount > 0 && (
                <span className="text-xs bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2.5 py-1 rounded-full font-bold">
                  {totalPackagingItemsCount} {t('قطعة مضافة للتوتال', 'Items added')}
                </span>
              )}
            </div>

            {/* Quick Bundles Recommendation */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-sky-400">
                {t('باقات مقترحة سريعة (بضغطة واحدة):', 'Quick Curated Bundles (1-Click Add):')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {PACKAGING_BUNDLES.map((bundle) => (
                  <div
                    key={bundle.id}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      theme === 'light' ? 'bg-white border-blue-200' : 'bg-slate-900/90 border-blue-900/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-sky-400">{bundle.nameAr}</div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug">{bundle.shortDesc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => applyBundle(bundle.id)}
                      className="mt-2 w-full py-1.5 px-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      + {t('إضافة الباقة للتكلفة', 'Add Bundle')}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Packaging Items Selector (Prices NOT displayed to client) */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-bold text-slate-400">
                {t('أو حدد الكراتين والخامات بالعدد المناسب لك:', 'Or select individual box sizes & wrap rolls:')}
              </div>

              <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1">
                {PACKAGING_CATALOG.filter(item => item.isPopular || ['cartons', 'bubble', 'stretch', 'bags'].includes(item.category)).map((item) => {
                  const count = selectedMaterials[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                        count > 0 
                          ? 'bg-blue-600/10 border-sky-400' 
                          : theme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-blue-900/40'
                      }`}
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <div className={`text-xs font-bold truncate ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>
                          {item.nameAr}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.descriptionAr}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateMaterialCount(item.id, -1)}
                          disabled={count === 0}
                          className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className={`w-5 text-center font-bold text-xs ${count > 0 ? 'text-sky-400' : 'text-slate-500'}`}>
                          {count}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateMaterialCount(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Whole Room Packaging Service */}
            <div className={`p-3 rounded-xl border mt-2 flex items-center justify-between ${
              theme === 'light' ? 'bg-blue-50/60 border-blue-200' : 'bg-blue-950/40 border-blue-900'
            }`}>
              <div>
                <span className="text-xs font-bold block">{t('خدمة تغليف الغرفة بالكامل (بابلز + استرتش + كرتون):', 'Full Room Packing Service:')}</span>
                <span className="text-[10px] text-slate-400">{t('تشمل الخامات وفريق عمالة التغليف المتخصص', 'Includes all materials & dedicated packers')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setPackedRoomsCount(cnt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      packedRoomsCount === cnt
                        ? 'bg-blue-600 text-white border-sky-400'
                        : theme === 'light' ? 'bg-white text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {cnt === 0 ? t('بدون', '0') : cnt}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STEP 5: الونش الهيدروليكي والملخص النهائي */}
        {currentStep === 5 && (
          <div className="space-y-5 animate-fadeIn">
            {/* Winch Option (1700 EGP) - STRICTLY OPTIONAL */}
            <div
              onClick={() => setNeedsWinch(!needsWinch)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all shadow-sm ${
                needsWinch
                  ? 'bg-blue-600/15 border-sky-400 text-sky-200 ring-2 ring-sky-400/30'
                  : theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-900/60 border-blue-900/50 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                  needsWinch ? 'bg-blue-600 border-sky-400 text-white' : 'border-slate-500'
                }`}>
                  {needsWinch && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block">
                    {t('ونش رفع وتنزيل هيدروليكي من الواجهة (اختياري حسب رغبتك)', 'Hydraulic Winch Lift (Optional)')}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {t('حماية تامة للقطع الكبيرة والزجاج من ضيق السلالم حتى الدور الـ 25', 'Complete protection from narrow staircases up to floor 25')}
                  </span>
                </div>
              </div>
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                needsWinch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700/20 text-slate-400'
              }`}>
                {needsWinch ? t('مضاف للإجمالي (1,700 ج.م)', 'Added (1,700 EGP)') : t('غير مطلوب (اختياري)', 'Not Selected')}
              </span>
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-br from-blue-600/20 via-sky-500/15 to-transparent p-5 rounded-2xl border border-sky-500/40 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t('التكلفة التقديرية الشاملة بالموقع:', 'Final Estimated Total Cost:')}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-sky-400">
                {estimate.minPrice.toLocaleString('ar-EG')} - {estimate.maxPrice.toLocaleString('ar-EG')}{' '}
                <span className="text-lg font-bold text-slate-300">{t('ج.م', 'EGP')}</span>
              </div>
              <div className="text-xs text-sky-300 mt-2 font-medium">
                {t('سعر ثابت متفق عليه قبل التحرك، يشمل سيارات النقل والعمالة والخدمات المختارة فقط.', 'Transparent upfront price. Zero hidden fees.')}
              </div>
            </div>

            {/* Quick Summary Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl border bg-white border-slate-200">
                <div className="text-slate-500 text-[11px] font-bold">{t('سيارات النقل', 'Trucks')}</div>
                <div className="font-black text-blue-700 mt-0.5">{estimate.trucksCount} {t('سيارة مبطنة', 'truck')}</div>
              </div>

              <div className="p-2.5 rounded-xl border bg-white border-slate-200">
                <div className="text-slate-500 text-[11px] font-bold">{t('طاقم العمل', 'Crew')}</div>
                <div className="font-black text-emerald-700 mt-0.5">{estimate.crewCount} {t('عمال وفنيين', 'workers')}</div>
              </div>

              <div className="p-2.5 rounded-xl border bg-white border-slate-200">
                <div className="text-slate-500 text-[11px] font-bold">{t('الونش الهيدروليكي', 'Winch')}</div>
                <div className="font-black text-amber-800 mt-0.5">{needsWinch ? t('مطلوب', 'Included') : t('غير مطلوب', 'None')}</div>
              </div>

              <div className="p-2.5 rounded-xl border bg-white border-slate-200">
                <div className="text-slate-500 text-[11px] font-bold">{t('المدة المتوقعة', 'Duration')}</div>
                <div className="font-black text-blue-700 mt-0.5">{estimate.estimatedHours}</div>
              </div>
            </div>

            {/* Action Booking Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${estimate.whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>{t('تأكيد الحجز والحصول على الخصم 10% عبر واتساب', 'Confirm Booking with 10% OFF on WhatsApp')}</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className={`w-full flex items-center justify-center gap-2 border font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors ${
                  theme === 'light'
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-blue-700'
                    : 'bg-blue-950/70 hover:bg-blue-900 border-blue-800 text-sky-300'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>{t(`اتصال مباشر للحجز والمعاينة (${COMPANY_DATA.phones[0].number})`, `Direct Call (${COMPANY_DATA.phones[0].number})`)}</span>
              </a>

              <button
                type="button"
                onClick={handleExitCalculator}
                className="w-full flex items-center justify-center gap-2 border font-black py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-700"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                <span>{t('الخروج من الحاسبة والعودة للرئيسية', 'Exit Calculator & Return to Home')}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Wizard Bottom Navigation Bar (Prev / Next Buttons) */}
      <div className="flex items-center justify-between pt-2 border-t border-blue-900/30">
        <div>
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-blue-950/70 hover:bg-blue-900 text-sky-300 border-blue-800'
              }`}
            >
              <ChevronRight className="w-4 h-4 text-blue-600" />
              <span>{t('الخطوة السابقة', 'Previous')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExitCalculator}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all cursor-pointer active:scale-95"
            >
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('رجوع للموقع', 'Back')}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Live Price Teaser during steps 1-4 */}
          {currentStep < 5 && (
            <div className="text-left">
              <span className="text-[10px] text-slate-400 block">{t('التكلفة المقدرة حالياً:', 'Current Estimate:')}</span>
              <span className="text-xs sm:text-sm font-black text-sky-400">
                {estimate.minPrice.toLocaleString('ar-EG')} {t('ج.م', 'EGP')}
              </span>
            </div>
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{t('التالي', 'Next')}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <a
              href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${estimate.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{t('إرسال الحجز', 'Send Quote')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
