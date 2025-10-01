import { ProductResponse } from '@/lib/validators'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: ProductResponse
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (amount: number, currency: string) => {
    const integerPart = Math.floor(amount)
    const decimalPart = Math.round((amount - integerPart) * 100)

    return {
      integer: integerPart.toLocaleString('en-US'),
      decimal: decimalPart.toString().padStart(2, '0'),
      symbol: currency === 'MXN' ? '$' : '$',
    }
  }

  const { integer, decimal, symbol } = formatPrice(product.price.amount, product.price.currency)

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 group"
      data-testid="product-card"
    >
      <div className="p-4">
        {/* Product Image */}
        <div className="relative aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />

          {/* Stock badge */}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Title */}
          <h3
            className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors overflow-hidden"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
            data-testid="product-title"
          >
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-1" data-testid="product-price">
            <span className="text-sm text-gray-600">{symbol}</span>
            <span className="text-2xl font-bold text-gray-900">{integer}</span>
            <span className="text-sm text-gray-600">{decimal}</span>
            <span className="text-xs text-gray-500 ml-1">{product.price.currency}</span>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-1">
            {product.flags?.freeShipping && (
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                data-testid="free-shipping-chip"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-.293-.707L15 4.586A1 1 0 0014.414 4H14v3z" />
                </svg>
                Free Shipping
              </span>
            )}

            {product.flags?.full && (
              <span
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                data-testid="fast-chip"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                FAST
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2" data-testid="product-rating">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating.average)
                      ? 'text-yellow-400'
                      : i < product.rating.average
                        ? 'text-yellow-200'
                        : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating.average.toFixed(1)} ({product.rating.count.toLocaleString()})
            </span>
          </div>

          {/* Seller */}
          <div className="text-xs text-gray-500">
            by <span className="font-medium">{product.seller.name}</span>
            {product.seller.isOfficial && (
              <span className="ml-1 inline-flex items-center">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Skeleton component for loading state
function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

interface ProductGridProps {
  products: ProductResponse[]
  loading?: boolean
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Try adjusting your filters or search terms to find what you&apos;re looking for.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
