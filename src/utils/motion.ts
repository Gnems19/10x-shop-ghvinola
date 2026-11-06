// True when the visitor has asked their system for less motion; animations are skipped then.
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
