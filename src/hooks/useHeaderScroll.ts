import { useEffect, useState } from 'react'

const TOP_ZONE = 96
const HIDE_AFTER = 10
const SHOW_AFTER = 4

interface HeaderScroll {
  isAtTop: boolean
  isHidden: boolean
}

// Safari reports offsets past both ends while it rubber-bands; that bounce is not a change of direction.
function readScrollY() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(window.scrollY, 0), Math.max(maxScroll, 0))
}

export default function useHeaderScroll(): HeaderScroll {
  const [isAtTop, setIsAtTop] = useState(() => readScrollY() < TOP_ZONE)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastY = readScrollY()
    let travel = 0
    let frame = 0

    const update = () => {
      frame = 0
      const y = readScrollY()
      const delta = y - lastY
      lastY = y

      setIsAtTop(y < TOP_ZONE)
      if (y < TOP_ZONE) {
        travel = 0
        setIsHidden(false)
        return
      }

      // A slow trackpad moves 1–3px per frame, so travel adds up until the direction changes.
      if (delta !== 0) travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
      if (travel >= HIDE_AFTER) setIsHidden(true)
      else if (travel <= -SHOW_AFTER) setIsHidden(false)
    }

    const handleScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return { isAtTop, isHidden }
}
