import { ProductCard } from '@/components/PLP/ProductGrid'
import { listProducts } from '@/lib/repo'
import { promises as fs } from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

async function getProducts() {
  try {
    const result = await listProducts({ limit: 20 })
    return result.items
  } catch (error) {
    console.error('Failed to load products:', error)
    return []
  }
}

async function getMarkdownContent(filename: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', filename)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const processedContent = await remark().use(html).process(fileContents)
    return processedContent.toString()
  } catch (error) {
    console.error(`Failed to load ${filename}:`, error)
    return `<p>Content not available.</p>`
  }
}

export default async function Home() {
  const products = await getProducts()
  const projectRecapHtml = await getMarkdownContent('project-recap.md')
  const coverLetterHtml = await getMarkdownContent('cover-letter.md')

  return (
    <div className="bg-ml-bg-sub">
      {/* Hero Carousel */}
      <div className="bg-blue-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="relative">
            {/* Main Hero Content */}
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">LOS FAVORITOS</h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">DEL SÚPER EN LA CASA</h2>

              {/* Delivery Badge */}
              <div className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg mb-8">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z" />
                </svg>
                TU PEDIDO LLEGA MAÑANA
              </div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {[...Array(6)].map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Products Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {products.map((product, index) => {
              const sectionTitles = [
                'Lo quieres',
                'Porque te interesa',
                'Visto recientemente',
                'Tu auto te espera',
                'Menos de $500',
                'Más vendidos',
              ]

              return (
                <div key={product.id} className="space-y-2">
                  {/* Section Title */}
                  <div className="text-lg font-bold text-gray-800 px-2">{sectionTitles[index]}</div>
                  {/* Product Card */}
                  <ProductCard product={product} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Professional Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Project Recap */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Overview</h2>
              <div className="w-12 h-1 bg-ml-accent rounded-full"></div>
            </div>
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-ml-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: projectRecapHtml }}
            />
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">About the Developer</h2>
              <div className="w-12 h-1 bg-ml-accent rounded-full"></div>
            </div>
            <div
              className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-ml-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-600 prose-li:text-gray-600"
              dangerouslySetInnerHTML={{ __html: coverLetterHtml }}
            />
          </div>
        </div>

        {/* Second Product Row - More Recommendations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recomendaciones para ti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: 'ML Challenge Store - Discover Amazing Products',
    description:
      'Discover amazing products in our marketplace. Browse electronics, computers, gaming gear, smartphones and more with fast shipping and great prices.',
    keywords: 'marketplace, products, electronics, computers, gaming, smartphones, online shopping',
  }
}
