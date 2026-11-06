import { useEffect, useState } from 'react'
import Container from '../ui/Container'
import GeorgiaMapIcon from '../ui/GeorgiaMapIcon'
import GhvinolaWordmark from '../ui/GhvinolaWordmark'

function useMotionOk() {
  const [motionOk, setMotionOk] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setMotionOk(!media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return motionOk
}

export default function Hero() {
  const motionOk = useMotionOk()

  return (
    <section id="hero" className="relative flex min-h-svh flex-col overflow-hidden text-cream lg:sticky lg:top-0">
      <img src="/hero-poster.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {motionOk && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-wine-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(38,7,15,0.5),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-wine-950/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-wine-950/75 to-transparent" />

      <Container className="relative z-10 flex flex-1 flex-col pt-19 md:pt-21">
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
          <p className="flex items-center gap-2.5">
            <GeorgiaMapIcon className="h-5 w-auto" />
            Kutaisi, Georgia
          </p>
          <p className="font-sans text-xs font-bold tracking-widest uppercase">Wine & Chocolate</p>
        </div>
      </Container>
    </section>
  )
}
