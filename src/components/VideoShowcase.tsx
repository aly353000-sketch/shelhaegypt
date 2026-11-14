import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Sparkles, 
  RotateCcw,
  Maximize2
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_DATA } from '../data/companyData';
import { useApp } from '../context/AppContext';

export const VideoShowcase: React.FC = () => {
  const { t } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Lazy-load and play only when video section enters viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="video-section" className="py-16 lg:py-24 text-right bg-gradient-to-b from-slate-50 via-white to-blue-50/30 border-y border-slate-200">
      <div id="winch-section" className="scroll-mt-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5 mb-14">
          <div className="inline-flex items-center gap-2.5 bg-blue-100 border border-blue-300 text-blue-950 text-sm sm:text-base font-black px-5 py-2 rounded-full shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>فيديو حقيقي ومباشر من موقع العمل 🎥</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            شاهد بالفيديو: تنزيل المنقولات بالونش الهيدروليكي بأمان وسلاسة فائقة
          </h2>

          <p className="text-base sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
            توثيق حقيقي من أرض الواقع يُظهر ونش رويال موفرز الهيدروليكي وهو ينزل الأثاث والمفروشات من الطوابق العليا مباشرة إلى سيارة النقل المجهزة، دون أي احتكاك بالسلالم أو جدران العمارة.
          </p>
        </div>

        {/* Video Card Container with Comfortable Generous Sizing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xl">
          
          {/* Real Winch Video Player (7 cols) - Increased Dimensions */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-slate-950 shadow-2xl group border border-slate-300">
            <video
              ref={videoRef}
              src="/assets/aistudio/VID-20261029-WA0025_08d54593.mp4"
              poster="/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg"
              preload="none"
              className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[540px] object-contain mx-auto bg-black"
              loop
              playsInline
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
              
              {/* Top Bar: Brand Badge & Audio/Fullscreen */}
              <div className="flex items-center justify-between pointer-events-auto">
                <span className="bg-slate-950/85 backdrop-blur-md text-sky-400 border border-sky-400/40 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                  شركة رويال موفرز VIP | Shelha Furniture Movers
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="p-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title="إعادة تشغيل الفيديو"
                    aria-label="إعادة تشغيل الفيديو"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                    aria-label={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleFullScreen}
                    className="p-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 text-white backdrop-blur-md transition-colors cursor-pointer hidden sm:inline-flex"
                    title="ملء الشاشة"
                    aria-label="ملء الشاشة"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Play / Pause Floating Trigger */}
              <div className="flex items-center justify-center pointer-events-auto">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white flex items-center justify-center shadow-2xl shadow-sky-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/70"
                  aria-label={isPlaying ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="pointer-events-auto text-xs sm:text-sm text-slate-100 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-blue-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>تنزيل المنقولات بأمان بالونش الهيدروليكي مباشرة إلى سيارات رويال موفرز</span>
                </div>
                <span className="text-sky-300 font-bold hidden sm:inline">اضغط للتشغيل أو الإيقاف</span>
              </div>

            </div>
          </div>

          {/* Video Highlights & Operational Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-blue-800 bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-full inline-block">
                أمان معتمد 100% | ونش هيدروليكي بسعر يبدأ من 2500 ج
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-snug">
                كفاءة الونش في حماية العفش من أخطار وضيق السلالم
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium">
                في هذا الفيديو الحقيقي، بتشوف إزاي منصة الونش الهيدروليكي بتتحرك بثبات وسرعة فائقة من بلكونة العميل في الطوابق العليا مباشرة لداخل صندوق سيارات رويال موفرز المبطنة، مما يوفر ساعات طويلة ويمنع أي خدش أو احتكاك للأثاث.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3.5 bg-slate-50 p-5 rounded-2xl border-2 border-slate-200">
              {[
                'تثبيت محكم للمنقولات بأحزمة أمان مطاطية قبل بدء النزول',
                'سعر الونش يبدأ من ٢,٥٠٠ ج.م فقط للأدوار العليا والواجهات',
                'توفير مشغل ونش وفنيين معتمدين بأعلى معايير السلامة المهنية',
                'تنزيل محتويات الشقة بالكامل في أقل من ساعتين فقط',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-bold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={`https://wa.me/20${COMPANY_DATA.whatsappDefault}?text=${encodeURIComponent(
                  'السلام عليكم، شفت فيديو شغل الونش الهيدروليكي في الموقع وعايز أحجز ونش نقل عفش مع رويال موفرز VIP'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-2xl text-base shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>احجز الونش بنفس الدقة دي</span>
              </a>

              <a
                href={`tel:${COMPANY_DATA.phones[0].number}`}
                className="font-black px-6 py-3.5 rounded-2xl text-base flex items-center justify-center gap-2.5 border-2 bg-white hover:bg-slate-50 text-blue-900 border-slate-300 transition-all hover:scale-105 active:scale-95 shadow-xs"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                <span dir="ltr">01233391255</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
