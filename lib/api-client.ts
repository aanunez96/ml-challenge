import { Product, CreateProduct, UpdateProduct } from './validators'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/api/products')
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`)
  }

  async createProduct(product: CreateProduct): Promise<Product> {
    return this.request<Product>('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    })
  }

  async updateProduct(id: string, product: UpdateProduct): Promise<Product> {
    return this.request<Product>(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    })
  }

  async deleteProduct(id: string): Promise<void> {
    await this.request(`/api/products/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()
