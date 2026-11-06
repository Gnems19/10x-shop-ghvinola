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
- Ghvinola logo in the header. On the home page it is only the ღ icon with its grape bunch while the hero's big wordmark is on screen, so the name isn't there twice, and it unrolls into the full wordmark once the hero wordmark is out of sight (`useHeroLogoInSight`). The home page showcase holds our wine and Chocola chocolate as three gift boxes; catalog, product, and cart data stay on DummyJSON as the assignment requires.
- The hero's location line reads "Kutaisi, Georgia" next to a small outline of Georgia with the Imereti region (around Kutaisi) filled in, like King River's Queensland icon. The borders come from public-domain Natural Earth data, simplified into `GeorgiaMapIcon`.
- Smooth mouse-wheel scrolling like King River's (they use the Lenis library). Ours is a small custom hook, `useSmoothScroll`, because the assignment does not allow extra libraries. It turns off when the user prefers reduced motion; keyboard, touch, and scrollbar scrolling stay native.
- Hero scroll like King River's: on large screens the hero video stays pinned (`position: sticky`) while the page slides up over it and covers the "Kutaisi, Georgia" line. The header starts see-through over the hero and turns wine-colored once you scroll. Like King River's, scrolling down pushes it up exactly as far as the page moves, and after 20px of scrolling up it slides back in on its own (`useHeaderScroll`).
- 3D gift boxes like King River's product boxes: a wine box, a wine and chocolate box, and the Chocola box. King River uses WebGL models; the assignment allows no 3D library, so ours are modelled and rendered in Blender as 48 turntable frames and 20 lid-opening frames each (WebP in `public/showcase/`, about 1.6 MB for all three). `GiftBox` draws the frames on a `<canvas>`: drag to turn, the arrow keys turn it too, and a click or Enter opens the lid. Then `PageTransition` slides a wine panel over the page like King River's page change (Web Animations API), the page jumps to the catalog behind it, and the panel slides away. With reduced motion the box doesn't spin or open, and the click goes straight to the catalog.

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

- [x] **Step 7 · Load products** with `GET /products?limit=12&skip=0` in `useEffect`, with loading, error, and empty states.
  Done when API products appear and each state shows a clear message.
- [x] **Step 8 · ProductCard and ProductGrid** with props, `map()` with stable keys, and a responsive grid (1 / 2–3 / 4 columns).
  Done when clicking a card opens its product page.

### Product (~1.5 h)

- [ ] **Step 10 · Product details** with `useParams` and `GET /products/:id`.
  Done when title, image, description, price, and stock show, and an unknown ID shows the 404 page instead of crashing.
- [ ] **Step 11 · Photo and quantity choice, Add to Cart.**
  Done when the chosen quantity lands in the shared cart.

### Cart (~1.5 h)

- [ ] **Step 12 · CartContext** with add, remove, and setQuantity as immutable updates (optionally saved to `shop_cart` in localStorage), plus the Add to cart button on catalog cards that the appendix lists as CORE.
  Done when the header badge and the cart page always show the same items.
- [ ] **Step 13 · Cart page** with the item list, quantity, remove, subtotal, and total.
  Done when changes update the total, prices match the discounted prices on the cards (`discountedPrice` in `utils/format.ts`), and an empty cart reads "Your cart is empty."

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

- [x] **Step 24 · Deploy to Vercel** with an SPA rewrite.
  Done when the live link works, `/products/5` opens on refresh, and the link is in the README.
- [ ] **Lighthouse report** of the live site (Mobile preset), saved in `docs/lighthouse/`.
- [ ] **Step 25 · README, PLAN, REPORT.md, and DEBUG-LOG.md** (at least 3 real bugs: symptom, steps, tool, cause, fix commit, lesson).
  Done when the docs match what was delivered.
- [ ] **Step 28 · Final QA and submission** before 6 November, 23:59 (Georgia time).

### Done beyond CORE

- [x] Tailwind `@theme` tokens for the wine palette (step 27).
- [x] Custom hooks `useAuth`, `useSmoothScroll`, `useHeaderScroll`, and `useHeroLogoInSight`.

### Optional FULL, only after CORE

- [ ] Step 9 · Search, category, sort, pagination
- [ ] Step 17 · Reviews, related products, promo code
- [ ] Step 18 · Orders, Profile, Formik + Yup login
- [ ] Step 26 · Lazy routes and images, Lighthouse before/after
- [ ] Own wine and chocolate catalog (not in the PRD): a Cloudflare Worker with a D1 database that answers the same URLs and JSON as DummyJSON, with our wines (the Saperavi bottle render for now) and Chocola's chocolates (photos from cdn.chocola.ge). The app reads `VITE_API_URL` and falls back to `https://dummyjson.com`.

## Risks

| Risk | Mitigation |
|------|------------|
| Deadline: the repo is due 6 November at 23:59 (Georgia time) | CORE steps in PRD order, commit and push after each step, deploy early |
| DummyJSON is down or slow | Every request has loading and error states with a clear message; the Error Boundary catches crashes |
| Refreshing `/products/5` returns 404 after deploy | SPA rewrite in the host config, tested on the live link |
| DummyJSON has no wine or chocolate (its search finds none) | The catalog uses DummyJSON as required; the home showcase holds our own wine and Chocola photos. If time is left after CORE, our own Worker serves wine and chocolate through the same API |

## Definition of Done (every task)

- `npm run typecheck`, `npm run lint`, and `npm run build` pass.
- Works at 375px and on desktop with no horizontal scroll.
- Committed with a clear message and pushed; this plan and the README are updated.
