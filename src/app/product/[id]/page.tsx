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
    <div className="min-h-screen bg-ml-bg-sub">
      {/* Header Band - Yellow ML Style */}
      <header className="h-14 bg-ml-primary">
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center">
          <div className="flex items-center gap-4 flex-1">
            <div className="text-2xl font-bold text-ml-header">ML</div>
            <div className="flex-1 max-w-lg">
              <div className="h-9 rounded-sm border border-ml-border px-3 flex items-center text-sm bg-ml-bg">
                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar productos, marcas y más...
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-4 py-4">
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
                <Gallery
                  images={product.images}
                  productTitle={product.title}
                />
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
                    <span className="text-xs text-ml-muted">
                      | {product.stock} disponibles
                    </span>
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
              <BuyBox
                product={product}
                disabled={product.stock === 0}
              />
              <PaymentMethods methods={product.paymentMethods} />
            </div>
          </div>
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
