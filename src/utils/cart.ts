import type { CartItem } from '../types/cart'
import { discountedPrice } from './format'

export function lineTotal(item: CartItem): number {
  return discountedPrice(item.price, item.discountPercentage) * item.quantity
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + lineTotal(item), 0)
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}
