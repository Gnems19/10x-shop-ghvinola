interface StockStatusProps {
  stock: number
}

export default function StockStatus({ stock }: StockStatusProps) {
  if (stock === 0) {
    return <p className="font-sans text-sm font-bold text-red-700">Out of stock</p>
  }

  if (stock <= 5) {
    return <p className="font-sans text-sm font-bold text-orange-700">Only {stock} left!</p>
  }

  return <p className="font-sans text-sm font-bold text-emerald-800">In stock</p>
}
