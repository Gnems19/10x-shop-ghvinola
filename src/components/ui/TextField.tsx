import type { HTMLInputTypeAttribute } from 'react'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: HTMLInputTypeAttribute
  autoComplete?: string
  required?: boolean
  error?: string
}

export default function TextField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  required = false,
  error,
}: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="font-sans text-xs font-bold tracking-widest text-wine-900 uppercase">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 block min-h-12 w-full border bg-white/60 px-4 text-lg text-wine-950 transition-colors focus:outline-1 ${
          error
            ? 'border-red-700 focus:outline-red-700'
            : 'border-wine-900/25 hover:border-wine-900/50 focus:border-wine-700 focus:outline-wine-700'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-2 font-sans text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
