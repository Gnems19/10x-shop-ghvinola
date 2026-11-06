import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'
import Eyebrow from '../ui/Eyebrow'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => boolean
}

type AddFeedback = 'added' | 'no-more' | null

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [feedback, setFeedback] = useState<AddFeedback>(null)
  const price = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage >= 1
  const category = product.category.replaceAll('-', ' ')
  const isOutOfStock = product.stock === 0

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(null), 2000)
    return () => clearTimeout(timer)
  }, [feedback])

  const handleAdd = () => setFeedback(onAdd(product) ? 'added' : 'no-more')

  let buttonLabel = 'Add to cart'
  if (isOutOfStock) buttonLabel = 'Out of stock'
  else if (feedback === 'added') buttonLabel = 'Added ✓'
  else if (feedback === 'no-more') buttonLabel = 'No more in stock'

  return (
    <article className="group relative flex h-full flex-col">
      <div className="aspect-square overflow-hidden rounded-sm bg-white/70">
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          loading="lazy"
          className="size-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 sm:p-8"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <Eyebrow className="text-wine-600">{product.brand ? `${category} · ${product.brand}` : category}</Eyebrow>
        <p className="shrink-0 font-sans text-xs font-semibold text-wine-950/70">
          <span aria-hidden="true" className="text-wine-600">
            ★{' '}
          </span>
          {product.rating.toFixed(1)}
          <span className="sr-only"> out of 5 stars</span>
        </p>
      </div>

      <h3 className="mt-2 text-xl/snug text-wine-950 xl:text-2xl/snug">
        <Link
          to={`/products/${product.id}`}
          className="transition-colors group-hover:text-wine-700 after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-wine-700"
        >
          {product.title}
        </Link>
      </h3>

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans">
        <span className="text-base font-bold text-wine-900">{formatPrice(price)}</span>
        {hasDiscount && (
          <>
            <s className="text-sm text-wine-950/70">
              <span className="sr-only">Original price: </span>
              {formatPrice(product.price)}
            </s>
            <span className="bg-emerald-800/10 px-2 py-0.5 text-xs font-bold text-emerald-800">
              −{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </p>

      {/* Sits above the title link, which stretches over the whole card. */}
      <div className="relative z-10 mt-auto pt-5">
        <button
          type="button"
          onClick={handleAdd}
          disabled={isOutOfStock}
          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center border border-wine-700 px-4 font-sans text-xs font-bold tracking-widest text-wine-700 uppercase transition-colors hover:bg-wine-700 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wine-700 disabled:cursor-not-allowed disabled:border-wine-900/20 disabled:text-wine-950/40 disabled:hover:bg-transparent"
        >
          {buttonLabel}
        </button>
        <p role="status" className="sr-only">
          {feedback === 'added' && `${product.title} added to cart`}
          {feedback === 'no-more' && `Your cart already holds all ${product.stock} of ${product.title}`}
        </p>
      </div>
    </article>
  )
}
