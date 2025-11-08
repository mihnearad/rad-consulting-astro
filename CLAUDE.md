# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business consulting website for RAD Digital Solutions built with **Astro 4.9+** using a hybrid architecture: primarily Astro components (`.astro`) for static content with minimal React (`.jsx`) for interactive features. Heavily optimized for SEO, performance, and Google PageSpeed metrics.

**Domain**: https://rad-digitalsolutions.com
**Primary focus**: Digital services, IT consulting, project management solutions, and networking solutions.

## Development Commands

```bash
npm run dev      # Start dev server (port 4321)
npm run build    # Type-check with astro check, then build for production
npm run preview  # Preview production build locally
npm run start    # Alias for dev
```

## Architecture & Structure

### Contact Modal Lead Generation System
**New feature** for capturing leads across the entire website:
- **Contact Modal** (`/components/contact-modal.astro`): Modern pop-up form with "Let's Transform Your Business Together" messaging
- **Floating CTA** (`/components/floating-cta.astro`): Sticky "Get Started" button that appears on scroll
- **Integrated across all pages** via `BaseLayout.astro`
- **Trigger methods**: Navbar "Contact Us", Hero "Get Started Today" button, Floating CTA
- **Form fields**: Name, Email (required), Company, Service Interest dropdown
- **Analytics**: Tracks modal opens and lead submissions via GTM
- See `/docs/CONTACT_MODAL_GUIDE.md` for complete documentation

### Routing Strategy
**Single-page app (SPA)** for homepage using section-based anchor navigation:
- Homepage sections: `/#home`, `/#services-343`, `/#use-cases`, `/#about`, `/#contact`
- Multi-page routes: `/services/[service-name]`, `/use-cases/[case-name]`, `/faq`, `/privacy-policy`, `/user-story-template`

### Component Organization
```
/components/
├── ServiceTemplate.astro        # Reusable template for service detail pages
├── navbar.astro                 # Main navigation
├── hero.astro                   # Homepage hero with video
├── about.astro                  # About section
├── footer.astro                 # Site footer
├── contact-us.astro             # Contact form section
├── use-cases.astro              # Use cases listing section
├── resources-section.astro      # Resources/tools section
├── our-process.astro            # Process overview section
└── Services/
    ├── services.astro           # Service cards (currently used)
    └── ServiceCarousel.jsx      # React carousel (unused, kept for reference)

/src/pages/
├── index.astro                  # Homepage SPA layout (imports all section components)
├── services/*.astro             # Individual service detail pages
├── use-cases/*.astro            # Case study pages
├── faq.astro
├── privacy-policy.astro
└── user-story-template.astro
```

### Key Files
- **`astro.config.mjs`**: React integration, sitemap generation, Vite optimizations (manual chunks for vendor/swiper, CSS code splitting)
- **`src/global.css`**: CSS custom properties for design system (colors, typography, spacing)
- **`src/middleware.ts`**: Security headers (CSP, X-Frame-Options, etc.) configured for GTM and Klaro
- **`public/klaro-config.js`**: Cookie consent configuration for GDPR compliance
- **`/docs/`**: Extensive documentation (design system, SEO guide, performance optimizations, service template guide)

## Design System

### CSS Custom Properties (from `src/global.css`)
All styles MUST use CSS variables defined in global.css:

```css
/* Brand Colors */
--primary: #011426          /* Dark navy - headers, navbar, footer */
--primaryLight: #3483C5     /* Sky blue - buttons, links, CTAs */
--bodyTextColor: #4a5568    /* Neutral gray - body text */
--bodyTextColorWhite: #fafbfc

/* Typography */
--topperFontSize: clamp(0.8125rem, 1.6vw, 1rem)      /* 13-16px */
--headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem) /* 31-49px */
--bodyFontSize: 1.1rem

/* Spacing */
--sectionPadding: clamp(2.5rem, 5.22vw, 4.17rem) 1rem  /* 60-100px vertical */
```

### Class Naming Convention
Uses **`cs-` prefix** (CodeStitch pattern) throughout:
- Structural: `.cs-container`, `.cs-content`, `.cs-item`
- Typography: `.cs-topper`, `.cs-title`, `.cs-text`, `.cs-h3`
- Interactive: `.cs-button-solid`, `.cs-link`

### Standard Section Pattern
Every section follows this structure:
```astro
<section id="unique-id">
  <div class="cs-container">
    <div class="cs-content">
      <span class="cs-topper">Section Label</span>
      <h2 class="cs-title">Main Heading</h2>
      <p class="cs-text">Description</p>
    </div>
    <!-- Section-specific content -->
  </div>
</section>
<style>/* Component-scoped styles */</style>
```

### Interactive Element Patterns
**Buttons**:
```css
.cs-button-solid {
  background: var(--primaryLight);
  /* Hover: transform: translateY(-2px) + darker shade */
}
```

