# 10X Shop

Graduation project: an online shop SPA built with Vite, React, TypeScript, and Tailwind CSS v4. Product data comes from the [DummyJSON](https://dummyjson.com/) public API.

## Stack

- Vite
- React 19
- TypeScript (strict)
- Tailwind CSS v4
- React Router
- DummyJSON API

## Scripts

```bash
npm install
npm run dev        # local development
npm run typecheck  # tsc --noEmit (project references)
npm run build      # production build
npm run preview    # preview production build
npm run lint
```

## Status

Layout, routing, and the simulated login are done: `AuthContext` holds the username, and a checkout guard sends guests to `/login` and back. Catalog, product details, cart, and checkout are next — see [PLAN.md](./PLAN.md).

## Live demo

_To be added after deploy (Vercel / Netlify)._
