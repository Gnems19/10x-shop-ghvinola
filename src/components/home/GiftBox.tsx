import { useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react'
import { prefersReducedMotion } from '../../utils/motion'

// The box is a 3D model rendered in Blender, frame by frame, and saved as WebP in public/showcase/<box>/:
// turn-00…47 is one full turn of the closed box (7.5° apart) and open-00…19 lifts the lid, starting from turn-00.
// Playing these pictures on a canvas looks 3D without a 3D library, which the project rules do not allow.
// The frames already have the section's wine-900 background, so they are opaque and blend into the page.
const TURN_FRAMES = 48
const OPEN_FRAMES = 20
const WIDTH = 900
const HEIGHT = 600
const DRAG_THRESHOLD = 6 // pixels a press has to move before it counts as a drag and not a click

interface Drag {
  pointerId: number
  startX: number
  startPosition: number
  lastX: number
  lastTime: number
  velocity: number // turn frames per millisecond
  moved: boolean
}

// Everything the animations change lives in one ref, so turning the box never re-renders React.
interface Player {
  canvas: HTMLCanvasElement | null
  turn: HTMLImageElement[]
  open: HTMLImageElement[]
  position: number // turn frame, with fractions; every TURN_FRAMES is one full turn
  frame: number // id of the running requestAnimationFrame, 0 when nothing runs
  drag: Drag | null
  ignoreClick: boolean
  isOpening: boolean
  isOpened: boolean
  isWellInView: boolean // at least 60% of the box is on screen
  hasSpun: boolean
}

interface GiftBoxProps {
  folder: string
  alt: string
  label: string
  className?: string
  onOpen: () => void
}

function frameUrls(folder: string, sequence: 'turn' | 'open', count: number) {
  return Array.from({ length: count }, (_, i) => `${folder}/${sequence}-${String(i).padStart(2, '0')}.webp`)
}

function loadFrames(urls: string[]) {
  return Promise.all(
    urls.map(async (url) => {
      const image = new Image()
      image.src = url
      await image.decode()
      return image
    }),
  )
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2
}

// A position between two frames is drawn as a mix of both, so slow turns glide instead of stepping.
function draw(player: Player, sequence: 'turn' | 'open', position: number) {
  const frames = sequence === 'turn' ? player.turn : player.open
  const context = player.canvas?.getContext('2d')
  if (!context || frames.length === 0) return

  const count = frames.length
  // The turn wraps around (frame 48 is frame 0 again); the opening stops at its first and last frames.
  const at = sequence === 'turn' ? position : Math.min(Math.max(position, 0), count - 1)
  const whole = Math.floor(at)
  const pick = (i: number) => frames[sequence === 'turn' ? ((i % count) + count) % count : Math.min(i, count - 1)]
  const current = pick(whole)
  const next = pick(whole + 1)
  if (!current || !next) return

  context.globalAlpha = 1
  context.drawImage(current, 0, 0)
  context.globalAlpha = at - whole // the next frame on top, as see-through as we are far from it
  context.drawImage(next, 0, 0)
  context.globalAlpha = 1
  if (sequence === 'turn') player.position = position
}

function stop(player: Player) {
  cancelAnimationFrame(player.frame)
  player.frame = 0
}

// Calls onFrame with t going from 0 to 1 over `duration` milliseconds, then onDone.
function tween(player: Player, duration: number, onFrame: (t: number) => void, onDone?: () => void) {
  stop(player)
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / Math.max(duration, 1), 1)
    onFrame(t)
    if (t < 1) {
      player.frame = requestAnimationFrame(step)
    } else {
      player.frame = 0
      onDone?.()
    }
  }
  player.frame = requestAnimationFrame(step)
}

function turnTo(player: Player, target: number, duration: number, onDone?: () => void) {
  const from = player.position
  tween(player, duration, (t) => draw(player, 'turn', from + (target - from) * easeInOut(t)), onDone)
}

// After a fling the box keeps turning, slows down, and settles on the nearest whole frame (a sharp picture).
function glide(player: Player, velocity: number) {
  stop(player)
  let speed = Math.min(Math.max(velocity, -0.1), 0.1)
  let last = performance.now()
  const step = (now: number) => {
    const elapsed = now - last
    last = now
    speed *= Math.exp(-elapsed / 280)
    draw(player, 'turn', player.position + speed * elapsed)
    if (Math.abs(speed) > 0.003) player.frame = requestAnimationFrame(step)
    else turnTo(player, Math.round(player.position), 160)
  }
  player.frame = requestAnimationFrame(step)
}

