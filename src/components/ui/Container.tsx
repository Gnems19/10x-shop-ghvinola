import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 ${className}`}>{children}</div>
}
