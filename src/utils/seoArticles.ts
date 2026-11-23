import type { SeoArticle, PlannedSeoTopic } from '../data/seoArticles';

export const SITE_DOMAIN = 'https://shelhaegypt.com';
export const PHONE_DISPLAY = '01233391255';
export const WHATSAPP_INTL = '201233391255';
export const ADS_ID = 'AW-18544594401';
export const GA4_ID = 'G-2TFJ7D161W';
export const ADS_CALL_CONVERSION_SEND_TO = 'AW-18544594401/Zg7tCM6j1r0dEOGb4IpF';
export const ADS_CONVERSION_SEND_TO = 'AW-18544594401/Mq04CNmS1LgdEOGb4IpF';

export interface RegistryValidationResult {
  valid: boolean;
  errors: string[];
}

export function normalizeKeyword(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ');
}

export function validateArticleRegistry(
  articles: SeoArticle[],
  backlog: PlannedSeoTopic[] = []
): RegistryValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenKeywords = new Set<string>();
  const seenTitles = new Set<string>();
  const allSlugs = new Set(articles.map((a) => a.slug));

  for (const article of articles) {
    if (!/^[a-z0-9-]+$/.test(article.slug)) {
      errors.push(`Invalid slug format: "${article.slug}"`);
    }
    if (seenIds.has(article.id)) {
      errors.push(`Duplicate article id: "${article.id}"`);
    }
    seenIds.add(article.id);

    if (seenSlugs.has(article.slug)) {
      errors.push(`Duplicate article slug: "${article.slug}"`);
    }
    seenSlugs.add(article.slug);

    const normKw = normalizeKeyword(article.targetKeyword);
    if (seenKeywords.has(normKw)) {
      errors.push(`Duplicate target keyword (cannibalization risk): "${article.targetKeyword}"`);
    }
    seenKeywords.add(normKw);

    const normTitle = normalizeKeyword(article.seoTitle);
    if (seenTitles.has(normTitle)) {
      errors.push(`Duplicate SEO title: "${article.seoTitle}"`);
    }
    seenTitles.add(normTitle);

    if (article.seoTitle.length < 25 || article.seoTitle.length > 72) {
      errors.push(`SEO title length out of bounds (${article.seoTitle.length}): "${article.slug}"`);
    }
    if (article.metaDescription.length < 100 || article.metaDescription.length > 185) {
      errors.push(`Meta description length out of bounds (${article.metaDescription.length}): "${article.slug}"`);
    }
    if (article.sections.length < 2) {
      errors.push(`Article "${article.slug}" needs at least 2 content sections`);
    }
    if (article.faqs.length < 2) {
      errors.push(`Article "${article.slug}" needs at least 2 FAQs for FAQPage Schema`);
    }
    for (const rel of article.relatedSlugs) {
      if (!allSlugs.has(rel) || rel === article.slug) {
        errors.push(`Invalid relatedSlug "${rel}" in article "${article.slug}"`);
      }
    }
  }

  for (const planned of backlog) {
    if (seenSlugs.has(planned.suggestedSlug)) {
      errors.push(`Planned backlog slug already published: "${planned.suggestedSlug}"`);
    }
    const normPlannedKw = normalizeKeyword(planned.targetKeyword);
    if (seenKeywords.has(normPlannedKw)) {
      errors.push(`Planned backlog keyword already published: "${planned.targetKeyword}"`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSharedHeadScripts(): string {
  return `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ADS_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ADS_ID}');
      gtag('config', '${GA4_ID}');
    </script>
    <script>
      function gtag_report_conversion(url) {
        var called = false;
        var callback = function () {
          if (called) return;
          called = true;
          if (typeof(url) != 'undefined') {
            window.location = url;
          }
        };
        gtag('event', 'conversion', {
          'send_to': '${ADS_CALL_CONVERSION_SEND_TO}',
          'value': 1.0,
          'currency': 'EGP',
          'event_callback': callback
        });
        setTimeout(callback, 800);
        return false;
      }
    </script>
    <script>
      document.addEventListener('click', function(event) {
        var link = event.target && event.target.closest ? event.target.closest('a') : null;
        if (!link || !link.href) return;
        var href = link.href.trim();
        var now = Date.now();
        window.__lastGaEventTime = window.__lastGaEventTime || {};
        if (href.indexOf('tel:') === 0) {
          var phoneNumber = href.replace('tel:', '').trim();
          var phoneKey = 'phone_' + phoneNumber;
          if (window.__lastGaEventTime[phoneKey] && (now - window.__lastGaEventTime[phoneKey] < 800)) return;
          window.__lastGaEventTime[phoneKey] = now;
          gtag('event', 'phone_click', { phone_number: phoneNumber, link_url: href, event_category: 'engagement', event_label: phoneNumber });
        } else if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
          var waKey = 'wa_' + href;
          if (window.__lastGaEventTime[waKey] && (now - window.__lastGaEventTime[waKey] < 800)) return;
          window.__lastGaEventTime[waKey] = now;
          gtag('event', 'whatsapp_click', { whatsapp_url: href, link_url: href, event_category: 'engagement', event_label: href });
          gtag('event', 'conversion', { send_to: '${ADS_CONVERSION_SEND_TO}', value: 1.0, currency: 'EGP', event_category: 'lead', event_label: 'WhatsApp' });
        }
      }, { capture: true });
    </script>`;
}

function buildSharedStyles(): string {
  return `    <style>
      :root {
        --bg: #020b18;
        --surface: #04142b;
        --surface-2: #071d3d;
        --border: rgba(59, 130, 246, 0.28);
        --gold: #fbbf24;
        --gold-strong: #f59e0b;
        --sky: #7dd3fc;
        --text: #f1f5f9;
        --muted: #cbd5e1;
        --green: #047857;
        --green-hover: #059669;
        --blue: #1d4ed8;
        --blue-hover: #2563eb;
      }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; background: var(--bg); color: var(--text); font-family: 'Alexandria', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
      body { margin: 0; background: var(--bg); color: var(--text); line-height: 1.85; padding-bottom: 84px; }
      a { color: var(--sky); text-decoration: none; }
      a:hover { text-decoration: underline; }
      .topbar { background: linear-gradient(90deg, #1e40af, #1d4ed8, #1e40af); color: #fff; font-size: 13px; font-weight: 700; padding: 8px 16px; }
      .topbar-inner { max-width: 1080px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
      .topbar a { color: #fff; text-decoration: underline; font-weight: 900; padding: 4px 0; display: inline-block; }
      header.site-header { position: sticky; top: 0; z-index: 40; background: rgba(2, 11, 24, 0.96); border-bottom: 1px solid var(--border); backdrop-filter: blur(12px); }
      .nav-inner { max-width: 1080px; margin: 0 auto; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
      .brand { display: flex; align-items: center; gap: 10px; color: #fff; font-weight: 900; text-decoration: none; }
      .brand:hover { text-decoration: none; }
      .brand img { width: 44px; height: 44px; border-radius: 12px; background: #fff; padding: 2px; border: 2px solid rgba(251, 191, 36, 0.75); object-fit: contain; }
      .brand-title { font-size: 18px; line-height: 1.2; color: #fff; }
      .brand-sub { font-size: 11px; color: var(--gold); letter-spacing: 0.08em; display: block; }
      .nav-links { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
      .nav-links a { color: #e2e8f0; font-size: 14px; font-weight: 700; padding: 6px 10px; border-radius: 10px; }
      .nav-links a:hover { background: rgba(30, 58, 138, 0.45); color: var(--gold); text-decoration: none; }
      .container { max-width: 1080px; margin: 0 auto; padding: 24px 16px 40px; }
      .article-wrap { max-width: 860px; margin: 0 auto; }
      .breadcrumb { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: var(--muted); margin-bottom: 18px; }
      .breadcrumb a { color: var(--sky); padding: 4px 0; }
      .badge { display: inline-block; background: rgba(245, 158, 11, 0.16); border: 1px solid rgba(251, 191, 36, 0.45); color: var(--gold); font-size: 12px; font-weight: 800; padding: 5px 12px; border-radius: 999px; margin-bottom: 12px; }
      h1 { font-size: clamp(26px, 4.5vw, 40px); line-height: 1.35; margin: 0 0 14px; font-weight: 900; color: #fff; }
      .lead { font-size: 17px; color: var(--muted); margin: 0 0 18px; }
      .meta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 13px; color: #cbd5e1; margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
      .hero-figure { margin: 0 0 28px; border-radius: 20px; overflow: hidden; border: 1px solid var(--border); background: #031024; }
      .hero-figure img { width: 100%; height: auto; max-height: 440px; object-fit: cover; display: block; }
      .hero-figure figcaption { padding: 10px 16px; font-size: 13px; color: var(--muted); background: rgba(2, 11, 24, 0.9); }
      .toc { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; padding: 18px 20px; margin-bottom: 28px; }
      .toc-title { font-size: 15px; font-weight: 900; color: var(--gold); margin: 0 0 10px; }
      .toc ol { margin: 0; padding-inline-start: 20px; }
      .toc li { margin: 6px 0; }
      .toc a { color: #e2e8f0; font-size: 14px; font-weight: 700; display: inline-block; padding: 4px 0; }
      .toc a:hover { color: var(--gold); }
      section.article-section { margin-bottom: 30px; }
      h2 { font-size: clamp(20px, 3vw, 26px); color: var(--gold); margin: 0 0 12px; line-height: 1.4; font-weight: 900; }
      h3 { font-size: 18px; color: #fff; margin: 0 0 8px; font-weight: 800; }
      p { margin: 0 0 14px; color: #e2e8f0; font-size: 16px; }
      ul.styled-list { margin: 12px 0 16px; padding-inline-start: 20px; }
      ul.styled-list li { margin-bottom: 8px; color: #e2e8f0; }
      .callout { background: linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(29, 78, 216, 0.18)); border-right: 4px solid var(--gold-strong); border-radius: 14px; padding: 16px 18px; margin: 18px 0; color: #fef3c7; font-weight: 700; font-size: 15px; }
      .cta-box { background: linear-gradient(135deg, #041633, #07204a); border: 2px solid rgba(251, 191, 36, 0.5); border-radius: 22px; padding: 24px 20px; margin: 32px 0; text-align: center; }
      .cta-box h2 { color: #fff; margin-bottom: 8px; }
      .cta-box p { color: var(--muted); max-width: 620px; margin: 0 auto 18px; }
      .cta-actions { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
      .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 22px; border-radius: 14px; font-weight: 900; font-size: 15px; color: #fff; text-decoration: none; min-height: 46px; }
      .btn:hover { text-decoration: none; }
      .btn-wa { background: var(--green); }
      .btn-wa:hover { background: var(--green-hover); }
      .btn-call { background: var(--blue); }
      .btn-call:hover { background: var(--blue-hover); }
      .faq-section { margin: 34px 0; }
      details.faq-item { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 14px 18px; margin-bottom: 10px; }
      details.faq-item summary { cursor: pointer; font-weight: 800; color: #fff; font-size: 16px; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 28px; }
      details.faq-item summary::-webkit-details-marker { display: none; }
      details.faq-item summary::after { content: '+'; color: var(--gold); font-size: 20px; font-weight: 900; flex-shrink: 0; }
      details.faq-item[open] summary::after { content: '−'; }
      details.faq-item p { margin: 12px 0 0; color: var(--muted); font-size: 15px; }
      .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 18px; margin-top: 16px; }
      .card { background: var(--surface); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: border-color 0.2s ease, transform 0.2s ease; }
      .card:hover { border-color: rgba(251, 191, 36, 0.7); transform: translateY(-2px); }
      .card img { width: 100%; height: 185px; object-fit: cover; display: block; background: #031024; }
      .card-body { padding: 16px; display: flex; flex-direction: column; flex: 1; gap: 8px; }
      .card-cat { font-size: 12px; font-weight: 800; color: var(--gold); }
      .card h2, .card h3 { font-size: 17px; line-height: 1.45; margin: 0; color: #fff; }
      .card p { font-size: 14px; color: var(--muted); margin: 0; flex: 1; }
      .card-link { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 800; color: var(--gold); padding: 6px 0; }
      footer.site-footer { border-top: 1px solid var(--border); background: #010714; padding: 28px 16px; margin-top: 40px; text-align: center; color: var(--muted); font-size: 13px; }
      .sticky-mobile-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background: rgba(2, 11, 24, 0.96); border-top: 1px solid var(--border); padding: 10px 12px; display: flex; gap: 10px; justify-content: center; backdrop-filter: blur(10px); }
      .sticky-mobile-cta a { flex: 1; max-width: 240px; }
      @media (min-width: 768px) {
        .sticky-mobile-cta { padding: 10px 24px; }
      }
    </style>`;
}

function buildHeaderHtml(): string {
  return `    <div class="topbar">
      <div class="topbar-inner">
        <span>متاحون 24 ساعة طوال الأسبوع — تغليف أوروبي 5 طبقات وأوناش هيدروليكية</span>
        <span>الخط الساخن الموحد: <a href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');" dir="ltr">${PHONE_DISPLAY}</a></span>
      </div>
    </div>
    <header class="site-header">
      <div class="nav-inner">
        <a href="/" class="brand">
          <img src="/assets/logos/royal_movers_logo_sm.webp" alt="شعار رويال موفرز VIP" width="44" height="44" />
          <span>
            <span class="brand-title">رويال موفرز VIP</span>
            <span class="brand-sub" dir="ltr">ROYAL MOVERS VIP</span>
          </span>
        </a>
        <nav aria-label="التنقل الرئيسي" class="nav-links">
          <a href="/">الصفحة الرئيسية</a>
          <a href="/articles/">مقالات وأدلة النقل</a>
          <a href="/#interactive-services">الخدمات</a>
          <a href="/#quick-contact">حجز معاينة مجانية</a>
        </nav>
      </div>
    </header>`;
}

function buildStickyCtaHtml(waUrl: string): string {
  return `    <div class="sticky-mobile-cta" role="region" aria-label="التواصل السريع">
      <a class="btn btn-wa" href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer">احجز عبر واتساب</a>
      <a class="btn btn-call" href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');">اتصل الآن: <span dir="ltr">${PHONE_DISPLAY}</span></a>
    </div>`;
}

export function buildArticleHtml(article: SeoArticle, allArticles: SeoArticle[]): string {
  const canonicalUrl = `${SITE_DOMAIN}/articles/${article.slug}/`;
  const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(article.whatsappPrefill)}`;
  const fullImageUrl = `${SITE_DOMAIN}${article.heroImage}`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: article.h1,
        description: article.metaDescription,
        image: fullImageUrl,
        datePublished: article.publishDate,
        dateModified: article.updatedDate,
        inLanguage: 'ar-EG',
        keywords: [article.targetKeyword, ...article.secondaryKeywords].join(', '),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: {
          '@type': 'Organization',
          name: 'رويال موفرز VIP لنقل وتغليف الأثاث',
          url: `${SITE_DOMAIN}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'رويال موفرز VIP لنقل وتغليف الأثاث',
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_DOMAIN}/assets/logos/royal_movers_logo.jpg`,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'مقالات وأدلة النقل', item: `${SITE_DOMAIN}/articles/` },
          { '@type': 'ListItem', position: 3, name: article.h1, item: canonicalUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const tocHtml = article.sections
    .map(
      (sec, idx) =>
        `          <li><a href="#sec-${idx + 1}">${escapeHtml(sec.heading)}</a></li>`
    )
    .join('\n');

  const sectionsHtml = article.sections
    .map((sec, idx) => {
      const paras = sec.paragraphs.map((p) => `          <p>${escapeHtml(p)}</p>`).join('\n');
      const bullets =
        sec.bullets && sec.bullets.length > 0
          ? `          <ul class="styled-list">\n${sec.bullets
              .map((b) => `            <li>${escapeHtml(b)}</li>`)
              .join('\n')}\n          </ul>`
          : '';
      const callout = sec.callout
        ? `          <aside class="callout">${escapeHtml(sec.callout)}</aside>`
        : '';
      return `        <section id="sec-${idx + 1}" class="article-section">
          <h2>${escapeHtml(sec.heading)}</h2>
${paras}
${bullets}
${callout}
        </section>`;
    })
    .join('\n');

  const faqsHtml = article.faqs
    .map(
      (faq, idx) => `        <details class="faq-item"${idx === 0 ? ' open' : ''}>
          <summary>${escapeHtml(faq.question)}</summary>
          <p>${escapeHtml(faq.answer)}</p>
        </details>`
    )
    .join('\n');

  const relatedArticles = article.relatedSlugs
    .map((slug) => allArticles.find((a) => a.slug === slug))
    .filter((a): a is SeoArticle => Boolean(a));

  const relatedHtml = relatedArticles
    .map(
      (rel) => `          <article class="card">
            <img src="${escapeHtml(rel.heroImage)}" alt="${escapeHtml(rel.heroImageAlt)}" width="400" height="220" loading="lazy" decoding="async" />
            <div class="card-body">
              <span class="card-cat">${escapeHtml(rel.category)}</span>
              <h3><a href="/articles/${escapeHtml(rel.slug)}/" style="color:#fff">${escapeHtml(rel.h1)}</a></h3>
              <p>${escapeHtml(rel.excerpt)}</p>
              <a class="card-link" href="/articles/${escapeHtml(rel.slug)}/">اقرأ المقال كاملاً ←</a>
            </div>
          </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${buildSharedHeadScripts()}
    <title>${escapeHtml(article.seoTitle)}</title>
    <meta name="description" content="${escapeHtml(article.metaDescription)}" />
    <meta name="keywords" content="${escapeHtml([article.targetKeyword, ...article.secondaryKeywords].join(', '))}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(article.seoTitle)}" />
    <meta property="og:description" content="${escapeHtml(article.metaDescription)}" />
    <meta property="og:site_name" content="رويال موفرز VIP | Royal Movers Egypt" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:image" content="${fullImageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.seoTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(article.metaDescription)}" />
    <meta name="twitter:image" content="${fullImageUrl}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700;800;900&display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700;800;900&display=swap" /></noscript>
    <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
${buildSharedStyles()}
  </head>
  <body>
${buildHeaderHtml()}
    <main class="container">
      <article class="article-wrap">
        <nav aria-label="مسار الصفحة" class="breadcrumb">
          <a href="/">الرئيسية</a>
          <span aria-hidden="true">/</span>
          <a href="/articles/">مقالات وأدلة النقل</a>
          <span aria-hidden="true">/</span>
          <span>${escapeHtml(article.category)}</span>
        </nav>

        <span class="badge">${escapeHtml(article.category)}</span>
        <h1>${escapeHtml(article.h1)}</h1>
        <p class="lead">${escapeHtml(article.excerpt)}</p>

        <div class="meta-row">
          <span>بواسطة: <strong>فريق خبراء رويال موفرز VIP</strong></span>
          <span>آخر تحديث: <time datetime="${article.updatedDate}">${article.updatedDate}</time></span>
          <span>مدة القراءة: ${article.readTimeMinutes} دقائق</span>
        </div>

        <figure class="hero-figure">
          <img src="${escapeHtml(article.heroImage)}" alt="${escapeHtml(article.heroImageAlt)}" width="800" height="520" fetchpriority="high" />
          <figcaption>${escapeHtml(article.heroImageAlt)}</figcaption>
        </figure>

        <aside class="toc" aria-label="فهرس المقال">
          <p class="toc-title">محتويات هذا الدليل:</p>
          <ol>
${tocHtml}
            <li><a href="#article-faq">الأسئلة الشائعة</a></li>
          </ol>
        </aside>

${sectionsHtml}

        <div class="cta-box">
          <h2>جاهز تنتقل بدون أي تعب أو خدش؟</h2>
          <p>تواصل الآن مع فريق رويال موفرز VIP للحصول على معاينة مجانية وعرض سعر ثابت شامل التغليف الأوروبي 5 طبقات والفك والتركيب.</p>
          <div class="cta-actions">
            <a class="btn btn-wa" href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer">احجز معاينة عبر واتساب</a>
            <a class="btn btn-call" href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');">اتصال فوري: <span dir="ltr">${PHONE_DISPLAY}</span></a>
          </div>
        </div>

        <section id="article-faq" class="faq-section">
          <h2>الأسئلة الشائعة حول ${escapeHtml(article.targetKeyword)}</h2>
${faqsHtml}
        </section>

        <section aria-label="مقالات ذات صلة">
          <h2>مقالات وأدلة أخرى تهمك</h2>
          <div class="cards-grid">
${relatedHtml}
          </div>
        </section>
      </article>
    </main>

    <footer class="site-footer">
      <p>© ${new Date().getFullYear()} شركة رويال موفرز لنقل وتغليف الأثاث في القاهرة والجيزة — الخط الساخن: <a href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');" dir="ltr">${PHONE_DISPLAY}</a></p>
      <p><a href="/">العودة إلى الصفحة الرئيسية</a> · <a href="/articles/">تصفح جميع المقالات</a></p>
    </footer>
${buildStickyCtaHtml(waUrl)}
  </body>
</html>
`;
}

export function buildArticlesIndexHtml(articles: SeoArticle[]): string {
  const canonicalUrl = `${SITE_DOMAIN}/articles/`;
  const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(
    'السلام عليكم، أرغب في الاستفسار عن خدمات وأسعار نقل وتغليف الأثاث مع رويال موفرز VIP'
  )}`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collection`,
        url: canonicalUrl,
        name: 'مقالات وأدلة نقل وتغليف الأثاث في مصر | رويال موفرز VIP',
        description:
          'أدلة عملية ومقالات متخصصة من خبراء رويال موفرز VIP عن أسعار نقل العفش والونش الهيدروليكي، تصاريح الكمبوندات، والتغليف الأوروبي 5 طبقات في القاهرة والجيزة.',
        inLanguage: 'ar-EG',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: articles.map((a, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `${SITE_DOMAIN}/articles/${a.slug}/`,
            name: a.h1,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE_DOMAIN}/` },
          { '@type': 'ListItem', position: 2, name: 'مقالات وأدلة النقل', item: canonicalUrl },
        ],
      },
    ],
  };

  const cardsHtml = articles
    .map(
      (article) => `        <article class="card">
          <img src="${escapeHtml(article.heroImage)}" alt="${escapeHtml(article.heroImageAlt)}" width="400" height="220" loading="lazy" decoding="async" />
          <div class="card-body">
            <span class="card-cat">${escapeHtml(article.category)} · ${article.readTimeMinutes} دقائق</span>
            <h2><a href="/articles/${escapeHtml(article.slug)}/" style="color:#fff">${escapeHtml(article.h1)}</a></h2>
            <p>${escapeHtml(article.excerpt)}</p>
            <a class="card-link" href="/articles/${escapeHtml(article.slug)}/">اقرأ الدليل كاملاً ←</a>
          </div>
        </article>`
    )
    .join('\n');

  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${buildSharedHeadScripts()}
    <title>مقالات وأدلة نقل وتغليف الأثاث في مصر | رويال موفرز VIP</title>
    <meta name="description" content="موسوعة مقالات وأدلة عملية من رويال موفرز VIP عن أسعار نقل العفش والونش الهيدروليكي 2026، تصاريح كمبوندات التجمع وزايد ومدينتي، والتغليف الأوروبي 5 طبقات." />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="مقالات وأدلة نقل وتغليف الأثاث في مصر | رويال موفرز VIP" />
    <meta property="og:description" content="أدلة عملية عن أسعار نقل العفش والونش الهيدروليكي، تصاريح الكمبوندات، والتغليف الأوروبي 5 طبقات." />
    <meta property="og:image" content="${SITE_DOMAIN}/assets/logos/royal_movers_logo.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700;800;900&display=swap" media="print" onload="this.media='all'" />
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;700;800;900&display=swap" /></noscript>
    <script type="application/ld+json">${JSON.stringify(schemaGraph)}</script>
