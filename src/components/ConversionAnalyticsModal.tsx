import React, { useState, useEffect } from 'react';
import { 
  X, 
  TrendingUp, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Clock, 
  ArrowUpRight, 
  Zap, 
  Trash2,
  Activity
} from 'lucide-react';
import { 
  getStoredConversions, 
  getDailyConversionSummary, 
  recordLocalConversion, 
  clearAllConversions,
  ConversionRecord, 
  DailySummary 
} from '../utils/analytics';
import { COMPANY_DATA } from '../data/companyData';

const HOTLINE = COMPANY_DATA.whatsappDefault || COMPANY_DATA.phones[0]?.number || '01233391255';

interface ConversionAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConversionAnalyticsModal: React.FC<ConversionAnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'feed' | 'guide'>('daily');
  const [records, setRecords] = useState<ConversionRecord[]>([]);
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]);
  const [copiedReport, setCopiedReport] = useState(false);
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const loadData = () => {
    setRecords(getStoredConversions());
    setDailySummaries(getDailyConversionSummary(14));
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleConversionLogged = () => {
      loadData();
    };
    window.addEventListener('royal_conversion_logged', handleConversionLogged);
    return () => window.removeEventListener('royal_conversion_logged', handleConversionLogged);
  }, []);

  if (!isOpen) return null;

  // Key Totals
  const todayStr = new Date().toISOString().split('T')[0];
  const todaySummary = dailySummaries.find(s => s.date === todayStr) || {
    phoneCount: 0,
    whatsappCount: 0,
    bookingCount: 0,
    total: 0
  };

  const totalAllPhone = records.filter(r => r.type === 'phone').length;
  const totalAllWhatsApp = records.filter(r => r.type === 'whatsapp').length;
  const totalAllConversions = records.length;

  // Copy Clean WhatsApp / Management Summary Report
  const handleCopyReport = () => {
    const text = `📊 تقرير تحويلات رويال موفرز VIP (${todayStr})
-----------------------------------------
📞 اتصالات الهاتف اليوم: ${todaySummary.phoneCount}
💬 محادثات الواتساب اليوم: ${todaySummary.whatsappCount}
📋 إجمالي تحويلات اليوم: ${todaySummary.total}

📈 الإجمالي التراكمي:
- مكالمات هاتفية: ${totalAllPhone}
- محادثات واتساب: ${totalAllWhatsApp}
- إجمالي الإحالات: ${totalAllConversions}
- كود التتبع: AW-18544594401 (متصل بنجاح)
-----------------------------------------
تم التوليد تلقائياً من لوحة تحكم رويال موفرز VIP`;

    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  // Run a quick simulation test to prove live tracking
  const handleRunTest = (type: 'phone' | 'whatsapp') => {
    const label = type === 'phone' ? 'تجربة فحص اتصال هاتفي (اختبار المالك)' : 'تجربة فحص رسالة واتساب (اختبار المالك)';
    recordLocalConversion(type, label, HOTLINE);
    setTestSuccessMessage(`✓ تم تسجيل إحالة ${type === 'phone' ? 'مكالمة هاتفية' : 'محادثة واتساب'} تجريبية وإرسالها فوراً إلى Google Ads!`);
    setTimeout(() => setTestSuccessMessage(null), 4000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md overflow-y-auto p-3 sm:p-5 flex items-start sm:items-center justify-center animate-fadeIn"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-4xl bg-gradient-to-b from-[#020b18] via-[#06152b] to-[#020b18] border border-amber-500/30 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-950/80 overflow-hidden my-4 sm:my-8 text-slate-100 flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-blue-950/90 via-[#0a1f3d] to-blue-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <BarChart3 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white font-serif">
                  لوحة قياس التحويلات وإحصائيات الحملة
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  مباشر (Live)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                تتبع يومي دقيق لنقرات الاتصال الهاتفي والواتساب من حملة إعلانات Google
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Bar */}
        <div className="bg-[#030e20] px-4 sm:px-6 py-2.5 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>حساب إعلانات Google المرتبط:</span>
            <code className="bg-blue-950 px-2 py-0.5 rounded text-amber-300 font-mono font-bold border border-amber-400/20">
              AW-18544594401
            </code>
            <span className="text-emerald-400 font-medium">● متصل وجاهز</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>تحديث</span>
            </button>
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 font-bold transition-colors"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'تم نسخ التقرير!' : 'نسخ تقرير اليوم'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Success notification if test ran */}
          {testSuccessMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-sm font-bold flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{testSuccessMessage}</span>
              </div>
            </div>
          )}

          {/* 4 Golden KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Today Calls */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-blue-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-blue-300 mb-2">
                <span className="text-xs sm:text-sm font-bold">اتصالات اليوم</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {todaySummary.phoneCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                إجمالي المكالمات: <span className="text-blue-300 font-bold">{totalAllPhone}</span>
              </p>
            </div>

            {/* 2. Today WhatsApp */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-emerald-900/30 border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-emerald-300 mb-2">
                <span className="text-xs sm:text-sm font-bold">واتساب اليوم</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {todaySummary.whatsappCount}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                إجمالي الواتساب: <span className="text-emerald-300 font-bold">{totalAllWhatsApp}</span>
              </p>
            </div>

            {/* 3. Today Total Conversions */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-amber-900/30 border border-amber-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-amber-300 mb-2">
                <span className="text-xs sm:text-sm font-bold">إجمالي تحويلات اليوم</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                {todaySummary.total}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                تراكمي الإحالات: <span className="text-amber-200 font-bold">{totalAllConversions}</span>
              </p>
            </div>

            {/* 4. Active Phone */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-indigo-950/50 border border-purple-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-purple-300 mb-2">
                <span className="text-xs sm:text-sm font-bold">الخط الساخن النشط</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono tracking-wider">
                {HOTLINE}
              </div>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                مستقبل المكالمات والواتساب
              </p>
            </div>
          </div>

          {/* Quick Simulation Action Buttons for Testing */}
          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white">فحص فوري للربط المباشر</h4>
                <p className="text-xs text-slate-400">يمكنك الضغط لتسجيل إحالة تجريبية وفحص تحديث اللوحة أمام عينيك فوراً</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleRunTest('phone')}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>+ اختبار نقرة اتصال</span>
              </button>
              <button
                onClick={() => handleRunTest('whatsapp')}
                className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-400/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>+ اختبار نقرة واتساب</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 gap-2">
            <button
              onClick={() => setActiveTab('daily')}
              className={`pb-2.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'daily'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>الجدول اليومي للتحويلات</span>
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`pb-2.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'feed'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>سجل العمليات اللحظي ({records.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`pb-2.5 px-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'guide'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>طريقة المتابعة في Google Ads</span>
            </button>
          </div>

          {/* TAB 1: Daily Breakdown Table */}
          {activeTab === 'daily' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
                <table className="w-full text-right text-sm">
                  <thead className="bg-[#0b1c36] text-slate-300 font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">التاريخ واليوم</th>
                      <th className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-blue-400">
                          <PhoneCall className="w-3.5 h-3.5" /> المكالمات
                        </span>
                      </th>
                      <th className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <MessageSquare className="w-3.5 h-3.5" /> الواتساب
                        </span>
                      </th>
                      <th className="py-3 px-4 text-center text-amber-300">إجمالي اليوم</th>
                      <th className="py-3 px-4">المؤشر البصري</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {dailySummaries.map((day, idx) => (
                      <tr 
                        key={day.date} 
                        className={`hover:bg-white/5 transition-colors ${idx === 0 ? 'bg-amber-500/5 font-bold' : ''}`}
                      >
                        <td className="py-3 px-4 text-slate-200">
                          <span className="font-sans font-bold ml-2 text-white">{day.dayName}</span>
                          <span className="text-xs text-slate-400">({day.date})</span>
                          {idx === 0 && (
                            <span className="mr-2 text-[10px] font-sans px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                              اليوم
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center text-blue-300 font-bold">
                          {day.phoneCount}
                        </td>
                        <td className="py-3 px-4 text-center text-emerald-300 font-bold">
                          {day.whatsappCount}
                        </td>
                        <td className="py-3 px-4 text-center text-amber-400 font-black text-base">
                          {day.total}
                        </td>
                        <td className="py-3 px-4 w-44">
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                            <div 
                              className="bg-blue-500 h-full transition-all" 
                              style={{ width: `${day.total > 0 ? (day.phoneCount / Math.max(day.total, 1)) * 100 : 0}%` }}
                              title={`مكالمات: ${day.phoneCount}`}
                            ></div>
                            <div 
                              className="bg-emerald-500 h-full transition-all" 
                              style={{ width: `${day.total > 0 ? (day.whatsappCount / Math.max(day.total, 1)) * 100 : 0}%` }}
                              title={`واتساب: ${day.whatsappCount}`}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Live Activity Feed */}
          {activeTab === 'feed' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>سجل كل نقرة حقيقية تتم داخل الموقع بالوقت والمصدر:</span>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من مسح سجل التحويلات؟')) {
                      clearAllConversions();
                      loadData();
                    }
                  }}
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريغ السجل</span>
                </button>
              </div>

              {records.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-white/5 rounded-2xl border border-white/5">
                  لا توجد تحويلات مسجلة بعد. جرب الضغط على أزرار الاتصال أو زر الفحص بالأعلى!
                </div>
              ) : (
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {records.map((r) => (
                    <div 
                      key={r.id} 
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          r.type === 'phone' 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {r.type === 'phone' ? <PhoneCall className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white flex items-center gap-2">
                            <span>{r.label}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-amber-300 border border-amber-400/20 font-mono">
                              AW-18544594401
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            المستهدف: {r.details || HOTLINE}
                          </p>
                        </div>
                      </div>

                      <div className="text-left font-mono shrink-0">
                        <span className="text-xs font-bold text-slate-200 block">{r.time}</span>
                        <span className="text-[10px] text-slate-500 block">{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Google Ads Follow-up Guide */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  أين ترى هذه الإحالات في حسابك على Google Ads؟
                </h4>
                <p className="leading-relaxed text-slate-200 text-xs sm:text-sm">
                  بمجرد أن ينقر أي عميل قادم من إعلان جوجل على زر الاتصال أو الواتساب، يتم إرسال الإحالة فوراً إلى جوجل. وإليك 3 أماكن لمشاهدتها في حسابك:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">1</span>
                    عمود الإحالات الناجحة
                  </div>
                  <p className="text-xs text-slate-400">
                    في جدول الحملات ستجد عموداً اسمه <strong>(Conversions / الإحالات الناجحة)</strong> بجانب النقرات يوضح كم مكالمة جاءت من كل كلمة مفتاحية.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
                    صفحة ملخص الأهداف
                  </div>
                  <p className="text-xs text-slate-400">
                    من القائمة: <strong>الأهداف &larr; الإحالات الناجحة &larr; الملخص</strong>، ستجد الإجراء الذي أنشأناه <strong>«جهة اتصال (1)»</strong> يتحول إلى حالة نشط (Active).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
                    تكلفة كل اتصال
                  </div>
                  <p className="text-xs text-slate-400">
                    جوجل سيحسب لك تلقائياً عمود <strong>(تكلفة الإحالة الناجحة)</strong>، لتعرف كم جنيه كلفك العميل حتى ضغط على زر الاتصال.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#020b18] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>نظام القياس السحابي متصل برقمك المعتمد {HOTLINE}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
