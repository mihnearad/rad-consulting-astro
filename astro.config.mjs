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
    inlineStylesheets: 'auto'
  }
});
