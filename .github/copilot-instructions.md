# Copilot Instructions for RAD Digital Solutions Astro Website

## Project Overview
This is a business consulting website built with Astro 4.9+ that uses a hybrid architecture combining Astro components (`.astro` files) for static content and React components (`.jsx`) for interactive features. The site focuses on IT consulting, data analysis, and website development services.

## Architecture & Structure

### Component Organization
- **Top-level components**: Located in `/components/` directory, used for main site sections
- **Nested components**: Services components live in `/components/Services/` with both Astro and React variants
- **Page structure**: Single-page application with sections defined by IDs (`#home`, `#services-343`, `#about`, etc.)

### Key Files & Patterns
- **Main page**: `src/pages/index.astro` - imports all components and defines section structure
- **Global styles**: `src/global.css` - contains CSS custom properties for theming
- **Site config**: `astro.config.mjs` - configures React integration and sitemap for `https://rad-digitalsolutions.com`

## Development Conventions

### Component Patterns
```astro
---
// Astro frontmatter for imports and logic
import { Image } from "astro:assets";
---
<!-- HTML with Astro-specific attributes -->
<section id="unique-section-id">
```

### Styling Approach
- Uses CSS custom properties defined in `src/global.css`:
  - `--primary: #32477c`, `--secondary: #839176`
  - `--headerColor`, `--bodyTextColor`, `--sectionPadding`
- Component-specific styles embedded in `.astro` files
- CSS class naming follows `cs-` prefix pattern (e.g., `cs-container`, `cs-title`)

### Image Handling
- Uses Astro's built-in `Image` component for optimization
- Static assets in `/public/` directory (logo: `RAD_Logo_V2_1.webp`)
- External images via Unsplash URLs in services components

### Mixed Architecture
- **Astro components** for static content (navbar, hero, about, footer)
- **React components** for interactive features (ServiceCarousel using Swiper.js)
- React integration configured in `astro.config.mjs` with `@astrojs/react`

## Development Workflow

### Scripts
- `npm start` or `npm run dev` - Development server
- `npm run build` - Type-check with `astro check` then build
- `npm run preview` - Preview production build

### Dependencies
- **Core**: `astro`, `@astrojs/react`, `react`, `react-dom`
- **Features**: `swiper` for carousels, `@astrojs/sitemap` for SEO
- **Type checking**: `typescript`, `@astrojs/check`

## Navigation & Routing
Single-page app using anchor links to section IDs:
- `/#home` → Hero section
- `/#services-343` → Services (note the specific ID suffix)
- `/#our-process` → Why Choose Us section
- `/#about` → About section
- `/#contact` → Contact form

## Key Implementation Notes
- Components are reusable but tightly coupled to the single-page layout
- Mixed static/dynamic content requires understanding when to use `.astro` vs `.jsx`
- Google Analytics integration in main layout (`G-HW0BVWR14C`)
- Site configured for production deployment at `rad-digitalsolutions.com`