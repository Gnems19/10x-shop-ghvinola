# 10X Shop

Graduation project for 10X Front-end: an online shop single-page app built with React, TypeScript, and Tailwind CSS v4, with product data from the [DummyJSON](https://dummyjson.com/) API. The shop is branded as **Ghvinola (ღვინოლა)**, family wine handmade in Kutaisi, Georgia, paired with chocolate from our partner [Chocola](https://chocola.ge/). The layout is inspired by [King River](https://kingriver.com.au/).

## Live demo

Coming soon: the Vercel link will be added here after the first deploy.

## Test account

Login is simulated in the browser, so any username and a password of at least 6 characters work. For example:

- Username: `emilys`
- Password: `emilyspass`

## Features

### CORE

- [x] Layout with a header, footer, and burger menu on mobile; routes `/`, `/login`, `/products/:id`, `/cart`, `/checkout`, and a 404 page
- [x] Login with a controlled form and required validation; the username lives in `AuthContext`, and Log out returns to the catalog
- [x] Checkout guard: guests who open `/checkout` go to `/login` and come back after logging in
- [ ] Catalog from `GET /products` with loading, error, and empty states
- [ ] Product details from `GET /products/:id` with Add to Cart
- [ ] Cart with quantity, remove, and totals, shared through `CartContext`
- [ ] Checkout form and local order confirmation
- [ ] Error Boundary
- [ ] Deploy on Vercel

### FULL and extras

- [x] Wine color palette as Tailwind `@theme` tokens
- [x] Custom hooks: `useAuth`, and `useSmoothScroll` for smooth mouse-wheel scrolling without a library (off when the user prefers reduced motion)
- [x] Georgia map icon with the Imereti region around Kutaisi highlighted

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
├── App.tsx            BrowserRouter > AuthProvider > AppRoutes
├── main.tsx           React root
├── index.css          Tailwind import, @theme tokens, base styles
├── components/
│   ├── auth/          LoginForm
│   ├── home/          Hero, Showcase
│   ├── layout/        Layout, Header, Footer, ScrollToTop
│   └── ui/            Container, Eyebrow, PageHeader, TextField, GhvinolaWordmark, GeorgiaMapIcon
├── context/           AuthContext (the context and its type), AuthProvider (the state)
├── hooks/             useAuth, useSmoothScroll
├── pages/             CatalogPage, ProductPage, CartPage, CheckoutPage, LoginPage, NotFoundPage
├── routes/            AppRoutes, ProtectedRoute
├── types/             product, cart, user, checkout
└── utils/             validation
```

`App` wraps everything in `BrowserRouter` and `AuthProvider`, and `AppRoutes` renders every page inside one `Layout` (header, page, footer). Components read shared state through hooks such as `useAuth`. A user action calls a context function like `login` or `logout`, which replaces the state with a new object, and React re-renders every component that reads it. `ProtectedRoute` sends guests from `/checkout` to `/login` with the original path in router state, and the login page navigates back there after a successful login.

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

## Results so far

- `typecheck`: 0 errors. `lint`: 0 warnings.
- Production bundle: 90 kB of JavaScript and 5 kB of CSS (gzip).
- Tested in Chrome at 375px and desktop widths: no horizontal scroll, tap targets at least 44px.

## Limitations

- Login is a local simulation with no real accounts, and it resets when the page reloads (the assignment allows this).
- DummyJSON has no wine or chocolate, so the catalog will show DummyJSON's general products; the home page boxes are placeholders for our own wine and Chocola photos.
- Smooth scrolling only changes mouse-wheel scrolling; keyboard, touch, and scrollbar scrolling stay native.

## Credits

- Product data: [DummyJSON](https://dummyjson.com/)
- Design inspiration: [King River](https://kingriver.com.au/)
- Chocolate partner: [Chocola](https://chocola.ge/)
- Map borders: [Natural Earth](https://www.naturalearthdata.com/) (public domain)
- Fonts: EB Garamond and Montserrat from [Google Fonts](https://fonts.google.com/)
- Built with help from AI coding assistants in Cursor
