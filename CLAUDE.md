# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Business consulting website for RAD Digital Solutions built with **Astro 4.9.3** using a hybrid architecture: primarily Astro components (`.astro`) for static content with minimal React (`.jsx`) for interactive features. Heavily optimized for SEO, performance, and Google PageSpeed metrics.

**Domain**: https://rad-digitalsolutions.com
**Primary focus**: Digital services, IT consulting, project management solutions, business intelligence, process automation, and networking solutions.
**Tech Stack**: Astro 4.9.3, React 18.3.1, TypeScript 5.4.5, Klaro 0.7.21 (cookie consent), Swiper 11.1.4

## Development Commands

```bash
npm run dev      # Start dev server (port 4321)
npm run build    # Type-check with astro check, then build for production
npm run preview  # Preview production build locally
npm run start    # Alias for dev
```

## Architecture & Structure

### Lead Generation & Conversion Optimization System
**Comprehensive lead capture system** deployed across the website (November 2025):

#### Core Lead Capture Components:
- **Contact Modal** (`/components/contact-modal.astro`): Standard 4-field form (Name, Email, Company, Service Interest)
  - Includes trust badges: "4-hour response", "500+ happy clients", "No obligation"
  - Triggers: Navbar "Contact Us", Hero "Get Started Today" button, Floating CTA
  - GTM event: `lead_modal_open` with `modal_type: 'standard'`

- **Simple Contact Modal** (`/components/contact-modal-simple.astro`): A/B test variant with only 2 fields (Name, Email)
  - Designed for higher conversion rates (20-40% improvement expected)
  - GTM event: `lead_modal_open_simple` with `modal_type: 'simple_2field'`
  - See `/docs/AB_TESTING_CONTACT_FORMS.md` for switching instructions

- **Exit-Intent Popup** (`/components/exit-intent-popup.astro`): Captures abandoning visitors
  - Triggers on: Mouse exit, 50% page scroll, or 30 seconds on page
  - Mobile: Triggers after scrolling up 3+ times
  - Offers free IT Infrastructure Assessment Checklist
  - Shows once per 24 hours (localStorage tracking)
  - GTM event: `exit_intent_popup_shown`

- **Floating CTA** (`/components/floating-cta.astro`): Sticky "Get Started" button that appears on scroll

- **Trust Section** (`/components/trust-section.astro`): Social proof and credibility signals
  - Stats grid: 500+ clients, 98% satisfaction, 10+ years, 1000+ projects
  - 3 testimonials with 5-star ratings
  - Trust badges: 100% Secure, GDPR Compliant, 24-Hour Response, Expert Team

#### Lead Magnets & Tools:
- **Free IT Infrastructure Checklist** (`/src/pages/free-it-infrastructure-checklist.astro`)
  - 25-point comprehensive assessment across 5 categories
  - Print-friendly design with self-scoring system
  - No email gate - instant access
  - Main exit-intent offer

- **BI Value Calculator** (`/src/pages/bi-value-calculator.astro`)
  - Interactive ROI calculator for Business Intelligence
  - 2-step assessment: Data maturity + Time/cost savings
  - Generates custom recommendations based on input
  - Lead capture after results display

See `/docs/LEAD_GENERATION_IMPROVEMENTS_SUMMARY.md` for complete implementation details and `/docs/AB_TESTING_CONTACT_FORMS.md` for A/B testing guide.

### Routing Strategy
**Single-page app (SPA)** for homepage using section-based anchor navigation:
- Homepage sections: `/#home`, `/#services-343`, `/#use-cases`, `/#resources`, `/#about`, `/#faq`, `/#contact`
- Multi-page routes:
  - Services: `/services/it-consulting`, `/services/project-management`, `/services/business-intelligence`, `/services/process-automation`
  - Use Cases: `/use-cases/enterprise-network-modernization`, `/use-cases/erp-chatbot-integration`, `/use-cases/sales-analytics-logistics`, `/use-cases/wordpress-migration-project`
  - Lead Magnets & Tools: `/free-it-infrastructure-checklist`, `/bi-value-calculator`
  - Other: `/faq`, `/privacy-policy`, `/user-story-template`

