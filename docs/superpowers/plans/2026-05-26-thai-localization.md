# Thai Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the English SPA to a Thai-language version with IBM Plex Sans Thai font, keeping navbar, section labels, plan labels/names, and footer in English.

**Architecture:** Inline string replacements in `.vue` files. No i18n library — this is a permanent Thai version, not multi-language. Font added via Google Fonts link in `nuxt.config.ts` and Tailwind theme override in `styles.css`.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS v4, Google Fonts

---

### Task 1: Add IBM Plex Sans Thai font

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `app/assets/css/styles.css`

- [ ] **Add Google Fonts link to nuxt.config.ts**

```ts
// nuxt.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: ['~/assets/css/styles.css']
})
```

- [ ] **Add font family to Tailwind theme**

In `app/assets/css/styles.css`, add `--font-sans` to the `@theme inline` block:

```css
@theme inline {
  --font-sans: 'IBM Plex Sans Thai', sans-serif;
  --radius-sm: calc(var(--radius) - 4px);
  /* ... rest stays the same */
}
```

- [ ] **Run dev server and verify font loads**

Run: `bun run dev`
Check: Open browser, inspect any text element, confirm `font-family: 'IBM Plex Sans Thai', sans-serif` is applied.

- [ ] **Commit**

```bash
git add nuxt.config.ts app/assets/css/styles.css
git commit -m "feat: add IBM Plex Sans Thai font"
```

---

### Task 2: Translate LandingHero.vue

**File:** `app/components/landing/Hero.vue`

- [ ] **Replace hero text content with Thai**

```vue
<script setup lang="ts">
import { Leaf, Clock, Truck } from "@lucide/vue";
import heroBake from "~/assets/images/hero-bake.jpg";

const benefits = [
  { icon: Leaf, text: "วัตถุดิบออร์แกนิก 100% ไม่ผ่านการแปรรูป" },
  { icon: Clock, text: "อบสดใหม่ในเช้าวันที่จัดส่ง" },
  { icon: Truck, text: "จัดส่งฟรี · หยุดหรือยกเลิกได้ทุกเมื่อ" },
];
</script>
```

Replace the H1 block:
```diff
- <h1 ...>One warm ramekin of<br /><span class="italic">spinach & cheese</span>, at<br />your door every morning.</h1>
+ <h1 ...>ราเมกิ้นผักโขมอบชีสร้อนๆ หนึ่งถ้วย<br /><span class="italic">ผักโขมและชีส</span><br />ส่งถึงหน้าประตูทุกเช้า</h1>
```

Replace the paragraph:
```diff
- <p ...>We bake each serving before sunrise with organic baby spinach and slow-aged cheese, then deliver it to you within hours. Pick a plan — 1 week, 1 month, or 1 year — and we'll handle the rest.</p>
+ <p ...>เราอบผักโขมสดออร์แกนิกและชีสแก่ทุกเช้าก่อนพระอาทิตย์ขึ้น และจัดส่งถึงคุณภายในไม่กี่ชั่วโมง เลือกแผน — 1 สัปดาห์ 1 เดือน หรือ 1 ปี — แล้วเราจะจัดการที่เหลือให้เอง</p>
```

Replace the CTA buttons:
```diff
- See plans — from $24
+ ดูแพ็กเกจ — เริ่มต้น $24
```

The "How it's made" button stays English (matches section topic).

- [ ] **Commit**

```bash
git add app/components/landing/Hero.vue
git commit -m "feat: translate LandingHero to Thai"
```

---

### Task 3: Translate LandingPlans.vue

**File:** `app/components/landing/Plans.vue`

- [ ] **Replace feature lists, billing text, and button with Thai**

```diff
// features arrays
- "Daily fresh delivery",
- "Cancel anytime",
- "Single household size",
+ "จัดส่งสดใหม่ทุกวัน",
+ "ยกเลิกได้ทุกเมื่อ",
+ "ขนาดสำหรับครัวเรือนเดียว",

- "Daily fresh delivery",
- "Free recipe card weekly",
- "Pause anytime",
+ "จัดส่งสดใหม่ทุกวัน",
+ "การ์ดสูตรอาหารฟรีทุกสัปดาห์",
+ "หยุดพักได้ทุกเมื่อ",

- "Daily fresh delivery",
- "Seasonal limited editions",
- "Priority support",
+ "จัดส่งสดใหม่ทุกวัน",
+ "รุ่นจำกัดตามฤดูกาล",
+ "สนับสนุนระดับพรีเมียม",
```

