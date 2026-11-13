import React, { useState } from 'react';
import { MapPin, Navigation, Phone, ExternalLink, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { COMPANY_DATA } from '../data/companyData';

// Coordinates for Mokattam, Cairo, Egypt (Street 9 / Fountain Square)
const MOKATTAM_COORDINATES = {
  lat: 30.0131,
  lng: 31.3026,
};

export const GoogleMapsLocationSection: React.FC = () => {
  const [mapError, setMapError] = useState(false);
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${MOKATTAM_COORDINATES.lat},${MOKATTAM_COORDINATES.lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${MOKATTAM_COORDINATES.lat},${MOKATTAM_COORDINATES.lng}`;

  return (
    <section id="location-section" className="py-16 sm:py-24 bg-gradient-to-b from-[#020b18] via-[#05162e] to-[#020b18] text-white relative overflow-hidden border-t border-amber-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>المقر الرئيسي لشركة رويال موفرز VIP</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-serif leading-tight mb-4">
            موقعنا المعتمد على خرائط Google 📍
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 mt-1">
              حي المقطم — قلب القاهرة
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            يقع المقر الرئيسي لشركة رويال موفرز VIP في شارع 9 بميدان النافورة بحي المقطم، موقع استراتيجي يتيح لسياراتنا المجهزة وأوناشنا الهيدروليكية الانطلاق السريع خلال 20 دقيقة لتغطية التجمع الخامس، المعادي، مدينة نصر، الشيخ زايد، وجميع أنحاء الجمهورية.
          </p>
        </div>

        {/* Content Grid: Info Card + Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left / Info Side (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#031124] to-[#010914] p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
                  👑
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-serif">
                    شركة رويال موفرز VIP
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    فرع المقطم الرئيسي لإدارة الأسطول والأوناش
                  </p>
                </div>
              </div>

              {/* Address details */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  العنوان الرسمي المسجل:
                </div>
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  شارع 9، ميدان النافورة، حي المقطم، محافظة القاهرة، جمهورية مصر العربية
                </p>
                <div className="text-[11px] text-slate-400 font-mono">
                  الإحداثيات الجغرافية: 30.0131° N, 31.3026° E
                </div>
              </div>

              {/* Working Hours & Readiness */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    مواعيد العمل:
                  </span>
                  <span className="font-bold text-emerald-400">24 ساعة طوال الأسبوع</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-blue-400" />
                    سرعة الوصول:
                  </span>
                  <span className="font-bold text-white">خلال 20 - 30 دقيقة</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  موقعنا بالمقطم على أعلى هضبة في القاهرة يتيح لنا الوصول المباشر لكوبري الدائري ومحور حسب الله الكفراوي ومحور الشهيد لخدمة المعادي والتجمع في دقائق معدودة.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>احصل على اتجاهات السير عبر Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${COMPANY_DATA.whatsappDefault || '01233391255'}`}
                  className="py-3 px-3 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-blue-400/30"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>اتصال بمقر المقطم</span>
                </a>

                <a
                  href={`https://wa.me/2001233391255?text=${encodeURIComponent('السلام عليكم، استفسار بخصوص موقع وحجز رويال موفرز VIP فرع المقطم')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-emerald-400/30"
                >
                  <span>واتساب المقر الرئيسي</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right / Interactive Map Side (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl relative min-h-[420px] sm:min-h-[480px] bg-slate-900">
            {apiKey && !mapError ? (
              <div className="w-full h-full min-h-[420px] sm:min-h-[480px] relative">
                <APIProvider apiKey={apiKey} onError={() => setMapError(true)}>
                  <Map
                    defaultCenter={MOKATTAM_COORDINATES}
                    defaultZoom={14}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                    className="w-full h-full min-h-[420px] sm:min-h-[480px]"
                    gestureHandling="cooperative"
                    disableDefaultUI={false}
                  >
                    <AdvancedMarker position={MOKATTAM_COORDINATES} title="رويال موفرز VIP - المقطم">
                      <div className="relative flex flex-col items-center group cursor-pointer animate-bounce">
                        <div className="px-3 py-1 rounded-lg bg-slate-950 text-amber-300 border border-amber-400 font-bold text-xs shadow-xl whitespace-nowrap mb-1">
                          👑 رويال موفرز VIP (المقطم)
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-2xl border-2 border-white">
                          <MapPin className="w-6 h-6 fill-current" />
                        </div>
                        <div className="w-3 h-3 bg-amber-500 rotate-45 -mt-1.5 shadow-md"></div>
                      </div>
                    </AdvancedMarker>
                  </Map>
                </APIProvider>
              </div>
            ) : (
              /* Fallback Interactive Embed for Google Maps Mokattam Cairo */
              <div className="w-full h-full min-h-[420px] sm:min-h-[480px] relative">
                <iframe
                  title="موقع رويال موفرز VIP في المقطم على خرائط Google"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[420px] sm:min-h-[480px] border-0 filter saturate-150 contrast-105"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${MOKATTAM_COORDINATES.lat},${MOKATTAM_COORDINATES.lng}&hl=ar&z=14&output=embed`}
                ></iframe>

                {/* Floating Map Overlay Badge */}
                <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-amber-500/40 rounded-2xl p-3 shadow-2xl pointer-events-none max-w-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-1">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>رويال موفرز VIP · المقطم</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    شارع 9، ميدان النافورة، المقطم، القاهرة
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