### Component Organization
```
/components/                          # Root-level components directory
├── ServiceTemplate.astro             # Reusable template for service detail pages
├── navbar.astro                      # Main navigation with Contact Modal trigger
├── hero.astro                        # Homepage hero with video background
├── about.astro                       # About section
├── footer.astro                      # Site footer
├── contact-us.astro                  # Contact form section (traditional form)
├── contact-modal.astro               # Standard 4-field modal form (lead generation)
├── contact-modal-simple.astro        # Simple 2-field modal (A/B test variant)
├── exit-intent-popup.astro           # Exit-intent popup with lead magnet offer
├── floating-cta.astro                # Sticky "Get Started" button
├── trust-section.astro               # Social proof: testimonials, stats, trust badges
├── use-cases.astro                   # Use cases listing section
├── resources-section.astro           # Resources/tools section
├── our-process.astro                 # Process overview section
└── Services/
    ├── services.astro                # Service cards (currently used)
    ├── services_old.astro            # Old version (backup)
    └── ServiceCarousel.jsx           # React carousel (unused, kept for reference)

/src/
├── layouts/
│   └── BaseLayout.astro              # Main layout with SEO, analytics, navbar, footer, modals
├── pages/
│   ├── index.astro                   # Homepage SPA (imports all sections)
│   ├── faq.astro                     # FAQ page
│   ├── privacy-policy.astro          # Privacy policy page
│   ├── user-story-template.astro     # User story template tool
│   ├── bi-value-calculator.astro     # BI ROI calculator tool (lead magnet)
│   ├── free-it-infrastructure-checklist.astro  # IT checklist (primary lead magnet)
│   ├── robots.txt.ts                 # Robots.txt generator
│   ├── services/
│   │   ├── it-consulting.astro       # IT consulting service page
│   │   ├── project-management.astro  # Project management service page
│   │   ├── business-intelligence.astro # BI service page
│   │   └── process-automation.astro  # Process automation service page
│   └── use-cases/
│       ├── index.astro               # Use cases listing page
│       ├── enterprise-network-modernization.astro
│       ├── erp-chatbot-integration.astro
│       ├── sales-analytics-logistics.astro
│       └── wordpress-migration-project.astro
├── global.css                        # Global CSS variables and base styles
├── middleware.ts                     # Security headers middleware
└── styles/                           # Additional style files
```

### Key Files
- **`astro.config.mjs`**: React integration, sitemap generation, Vite optimizations (manual chunks for vendor/swiper, CSS code splitting), build configuration
- **`src/layouts/BaseLayout.astro`**: Main layout wrapper with SEO meta tags, GA4/GTM tracking, consent management, and global components (navbar, footer, modals)
- **`src/global.css`**: CSS custom properties for design system (colors, typography, spacing, responsive font sizes)
- **`src/middleware.ts`**: Security headers (CSP, X-Frame-Options, etc.) configured for GTM, GA4, Klaro, and Web3Forms
- **`public/klaro-config.js`**: Cookie consent configuration for GDPR compliance
- **`components/ServiceTemplate.astro`**: Reusable template for all service pages (benefits, features, process, CTA sections)
- **`/docs/`**: Extensive documentation (design system, SEO guide, performance optimizations, service template guide, contact modal guide)

## Design System

### CSS Custom Properties (from `src/global.css`)
All styles MUST use CSS variables defined in global.css:

```css
/* Brand Colors - Derived from RAD logo */
--primary: #011426           /* Dark navy - headers, navbar, footer */
--primaryLight: #3483C5      /* Light blue - buttons, links, CTAs */
--secondary: #2A5B8C         /* Medium blue - balance color */
--secondaryLight: #A8C8E6    /* Very light blue - subtle backgrounds */
--accent: #3483C5            /* Light blue - highlights and CTAs */
--accentLight: #E8F3FE       /* Very light blue - subtle accents */
--headerColor: #011426       /* Dark blue for headers */
--bodyTextColor: #4a5568     /* Neutral gray - body text */
--bodyTextColorWhite: #fafbfc /* White text on dark backgrounds */
--neutral: #f8fafc           /* Light neutral backgrounds */
--neutralDark: #64748b       /* Medium gray - secondary text */

/* Typography - Fluid responsive sizing */
--topperFontSize: clamp(0.8125rem, 1.6vw, 1rem)      /* 13-16px */
--headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem) /* 31-49px */
--bodyFontSize: 1.1rem

/* Spacing - Responsive section padding */
--sectionPadding: clamp(2.5rem, 5.22vw, 4.17rem) 1rem  /* 60-100px vertical, 16px horizontal */
```

