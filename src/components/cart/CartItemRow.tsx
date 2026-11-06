import { Link } from 'react-router-dom'
import type { CartItem } from '../../types/cart'
import { lineTotal } from '../../utils/cart'
import { discountedPrice, formatPrice } from '../../utils/format'
import QuantityStepper from '../ui/QuantityStepper'

interface CartItemRowProps {
  item: CartItem
  onQuantityChange: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

export default function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const productPath = `/products/${item.productId}`

  return (
    <li className="flex gap-4 py-6 sm:gap-6">
      <Link to={productPath} tabIndex={-1} aria-hidden="true" className="shrink-0">
        <img
          src={item.thumbnail}
          alt=""
          width={96}
          height={96}
          loading="lazy"
          className="size-20 rounded-sm bg-white/70 object-contain p-2 sm:size-24"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <h3 className="text-xl/snug text-wine-950">
            <Link
              to={productPath}
              className="transition-colors hover:text-wine-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700"
            >
              {item.title}
            </Link>
          </h3>
          <p className="mt-1 font-sans text-sm text-wine-950/70">
            {formatPrice(discountedPrice(item.price, item.discountPercentage))} each
          </p>
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="mt-2 inline-flex min-h-11 cursor-pointer items-center font-sans text-xs font-bold tracking-widest text-wine-700 uppercase underline-offset-4 transition-colors hover:text-wine-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700"
          >
            Remove<span className="sr-only"> {item.title}</span>
          </button>
        </div>

        <div className="flex items-center justify-between gap-6">
          <QuantityStepper
            value={item.quantity}
            max={item.stock}
            label={`Quantity of ${item.title}`}
            onChange={(quantity) => onQuantityChange(item.productId, quantity)}
          />
          <p className="w-28 text-right font-sans text-base font-bold text-wine-900">{formatPrice(lineTotal(item))}</p>
        </div>
      </div>
    </li>
  )
}