Replace billing/servings text:
```diff
- "7 servings",  →  "7 ที่"
- "30 servings", →  "30 ที่"
- "365 servings", → "365 ที่"
- "billed once",  →  "คิดเงินครั้งเดียว"
- "save 8%",     →  "ประหยัด 8%"
- "save 18%",    →  "ประหยัด 18%"
```

Replace H2 heading:
```diff
- Three ways to keep your kitchen stocked.
+ สามวิธีให้ครัวคุณมีของพร้อมเสมอ
```

Replace button text:
```diff
- Choose Plan
+ เลือกแพ็กเกจ
```

- [ ] **Commit**

```bash
git add app/components/landing/Plans.vue
git commit -m "feat: translate LandingPlans to Thai"
```

---

### Task 4: Translate LandingHowItsMade.vue

**File:** `app/components/landing/HowItsMade.vue`

- [ ] **Replace step titles, bodies, ingredients with Thai**

```diff
const steps = [
- { n: "01", title: "Picked at dawn", body: "Organic baby spinach harvested locally each morning before the heat sets in." },
+ { n: "01", title: "เก็บในยามเช้า", body: "ผักโขมเด็กออร์แกนิกที่เก็บจากท้องถิ่นทุกเช้าก่อนอากาศจะร้อน" },
- { n: "02", title: "Folded with cheese", body: "Slow-aged mozzarella and a whisper of nutmeg, folded by hand." },
+ { n: "02", title: "คลุกเคล้ากับชีส", body: "มอสซาเรลลาชีสแก่และลูกจันทน์เทศเล็กน้อย คลุกเคล้าด้วยมือ" },
- { n: "03", title: "Baked golden", body: "Stone-baked in small ceramic ramekins at 200°C until the top is amber." },
+ { n: "03", title: "อบจนเป็นสีทอง", body: "อบในราเมกิ้นเซรามิกที่อุณหภูมิ 200°C จนด้านบนเป็นสีเหลืองอำพัน" },
- { n: "04", title: "On your doorstep", body: "Chilled, boxed, and delivered within four hours of leaving the oven." },
+ { n: "04", title: "ถึงหน้าประตูคุณ", body: "แช่เย็น บรรจุกล่อง และจัดส่งภายในสี่ชั่วโมงหลังจากออกจากเตา" },
]

const ingredients = [
- "Organic spinach", "Fresh mozzarella", "Aged parmesan", "Free-range eggs",
- "Cultured butter", "Sea salt", "Black pepper", "Nutmeg",
+ "ผักโขมอินทรีย์", "มอสซาเรลลาสด", "พาร์เมซานแก่", "ไข่ไก่เลี้ยงปล่อย",
+ "เนยหมัก", "เกลือทะเล", "พริกไทยดำ", "ลูกจันทน์เทศ",
]
```

Replace H2:
```diff
- Four steps. Nothing more.
+ สี่ขั้นตอน เท่านั้นเอง
```

- [ ] **Commit**

```bash
git add app/components/landing/HowItsMade.vue
git commit -m "feat: translate LandingHowItsMade to Thai"
```

---

### Task 5: Translate LandingBenefits.vue

**File:** `app/components/landing/Benefits.vue`

- [ ] **Replace benefit titles and body text with Thai**

```diff
const benefits = [
- { icon: Leaf, title: "Plant-forward", body: "Each serving delivers 4g of fiber and a full cup of leafy greens." },
+ { icon: Leaf, title: "พืชเป็นหลัก", body: "แต่ละที่ให้ไฟเบอร์ 4 กรัมและผักใบเขียวเต็มถ้วย" },
- { icon: HeartPulse, title: "Heart-friendly", body: "Rich in folate, magnesium, and potassium — minerals known to support cardiovascular health." },
+ { icon: HeartPulse, title: "ดีต่อหัวใจ", body: "อุดมด้วยโฟเลต แมกนีเซียม และโพแทสเซียม — แร่ธาตุที่ช่วยสนับสนุนสุขภาพหัวใจและหลอดเลือด" },
- { icon: Sparkles, title: "High in protein", body: "12g of slow-release dairy protein per ramekin to keep you full longer." },
+ { icon: Sparkles, title: "โปรตีนสูง", body: "โปรตีนนมที่ย่อยช้า 12 กรัมต่อราเมกิ้น ช่วยให้คุณอิ่มนานขึ้น" },
- { icon: Shield, title: "Immunity boost", body: "Iron and vitamin K from spinach, paired with vitamin A from aged cheese." },
+ { icon: Shield, title: "เสริมภูมิคุ้มกัน", body: "ธาตุเหล็กและวิตามินเคจากผักโขม ผสานกับวิตามินเอจากชีสแก่" },
]
```

