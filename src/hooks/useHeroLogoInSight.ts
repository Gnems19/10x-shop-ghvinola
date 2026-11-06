import { useEffect, useState } from 'react'

// Whether any part of the big logo in the home hero is on screen. The header covers the top of the screen,
// and on large screens the hero stays pinned while the page after it slides up over the logo.
export default function useHeroLogoInSight(header: HTMLElement | null, isHome: boolean) {
  const [isInSight, setIsInSight] = useState(isHome)

  useEffect(() => {
    const hero = isHome ? document.getElementById('hero') : null
    const logo = hero?.querySelector('h1')
    if (!header || !hero || !logo) return

    const pageAfterHero = hero.nextElementSibling
    let frame = 0

    const update = () => {
      frame = 0
      const { top, bottom } = logo.getBoundingClientRect()
      const coveredFrom = pageAfterHero?.getBoundingClientRect().top ?? Infinity
      setIsInSight(Math.min(bottom, coveredFrom) > Math.max(top, header.offsetHeight))
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    // A resize moves the logo without a scroll, and the open mobile menu makes the header taller.
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(header)
    resizeObserver.observe(hero)
    window.addEventListener('scroll', schedule, { passive: true })
    update()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
    }
  }, [header, isHome])

  return isHome && isInSight
}
