import type { ProductsResponse } from '../types/product'

const API_URL = 'https://dummyjson.com'

export async function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error(`GET /products failed with status ${response.status}`)
  }

  return response.json()
}
