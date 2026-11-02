import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause, Volume2, VolumeX, Star, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface MediaSlide {
  type: 'image' | 'video';
  src: string;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
}

const SLIDES: MediaSlide[] = [
  {
    type: 'video',
    src: '/assets/aistudio/VID-20261029-WA0025_08d54593.mp4',
    titleAr: 'فيديو حي ومباشر: ونش شِلها الهيدروليكي ينزل المنقولات بسلاسة وأمان تام',
    titleEn: 'Live Field Video: Shilha Hydraulic Winch Safely Lowering Furniture',
    badgeAr: 'فيديو ونش حي من الواقع 🎥',
    badgeEn: 'Live Winch Field Video 🎥',
  },
  {
    type: 'image',
    src: '/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg',
    titleAr: 'ونش رفع وتنزيل الأثاث الهيدروليكي ممتد لواجهة العمارة بالدور السادس بأمان مطلق',
    titleEn: 'Truck-Mounted Hydraulic Crane Extended to 6th Floor Balcony',
    badgeAr: 'ونش هيدروليكي يبدأ من 1700ج',
    badgeEn: 'Hydraulic Winch from 1700 EGP',
  },
  {
    type: 'image',
    src: '/assets/aistudio/IMG-20261029-WA0010_1__f198d94c.jpg',
    titleAr: 'طاقم عمل شِلها الثلاثي المتخصص أثناء إحكام تغليف كنب الصالون بالاسترتش والبابلز',
    titleEn: 'Shilha 3-Man Specialist Crew Wrapping Luxury Sofa with Stretch & Bubble',
    badgeAr: 'فريق التغليف المتخصص',
    badgeEn: 'Specialist Packing Crew',
  },
  {
    type: 'image',
    src: '/assets/aistudio/FB_IMG_1793372087782_e1c10367.jpg',
    titleAr: 'صندوق سيارة شِلها المبطن والمدعم بشرائح خشبية سويدي وأحزمة ربط لحماية العفش',
    titleEn: 'Padded Truck Cargo Bed with Solid Wood Battens & Safety Straps',
    badgeAr: 'سيارات نقل مجهزة ومبطنة',
    badgeEn: 'Equipped Padded Trucks',
  },
  {
    type: 'image',
    src: '/assets/aistudio/IMG-20261029-WA0039_a33b1140.jpg',
    titleAr: 'توثيق قبل وبعد: كيف يحمي التغليف الاحترافي لشِلها الأقمشة المخملية والأرجل المذهبة',
    titleEn: 'Before & After Protection: Shielding Delicate Velvet Fabrics & Gold Legs',
    badgeAr: 'قبل وبعد التغليف (درع أمان)',
    badgeEn: 'Before & After Protection',
  },
  {
    type: 'image',
    src: '/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg',
    titleAr: 'مخزن خامات التغليف المعتمدة: كراتين 5 راق جديدة، رولات بابلز الفيروز، وشنط قماشية',
    titleEn: 'Packaging Materials Warehouse: 5-Ply Boxes, Heavy Bubble Rolls & Bags',
    badgeAr: 'خامات ومواد تغليف أصلية',
    badgeEn: 'Original Packing Materials',
  },
];

export const HeroMediaSlider: React.FC = () => {
  const { t, lang, theme } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
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
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
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
      aria-label={t('معرض صور وفيديو شِلها', 'Shilha Media Showcase')}
    >
      {/* Soothing Royal Blue Glow Behind the Media Card */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 via-sky-400 to-cyan-300 rounded-3xl blur-md opacity-50 group-hover:opacity-90 transition duration-700 pointer-events-none" />

      {/* Main Media Container */}
      <div
        className={`relative rounded-3xl overflow-hidden border shadow-2xl transition-colors duration-300 ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#051530] border-blue-800/80'
        }`}
      >
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
              return (
                <div
                  key={idx}
                  className="w-full h-full flex-shrink-0 relative overflow-hidden bg-slate-950 select-none"
                  aria-hidden={idx !== currentIndex}
                >
                  {slide.type === 'video' ? (
                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                      <video
                        ref={videoRef}
                        src={slide.src}
                        poster="/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg"
                        preload="metadata"
                        muted={isVideoMuted}
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Video Audio & Play Controls Overlay */}
                      <div className="absolute bottom-20 left-4 z-30 flex items-center gap-2" dir="ltr">
                        <button
                          type="button"
                          onClick={toggleVideoPlayback}
                          className="p-2 rounded-xl bg-slate-900/85 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                          title={isVideoPlaying ? t('إيقاف مؤقت', 'Pause') : t('تشغيل', 'Play')}
                          aria-label="Toggle play"
                        >
                          {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={toggleVideoSound}
                          className="p-2 rounded-xl bg-slate-900/85 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
                          title={isVideoMuted ? t('تشغيل الصوت', 'Unmute') : t('كتم الصوت', 'Mute')}
                          aria-label="Toggle mute"
                        >
                          {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={slide.src}
                      alt={t(slide.titleAr, slide.titleEn)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  {/* Soft gradient shadow overlay for comfortable readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                </div>
              );
            })}
          </div>

          {/* Top Floating Badges */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <div className="bg-slate-950/85 backdrop-blur-md border border-sky-400/40 rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">
                {t(currentSlide.badgeAr, currentSlide.badgeEn)}
              </span>
            </div>
          </div>

          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
            <div className="bg-blue-600/90 backdrop-blur-md text-white font-black rounded-xl px-2.5 py-1 text-xs flex items-center gap-1 shadow-md border border-blue-400/30">
              <Star className="w-3.5 h-3.5 fill-current text-sky-200" />
              <span>4.9 / 5</span>
            </div>
            <div className="bg-slate-950/70 backdrop-blur-md text-slate-300 font-mono text-xs px-2 py-1 rounded-xl border border-white/10">
              {currentIndex + 1} / {SLIDES.length}
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

            {/* Visual Progress Dots Bar */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-gradient-to-r from-sky-400 to-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                      : 'w-2 bg-slate-600/70 hover:bg-slate-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card Lower Quick Strip */}
        <div
          className={`p-3.5 border-t space-y-2 transition-colors ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#030d20] border-blue-900/60'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 font-bold text-sky-600">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              {t('عناية تامة واحترافية بالمنقولات', 'Professional Care for All Belongings')}
            </span>
            <span className="text-emerald-500 font-bold">{t('متاح 24 ساعة', 'Available 24/7')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
