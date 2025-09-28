import type { APIRoute } from 'astro';

const robotsTxt = `
User-agent: *
Allow: /
Allow: /services/
Allow: /services/it-consulting
Allow: /services/project-management
Allow: /services/data-analysis
Allow: /faq
Allow: /privacy-policy

# Disallow admin or sensitive areas (if any)
# Disallow: /admin/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${new URL('sitemap-index.xml', import.meta.env.SITE).href}

# Additional sitemap for better indexing
Sitemap: ${new URL('sitemap-0.xml', import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
