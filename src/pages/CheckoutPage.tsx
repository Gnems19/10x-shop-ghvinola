import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'

export default function CheckoutPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <PageHeader eyebrow="Almost there" title="Checkout" />
        <p className="mt-10 text-lg text-wine-950/70">Checkout form coming soon.</p>
      </Container>
    </section>
  )
}
