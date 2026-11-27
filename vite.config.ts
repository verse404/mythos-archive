import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Security headers applied to local dev and preview servers.
// TODO(security): For standalone production hosting (e.g., Nginx/Cloudflare/Cloud Run),
// serve pre-compiled static bundles with a strict nonce- or hash-based script-src CSP.
// Notice `vite preview` serves pre-built external module bundles cleanly under `script-src 'self'`.
const previewSecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self';",
};

const devSecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  // TODO(security): Vite dev server injects inline React Fast Refresh preamble in dev mode only;
  // production `vite preview` enforces strict `script-src 'self'` without unsafe-inline.
  'Content-Security-Policy':
    "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self';",
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
          if (id.includes('/src/data/ascensionGame')) {
            return 'mythos-quests';
          }
          if (id.includes('/src/data/')) {
            return 'mythos-data';
          }
          if (id.includes('/src/i18n/zh/zhAscension')) {
            return 'zh-quests';
          }
          if (id.includes('/src/i18n/zh/')) {
            return 'zh-catalog';
          }
          if (id.includes('/src/bestiary/bestiaryCampaigns')) {
            return 'bestiary-quests';
          }
          if (id.includes('/src/bestiary/bestiaryMonstersZh')) {
            return 'bestiary-monsters-zh';
          }
          if (id.includes('/src/bestiary/bestiaryMonsters')) {
            return 'bestiary-monsters-en';
          }
          if (id.includes('/src/bestiary/') && !id.includes('bestiaryUiStrings')) {
            return 'bestiary-catalog';
          }
        },
      },
    },
  },
  server: {
    // Bound strictly to loopback 127.0.0.1 (never 0.0.0.0)
    host: '127.0.0.1',
    port: 5179,
    strictPort: true,
    hmr: false,
    allowedHosts: true,
    headers: devSecurityHeaders,
  },
  preview: {
    // Bound strictly to loopback 127.0.0.1 (never 0.0.0.0)
    host: '127.0.0.1',
    port: 5179,
    strictPort: true,
    allowedHosts: true,
    headers: previewSecurityHeaders,
  },
  };
});