Replace H2:
```diff
- Comfort food that does your body a favor.
+ อาหารที่ทั้งอร่อยและดีต่อร่างกาย
```

- [ ] **Commit**

```bash
git add app/components/landing/Benefits.vue
git commit -m "feat: translate LandingBenefits to Thai"
```

---

### Task 6: Translate LandingDeliveryTiming.vue

**File:** `app/components/landing/DeliveryTiming.vue`

- [ ] **Replace schedule descriptions with Thai**

```diff
const schedules = [
  {
    plan: "1 Week",
-   ship: "Same-day dispatch",
-   arrive: "Next morning, 7–9 AM",
-   cadence: "7 consecutive daily drops",
+   ship: "จัดส่งในวันเดียวกัน",
+   arrive: "เช้าวันถัดไป 7–9 น.",
+   cadence: "จัดส่งทุกวันติดต่อกัน 7 วัน",
    icon: Package,
  },
  {
    plan: "1 Month",
-   ship: "Daily dispatch at 5 AM",
-   arrive: "Each morning, 7–9 AM",
-   cadence: "30 daily drops · pause anytime",
+   ship: "จัดส่งทุกวันเวลา 5 น.",
+   arrive: "ทุกเช้า 7–9 น.",
+   cadence: "จัดส่ง 30 วัน · หยุดพักได้ทุกเมื่อ",
    icon: Truck,
  },
  {
    plan: "1 Year",
-   ship: "Daily dispatch at 5 AM",
-   arrive: "Each morning, 6:30–8:30 AM (priority)",
-   cadence: "365 daily drops · seasonal menu rotations",
+   ship: "จัดส่งทุกวันเวลา 5 น.",
+   arrive: "ทุกเช้า 6:30–8:30 น. (จัดส่งก่อน)",
+   cadence: "จัดส่ง 365 วัน · เมนูตามฤดูกาล",
    icon: Clock,
  },
]
```

Replace H2:
```diff
- When each plan ships and arrives.
+ แต่ละแผนจัดส่งและมาถึงเมื่อไหร่
```

Replace subtitle paragraph:
```diff
- Every ramekin leaves the oven before sunrise and reaches your door within four hours — chilled, sealed, and ready to warm.
+ ราเมกิ้นทุกถ้วยออกจากเตาก่อนพระอาทิตย์ขึ้นและถึงหน้าประตูคุณภายในสี่ชั่วโมง — แช่เย็น ปิดผนึก และพร้อมอุ่นทาน
```

Replace cut-off note:
```diff
- Cut-off for next-day arrival: 8 PM local time. Sundays are a rest day — Saturday orders arrive Monday morning.
+ เวลาตัดรอบสำหรับการจัดส่งในวันถัดไป: 20:00 น. ตามเวลาท้องถิ่น วันอาทิตย์เป็นวันหยุด — คำสั่งซื้อวันเสาร์จะจัดส่งในเช้าวันจันทร์
```

- [ ] **Commit**

```bash
git add app/components/landing/DeliveryTiming.vue
git commit -m "feat: translate LandingDeliveryTiming to Thai"
```

---

### Task 7: Translate LandingTestimonials.vue

**File:** `app/components/landing/Testimonials.vue`

- [ ] **Replace testimonial quotes, roles, and rating with Thai**

```diff
const testimonials = [
  {
-   quote: "The morning ramekin has become my favorite ritual. It tastes like it came from a Tuscan kitchen, not a delivery box.",
+   quote: "ราเมกิ้นยามเช้ากลายเป็นกิจวัตรที่ฉันโปรดปราน รสชาติเหมือนมาจากครัวทัสคานี ไม่ใช่กล่องจัดส่ง",
    name: "Elena Rossi",
-   role: "Subscriber, 8 months",
+   role: "สมาชิก, 8 เดือน",
    initials: "ER",
  },
  {
-   quote: "I cancelled my meal kit and never looked back. One warm, perfect thing instead of a fridge full of half-used ingredients.",
+   quote: "ฉันยกเลิกชุดอาหารสำเร็จรูปและไม่เคยหันกลับไปมองอีก สิ่งอบอุ่นที่สมบูรณ์แบบสักอย่าง แทนที่จะเป็นตู้เย็นที่เต็มไปด้วยวัตถุดิบที่ใช้ไม่หมด",
    name: "Marcus Chen",
-   role: "Subscriber, 1 year",
+   role: "สมาชิก, 1 ปี",
    initials: "MC",
  },
  {
-   quote: "You can taste that the spinach was picked that morning. Nothing else delivered feels this fresh.",
+   quote: "คุณสามารถสัมผัสได้ว่าผักโขมถูกเก็บในเช้าวันนั้น ไม่มีอะไรที่จัดส่งมาสดเท่านี้มาก่อน",
    name: "Priya Anand",
-   role: "Subscriber, 4 months",
+   role: "สมาชิก, 4 เดือน",
    initials: "PA",
  },
]
```

