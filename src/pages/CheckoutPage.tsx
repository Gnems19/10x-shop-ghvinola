import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import CartSummary from '../components/cart/CartSummary'
import CheckoutForm from '../components/checkout/CheckoutForm'
import OrderConfirmation from '../components/checkout/OrderConfirmation'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import useCart from '../hooks/useCart'
import type { CheckoutFormValues, OrderSummary } from '../types/checkout'

// Stands in for a server call, so the disabled button shows and a double click can't place the order twice.
const PLACE_ORDER_DELAY_MS = 600

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [isPlacing, setIsPlacing] = useState(false)
  const [order, setOrder] = useState<OrderSummary | null>(null)
  const orderTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(orderTimer.current), [])

  const handlePlaceOrder = (shipping: CheckoutFormValues) => {
    setIsPlacing(true)
    orderTimer.current = window.setTimeout(() => {
      setOrder({ items, shipping, total: subtotal })
      clearCart()
      setIsPlacing(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, PLACE_ORDER_DELAY_MS)
  }

  if (!order && items.length === 0) return <Navigate to="/cart" replace />

  return (
    <section className="py-16 lg:py-24">
      <Container>
        {order ? (
          <OrderConfirmation order={order} />
        ) : (
          <>
            <PageHeader eyebrow="Almost there" title="Checkout" />
            <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <h2 className="mb-6 font-sans text-xs font-bold tracking-widest text-wine-900 uppercase">
                  Shipping details
                </h2>
                <CheckoutForm isPlacing={isPlacing} onPlaceOrder={handlePlaceOrder} />
              </div>
              <div className="lg:col-span-5">
                <CartSummary items={items} showItems />
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
