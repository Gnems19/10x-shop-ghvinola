import { useEffect, useState } from 'react'

const TOP_ZONE = 96
const REVEAL_AFTER = 20
const REVEAL_PER_SECOND = 11

interface HeaderScroll {
  header: HTMLElement | null
  headerRef: (element: HTMLElement | null) => void
  isAtTop: boolean
}

// Safari reports offsets past both ends while it rubber-bands; that bounce is not a change of direction.
function readScrollY() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(window.scrollY, 0), Math.max(maxScroll, 0))
}

export default function useHeaderScroll(keepShown: boolean): HeaderScroll {
  const [header, setHeader] = useState<HTMLElement | null>(null)
  const [isAtTop, setIsAtTop] = useState(() => readScrollY() < TOP_ZONE)

  useEffect(() => {
    if (!header) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lastY = readScrollY()
    let offset = 0
    let upTravel = 0
    let isRevealing = false
    let lastTime = 0
    let frame = 0

    const update = (time: number) => {
      frame = 0
      const y = readScrollY()
      const delta = y - lastY
      lastY = y
      setIsAtTop(y < TOP_ZONE)

      if (keepShown || header.querySelector(':focus-visible')) {
        upTravel = 0
        isRevealing = offset > 0
      } else if (delta > 0) {
        // Scrolling down pushes the header up by exactly as far as the page moved.
        upTravel = 0
        isRevealing = false
        offset = Math.min(offset + delta, header.offsetHeight)
      } else if (delta < 0) {
        upTravel -= delta
        if (upTravel >= REVEAL_AFTER) isRevealing = offset > 0
      }

      if (isRevealing) {
        const seconds = lastTime ? (time - lastTime) / 1000 : 1 / 60
        offset = reducedMotion.matches ? 0 : offset * Math.exp(-REVEAL_PER_SECOND * seconds)
        if (offset < 0.5) {
          offset = 0
          isRevealing = false
        }
      }

      // Near the top the header is never pushed further up than the page has scrolled.
      offset = Math.min(offset, y)
      // Written to the element directly: it has to move in the same frame as the page,
      // and React state would re-render the header on every scroll frame.
      header.style.transform = offset > 0 ? `translateY(${-offset}px)` : ''

      lastTime = isRevealing ? time : 0
      if (isRevealing) frame = requestAnimationFrame(update)
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    header.addEventListener('focusin', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      header.removeEventListener('focusin', schedule)
      cancelAnimationFrame(frame)
      header.style.transform = ''
    }
  }, [header, keepShown])

  return { header, headerRef: setHeader, isAtTop }
}