Replace H2:
```diff
- 2,000+ kitchens start the day with us.
+ 2,000+ ครัวเรือนเริ่มต้นวันใหม่กับเรา
```

Replace rating text:
```diff
- 4.9 average · 1,240 reviews
+ คะแนนเฉลี่ย 4.9 · 1,240 รีวิว
```

- [ ] **Commit**

```bash
git add app/components/landing/Testimonials.vue
git commit -m "feat: translate LandingTestimonials to Thai"
```

---

### Task 8: Translate LandingFaq.vue

**File:** `app/components/landing/Faq.vue`

- [ ] **Replace all FAQ Q&A pairs with Thai**

```diff
const faqs = [
  {
-   q: "How does the subscription work?",
-   a: "Pick a 1-week, 1-month, or 1-year plan. We bake a fresh ramekin each morning and deliver it to your door before lunch. Your plan auto-renews at the end of the cycle — you stay in control from your dashboard.",
+   q: "การสมัครสมาชิกทำงานอย่างไร?",
+   a: "เลือกแผน 1 สัปดาห์ 1 เดือน หรือ 1 ปี เราอบราเมกิ้นสดใหม่ทุกเช้าและจัดส่งถึงหน้าประตูคุณก่อนเที่ยง แผนของคุณจะต่ออายุอัตโนมัติเมื่อสิ้นสุดรอบ — คุณควบคุมได้จากแดชบอร์ดของคุณ",
  },
  {
-   q: "Can I pause or cancel anytime?",
-   a: "Yes. Pause for a weekend, a holiday, or as long as you need from the dashboard — no fees, no questions. Cancel with one click before your next renewal and you won't be charged again.",
+   q: "ฉันสามารถหยุดพักหรือยกเลิกได้ทุกเมื่อหรือไม่?",
+   a: "ได้ คุณสามารถหยุดพักสำหรับสุดสัปดาห์ วันหยุด หรือนานเท่าที่คุณต้องการจากแดชบอร์ด — ไม่มีค่าธรรมเนียม ไม่มีคำถาม ยกเลิกด้วยคลิกเดียวก่อนการต่ออายุครั้งถัดไปและคุณจะไม่ถูกเรียกเก็บเงินอีก",
  },
  {
-   q: "Where do the ingredients come from?",
-   a: "Spinach is harvested at dawn from certified-organic farms within 80 km of our kitchen. Mozzarella and parmesan come from a single family dairy, and eggs are free-range from pasture-raised hens. Every batch is traceable to the farm.",
+   q: "วัตถุดิบมาจากที่ไหน?",
+   a: "ผักโขมถูกเก็บในย่ำเช้าจากฟาร์มออร์แกนิกที่ได้รับการรับรองภายในระยะ 80 กม. จากครัวของเรา มอสซาเรลลาและพาร์เมซานมาจากฟาร์มโคนมครอบครัวเดียว และไข่เป็นแบบเลี้ยงปล่อยจากแม่ไก่ที่เลี้ยงในทุ่งหญ้า ทุกชุดสามารถตรวจสอบย้อนกลับไปถึงฟาร์มได้",
  },
  {
-   q: "Are there any additives or preservatives?",
-   a: "None. Just spinach, cheese, eggs, butter, sea salt, pepper, and a touch of nutmeg. Because we bake and deliver the same day, nothing needs to be preserved.",
+   q: "มีสารปรุงแต่งหรือสารกันเสียหรือไม่?",
+   a: "ไม่มี มีเพียงผักโขม ชีส ไข่ เนย เกลือทะเล พริกไทย และลูกจันทน์เทศเล็กน้อย เพราะเราอบและจัดส่งในวันเดียวกัน จึงไม่จำเป็นต้องใส่สารกันเสีย",
  },
  {
-   q: "What if I have allergies or dietary needs?",
-   a: "Our ramekins contain dairy, eggs, and gluten-free ingredients. We can't currently offer vegan or dairy-free versions, but we're happy to flag allergens — just reach out after subscribing.",
+   q: "ถ้าฉันมีอาการแพ้หรือความต้องการด้านอาหารพิเศษล่ะ?",
+   a: "ราเมกิ้นของเรามีนม ไข่ และส่วนผสมที่ปราศจากกลูเตน ขณะนี้เราไม่สามารถเสนอเวอร์ชันมังสวิรัติหรือไร้นมได้ แต่เรายินดีแจ้งสารก่อภูมิแพ้ — เพียงติดต่อเราหลังจากสมัครสมาชิก",
  },
  {
-   q: "When and how is it delivered?",
-   a: "Deliveries arrive chilled between 9am and noon, within four hours of leaving the oven. Reheat for 8 minutes at 180°C and it's as good as fresh from our kitchen.",
+   q: "จัดส่งเมื่อไหร่และอย่างไร?",
+   a: "การจัดส่งมาถึงแบบแช่เย็นระหว่าง 9 น. ถึงเที่ยง ภายในสี่ชั่วโมงหลังจากออกจากเตา อุ่นต่ออีก 8 นาทีที่ 180°C และมันจะสดเหมือนเพิ่งออกจากครัวของเรา",
  },
]
```

