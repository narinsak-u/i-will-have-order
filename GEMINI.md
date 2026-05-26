# Project Overview
**i-will-have-order** is a Nuxt (Vue.js) web application built with TypeScript, Tailwind CSS v4, and shadcn-vue. 

Based on the migration design documents, this project was migrated from a React SPA (built with Vite and TanStack Router) to Nuxt while preserving the visual design and functionality (OKLCH-based theme, layout, routing, and checkout logic).

## Tech Stack
*   **Framework:** Nuxt / Vue 3 (Composition API)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite`)
*   **UI Components:** shadcn-vue (Base primitives from `reka-ui`, icons from `lucide-vue-next`, notifications via `vue-sonner`)
*   **Package Manager:** Bun (inferred from `bun.lock`)

## Directory Structure
*   `app/`: Contains the main application code (Vue components, pages, assets).
    *   `app/assets/css/styles.css`: Contains CSS custom properties defining the OKLCH theme.
    *   `app/components/`: Vue components including shadcn UI primitives and app-specific sections (Landing, Layout).
    *   `app/pages/`: Nuxt file-based routing (`index.vue`, `dashboard.vue`).
*   `docs/`: Documentation, specifications, and migration plans.
*   `public/`: Static public assets.

## Building and Running
The project uses `bun` as its package manager. Use the following scripts defined in `package.json`:

*   **Install dependencies:** `bun install`
*   **Start development server:** `bun run dev` (starts on `http://localhost:3000`)
*   **Build for production:** `bun run build`
*   **Static generation:** `bun run generate`
*   **Preview production build:** `bun run preview`

## Development Conventions
*   **Vue API:** Use Vue 3 Composition API with `<script setup lang="ts">` macros (`ref`, `onMounted`, etc.).
*   **Routing:** Utilize Nuxt's built-in file-based routing and components (`<NuxtLink>`, `useRouter()`, `navigateTo()`).
*   **Styling:** Use Tailwind utility classes. The core theme is driven by CSS variables in `app/assets/css/styles.css`.
*   **UI Components:** shadcn-vue is used for UI. Components are configured per `components.json` and placed under `app/components/ui/`.