export default function GiftBox({ folder, alt, label, className = '', onOpen }: GiftBoxProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerRef = useRef<Player>({
    canvas: null,
    turn: [],
    open: [],
    position: 0,
    frame: 0,
    drag: null,
    ignoreClick: false,
    isOpening: false,
    isOpened: false,
    isWellInView: false,
    hasSpun: false,
  })
  const [isReady, setIsReady] = useState(false)
  const hintId = useId()

  useEffect(() => {
    const link = linkRef.current
    const player = playerRef.current
    if (!link) return
    player.canvas = canvasRef.current
    // Aborted in the cleanup, so work that finishes after an unmount is dropped.
    const cleanup = new AbortController()

    // One slow turn the first time the box is well in view, to show that it turns.
    const spinOnce = () => {
      if (player.hasSpun || player.turn.length === 0 || !player.isWellInView || prefersReducedMotion()) return
      player.hasSpun = true
      tween(player, 2600, (t) => draw(player, 'turn', TURN_FRAMES * easeInOut(t)), () => {
        player.position = 0
      })
    }

    const load = async () => {
      try {
        const turn = await loadFrames(frameUrls(folder, 'turn', TURN_FRAMES))
        if (cleanup.signal.aborted) return
        player.turn = turn
        draw(player, 'turn', 0)
        setIsReady(true)
        spinOnce()
        const open = await loadFrames(frameUrls(folder, 'open', OPEN_FRAMES))
        if (!cleanup.signal.aborted) player.open = open
      } catch {
        // A frame did not load: the still image stays, and the box still links to the catalog.
      }
    }

    // Starts downloading the frames a little before the box scrolls into view.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        loader.disconnect()
        load()
      },
      { rootMargin: '300px 0px' },
    )
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        player.isWellInView = entry.intersectionRatio >= 0.6
        spinOnce()
        // After opening, close the box again once the page has moved on to the catalog.
        if (!entry.isIntersecting && player.isOpened) {
          player.isOpened = false
          draw(player, 'turn', 0)
        }
      },
      { threshold: [0, 0.6] },
    )
    loader.observe(link)
    watcher.observe(link)

    return () => {
      cleanup.abort()
      loader.disconnect()
      watcher.disconnect()
      stop(player)
    }
  }, [folder])

  const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
    const player = playerRef.current
    player.ignoreClick = false
    if (!event.isPrimary || event.button !== 0 || player.turn.length === 0 || player.isOpening) return
    stop(player)
    player.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startPosition: player.position,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      moved: false,
    }
    // Keeps the pointer events coming to the box even when the pointer leaves it mid-drag.
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const player = playerRef.current
    const drag = player.drag
    if (!drag || drag.pointerId !== event.pointerId) return
    const distance = event.clientX - drag.startX
    if (!drag.moved && Math.abs(distance) < DRAG_THRESHOLD) return
    drag.moved = true

    // Dragging across the whole box turns it once; dragging right turns its front to the right.
    const framesPerPixel = TURN_FRAMES / event.currentTarget.clientWidth
    draw(player, 'turn', drag.startPosition + distance * framesPerPixel)
    const elapsed = event.timeStamp - drag.lastTime
    if (elapsed > 0) drag.velocity = ((event.clientX - drag.lastX) * framesPerPixel) / elapsed
    drag.lastX = event.clientX
    drag.lastTime = event.timeStamp
  }

  const handlePointerUp = (event: PointerEvent<HTMLAnchorElement>) => {
    const player = playerRef.current
    const drag = player.drag
    if (!drag || drag.pointerId !== event.pointerId) return
    player.drag = null
    if (!drag.moved) return // a press without a drag: the click that follows opens the box
    player.ignoreClick = true
    // A pointer that stopped moving before it let go has no fling left.
    glide(player, event.timeStamp - drag.lastTime < 80 ? drag.velocity : 0)
  }

  // The browser took the pointer over, for example to scroll the page on a vertical swipe.
  const handlePointerCancel = () => {
    const player = playerRef.current
    if (!player.drag) return
    player.drag = null
    turnTo(player, Math.round(player.position), 160)
  }

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const player = playerRef.current
    if (player.ignoreClick) {
      player.ignoreClick = false
      return
    }
    if (player.isOpening) return
    if (player.open.length < OPEN_FRAMES || prefersReducedMotion()) {
      onOpen()
      return
    }

    // Turn the short way round to the front (frame 0, where the opening starts), then lift the lid.
    player.isOpening = true
    const front = Math.round(player.position / TURN_FRAMES) * TURN_FRAMES
    turnTo(player, front, Math.min(Math.abs(front - player.position) * 30, 500), () => {
      tween(player, 1000, (t) => draw(player, 'open', t * (OPEN_FRAMES - 1)), () => {
        player.isOpening = false
        player.isOpened = true
        onOpen()
      })
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    const player = playerRef.current
    const step = event.key === 'ArrowRight' ? 6 : event.key === 'ArrowLeft' ? -6 : 0
    if (step === 0 || player.turn.length === 0 || player.isOpening) return
    event.preventDefault()
    turnTo(player, Math.round(player.position) + step, 350)
  }

  return (
    <a
      ref={linkRef}
      href="#catalog"
      aria-label={label}
      aria-describedby={hintId}
      draggable={false}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`block touch-pan-y select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-300 ${
        isReady ? 'cursor-grab active:cursor-grabbing' : ''
      } ${className}`}
    >
      <span className="relative block aspect-[3/2]">
        {/* The first frame as a normal image: it shows before the frames load, and instead of them if they fail. */}
        <img
          src={`${folder}/turn-00.webp`}
          alt={alt}
          width={WIDTH}
          height={HEIGHT}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`absolute inset-0 h-full w-full ${isReady ? 'invisible' : ''}`}
        />
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${isReady ? '' : 'invisible'}`}
        />
      </span>
      <span
        id={hintId}
        className="mt-2 block text-center font-sans text-[0.625rem] font-bold tracking-widest text-cream/50 uppercase"
      >
        <span className="pointer-coarse:hidden">Drag to turn · Click to open</span>
        <span className="hidden pointer-coarse:inline">Swipe to turn · Tap to open</span>
        <span className="sr-only"> · The arrow keys turn it too</span>
      </span>
    </a>
  )
}
