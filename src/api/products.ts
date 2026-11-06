import type { Product, ProductsResponse } from '../types/product'

// Our gift boxes, wines, and Chocola chocolates from catalog/products.json, published as a DummyJSON custom response
// because DummyJSON's own products have no wine or chocolate. It expires on 4 February 2027; republish with catalog/publish.mjs.
const CATALOG_URL = 'https://dummyjson.com/c/fdc1-de3a-4f89-bb88'
// DummyJSON's CDN caches the plain URL together with the CORS origin of the first site that loaded it, which blocks
// every other site. The custom response ignores query strings, so asking with our own origin in one always allows us.
const CATALOG_REQUEST_URL = `${CATALOG_URL}?site=${encodeURIComponent(window.location.origin)}`

export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch(CATALOG_REQUEST_URL)

  if (!response.ok) {
    throw new Error(`GET ${CATALOG_URL} failed with status ${response.status}`)
  }

  return response.json()
}

// A custom response always returns the whole list and has no /products/:id, so the product is picked out by id.
// Resolves to null for an unknown id, so the page can show Not Found instead of an error.
export async function fetchProduct(id: number): Promise<Product | null> {
  const { products } = await fetchProducts()
  return products.find((product) => product.id === id) ?? null
}