**Font Family**: `Inter, sans-serif` (loaded from Google Fonts)
**Box Sizing**: `border-box` applied globally to all elements

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
All pages use `BaseLayout.astro` which implements the correct tracking sequence in `<head>`:

1. **Google Consent Mode V2** (inline script setting default to 'denied')
2. **Google Analytics 4 (GA4)** (G-HW0BVWR14C) with gtag.js
3. **Google Tag Manager** (GTM-PNSZZ2K5)
4. **Klaro Cookie Consent** (loads deferred, updates consent via gtag)

```astro
<!-- Google Consent Mode - Must load BEFORE GTM and GA4 -->
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

<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HW0BVWR14C"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HW0BVWR14C');
</script>

<!-- Google Tag Manager -->
<script is:inline>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-PNSZZ2K5');</script>
```

**IMPORTANT**: Use `BaseLayout.astro` for all pages to ensure consistent tracking and SEO implementation. Do not duplicate analytics scripts in individual pages.

### SEO Requirements for All Pages
All SEO tags are handled by `BaseLayout.astro` via props. When creating new pages, pass these required props:
- **title**: Page title (60 chars max) - e.g., "RAD Digital Solutions - IT Consulting Services"
- **description**: Meta description (155-160 chars) - concise, keyword-rich summary
- **keywords**: Comma-separated keywords targeting: "digital services", "project management solutions", "networking solutions", "IT consulting", "business intelligence", "process automation"
- **canonical**: Full canonical URL - e.g., "https://rad-digitalsolutions.com/services/it-consulting"
- **ogImage**: Open Graph image URL (ideally 1200x630px)
- **ogUrl**: Open Graph URL (same as canonical)

BaseLayout automatically includes:
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale, og:site_name)
- Twitter Card tags (summary_large_image)
- Structured data (JSON-LD for Organization with services)
- Favicon and icons
- Sitemap reference
- Robots meta tags

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
Place in `/public/` directory:
- **Logo**: `RAD_Logo_V2_1.webp`, `logo_raddigitalsolutions.webp`
- **Video**: `DigitalVideo.mp4` (hero background video, ~5MB)
- **Images**: `Background.webp` (hero fallback), `Mihnea.webp` (about section), `V1.webp`
- **Icons**: `whatsapp-icon.svg`
- **Config**: `klaro-config.js` (cookie consent configuration)
- **Originals**: `/public/originals/` (source images before WebP conversion)

**Image Optimization**: All images converted to WebP format for performance. See `/docs/WEBP_CONVERSION_SUMMARY.md`.

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
- Lead magnets & tools: `priority: 0.85, changefreq: 'monthly'` (BI calculator, IT checklist)
- Use cases: `priority: 0.8, changefreq: 'monthly'`
- Tools/templates: `priority: 0.8, changefreq: 'monthly'`
- Legal (FAQ, privacy): `priority: 0.5, changefreq: 'monthly'`

## Security Headers

Configured in `src/middleware.ts` and applied to all responses:
- **Content-Security-Policy**: Allows GTM, GA4, Klaro CDN, Web3Forms, external images
  - `script-src`: self, unsafe-inline, GTM, Klaro
  - `style-src`: self, unsafe-inline, Google Fonts, Klaro
  - `img-src`: self, data:, https:, blob: (for Unsplash and other external images)
  - `connect-src`: self, Google Analytics, GTM, Web3Forms API
  - `frame-src`: GTM only
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff (prevents MIME sniffing)
- **Referrer-Policy**: strict-origin-when-cross-origin
- **Permissions-Policy**: Restricts geolocation, microphone, camera

**Note**: Strict-Transport-Security (HSTS) header is commented out in middleware - enable only after SSL is confirmed working in production.

## Form Submission

The website uses multiple form systems for lead generation:

1. **Contact Modal - Standard** (`components/contact-modal.astro`): 4-field modal form
   - Fields: Name, Email, Company, Service Interest dropdown
   - Includes trust badges for credibility
   - Appears via navbar, hero CTA, or floating CTA button
   - GTM events: `lead_modal_open`, `generate_lead` (form_type: 'contact_request')
   - Currently active form

