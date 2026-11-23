import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

function serveStaticArticlesPlugin(): Plugin {
  const rewriteArticles = (req: { url?: string }, res: { statusCode?: number; setHeader: (k: string, v: string) => void; end: (b: string | Buffer) => void }, next: () => void, rootDir: string) => {
    const cleanUrl = (req.url || '').split('?')[0];
    if (cleanUrl === '/articles' || cleanUrl.startsWith('/articles/')) {
      const normalized = cleanUrl.endsWith('/') ? `${cleanUrl}index.html` : `${cleanUrl}/index.html`;
      const targetPath = path.resolve(rootDir, normalized.replace(/^\//, ''));
      if (fs.existsSync(targetPath) && fs.statSync(targetPath).isFile()) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(targetPath, 'utf8'));
        return;
      }
    }
    next();
  };

  return {
    name: 'serve-static-articles',
    configureServer(server) {
      server.middlewares.use((req, res, next) =>
        rewriteArticles(req, res, next, path.resolve(__dirname, 'public'))
      );
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) =>
        rewriteArticles(req, res, next, path.resolve(__dirname, 'dist'))
      );
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [serveStaticArticlesPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/motion/')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react/')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
    },
  };
});
