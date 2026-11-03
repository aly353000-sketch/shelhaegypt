import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. High Resolution Square Logo SVG (1024x1024) - Enlarged Fonts & Embedded Phone Number
const squareSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>

    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="40%" stop-color="#0b2b64"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <linearGradient id="phoneBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061633"/>
      <stop offset="100%" stop-color="#0f3473"/>
    </linearGradient>

    <filter id="subtleDrop" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#09204a" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Clean Background -->
  <rect width="1024" height="1024" rx="48" fill="url(#bgGrad)"/>
  
  <!-- Outer Subtle Geometric Ring -->
  <circle cx="512" cy="512" r="472" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="14 12"/>
  <circle cx="512" cy="512" r="454" fill="none" stroke="#0284c7" stroke-width="2" opacity="0.4"/>

  <!-- Main Center Shield / Emblem -->
  <g filter="url(#subtleDrop)">
    <!-- Base Hexagonal Shield -->
    <path d="M512 65 L815 188 L815 510 C815 715 675 870 512 925 C349 870 209 715 209 510 L209 188 Z" 
          fill="#ffffff" stroke="#e2e8f0" stroke-width="8"/>
    
    <!-- Inner Dynamic Shield Border -->
    <path d="M512 95 L785 208 L785 500 C785 680 655 820 512 875 C369 820 239 680 239 500 L239 208 Z" 
          fill="none" stroke="url(#skyGrad)" stroke-width="4.5" opacity="0.6"/>

    <!-- Central Moving Truck + Hydraulic Crane Graphic -->
    <g transform="translate(512, 290)">
      <!-- Ground Line -->
      <path d="M-200 65 L200 65" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
      <path d="M-140 77 L140 77" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round"/>

      <!-- Truck Body (Closed Moving Vehicle) -->
      <path d="M-165 -50 L-10 -50 L-10 56 L-165 56 Z" fill="url(#navyGrad)" rx="12"/>
      <!-- Cargo Stripes -->
      <path d="M-145 -25 L-30 -25" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
      <path d="M-145 3 L-45 3" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" opacity="0.85"/>
      <path d="M-145 31 L-65 31" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round"/>

      <!-- Truck Cabin -->
      <path d="M-10 -20 L48 -20 L90 17 L90 56 L-10 56 Z" fill="url(#skyGrad)"/>
      <!-- Cabin Windshield -->
      <path d="M0 -8 L38 -8 L72 19 L0 19 Z" fill="#ffffff" opacity="0.9"/>
      <!-- Headlight -->
      <circle cx="85" cy="38" r="6" fill="url(#goldGrad)"/>

      <!-- Truck Wheels -->
      <circle cx="-120" cy="58" r="28" fill="#0f172a" stroke="#ffffff" stroke-width="7"/>
      <circle cx="-120" cy="58" r="12" fill="url(#skyGrad)"/>

      <circle cx="48" cy="58" r="28" fill="#0f172a" stroke="#ffffff" stroke-width="7"/>
      <circle cx="48" cy="58" r="12" fill="url(#skyGrad)"/>

      <!-- Hydraulic Crane Ladder Extending Upward to the Right -->
      <path d="M-60 -45 L135 -185" stroke="url(#goldGrad)" stroke-width="14" stroke-linecap="round"/>
      <path d="M-45 -55 L150 -195" stroke="#f59e0b" stroke-width="7" stroke-linecap="round" stroke-dasharray="16 10"/>

      <!-- Lift Platform with Moving Box -->
      <g transform="translate(145, -205)">
        <rect x="-40" y="-40" width="80" height="80" rx="10" fill="url(#navyGrad)" stroke="#ffffff" stroke-width="5"/>
        <path d="M0 -40 L0 40" stroke="url(#goldGrad)" stroke-width="8"/>
        <path d="M-40 0 L40 0" stroke="url(#goldGrad)" stroke-width="8"/>
        <circle cx="0" cy="0" r="9" fill="#ffffff"/>
      </g>
    </g>

    <!-- Super Enlarged Stylized Arabic Brand Typography "شلها" -->
    <g transform="translate(512, 498)">
      <text x="0" y="0" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
            font-size="160" font-weight="900" fill="url(#navyGrad)" letter-spacing="-1">
        شلــهـا
      </text>
      
      <!-- Sub-headline in Arabic (Enlarged and Clear) -->
      <text x="0" y="62" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
            font-size="38" font-weight="800" fill="#0284c7" letter-spacing="0.5">
        لنقل وتغليف الأثاث • ونش هيدروليكي
      </text>
    </g>

    <!-- Embedded High-Contrast Phone Number Badge (01099649897) -->
    <g transform="translate(512, 655)">
      <!-- Badge Pill Background -->
      <rect x="-245" y="-42" width="490" height="84" rx="42" fill="url(#phoneBadgeGrad)" 
            stroke="url(#goldGrad)" stroke-width="5"/>
      
      <!-- Golden Phone Icon -->
      <g transform="translate(-180, -18) scale(1.6)">
        <path d="M3.6 1.8 C3.1 1.3 2.3 1.3 1.8 1.8 L0.7 2.9 C0.2 3.4 0 4.1 0.2 4.8 C0.9 7.8 2.8 10.5 5.5 12.2 C7.2 13.3 9.2 14 11.2 14 C11.9 14 12.6 13.8 13.1 13.3 L14.2 12.2 C14.7 11.7 14.7 10.9 14.2 10.4 L11.8 8 C11.3 7.5 10.5 7.5 10 8 L9.2 8.8 C9 9 8.7 9.1 8.4 9 C7.3 8.5 5.5 6.7 5 5.6 C4.9 5.3 5 5 5.2 4.8 L6 4 C6.5 3.5 6.5 2.7 6 2.2 L3.6 1.8 Z" fill="#fbbf24"/>
      </g>

      <!-- Clear Phone Number Only - Perfectly Centered -->
      <text x="32" y="18" text-anchor="middle" font-family="'Courier New', monospace" 
            font-size="52" font-weight="900" fill="#ffffff" letter-spacing="3">
        01099649897
      </text>
    </g>

    <!-- English Corporate Subtitle & Trust Rating -->
    <g transform="translate(512, 765)">
      <text x="0" y="0" text-anchor="middle" font-family="'Montserrat', 'Arial', sans-serif" 
            font-size="24" font-weight="900" fill="#334155" letter-spacing="7">
        SHELHA EGYPT
      </text>
      
      <!-- 5 Golden Trust Stars -->
      <g transform="translate(0, 36)">
        <polygon points="0,-18 6,-6 18,-6 9,4 12,16 0,8 -12,16 -9,4 -18,-6 -6,-6" fill="url(#goldGrad)"/>
        <polygon points="-46,-15 -41,-4 -30,-4 -38,5 -35,15 -46,8 -57,15 -54,5 -62,-4 -51,-4" fill="url(#goldGrad)"/>
        <polygon points="46,-15 51,-4 62,-4 54,5 57,15 46,8 35,15 38,5 30,-4 41,-4" fill="url(#goldGrad)"/>
        <polygon points="-92,-12 -88,-2 -79,-2 -85,5 -83,13 -92,8 -101,13 -99,5 -105,-2 -96,-2" fill="url(#goldGrad)"/>
        <polygon points="92,-12 96,-2 105,-2 99,5 101,13 92,8 83,13 85,5 79,-2 88,-2" fill="url(#goldGrad)"/>
      </g>
    </g>
  </g>
