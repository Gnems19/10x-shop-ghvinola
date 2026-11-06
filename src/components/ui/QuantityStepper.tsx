interface QuantityStepperProps {
  value: number
  max: number
  label: string
  onChange: (value: number) => void
  disabled?: boolean
}

const buttonClass =
  'grid size-11 cursor-pointer place-items-center font-sans text-lg text-wine-900 transition-colors hover:bg-wine-900/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-wine-700 disabled:cursor-not-allowed disabled:text-wine-950/30 disabled:hover:bg-transparent'

export default function QuantityStepper({ value, max, label, onChange, disabled = false }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-wine-900/25 bg-white/60">
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={disabled || value <= 1}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        −
      </button>
      <output aria-live="polite" className="min-w-10 text-center font-sans text-sm font-bold text-wine-950">
        {value}
      </output>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={disabled || value >= max}
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        +
      </button>
    </div>
  )
}
