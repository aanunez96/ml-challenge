import BuyBox from '@/components/Product/BuyBox'
import Gallery from '@/components/Product/Gallery'
import PaymentMethods from '@/components/Product/PaymentMethods'
import Price from '@/components/Product/Price'
import ProductDescription from '@/components/Product/ProductDescription'
import ReviewsSummary from '@/components/Product/ReviewsSummary'
import { ProductResponse } from '@/lib/validators'
import { notFound } from 'next/navigation'

async function getProduct(id: string): Promise<ProductResponse | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`,
      {
        cache: 'force-cache',
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    )

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
    <div className="max-w-[1200px] mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 text-ml-muted">
        <span>Electrónicos, Audio y Video</span>
        <span className="mx-1">{'>'}</span>
        <span>Audio</span>
        <span className="mx-1">{'>'}</span>
        <span>Auriculares</span>
      </nav>

      <div className="grid grid-cols-12 gap-6 bg-ml-bg p-6 rounded-lg shadow-ml-card">
        {/* Main Content Area - Gallery and Details */}
        <div className="col-span-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Gallery Section */}
            <div className="xl:col-span-7 col-span-12">
              <Gallery images={product.images} productTitle={product.title} />
            </div>

            {/* Product Details Section */}
            <div className="xl:col-span-5 col-span-12 space-y-4">
              {/* Product Title */}
              <div>
                <h1
                  className="text-xl font-normal leading-tight mb-2 text-ml-text"
                  data-testid="title"
                >
                  {product.title}
                </h1>

                {/* Rating and Stock */}
                <div className="flex items-center gap-4 mb-2">
                  <ReviewsSummary rating={product.rating} />
                  <span className="text-xs text-ml-muted">| {product.stock} disponibles</span>
                </div>
              </div>

              {/* Price Section */}
              <div>
                <Price price={product.price} />
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="xl:col-span-12 mt-8 col-span-12">
            <ProductDescription description={product.description} />
          </div>
        </div>

        {/* Sidebar - Buy Box and Payment Methods */}
        <div className="xl:col-span-4 col-span-12">
          <div className="sticky top-4 space-y-4">
            <BuyBox product={product} disabled={product.stock === 0} />
            <PaymentMethods methods={product.paymentMethods} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  return {
    title: `${product.title} | ML Challenge`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.images.slice(0, 1),
    },
  }
}
