import { createContext } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  // Returns false when the cart already holds the whole stock, so nothing was added.
  addItem: (product: Product, quantity: number) => boolean
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
