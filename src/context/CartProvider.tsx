import { useEffect, useState, type ReactNode } from 'react'
import type { CartItem, CartState } from '../types/cart'
import type { Product } from '../types/product'
import { cartItemCount, cartSubtotal } from '../utils/cart'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'shop_cart'

function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'productId' in value &&
    typeof value.productId === 'number' &&
    'title' in value &&
    typeof value.title === 'string' &&
    'thumbnail' in value &&
    typeof value.thumbnail === 'string' &&
    'price' in value &&
    typeof value.price === 'number' &&
    'discountPercentage' in value &&
    typeof value.discountPercentage === 'number' &&
    'stock' in value &&
    typeof value.stock === 'number' &&
    'quantity' in value &&
    typeof value.quantity === 'number'
  )
}

// Whatever is in localStorage may be old or edited by hand, so only valid items are kept.
function loadItems(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
    if (typeof saved === 'object' && saved !== null && 'items' in saved && Array.isArray(saved.items)) {
      return saved.items.filter(isCartItem)
    }
  } catch {
    // Broken JSON or blocked storage: start with an empty cart.
  }
  return []
}

function toCartItem(product: Product, quantity: number): CartItem {
  return {
    productId: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    price: product.price,
    discountPercentage: product.discountPercentage,
    stock: product.stock,
    quantity,
  }
}

interface CartProviderProps {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadItems)

  useEffect(() => {
    const cart: CartState = { items }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // Storage is full or blocked: the cart still works until the page reloads.
    }
  }, [items])

  const addItem = (product: Product, quantity: number) => {
    const inCart = items.find((item) => item.productId === product.id)?.quantity ?? 0
    const toAdd = Math.min(quantity, product.stock - inCart)
    if (toAdd < 1) return false

    setItems((current) =>
      inCart > 0
        ? current.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + toAdd } : item))
        : [...current, toCartItem(product, toAdd)],
    )
    return true
  }

  const setQuantity = (productId: number, quantity: number) =>
    setItems((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) } : item,
      ),
    )

  const removeItem = (productId: number) =>
    setItems((current) => current.filter((item) => item.productId !== productId))

  const clearCart = () => setItems([])

  return (
    <CartContext
      value={{
        items,
        itemCount: cartItemCount(items),
        subtotal: cartSubtotal(items),
        addItem,
        setQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext>
  )
}
