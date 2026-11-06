# 10X Shop

Graduation project for 10X Front-end: an online shop single-page app built with React, TypeScript, and Tailwind CSS v4, with product data from the [DummyJSON](https://dummyjson.com/) API. The shop is branded as **Ghvinola (ღვინოლა)**, family wine handmade in Kutaisi, Georgia, paired with chocolate from our partner [Chocola](https://chocola.ge/). The layout is inspired by [King River](https://kingriver.com.au/).

## Live demo

[10x-shop-ghvinola.vercel.app](https://10x-shop-ghvinola.vercel.app), deployed on Vercel from `main` on every push.

## Test account

Login is simulated in the browser, so any username and a password of at least 6 characters work. For example:

- Username: `emilys`
- Password: `emilyspass`

## Features

### CORE

- [x] Layout with a header, footer, and burger menu on mobile; routes `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, and a 404 page
- [x] Login with a controlled form and required validation; the username lives in `AuthContext`, and Log out returns to the catalog
- [x] Checkout guard: guests who open `/checkout` go to `/login` and come back after logging in
- [x] Catalog: our 12 products (gift boxes, Ghvinola wines, and Chocola chocolates), served by DummyJSON, in a responsive grid of product cards (1, 2, 3, or 4 columns by screen width), with loading, error, and empty states; each card shows the discounted price, the original price, the discount, and the rating, and opens its product page
- [x] Product details for the id in the URL: photo gallery, stock status, a quantity stepper that stops at the stock, and Add to cart; unknown IDs show the 404 page
- [x] Cart shared through `CartContext` and saved in localStorage (`shop_cart`): Add to cart on the catalog cards, a count badge in the header, and a cart page with quantity, remove, clear cart, subtotal, and total
- [x] Checkout form with Full name, Email, Address, and City and the assignment's error messages. Place order is disabled for a moment, then shows "Thank you! Your order has been placed." with the order total, and empties the cart
- [x] Error Boundary with the fallback "Something went wrong." and a Reload button
- [x] oxlint fails on `any` and warns about missing hook dependencies
- [x] Deploy on Vercel with an SPA rewrite (`vercel.json`), so links like `/products/5` open directly and on refresh
- [x] Docs: this README, [PLAN.md](PLAN.md), [REPORT.md](REPORT.md), [DEBUG-LOG.md](DEBUG-LOG.md), and a Lighthouse report of the live site (Mobile) in [`docs/lighthouse/`](docs/lighthouse/)

### FULL and extras

- [x] Wine color palette as Tailwind `@theme` tokens
- [x] Custom hooks: `useAuth`; `useSmoothScroll` for smooth mouse-wheel scrolling without a library (off when the user prefers reduced motion); `useHeaderScroll`, which moves the header up with the page as you scroll down and slides it back in when you scroll up; and `useHeroLogoInSight`, which tells the header whether the hero's big wordmark is on screen
- [x] Home hero with a looping grape-harvest video (a still image when the user prefers reduced motion). On large screens it stays pinned while the page slides up over it, and the header starts see-through over it and turns wine-colored once you scroll. While the hero's big wordmark is on screen the header shows only the ღ icon with its grape bunch, and once the wordmark is out of sight the icon unrolls into the full Ghvinola wordmark (with reduced motion it simply swaps).
- [x] Georgia map icon with the Imereti region around Kutaisi highlighted
- [x] Home showcase with three gift boxes modelled and rendered in Blender (wine, wine and chocolate, Chocola chocolate), each shown open with what's inside. They are still WebP images at 900 and 1800 px wide that load lazily. A version where you drag a box to turn it and click to open its lid is kept on the `plan-b/gift-boxes` branch, because its 204 frames (about 1.6 MB) made the home page slow to load.

## Tech stack

- Vite 8
- React 19
- TypeScript 7 (strict)
- Tailwind CSS 4
- React Router 7
- oxlint
- DummyJSON API

## Architecture

```text
src/
├── App.tsx            ErrorBoundary > BrowserRouter > AuthProvider > CartProvider > AppRoutes
├── main.tsx           React root
├── index.css          Tailwind import, @theme tokens, base styles
├── api/               products (fetchProducts, fetchProduct)
├── components/
│   ├── auth/          LoginForm
│   ├── cart/          CartItemRow, CartSummary
│   ├── checkout/      CheckoutForm, OrderConfirmation
│   ├── home/          Hero, Showcase
│   ├── layout/        Layout, Header, HeaderLogo, Footer, ScrollToTop, ErrorBoundary
│   ├── product/       ProductCard, ProductGrid, ProductDetails, StockStatus
│   └── ui/            Container, Eyebrow, PageHeader, StatusMessage, TextField, QuantityStepper, GhvinolaWordmark, GeorgiaMapIcon
├── context/           AuthContext and CartContext (the contexts and their types), AuthProvider and CartProvider (the state)
├── hooks/             useAuth, useCart, useHeaderScroll, useHeroLogoInSight, useSmoothScroll
├── pages/             CatalogPage, ProductPage, CartPage, CheckoutPage, LoginPage, NotFoundPage
├── routes/            AppRoutes, ProtectedRoute
├── types/             product, cart, user, checkout
└── utils/             validation (login, checkout), format (formatPrice, discountedPrice), cart (line totals, subtotal, item count)
```

`App` wraps everything in an `ErrorBoundary`, `BrowserRouter`, `AuthProvider`, and `CartProvider`, and `AppRoutes` renders every page inside one `Layout` (header, page, footer). Components read shared state through hooks such as `useAuth` and `useCart`. A user action calls a context function like `login`, `logout`, or `addItem`, which replaces the state with a new value, and React re-renders every component that reads it. `ProtectedRoute` sends guests from `/checkout` to `/login` with the original path in router state, and the login page navigates back there after a successful login.

`CatalogPage` loads products in a `useEffect` through `fetchProducts` in `src/api/`, keeps them in `useState` together with loading and error state, and renders a message for each state. It passes the products as props to `ProductGrid`, which maps each one to a `ProductCard` keyed by `product.id`. The card's title link stretches over the whole card, so clicking anywhere on a card opens `/products/:id`.

`ProductPage` reads the id with `useParams` and loads the product with `fetchProduct`, which picks it out of the catalog list; an unknown id shows the 404 page. `ProductDetails` keeps the chosen photo and quantity in `useState` and adds them with `addItem` from `useCart`.

`CartProvider` keeps the cart items in `useState`. It loads them from `shop_cart` in localStorage when the app starts, checking each saved item with a type guard, and saves them after every change. `addItem`, `setQuantity`, `removeItem`, and `clearCart` always build a new array with `map`, `filter`, or spread instead of changing the old one, and never go past the stock. The item count and totals are computed from the items on every render, so the header badge, the cart page, and checkout always agree.

`CheckoutPage` sends an empty cart back to `/cart`. After Place order it keeps a copy of the order in state, empties the cart, and shows the confirmation from that copy. An `ErrorBoundary` around each page (with a new `key` per path, so it resets when you navigate) and one around the whole app show "Something went wrong." and a Reload button instead of a blank screen.

## How to run

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/Gnems19/10x-shop-ghvinola.git
cd 10x-shop-ghvinola
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Type-checks, then builds the production bundle into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run typecheck` | Runs the TypeScript compiler without emitting files (`tsc -b`) |
| `npm run lint` | Lints the code with oxlint |

## Results

- `typecheck`: 0 errors. `lint`: 0 warnings.
- Lighthouse (Mobile) on the live home page: Performance 95, Accessibility 100, Best Practices 100, SEO 100. The reports are in [`docs/lighthouse/`](docs/lighthouse/).
- Production bundle: 96 kB of JavaScript and 7 kB of CSS (gzip). The showcase images are 17 to 19 kB each at 900 px and 41 to 51 kB at 1800 px, and they load only when they come near the screen.
- Tested in Chrome at 375px and desktop widths, including the whole path from a product to the order confirmation: no horizontal scroll, tap targets at least 44px.

## Limitations

- Login is a local simulation with no real accounts, and it resets when the page reloads (the assignment allows this).
- Checkout is a local simulation too: no order is sent anywhere, and the confirmation is gone once you leave the page.
- The cart is saved only in this browser (localStorage).
- The catalog has 12 products. Search, categories, sorting, and pagination are optional FULL features (PRD step 9).
- DummyJSON has no wine or chocolate, so our products are in [`catalog/products.json`](catalog/products.json), and DummyJSON serves them as a custom response: `node catalog/publish.mjs` publishes the file and prints the URL for `CATALOG_URL` in `src/api/products.ts`. A custom response always returns the whole list, can't be edited, and expires after 90 days (the current one on 4 February 2027), so any change needs a new URL. The images in [`catalog/images/`](catalog/images/) are served from Chocola's CDN at `cdn.chocola.ge/ghvinola/`.
- Smooth scrolling only changes mouse-wheel scrolling; keyboard, touch, and scrollbar scrolling stay native.

## Credits

- Product data: our own list, served as a [DummyJSON](https://dummyjson.com/) custom response; the wine bottles are rendered in Blender, and the chocolate photos are Chocola's
- Design inspiration: [King River](https://kingriver.com.au/)
- Chocolate partner: [Chocola](https://chocola.ge/)
- Hero video: vineyard clips from [Pexels](https://www.pexels.com/) (free to use under the Pexels license)
- Map borders: [Natural Earth](https://www.naturalearthdata.com/) (public domain)
- Gift boxes: modelled and rendered in [Blender](https://www.blender.org/); only the rendered images are in the repo
- Fonts: EB Garamond and Montserrat from [Google Fonts](https://fonts.google.com/)
- Built with help from AI coding assistants in Cursor
