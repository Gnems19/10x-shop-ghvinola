import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import GhvinolaWordmark from '../ui/GhvinolaWordmark'

const FOOTER_LINKS = [
  { to: '/', label: 'Catalog' },
  { to: '/cart', label: 'Cart' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/login', label: 'Log in' },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-wine-950 text-cream">
      <Container className="pt-16 pb-8 lg:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <GhvinolaWordmark className="h-12 w-auto lg:h-14" />
            <p className="mt-6 max-w-sm text-lg/relaxed text-cream/70">
              Wine and chocolate, chosen for the table.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-10">
            <h2 className="font-sans text-xs font-bold tracking-widest text-wine-300 uppercase">Shop</h2>
            <ul className="mt-4">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-11 items-center text-lg transition-colors hover:text-wine-300 focus-visible:outline-2 focus-visible:outline-wine-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-cream/15 pt-6 font-sans text-xs font-semibold tracking-widest text-cream/60 uppercase sm:flex-row sm:justify-between">
          <p>© {CURRENT_YEAR} 10X Shop · Ghvinola</p>
          <p>
            Product data by{' '}
            <a
              href="https://dummyjson.com"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 transition-colors hover:text-cream hover:underline focus-visible:outline-2 focus-visible:outline-wine-300"
            >
              DummyJSON
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
