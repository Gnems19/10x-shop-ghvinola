# 10X Shop — Plan

Online shop SPA built with **Vite + React 19 + TypeScript (strict) + Tailwind CSS v4**, using the DummyJSON products API.

## Goal

Deliver the **CORE** checklist first (minimum for a passing grade). FULL features only after CORE is complete.

## Scope

| Module | CORE (required) | FULL (optional, after CORE) |
|--------|-----------------|-----------------------------|
| React | Components, props/children, useState/useEffect, map/key, Router, Context, controlled Login and Checkout, simple Cart | Extra custom hooks, reducer, Formik + Yup login |
| TypeScript | Strict mode, typed props/state/API data, `typecheck` with 0 errors, no `any` | Generics, ApiClient, type guards, unions, OOP classes |
| Tailwind CSS | v4, utility classes, flex/grid, responsive, hover/focus | `@theme` tokens, dark mode, custom utilities |
| Optimization | Responsive pages, Error Boundary, DEBUG-LOG.md, basic debugging, Lighthouse report | Lazy routes/images, Lighthouse before/after, cross-browser matrix |
| Project | README, PLAN, REPORT, deploy, real Git history | Issues/Projects board, PRs, progress notes, demo video |

Not planned until CORE is finished: search / category / sort / pagination, Orders, Profile, Reviews, Related products, Promo codes, dark theme.

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

## Todo list

Step numbers match the 28 steps in the PRD. Hours are rough estimates for the remaining work.

### Foundation

- [x] **Steps 1–2 · Setup and plan.** Vite, React, strict TypeScript, Tailwind CSS v4, PLAN.md, public GitHub repo.
  Done when `npm run typecheck` and `npm run build` pass and the repo is public.
- [x] **Step 3 · Shared types** for products, cart, login, and checkout in `src/types/`.
  Done when props, state, and API data are typed.
- [x] **Step 4 · Layout and routes.** One Layout (Header, Outlet, Footer), routes `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, and `*`, ScrollToTop, 404 page.
  Done when every route renders and navigation happens without a page reload.

### Auth

- [x] **Step 5 · AuthContext and Login form.**
  Done when empty fields show "Username is required" / "Password is required" and a valid submit logs the user in.
- [x] **Step 6 · Checkout guard.**
  Done when a guest opening `/checkout` is sent to `/login` and returns to checkout after logging in.

### Catalog (~1.5 h)

- [ ] **Step 7 · Load products** with `GET /products?limit=12&skip=0` in `useEffect`, with loading, error, and empty states.
  Done when API products appear and each state shows a clear message.
- [ ] **Step 8 · ProductCard and ProductGrid** with props, `map()` with stable keys, and a responsive grid (1 / 2–3 / 4 columns).
  Done when clicking a card opens its product page.

### Product (~1.5 h)

- [ ] **Step 10 · Product details** with `useParams` and `GET /products/:id`.
  Done when title, image, description, price, and stock show, and an unknown ID shows the 404 page instead of crashing.
- [ ] **Step 11 · Photo and quantity choice, Add to Cart.**
  Done when the chosen quantity lands in the shared cart.

### Cart (~1.5 h)

- [ ] **Step 12 · CartContext** with add, remove, and setQuantity as immutable updates (optionally saved to `shop_cart` in localStorage).
  Done when the header badge and the cart page always show the same items.
- [ ] **Step 13 · Cart page** with the item list, quantity, remove, subtotal, and total.
  Done when changes update the total and an empty cart reads "Your cart is empty."

### Checkout (~1 h)

- [ ] **Step 14 · Checkout form** with Full name, Email, Address, and City as controlled fields with required validation.
  Done when empty required fields block the submit and show their errors.
- [ ] **Step 15 · Local order confirmation.**
  Done when Place order shows a Thank you summary and empties the cart.

### Quality (~1.5 h)

- [ ] **Error Boundary** (optimization module): a class component with the fallback "Something went wrong." and a "Reload" button.
  Done when an error thrown in a page shows the fallback instead of a blank screen.
- [ ] **Lint rules from the appendix:** no `any` (error) and hook dependency checks (warning).
  Done when `npm run lint` reports nothing.
- [ ] **Steps 16, 19–21 · Concept check, responsive finish, interactive states, happy path.**
  Done when Catalog → Product → Cart → Login → Checkout → confirmation works at 375px and on desktop in Chrome and Firefox, with no horizontal scroll and visible hover/focus states.
- [ ] **Steps 22–23 · Loading/error/empty states and final checks.**
  Done when an API error never crashes the app, `typecheck` has 0 errors, and `build` passes.

### Docs and deploy (~1.5 h)

- [ ] **Step 24 · Deploy to Vercel** with an SPA rewrite.
  Done when the live link works, `/products/5` opens on refresh, and the link is in the README.
- [ ] **Lighthouse report** of the live site (Mobile preset), saved in `docs/lighthouse/`.
- [ ] **Step 25 · README, PLAN, REPORT.md, and DEBUG-LOG.md** (at least 3 real bugs: symptom, steps, tool, cause, fix commit, lesson).
  Done when the docs match what was delivered.
- [ ] **Step 28 · Final QA and submission** before 6 November, 23:59 (Georgia time).

### Done beyond CORE

- [x] Tailwind `@theme` tokens for the wine palette (step 27).
- [x] Custom hooks `useAuth` and `useSmoothScroll`.

### Optional FULL, only after CORE

- [ ] Step 9 · Search, category, sort, pagination
- [ ] Step 17 · Reviews, related products, promo code
- [ ] Step 18 · Orders, Profile, Formik + Yup login
- [ ] Step 26 · Lazy routes and images, Lighthouse before/after

## Risks

| Risk | Mitigation |
|------|------------|
| Deadline: the repo is due 6 November at 23:59 (Georgia time) | CORE steps in PRD order, commit and push after each step, deploy early |
| DummyJSON is down or slow | Every request has loading and error states with a clear message; the Error Boundary catches crashes |
| Refreshing `/products/5` returns 404 after deploy | SPA rewrite in the host config, tested on the live link |
| DummyJSON has no wine or chocolate | The catalog uses DummyJSON as required; the home showcase holds our own wine and Chocola photos |

## Definition of Done (every task)

- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- Works at 375px and on desktop with no horizontal scroll.
- Committed with a clear message and pushed; this plan and the README are updated.
