import { Outlet, useLocation } from 'react-router-dom'
import useSmoothScroll from '../../hooks/useSmoothScroll'
import ErrorBoundary from './ErrorBoundary'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  const { pathname } = useLocation()
  useSmoothScroll()

  return (
    <div className="flex min-h-svh flex-col">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only rounded-sm bg-cream px-4 py-3 font-sans text-xs font-bold tracking-widest text-wine-900 uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* A new key per page clears a caught error once the user navigates away. */}
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}
