import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return <p className={`font-sans text-xs font-bold tracking-widest uppercase ${className}`}>{children}</p>
}