2. **Contact Modal - Simple** (`components/contact-modal-simple.astro`): 2-field A/B test variant
   - Fields: Name, Email only
   - Designed for higher conversion (20-40% expected improvement)
   - GTM events: `lead_modal_open_simple`, `generate_lead` (form_type: 'simple_2field')
   - Switch instructions in `/docs/AB_TESTING_CONTACT_FORMS.md`

3. **Traditional Contact Form** (`components/contact-us.astro`): Full-page form
   - Visible on homepage `#contact` section
   - Uses Web3Forms API

4. **Exit-Intent Popup** (`components/exit-intent-popup.astro`): Lead magnet capture
   - Offers free IT Infrastructure Checklist
   - No form - direct link to checklist page
   - GTM event: `exit_intent_popup_shown`

**A/B Testing**: To switch between standard and simple contact modals, see `/docs/AB_TESTING_CONTACT_FORMS.md` for step-by-step instructions.

All forms use Web3Forms API (endpoint configured in CSP via `src/middleware.ts`).

## Reference Documentation

Key docs in `/docs/` directory:

### Lead Generation & Conversion:
- **`LEAD_GENERATION_IMPROVEMENTS_SUMMARY.md`**: Complete overview of all lead generation features (Nov 2025)
- **`AB_TESTING_CONTACT_FORMS.md`**: Guide for switching between standard and simple contact modals
- **`CONTACT_MODAL_GUIDE.md`**: Complete guide to contact modal and floating CTA implementation

### Design & Development:
- **`DESIGN_SYSTEM.md`**: Complete visual language (colors, typography, components, hover effects)
- **`DESIGN_SYSTEM_IMPLEMENTATION.md`**: Design system implementation details
- **`SERVICE_TEMPLATE_GUIDE.md`**: Step-by-step guide for creating service pages

### SEO & Performance:
- **`SEO_OPTIMIZATION_SUMMARY.md`**: Target keywords and SEO strategy
- **`SEO_PERFORMANCE_AUDIT_2025.md`**: Comprehensive SEO performance audit
- **`SEO_IMPLEMENTATION_COMPLETE.md`**: SEO implementation completion report
- **`SEO_DEPLOYMENT_CHECKLIST.md`**: Pre-launch validation steps
- **`SEO_QUICK_REFERENCE.md`**: Quick reference for SEO best practices
- **`PERFORMANCE_OPTIMIZATIONS.md`**: Image/JS optimization techniques
- **`JAVASCRIPT_OPTIMIZATION_GUIDE.md`**: Resource hints and script loading patterns
- **`WEBP_CONVERSION_SUMMARY.md`**: Image optimization and WebP conversion guide

## Best Practices

### When Creating New Pages
1. **Always use BaseLayout.astro** - Never create custom layouts or duplicate SEO/analytics scripts
2. **Pass all required SEO props** - title, description, keywords, canonical, ogImage, ogUrl
3. **Use CSS custom properties** - Reference `src/global.css` for colors, typography, spacing
4. **Follow naming conventions** - Use `cs-` prefix for class names (CodeStitch pattern)
5. **Add to sitemap** - Update `customPages` array in `astro.config.mjs`

### When Creating New Components
1. **Component location** - Place in `/components/` directory (not `/src/components/`)
2. **Import paths** - When importing from pages, use relative paths (e.g., `../../components/ComponentName.astro`)
3. **Scoped styles** - Use `<style>` tags within `.astro` files for component-specific styles
4. **Prefer Astro over React** - Only use React when client-side interactivity is required

### When Modifying Styles
1. **Update global.css first** - Add new CSS variables to `src/global.css` before using
2. **Use existing variables** - Reference `--primary`, `--primaryLight`, `--bodyTextColor`, etc.
3. **Maintain responsive design** - Use `clamp()` for fluid typography and spacing
4. **Test hover effects** - Ensure consistent hover states (transform, box-shadow, transition)

### Performance Considerations
1. **Image optimization** - Always use Astro's `<Image>` component with explicit dimensions
2. **WebP format** - Use WebP images when possible (see `/docs/WEBP_CONVERSION_SUMMARY.md`)
3. **Lazy loading** - Images outside viewport should lazy load (Astro handles this automatically)
4. **Preload critical assets** - Hero images and videos should be preloaded in BaseLayout

