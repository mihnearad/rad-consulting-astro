import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rad-digitalsolutions.com',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 45000,
      customPages: [
        'https://rad-digitalsolutions.com/',
        'https://rad-digitalsolutions.com/services/it-consulting',
        'https://rad-digitalsolutions.com/services/project-management',
        'https://rad-digitalsolutions.com/services/data-analysis',
        'https://rad-digitalsolutions.com/services/process-automation',
        'https://rad-digitalsolutions.com/use-cases/enterprise-network-modernization',
        'https://rad-digitalsolutions.com/use-cases/wordpress-migration-project',
        'https://rad-digitalsolutions.com/use-cases/sales-analytics-logistics',
        'https://rad-digitalsolutions.com/use-cases/erp-chatbot-integration',
        'https://rad-digitalsolutions.com/user-story-template',
        'https://rad-digitalsolutions.com/faq',
        'https://rad-digitalsolutions.com/privacy-policy'
      ],
      serialize(item) {
        // Set different priorities and change frequencies based on page importance
        if (item.url === 'https://rad-digitalsolutions.com/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (item.url.includes('/services/')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (item.url.includes('/use-cases/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (item.url.includes('/user-story-template')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        } else if (item.url.includes('/faq') || item.url.includes('/privacy-policy')) {
          item.changefreq = 'monthly';
          item.priority = 0.5;
        }
        return item;
      }
    })
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
    format: 'file'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      modulePreload: {
        polyfill: false
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'swiper': ['swiper']
          },
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.')[1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
              extType = 'fonts';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      },
      minify: 'esbuild',
      target: 'esnext'
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'swiper']
    }
  }
});
