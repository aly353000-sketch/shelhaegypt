import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MediaSlide {
  type: 'image' | 'video';
  src: string;
  mobileSrc?: string;
  poster?: string;
  width?: number;
  height?: number;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
}

const SLIDES: MediaSlide[] = [
  {
    type: 'image',
    src: '/assets/images/royal_delicate_packing.webp',
    mobileSrc: '/assets/images/royal_delicate_packing_mobile.webp',
    width: 800,
    height: 597,
    titleAr: 'عناية فائقة بتغليف وحماية التحف والنجف والصالونات الفاخرة بأعلى معايير الأمان',
    titleEn: 'White-glove Moving & Delicate Antiques Protection in Luxury Salon',
    badgeAr: 'تغليف فندقي VIP للتحف 💎',
    badgeEn: 'White-Glove Antiques Care 💎',
  },
  {
    type: 'image',
    src: '/assets/optimized/crew_sofa_wrap.webp',
    width: 760,
    height: 1483,
    titleAr: 'طاقم رويال موفرز VIP الثلاثي المتخصص أثناء إحكام تغليف كنب الصالون بالاسترتش والبابلز',
    titleEn: 'Royal Movers 3-Man Specialist Crew Wrapping Luxury Sofa with Stretch & Bubble',
    badgeAr: 'فريق التغليف المتخصص 🛡️',
    badgeEn: 'Specialist Packing Crew 🛡️',
  },
  {
    type: 'image',
    src: '/assets/images/royal_movers_workers_loading.webp',
    width: 768,
    height: 1376,
    titleAr: 'طاقم رويال موفرز VIP الرسمي أثناء تحميل ورص الأثاث بالكراتين المقواة بأعلى درجات العناية',
    titleEn: 'Royal Movers VIP Crew Loading Furniture with Uniforms & Branded Boxes',
    badgeAr: 'طاقم عمل رسمي معتمد VIP 👑',
    badgeEn: 'Official Royal Movers VIP Crew 👑',
  },
  {
    type: 'image',
    src: '/assets/optimized/padded_truck_bed.webp',
    width: 720,
    height: 960,
    titleAr: 'صندوق سيارات رويال موفرز المغلقة والمبطنة بشرائح خشبية وأحزمة تثبيت لحماية العفش',
    titleEn: 'Padded Closed Truck Cargo Bed with Solid Wood Battens & Safety Straps',
    badgeAr: 'سيارات نقل مغلقة ومبطنة 🚛',
    badgeEn: 'Equipped Padded Trucks 🚛',
  },
  {
    type: 'image',
    src: '/assets/optimized/before_after_wrap.webp',
    width: 760,
    height: 760,
    titleAr: 'توثيق قبل وبعد: كيف يحمي التغليف الأوروبي لرويال موفرز الأقمشة المخملية والأرجل المذهبة',
    titleEn: 'Before & After Protection: Shielding Delicate Velvet Fabrics & Gold Legs',
    badgeAr: 'قبل وبعد التغليف (درع أمان) ✨',
    badgeEn: 'Before & After Protection ✨',
  },
  {
    type: 'image',
    src: '/assets/images/royal_winch_villa.webp',
    width: 800,
    height: 597,
    titleAr: 'تجهيزات متكاملة لنقل أثاث الفلل والكمبوندات الراقية بأعلى درجات الدقة والهدوء',
    titleEn: 'Full Relocation Support for Luxury Compound Villas',
    badgeAr: 'خدمة الفلل والكمبوندات 🏰',
    badgeEn: 'Compound Villas VIP 🏰',
  },
  {
    type: 'video',
    src: '/assets/aistudio/VID-20261029-WA0025_08d54593.mp4',
    poster: '/assets/optimized/hydraulic_winch_building.webp',
    titleAr: 'فيديو ميداني: تنزيل القطع الكبيرة والثقيلة بسلاسة وأمان تام أثناء النقل الشامل',
    titleEn: 'Live Field Video: Safely Lowering Heavy Pieces During Full Relocation',
    badgeAr: 'توثيق ميداني للرفع الآمن 🎥',
    badgeEn: 'Live Field Video 🎥',
  },
  {
    type: 'image',
    src: '/assets/optimized/hydraulic_winch_building.webp',
    width: 720,
    height: 956,
    titleAr: 'توافر الأوناش الهيدروليكية عند الحاجة ضمن باقات النقل المتكاملة للواجهات والأدوار العليا',
    titleEn: 'Hydraulic Winch Support Available Within Full Relocation Packages',
    badgeAr: 'حلول رفع للقطع الثقيلة 🛡️',
    badgeEn: 'Heavy Piece Lift Support 🛡️',
  },
];

