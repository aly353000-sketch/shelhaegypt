import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Animated High-End Luxury Service Icons for Shelha Egypt
 * Features SVG keyframe animations, glowing gradients, and distinct moving symbols.
 */

// 1. Residential Moving (Villas & Apartments with sparkling star & moving box)
export const ResidentialMovingIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes resStarSparkle {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
          50% { transform: scale(1.4) rotate(20deg); opacity: 1; filter: drop-shadow(0 0 4px #FBBF24); }
        }
        @keyframes resBoxGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; filter: drop-shadow(0 0 6px #38BDF8); }
        }
        .anim-star { transform-origin: 48px 16px; animation: resStarSparkle 3s ease-in-out infinite; }
        .anim-box { animation: resBoxGlow 2.5s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="resHomeGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="resRoofGrad" x1="32" y1="6" x2="32" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="goldStarGrad" x1="42" y1="16" x2="54" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE68A" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    
    {/* Villa Roof & Structure */}
    <path
      d="M32 8L6 28H14V54C14 55.1 14.9 56 16 56H48C49.1 56 50 55.1 50 54V28H58L32 8Z"
      fill="url(#resRoofGrad)"
      fillOpacity="0.25"
    />
    <path
      d="M32 8L6 28H14V54C14 55.1 14.9 56 16 56H48C49.1 56 50 55.1 50 54V28H58L32 8Z"
      stroke="url(#resHomeGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Doorway / Moving box loading */}
    <rect
      x="22"
      y="34"
      width="20"
      height="22"
      rx="3"
      stroke="url(#resHomeGrad)"
      strokeWidth="3"
      fill="url(#resRoofGrad)"
      fillOpacity="0.35"
    />
    
    {/* Moving box icon with animated gentle glow */}
    <g className="anim-box">
      <rect x="26" y="38" width="12" height="12" rx="2" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
      <path d="M26 44H38M32 38V44" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Luxury Golden Animated Sparkle */}
    <g className="anim-star">
      <path
        d="M48 14L50 19.5L55.5 21.5L50 23.5L48 29L46 23.5L40.5 21.5L46 19.5L48 14Z"
        fill="url(#goldStarGrad)"
      />
    </g>
  </svg>
);

// 2. Corporate & Office Moving (Modern high-rise with sequenced window illumination)
export const CorporateMovingIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes windowPulse1 {
          0%, 100% { opacity: 0.35; fill: #38BDF8; }
          50% { opacity: 1; fill: #FBBF24; filter: drop-shadow(0 0 3px #FBBF24); }
        }
        @keyframes windowPulse2 {
          0%, 100% { opacity: 1; fill: #38BDF8; }
          50% { opacity: 0.4; fill: #0284C7; }
        }
        .anim-win-1 { animation: windowPulse1 2.2s ease-in-out infinite; }
        .anim-win-2 { animation: windowPulse2 2.8s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="corpGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#1E3A8A" />
      </linearGradient>
      <linearGradient id="corpGlass" x1="20" y1="12" x2="44" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" stopOpacity="0.25" />
        <stop offset="1" stopColor="#1E3A8A" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    
    {/* Secondary Building */}
    <rect
      x="10"
      y="24"
      width="16"
      height="32"
      rx="2"
      fill="url(#corpGlass)"
      stroke="url(#corpGrad)"
      strokeWidth="3"
    />
    {/* Main Skyscraper Tower */}
    <rect
      x="26"
      y="10"
      width="28"
      height="46"
      rx="3"
      fill="url(#corpGlass)"
      stroke="url(#corpGrad)"
      strokeWidth="3.5"
    />
    
    {/* Office Windows Matrix with Sequenced Animation */}
    <rect x="32" y="16" width="6" height="5" rx="1" className="anim-win-1" />
    <rect x="42" y="16" width="6" height="5" rx="1" className="anim-win-2" />
    <rect x="32" y="25" width="6" height="5" rx="1" className="anim-win-2" />
    <rect x="42" y="25" width="6" height="5" rx="1" className="anim-win-1" />
    <rect x="32" y="34" width="6" height="5" rx="1" className="anim-win-1" />
    <rect x="42" y="34" width="6" height="5" rx="1" className="anim-win-2" />
    
    {/* Modern Glass Entrance */}
    <path
      d="M36 56V46H44V56"
      stroke="#38BDF8"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Side building indicator lights */}
    <circle cx="18" cy="30" r="2" fill="#38BDF8" className="anim-win-1" />
    <circle cx="18" cy="38" r="2" fill="#38BDF8" className="anim-win-2" />
    <circle cx="18" cy="46" r="2" fill="#38BDF8" className="anim-win-1" />
  </svg>
);

// 3. Hydraulic Winch Lift (Smooth ascending & descending lift platform)
export const HydraulicWinchIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes winchElevate {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-8px, 8px); }
        }
        @keyframes winchArrowsPulse {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-2px); }
        }
        .anim-winch-basket { animation: winchElevate 3.2s ease-in-out infinite; }
        .anim-winch-arrows { animation: winchArrowsPulse 1.6s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="winchGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="ladderGrad" x1="20" y1="10" x2="48" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#1D4ED8" />
      </linearGradient>
    </defs>
    
    {/* Winch Truck Base */}
    <path
      d="M8 48H44L48 42H56V48H58"
      stroke="url(#winchGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="18" cy="50" r="4.5" fill="#0F172A" stroke="url(#winchGrad)" strokeWidth="3" />
    <circle cx="46" cy="50" r="4.5" fill="#0F172A" stroke="url(#winchGrad)" strokeWidth="3" />
    <rect x="14" y="42" width="12" height="6" rx="2" fill="#D97706" />
    
    {/* Telescopic Hydraulic Ladder Rails */}
    <line x1="20" y1="42" x2="48" y2="10" stroke="url(#ladderGrad)" strokeWidth="4" strokeLinecap="round" />
    <line x1="24" y1="45" x2="52" y2="13" stroke="url(#ladderGrad)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Rungs */}
    <line x1="23" y1="39" x2="27" y2="42" stroke="#38BDF8" strokeWidth="2.5" />
    <line x1="29" y1="32" x2="33" y2="35" stroke="#38BDF8" strokeWidth="2.5" />
    <line x1="36" y1="24" x2="40" y2="27" stroke="#38BDF8" strokeWidth="2.5" />
    <line x1="43" y1="16" x2="47" y2="19" stroke="#38BDF8" strokeWidth="2.5" />
    
    {/* Smooth Animated Basket on Hydraulic Rail */}
    <g className="anim-winch-basket">
      <rect
        x="43"
        y="6"
        width="16"
        height="12"
        rx="2.5"
        fill="#F59E0B"
        stroke="#FDE68A"
        strokeWidth="2"
      />
      {/* Furniture inside basket */}
      <rect x="46" y="8" width="10" height="4" rx="1" fill="#FEF3C7" />
      {/* Upward motion arrow */}
      <g className="anim-winch-arrows">
        <path
          d="M51 16V13M49 14.5L51 12.5L53 14.5"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  </svg>
);

