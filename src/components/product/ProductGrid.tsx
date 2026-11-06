import type { Product } from '../../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  onAdd: (product: Product) => boolean
}

export default function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-14 min-[481px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAdd={onAdd} />
        </li>
      ))}
    </ul>
  )
}
