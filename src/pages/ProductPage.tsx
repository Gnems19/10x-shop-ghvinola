import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'

export default function ProductPage() {
  const { id } = useParams()

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <PageHeader eyebrow="Product" title={`Product #${id ?? ''}`}>
          <Link
            to="/"
            className="inline-flex min-h-11 items-center font-sans text-xs font-bold tracking-widest text-wine-700 uppercase transition-colors hover:text-wine-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
          >
            ← Back to catalog
          </Link>
        </PageHeader>
        <p className="mt-10 text-lg text-wine-950/70">Product details coming soon.</p>
      </Container>
    </section>
  )
}
