import { notFound } from 'next/navigation'
import { ProductResponse } from '@/lib/validators'
import Gallery from '@/components/Product/Gallery'
import Price from '@/components/Product/Price'
import PaymentMethods from '@/components/Product/PaymentMethods'
import SellerCard from '@/components/Product/SellerCard'
import StockBadge from '@/components/Product/StockBadge'
import ReviewsSummary from '@/components/Product/ReviewsSummary'
import BuyBox from '@/components/Product/BuyBox'
import ProductDescription from '@/components/Product/ProductDescription'

async function getProduct(id: string): Promise<ProductResponse | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'force-cache',
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery Section */}
          <div className="w-full">
            <Gallery 
              images={product.images} 
              productTitle={product.title}
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price Section */}
            <div className="border-b border-gray-200 pb-6">
              <Price price={product.price} />
            </div>

            {/* Stock and Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <StockBadge stock={product.stock} />
              <ReviewsSummary rating={product.rating} />
            </div>

            {/* Payment Methods */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Payment Methods
              </h3>
              <PaymentMethods methods={product.paymentMethods} />
            </div>

            {/* Seller Information */}
            <div className="border-b border-gray-200 pb-6">
              <SellerCard seller={product.seller} />
            </div>

            {/* Buy Box */}
            <div className="sticky top-4">
              <BuyBox 
                product={product}
                disabled={product.stock === 0}
              />
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 max-w-4xl">
          <ProductDescription description={product.description} />
        </div>
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.title} | ML Challenge`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.images.slice(0, 1),
    }
  }
}