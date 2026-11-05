import Hero from '../components/home/Hero'
import Showcase from '../components/home/Showcase'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'

export default function CatalogPage() {
  return (
    <>
      <Hero />
      <Showcase />
      <section id="catalog" className="scroll-mt-24 py-20 lg:py-32">
        <Container>
          <PageHeader eyebrow="Shop" title="Catalog" as="h2" />
          <p className="mt-10 rounded-sm border border-dashed border-wine-900/20 px-6 py-16 text-center text-lg text-wine-950/60">
            Products will appear here.
          </p>
        </Container>
      </section>
    </>
  )
}
