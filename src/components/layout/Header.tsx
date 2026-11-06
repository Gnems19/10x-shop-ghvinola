import { startTransition, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useHeaderScroll from '../../hooks/useHeaderScroll'
import useHeroLogoInSight from '../../hooks/useHeroLogoInSight'
import Container from '../ui/Container'
import HeaderLogo from './HeaderLogo'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Catalog', end: true },
  { to: '/cart', label: 'Cart' },
]

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-4 font-sans text-sm font-bold tracking-wide uppercase underline-offset-8 transition-colors hover:text-wine-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-wine-300 ${
    isActive ? 'text-wine-300 underline decoration-1' : ''
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-12 items-center font-sans text-sm font-bold tracking-wide uppercase transition-colors hover:text-wine-300 focus-visible:outline-2 focus-visible:outline-wine-300 ${
    isActive ? 'text-wine-300' : ''
  }`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const { header, headerRef, isAtTop } = useHeaderScroll(isMenuOpen)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // The home hero runs up under the header, so only there does the header start see-through.
  // Elsewhere the background must not fade in, or the cream text would flash over the cream page.
  const isHome = pathname === '/'
  const isClear = isHome && isAtTop && !isMenuOpen
  // While the hero's big wordmark is on screen the header shows only the ღ icon, so the name isn't there twice.
  const isHeroLogoInSight = useHeroLogoInSight(header, isHome)

  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    closeMenu()
    // React Router renders navigations as transitions; logging out in the same transition
    // keeps ProtectedRoute from seeing a guest on /checkout and redirecting to /login.
    startTransition(() => {
      logout()
      navigate('/')
    })
  }

  return (
    <header
      ref={headerRef}
      className={`top-0 z-50 text-cream will-change-transform ${
        isHome
          ? 'fixed inset-x-0 transition-colors duration-450 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none'
          : 'sticky'
      } ${isClear ? 'bg-transparent' : 'bg-wine-900'}`}
    >
      <Container>
        <div className="flex items-center justify-between gap-6 border-b border-cream/25 py-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex min-h-11 min-w-11 items-center transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-300"
          >
            <HeaderLogo variant={isHeroLogoInSight ? 'icon' : 'wordmark'} />
            <span className="sr-only">10X Shop</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="-mr-4 flex items-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} className={desktopLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`cursor-pointer ${desktopLinkClass({ isActive: false })}`}
                  >
                    Log out
                  </button>
                ) : (
                  <NavLink to="/login" className={desktopLinkClass}>
                    Log in
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="-mr-2.5 grid size-11 cursor-pointer place-items-center transition-colors hover:text-wine-300 focus-visible:outline-2 focus-visible:outline-wine-300 md:hidden"
          >
            <span aria-hidden="true" className="flex h-4 w-6 flex-col justify-between">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-[7.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-[7.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {isMenuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="md:hidden">
            <ul className="divide-y divide-cream/15 py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.end} onClick={closeMenu} className={mobileLinkClass}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                {isLoggedIn ? (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`w-full cursor-pointer ${mobileLinkClass({ isActive: false })}`}
                  >
                    Log out
                  </button>
                ) : (
                  <NavLink to="/login" onClick={closeMenu} className={mobileLinkClass}>
                    Log in
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  )
}
