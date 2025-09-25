export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Skeleton */}
          <div className="w-full">
            <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-300 rounded-md"></div>
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="w-full space-y-6">
            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>

            {/* Price Skeleton */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-baseline gap-2">
                <div className="h-12 bg-gray-300 rounded w-32"></div>
                <div className="h-6 bg-gray-300 rounded w-16"></div>
              </div>
            </div>

            {/* Stock and Rating Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="h-6 bg-gray-300 rounded w-24"></div>
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-300 rounded w-20"></div>
                <div className="h-5 bg-gray-300 rounded w-16"></div>
              </div>
            </div>

            {/* Payment Methods Skeleton */}
            <div className="border-b border-gray-200 pb-6">
              <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>

            {/* Seller Skeleton */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-gray-300 rounded w-32"></div>
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
            </div>

            {/* Buy Box Skeleton */}
            <div className="space-y-4">
              <div className="h-12 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-48"></div>
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-12 max-w-4xl">
          <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        </div>
      </main>
    </div>
  )
}