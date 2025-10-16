zayka-darbar/
<div align="center">

![Landing Preview](image.png)

# Zayka – Modern Restaurant & Food Ordering Platform

Effortless ordering. Real‑time updates. Beautiful UI. Zayka is a full‑featured restaurant web application built with performance, accessibility, and developer experience in mind.

<p>
  <strong>Live ordering · Menu management · Cart & checkout · Auth · Dark mode</strong>
</p>

</div>

## ✨ Overview

Zayka is a Next.js application that showcases a production‑style architecture for a restaurant ordering experience. It includes public browsing, authenticated user flows, an admin back‑office, live order tracking, and a modular design system built on Radix UI primitives and Tailwind CSS.


## 🚀 Features

- 🍽️ Dynamic menu browsing by category
- 🛒 Persistent cart with summary + quantity controls
- 💳 Checkout flow with order recap
- 📦 Live order tracking UI
- 👤 Authentication (login / signup / password reset)
- 🧑‍💼 Admin dashboard (menu & live orders management)
- 🌙 Theme toggle (light/dark) via `next-themes`
- 🎨 Design system: buttons, dialogs, inputs, tabs, selects, etc.
- 🧩 Modular component architecture (feature folders)
- 🌀 Framer Motion animations & subtle transitions
- 📱 Fully responsive layout
- 🔐 Validation with `react-hook-form` + `zod`
- 🔔 Toast & feedback system
- 📊 Charts / analytics ready (Recharts placeholder)
- 🧪 Typed utilities & providers for cart/auth state

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript, React 18 |
| Styling | Tailwind CSS, Tailwind Merge, custom tokens |
| UI Primitives | Radix UI suite (Dialog, Dropdown, Select, Tabs, etc.) |
| Theming | `next-themes` dark/light mode |
| Animations | Framer Motion, tailwindcss-animate |
| Forms & Validation | React Hook Form + Zod resolvers |
| State / Providers | Custom context providers (`auth-provider`, `cart-provider`) |
| Data / Backend | Supabase client (`@supabase/supabase-js`, SSR helpers) |
| Notifications | `react-hot-toast` / `sonner` |
| Visualization | Recharts (analytics), Embla carousel |

<!-- ## 📂 Project Structure

```
app/            # Route segments & layouts (Next.js App Router)
components/     # Reusable & feature-specific UI components
  ui/           # Design system primitives (Radix based)
  admin/        # Admin dashboard pieces
  auth/         # Auth forms (login/signup/reset)
  layout/       # Navbar / Footer
  menu/         # Menu browsing components
  cart/         # Cart & summary components
  checkout/     # Checkout form & order summary
  orders/       # Order tracking components
hooks/          # Custom hooks (e.g. use-cart)
lib/            # Data, utils, Supabase client/server helpers
public/         # Static assets & images
styles/         # Global CSS & Tailwind base layers
``` -->

<!-- ## 🔐 Authentication Flow

Supabase is used for user management and session handling (client + server helpers). Providers wrap the app to supply auth and cart context to all child components. -->
<!-- 
## 🛒 Cart & Orders

The cart state lives in a context provider and exposes actions via the `use-cart` hook. Order creation & tracking UI demonstrates how status changes can be rendered in real time. -->

## 🧱 UI System

Components are composed from Radix primitives with Tailwind utility classes, `class-variance-authority` for variants, and `lucide-react` for icons. This ensures accessibility (focus states, ARIA) and consistency.

## ⚙️ Getting Started

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Zayka-darbar
   ```
2. Install dependencies (pnpm recommended):
   ```bash
   pnpm install
   # or
   npm install
   ```
3. Start development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
4. Visit: http://localhost:3000

## 🧪 Scripts

```bash
pnpm dev      # Run dev server
pnpm build    # Production build
pnpm start    # Start built app
pnpm lint     # Lint codebase
```

## 🌍 Environment Variables

Create a `.env.local` file for Supabase (example):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_public_anon_key
```
<!-- # SUPABASE_SERVICE_ROLE_KEY=optional_service_role_if_needed -->

## 📜 License
The application is licensed under Solutions with Aaqil, for
Educational / non-commercial use request permission.

---

Made with ❤️ by Aaqil.

