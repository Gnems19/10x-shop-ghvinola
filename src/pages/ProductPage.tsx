import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchProduct } from '../api/products'
import ProductDetails from '../components/product/ProductDetails'
import Container from '../components/ui/Container'
import StatusMessage from '../components/ui/StatusMessage'
import type { Product } from '../types/product'
import NotFoundPage from './NotFoundPage'

type ProductResult =
  | { id: number; status: 'success'; product: Product }
  | { id: number; status: 'not-found' }
  | { id: number; status: 'error' }

export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0
  const [result, setResult] = useState<ProductResult | null>(null)

  // A result for another id is left over from the previous product, so this one is still loading.
  const current = result?.id === productId ? result : null

  useEffect(() => {
    if (!isValidId) return

    // Drops a late response after unmount, or for the previous product when the id changes.
    let ignore = false

    fetchProduct(productId)
      .then((product) => {
        if (ignore) return
        setResult(product ? { id: productId, status: 'success', product } : { id: productId, status: 'not-found' })
      })
      .catch(() => {
        if (!ignore) setResult({ id: productId, status: 'error' })
      })

    return () => {
      ignore = true
    }
  }, [productId, isValidId])

  // /products/abc never reaches the API; an unknown number gets a 404 from it.
  if (!isValidId || current?.status === 'not-found') return <NotFoundPage />

  return (
    <section className="py-10 lg:py-16">
      <Container>
        <Link
          to="/#catalog"
          className="inline-flex min-h-11 items-center font-sans text-xs font-bold tracking-widest text-wine-700 uppercase transition-colors hover:text-wine-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine-700"
        >
          ← Back to catalog
        </Link>

        <div className="mt-6 lg:mt-10">
          {!current && <StatusMessage role="status">Loading product…</StatusMessage>}
          {current?.status === 'error' && (
            <StatusMessage role="alert">
              We couldn't load this product. Check your connection and refresh the page.
            </StatusMessage>
          )}
          {current?.status === 'success' && <ProductDetails key={current.id} product={current.product} />}
        </div>
      </Container>
    </section>
  )
}