${buildSharedStyles()}
  </head>
  <body>
${buildHeaderHtml()}
    <main class="container">
      <nav aria-label="مسار الصفحة" class="breadcrumb">
        <a href="/">الرئيسية</a>
        <span aria-hidden="true">/</span>
        <span>مقالات وأدلة النقل</span>
      </nav>

      <span class="badge">موسوعة رويال موفرز VIP للأرشفة والإرشاد 👑</span>
      <h1>مقالات وأدلة نقل وتغليف الأثاث في مصر</h1>
      <p class="lead">أدلة عملية حقيقية كتبها خبراء رويال موفرز VIP لمساعدة العائلات وسكان الكمبوندات على الانتقال بأمان تام، معرفة الأسعار العادلة، وتجنب أخطاء الفك والتغليف.</p>

      <div class="cards-grid">
${cardsHtml}
      </div>

      <div class="cta-box">
        <h2>محتاج عرض سعر دقيق لشقتك أو فيلتك؟</h2>
        <p>تواصل معنا مباشرة على واتساب أو الخط الساخن الموحد 24 ساعة لتحصل على خطة نقل وتغليف متكاملة بسعر ثابت.</p>
        <div class="cta-actions">
          <a class="btn btn-wa" href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer">احجز معاينة مجانية عبر واتساب</a>
          <a class="btn btn-call" href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');">اتصل الآن: <span dir="ltr">${PHONE_DISPLAY}</span></a>
        </div>
      </div>
    </main>

    <footer class="site-footer">
      <p>© ${new Date().getFullYear()} شركة رويال موفرز VIP لنقل وتغليف الأثاث بمصر — الخط الساخن: <a href="tel:${PHONE_DISPLAY}" onclick="return gtag_report_conversion('tel:${PHONE_DISPLAY}');" dir="ltr">${PHONE_DISPLAY}</a></p>
      <p><a href="/">العودة إلى الصفحة الرئيسية</a></p>
    </footer>
