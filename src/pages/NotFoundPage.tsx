import { Link } from 'react-router-dom'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'

export default function NotFoundPage() {
  return (
    <section className="py-24 lg:py-40">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow className="text-wine-600">Error 404</Eyebrow>
          <h1 className="mt-4 font-sans text-3xl font-bold tracking-wide text-wine-900 uppercase lg:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-xl/relaxed text-wine-950/70">The page you are looking for does not exist.</p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center justify-center bg-wine-700 px-6 py-3.5 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
          >
            Go to catalog
          </Link>
        </div>
      </Container>
    </section>
  )
}
