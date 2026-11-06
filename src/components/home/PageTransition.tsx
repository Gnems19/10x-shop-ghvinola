import { useEffect, useRef } from 'react'
import GhvinolaWordmark from '../ui/GhvinolaWordmark'

interface PageTransitionProps {
  label: string
  onCovered: () => void
  onDone: () => void
}

const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)'

// Like King River's page change: a wine panel slides up over the page and names where we are going.
// While it covers everything the page moves behind it (onCovered), then it slides off the top (onDone).
// The animations use the browser's Web Animations API (element.animate), so no library is needed.
export default function PageTransition({ label, onCovered, onDone }: PageTransitionProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const content = contentRef.current
    if (!panel || !content) return
    // Aborted in the cleanup, so work that finishes after an unmount is dropped.
    const cleanup = new AbortController()

    // These animate the CSS `translate` property, the same one Tailwind's translate-y-full sets on the panel.
    // (Animating `transform` instead would add to that 100% and keep the panel below the screen.)
    const run = async () => {
      const cover = panel.animate([{ translate: '0 100%' }, { translate: '0 0' }], {
        duration: 650,
        easing: EASING,
        fill: 'forwards',
      })
      const reveal = content.animate(
        [
          { opacity: 0, translate: '0 16px' },
          { opacity: 1, translate: '0 0' },
        ],
        { duration: 450, delay: 350, easing: 'ease-out', fill: 'forwards' },
      )
      await cover.finished
      if (cleanup.signal.aborted) return
      onCovered()

      await reveal.finished
      if (cleanup.signal.aborted) return
      await panel.animate([{ translate: '0 0' }, { translate: '0 -100%' }], {
        duration: 750,
        delay: 250,
        easing: EASING,
        fill: 'forwards',
      }).finished
      if (!cleanup.signal.aborted) onDone()
    }
    // A cancelled animation rejects its `finished` promise; there is nothing left to do then.
    run().catch(() => {})

    return () => {
      cleanup.abort()
      panel.getAnimations().forEach((animation) => animation.cancel())
      content.getAnimations().forEach((animation) => animation.cancel())
    }
  }, [onCovered, onDone])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-70 overflow-hidden">
      <div ref={panelRef} className="absolute inset-0 grid translate-y-full place-items-center bg-wine-700 px-6 text-cream">
        <div ref={contentRef} className="flex flex-col items-center gap-6 opacity-0">
          <GhvinolaWordmark className="h-auto w-56 text-wine-300 lg:w-72" />
          <span className="h-px w-16 bg-wine-300/60" />
          <p className="font-sans text-xs font-bold tracking-widest uppercase">{label}</p>
        </div>
      </div>
    </div>
  )
}
