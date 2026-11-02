/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PriceCalculator } from './components/PriceCalculator';
import { ServicesSection } from './components/ServicesSection';
import { CountdownTimer } from './components/CountdownTimer';
import { WinchAndPackingDeepDive } from './components/WinchAndPackingDeepDive';
import { BoxesStoreSection } from './components/BoxesStoreSection';
import { VideoShowcase } from './components/VideoShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AreasCoverage } from './components/AreasCoverage';
import { RealGallery } from './components/RealGallery';
import { WorkProcess } from './components/WorkProcess';
import { MovingTipsGuide } from './components/MovingTipsGuide';
import { FurnitureTransformationArticle } from './components/FurnitureTransformationArticle';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { QuickContactForm } from './components/QuickContactForm';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { GoldenTipsModal } from './components/GoldenTipsModal';

function MainAppContent() {
  const { theme } = useApp();
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [goldenTipsModalOpen, setGoldenTipsModalOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-blue-600 selection:text-white ${
      theme === 'light'
        ? 'bg-slate-50 text-slate-900'
        : 'bg-[#030c1d] text-slate-100'
    }`}>
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Navigation Bar */}
      <Navbar 
        onOpenCalculator={() => setCalculatorModalOpen(true)} 
        onOpenGoldenTips={() => setGoldenTipsModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onOpenCalculator={() => setCalculatorModalOpen(true)} 
          onOpenGoldenTips={() => setGoldenTipsModalOpen(true)}
        />

        {/* Inline Price Calculator Section for instant engagement */}
        <section id="calculator-section" className={`py-12 border-b transition-colors ${
          theme === 'light'
            ? 'bg-white border-slate-200'
            : 'bg-[#030c1d] border-blue-900/40'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PriceCalculator />
          </div>
        </section>

        {/* Detailed Services Sections */}
        <ServicesSection />

        {/* Countdown Timer for Limited-Time Discount & Urgency (Placed directly below Services as requested) */}
        <CountdownTimer />

        {/* Winch & Packing & AC Deep Dive */}
        <WinchAndPackingDeepDive />

        {/* Dedicated Boxes & Packaging Store & Home Delivery Section */}
        <BoxesStoreSection />

        {/* Real Video Showcase from Live Project */}
        <VideoShowcase />

        {/* Why Choose Shilha & Real Comparison */}
        <WhyChooseUs />

        {/* Areas Coverage & District ETA */}
        <AreasCoverage />

        {/* Real Gallery with Category Filters */}
        <RealGallery />

        {/* 5-Step Work Process */}
        <WorkProcess />

        {/* Golden Pre-Moving Tips Guide (Gold, Money in personal car, Apartment preparation) */}
        <MovingTipsGuide />

        {/* Featured Case Study: Luxury Furniture Transformation & Reader Mode (Before & After Photo) */}
        <FurnitureTransformationArticle />

        {/* Testimonials */}
        <Testimonials />

        {/* FAQ Section */}
        <FaqSection />

        {/* Lead Capture Booking Form */}
        <QuickContactForm />
      </main>

      {/* Footer with SEO Keywords Cloud */}
      <Footer />

      {/* Floating Call & WhatsApp Buttons as requested */}
      <FloatingActions />

      {/* Modal Calculator (triggered from navigation or hero buttons) */}
      {calculatorModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto p-4 flex items-center justify-center animate-fadeIn"
          onClick={() => setCalculatorModalOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl relative">
            <button
              type="button"
              onClick={() => setCalculatorModalOpen(false)}
              className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-50 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-2 shadow-xl border-2 border-white flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
              aria-label="خروج من الحاسبة"
              title="خروج من الحاسبة"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
            <PriceCalculator isModal onClose={() => setCalculatorModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Interactive Golden Tips Modal (Pre-moving guide) */}
      <GoldenTipsModal 
        isOpen={goldenTipsModalOpen} 
        onClose={() => setGoldenTipsModalOpen(false)} 
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
