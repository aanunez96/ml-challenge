import Link from 'next/link'

export default function Home() {
  // Sample product IDs from our data
  const sampleProducts = [
    { id: 'premium-laptop-mx2024', title: 'MacBook Pro 16" M3 Max' },
    { id: 'gaming-chair-deluxe', title: 'Secretlab Titan Evo 2024' },
    { id: 'wireless-headphones-pro', title: 'Wireless Headphones Pro' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ML Challenge Store
          </h1>
          <p className="text-xl text-gray-600">
            Discover amazing products with our Product Detail Pages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {sampleProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/product/${product.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-blue-600 font-medium">
                  View Product →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Product Detail Page Features
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Responsive gallery with keyboard navigation</li>
              <li>✅ Comprehensive product information</li>
              <li>✅ Seller details and ratings</li>
              <li>✅ Payment methods and policies</li>
              <li>✅ Accessible design with proper ARIA labels</li>
              <li>✅ Loading states and error handling</li>
              <li>✅ Mobile-optimized layout</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
