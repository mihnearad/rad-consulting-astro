# Copilot Instructions for RAD Digital Solutions Astro Website

## Project Overview
Business consulting website built with Astro 4.9+ using a **hybrid architecture**: Astro components (`.astro`) for static content + React components (`.jsx`) for interactive features. Heavily optimized for SEO and performance.

## Architecture Patterns

### Component Organization
- **Top-level sections**: `/components/` - navbar, hero, about, footer (all `.astro`)
- **Services**: `/components/Services/` - contains both Astro static cards and React carousel (unused)
- **Page types**: Homepage (`src/pages/index.astro`) + service detail pages (`src/pages/services/*.astro`) + use case studies (`src/pages/use-cases/*.astro`)
- **Templates**: `ServiceTemplate.astro` - reusable template for service pages (see `SERVICE_TEMPLATE_GUIDE.md`)

### Critical Files
- **`src/pages/index.astro`**: Main SPA layout - imports all section components, wraps each in `<section id="">` for anchor navigation
- **`src/global.css`**: CSS custom properties (brand colors: `--primary: #011426`, `--primaryLight: #3483C5`) and utility classes (`cs-*` prefix pattern)
- **`astro.config.mjs`**: React integration, sitemap config, Vite build optimizations (manual chunks for vendor/swiper, CSS code splitting)

### Routing & Navigation
**Single-page app** using section IDs - all navigation uses `/#anchor` links:
- `/#home`, `/#services-343`, `/#use-cases`, `/#about`, `/#contact`
- Multi-page routes: `/services/[service-name]`, `/use-cases/[case-name]`, `/faq`, `/privacy-policy`

## Development Conventions

### Astro Component Pattern
```astro
---
import { Image } from "astro:assets";
// All logic/imports in frontmatter
---
<section id="unique-id">
  <!-- Always use Astro Image for optimized loading -->
  <Image src="..." alt="..." width={} height={} />
</section>
<style>/* Component-specific styles */</style>
```

### Styling System
- **CSS custom properties** in `src/global.css` define all design tokens
- **Class naming**: `cs-` prefix (CodeStitch pattern) - e.g., `cs-container`, `cs-topper`, `cs-title`
- **Responsive**: Uses `clamp()` for fluid typography - `--headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem)`
- **Styles location**: Embedded in `.astro` components, NOT separate CSS files

### Image Optimization (CRITICAL)
- **Astro Images**: Always use `<Image>` from `astro:assets` with explicit `width` and `height`
- **Unsplash URLs**: Include params `w=826&h=480&q=80` for 2x retina displays (see `PERFORMANCE_OPTIMIZATIONS.md`)
- **Static assets**: `/public/` directory (logo, videos, icons)

### React Integration (Minimal Use)
- React only for interactive components (e.g., `ServiceCarousel.jsx` with Swiper)
- **Currently NOT used** - homepage uses static Astro service cards instead
- If using React: Import with `client:load` directive in Astro component

## SEO & Analytics Architecture

### Consent Management Flow
1. **Google Consent Mode V2**: Initialized in `<head>` with `gtag('consent', 'default', {...})` set to 'denied'
2. **GTM**: Loads immediately after consent setup (`GTM-PNSZZ2K5`)
3. **Klaro Cookie Consent**: Loads deferred, updates consent via `gtag('consent', 'update', {...})` in `/public/klaro-config.js`

### SEO Patterns (See `SEO_OPTIMIZATION_SUMMARY.md`)
- **Target keywords**: "digital services", "project management solutions", "networking solutions", "digital transformation"
- **Meta tags**: Every page has title, description, keywords, OG tags, Twitter cards
- **Structured data**: JSON-LD Organization schema in `<head>` with service listings
- **Canonical URLs**: Always set via `<link rel="canonical">`

### Performance Optimizations
- **Resource hints**: `preconnect` + `dns-prefetch` for CDNs (Klaro, GTM, Unsplash) - see `JAVASCRIPT_OPTIMIZATION_GUIDE.md`
- **Critical CSS**: Inline in `<head>` for above-fold content
- **Build config**: `inlineStylesheets: 'always'`, `cssCodeSplit: true`, `modulePreload: { polyfill: false }`
- **Video preload**: `<link rel="preload" as="video" href="/DigitalVideo.mp4">`

