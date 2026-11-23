import test from 'node:test';
import assert from 'node:assert/strict';
import { SEO_ARTICLES, PLANNED_SEO_BACKLOG } from '../data/seoArticles';
import {
  validateArticleRegistry,
  buildArticleHtml,
  buildArticlesIndexHtml,
  buildSitemapXml,
  buildSeoLogMarkdown,
  SITE_DOMAIN,
  ADS_CONVERSION_SEND_TO,
} from './seoArticles';

test('Batch 1 & Batch 2 SEO articles registry passes anti-duplication & SEO checks', () => {
  assert.equal(SEO_ARTICLES.length, 12);
  const res = validateArticleRegistry(SEO_ARTICLES, PLANNED_SEO_BACKLOG);
  assert.equal(res.valid, true, `Validation errors: ${res.errors.join('; ')}`);
});

test('validateArticleRegistry rejects duplicate slugs and duplicate primary keywords', () => {
  const dupSlugList = [SEO_ARTICLES[0], { ...SEO_ARTICLES[1], slug: SEO_ARTICLES[0].slug }];
  const resSlug = validateArticleRegistry(dupSlugList);
  assert.equal(resSlug.valid, false);
  assert.ok(resSlug.errors.some((e) => e.includes('Duplicate article slug')));

  const dupKwList = [
    SEO_ARTICLES[0],
    { ...SEO_ARTICLES[1], targetKeyword: SEO_ARTICLES[0].targetKeyword },
  ];
  const resKw = validateArticleRegistry(dupKwList);
  assert.equal(resKw.valid, false);
  assert.ok(resKw.errors.some((e) => e.includes('Duplicate target keyword')));
});

test('Generated article HTML contains canonical, valid JSON-LD schemas, correct WhatsApp, and Google Ads tracking', () => {
  const article = SEO_ARTICLES[0];
  const html = buildArticleHtml(article, SEO_ARTICLES);

  assert.ok(html.includes(`<link rel="canonical" href="${SITE_DOMAIN}/articles/${article.slug}/" />`));
  assert.ok(html.includes('wa.me/201233391255?text='));
  assert.ok(!html.includes('wa.me/2001233391255'));
  assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id=AW-18544594401'));
  assert.ok(html.includes('function gtag_report_conversion(url)'));
  assert.ok(html.includes('AW-18544594401/Zg7tCM6j1r0dEOGb4IpF'));
  assert.ok(html.includes(ADS_CONVERSION_SEND_TO));

  const telMatches = html.match(/<a[^>]*href="tel:01233391255"[^>]*>/g) || [];
  assert.ok(telMatches.length >= 4, 'Expected at least 4 tel: links in article HTML');
  for (const tag of telMatches) {
    assert.ok(
      tag.includes(`onclick="return gtag_report_conversion('tel:01233391255');"`),
      `Missing gtag_report_conversion onclick on: ${tag}`
    );
  }

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(jsonLdMatch, 'JSON-LD script tag must exist');
  const parsed = JSON.parse(jsonLdMatch[1]);
  const types = parsed['@graph'].map((n: { '@type': string }) => n['@type']);
  assert.deepEqual(types, ['Article', 'BreadcrumbList', 'FAQPage']);
});

test('Generated articles index HTML links to all 8 published articles', () => {
  const html = buildArticlesIndexHtml(SEO_ARTICLES);
  assert.ok(html.includes(`<link rel="canonical" href="${SITE_DOMAIN}/articles/" />`));
  assert.ok(html.includes('https://www.googletagmanager.com/gtag/js?id=AW-18544594401'));
  assert.ok(html.includes('function gtag_report_conversion(url)'));
  const telMatches = html.match(/<a[^>]*href="tel:01233391255"[^>]*>/g) || [];
  assert.ok(telMatches.length >= 4, 'Expected at least 4 tel: links in articles index HTML');
  for (const tag of telMatches) {
    assert.ok(
      tag.includes(`onclick="return gtag_report_conversion('tel:01233391255');"`),
      `Missing gtag_report_conversion onclick on: ${tag}`
    );
  }
  for (const article of SEO_ARTICLES) {
    assert.ok(html.includes(`/articles/${article.slug}/`), `Missing link to ${article.slug}`);
  }
});

test('Generated sitemap.xml has zero hash fragments and lists homepage, hub, and all 8 articles', () => {
  const xml = buildSitemapXml(SEO_ARTICLES, '2026-11-20');
  assert.ok(!xml.includes('#'), 'Sitemap must not contain #hash fragment URLs');
  assert.ok(!xml.includes('Screenshot_'), 'Sitemap must not expose private screenshots');
  assert.ok(xml.includes(`<loc>${SITE_DOMAIN}/</loc>`));
  assert.ok(xml.includes(`<loc>${SITE_DOMAIN}/articles/</loc>`));
  for (const article of SEO_ARTICLES) {
    assert.ok(xml.includes(`<loc>${SITE_DOMAIN}/articles/${article.slug}/</loc>`));
  }
});

test('SEO ledger markdown tracks every published article and planned topic', () => {
  const md = buildSeoLogMarkdown(SEO_ARTICLES, PLANNED_SEO_BACKLOG);
  for (const article of SEO_ARTICLES) {
    assert.ok(md.includes(article.slug));
    assert.ok(md.includes(article.targetKeyword));
  }
  assert.ok(md.includes(PLANNED_SEO_BACKLOG[0].suggestedSlug));
});
