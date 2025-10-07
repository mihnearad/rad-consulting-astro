# RAD Digital Solutions - Design System

**Version**: 1.0  
**Last Updated**: October 2025  
**Purpose**: Complete visual and interaction reference for AI agents and developers

---

## 🎨 Color Palette

### Brand Colors
```css
--primary: #011426          /* Dark navy blue - main brand color */
--primaryLight: #3483C5     /* Sky blue - accent & interactive elements */
--secondary: #2A5B8C        /* Medium blue - supporting elements */
--secondaryLight: #A8C8E6   /* Light blue - subtle backgrounds */
```

### Functional Colors
```css
--accent: #3483C5           /* Same as primaryLight - CTAs, links, highlights */
--accentLight: #E8F3FE      /* Very light blue - hover states, backgrounds */
--headerColor: #011426      /* Dark navy - all headings */
--bodyTextColor: #4a5568    /* Neutral gray - body text */
--bodyTextColorWhite: #fafbfc  /* Off-white - text on dark backgrounds */
--neutral: #f8fafc          /* Light gray - backgrounds */
--neutralDark: #64748b      /* Medium gray - secondary text */
```

### Usage Guidelines
- **Primary (#011426)**: Navigation bar, footer, primary headings, emphasis text
- **Primary Light (#3483C5)**: All buttons, links on hover, interactive elements, brand accents
- **Body Text (#4a5568)**: All paragraph text, descriptions, content
- **White (#fafbfc)**: Text on dark backgrounds (footer, hero overlays)

---

## 📝 Typography

### Font Family
```css
font-family: "Inter", sans-serif;  /* All text site-wide */
```

### Type Scale (Responsive with clamp())
```css
/* Topper/Label - 13px to 16px */
--topperFontSize: clamp(0.8125rem, 1.6vw, 1rem);

/* Main Heading - 31px to 49px */
--headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem);

/* Body Text - Fixed */
--bodyFontSize: 1.1rem;  /* 17.6px */
```

### Typography Components

#### `.cs-topper` - Section Labels
```css
font-size: var(--topperFontSize);
text-transform: uppercase;
letter-spacing: 0.1em;
font-weight: 700;
color: var(--primary);
line-height: 1.2em;
margin-bottom: 0.25rem;
```
**Usage**: "Our Services", "About Us", "Contact", etc.

#### `.cs-title` - Section Headings (H2)
```css
font-size: var(--headerFontSize);
font-weight: 900;
line-height: 1.2em;
color: var(--headerColor);
max-width: 43.75rem;  /* 700px */
margin: 0 0 1rem 0;
```
**Usage**: Main section headings on all pages

#### `.cs-text` - Body Copy
```css
font-size: var(--bodyFontSize);
line-height: 1.5em;
color: var(--bodyTextColor);
max-width: 40.625rem;  /* 650px for readability */
```

#### `.cs-h3` - Card/Component Headings
```css
font-size: clamp(1.25rem, 2vw, 1.5625rem);  /* 20px - 25px */
font-weight: 700;
color: var(--headerColor);
margin: 1rem 0;
```

---

## 🔘 Buttons & CTAs

### Primary Button (`.cs-button-solid`)
```css
background-color: var(--primaryLight);  /* #3483C5 */
color: #fff;
padding: 0.75rem 1.5rem;
border: none;
border-radius: 0.25rem;  /* 4px */
font-size: 1rem;
font-weight: 700;
text-decoration: none;
cursor: pointer;
transition: background-color 0.3s, transform 0.2s;
```
**Hover**: `background-color: #2A6BA5` (darker blue), slight scale transform

**Usage**:
- Navigation "Contact Us" button
- Hero "Discover Our Services" button
- Form submit buttons
- Primary CTAs in sections

### Secondary Button (`.hero-button`, `.cta-button`)
```css
background: var(--primaryLight);
color: white;
padding: 0.75rem 1.5rem;
border-radius: 0.25rem;
font-weight: 700;
/* Often includes ::before pseudo-element for hover effects */
```

### Button States
- **Default**: Primary Light Blue background
- **Hover**: Darker blue + slight lift (`transform: translateY(-2px)`)
- **Active**: Slight press effect
- **Disabled**: Reduced opacity (0.6), no pointer events

---

## 📦 Layout & Spacing

### Section Padding
```css
--sectionPadding: clamp(2.5rem, 5.22vw, 4.17rem) 1rem;
/* Top/Bottom: 40px - 66.72px responsive */
/* Left/Right: 16px fixed */
```

### Container Pattern
```css
.cs-container {
  width: 100%;
  max-width: 34.375rem;  /* 550px mobile-first */
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(3rem, 6vw, 4rem);  /* 48px - 64px */
}

@media (min-width: 48rem) {  /* 768px tablet */
  .cs-container {
    max-width: 90rem;  /* 1440px */
  }
}
```

### Gap System
- **Small gaps**: `1rem` (16px) - between related elements
- **Medium gaps**: `clamp(1rem, 1.6vw, 1.25rem)` - card grids
- **Large gaps**: `clamp(3rem, 6vw, 4rem)` - section content separation

---

## 🎴 Component Patterns

### Service Cards (`.cs-item`)
```css
background-color: #f5f5f5;
border-radius: 0.5rem;  /* 8px */
max-width: 31.25rem;  /* 500px */
transition: box-shadow 0.3s, transform 0.3s;
```
**Hover Effect**:
- `box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px`
- `transform: translateY(-7px)`  /* 7px lift */
- Image opacity reduces to 0.3

**Structure**:
1. `.cs-picture` - Image container with aspect ratio
2. `.cs-h3` - Service title
3. `.cs-item-text` - Service description

### Navigation Bar (`#cs-navigation`)
```css
background-color: #fff;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
position: sticky;
top: 0;
z-index: 10000;
padding: 0.75rem 1rem;  /* Mobile */
```

**Desktop** (>1024px):
- Logo: 190px x 112px
- Links: 16px font, 700 weight
- Link hover: `color: var(--primaryLight)`
- Dropdown menus on hover

### Hero Section (`.hero`)
```css
min-height: 100vh;
position: relative;
background: var(--primary);  /* Fallback */
/* Video background with overlay */
```
**Content**:
- `.hero-title`: 40px - 64px responsive, font-weight 900, white text
- `.hero-subtitle`: 18px - 22px, white text with reduced opacity
- `.hero-button`: Primary Light button

### Footer (`#cs-footer`)
```css
background-color: var(--primary);
color: var(--bodyTextColorWhite);
padding: var(--sectionPadding);
```
**Structure**:
- Logo + description
- 3-4 column link groups
- Bottom bar with copyright + privacy links

### FAQ Accordion (`.cs-faq-item`)
```css
background: #f5f5f5;
border-radius: 0.5rem;
margin-bottom: 1rem;
```
**Button**:
- Full-width clickable area
- Arrow icon rotates on expand
- Smooth height transition on `.cs-item-p`

---

## 🖼️ Images

### Optimization Standards
- **Astro Image Component**: Always use `<Image>` from `astro:assets`
- **Explicit Dimensions**: Always provide `width` and `height`
- **Unsplash URLs**: Use `w=826&h=480&q=80` for 2x retina displays
- **Alt Text**: Always descriptive and meaningful

### Image Patterns
```astro
<Image 
  src="[url]" 
  alt="Descriptive text"
  width={413}    /* Display width */
  height={240}   /* Display height */
  class="cs-img"
/>
```

### Aspect Ratios
- **Service cards**: 413:240 (~1.72:1 landscape)
- **Hero video**: 16:9 (full viewport)
- **Logo**: Preserve natural ratio (190:112)

---

## 🎭 Interactions & Animations

### Hover States (Standard)
```css
transition: all 0.3s ease;
/* On hover: */
transform: translateY(-7px);
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
```

### Link Hover
```css
color: var(--primaryLight);
transition: color 0.3s;
```

### Button Hover
```css
background-color: #2A6BA5;  /* Darker blue */
transform: translateY(-2px);
```

### Card Hover (Service Cards)
```css
/* Card lifts */
transform: translateY(-7px);
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

/* Image dims */
.cs-img {
  opacity: 0.3;
  transition: opacity 0.3s;
}
```

### Smooth Scroll
```css
html {
  scroll-behavior: smooth !important;
}
```

---

## 📐 Responsive Breakpoints

```css
/* Mobile-first approach */
@media only screen and (min-width: 0rem) { }      /* 0px+ */
@media only screen and (min-width: 48rem) { }     /* 768px+ Tablet */
@media only screen and (min-width: 64rem) { }     /* 1024px+ Desktop */
@media only screen and (min-width: 90rem) { }     /* 1440px+ Large Desktop */
```

### Container Max-Widths
- **Mobile**: 550px (34.375rem)
- **Tablet+**: 1440px (90rem)

---

## 🎯 Naming Conventions

### Class Prefix System
All utility classes use the **`cs-`** prefix (CodeStitch pattern):

- **Containers**: `cs-container`
- **Content wrappers**: `cs-content`, `cs-wrapper`
- **Typography**: `cs-topper`, `cs-title`, `cs-text`, `cs-h3`
- **Buttons**: `cs-button-solid`, `cs-button`
- **Cards**: `cs-item`, `cs-card-group`
- **Links**: `cs-link`, `cs-li-link`
- **Navigation**: `cs-navigation`, `cs-nav`, `cs-ul`, `cs-li`
- **Images**: `cs-picture`, `cs-img`, `cs-icon`

### Component-Specific Classes
- **Hero**: `hero-`, `hero-title`, `hero-button`, etc.
- **Service**: `service-`, `service-hero`, `service-cta`
- **Process**: `process-`, `process-step`, `process-timeline`
- **Footer**: Footer uses `cs-` prefix throughout

---

## ✅ Consistency Checklist

When creating new pages or components, ensure:

- [ ] Uses CSS custom properties from `src/global.css`
- [ ] Follows `cs-` naming convention
- [ ] Includes `.cs-topper` + `.cs-title` + `.cs-text` content structure
- [ ] Uses `clamp()` for responsive typography
- [ ] Container has `.cs-container` with proper max-width
- [ ] Buttons use `.cs-button-solid` or equivalent pattern
- [ ] Images use Astro `<Image>` component with explicit dimensions
- [ ] Hover states include `transform` + `box-shadow` for cards
- [ ] Colors reference CSS variables, not hardcoded hex values
- [ ] Section padding uses `var(--sectionPadding)`
- [ ] Links have `:hover` state with `var(--primaryLight)` color
- [ ] Mobile-first responsive breakpoints
- [ ] Smooth transitions on interactive elements (0.3s standard)

---

## 🚀 Quick Reference for AI Agents

### Creating a New Section
```astro
<section id="unique-id">
  <div class="cs-container">
    <div class="cs-content">
      <span class="cs-topper">Section Label</span>
      <h2 class="cs-title">Main Heading</h2>
      <p class="cs-text">Description text</p>
    </div>
    <!-- Section-specific content -->
  </div>
</section>

<style>
  /* Component-specific styles */
  /* Inherit from global.css variables */
</style>
```

### Adding a Button
```astro
<a href="#target" class="cs-button-solid">Button Text</a>
```

### Adding a Card
```astro
<li class="cs-item">
  <a href="/link" class="cs-link">
    <div class="cs-picture">
      <Image src="..." alt="..." width={413} height={240} />
    </div>
    <h3 class="cs-h3">Card Title</h3>
    <p class="cs-item-text">Card description</p>
  </a>
</li>
```

---

## 📚 Related Documentation
- **Global Styles**: `src/global.css`
- **Service Template**: `SERVICE_TEMPLATE_GUIDE.md`
- **Performance Guidelines**: `PERFORMANCE_OPTIMIZATIONS.md`
- **SEO Standards**: `SEO_OPTIMIZATION_SUMMARY.md`