Replace H2:
```diff
- Questions, answered.
+ คำถาม มีคำตอบ
```

- [ ] **Commit**

```bash
git add app/components/landing/Faq.vue
git commit -m "feat: translate LandingFaq to Thai"
```

---

### Task 9: Translate LandingCheckout.vue

**File:** `app/components/landing/Checkout.vue`

- [ ] **Replace checkout text with Thai**

In the template, update the dynamic H2 and conditional content:

```diff
- {{ plan ? `Confirm your ${plan.name.toLowerCase()} plan.` : "Pick a plan to begin checkout." }}
+ {{ plan ? `ยืนยันแผน ${plan.name.toLowerCase()} ของคุณ` : "เลือกแผนเพื่อเริ่มการชำระเงิน" }}
```

```diff
- {{ plan ? "Review your selection and add your delivery details. You can pause or cancel anytime." : "Choose any plan above and we'll bring you down here to complete the order." }}
+ {{ plan ? "ตรวจสอบการเลือกของคุณและเพิ่มรายละเอียดการจัดส่ง คุณสามารถหยุดพักหรือยกเลิกได้ทุกเมื่อ" : "เลือกแผนใดก็ได้ด้านบนแล้วเราจะพาคุณมาที่นี่เพื่อทำการสั่งซื้อ" }}
```

Feature checklist items:
```diff
- <li><Check class="h-4 w-4 text-primary" /> Daily fresh delivery</li>
- <li><Check class="h-4 w-4 text-primary" /> Free delivery included</li>
- <li><Check class="h-4 w-4 text-primary" /> Pause or cancel anytime</li>
+ <li><Check class="h-4 w-4 text-primary" /> จัดส่งสดใหม่ทุกวัน</li>
+ <li><Check class="h-4 w-4 text-primary" /> รวมค่าจัดส่งฟรี</li>
+ <li><Check class="h-4 w-4 text-primary" /> หยุดพักหรือยกเลิกได้ทุกเมื่อ</li>
```

Empty state:
```diff
- <p class="mt-4 text-sm text-muted-foreground">No plan selected yet.</p>
+ <p class="mt-4 text-sm text-muted-foreground">ยังไม่ได้เลือกแผน</p>
```

Form labels and placeholders:
```diff
- <label for="co-name">Full name</label>
+ <label for="co-name">ชื่อ-นามสกุล</label>
- <label for="co-email">Email</label>
+ <label for="co-email">อีเมล</label>
- <label for="co-addr">Delivery address</label>
+ <label for="co-addr">ที่อยู่จัดส่ง</label>
```

