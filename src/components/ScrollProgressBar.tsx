import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const ScrollProgressBar: React.FC = () => {
  const { lang, t } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Calculate immediately on mount
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="مؤشر تقدم تصفح الصفحة"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-2 sm:h-2.5 pointer-events-none bg-blue-950/15 backdrop-blur-xs shadow-xs"
    >
      <div
        className="h-full bg-gradient-to-l from-blue-700 via-sky-500 to-emerald-400 transition-all duration-100 ease-out shadow-[0_2px_10px_rgba(14,165,233,0.8)] mr-0 ml-auto relative"
        style={{
          width: `${scrollProgress}%`,
        }}
      >
        {/* Glowing Pulse Dot at the leading edge */}
        {scrollProgress > 0 && scrollProgress < 100 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8] ring-2 ring-sky-300" />
        )}
      </div>
    </div>
  );
};
