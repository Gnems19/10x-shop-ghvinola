import { Link } from 'react-router-dom'
import CartItemRow from '../components/cart/CartItemRow'
import CartSummary from '../components/cart/CartSummary'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import useCart from '../hooks/useCart'

const buttonLinkClass =
  'inline-flex min-h-12 items-center justify-center bg-wine-700 px-6 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700'

export default function CartPage() {
  const { items, setQuantity, removeItem, clearCart } = useCart()

  const handleClear = () => {
    if (window.confirm('Clear the cart? This cannot be undone.')) clearCart()
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <PageHeader eyebrow="Your selection" title="Cart" />

        {items.length === 0 ? (
          <div className="flex flex-col items-start gap-6 pt-10">
            <p className="text-xl text-wine-950/70">Your cart is empty.</p>
            <Link to="/#catalog" className={buttonLinkClass}>
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 pt-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 className="sr-only">Items in your cart</h2>
              <ul className="divide-y divide-wine-900/15 border-b border-wine-900/15">
                {items.map((item) => (
                  <CartItemRow key={item.productId} item={item} onQuantityChange={setQuantity} onRemove={removeItem} />
                ))}
              </ul>
              <button
                type="button"
                onClick={handleClear}
                className="mt-4 inline-flex min-h-11 cursor-pointer items-center font-sans text-xs font-bold tracking-widest text-wine-950/60 uppercase underline-offset-4 transition-colors hover:text-wine-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700"
              >
                Clear cart
              </button>
            </div>

            <div className="lg:col-span-4">
              <CartSummary items={items}>
                <Link to="/checkout" className={`${buttonLinkClass} w-full`}>
                  Proceed to checkout
                </Link>
              </CartSummary>
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