export const HeroMediaSlider: React.FC = () => {
  const { t, lang } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasSlid, setHasSlid] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto sliding every 4.8 seconds (gentle & relaxed pace for eye comfort)
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setHasSlid(true);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  // Handle active slide video play/pause
  useEffect(() => {
    if (SLIDES[currentIndex].type === 'video' && videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentIndex, isVideoPlaying]);

  const handleNext = () => {
    setHasSlid(true);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setHasSlid(true);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> advance slide
        handleNext();
      } else {
        // Swiped right -> previous slide
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  const toggleVideoSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label={t('معرض صور وفيديو رويال موفرز', 'Shilha Media Showcase')}
    >
      {/* Soothing Royal Blue Glow Behind the Media Card */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-cyan-300 rounded-3xl blur-md opacity-50 group-hover:opacity-90 transition duration-700 pointer-events-none" />

      {/* Main Media Container */}
      <div className="relative rounded-3xl overflow-hidden border shadow-2xl transition-colors duration-300 bg-[#051530] border-blue-800/80">
        {/* Horizontal Sliding Carousel Track */}
        <div
          className="relative h-[440px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden bg-slate-950"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous sliding track */}
          <div
            className="flex w-full h-full will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            dir="ltr"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              const shouldRenderMedia = hasSlid
                ? idx === 0 ||
                  isActive ||
                  idx === (currentIndex + 1) % SLIDES.length ||
                  idx === (currentIndex - 1 + SLIDES.length) % SLIDES.length
                : idx === 0;

              return (
                <div
                  key={idx}
                  className="w-full h-full flex-shrink-0 relative overflow-hidden bg-slate-950 select-none"
                  aria-hidden={!isActive}
                >
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      {isActive ? (
                        <>
                          <video
                            ref={videoRef}
                            src={slide.src}
                            poster={slide.poster || '/assets/optimized/hydraulic_winch_building.webp'}
                            preload="metadata"
                            muted={isVideoMuted}
                            loop
                            playsInline
                            autoPlay
                            className="w-full h-full object-cover object-center"
                          />
                          {/* Video Audio & Play Controls Overlay (only rendered when active to satisfy aria-hidden-focus) */}
                          <div className="absolute bottom-20 left-4 z-30 flex items-center gap-2" dir="ltr">
                            <button
                              type="button"
                              onClick={toggleVideoPlayback}
                              className="p-2 rounded-xl bg-slate-900/85 hover:bg-blue-700 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                              title={isVideoPlaying ? t('إيقاف مؤقت', 'Pause') : t('تشغيل', 'Play')}
                              aria-label={isVideoPlaying ? t('إيقاف الفيديو مؤقتاً', 'Pause video') : t('تشغيل الفيديو', 'Play video')}
                            >
                              {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={toggleVideoSound}
                              className="p-2 rounded-xl bg-slate-900/85 hover:bg-blue-700 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                              title={isVideoMuted ? t('تشغيل الصوت', 'Unmute') : t('كتم الصوت', 'Mute')}
                              aria-label={isVideoMuted ? t('تشغيل الصوت', 'Unmute video') : t('كتم الصوت', 'Mute video')}
                            >
                              {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </>
                      ) : shouldRenderMedia ? (
                        <img
                          src={slide.poster || '/assets/optimized/hydraulic_winch_building.webp'}
                          alt={t(slide.titleAr, slide.titleEn)}
                          width={720}
                          height={956}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-950" />
                      )}
                    </div>
                  ) : shouldRenderMedia ? (
                    slide.mobileSrc ? (
                      <picture className="block w-full h-full">
                        <source media="(max-width: 768px)" srcSet={slide.mobileSrc} type="image/webp" />
                        <img
                          src={slide.src}
                          alt={t(slide.titleAr, slide.titleEn)}
                          width={slide.width}
                          height={slide.height}
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          fetchPriority={idx === 0 ? 'high' : 'low'}
                          decoding={idx === 0 ? 'sync' : 'async'}
                        />
                      </picture>
                    ) : (
                      <img
                        src={slide.src}
                        alt={t(slide.titleAr, slide.titleEn)}
                        width={slide.width}
                        height={slide.height}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        fetchPriority={idx === 0 ? 'high' : 'low'}
                        decoding={idx === 0 ? 'sync' : 'async'}
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-slate-950" />
                  )}

                  {/* Soft gradient shadow overlay for comfortable readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Top Floating Badges (single flex row prevents mobile overlap) */}
          <div className="absolute top-3 inset-x-3 sm:top-4 sm:inset-x-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
            <div className="min-w-0 bg-slate-950/85 backdrop-blur-md border border-sky-400/40 rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 sm:gap-2 shadow-lg">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-bold text-white truncate">
                {t(currentSlide.badgeAr, currentSlide.badgeEn)}
              </span>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
              <div className="bg-blue-700/95 backdrop-blur-md text-white font-black rounded-xl px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs flex items-center gap-1 shadow-md border border-blue-400/30 whitespace-nowrap">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-sky-200 shrink-0" aria-hidden="true" />
                <span>4.9 / 5</span>
              </div>
              <div className="bg-slate-950/85 backdrop-blur-md text-slate-200 font-mono text-[11px] sm:text-xs px-2 py-1 rounded-xl border border-white/15 whitespace-nowrap">
                {currentIndex + 1} / {SLIDES.length}
              </div>
            </div>
          </div>

          {/* Navigation Arrows (Glassmorphic) */}
          <button
            type="button"
            onClick={lang === 'ar' ? handleNext : handlePrev}
            className="absolute top-1/2 -translate-y-1/2 right-3 z-20 p-2.5 rounded-full bg-slate-950/60 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
            aria-label={t('السابق', 'Previous')}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={lang === 'ar' ? handlePrev : handleNext}
            className="absolute top-1/2 -translate-y-1/2 left-3 z-20 p-2.5 rounded-full bg-slate-950/60 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all opacity-80 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
            aria-label={t('التالي', 'Next')}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Bottom Slide Info Overlay with Eye-Comfortable Styling */}
          <div className="absolute bottom-4 right-4 left-4 z-20 p-3.5 bg-slate-950/85 backdrop-blur-md rounded-2xl border border-blue-900/60 space-y-2">
            <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
              <span>{t('جاهزون للانطلاق لخدمتك فوراً', 'Ready to dispatch immediately')}</span>
              <span className="text-slate-300 font-normal">{t('وصول خلال 30 دقيقة', 'ETA: 30 mins')}</span>
            </div>

            <p className="text-xs sm:text-sm font-black text-white leading-snug">
              {t(currentSlide.titleAr, currentSlide.titleEn)}
            </p>

            {/* Visual Progress Dots Bar with WCAG 2.2 compliant >=28px touch targets */}
            <div className="flex items-center justify-center gap-0.5 pt-1">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setHasSlid(true);
                    setCurrentIndex(idx);
                  }}
                  className="min-w-[28px] min-h-[28px] p-2.5 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 rounded-full"
                  aria-label={t(`الشريحة رقم ${idx + 1}`, `Slide ${idx + 1}`)}
                  aria-current={idx === currentIndex ? 'true' : undefined}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-7 bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                        : 'w-2 bg-slate-500 hover:bg-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Lower Quick Strip */}
        <div className="p-3.5 border-t space-y-2 transition-colors bg-[#030d20] border-blue-900/60">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {t('عناية فائقة وتغليف أوروبي لحماية التحف والأثاث', 'White-Glove Care & European Packing')}
            </span>
            <span className="text-emerald-400 font-bold">{t('متاح 24 ساعة', 'Available 24/7')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
