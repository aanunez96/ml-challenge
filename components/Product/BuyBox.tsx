'use client'

import { ProductResponse } from '@/lib/validators'

interface BuyBoxProps {
  product: ProductResponse
  disabled?: boolean
}

export default function BuyBox({ product, disabled = false }: BuyBoxProps) {
  const handleAddToCart = () => {
    // In a real app, this would add to cart
    console.log('Add to cart clicked - checkout not implemented')
  }

  const handleBuyNow = () => {
    // In a real app, this would go to checkout
    console.log('Buy now clicked - checkout not implemented')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="space-y-4">
        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleBuyNow}
            disabled={disabled}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              disabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
            }`}
            aria-describedby="buy-now-description"
          >
            {disabled ? 'Out of Stock' : 'Buy Now'}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={disabled}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-center border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              disabled
                ? 'border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed'
                : 'border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500'
            }`}
            aria-describedby="add-to-cart-description"
          >
            {disabled ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>

        {/* Feature Badges */}
        {(product.flags?.freeShipping || product.flags?.full) && (
          <div className="flex flex-wrap gap-2">
            {product.flags.freeShipping && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Free Shipping
              </div>
            )}
            
            {product.flags.full && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                MercadoLibre Full
              </div>
            )}
          </div>
        )}

        {/* Policy Information */}
        <div className="text-xs text-gray-500 space-y-1">
          <p id="buy-now-description">
            This is a demo checkout. No actual purchase will be processed.
          </p>
          <p id="add-to-cart-description">
            Add item to cart for later purchase consideration.
          </p>
          
          {!disabled && (
            <>
              <div className="flex items-start gap-2 mt-3">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-gray-600">
                  <p className="font-medium">30-day return policy</p>
                  <p>Free returns on eligible items</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="text-xs text-gray-600">
                  <p className="font-medium">Secure transaction</p>
                  <p>Your payment information is protected</p>
                </div>
              </div>

              {product.flags?.freeShipping && (
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <div className="text-xs text-gray-600">
                    <p className="font-medium">Free shipping</p>
                    <p>Estimated delivery: 3-5 business days</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}