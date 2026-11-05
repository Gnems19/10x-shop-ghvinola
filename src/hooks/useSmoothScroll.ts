import { useEffect } from 'react'

const SMOOTHING_PER_SECOND = 6
const LINE_HEIGHT = 16

function canScrollInside(target: EventTarget | null, deltaY: number) {
  let element = target instanceof Element ? target : null

  while (element && element !== document.documentElement) {
    const { overflowY } = getComputedStyle(element)
    const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight

    if (isScrollable) {
      const canScrollUp = element.scrollTop > 0
      const canScrollDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1
      if ((deltaY < 0 && canScrollUp) || (deltaY > 0 && canScrollDown)) return true
    }

    element = element.parentElement
  }

  return false
}

export default function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let target = 0
    let current = 0
    let lastTime = 0
    let frame = 0

    const animate = (time: number) => {
      // Keyboard, scrollbar, or a route change moved the page: stop and let the browser keep that position.
      if (Math.abs(window.scrollY - current) > 2) {
        frame = 0
        return
      }

      const seconds = lastTime ? (time - lastTime) / 1000 : 1 / 60
      lastTime = time
      current += (target - current) * (1 - Math.exp(-SMOOTHING_PER_SECOND * seconds))
      if (Math.abs(target - current) < 0.5) current = target

      window.scrollTo({ top: current, behavior: 'instant' })
      frame = current === target ? 0 : requestAnimationFrame(animate)
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || reducedMotion.matches) return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (canScrollInside(event.target, event.deltaY)) return

      event.preventDefault()

      if (frame === 0) {
        target = window.scrollY
        current = window.scrollY
        lastTime = 0
      }

      const unit =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? LINE_HEIGHT
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      target = Math.min(Math.max(target + event.deltaY * unit, 0), maxScroll)

      if (frame === 0) frame = requestAnimationFrame(animate)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(frame)
    }
  }, [])
}
