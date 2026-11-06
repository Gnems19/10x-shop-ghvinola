import type { CartItem } from './cart'

export interface CheckoutFormValues {
  fullName: string
  email: string
  address: string
  city: string
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>

export interface OrderSummary {
  items: CartItem[]
  shipping: CheckoutFormValues
  total: number
}
