'use client'

import { ProductFeature, ProductResponse } from '@/lib/validators'
import { useEffect, useState } from 'react'
import SellerCard from './SellerCard'
import StockBadge from './StockBadge'

interface BuyBoxProps {
  product: ProductResponse
  disabled?: boolean
}

export default function BuyBox({ product, disabled = false }: BuyBoxProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    alert('Demo only - no actual purchase will be processed')
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    alert('Demo only - no actual purchase will be processed')
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    alert('Demo only - added to wishlist')
  }

  const renderFeatureIcon = (iconType: string) => {
    const iconProps = { className: "w-4 h-4 fill-current", viewBox: "0 0 24 24" }

    switch (iconType) {
      case 'truck':
        return (
          <svg {...iconProps} className="w-4 h-4 fill-current text-ml-success">
            <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        )
      case 'shield-check':
        return (
          <svg {...iconProps} className="w-4 h-4 fill-current text-ml-success">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )
      case 'return':
        return (
          <svg {...iconProps} className="w-4 h-4 fill-current text-ml-muted">
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16H9V7h9v14z"/>
          </svg>
        )
      case 'star':
        return (
          <svg {...iconProps} className="w-4 h-4 fill-current text-ml-accent">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
      default:
        return (
          <svg {...iconProps} className="w-4 h-4 fill-current text-ml-muted">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )
    }
  }

  const getFeatureColor = (feature: ProductFeature) => {
    if (feature.highlight) {
      return 'text-ml-success'
    }
    switch (feature.icon) {
      case 'truck':
      case 'shield-check':
        return 'text-ml-success'
      case 'star':
        return 'text-ml-accent'
      default:
        return 'text-ml-muted'
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Buy Box */}
      <div
        className={`bg-ml-bg border border-ml-border rounded p-4 space-y-4 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        data-testid="buybox"
      >
        {/* Color and options */}
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-ml-text">Color:</span>
            <span className="ml-2 text-sm text-ml-muted">Negro</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleBuyNow}
            disabled={disabled}
            className={`w-full px-4 py-3 font-medium text-center transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed text-white rounded ${
              disabled ? 'bg-ml-border' : 'bg-ml-accent hover:bg-ml-accent/90'
            }`}
            title="Demo only"
            data-testid="buy-now-button"
          >
            {disabled ? 'Sin stock' : 'Comprar ahora'}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={disabled}
            className="w-full px-4 py-3 font-medium text-center transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed border border-ml-accent bg-blue-50 text-ml-accent hover:bg-blue-100 rounded"
            title="Demo only"
            data-testid="add-to-cart-button"
          >
            {disabled ? 'No disponible' : 'Agregar al carrito'}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className="w-full px-4 py-2 text-sm font-medium text-center transition-all duration-200 focus-ring border border-ml-border text-ml-accent hover:bg-gray-50 rounded flex items-center justify-center gap-2"
            title="Agregar a favoritos"
            data-testid="wishlist-button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Agregar a favoritos
          </button>
        </div>

        {/* Seller Card integrated below */}
        <SellerCard seller={product.seller} />

        {/* Stock info */}
        <div className="text-sm text-ml-muted">
          <StockBadge stock={product.stock} />
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-2">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                {renderFeatureIcon(feature.icon)}
                <span className={`text-sm ${getFeatureColor(feature)}`}>
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
