import { createContext } from 'react'
import type { AuthUser } from '../types/user'

export interface AuthContextValue extends AuthUser {
  login: (username: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
