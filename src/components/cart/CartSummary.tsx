import type { ReactNode } from 'react'
import type { CartItem } from '../../types/cart'
import { cartItemCount, cartSubtotal, lineTotal } from '../../utils/cart'
import { formatPrice } from '../../utils/format'

interface CartSummaryProps {
  items: CartItem[]
  title?: string
  showItems?: boolean
  children?: ReactNode
}

export default function CartSummary({ items, title = 'Order summary', showItems = false, children }: CartSummaryProps) {
  const itemCount = cartItemCount(items)
  const subtotal = cartSubtotal(items)

  return (
    <aside className="h-fit rounded-sm bg-white/60 p-6 sm:p-8">
      <h2 className="font-sans text-xs font-bold tracking-widest text-wine-900 uppercase">{title}</h2>

      {showItems && (
        <ul className="mt-6 space-y-3 border-b border-wine-900/15 pb-6">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-4 text-base text-wine-950">
              <span className="min-w-0">
                {item.title} <span className="font-sans text-sm text-wine-950/60">× {item.quantity}</span>
              </span>
              <span className="shrink-0 font-sans text-sm font-semibold">{formatPrice(lineTotal(item))}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-6 space-y-3 font-sans text-sm text-wine-950/80">
        <div className="flex justify-between gap-4">
          <dt>
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Shipping</dt>
          <dd>Free</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-wine-900/15 pt-3 text-base font-bold text-wine-900">
          <dt>Total</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
      </dl>

      {children && <div className="mt-8">{children}</div>}
    </aside>
  )
}