**Card Hover Effects**:
```css
.cs-item:hover {
  transform: translateY(-7px);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transition: 0.3s;
}
```

## Creating New Service Pages

1. **Create file**: `/src/pages/services/[service-name].astro`
2. **Import and use ServiceTemplate**:
```astro
---
import ServiceTemplate from "../../../components/ServiceTemplate.astro";
---

<ServiceTemplate
  title="Service Name"
  description="Brief description"
  heroImage="https://images.unsplash.com/photo-..."
  heroImageAlt="Alt text"
  benefits={["Benefit 1", "Benefit 2", ...]}
  features={[
    { title: "Feature", description: "...", icon: "🔍" },
    ...
  ]}
  process={[
    { step: 1, title: "Step Title", description: "..." },
    ...
  ]}
  cta={{
    title: "CTA Title",
    description: "CTA description",
    buttonText: "Button Text"
  }}
/>
```
3. **Add to sitemap**: Update `customPages` array in `astro.config.mjs`
4. **Link from homepage**: Add service card in `/components/Services/services.astro`

See `/docs/SERVICE_TEMPLATE_GUIDE.md` for detailed instructions.

## SEO & Analytics Architecture

### CRITICAL: Script Loading Order
Every `.astro` page MUST follow this exact sequence in `<head>`:

1. **Google Consent Mode V2** (inline script setting default to 'denied')
2. **Google Tag Manager** (GTM-PNSZZ2K5)
3. **Klaro Cookie Consent** (loads deferred, updates consent via gtag)

```astro
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>
<!-- GTM script immediately after -->
```

### SEO Requirements for All Pages
- Title tag (60 chars max)
- Meta description (155-160 chars)
- Meta keywords (target: "digital services", "project management solutions", "networking solutions", "IT consulting")
- Canonical URL (`<link rel="canonical">`)
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- Structured data (JSON-LD for Organization/Service where applicable)

### Performance Optimizations
- **Resource hints**: `preconnect` and `dns-prefetch` for CDNs (GTM, Klaro, Unsplash, Google Fonts)
- **Image optimization**: Always use `<Image>` from `astro:assets` with explicit width/height
- **Video preload**: `<link rel="preload" as="video">` for hero video
- **Build config**: `inlineStylesheets: 'always'`, `cssCodeSplit: true`
- **Vite manual chunks**: Vendor bundle (React), Swiper bundle

See `/docs/PERFORMANCE_OPTIMIZATIONS.md` and `/docs/SEO_OPTIMIZATION_SUMMARY.md` for details.

## Image Handling

### Astro Images (Local or Remote)
```astro
---
import { Image } from "astro:assets";
---
<Image
  src="/path/to/image.webp"
  alt="Descriptive alt text"
  width={826}
  height={480}
/>
```

### Unsplash URLs
Include optimization params for 2x retina displays:
```
https://images.unsplash.com/photo-[ID]?w=826&h=480&q=80
```

### Static Assets
Place in `/public/` directory (logo, videos, icons, favicons).

## React Integration (Minimal)

React is only used for interactive components requiring client-side state:
- Currently: `ServiceCarousel.jsx` (unused, static cards preferred)
- When needed: Import with `client:load` directive in Astro component

**Prefer Astro components** for all static content to maximize performance.

## Use Case Pages

Individual case studies in `/src/pages/use-cases/[slug].astro`. Each must include:
- `slug` (URL path)
- `title`, `category`, `excerpt`
- `image` (hero image)
- `results[]` (measurable outcomes)
- `technologies[]` (tools/platforms used)

Index page (`/src/pages/use-cases/index.astro`) maintains `caseStudies` array for listing.

## Sitemap Priority System

Configured in `astro.config.mjs` serialize function:
- Homepage: `priority: 1.0, changefreq: 'daily'`
- Service pages: `priority: 0.9, changefreq: 'weekly'`
- Use cases: `priority: 0.8, changefreq: 'monthly'`
- Tools/templates: `priority: 0.8, changefreq: 'monthly'`
- Legal (FAQ, privacy): `priority: 0.5, changefreq: 'monthly'`

## Security Headers

Configured in `src/middleware.ts`:
- Content-Security-Policy (allows GTM, Klaro CDN, Google Analytics)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (restricts geolocation, microphone, camera)

## Reference Documentation

Key docs in `/docs/` directory:
- **`DESIGN_SYSTEM.md`**: Complete visual language (colors, typography, components, hover effects)
- **`SERVICE_TEMPLATE_GUIDE.md`**: Step-by-step guide for creating service pages
- **`SEO_OPTIMIZATION_SUMMARY.md`**: Target keywords and SEO strategy
- **`PERFORMANCE_OPTIMIZATIONS.md`**: Image/JS optimization techniques
- **`SEO_DEPLOYMENT_CHECKLIST.md`**: Pre-launch validation steps
- **`JAVASCRIPT_OPTIMIZATION_GUIDE.md`**: Resource hints and script loading patterns