${buildStickyCtaHtml(waUrl)}
  </body>
</html>
`;
}

export function buildSitemapXml(articles: SeoArticle[], todayIso: string): string {
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    '  <url>',
    `    <loc>${SITE_DOMAIN}/</loc>`,
    `    <lastmod>${todayIso}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>1.0</priority>',
    '    <image:image>',
    `      <image:loc>${SITE_DOMAIN}/assets/logos/royal_movers_logo.jpg</image:loc>`,
    `      <image:title>${escapeXml('شعار رويال موفرز VIP لنقل وتغليف الأثاث في مصر')}</image:title>`,
    '    </image:image>',
    '    <image:image>',
    `      <image:loc>${SITE_DOMAIN}/assets/images/royal_delicate_packing.webp</image:loc>`,
    `      <image:title>${escapeXml('تغليف فندقي VIP للتحف والنجف والصالونات - رويال موفرز 01233391255')}</image:title>`,
    '    </image:image>',
    '  </url>',
    '  <url>',
    `    <loc>${SITE_DOMAIN}/articles/</loc>`,
    `    <lastmod>${todayIso}</lastmod>`,
    '    <changefreq>weekly</changefreq>',
    '    <priority>0.9</priority>',
    '  </url>',
  ];

  for (const article of articles) {
    lines.push('  <url>');
    lines.push(`    <loc>${SITE_DOMAIN}/articles/${article.slug}/</loc>`);
    lines.push(`    <lastmod>${article.updatedDate}</lastmod>`);
    lines.push('    <changefreq>monthly</changefreq>');
    lines.push('    <priority>0.85</priority>');
    lines.push('    <image:image>');
    lines.push(`      <image:loc>${SITE_DOMAIN}${article.heroImage}</image:loc>`);
    lines.push(`      <image:title>${escapeXml(article.h1)}</image:title>`);
    lines.push('    </image:image>');
    lines.push('  </url>');
  }

  lines.push('</urlset>');
  return `${lines.join('\n')}\n`;
}