### Security
1. **Never disable CSP** - All external resources must be whitelisted in `src/middleware.ts`
2. **Validate user input** - Use Web3Forms for form submissions (includes spam protection)
3. **Cookie consent** - Klaro automatically handles GDPR compliance
4. **Test security headers** - Use securityheaders.com to validate configuration

### Lead Generation & Conversion Optimization
1. **A/B Testing Contact Forms**:
   - Standard form (4 fields): Better qualification, more context
   - Simple form (2 fields): Higher conversion rate (20-40% improvement expected)
   - Switch between variants using `/docs/AB_TESTING_CONTACT_FORMS.md` guide
   - Run tests for minimum 100 conversions per variant or 2 weeks

2. **Exit-Intent Popup**:
   - Only shows once per 24 hours (localStorage tracking)
   - Multiple triggers: Mouse exit, 50% scroll, 30 seconds on page, mobile scroll-up
   - Offers free IT Infrastructure Checklist (no email gate)
   - Expected: 2-4% of abandoning visitors converted

3. **Trust Signals**:
   - Trust section on homepage builds credibility
   - Contact modal includes trust badges
   - Expected: 15-30% increase in form submissions

4. **Lead Magnets**:
   - IT Infrastructure Checklist: Main lead magnet, print-friendly, 25 points
   - BI Value Calculator: Interactive tool for BI prospects
   - Both positioned as expert resources to build authority

5. **Expected Metrics** (after implementation):
   - Google Ads conversion rate: 0% → 2-3%
   - Monthly qualified leads: 3-5 minimum, target 10-15 with content
   - Exit-intent popup views: 100+ per month
   - Checklist page views: 50-200 per month
   - Time on site: +30%
   - Bounce rate: -15-20%

## Deployment

### Build Process
```bash
npm run build    # Runs astro check (type checking) then astro build
```

Build output goes to `/dist/` directory with:
- Static HTML files
- Optimized assets in `/dist/assets/` (JS, CSS, images, fonts)
- Sitemap at `/dist/sitemap-index.xml`
- Robots.txt at `/dist/robots.txt`

### Pre-Deployment Checklist
1. **Run build locally** - Ensure no TypeScript errors or build warnings
2. **Test preview** - Run `npm run preview` to test production build
3. **Verify SEO** - Check all pages have correct meta tags, canonical URLs, og:image
4. **Test forms** - Verify all lead generation forms:
   - Contact modal (standard 4-field version)
   - Footer contact form
   - Exit-intent popup triggers correctly (desktop & mobile)
   - Trust section displays on homepage
5. **Test lead magnets**:
   - Free IT Infrastructure Checklist page loads and prints correctly
   - BI Value Calculator functions properly
6. **Check analytics** - Confirm GTM and GA4 tracking in browser devtools:
   - `lead_modal_open` event fires when modal opens
   - `exit_intent_popup_shown` event fires when popup appears
   - `generate_lead` event fires on form submission
7. **Validate sitemap** - Visit `/sitemap-index.xml` and verify all pages listed (including new tool pages)
8. **Security headers** - Test with securityheaders.com
9. **PageSpeed** - Run Google PageSpeed Insights (target 90+ on mobile/desktop)
10. **Cookie consent** - Test Klaro consent banner appears and functions correctly
11. **Exit-intent behavior**:
    - Desktop: Move cursor to close tab
    - Mobile: Scroll up 3+ times
    - Verify popup only shows once per 24 hours

### Environment Variables
No environment variables currently required. Web3Forms access key is hardcoded in components (consider moving to environment variable for security).

### Hosting Recommendations
- **Vercel**: Zero-config deployment, automatic HTTPS, edge network
- **Netlify**: Similar to Vercel, includes form handling
- **Cloudflare Pages**: Fast global CDN, great for static sites
- **GitHub Pages**: Free option, requires manual deployment

All hosting platforms support Astro's static build output.

## Troubleshooting

### Build Errors
**"Cannot find module"**
- Run `npm install` to ensure all dependencies installed
- Check import paths (components are in `/components/`, not `/src/components/`)

**Type errors in .astro files**
- Run `npm run build` to see TypeScript errors
- Ensure all BaseLayout props are passed correctly (title, description, etc.)

**Sitemap generation fails**
- Verify `site` is set in `astro.config.mjs`
- Check all pages in `customPages` array are valid URLs

