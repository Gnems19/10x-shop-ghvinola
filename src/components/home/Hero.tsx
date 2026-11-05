import Container from '../ui/Container'
import GhvinolaWordmark from '../ui/GhvinolaWordmark'

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-5.25rem)] flex-col bg-wine-950 bg-radial-[at_50%_35%] from-wine-800 via-wine-900 to-wine-950 text-cream">
      <Container className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-10 py-16 text-center">
          <h1>
            <GhvinolaWordmark className="h-auto w-[min(78vw,44rem)]" />
          </h1>
          <span aria-hidden="true" className="h-px w-16 bg-wine-300" />
          <a
            href="#catalog"
            className="inline-flex items-center gap-3 border border-cream/30 px-6 py-3.5 font-sans text-xs font-bold tracking-widest uppercase transition-colors hover:border-cream hover:bg-cream hover:text-wine-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-300"
          >
            Browse the catalog
            <svg aria-hidden="true" viewBox="0 0 6 8" className="h-2 w-1.5 fill-current">
              <path d="M0 0l6 4-6 4z" />
            </svg>
          </a>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-cream/25 py-5">
          <p className="flex items-center gap-2">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-4"
            >
              <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            Georgia
          </p>
          <p className="font-sans text-xs font-bold tracking-widest uppercase">Wine & Chocolate</p>
        </div>
      </Container>
    </section>
  )
}
