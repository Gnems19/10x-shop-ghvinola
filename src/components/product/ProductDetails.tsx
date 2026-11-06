import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../../hooks/useCart'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'
import Eyebrow from '../ui/Eyebrow'
import QuantityStepper from '../ui/QuantityStepper'
import StockStatus from './StockStatus'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { items, addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedCount, setAddedCount] = useState(0)

  const price = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage >= 1
  const category = product.category.replaceAll('-', ' ')
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  // The stepper only offers what is still in stock after what the cart already holds.
  const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
  const available = product.stock - inCart
  const canAdd = available > 0

  const handleAdd = () => {
    if (addItem(product, quantity)) {
      setAddedCount(quantity)
      setQuantity(1)
    }
  }

  return (
    <article className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="aspect-square overflow-hidden rounded-sm bg-white/70">
          <img
            src={images[selectedImage] ?? product.thumbnail}
            alt={product.title}
            width={600}
            height={600}
            className="size-full object-contain p-8"
          />
        </div>

        {images.length > 1 && (
          <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {images.map((image, index) => (
              <li key={image}>
                <button
                  type="button"
                  aria-label={`Show photo ${index + 1} of ${images.length}`}
                  aria-pressed={index === selectedImage}
                  onClick={() => setSelectedImage(index)}
                  className={`block aspect-square w-full cursor-pointer overflow-hidden rounded-sm bg-white/70 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700 ${
                    index === selectedImage ? 'ring-2 ring-wine-700' : ''
                  }`}
                >
                  <img src={image} alt="" width={120} height={120} loading="lazy" className="size-full object-contain p-2" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-6 lg:py-6">
        <div>
          <Eyebrow className="text-wine-600">{product.brand ? `${category} · ${product.brand}` : category}</Eyebrow>
          <h1 className="mt-3 text-4xl/tight text-wine-950 lg:text-5xl/tight">{product.title}</h1>
          <p className="mt-3 font-sans text-sm font-semibold text-wine-950/70">
            <span aria-hidden="true" className="text-wine-600">
              ★{' '}
            </span>
            {product.rating.toFixed(1)}
            <span className="sr-only"> out of 5 stars</span>
          </p>
        </div>

        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans">
          <span className="text-3xl font-bold text-wine-900">{formatPrice(price)}</span>
          {hasDiscount && (
            <>
              <s className="text-lg text-wine-950/50">
                <span className="sr-only">Original price: </span>
                {formatPrice(product.price)}
              </s>
              <span className="bg-emerald-800/10 px-2 py-0.5 text-sm font-bold text-emerald-800">
                −{Math.round(product.discountPercentage)}%
              </span>
            </>
          )}
        </p>

        <StockStatus stock={product.stock} />

        <p className="max-w-xl border-t border-wine-900/15 pt-6 text-lg/relaxed text-wine-950/80">
          {product.description}
        </p>

        <div className="flex max-w-xl flex-wrap items-center gap-4 border-t border-wine-900/15 pt-6">
          <QuantityStepper
            value={quantity}
            max={Math.max(available, 1)}
            label="Quantity"
            onChange={setQuantity}
            disabled={!canAdd}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center bg-wine-700 px-8 font-sans text-xs font-bold tracking-widest text-cream uppercase transition-colors hover:bg-wine-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700 disabled:cursor-not-allowed disabled:bg-wine-950/20 disabled:text-wine-950/50 sm:flex-none"
          >
            {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
          </button>
        </div>

        <p role="status" className="font-sans text-sm text-wine-950/80">
          {addedCount > 0 && (
            <>
              Added {addedCount} to your cart.{' '}
              <Link
                to="/cart"
                className="font-bold text-wine-700 underline underline-offset-4 hover:text-wine-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700"
              >
                View cart
              </Link>
            </>
          )}
          {addedCount === 0 && product.stock > 0 && !canAdd && `Your cart already holds all ${product.stock} in stock.`}
        </p>
      </div>
    </article>
  )
}