// 4. Premium Protective Packaging (Isometric box with shimmering bubble wrap and fragile seal)
export const ProtectivePackagingIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes bubblePulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 1; fill: #67E8F9; filter: drop-shadow(0 0 4px #22D3EE); }
        }
        @keyframes boxTapeShine {
          0%, 100% { stroke: #F59E0B; }
          50% { stroke: #FDE68A; filter: drop-shadow(0 0 3px #FBBF24); }
        }
        .anim-bubble-1 { transform-origin: 22px 30px; animation: bubblePulse 2.4s ease-in-out infinite; }
        .anim-bubble-2 { transform-origin: 26px 36px; animation: bubblePulse 2.8s ease-in-out infinite 0.5s; }
        .anim-tape { animation: boxTapeShine 2.5s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="packGrad" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="boxInner" x1="14" y1="20" x2="50" y2="54" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369A1" stopOpacity="0.3" />
        <stop offset="1" stopColor="#0C4A6E" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    
    {/* 3D Isometric Cardboard Box */}
    <path
      d="M32 10L52 21V43L32 54L12 43V21L32 10Z"
      fill="url(#boxInner)"
      stroke="url(#packGrad)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M32 10V54" stroke="url(#packGrad)" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 21L32 32L52 21" stroke="url(#packGrad)" strokeWidth="3" strokeLinejoin="round" />
    
    {/* Reinforced Adhesive Packing Tape */}
    <path
      d="M24 14.5L40 47.5"
      className="anim-tape"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    
    {/* Animated Bubble Wrap Cushion Dots */}
    <circle cx="22" cy="30" r="2.5" className="anim-bubble-1" fill="#38BDF8" />
    <circle cx="26" cy="36" r="2.5" className="anim-bubble-2" fill="#38BDF8" />
    <circle cx="20" cy="40" r="2" fill="#38BDF8" opacity="0.6" />
    
    {/* Fragile Glass Safe Badge with Red Heart */}
    <circle cx="43" cy="33" r="5.5" fill="#EF4444" />
    <path d="M41 31H45V33L44 35H42L41 33V31Z" fill="#FFFFFF" />
  </svg>
);

// 5. AC & Electrical Technician (Indoor unit with animated cool breeze & active LED)
export const AcTechnicianIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes acBreezeFlow {
          0% { stroke-dashoffset: 20; opacity: 0.3; }
          50% { opacity: 1; filter: drop-shadow(0 0 4px #38BDF8); }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes ledBlink {
          0%, 100% { fill: #10B981; filter: drop-shadow(0 0 4px #10B981); }
          50% { fill: #059669; filter: none; }
        }
        .anim-breeze {
          stroke-dasharray: 6 4;
          animation: acBreezeFlow 2s linear infinite;
        }
        .anim-led { animation: ledBlink 1.8s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="acGrad" x1="10" y1="12" x2="54" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#1E40AF" />
      </linearGradient>
    </defs>
    
    {/* AC Indoor Split Unit */}
    <rect
      x="10"
      y="14"
      width="44"
      height="22"
      rx="4"
      fill="#0F172A"
      stroke="url(#acGrad)"
      strokeWidth="3.5"
    />
    
    {/* Air vent slats */}
    <line x1="16" y1="26" x2="48" y2="26" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="30" x2="48" y2="30" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Active Green Digital Display */}
    <rect x="42" y="18" width="6" height="4" rx="1" className="anim-led" />
    
    {/* Animated Cold Air Breeze Flow */}
    <path
      d="M18 42C18 47 23 49 27 49M27 42C27 48 32 51 36 51M36 42C36 49 41 53 45 53"
      stroke="#38BDF8"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="anim-breeze"
    />
    
    {/* Crossed Precision Technician Tool Wrench */}
    <g transform="translate(18, 42)">
      <circle cx="20" cy="10" r="5.5" fill="#F59E0B" />
      <path d="M17 7L23 13M23 7L17 13" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

// 6. Covered Padded Moving Trucks (Closed furniture truck with animated motion & spinning wheel hubs)
export const CoveredTruckIcon: React.FC<IconProps> = ({ className = 'w-7 h-7', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <style>
      {`
        @keyframes truckSpeedLines {
          0%, 100% { opacity: 0.25; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(-4px); }
        }
        @keyframes truckBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1px); }
        }
        .anim-speed-lines { animation: truckSpeedLines 1.4s ease-in-out infinite; }
        .anim-truck-body { animation: truckBounce 1.8s ease-in-out infinite; }
      `}
    </style>
    <defs>
      <linearGradient id="truckGrad" x1="8" y1="14" x2="56" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="cargoBox" x1="10" y1="16" x2="38" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369A1" stopOpacity="0.25" />
        <stop offset="1" stopColor="#1E3A8A" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    
    {/* Animated Speed Dash Lines */}
    <g className="anim-speed-lines">
      <line x1="2" y1="20" x2="6" y2="20" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="1" y1="27" x2="6" y2="27" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="3" y1="34" x2="6" y2="34" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    
    <g className="anim-truck-body">
      {/* Closed Padded Cargo Box */}
      <rect
        x="8"
        y="16"
        width="32"
        height="26"
        rx="3"
        fill="url(#cargoBox)"
        stroke="url(#truckGrad)"
        strokeWidth="3.5"
      />
      {/* Truck Cabin */}
      <path
        d="M40 24H50L56 32V42H40V24Z"
        fill="#0F172A"
        stroke="url(#truckGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Front Windshield */}
      <path d="M42 27H49L53 33H42V27Z" fill="#38BDF8" opacity="0.8" />
    </g>

    {/* Heavy Duty Tires with Cyan Rims */}
    <circle cx="18" cy="46" r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
    <circle cx="48" cy="46" r="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
    <circle cx="18" cy="46" r="2" fill="#F59E0B" />
    <circle cx="48" cy="46" r="2" fill="#F59E0B" />
  </svg>
);