export function buildSeoLogMarkdown(
  articles: SeoArticle[],
  backlog: PlannedSeoTopic[]
): string {
  const publishedRows = articles
    .map(
      (a) =>
        `| ${a.id} | الدفعة ${a.batch} | \`${a.slug}\` | ${a.targetKeyword} | ${a.publishDate} | ${SITE_DOMAIN}/articles/${a.slug}/ |`
    )
    .join('\n');

  const backlogRows = backlog
    .map(
      (b, i) =>
        `| ${i + 1} | \`${b.suggestedSlug}\` | ${b.targetKeyword} | ${b.topicAr} | ${b.priority === 'high' ? 'عالية' : 'متوسطة'} |`
    )
    .join('\n');

  return `# سجل مقالات الأرشفة الدائم — رويال موفرز VIP (shelhaegypt.com)

> **قاعدة منع التكرار (Anti-Cannibalization):** ممنوع نشر مقالتين بنفس الرابط (\`slug\`) أو نفس الكلمة المفتاحية الرئيسية. يتم فحص هذا السجل تلقائياً في كل عملية بناء عبر \`validateArticleRegistry\`.

## 1. المقالات المنشورة حالياً (${articles.length} مقالات)

| الكود | الدفعة | الرابط (Slug) | الكلمة المفتاحية الرئيسية | تاريخ النشر | الرابط المباشر |
|---|---|---|---|---|---|
${publishedRows}

## 2. خطة المقالات القادمة (غير مكررة — الدفعات القادمة)

| # | الرابط المقترح | الكلمة المفتاحية المستهدفة | الموضوع | الأولوية |
|---|---|---|---|---|
${backlogRows}

## 3. جدول النشر والتحديث الموصى به
- **الدفعة التأسيسية (الدفعة 1):** 8 مقالات أساسية + إرسال \`https://shelhaegypt.com/sitemap.xml\` إلى Google Search Console.
- **الاستمرارية:** نشر **2 مقالة جديدة كل أسبوع** (أو 4–8 مقالات شهرياً) من القائمة القادمة بدون تكرار أي كلمة مفتاحية.
- **التحديث الدوري:** كل 3–6 شهور يتم تحديث الأسعار والتفاصيل داخل نفس المقالات المنشورة مع تحديث \`updatedDate\` بدلاً من إنشاء مقالات مكررة.
`;
}
