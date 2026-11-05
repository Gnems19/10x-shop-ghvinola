# 10X Shop — Plan

Online shop SPA built with **Vite + React 19 + TypeScript (strict) + Tailwind CSS v4**, using the DummyJSON products API.

## Goal

Deliver the **CORE** checklist first (minimum for a passing grade). FULL features only after CORE is complete.

## CORE scope

- Login (local AuthContext simulation)
- Catalog (`GET /products`)
- Product details (`GET /products/:id`)
- Cart (add / change quantity / remove)
- Checkout (controlled form + local order confirmation)
- Responsive UI with Tailwind v4
- Deploy (Vercel or Netlify) + README / PLAN / REPORT + meaningful Git history

## Out of scope for now (FULL)

Search / category / sort / pagination, Orders, Profile, Reviews, Related products, Promo codes, Formik + Yup, dark theme, lazy routes.

## Design direction

- Layout and proportions inspired by [King River](https://kingriver.com.au/): full-bleed hero, 1600px container, thin hairline dividers, serif body text with small uppercase sans-serif labels.
- Wine palette (oxblood, claret, rosé, cream) defined as Tailwind `@theme` tokens in `src/index.css`.
- Ghvinola wordmark in the header. Showcase boxes on the home page are reserved for wine bottle and Chocola chocolate photos; catalog, product, and cart data stay on DummyJSON as the assignment requires.
- The hero's location line reads "Kutaisi, Georgia" next to a small outline of Georgia with the Imereti region (around Kutaisi) filled in, like King River's Queensland icon. The borders come from public-domain Natural Earth data, simplified into `GeorgiaMapIcon`.
- Smooth mouse-wheel scrolling like King River's (they use the Lenis library). Ours is a small custom hook, `useSmoothScroll`, because the assignment does not allow extra libraries. It turns off when the user prefers reduced motion; keyboard, touch, and scrollbar scrolling stay native.

## Three-week stages

| Week | Focus |
|------|--------|
| 1 | Project setup, types, Layout/Router, AuthContext + Login, Catalog + ProductCard |
| 2 | Product details, CartContext + Cart page, Checkout form + confirmation |
| 3 | Responsive polish, loading/error/empty states, typecheck/build, docs, deploy |

## Current status

- [x] Vite + React + TypeScript + Tailwind CSS v4 scaffold
- [x] `typecheck` / `build` scripts
- [x] GitHub repository + initial commit
- [x] Shared TypeScript types
- [x] Layout, Header, Footer, React Router routes (wine theme)
- [x] AuthContext + Login
- [x] Checkout guard (`ProtectedRoute`): guests go to `/login` and come back to checkout after logging in
- [ ] Catalog + ProductCard
- [ ] Product details
- [ ] CartContext + Cart page
- [ ] Checkout + confirmation
- [ ] Responsive polish + deploy + REPORT.md
