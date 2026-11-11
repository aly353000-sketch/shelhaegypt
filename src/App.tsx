/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounterBar } from './components/StatsCounterBar';
import { LuxuryCompoundsTrustStrip } from './components/LuxuryCompoundsTrustStrip';
import { LuxuryAreasTopShowcase } from './components/LuxuryAreasTopShowcase';
import { InteractiveServicesFlipCards } from './components/InteractiveServicesFlipCards';
import { VideoShowcase } from './components/VideoShowcase';
import { RealGallery } from './components/RealGallery';
import { CompactTrustAndFaqPills } from './components/CompactTrustAndFaqPills';
import { QuickContactForm } from './components/QuickContactForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { GoldenTipsModal } from './components/GoldenTipsModal';
import { BrandKitModal } from './components/BrandKitModal';
import { SiteSearchBar } from './components/SiteSearchBar';
import { DedicatedAreaLandingPage } from './components/DedicatedAreaLandingPage';
import { CompactFaqModal } from './components/CompactFaqModal';
import { CompactReviewsModal } from './components/CompactReviewsModal';
import { ConversionAnalyticsModal } from './components/ConversionAnalyticsModal';

function MainAppContent() {
  const { theme } = useApp();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [goldenTipsModalOpen, setGoldenTipsModalOpen] = useState(false);
  const [brandKitModalOpen, setBrandKitModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [conversionsModalOpen, setConversionsModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hash.toLowerCase();
      return h === '#conversions' || h === '#analytics' || h === '#dashboard';
    }
    return false;
  });

  // Dedicated Luxury Area Page routing state
  const [selectedAreaSlug, setSelectedAreaSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#area/')) {
        return hash.replace('#area/', '').trim();
      }
    }
    return null;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#area/')) {
        const slug = hash.replace('#area/', '').trim();
        setSelectedAreaSlug(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash.includes('area/')) {
        setSelectedAreaSlug(null);
      }

      const h = hash.toLowerCase();
      if (h === '#conversions' || h === '#analytics' || h === '#dashboard') {
        setConversionsModalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectArea = (slug: string) => {
    setSelectedAreaSlug(slug);
    window.location.hash = `#area/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedAreaSlug(null);
    window.location.hash = '#hero';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-blue-600 selection:text-white bg-[#020b18] text-slate-100">
      {selectedAreaSlug ? (
        /* Dedicated Luxury Area Landing Page (e.g. Sheikh Zayed, New Cairo, 6th October, etc.) */
        <DedicatedAreaLandingPage 
          areaSlug={selectedAreaSlug}
          onBackToHome={handleBackToHome}
          onSelectArea={handleSelectArea}
        />
      ) : (
        <>
          {/* Scroll Progress Bar at very top */}
          <ScrollProgressBar />

          {/* Navigation Bar */}
          <Navbar 
            onOpenSearch={() => setSearchModalOpen(true)} 
            onOpenGoldenTips={() => setGoldenTipsModalOpen(true)}
            onSelectArea={handleSelectArea}
            onOpenBrandKit={() => setBrandKitModalOpen(true)}
            onOpenConversions={() => setConversionsModalOpen(true)}
          />

          {/* Main Content - Streamlined, Royal Navy Blue & Luxurious */}
          <main className="flex-1">
            {/* 1. Hero Section */}
            <Hero 
              onOpenGoldenTips={() => setGoldenTipsModalOpen(true)}
            />

            {/* 2. Live Luxury Stats Counter Bar */}
            <StatsCounterBar />

            {/* 2.5 Luxury Compounds & Developers Trust Strip (Matching Reference Image 7) */}
            <LuxuryCompoundsTrustStrip onSelectArea={handleSelectArea} />

            {/* 3. Luxury Areas Showcase (Prominently placed at the beginning of browsing as requested) */}
            <LuxuryAreasTopShowcase onSelectArea={handleSelectArea} />

            {/* 4. 3D Interactive Flipping Services Cards (All services with tap-to-flip specs) */}
            <InteractiveServicesFlipCards />

            {/* 5. Real Video Showcase from Live Project */}
            <VideoShowcase />

            {/* 6. Real Gallery with Category Filters */}
            <RealGallery />

            {/* 7. Compact Trust & FAQ Pills (Replaces long accordion & testimonials with sleek modal triggers) */}
            <CompactTrustAndFaqPills 
              onOpenFaq={() => setFaqModalOpen(true)}
              onOpenReviews={() => setReviewsModalOpen(true)}
            />

            {/* 8. Lead Capture Booking Form */}
            <QuickContactForm />
          </main>

          {/* Footer (Without visual SEO keyword clutter) */}
          <Footer 
            onOpenBrandKit={() => setBrandKitModalOpen(true)} 
            onOpenConversions={() => setConversionsModalOpen(true)}
          />
        </>
      )}

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions />

      {/* Interactive Search Modal */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 flex items-start sm:items-center justify-center pt-20 sm:pt-4 animate-fadeIn"
          onClick={() => setSearchModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl relative">
            <SiteSearchBar 
              onClose={() => setSearchModalOpen(false)}
              onOpenGoldenTips={() => {
                setSearchModalOpen(false);
                setGoldenTipsModalOpen(true);
              }}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Interactive Golden Tips Modal */}
      <GoldenTipsModal 
        isOpen={goldenTipsModalOpen} 
        onClose={() => setGoldenTipsModalOpen(false)} 
      />

      {/* Compact Interactive FAQ Modal */}
      <CompactFaqModal 
        isOpen={faqModalOpen} 
        onClose={() => setFaqModalOpen(false)} 
      />

      {/* Compact Customer Reviews Modal */}
      <CompactReviewsModal 
        isOpen={reviewsModalOpen} 
        onClose={() => setReviewsModalOpen(false)} 
      />

      {/* Brand Kit Download Modal */}
      <BrandKitModal 
        isOpen={brandKitModalOpen} 
        onClose={() => setBrandKitModalOpen(false)} 
      />

      {/* Live Conversions Analytics & Lead Tracker Modal */}
      <ConversionAnalyticsModal 
        isOpen={conversionsModalOpen} 
        onClose={() => setConversionsModalOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
