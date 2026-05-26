# Nuxt Migration Design

## Context
The project is currently a React Single Page Application built with Vite, TanStack Router, Tailwind CSS v4, and shadcn/ui. The goal is to migrate this application to Nuxt 3 (Vue.js) while maintaining the exact same visual design, theme (OKLCH based), and functionality.

## Architecture & Setup
- **Framework**: Nuxt 3 (Vue 3 Composition API).
- **Directory**: The new application will be created in a subdirectory named `nuxt-app` to avoid overwriting existing files and ensure a safe transition.
- **Styling**: Tailwind CSS v4 will be integrated using the `@tailwindcss/vite` plugin within `nuxt.config.ts`.
- **Theme**: The existing `src/styles.css` containing all the CSS custom properties (OKLCH colors) will be copied directly to preserve the theme.

## UI Components
- **Icons**: `lucide-vue-next` will replace `lucide-react`.
- **Base Components**: The project only utilizes `accordion` and `sonner` from the shadcn library. We will initialize `shadcn-vue` and add these two specific components.

## Application Migration
- **Pages**: 
  - `src/routes/index.tsx` will become `nuxt-app/pages/index.vue`.
  - `src/routes/dashboard.tsx` will become `nuxt-app/pages/dashboard.vue`.
- **Components**: All React components in `src/components/` will be rewritten as Vue components (`.vue`) in `nuxt-app/components/`. This includes the landing page sections (`Hero`, `Plans`, `Checkout`, etc.) and the site layout (`SiteHeader`, `SiteFooter`).
- **State Management**: React's `useState` and `useEffect` will be replaced with Vue's `ref` and `onMounted` macros to handle the simple local storage checkout logic.
- **Routing**: `useNavigate` and `<Link>` from TanStack Router will be replaced with Nuxt's `useRouter`, `navigateTo`, and `<NuxtLink>`.

## Validation
- The Nuxt development server will be started.
- Both routes (`/` and `/dashboard`) will be tested to ensure styling, interactions (checkout, FAQ accordion), and toast notifications work identically to the React version.
