import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'
import Eyebrow from '../ui/Eyebrow'
import StockStatus from './StockStatus'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const price = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage >= 1
  const category = product.category.replaceAll('-', ' ')

  return (
    <article className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="aspect-square overflow-hidden rounded-sm bg-white/70">
        <img
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          className="size-full object-contain p-8"
        />
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
      </div>
    </article>
  )
}
