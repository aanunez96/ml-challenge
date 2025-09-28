interface StockBadgeProps {
  stock: number
}

export default function StockBadge({ stock }: StockBadgeProps) {
  const getStockInfo = (stock: number) => {
    if (stock === 0) {
      return {
        label: 'Sin stock',
        bgColor: 'var(--marketplace-border)',
        textColor: 'var(--marketplace-text)',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      }
    }

    if (stock <= 5) {
      return {
        label: `¡Último disponible!`,
        bgColor: '#FF6B35',
        textColor: 'white',
        icon: (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
          </svg>
        )
      }
    }

    return {
      label: `Stock disponible`,
      bgColor: 'var(--marketplace-success)',
      textColor: 'white',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  const { label, bgColor, textColor, icon } = getStockInfo(stock)

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm font-medium"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '4px'
      }}
      data-testid="stock-badge"
    >
      {icon}
      <span>{label}</span>

      {/* Screen reader context */}
      <span className="sr-only">
        {stock === 0 ? 'Este artículo no está disponible actualmente' : 'Este artículo está disponible para compra'}
      </span>
    </div>
  )
}
