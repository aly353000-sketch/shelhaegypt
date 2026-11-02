import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 1. High Resolution Square Logo SVG (1024x1024)
const squareSvg = `
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>

    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="40%" stop-color="#09204a"/>
      <stop offset="100%" stop-color="#0369a1"/>
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

    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <filter id="subtleDrop" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#09204a" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Clean Background -->
  <rect width="1024" height="1024" rx="40" fill="url(#bgGrad)"/>
  
  <!-- Outer Subtle Geometric Ring -->
  <circle cx="512" cy="512" r="460" fill="none" stroke="#e2e8f0" stroke-width="3" stroke-dasharray="12 12"/>
  <circle cx="512" cy="512" r="440" fill="none" stroke="#0284c7" stroke-width="1.5" opacity="0.4"/>

  <!-- Main Center Shield / Emblem -->
  <g filter="url(#subtleDrop)">
    <!-- Base Hexagonal Shield -->
    <path d="M512 120 L780 230 L780 500 C780 680 660 820 512 870 C364 820 244 680 244 500 L244 230 Z" 
          fill="#ffffff" stroke="#e2e8f0" stroke-width="8"/>
    
    <!-- Inner Dynamic Shield Border -->
    <path d="M512 150 L750 250 L750 490 C750 650 644 778 512 826 C380 778 274 650 274 490 L274 250 Z" 
          fill="none" stroke="url(#skyGrad)" stroke-width="4" opacity="0.6"/>

    <!-- Central Moving Truck + Hydraulic Crane Graphic -->
    <g transform="translate(512, 400)">
      <!-- Ground Line -->
      <path d="M-190 85 L190 85" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
      <path d="M-130 98 L130 98" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round"/>

      <!-- Truck Body (Closed Moving Vehicle) -->
      <path d="M-160 -40 L-10 -40 L-10 70 L-160 70 Z" fill="url(#navyGrad)" rx="10"/>
      <!-- Cargo Stripes -->
      <path d="M-140 -20 L-30 -20" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
      <path d="M-140 5 L-50 5" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
      <path d="M-140 30 L-70 30" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round"/>

      <!-- Truck Cabin -->
      <path d="M-10 -15 L40 -15 L80 20 L80 70 L-10 70 Z" fill="url(#skyGrad)"/>
      <!-- Cabin Windshield -->
      <path d="M0 -3 L32 -3 L62 24 L0 24 Z" fill="#ffffff" opacity="0.85"/>
      <!-- Headlight -->
      <circle cx="75" cy="45" r="5" fill="url(#goldGrad)"/>

      <!-- Truck Wheels -->
      <circle cx="-115" cy="72" r="26" fill="#0f172a" stroke="#ffffff" stroke-width="6"/>
      <circle cx="-115" cy="72" r="11" fill="url(#skyGrad)"/>

      <circle cx="45" cy="72" r="26" fill="#0f172a" stroke="#ffffff" stroke-width="6"/>
      <circle cx="45" cy="72" r="11" fill="url(#skyGrad)"/>

      <!-- Hydraulic Crane Ladder Extending Upward to the Right -->
      <path d="M-70 -35 L120 -180" stroke="url(#goldGrad)" stroke-width="12" stroke-linecap="round"/>
      <path d="M-55 -45 L135 -190" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" stroke-dasharray="14 10"/>

      <!-- Lift Platform with Moving Box -->
      <g transform="translate(130, -200)">
        <!-- Moving Package Box with Ribbon -->
        <rect x="-35" y="-35" width="70" height="70" rx="8" fill="url(#navyGrad)" stroke="#ffffff" stroke-width="4"/>
        <path d="M0 -35 L0 35" stroke="url(#goldGrad)" stroke-width="8"/>
        <path d="M-35 0 L35 0" stroke="url(#goldGrad)" stroke-width="8"/>
        <!-- Star on Box -->
        <circle cx="0" cy="0" r="8" fill="#ffffff"/>
      </g>
    </g>

    <!-- Stylized Arabic Brand Typography "شِلها" -->
    <g transform="translate(512, 600)">
      <text x="0" y="0" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
            font-size="112" font-weight="900" fill="url(#navyGrad)" letter-spacing="-1">
        شِلــهـا
      </text>
      <!-- Sub-headline in Arabic -->
      <text x="0" y="44" text-anchor="middle" font-family="'Alexandria', 'Cairo', 'Segoe UI', sans-serif" 
            font-size="28" font-weight="800" fill="#0284c7" letter-spacing="1">
        لنقل وتغليف الأثاث • ونش هيدروليكي
      </text>
      <!-- English Identity -->
      <text x="0" y="80" text-anchor="middle" font-family="'Montserrat', 'Arial', sans-serif" 
            font-size="20" font-weight="900" fill="#475569" letter-spacing="6">
        SHELHA EGYPT
      </text>
    </g>

    <!-- Trust Stars at Bottom of Shield -->
    <g transform="translate(512, 735)">
      <polygon points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5" fill="url(#goldGrad)"/>
      <polygon points="-40,-13 -36,-3 -26,-3 -33,4 -31,13 -40,7 -49,13 -47,4 -54,-3 -44,-3" fill="url(#goldGrad)"/>
      <polygon points="40,-13 44,-3 54,-3 47,4 49,13 40,7 31,13 33,4 26,-3 36,-3" fill="url(#goldGrad)"/>
      <polygon points="-80,-11 -77,-2 -68,-2 -74,4 -72,12 -80,7 -88,12 -86,4 -92,-2 -83,-2" fill="url(#goldGrad)"/>
      <polygon points="80,-11 83,-2 92,-2 86,4 88,12 80,7 72,12 74,4 68,-2 77,-2" fill="url(#goldGrad)"/>
    </g>
  </g>
</svg>
`;