### Runtime Issues
**Images not loading**
- Verify images exist in `/public/` directory
- Check file paths are correct (case-sensitive on Linux servers)
- For Unsplash images, ensure URLs include optimization params

**Styles not applying**
- Check CSS custom properties are defined in `src/global.css`
- Verify scoped styles use correct selectors
- Inspect browser console for CSP violations

**Analytics not tracking**
- Open browser devtools Network tab, filter for "gtm" or "analytics"
- Verify GTM and GA4 scripts loaded successfully
- Check Klaro consent was granted (accept cookies in banner)
- Look for dataLayer pushes in Console

**Forms not submitting**
- Check browser Console for errors
- Verify Web3Forms API in CSP `connect-src` directive
- Test form validation (email field must be valid format)

### Performance Issues
**Large bundle size**
- Check manual chunks in `astro.config.mjs` are working
- Verify images are WebP format and appropriately sized
- Use browser devtools to identify large assets

**Slow page load**
- Enable resource hints in BaseLayout (preconnect, dns-prefetch)
- Preload critical assets (hero image, hero video)
- Check video file size (DigitalVideo.mp4 should be <10MB)

**Layout shift (CLS)**
- Ensure all images have explicit width/height attributes
- Use aspect-ratio CSS for responsive images
- Avoid injecting content above fold after page load

## Project Maintenance

### Regular Tasks
- **Update dependencies**: Run `npm outdated` monthly, update carefully
- **Review analytics**: Check GA4 for user behavior, popular pages
- **Monitor performance**: Monthly PageSpeed Insights checks
- **SEO monitoring**: Track keyword rankings, organic traffic
- **Security updates**: Watch for Astro/React security advisories

### Version Control
- **Main branch**: `master` (production)
- **Commit message format**: Use conventional commits (feat:, fix:, docs:, style:, refactor:)
- **Pre-commit checks**: Ensure build passes before committing

### Documentation Updates
When making significant changes:
1. Update this CLAUDE.md file
2. Update relevant `/docs/` files
3. Document breaking changes in commit messages
4. Consider updating SEO docs if keywords/strategy changes

---

## Recent Major Updates

### November 2025: Lead Generation & Conversion Optimization
**Goal**: Increase qualified leads from 0 to 5+ per month with minimal budget

**What was added**:
1. **Exit-Intent Popup** (`exit-intent-popup.astro`) - Captures abandoning visitors with free IT checklist offer
2. **Trust Section** (`trust-section.astro`) - Social proof with testimonials, stats, and trust badges
3. **Simple Contact Modal** (`contact-modal-simple.astro`) - A/B test variant with only 2 fields
4. **IT Infrastructure Checklist** page - 25-point assessment, print-friendly, no email gate
5. **BI Value Calculator** page - Interactive ROI calculator for BI prospects
6. **Enhanced Contact Modal** - Added trust badges to standard modal
7. **Documentation** - Complete guides for A/B testing and lead generation implementation

**Files modified**:
- `components/contact-modal.astro` - Added trust badges
- `src/layouts/BaseLayout.astro` - Added exit-intent popup and trust section
- `src/pages/index.astro` - Integrated trust section
- Various component updates for trigger integration

**New files created**:
- `components/exit-intent-popup.astro`
- `components/trust-section.astro`
- `components/contact-modal-simple.astro`
- `src/pages/free-it-infrastructure-checklist.astro`
- `src/pages/bi-value-calculator.astro`
- `docs/AB_TESTING_CONTACT_FORMS.md`
- `docs/LEAD_GENERATION_IMPROVEMENTS_SUMMARY.md`

**Expected impact**:
- Google Ads conversion: 0% → 2-3%
- Monthly leads: 0 → 3-5 (phase 1), target 10-15 with content (phase 2)
- Exit-intent captures: 2-4% of abandoning visitors
- Improved trust and credibility throughout site

**Next steps** (Phase 2 - Optional):
- Location landing pages (Belgium/Netherlands)
- Blog content (5 posts targeting long-tail keywords)
- Expanded use cases with detailed ROI metrics
- Email newsletter signup
- Google Business Profile optimization

See `/docs/LEAD_GENERATION_IMPROVEMENTS_SUMMARY.md` for complete details and implementation guide.
