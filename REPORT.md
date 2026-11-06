# 10X Shop — Final report

Ghvinola (ღვინოლა) is an online shop single-page app built with React 19, TypeScript, and Tailwind CSS v4 on top of the DummyJSON products API. Live at [10x-shop-ghvinola.vercel.app](https://10x-shop-ghvinola.vercel.app).

## Planned vs delivered

Every CORE item in [PLAN.md](PLAN.md) is delivered. None of the optional FULL features was started, because the plan put them after CORE and the time went to CORE and the design.

| Planned | Delivered |
|---------|-----------|
| Layout, routes, 404 page (steps 1–4) | Yes |
| Login with a controlled form, `AuthContext`, checkout guard (steps 5–6) | Yes |
| Catalog with loading, error, and empty states, product cards in a responsive grid (steps 7–8) | Yes |
| Product page with photo choice, quantity, and stock (steps 10–11) | Yes, and unknown IDs show the 404 page |
| `CartContext`, header badge, Add to cart on cards, cart page (steps 12–13) | Yes, saved to `shop_cart` in localStorage, never past the stock |
| Checkout form with validation and a local order confirmation (steps 14–15) | Yes, with the exact error messages from the assignment |
| Error Boundary, lint rules (no `any`, hook dependencies) | Yes |
| Deploy with an SPA rewrite (step 24) | Yes |
| Lighthouse report, README, PLAN, REPORT, DEBUG-LOG (step 25) | Yes |
| Happy path at 375px and on desktop in Chrome and Firefox (steps 19–21) | Chrome only; Firefox was not tested |
| FULL: search, categories, sorting, pagination, Formik + Yup, orders, profile | Not started |

Beyond the plan, the home page follows [King River](https://kingriver.com.au/)'s design: a looping grape-harvest video in the hero that stays pinned while the page slides over it, a header that moves with the scroll like theirs, smooth mouse-wheel scrolling from our own hook, and a map of Georgia with the Imereti region around Kutaisi.

## Metrics

| Metric | Result |
|--------|--------|
| `npm run typecheck` | 0 errors |
| `npm run lint` (oxlint) | 0 warnings, with `no-explicit-any` as an error and `exhaustive-deps` as a warning |
| Production bundle (gzip) | 95.7 kB of JavaScript, 6.7 kB of CSS |
| Lighthouse, Mobile, live home page | Performance 95, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse before the fixes in [eb05c36](https://github.com/Gnems19/10x-shop-ghvinola/commit/eb05c36) | Performance 96, Accessibility 96, Best Practices 100, SEO 92 |
| Core Web Vitals (Lighthouse, Mobile) | Largest Contentful Paint 2.3 s, Total Blocking Time 0 ms, Cumulative Layout Shift 0 |
| Git history | 29 commits on `main` when this report was written, from 5 November 18:36 to 6 November 2026 (Georgia time), each step pushed on its own |

The reports are in [`docs/lighthouse/`](docs/lighthouse/). The hero video is 7.1 MB of the home page's 7.9 MB. Lighthouse's Largest Contentful Paint element is the hero's "Browse the catalog" button, so the video doesn't slow the score, but it still costs phone users a lot of data.

## The 3 hardest problems

1. **Logging out on checkout opened the login page.** React Router 7 runs navigation as a React transition, which has lower priority than a normal state update. So `logout()` rendered first, while the URL was still `/checkout`, and the checkout guard sent the now-guest user to `/login`. Finding it took reading React Router's code; the fix was one `startTransition` around both calls. Details in [DEBUG-LOG.md](DEBUG-LOG.md), bug 1.
2. **Making the header move like King River's.** The first version hid and showed the header with a timed CSS transition, and it felt late. We recorded the header's position on every frame on both sites and rewrote `useHeaderScroll` so the header follows the scroll position directly. It writes the transform itself, so React doesn't re-render on every frame, and it still reveals the header on keyboard focus, keeps it shown while the mobile menu is open, and respects reduced motion. Bug 3 in the debug log.
3. **Keeping the cart honest about stock.** The cart is shared by the catalog cards, the product page, the cart page, checkout, and the header badge. `addItem` returns whether anything was added, so a card can say "No more in stock" and the product page can say the cart already holds the whole stock; the product page's quantity stepper only goes up to what is left; and the cart page clamps quantities between 1 and the stock. The saved cart is checked field by field with a type guard when it loads, so a broken `shop_cart` value can't crash the app.

## What I'd do differently

- Build CORE first and the design after it. The hero video, header motion, and map took most of a day, and the cart and checkout were finished in the last hours before the deadline.
- Write the debug log while fixing bugs instead of reconstructing it at the end from chat history.
- Put every fix in its own commit. The logout fix, for example, is folded into the checkout-guard commit, which makes the history harder to follow.
- Test in Firefox and on a real phone, not only in Chrome's mobile emulation.
- Give phones a smaller, lower-resolution hero video, since the current one is 7.1 MB.
- Check which GitHub account Vercel is connected to before the first deploy (bug 4 in the debug log).

## How AI was used

I built the shop with AI coding assistants in Cursor.

- **What the AI did:** read the Word assignment and turned it into the plan, set up the project, and wrote nearly all of the code. It researched King River's header timing and smooth scrolling, cut the hero clips from Pexels with ffmpeg, built the Georgia map from Natural Earth data, and helped with the Blender renders. It tested every step in a browser, ran typecheck, lint, and build, made and pushed the commits, and diagnosed the deploy problem.
- **Where I corrected the AI or decided against it:**
  - I said the header came back late on scroll-up, which led to the frame-by-frame rewrite ([4c33c24](https://github.com/Gnems19/10x-shop-ghvinola/commit/4c33c24)).
  - I noticed the clipped tail of ღ in the wordmark ([5017e0d](https://github.com/Gnems19/10x-shop-ghvinola/commit/5017e0d)).
  - I removed the visible "10X Shop" text next to the logo; the AI pointed out that the assignment names the logo "10X Shop", so it is kept as screen-reader text ([acc2c96](https://github.com/Gnems19/10x-shop-ghvinola/commit/acc2c96)).
  - The AI suggested building our own wine and chocolate API on a Cloudflare Worker; I chose to stay on DummyJSON and finish CORE first.
  - I took the 3D gift-box animation (about 1.6 MB of frames) off the home page because it made the page slow to load.
- **Where the AI pushed back:** it argued against `<model-viewer>`, Three.js, and Sketchfab because the assignment allows no extra libraries and they would break the bundle budget, and it wrote a small smooth-scroll hook instead of adding the Lenis library.
- **How the work was checked:** before each commit, typecheck and lint had to pass and the feature was tested in the browser, including error states such as an unknown product ID and an empty cart at checkout.
