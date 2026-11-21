import fs from 'fs';
import path from 'path';
import { SEO_ARTICLES, PLANNED_SEO_BACKLOG } from '../src/data/seoArticles';
import {
  validateArticleRegistry,
  buildArticleHtml,
  buildArticlesIndexHtml,
  buildSitemapXml,
  buildSeoLogMarkdown,
} from '../src/utils/seoArticles';

const today = new Date().toISOString().split('T')[0];

const validation = validateArticleRegistry(SEO_ARTICLES, PLANNED_SEO_BACKLOG);
if (!validation.valid) {
  console.error('❌ SEO Article Registry validation failed:');
  for (const err of validation.errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

const publicArticlesDir = path.resolve('public/articles');
fs.mkdirSync(publicArticlesDir, { recursive: true });

// 1. Generate /public/articles/index.html
const indexHtml = buildArticlesIndexHtml(SEO_ARTICLES);
fs.writeFileSync(path.join(publicArticlesDir, 'index.html'), indexHtml, 'utf8');

// 2. Generate /public/articles/<slug>/index.html for each registered article
for (const article of SEO_ARTICLES) {
  const dir = path.join(publicArticlesDir, article.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = buildArticleHtml(article, SEO_ARTICLES);
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

// 3. Generate clean sitemap.xml (no #hash fragments)
const sitemapXml = buildSitemapXml(SEO_ARTICLES, today);
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml, 'utf8');
if (fs.existsSync(path.resolve('dist'))) {
  fs.writeFileSync(path.resolve('dist/sitemap.xml'), sitemapXml, 'utf8');
}

// 4. Generate permanent SEO_ARTICLES_LOG.md ledger
const seoLogMd = buildSeoLogMarkdown(SEO_ARTICLES, PLANNED_SEO_BACKLOG);
fs.writeFileSync(path.resolve('SEO_ARTICLES_LOG.md'), seoLogMd, 'utf8');

console.log(`✓ Generated /public/articles/ hub + ${SEO_ARTICLES.length} static SEO article pages.`);
console.log('✓ Generated clean public/sitemap.xml (zero #hash URLs).');
console.log('✓ Updated SEO_ARTICLES_LOG.md permanent anti-duplication ledger.');
