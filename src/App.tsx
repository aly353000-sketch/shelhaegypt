/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounterBar } from './components/StatsCounterBar';
import { LuxuryCompoundsTrustStrip } from './components/LuxuryCompoundsTrustStrip';
import { LuxuryAreasTopShowcase } from './components/LuxuryAreasTopShowcase';
import { CompactTrustAndFaqPills } from './components/CompactTrustAndFaqPills';
import { QuickContactForm } from './components/QuickContactForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { initGlobalConversionTracker } from './utils/analytics';

// Lazy-load below-the-fold heavy sections & modals to speed up initial mobile page load
const InteractiveServicesFlipCards = lazy(() =>
  import('./components/InteractiveServicesFlipCards').then((m) => ({ default: m.InteractiveServicesFlipCards }))
);
const VideoShowcase = lazy(() =>
  import('./components/VideoShowcase').then((m) => ({ default: m.VideoShowcase }))
);
const RealGallery = lazy(() =>
  import('./components/RealGallery').then((m) => ({ default: m.RealGallery }))
);
const GoogleMapsLocationSection = lazy(() =>
  import('./components/GoogleMapsLocationSection').then((m) => ({ default: m.GoogleMapsLocationSection }))
);
const DedicatedAreaLandingPage = lazy(() =>
  import('./components/DedicatedAreaLandingPage').then((m) => ({ default: m.DedicatedAreaLandingPage }))
);
const GoldenTipsModal = lazy(() =>
  import('./components/GoldenTipsModal').then((m) => ({ default: m.GoldenTipsModal }))
);
const BrandKitModal = lazy(() =>
  import('./components/BrandKitModal').then((m) => ({ default: m.BrandKitModal }))
);
const SiteSearchBar = lazy(() =>
  import('./components/SiteSearchBar').then((m) => ({ default: m.SiteSearchBar }))
);
const CompactFaqModal = lazy(() =>
  import('./components/CompactFaqModal').then((m) => ({ default: m.CompactFaqModal }))
);
const CompactReviewsModal = lazy(() =>
  import('./components/CompactReviewsModal').then((m) => ({ default: m.CompactReviewsModal }))
);
const ConversionAnalyticsModal = lazy(() =>
  import('./components/ConversionAnalyticsModal').then((m) => ({ default: m.ConversionAnalyticsModal }))
);

function SectionPlaceholder({ id }: { id: string }) {
  return <div id={id} className="min-h-[240px] bg-[#020b18]" aria-hidden="true" />;
}

function MainAppContent() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [goldenTipsModalOpen, setGoldenTipsModalOpen] = useState(false);
  const [brandKitModalOpen, setBrandKitModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);

  const [isOwner, setIsOwner] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('royal_movers_owner_auth') === 'true';
    }
    return false;
  });

  const handleAuthenticateOwner = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('royal_movers_owner_auth', 'true');
    }
    setIsOwner(true);
  };

  const handleRevokeOwner = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('royal_movers_owner_auth');
    }
    setIsOwner(false);
  };

  const [conversionsModalOpen, setConversionsModalOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const h = window.location.hash.toLowerCase();
      return h === '#conversions' || h === '#analytics' || h === '#dashboard' || h === '#admin' || h === '#owner';
    }
    return false;
  });

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
      if (h === '#conversions' || h === '#analytics' || h === '#dashboard' || h === '#admin' || h === '#owner') {
        setConversionsModalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    const cleanupTracker = initGlobalConversionTracker();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      cleanupTracker();
    };
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
        <Suspense fallback={<div className="min-h-screen bg-[#020b18]" />}>
          <DedicatedAreaLandingPage
            areaSlug={selectedAreaSlug}
            onBackToHome={handleBackToHome}
            onSelectArea={handleSelectArea}
          />
        </Suspense>
      ) : (
        <>
          <ScrollProgressBar />

          <Navbar
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenGoldenTips={() => setGoldenTipsModalOpen(true)}
            onSelectArea={handleSelectArea}
            onOpenBrandKit={() => setBrandKitModalOpen(true)}
            onOpenConversions={() => setConversionsModalOpen(true)}
            isOwner={isOwner}
          />

          <main className="flex-1">
            <Hero onOpenGoldenTips={() => setGoldenTipsModalOpen(true)} />

            <StatsCounterBar />

            <LuxuryCompoundsTrustStrip onSelectArea={handleSelectArea} />

            <LuxuryAreasTopShowcase onSelectArea={handleSelectArea} />

            <Suspense fallback={<SectionPlaceholder id="interactive-services" />}>
              <InteractiveServicesFlipCards />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder id="winch-section" />}>
              <VideoShowcase />
            </Suspense>

            <Suspense fallback={<SectionPlaceholder id="gallery" />}>
              <RealGallery />
            </Suspense>

            <CompactTrustAndFaqPills
              onOpenFaq={() => setFaqModalOpen(true)}
              onOpenReviews={() => setReviewsModalOpen(true)}
            />

            <Suspense fallback={<SectionPlaceholder id="location-section" />}>
              <GoogleMapsLocationSection />
            </Suspense>

            <QuickContactForm />
          </main>

          <Footer
            onOpenBrandKit={() => setBrandKitModalOpen(true)}
            onOpenConversions={() => setConversionsModalOpen(true)}
            isOwner={isOwner}
          />
        </>
      )}

      <FloatingActions />

      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 flex items-start sm:items-center justify-center pt-20 sm:pt-4 animate-fadeIn"
          onClick={() => setSearchModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl relative">
            <Suspense fallback={null}>
              <SiteSearchBar
                onClose={() => setSearchModalOpen(false)}
                onOpenGoldenTips={() => {
                  setSearchModalOpen(false);
                  setGoldenTipsModalOpen(true);
                }}
                autoFocus
              />
            </Suspense>
          </div>
        </div>
      )}

      {goldenTipsModalOpen && (
        <Suspense fallback={null}>
          <GoldenTipsModal
            isOpen={goldenTipsModalOpen}
            onClose={() => setGoldenTipsModalOpen(false)}
          />
        </Suspense>
      )}

      {faqModalOpen && (
        <Suspense fallback={null}>
          <CompactFaqModal
            isOpen={faqModalOpen}
            onClose={() => setFaqModalOpen(false)}
          />
        </Suspense>
      )}

      {reviewsModalOpen && (
        <Suspense fallback={null}>
          <CompactReviewsModal
            isOpen={reviewsModalOpen}
            onClose={() => setReviewsModalOpen(false)}
          />
        </Suspense>
      )}

      {brandKitModalOpen && (
        <Suspense fallback={null}>
          <BrandKitModal
            isOpen={brandKitModalOpen}
            onClose={() => setBrandKitModalOpen(false)}
          />
        </Suspense>
      )}

      {conversionsModalOpen && (
        <Suspense fallback={null}>
          <ConversionAnalyticsModal
            isOpen={conversionsModalOpen}
            onClose={() => setConversionsModalOpen(false)}
            isOwner={isOwner}
            onAuthenticate={handleAuthenticateOwner}
            onRevoke={handleRevokeOwner}
          />
        </Suspense>
      )}
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
