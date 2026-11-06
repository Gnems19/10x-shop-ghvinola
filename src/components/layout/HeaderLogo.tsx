import GhvinolaWordmark from '../ui/GhvinolaWordmark'

interface HeaderLogoProps {
  variant: 'icon' | 'wordmark'
}

const MOTION = 'duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none'

// The icon is the wordmark cut down to its first letter, ღ, with the grape bunch under it,
// so switching between the two unrolls the rest of the word out of the ღ or rolls it back in.
export default function HeaderLogo({ variant }: HeaderLogoProps) {
  const isIcon = variant === 'icon'

  return (
    <span className="relative block [--logo-height:2rem] lg:[--logo-height:2.5rem]">
      {/* The wordmark's viewBox is 1078 × 231 units, and ღ fills the first 194 of them. */}
      <span
        className={`block overflow-hidden transition-[width] ${MOTION} ${
          isIcon ? 'w-[calc(var(--logo-height)*194/231)]' : 'w-[calc(var(--logo-height)*1078/231)]'
        }`}
      >
        <GhvinolaWordmark className="h-(--logo-height) w-auto" />
      </span>
      <svg
        aria-hidden="true"
        viewBox="76 82 194 231"
        fill="currentColor"
        className={`absolute top-0 left-0 h-(--logo-height) w-auto overflow-visible transition-opacity ${MOTION} ${
          isIcon ? 'delay-150' : 'opacity-0'
        }`}
      >
        {/* The grape bunch from src/assets/ghvinola_icon.svg, which draws ღ 4.106 units further right and 8.848 higher.
            That file trims each grape with a white outline, so they are drawn here at the size they show there. */}
        <g transform="translate(-4.106 8.848)">
          <circle cx="157.846" cy="291.172" r="7.45" />
          <circle cx="176.253" cy="292.265" r="7.45" />
          <circle cx="167.992" cy="276.089" r="7.45" />
          <circle cx="147.939" cy="306.724" r="7.45" />
          <circle cx="184.626" cy="308.661" r="7.45" />
          <circle cx="166.304" cy="307.734" r="7.45" />
        </g>
      </svg>
    </span>
  )
}
