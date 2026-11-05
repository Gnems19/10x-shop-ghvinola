import { useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/user'
import { AuthContext } from './AuthContext'

const GUEST: AuthUser = { username: '', isLoggedIn: false }

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(GUEST)

  const login = (username: string) => setUser({ username, isLoggedIn: true })
  const logout = () => setUser(GUEST)

  return <AuthContext value={{ ...user, login, logout }}>{children}</AuthContext>
}
