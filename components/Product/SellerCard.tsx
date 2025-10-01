interface Seller {
  id: string
  name: string
  rating: number
  sales: number
  isOfficial: boolean
  location?: string
}

interface SellerCardProps {
  seller: Seller
}

export default function SellerCard({ seller }: SellerCardProps) {
  const formatSales = (sales: number) => {
    if (sales >= 1000000) {
      return `${(sales / 1000000).toFixed(1)}M`
    }
    if (sales >= 1000) {
      return `${(sales / 1000).toFixed(1)}K`
    }
    return sales.toString()
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4"
            style={{ color: 'var(--star-color)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <svg
              className="w-4 h-4"
              style={{ color: 'var(--marketplace-border)' }}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 w-1/2 overflow-hidden">
              <svg
                className="w-4 h-4"
                style={{ color: 'var(--star-color)' }}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4"
            style={{ color: 'var(--marketplace-border)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      }
    }

    return stars
  }

  return (
    <div data-testid="seller-card">
      <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--marketplace-text)' }}>
        Información del vendedor
      </h3>

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: 'var(--marketplace-accent)' }}
            data-testid="seller-avatar"
          >
            {seller.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className="font-medium"
              style={{ color: 'var(--marketplace-text)' }}
              data-testid="seller-name"
            >
              {seller.name}
            </h4>
            {seller.isOfficial && (
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  style={{ color: 'var(--marketplace-accent)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--marketplace-accent)' }}
                  data-testid="seller-official-badge"
                >
                  MercadoLíder
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-1">{renderStars(seller.rating)}</div>
            <span className="text-sm ml-1" style={{ color: 'var(--marketplace-muted)' }}>
              {seller.rating.toFixed(1)}
            </span>
          </div>

          <div className="text-sm mb-2" style={{ color: 'var(--marketplace-muted)' }}>
            <span className="font-medium" style={{ color: 'var(--marketplace-text)' }}>
              +{formatSales(seller.sales)}
            </span>{' '}
            ventas
          </div>

          {seller.location && (
            <div
              className="flex items-center gap-1 text-sm"
              style={{ color: 'var(--marketplace-muted)' }}
              data-testid="seller-location"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>{seller.location}</span>
            </div>
          )}

          <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--marketplace-border)' }}>
            <button
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--marketplace-accent)' }}
            >
              Ver más datos de este vendedor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