## Development Workflow

### Essential Commands
```bash
npm run dev         # Dev server (default port 4321)
npm run build       # Type-check (astro check) → build
npm run preview     # Preview production build
```

### Creating New Service Pages
1. Create `/src/pages/services/[name].astro`
2. Import `ServiceTemplate.astro` 
3. Pass props: `title`, `description`, `heroImage`, `benefits[]`, `features[]`, `process[]`, `cta{}`
4. Add to sitemap in `astro.config.mjs` customPages array
5. See `SERVICE_TEMPLATE_GUIDE.md` for full template

### Creating Use Case Studies
- Individual pages in `/src/pages/use-cases/[slug].astro` with detailed case study layout
- Index page (`/src/pages/use-cases/index.astro`) maintains `caseStudies` array for listing
- Must include: `slug`, `title`, `category`, `excerpt`, `image`, `results[]`, `technologies[]`

## Design Consistency Requirements

### Every Page Must Follow
All pages must adhere to the design system documented in `DESIGN_SYSTEM.md`:

1. **CSS Custom Properties**: Always use variables from `src/global.css`
   - Colors: `var(--primary)`, `var(--primaryLight)`, `var(--bodyTextColor)`, etc.
   - Typography: `var(--topperFontSize)`, `var(--headerFontSize)`, `var(--bodyFontSize)`
   - Spacing: `var(--sectionPadding)`

2. **Class Naming**: Use `cs-` prefix pattern
   - Structure: `.cs-container`, `.cs-content`
   - Typography: `.cs-topper`, `.cs-title`, `.cs-text`, `.cs-h3`
   - Components: `.cs-item`, `.cs-button-solid`, `.cs-link`

3. **Section Structure Pattern** (consistent across all pages):
   ```astro
   <section id="unique-id">
     <div class="cs-container">
       <div class="cs-content">
         <span class="cs-topper">Section Label</span>
         <h2 class="cs-title">Main Heading</h2>
         <p class="cs-text">Description</p>
       </div>
       <!-- Section content -->
     </div>
   </section>
   ```

4. **Button Styling**: Always use `.cs-button-solid` for primary CTAs
   - Background: `var(--primaryLight)`
   - Hover includes `transform: translateY(-2px)` and darker shade

5. **Card Hover Effects**: 
   - `transform: translateY(-7px)`
   - `box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px`
   - Transition: `0.3s`

6. **Responsive Typography**: Use `clamp()` for fluid sizing
   - Already defined in CSS variables
   - Never hardcode `font-size` values - reference variables

## Critical Implementation Details

### Google Consent Must Load BEFORE GTM
Every page must follow this exact order in `<head>`:
1. Consent Mode default setup (inline script)
2. GTM script  
3. All other meta/resources

### All Pages Need Consent + Analytics
Pattern used on every `.astro` page (index, services, use-cases):
```astro
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', { /* ... */ });
</script>
<script is:inline>/* GTM snippet */</script>
```

### Sitemap Priority System
In `astro.config.mjs` sitemap config:
- Homepage: `priority: 1.0, changefreq: 'daily'`
- Service pages: `priority: 0.9, changefreq: 'weekly'`
- Tools/templates: `priority: 0.8, changefreq: 'monthly'`
- Legal pages: `priority: 0.5, changefreq: 'monthly'`

## Key Reference Docs
- **`DESIGN_SYSTEM.md`**: Complete visual language guide - colors, typography, components, and patterns
- **`SERVICE_TEMPLATE_GUIDE.md`**: How to create new service pages
- **`SEO_OPTIMIZATION_SUMMARY.md`**: Target keywords and optimization changes
- **`PERFORMANCE_OPTIMIZATIONS.md`**: Image/JS optimization techniques
- **`SEO_DEPLOYMENT_CHECKLIST.md`**: Pre-deployment validation steps