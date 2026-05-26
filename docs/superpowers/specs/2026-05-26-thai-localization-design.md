# Thai Localization Design

**Date:** 2026-05-26
**Project:** i-will-have-order (Spinach & Cheese Co.)
**Goal:** Convert the English SPA to a Thai-language version while preserving brand identity.

## Approach: Inline Translations

Direct string replacement in `.vue` files. No i18n library — this is a permanent Thai version, not multi-language.

## Stay English (Untouched)

| Component | Content |
|---|---|
| `SiteHeader` | Brand name "Spinach & Cheese Co.", nav links (Plans, How it's made, Benefits, Dashboard), Order button |
| `SiteFooter` | Brand name, tagline, nav links, Support link, copyright |
| Section labels | "Subscription", "How it's made", "Benefits", "Delivery timing", "FAQ", "Checkout", "Account", "Loved by households" |
| Plan labels | "TRY IT OUT", "MOST POPULAR", "BEST VALUE" |
| Plan names | "1 Week", "1 Month", "1 Year" |

## Translate to Thai

### LandingHero
- H1 heading and paragraph
- 3 benefit bullets (organic ingredients, baked same morning, free delivery)
- CTA buttons ("See plans — from $24", "How it's made")
- Badge "Fresh-baked daily subscription"

### LandingPlans
- H2 heading "Three ways to keep your kitchen stocked."
- Feature lists per plan (3 items each)
- Plan attributes (servings count, billing label e.g. "billed once", "save 8%", "save 18%")
- CTA button "Choose Plan"

### LandingHowItsMade
- Step numbers (01–04), titles, and body text
- H2 heading "Four steps. Nothing more."
- Ingredients list

### LandingBenefits
- H2 heading "Comfort food that does your body a favor."
- 4 benefit card titles and body text

### LandingDeliveryTiming
- H2 heading "When each plan ships and arrives."
- Subtitle paragraph
- Schedule card content (ship, arrive, cadence descriptions)
- Cut-off note at bottom

### LandingTestimonials
- H2 heading "2,000+ kitchens start the day with us."
- 3 quote texts, names, and role descriptions
- Rating text "4.9 average · 1,240 reviews"

### LandingFaq
- H2 heading "Questions, answered."
- All 6 questions and answers

### LandingCheckout
- H2 heading (dynamic, e.g. "Confirm your 1 week plan.")
- Description paragraph
- Order summary features, labels, placeholders, button
- "Total today" and "Place order"
- Demo notice

### Dashboard (dashboard.vue)
- H1 heading "Your subscription"
- Labels: "Account", "No active subscription", empty state body, "Browse plans" link
- Card labels: "Current plan", "Active" badge, "of X days remaining", servings delivered text
- Column labels: "Started", "Renews", "Plan value"
- Sidebar: "Next delivery", delivery body text, "Weekly rhythm", day names, "Reset demo" button

## Font

Add IBM Plex Sans Thai from Google Fonts. Two changes:

1. **nuxt.config.ts** — Add `app.head.link` for Google Fonts stylesheet
2. **app/assets/css/styles.css** — Override `--font-sans` in `@theme inline` to `'IBM Plex Sans Thai', sans-serif`

The existing `font-sans` class in Tailwind will then use the Thai font globally.

## Files Modified

- `nuxt.config.ts`
- `app/assets/css/styles.css`
- `app/components/landing/Hero.vue`
- `app/components/landing/Plans.vue`
- `app/components/landing/HowItsMade.vue`
- `app/components/landing/Benefits.vue`
- `app/components/landing/DeliveryTiming.vue`
- `app/components/landing/Testimonials.vue`
- `app/components/landing/Faq.vue`
- `app/components/landing/Checkout.vue`
- `app/pages/dashboard.vue`
- `app/pages/index.vue` (meta tags)
