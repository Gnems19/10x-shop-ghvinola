import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import Container from '../components/ui/Container'
import Eyebrow from '../components/ui/Eyebrow'
import useAuth from '../hooks/useAuth'
import type { LoginFormValues } from '../types/user'

function getRedirectPath(state: unknown) {
  if (typeof state === 'object' && state !== null && 'from' in state && typeof state.from === 'string') {
    return state.from
  }
  return '/'
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = (values: LoginFormValues) => {
    login(values.username.trim())
    navigate(getRedirectPath(location.state), { replace: true })
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <Eyebrow className="text-wine-600">Account</Eyebrow>
          <h1 className="mt-4 font-sans text-3xl font-bold tracking-wide text-wine-900 uppercase lg:text-[2.5rem]">
            Log in
          </h1>
          <p className="mt-4 text-lg/relaxed text-wine-950/70">
            This is a demo sign-in: any username and a password of at least 6 characters will work.
          </p>

          <div className="mt-10 border-t border-wine-900/15 pt-10">
            <LoginForm onLogin={handleLogin} />
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex min-h-11 items-center font-sans text-xs font-bold tracking-widest text-wine-700 uppercase transition-colors hover:text-wine-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
          >
            ← Back to catalog
          </Link>
        </div>
      </Container>
    </section>
  )
}
