import { promises as fs } from 'fs'
import path from 'path'
import { ProductResponse } from './validators'

interface CacheEntry {
  products: ProductResponse[]
  mtime: number
}

let cache: CacheEntry | null = null

const DATA_PATH = path.join(process.cwd(), 'data', 'products.json')

async function loadProducts(): Promise<ProductResponse[]> {
  try {
    const stats = await fs.stat(DATA_PATH)
    const currentMtime = stats.mtime.getTime()

    // Check if cache is valid
    if (cache && cache.mtime >= currentMtime) {
      return cache.products
    }

    // Load fresh data
    const fileContent = await fs.readFile(DATA_PATH, 'utf-8')
    const products = JSON.parse(fileContent) as ProductResponse[]

    // Update cache
    cache = {
      products,
      mtime: currentMtime,
    }

    return products
  } catch (error) {
    console.error('Failed to load products:', error)
    throw new Error('Failed to load product data')
  }
}

export class ProductRepository {
  async findAll(): Promise<ProductResponse[]> {
    return loadProducts()
  }

  async findById(id: string): Promise<ProductResponse | null> {
    const products = await loadProducts()
    return products.find((p) => p.id === id) || null
  }

  async create(data: any): Promise<ProductResponse> {
    throw new Error('Create operation not supported in read-only mode')
  }

  async update(id: string, data: any): Promise<ProductResponse | null> {
    throw new Error('Update operation not supported in read-only mode')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Delete operation not supported in read-only mode')
  }
}

// Main repository functions
export async function getProductById(id: string): Promise<ProductResponse | null> {
  const products = await loadProducts()
  return products.find((p) => p.id === id) || null
}

export interface ListProductsOptions {
  q?: string
  page?: number
  limit?: number
}

export interface ListProductsResult {
  items: ProductResponse[]
  page: number
  total: number
}

export async function listProducts(opts: ListProductsOptions = {}): Promise<ListProductsResult> {
  const { q, page = 1, limit = 12 } = opts

  // Validate and clamp parameters
  const validPage = Math.max(1, page)
  const validLimit = Math.max(1, Math.min(100, limit))

  let products = await loadProducts()

  // Apply search filter if provided
  if (q && q.trim()) {
    const searchTerm = q.toLowerCase().trim()
    products = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    )
  }

  const total = products.length
  const startIndex = (validPage - 1) * validLimit
  const items = products.slice(startIndex, startIndex + validLimit)

  return {
    items,
    page: validPage,
    total,
  }
}

// Legacy repository instance for backward compatibility
export const productRepo = new ProductRepository()
