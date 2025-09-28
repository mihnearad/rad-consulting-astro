# Service Page Template Guide

## Quick Setup

To create a new service page, follow these simple steps:

### 1. Create the Service Page

Create a new file in `/src/pages/services/[service-name].astro` (e.g., `data-analysis.astro`, `web-development.astro`)

### 2. Use the Template

Copy this template structure:

```astro
---
import ServiceTemplate from "../../../components/ServiceTemplate.astro";
---

<ServiceTemplate
  title="Your Service Name"
  description="Brief description of your service"
  heroImage="https://images.unsplash.com/photo-YOUR-IMAGE-ID"
  heroImageAlt="Alt text for your image"
  benefits={[
    "Benefit 1",
    "Benefit 2",
    "Benefit 3",
    // Add more benefits
  ]}
  features={[
    {
      title: "Feature 1",
      description: "Description of feature 1",
      icon: "🔍" // Use emoji or HTML entity
    },
    {
      title: "Feature 2", 
      description: "Description of feature 2",
      icon: "💻"
    },
    // Add more features
  ]}
  process={[
    {
      step: 1,
      title: "Step 1 Title",
      description: "Description of what happens in step 1"
    },
    {
      step: 2,
      title: "Step 2 Title", 
      description: "Description of what happens in step 2"
    },
    // Add more process steps
  ]}
  cta={{
    title: "Call to Action Title",
    description: "Compelling description that encourages contact",
    buttonText: "Button Text (e.g., 'Get Started Today')"
  }}
/>
```

### 3. Update Services Section

Add the link to your new service in `/components/Services/services.astro`:

```astro
<li class="cs-item">
  <a href="/services/your-service-name" class="cs-link">
    <!-- Keep existing image and content structure -->
  </a>
</li>
```

## Example Services to Create

### Data Analysis (`/services/data-analysis`)
- Focus on turning data into insights
- Benefits: Better decisions, trend identification, ROI tracking
- Features: Data visualization, reporting, predictive analytics

### Website Development (`/services/web-development`)  
- Focus on modern, responsive websites
- Benefits: Professional online presence, mobile-friendly, SEO optimized
- Features: Custom design, e-commerce, CMS integration

### Digital Marketing (`/services/digital-marketing`)
- Focus on online growth and visibility
- Benefits: Increased traffic, better conversions, brand awareness
- Features: SEO, social media, content marketing

## Tips for Content

### Benefits (6-8 items)
- Focus on business outcomes
- Use action-oriented language
- Be specific about value delivered

### Features (6 items recommended)
- Technical capabilities you offer
- Use relevant emojis for visual appeal
- Keep descriptions concise but informative

### Process Steps (4-6 steps)
- Show your professional approach
- Build confidence in your methodology
- End with ongoing support/maintenance

### Images
- Use high-quality Unsplash images
- Choose images that relate to your service
- Maintain consistent aspect ratios

## File Structure
```
src/pages/services/
├── it-consulting.astro
├── data-analysis.astro      (create next)
├── web-development.astro    (create next)
└── [other-services].astro
```

## Navigation Updates Needed
1. Add link in main services section
2. Update footer service links if needed  
3. Consider adding to navbar dropdown (future enhancement)