</svg>
`;

// 2. High Resolution Landscape Banner SVG (1200x628) - Enlarged Fonts & Embedded Phone Number
const landscapeSvg = `
<svg width="1200" height="628" viewBox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="landBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>

    <linearGradient id="navyL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="40%" stop-color="#0b2b64"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="goldL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#061633"/>
      <stop offset="100%" stop-color="#0f3473"/>
    </linearGradient>

    <filter id="shadowL" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#09204a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="1200" height="628" fill="url(#landBg)"/>

  <!-- Left & Right Modern Geometry Accents -->
  <path d="M0 0 L260 0 L150 628 L0 628 Z" fill="#0369a1" opacity="0.08"/>
  <path d="M1200 0 L1060 0 L1170 628 L1200 628 Z" fill="#f59e0b" opacity="0.14"/>

  <!-- Left Emblem Card with Truck & Crane -->
  <g transform="translate(110, 124)" filter="url(#shadowL)">
    <rect x="0" y="0" width="350" height="380" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="5"/>
    <rect x="15" y="15" width="320" height="350" rx="26" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.5"/>
    
    <!-- Truck + Crane graphic -->
    <g transform="translate(175, 210) scale(1.02)">
      <path d="M-120 45 L120 45" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
      <path d="M-105 -25 L-5 -25 L-5 40 L-105 40 Z" fill="url(#navyL)" rx="8"/>
      <!-- Cargo lines -->
      <path d="M-90 -10 L-20 -10" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
      <path d="M-90 8 L-30 8" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
      <path d="M-90 26 L-40 26" stroke="url(#goldL)" stroke-width="4" stroke-linecap="round"/>

      <path d="M-5 -8 L40 -8 L70 18 L70 40 L-5 40 Z" fill="#0284c7"/>
      <circle cx="-75" cy="42" r="20" fill="#0f172a" stroke="#ffffff" stroke-width="5"/>
      <circle cx="40" cy="42" r="20" fill="#0f172a" stroke="#ffffff" stroke-width="5"/>
      <!-- Crane -->
      <path d="M-40 -20 L90 -115" stroke="url(#goldL)" stroke-width="12" stroke-linecap="round"/>
      <rect x="80" y="-140" width="50" height="50" rx="8" fill="url(#navyL)" stroke="#ffffff" stroke-width="4"/>
      <path d="M105 -140 L105 -90" stroke="url(#goldL)" stroke-width="5"/>
      <path d="M80 -115 L130 -115" stroke="url(#goldL)" stroke-width="5"/>
    </g>

    <!-- Star rating on card -->
    <g transform="translate(175, 330) scale(0.9)">
      <polygon points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5" fill="url(#goldL)"/>
      <polygon points="-35,-13 -31,-3 -21,-3 -28,4 -26,13 -35,7 -44,13 -42,4 -49,-3 -39,-3" fill="url(#goldL)"/>
      <polygon points="35,-13 39,-3 49,-3 42,4 44,13 35,7 26,13 28,4 21,-3 31,-3" fill="url(#goldL)"/>
      <polygon points="-70,-11 -67,-2 -58,-2 -64,4 -62,12 -70,7 -78,12 -76,4 -82,-2 -73,-2" fill="url(#goldL)"/>
      <polygon points="70,-11 73,-2 82,-2 76,4 78,12 70,7 62,12 64,4 58,-2 67,-2" fill="url(#goldL)"/>
    </g>
  </g>

  <!-- Typography & Details Column -->
  <g transform="translate(500, 145)">
    <!-- Main Giant Arabic Brand Name -->
    <text x="0" y="70" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" font-size="136" font-weight="900" fill="url(#navyL)" letter-spacing="-1">
      شلـــهـا
    </text>
    
    <!-- Subtitle Arabic (Large & Ultra-Clear) -->
    <text x="0" y="142" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" font-size="38" font-weight="800" fill="#0284c7">
      لنقل وتغليف الأثاث • ونش هيدروليكي
    </text>

    <!-- Phone Number Badge (01099649897) with High Contrast -->
    <g transform="translate(0, 175)">
      <rect x="0" y="0" width="480" height="76" rx="38" fill="url(#badgeGrad)" stroke="url(#goldL)" stroke-width="4"/>
      
      <!-- Phone Icon -->
      <g transform="translate(28, 20) scale(1.5)">
        <path d="M3.6 1.8 C3.1 1.3 2.3 1.3 1.8 1.8 L0.7 2.9 C0.2 3.4 0 4.1 0.2 4.8 C0.9 7.8 2.8 10.5 5.5 12.2 C7.2 13.3 9.2 14 11.2 14 C11.9 14 12.6 13.8 13.1 13.3 L14.2 12.2 C14.7 11.7 14.7 10.9 14.2 10.4 L11.8 8 C11.3 7.5 10.5 7.5 10 8 L9.2 8.8 C9 9 8.7 9.1 8.4 9 C7.3 8.5 5.5 6.7 5 5.6 C4.9 5.3 5 5 5.2 4.8 L6 4 C6.5 3.5 6.5 2.7 6 2.2 L3.6 1.8 Z" fill="#fbbf24"/>
      </g>

      <text x="260" y="52" text-anchor="middle" font-family="'Courier New', monospace" font-size="48" font-weight="900" fill="#ffffff" letter-spacing="3">
        01099649897
      </text>
    </g>

    <!-- Badges Row -->
    <g transform="translate(0, 278)">
      <rect x="0" y="0" width="168" height="40" rx="20" fill="#0284c7" opacity="0.12"/>
      <text x="84" y="26" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0369a1">
        ⭐ أوناش حتى الدور 25
      </text>

      <rect x="180" y="0" width="168" height="40" rx="20" fill="#10b981" opacity="0.12"/>
      <text x="264" y="26" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#047857">
        ✓ خصم 10% فوري
      </text>

      <rect x="360" y="0" width="175" height="40" rx="20" fill="#f59e0b" opacity="0.14"/>
      <text x="447" y="26" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b45309">
        📦 كراتين 5 طبقات
      </text>
    </g>

    <!-- English Line -->
    <text x="0" y="348" font-family="'Montserrat', sans-serif" font-size="16" font-weight="900" fill="#64748b" letter-spacing="5">
      SHELHA EGYPT • 24/7 MOVING &amp; PACKING SERVICES
    </text>
  </g>
</svg>
`;

// 3. Ultra Pure Square Brand Icon (for Google Ads Logo slot specifically)
const brandIconSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>

    <linearGradient id="navyI" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a192f"/>
      <stop offset="40%" stop-color="#0b2b64"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>

    <linearGradient id="skyI" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#38bdf8"/>
    </linearGradient>

    <linearGradient id="goldI" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <filter id="shadowI" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#09204a" flood-opacity="0.14"/>
    </filter>
  </defs>

  <rect width="1024" height="1024" rx="48" fill="url(#bgIconGrad)"/>
  <circle cx="512" cy="512" r="470" fill="none" stroke="#e2e8f0" stroke-width="4"/>
  <circle cx="512" cy="512" r="450" fill="none" stroke="url(#skyI)" stroke-width="3" opacity="0.5"/>

  <g filter="url(#shadowI)">
    <circle cx="512" cy="420" r="260" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>

    <!-- Truck and Crane Graphic -->
    <g transform="translate(512, 430) scale(1.35)">
      <path d="M-120 45 L120 45" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
      <path d="M-105 -25 L-5 -25 L-5 40 L-105 40 Z" fill="url(#navyI)" rx="8"/>
      <path d="M-90 -10 L-20 -10" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <path d="M-90 8 L-30 8" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <path d="M-90 26 L-40 26" stroke="url(#goldI)" stroke-width="5" stroke-linecap="round"/>

      <path d="M-5 -8 L40 -8 L70 18 L70 40 L-5 40 Z" fill="#0284c7"/>
      <circle cx="-75" cy="42" r="20" fill="#0f172a" stroke="#ffffff" stroke-width="5"/>
      <circle cx="40" cy="42" r="20" fill="#0f172a" stroke="#ffffff" stroke-width="5"/>

      <!-- Crane -->
      <path d="M-40 -20 L90 -115" stroke="url(#goldI)" stroke-width="12" stroke-linecap="round"/>
      <rect x="80" y="-140" width="50" height="50" rx="8" fill="url(#navyI)" stroke="#ffffff" stroke-width="4"/>
      <path d="M105 -140 L105 -90" stroke="url(#goldI)" stroke-width="5"/>
      <path d="M80 -115 L130 -115" stroke="url(#goldI)" stroke-width="5"/>
    </g>
  </g>

  <!-- Giant Arabic Brand Name -->
  <g transform="translate(512, 780)">
    <text x="0" y="0" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
          font-size="185" font-weight="900" fill="url(#navyI)" letter-spacing="-1">
      شلــهـا
    </text>
    <text x="0" y="70" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
          font-size="42" font-weight="800" fill="#0284c7">
      نقل عفش • ونش هيدروليكي
    </text>
  </g>
</svg>
`;

async function buildLogos() {
  console.log('Rendering upgraded high-contrast logos with sharp...');
  
  // 1. High Resolution Square Logo PNG (1024x1024)
  await sharp(Buffer.from(squareSvg))
    .resize(1024, 1024)
    .png({ quality: 100 })
    .toFile(path.resolve('public/shelha_logo_hd.png'));
  console.log('✓ Created public/shelha_logo_hd.png (1024x1024)');

  // 2. High Resolution Square Logo JPG (1024x1024 for Google Ads 1:1)
  await sharp(Buffer.from(squareSvg))
    .resize(1024, 1024)
    .jpeg({ quality: 95 })
    .toFile(path.resolve('public/shelha_logo_square.jpg'));
  console.log('✓ Created public/shelha_logo_square.jpg (1024x1024)');

  // 3. High Resolution Landscape Banner JPG (1200x628 for Google Ads 1.91:1)
  await sharp(Buffer.from(landscapeSvg))
    .resize(1200, 628)
    .jpeg({ quality: 95 })
    .toFile(path.resolve('public/shelha_logo_landscape.jpg'));
  console.log('✓ Created public/shelha_logo_landscape.jpg (1200x628)');

  // 4. Pure Brand Icon JPG (1024x1024)
  await sharp(Buffer.from(brandIconSvg))
    .resize(1024, 1024)
    .jpeg({ quality: 95 })
    .toFile(path.resolve('public/shelha_brand_icon.jpg'));
  console.log('✓ Created public/shelha_brand_icon.jpg (1024x1024)');

  // Copy to dist
  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/shelha_logo_hd.png', 'dist/shelha_logo_hd.png');
    fs.copyFileSync('public/shelha_logo_square.jpg', 'dist/shelha_logo_square.jpg');
    fs.copyFileSync('public/shelha_logo_landscape.jpg', 'dist/shelha_logo_landscape.jpg');
    fs.copyFileSync('public/shelha_brand_icon.jpg', 'dist/shelha_brand_icon.jpg');
    console.log('✓ Copied upgraded logos to dist directory');
  }
}

buildLogos().catch(console.error);
