import { ProductCard } from '@/components/PLP/ProductGrid'
import { listProducts } from '@/lib/repo'
import { promises as fs } from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import Image from 'next/image'

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
      <div className="relative overflow-hidden">
        <div className="w-full">
          <div className="relative">
            {/* Main Hero Content */}
            <div className="relative aspect-[16/6] sm:aspect-[16/5] lg:aspect-[16/4]">
              <Image
                src="https://http2.mlstatic.com/D_NQ_667221-MLA91540124681_092025-OO.jpg"
                alt="Mercado Libre Hero Banner"
                fill
                className="object-cover w-full h-full"
                priority
                sizes="100vw"
              />
              
              {/* Desktop Gradient Overlay - Bottom transition */}
              <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-50 bg-gradient-to-b from-transparent via-ml-primary/20 to-ml-bg-sub pointer-events-none"></div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex justify-center space-x-2">
                {[...Array(6)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      i === 0 ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Products Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <div key={`product-${product.id}-${index}`} className="space-y-2">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
