import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'
import Hero from '../components/home/Hero'
import Showcase from '../components/home/Showcase'
import ProductGrid from '../components/product/ProductGrid'
import Container from '../components/ui/Container'
import PageHeader from '../components/ui/PageHeader'
import StatusMessage from '../components/ui/StatusMessage'
import type { Product } from '../types/product'

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Drops a late response after unmount, or from the first run when StrictMode runs effects twice.
    let ignore = false

    fetchProducts()
      .then((data) => {
        if (ignore) return
        setProducts(data.products)
        setTotal(data.total)
      })
      .catch(() => {
        if (!ignore) setError("We couldn't load the products. Check your connection and refresh the page.")
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <Hero />
      {/* Positioned and opaque so it slides over the hero, which stays pinned on large screens. */}
      <div className="relative z-10">
        <Showcase />
        <section id="catalog" className="scroll-mt-24 bg-cream py-20 lg:py-32">
          <Container>
            <PageHeader eyebrow="Shop" title="Catalog" as="h2">
              {products.length > 0 && (
                <p className="font-sans text-xs font-bold tracking-widest text-wine-950/60 uppercase">
                  Showing 1–{products.length} of {total}
                </p>
              )}
            </PageHeader>

            <div className="mt-10">
              {isLoading && <StatusMessage role="status">Loading products…</StatusMessage>}
              {error && <StatusMessage role="alert">{error}</StatusMessage>}
              {!isLoading && !error && products.length === 0 && <StatusMessage>No products found.</StatusMessage>}
              {products.length > 0 && <ProductGrid products={products} />}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