// 2. Landscape Banner Logo SVG (1200x628) for Google Ads
const landscapeSvg = `
<svg width="1200" height="628" viewBox="0 0 1200 628" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="landBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>

    <linearGradient id="navyL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#09204a"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>

    <linearGradient id="goldL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <filter id="shadowL" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#09204a" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="1200" height="628" fill="url(#landBg)"/>

  <!-- Left Accent Graphic -->
  <path d="M0 0 L240 0 L140 628 L0 628 Z" fill="#0369a1" opacity="0.08"/>
  <path d="M1200 0 L1080 0 L1180 628 L1200 628 Z" fill="#f59e0b" opacity="0.12"/>

  <!-- Central Layout -->
  <g transform="translate(180, 160)" filter="url(#shadowL)">
    <!-- Moving Truck Emblem -->
    <rect x="0" y="0" width="300" height="300" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="4"/>
    
    <!-- Mini Truck + Crane -->
    <g transform="translate(150, 150) scale(0.8)">
      <path d="M-100 50 L100 50" stroke="#cbd5e1" stroke-width="8" stroke-linecap="round"/>
      <path d="M-90 -20 L0 -20 L0 45 L-90 45 Z" fill="url(#navyL)" rx="8"/>
      <path d="M0 -5 L40 -5 L65 20 L65 45 L0 45 Z" fill="#0284c7"/>
      <circle cx="-60" cy="46" r="18" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>
      <circle cx="35" cy="46" r="18" fill="#0f172a" stroke="#ffffff" stroke-width="4"/>
      <!-- Crane -->
      <path d="M-40 -15 L80 -100" stroke="url(#goldL)" stroke-width="9" stroke-linecap="round"/>
      <rect x="70" y="-120" width="40" height="40" rx="6" fill="url(#navyL)" stroke="#ffffff" stroke-width="3"/>
    </g>
  </g>

  <!-- Typography Right Column -->
  <g transform="translate(540, 220)">
    <!-- Main Arabic Brand -->
    <text x="0" y="60" font-family="'Alexandria', 'Cairo', sans-serif" font-size="96" font-weight="900" fill="url(#navyL)">
      شِلـــهـا
    </text>
    <!-- Subtitle Arabic -->
    <text x="0" y="125" font-family="'Alexandria', 'Cairo', sans-serif" font-size="36" font-weight="800" fill="#0284c7">
      لنقل وتغليف الأثاث • ونش هيدروليكي
    </text>
    <!-- English Subtitle & Badge -->
    <text x="0" y="175" font-family="'Montserrat', sans-serif" font-size="22" font-weight="900" fill="#64748b" letter-spacing="4">
      SHELHA EGYPT • 24/7 MOVING &amp; PACKING
    </text>

    <!-- Badges Row -->
    <g transform="translate(0, 205)">
      <rect x="0" y="0" width="160" height="38" rx="19" fill="#0284c7" opacity="0.12"/>
      <text x="80" y="24" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#0369a1">
        ⭐ أوناش حتى الدور 25
      </text>

      <rect x="180" y="0" width="170" height="38" rx="19" fill="#10b981" opacity="0.12"/>
      <text x="265" y="24" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#047857">
        ✓ خصم 10% فوري
      </text>

      <rect x="370" y="0" width="180" height="38" rx="19" fill="#f59e0b" opacity="0.14"/>
      <text x="460" y="24" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b45309">
        📦 كراتين 5 طبقات
      </text>
    </g>
  </g>
</svg>
`;

async function buildLogos() {
  console.log('Rendering high resolution logos with sharp...');
  
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

  // Copy to dist if dist exists
  if (fs.existsSync('dist')) {
    fs.copyFileSync('public/shelha_logo_hd.png', 'dist/shelha_logo_hd.png');
    fs.copyFileSync('public/shelha_logo_square.jpg', 'dist/shelha_logo_square.jpg');
    fs.copyFileSync('public/shelha_logo_landscape.jpg', 'dist/shelha_logo_landscape.jpg');
    console.log('✓ Copied logos to dist directory');
  }
}

buildLogos().catch(console.error);
