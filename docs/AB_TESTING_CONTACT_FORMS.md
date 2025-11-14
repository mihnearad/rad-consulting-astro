# A/B Testing Contact Forms

## Overview

Two contact modal variants have been created to test which converts better:

1. **Standard Form** (`contact-modal.astro`) - 4 fields: Name, Email, Company, Service Interest
2. **Simple Form** (`contact-modal-simple.astro`) - 2 fields: Name, Email only

## Quick Switch Guide

### To Test the Simple 2-Field Form:

1. Open `/root/rad-consulting-astro/src/layouts/BaseLayout.astro`

2. Find this line (around line 6):
```astro
import ContactModal from "../../components/contact-modal.astro";
```

3. Change it to:
```astro
import ContactModal from "../../components/contact-modal-simple.astro";
```

4. Find this line (around line 197):
```astro
<ContactModal />
```

5. Update the ID reference in the script that opens the modal. Search for all instances of:
```javascript
document.getElementById('contact-modal')
```

And change them to:
```javascript
document.getElementById('contact-modal-simple')
```

This occurs in:
- `/root/rad-consulting-astro/components/navbar.astro`
- `/root/rad-consulting-astro/components/hero.astro`
- `/root/rad-consulting-astro/components/floating-cta.astro`

### To Switch Back to Standard Form:

Reverse the above changes, using `contact-modal.astro` and `#contact-modal`.

## Automated A/B Testing (Recommended)

For proper A/B testing with 50/50 split, use one of these methods:

### Method 1: Google Optimize (Free)

1. Keep the standard form in place
2. Create a Google Optimize experiment
3. Set variant to swap `#contact-modal` with `#contact-modal-simple` via DOM manipulation
4. Track conversions via GTM events: `generate_lead` with `form_type` dimension

### Method 2: Manual JavaScript Toggle

Add this script to BaseLayout.astro before the closing `</body>` tag:

```html
<script is:inline>
  // A/B Test: Randomly show simple or standard form
  (function() {
    const variant = Math.random() < 0.5 ? 'simple' : 'standard';

    // Store variant in session
    sessionStorage.setItem('form_variant', variant);

    // Track variant assignment
    if (typeof window.dataLayer !== 'undefined') {
      window.dataLayer.push({
        'event': 'ab_test_variant_assigned',
        'variant': variant
      });
    }

    // Load appropriate form (you'll need to implement conditional loading)
    console.log('Contact form variant:', variant);
  })();
</script>
```

## Tracking & Measurement

Both forms send these GTM events:

### Modal Open Events:
- **Standard**: `lead_modal_open` with `modal_type: 'standard'`
- **Simple**: `lead_modal_open_simple` with `modal_type: 'simple_2field'`

### Conversion Events:
- **Standard**: `generate_lead` with `form_type: 'contact_request'`
- **Simple**: `generate_lead` with `form_type: 'simple_2field'`

## What to Measure

1. **Conversion Rate**: (Form submissions / Modal opens) × 100
2. **Time to Complete**: Track with timing events
3. **Field Abandonment**: Standard form may have higher drop-off at Company or Service Interest fields

## Expected Results

Based on industry benchmarks:

- **Standard Form**: More qualified leads (you know their service interest)
- **Simple Form**: Higher conversion rate (20-40% improvement expected) but less context

## Recommendation

Run test for at least 100 conversions per variant or 2 weeks minimum before making a decision. Consider:

- If you have sales capacity to handle more leads → Use Simple Form
- If you need pre-qualified leads → Use Standard Form
- If you're not sure → Test for 30 days and compare lead quality (not just quantity)

## Current Status

✅ Both variants created and ready to test
🔄 Currently using: **Standard Form** (4 fields)
📊 A/B test status: **Not running** (manual switch required)

## Next Steps

1. Set up Google Optimize or implement JavaScript toggle
2. Run test for 2-4 weeks
3. Compare: Conversion rate × Lead quality score
4. Implement winning variant permanently

---

**Created**: 2025-11-13
**Last Updated**: 2025-11-13
