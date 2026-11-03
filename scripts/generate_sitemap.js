import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://shelhaegypt.com';
const today = new Date().toISOString().split('T')[0];

const sitemapEntries = [
  {
    loc: `${DOMAIN}/`,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0',
    images: [
      {
        loc: `${DOMAIN}/shelha_logo_square.jpg`,
        title: 'شعار شركة شلها لنقل الأثاث والعفش | Shelha Egypt Logo',
        caption: 'لوجو شركة شلها الرسمي المعتمد لنقل وتغليف الأثاث في مصر'
      },
      {
        loc: `${DOMAIN}/assets/aistudio/FB_IMG_1793372096933_b1d91a1d.jpg`,
        title: 'شركة شلها لنقل الأثاث | 01099649897 - 01128418399',
        caption: 'سيارات نقل عفش مغلقة ومجهزة - اتصل الآن 01099649897 أو 01128418399'
      },
      {
        loc: `${DOMAIN}/assets/aistudio/Screenshot_________-_______Chrome_68be8d7e.jpg`,
        title: 'ونش هيدروليكي لرفع وتنزيل الأثاث - شركة شلها لنقل الأثاث | 01099649897',
        caption: 'ونش رفع أثاث هيدروليكي حتى الدور 25 - حجز فوري 01099649897 أو 01128418399'
      }
    ]
  },
  {
    loc: `${DOMAIN}/#calculator-section`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.95',
    images: []
  },
  {
    loc: `${DOMAIN}/#boxes-store`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.95',
    images: [
      {
        loc: `${DOMAIN}/assets/aistudio/FB_IMG_1793372087782_e1c10367.jpg`,
        title: 'متجر بيع وتوصيل كراتين نقل العفش ومستلزمات التغليف',
        caption: 'كراتين 5 طبقات مقواة وشنط مفروشات ورولات بابلز واسترتش'
      }
    ]
  },
  {
    loc: `${DOMAIN}/#winch-section`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.90',
    images: [
      {
        loc: `${DOMAIN}/assets/aistudio/Screenshot_________-_______Chrome_ed32c971.jpg`,
        title: 'أوناش رفع الأثاث الهيدروليكية والكهربائية',
        caption: 'خدمة ونش رفع العفش تبدأ من 1700 ج.م لجميع الأدوار'
      }
    ]
  },
  {
    loc: `${DOMAIN}/#services`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.90',
    images: []
  },
  {
    loc: `${DOMAIN}/#packing-section`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    images: [
      {
        loc: `${DOMAIN}/assets/aistudio/FB_IMG_1793231473308_f92e10a1.jpg`,
        title: 'تغليف احترافي للأثاث والتحف والصيني',
        caption: 'تغليف شامل بكرتون 5 طبقات ونايلون فقاعي ممتص للصدمات'
      }
    ]
  },
  {
    loc: `${DOMAIN}/#case-study-article`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    images: [
      {
        loc: `${DOMAIN}/assets/aistudio/FB_IMG_1793372243785_978ce9bc.jpg`,
        title: 'دراسة حالة: تغليف صالون مذهب كلاسيكي فاخر قبل وبعد',
        caption: 'حماية الأثاث الأنتيك والمذهب بأعلى معايير التغليف'
      }
    ]
  },
  {
    loc: `${DOMAIN}/#moving-tips`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80',
    images: []
  },
  {
    loc: `${DOMAIN}/#areas`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85',
    images: []
  },
  {
    loc: `${DOMAIN}/#gallery`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80',
    images: []
  },
  {
    loc: `${DOMAIN}/#faqs`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.75',
    images: []
  }
];

function generateXml() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const entry of sitemapEntries) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;

    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${img.loc}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(img.title)}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(img.caption)}</image:caption>\n`;
        xml += `    </image:image>\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

const xmlOutput = generateXml();

// Write to public/sitemap.xml
fs.writeFileSync(path.resolve('public/sitemap.xml'), xmlOutput, 'utf8');
console.log('✓ public/sitemap.xml dynamically generated.');

// If dist exists, write to dist/sitemap.xml as well
if (fs.existsSync('dist')) {
  fs.writeFileSync(path.resolve('dist/sitemap.xml'), xmlOutput, 'utf8');
  console.log('✓ dist/sitemap.xml dynamically generated.');
}
