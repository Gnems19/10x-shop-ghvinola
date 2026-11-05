import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'

export default function CartPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <PageHeader eyebrow="Your selection" title="Cart" />
        <div className="flex flex-col items-start gap-6 pt-10">
          <p className="text-xl text-wine-950/70">Your cart is empty.</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-wine-700 px-6 py-3.5 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
          >
            Browse products
          </Link>
        </div>
      </Container>
    </section>
  )
}
