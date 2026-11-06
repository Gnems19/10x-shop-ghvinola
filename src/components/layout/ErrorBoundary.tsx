import { Component, type ErrorInfo, type ReactNode } from 'react'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// React only catches render errors in class components; hooks have no equivalent yet.
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught render error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <section role="alert" className="py-24 lg:py-40">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow className="text-wine-600">Unexpected error</Eyebrow>
            <h1 className="mt-4 font-sans text-3xl font-bold tracking-wide text-wine-900 uppercase lg:text-5xl">
              Something went wrong.
            </h1>
            <p className="mt-6 text-xl/relaxed text-wine-950/70">Reloading the page usually fixes it.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-10 inline-flex min-h-12 cursor-pointer items-center justify-center bg-wine-700 px-6 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
            >
              Reload
            </button>
          </div>
        </Container>
      </section>
    )
  }
}
