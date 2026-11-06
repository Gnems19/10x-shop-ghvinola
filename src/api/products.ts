import type { Product, ProductsResponse } from '../types/product'

const API_URL = 'https://dummyjson.com'

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error(`GET /products failed with status ${response.status}`)
  }

  return response.json()
}

// Resolves to null when DummyJSON answers 404, so the page can show Not Found instead of an error.
export async function fetchProduct(id: number): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`GET /products/${id} failed with status ${response.status}`)
  }

  return response.json()
}