(Placeholder values like "Jane Doe", "jane@example.com", "221B Baker Street, London" stay as-is — they're example data.)

```diff
- Total today
+ รวมวันนี้
- Place order
+ สั่งซื้อ
- Demo checkout — no payment is processed. Your selection is saved to your dashboard.
+ ตัวอย่างการชำระเงิน — ไม่มีการดำเนินการชำระเงินจริง การเลือกของคุณจะถูกบันทึกไปยังแดชบอร์ด
```

- [ ] **Commit**

```bash
git add app/components/landing/Checkout.vue
git commit -m "feat: translate LandingCheckout to Thai"
```

---

### Task 10: Translate dashboard.vue and index.vue meta

**File:** `app/pages/dashboard.vue`, `app/pages/index.vue`

- [ ] **Replace dashboard text with Thai**

Dashboard labels and card text:
```diff
- <h1 class="mt-3 text-4xl font-light tracking-tight text-foreground">Your subscription</h1>
+ <h1 class="mt-3 text-4xl font-light tracking-tight text-foreground">การสมัครสมาชิกของคุณ</h1>
- Reset demo
+ รีเซ็ตตัวอย่าง
- No active subscription
+ ไม่มีแผนสมาชิกที่ใช้งาน
- Choose a plan to start receiving daily baked spinach & cheese.
+ เลือกแผนเพื่อเริ่มรับผักโขมอบชีสสดใหม่ทุกวัน
- Browse plans
+ ดูแพ็กเกจ
- Current plan
+ แผนปัจจุบัน
- Active
+ ใช้งานอยู่
- of {{ activeMeta.days }} days remaining
+ จาก {{ activeMeta.days }} วัน
- {{ used }} servings delivered · {{ remaining }} to go
+ ส่งแล้ว {{ used }} ที่ · เหลืออีก {{ remaining }} ที่
- Started
+ เริ่ม
- Renews
+ ต่ออายุ
- Plan value
+ มูลค่าแผน
- Next delivery
+ จัดส่งครั้งถัดไป
- Left the oven · stays fresh 24h refrigerated
+ ออกจากเตา · สดได้ 24 ชม. ในตู้เย็น
- Weekly rhythm
+ จังหวะรายสัปดาห์
- Mon – Fri
+ จันทร์ – ศุกร์
- Saturday
+ เสาร์
- Sunday
+ อาทิตย์
- Rest day
+ วันหยุด
- Tomorrow, {{ nextDelivery.toLocaleTimeString(...) }}
+ พรุ่งนี้, {{ nextDelivery.toLocaleTimeString(...) }}
```

- [ ] **Replace index.vue meta tags with Thai**

```diff
useHead({
-  title: 'Spinach & Cheese Co. — Baked fresh, delivered daily',
+  title: 'Spinach & Cheese Co. — อบสดใหม่ จัดส่งทุกวัน',
  meta: [
-    { name: 'description', content: 'Subscribe to a daily ramekin of organic baked spinach and melted cheese. 1 week, 1 month, and 1 year plans.' },
+    { name: 'description', content: 'สมัครรับราเมกิ้นผักโขมอบชีสออร์แกนิกทุกวัน แผน 1 สัปดาห์ 1 เดือน และ 1 ปี' },
    { property: 'og:title', content: 'Spinach & Cheese Co.' },
-    { property: 'og:description', content: 'Baked fresh, delivered daily.' },
+    { property: 'og:description', content: 'อบสดใหม่ จัดส่งทุกวัน' },
  ]
})
```

- [ ] **Commit**

```bash
git add app/pages/dashboard.vue app/pages/index.vue
git commit -m "feat: translate dashboard and meta to Thai"
```

---

### Verification

- [ ] **Run dev server and visually verify all pages**

Run: `bun run dev`

Check each section on the landing page:
- Hero: Thai heading, paragraph, benefits, CTAs
- Plans: Thai features, billing, button
- How it's made: Thai steps, ingredients
- Benefits: Thai titles and descriptions
- Delivery Timing: Thai schedule text
- Testimonials: Thai quotes and roles
- FAQ: Thai questions and answers
- Checkout: Thai labels, descriptions, button
- Dashboard: Thai labels and card text

Check that the following are still English:
- SiteHeader nav links
- SiteHeader brand name
- Section topic labels (Subscription, How it's made, Benefits, etc.)
- Plan labels (TRY IT OUT, MOST POPULAR, BEST VALUE)
- Plan names (1 Week, 1 Month, 1 Year)
- SiteFooter content
- Placeholder values in forms

- [ ] **Verify font is applied**

Inspect any text element and confirm `IBM Plex Sans Thai` is the active font-family.

- [ ] **Run type check**

```bash
bun run postinstall && bun x vue-tsc --noEmit
```

Expected: No type errors.
