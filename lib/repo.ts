import { Product, CreateProduct, UpdateProduct } from './validators'

// Mock database - replace with real database connection
let products: Product[] = []

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return products
  }

  async findById(id: string): Promise<Product | null> {
    return products.find(p => p.id === id) || null
  }

  async create(data: CreateProduct): Promise<Product> {
    const product: Product = {
      ...data,
      id: Math.random().toString(36).substring(7),
    }
    products.push(product)
    return product
  }

  async update(id: string, data: UpdateProduct): Promise<Product | null> {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return null
    
    products[index] = { ...products[index], ...data }
    return products[index]
  }

  async delete(id: string): Promise<boolean> {
    const index = products.findIndex(p => p.id === id)
    if (index === -1) return false
    
    products.splice(index, 1)
    return true
  }
}

export const productRepo = new ProductRepository()