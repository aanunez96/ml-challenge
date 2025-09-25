interface StockBadgeProps {
  stock: number
}

export default function StockBadge({ stock }: StockBadgeProps) {
  const getStockInfo = (stock: number) => {
    if (stock === 0) {
      return {
        label: 'Out of stock',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      }
    }
    
    if (stock <= 5) {
      return {
        label: `Only ${stock} left in stock`,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      }
    }
    
    if (stock <= 20) {
      return {
        label: `${stock} in stock`,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
      }
    }
    
    return {
      label: 'In stock',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  }

  const { label, bgColor, textColor, icon } = getStockInfo(stock)

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${bgColor} ${textColor}`} data-testid="stock-badge">
      {icon}
      <span>{label}</span>
      
      {/* Screen reader context */}
      <span className="sr-only">
        {stock === 0 ? 'This item is currently unavailable' : 'This item is available for purchase'}
      </span>
    </div>
  )
}