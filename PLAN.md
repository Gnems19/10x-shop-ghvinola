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
- [ ] Shared TypeScript types
- [ ] Layout, Header, React Router routes
- [ ] AuthContext + Login
- [ ] Catalog + ProductCard
- [ ] Product details
- [ ] CartContext + Cart page
- [ ] Checkout + confirmation
- [ ] Responsive polish + deploy + REPORT.md
