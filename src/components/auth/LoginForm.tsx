import { useState, type FormEvent } from 'react'
import type { LoginFormErrors, LoginFormValues } from '../../types/user'
import { validateLogin } from '../../utils/validation'
import TextField from '../ui/TextField'

interface LoginFormProps {
  onLogin: (values: LoginFormValues) => void
}

const EMPTY_VALUES: LoginFormValues = { username: '', password: '' }

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<LoginFormErrors>({})

  const updateField = (field: keyof LoginFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateLogin(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      onLogin(values)
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <TextField
        id="username"
        label="Username"
        value={values.username}
        autoComplete="username"
        required
        error={errors.username}
        onChange={(value) => updateField('username', value)}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={values.password}
        autoComplete="current-password"
        required
        error={errors.password}
        onChange={(value) => updateField('password', value)}
      />
      <button
        type="submit"
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center bg-wine-700 px-6 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
      >
        Log In
      </button>
    </form>
  )
}
