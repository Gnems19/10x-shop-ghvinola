# Debug log

Real bugs found while building the shop, in the order they were found. Each one lists what we saw, how to reproduce it, the tool that found the cause, the cause, the fix commit, and the lesson.

## 1. Logging out on the checkout page opened the login page instead of the catalog

- **Symptom:** after clicking "Log out" on `/checkout`, the login page appeared. The assignment says Log out returns to the catalog.
- **Steps to reproduce:** log in, open `/checkout`, click "Log out" in the header.
- **Tool:** a scripted headless Chrome test (driven through the Chrome DevTools Protocol) expected the URL `/` and got `/login`. Reading React Router's built code in `node_modules` showed that `BrowserRouter` runs every navigation inside `startTransition`.
- **Cause:** `navigate('/')` was a low-priority transition, but the `logout()` state update was urgent. React rendered the logged-out state first, while the URL was still `/checkout`, so `ProtectedRoute` saw a guest on checkout and redirected to `/login`.
- **Fix:** [f143044](https://github.com/Gnems19/10x-shop-ghvinola/commit/f143044) wraps `logout()` and `navigate('/')` in one `startTransition` in `Header.tsx`, so both changes render together.
- **Lesson:** in React 19 with React Router 7, navigation is a transition. State changes that belong to the same navigation have to go in the same transition, and redirect flows need an end-to-end test.

## 2. The tail of the first letter in the Ghvinola wordmark was cut off

- **Symptom:** the bottom curl of ღ, the first letter of the wordmark, looked clipped in the hero.
- **Steps to reproduce:** open `/` at desktop width and look at the bottom of the hero wordmark.
- **Tool:** Cursor's browser preview, to pick the hero `<h1>` and take a screenshot. In headless Chrome, the SVG's `getBBox()` showed the tail ending at y = 307, exactly on the edge of the viewBox; a screenshot with `overflow: visible` showed the missing part.
- **Cause:** the viewBox `82 88 1066 219` was the exact bounding box of the letters, so curves that touched the edge were shaved off.
- **Fix:** [5017e0d](https://github.com/Gnems19/10x-shop-ghvinola/commit/5017e0d) pads the viewBox by 6 units on every side (`76 82 1078 231`).
- **Lesson:** leave a margin around glyph outlines, and measure the geometry instead of guessing.

## 3. The header came back too late when scrolling up

- **Symptom:** compared with [King River](https://kingriver.com.au/), our header returned late and slowly when scrolling up ("it scrolls up as fast as the lower side").
- **Steps to reproduce:** on `/`, scroll down past the hero, then scroll up a little.
- **Tool:** headless Chrome recorded the header's position on every animation frame on both sites. King River's header moves exactly with the page going down and comes back after about 20 px of scrolling up, with a fast-start ease of about 0.6 s.
- **Cause:** our first version ([67a4005](https://github.com/Gnems19/10x-shop-ghvinola/commit/67a4005)) only flipped a "hidden" flag after 10 px down or 4 px up, and a slow-starting 700 ms CSS transition did the movement, so the header followed a timer instead of the page.
- **Fix:** [4c33c24](https://github.com/Gnems19/10x-shop-ghvinola/commit/4c33c24) rewrites `useHeaderScroll`. It writes the header's `translateY` on every animation frame, reveals it after 20 px of scrolling up with an exponential ease, and shortens the color fade to 450 ms. The first frames of the reveal measured −71, −59, and −49 px, against King River's −69, −58, and −47 px.
- **Lesson:** scroll-linked motion should follow the scroll position, not a timer. Measuring the reference site frame by frame settled what eyeballing couldn't.

## 4. The live site answered `DEPLOYMENT_NOT_FOUND`

- **Symptom:** the Vercel import looked finished, but [10x-shop-ghvinola.vercel.app](https://10x-shop-ghvinola.vercel.app) returned `DEPLOYMENT_NOT_FOUND`, and GitHub showed no deployments.
- **Steps to reproduce:** connect Vercel to a GitHub account that can't see the repository, then import it.
- **Tool:** HTTP requests to the live URL, the GitHub API (deployments and commit statuses), and Vercel's integration in Cursor. Vercel's user was linked to GitHub ID 148972993, which the GitHub API resolved to another account (`hnf18`), not `Gnems19`, who owns the repo.
- **Cause:** Vercel was linked to a GitHub account without access to the repository, so the project was never really imported.
- **Fix:** a settings change rather than code: linking `Gnems19` in Vercel's import screen and deploying. [4bc6e01](https://github.com/Gnems19/10x-shop-ghvinola/commit/4bc6e01) was the first push after that; GitHub showed "Vercel: success" and the site was live about 10 seconds later.
- **Lesson:** a deploy isn't done until the live URL responds. When nothing deploys, check which Git account the host is connected to.

## 5. "Back to catalog" on a product page opened the top of the home page

- **Symptom:** the "← Back to catalog" link on a product page opened the home page at the very top, on the full-screen hero video, so the product grid was a whole screen further down.
- **Steps to reproduce:** on `/`, scroll down to the product grid, open a product, then click "← Back to catalog".
- **Tool:** testing the product page in Cursor's browser and taking screenshots after each click.
- **Cause:** the link pointed at `/`, and `ScrollToTop` scrolled to the top on every page change. React Router doesn't jump to `#hash` targets on its own, so there was no way to link straight to the grid.
- **Fix:** [7c26512](https://github.com/Gnems19/10x-shop-ghvinola/commit/7c26512) links to `/#catalog`, and `ScrollToTop` now scrolls to the element whose id matches the hash and only goes to the top when there is no hash.
- **Lesson:** a single-page app loses the browser's built-in jump to `#hash` links, so the scroll handling has to do it.

## 6. Struck-through prices failed the color contrast check

- **Symptom:** Lighthouse (Mobile) gave the live home page 96 for accessibility, and its "Background and foreground colors do not have a sufficient contrast ratio" audit listed the struck-through original prices on 11 of the 12 product cards.
- **Steps to reproduce:** run Lighthouse on the live home page, or measure the contrast of an original price under a discounted one on a product card.
- **Tool:** Lighthouse: the report is in [`docs/lighthouse/home-mobile-before-fixes.report.html`](docs/lighthouse/home-mobile-before-fixes.report.html). It measured 3.48:1 (`#8e7a7b` on the cream `#f6ede8` background), below the 4.5:1 that normal-size text needs.
- **Cause:** the old price used `text-wine-950/50`, the dark wine color at 50% opacity, which looks fine on a big screen but is too faint to read for many people.
- **Fix:** [eb05c36](https://github.com/Gnems19/10x-shop-ghvinola/commit/eb05c36) raises it to 70% opacity (`text-wine-950/70`), about 6.7:1, on the product cards and the product page.
- **Lesson:** colors with opacity need a contrast check against their real background. Lighthouse also flagged that `/robots.txt` returned the app's HTML because of the SPA rewrite; the same commit adds a real `public/robots.txt`.
