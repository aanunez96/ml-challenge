export default function ProductLoading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--marketplace-bg-sub)' }}>
      {/* Header Band Skeleton */}
      <header className="h-12 sm:h-14" style={{ backgroundColor: 'var(--marketplace-primary)' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="flex-1 max-w-md">
            <div
              className="h-8 rounded animate-pulse"
              style={{ backgroundColor: 'var(--marketplace-bg)' }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Gallery Skeleton - 7 columns */}
          <div className="lg:col-span-7">
            {/* Main image skeleton with 4:3 aspect */}
            <div
              className="aspect-[4/3] rounded-lg mb-4"
              style={{
                backgroundColor: 'var(--marketplace-border)',
                borderRadius: 'var(--radius-12)',
              }}
            />
            {/* Thumbnails skeleton */}
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg"
                  style={{ backgroundColor: 'var(--marketplace-border)' }}
                />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton - 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title Skeleton */}
            <div className="space-y-3">
              <div
                className="h-7 rounded w-3/4"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
              <div
                className="h-7 rounded w-1/2"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
            </div>

            {/* Price Skeleton */}
            <div className="flex items-baseline gap-2">
              <div
                className="h-12 rounded w-8"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
              <div
                className="h-12 rounded w-32"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
              <div
                className="h-6 rounded w-12"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
            </div>

            {/* Stock Badge Skeleton */}
            <div
              className="h-6 rounded-full w-24"
              style={{ backgroundColor: 'var(--marketplace-border)' }}
            />

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: 'var(--marketplace-border)' }}
                  />
                ))}
              </div>
              <div
                className="h-4 rounded w-16"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
            </div>

            {/* Payment Methods Skeleton */}
            <div className="space-y-3">
              <div
                className="h-5 rounded w-32"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded border"
                    style={{
                      backgroundColor: 'var(--marketplace-bg)',
                      borderColor: 'var(--marketplace-border)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Seller Card Skeleton */}
            <div
              className="p-4 rounded border"
              style={{
                backgroundColor: 'var(--marketplace-bg)',
                borderColor: 'var(--marketplace-border)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{ backgroundColor: 'var(--marketplace-border)' }}
                />
                <div className="space-y-2 flex-1">
                  <div
                    className="h-4 rounded w-32"
                    style={{ backgroundColor: 'var(--marketplace-border)' }}
                  />
                  <div
                    className="h-3 rounded w-24"
                    style={{ backgroundColor: 'var(--marketplace-border)' }}
                  />
                </div>
              </div>
            </div>

            {/* Buy Box Skeleton */}
            <div
              className="p-6 rounded space-y-4"
              style={{
                backgroundColor: 'var(--marketplace-bg)',
                borderRadius: 'var(--radius-12)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Button skeletons */}
              <div
                className="h-12 rounded"
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
              <div
                className="h-11 rounded border"
                style={{ borderColor: 'var(--marketplace-border)' }}
              />
              {/* Features skeleton */}
              <div className="flex gap-2">
                <div
                  className="h-6 rounded-full w-24"
                  style={{ backgroundColor: 'var(--marketplace-border)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Skeleton */}
        <div className="mt-12 max-w-4xl">
          <div
            className="h-6 rounded w-48 mb-4"
            style={{ backgroundColor: 'var(--marketplace-border)' }}
          />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`h-4 rounded ${i === 5 ? 'w-3/4' : 'w-full'}`}
                style={{ backgroundColor: 'var(--marketplace-border)' }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
