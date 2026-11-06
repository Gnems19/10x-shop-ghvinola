import { Link } from 'react-router-dom'
import type { OrderSummary } from '../../types/checkout'
import { formatPrice } from '../../utils/format'
import CartSummary from '../cart/CartSummary'
import Eyebrow from '../ui/Eyebrow'

interface OrderConfirmationProps {
  order: OrderSummary
}

export default function OrderConfirmation({ order }: OrderConfirmationProps) {
  const { fullName, address, city } = order.shipping

  return (
    <div className="mx-auto max-w-2xl">
      <Eyebrow className="text-wine-600">Order confirmed</Eyebrow>
      <h1 className="mt-4 text-4xl/tight text-wine-950 lg:text-5xl/tight">Thank you! Your order has been placed.</h1>
      <p className="mt-6 text-xl/relaxed text-wine-950/80">
        Order total: <strong className="font-sans font-bold text-wine-900">{formatPrice(order.total)}</strong>
      </p>
      <p className="mt-2 text-lg/relaxed text-wine-950/70">
        It will be shipped to {fullName}, {address}, {city}.
      </p>

      <div className="mt-10">
        <CartSummary items={order.items} title="Your order" showItems />
      </div>

      <Link
        to="/#catalog"
        className="mt-10 inline-flex min-h-12 items-center justify-center bg-wine-700 px-6 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
      >
        Continue shopping
      </Link>
    </div>
  )
}
