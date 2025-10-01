import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '../../src/app/api/products/route'
import * as repo from '../../lib/repo'

// Mock the repo module
vi.mock('../../lib/repo', () => ({
  listProducts: vi.fn(),
}))

const mockRepo = vi.mocked(repo)

const mockProducts = [
  {
    id: 'product-1',
    title: 'First Product',
    description: 'First test product',
    images: ['https://example.com/image1.jpg'],
    price: { amount: 99.99, currency: 'USD' as const },
    paymentMethods: [{ label: 'Credit Card' }],
    seller: {
      id: 'seller-1',
      name: 'Seller One',
      rating: 4.5,
      sales: 100,
      isOfficial: false,
    },
    stock: 50,
    rating: { average: 4.2, count: 25 },
    flags: { full: true, freeShipping: true },
  },
  {
    id: 'product-2',
    title: 'Second Product',
    description: 'Second test product',
    images: ['https://example.com/image2.jpg'],
    price: { amount: 149.5, currency: 'USD' as const },
    paymentMethods: [{ label: 'PayPal' }],
    seller: {
      id: 'seller-2',
      name: 'Seller Two',
      rating: 4.0,
      sales: 200,
      isOfficial: true,
    },
    stock: 25,
    rating: { average: 3.8, count: 42 },
  },
]

// Helper function to create mock request
function createMockRequest(searchParams: Record<string, string> = {}) {
  const url = new URL('http://localhost:3000/api/products')
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })
  return new NextRequest(url.toString())
}

describe('GET /api/products', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return products with default pagination', async () => {
    const mockResult = {
      items: mockProducts,
      page: 1,
      total: 2,
    }
    mockRepo.listProducts.mockResolvedValue(mockResult)

    const request = createMockRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.items).toHaveLength(2)
    expect(data.page).toBe(1)
    expect(data.total).toBe(2)

    expect(mockRepo.listProducts).toHaveBeenCalledWith({ q: undefined, page: 1, limit: 12 })
  })

  it('should handle search query parameter', async () => {
    const filteredResult = {
      items: [mockProducts[0]],
      page: 1,
      total: 1,
    }
    mockRepo.listProducts.mockResolvedValue(filteredResult)

    const request = createMockRequest({ q: 'first' })
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.items).toHaveLength(1)
    expect(data.items[0].title).toBe('First Product')

    expect(mockRepo.listProducts).toHaveBeenCalledWith({ q: 'first', page: 1, limit: 12 })
  })

  it('should handle page parameter', async () => {
    const mockResult = {
      items: [],
      page: 2,
      total: 2,
    }
    mockRepo.listProducts.mockResolvedValue(mockResult)

    const request = createMockRequest({ page: '2' })
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.page).toBe(2)

    expect(mockRepo.listProducts).toHaveBeenCalledWith({ q: undefined, page: 2, limit: 12 })
  })

  it('should handle limit parameter', async () => {
    const mockResult = {
      items: [mockProducts[0]],
      page: 1,
      total: 2,
    }
    mockRepo.listProducts.mockResolvedValue(mockResult)

    const request = createMockRequest({ limit: '1' })
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.items).toHaveLength(1)

    expect(mockRepo.listProducts).toHaveBeenCalledWith({ q: undefined, page: 1, limit: 1 })
  })

  it('should handle multiple query parameters', async () => {
    const mockResult = {
      items: [mockProducts[0]],
      page: 2,
      total: 5,
    }
    mockRepo.listProducts.mockResolvedValue(mockResult)

    const request = createMockRequest({ q: 'test', page: '2', limit: '5' })
    const response = await GET(request)

    expect(response.status).toBe(200)

    expect(mockRepo.listProducts).toHaveBeenCalledWith({ q: 'test', page: 2, limit: 5 })
  })

  it('should return 400 for invalid page parameter', async () => {
    const request = createMockRequest({ page: '0' })
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.error.code).toBe('VALIDATION_ERROR')
    expect(data.error.message).toContain('Invalid query parameter')
  })

  it('should return 400 for invalid limit parameter', async () => {
    const request = createMockRequest({ limit: '0' })
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.error.code).toBe('VALIDATION_ERROR')
    expect(data.error.message).toContain('Invalid query parameter')
  })

  it('should return 400 for limit exceeding maximum', async () => {
    const request = createMockRequest({ limit: '150' })
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.error.code).toBe('VALIDATION_ERROR')
    expect(data.error.message).toContain('Invalid query parameter')
  })

  it('should return 400 for non-numeric page parameter', async () => {
    const request = createMockRequest({ page: 'abc' })
    const response = await GET(request)

    expect(response.status).toBe(400)

    const data = await response.json()
    expect(data.error.code).toBe('VALIDATION_ERROR')
    expect(data.error.message).toContain('Invalid query parameter')
  })

  it('should return 500 when repository throws error', async () => {
    mockRepo.listProducts.mockRejectedValue(new Error('Database connection failed'))

    const request = createMockRequest()
    const response = await GET(request)

    expect(response.status).toBe(500)

    const data = await response.json()
    expect(data.error.code).toBe('INTERNAL')
    expect(data.error.message).toBe('Failed to fetch products')
  })

  it('should return 500 when product data fails validation', async () => {
    const invalidResult = {
      items: [
        {
          id: 'invalid-product',
          title: 'Invalid Product',
          // Missing required fields
        },
      ],
      page: 1,
      total: 1,
    }
    mockRepo.listProducts.mockResolvedValue(invalidResult as any)

    const request = createMockRequest()
    const response = await GET(request)

    expect(response.status).toBe(500)

    const data = await response.json()
    expect(data.error.code).toBe('INTERNAL')
    expect(data.error.message).toBe('Failed to fetch products')
  })

  it('should handle empty search results', async () => {
    const emptyResult = {
      items: [],
      page: 1,
      total: 0,
    }
    mockRepo.listProducts.mockResolvedValue(emptyResult)

    const request = createMockRequest({ q: 'nonexistent' })
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    expect(data.items).toHaveLength(0)
    expect(data.total).toBe(0)
  })

  it('should validate all product fields in successful response', async () => {
    const mockResult = {
      items: [mockProducts[0]],
      page: 1,
      total: 1,
    }
    mockRepo.listProducts.mockResolvedValue(mockResult)

    const request = createMockRequest()
    const response = await GET(request)

    expect(response.status).toBe(200)

    const data = await response.json()
    const product = data.items[0]

    // Verify all required fields are present and correctly typed
    expect(typeof product.id).toBe('string')
    expect(typeof product.title).toBe('string')
    expect(typeof product.description).toBe('string')
    expect(Array.isArray(product.images)).toBe(true)
    expect(typeof product.price.amount).toBe('number')
    expect(typeof product.price.currency).toBe('string')
    expect(Array.isArray(product.paymentMethods)).toBe(true)
    expect(typeof product.seller.id).toBe('string')
    expect(typeof product.seller.name).toBe('string')
    expect(typeof product.seller.rating).toBe('number')
    expect(typeof product.seller.sales).toBe('number')
    expect(typeof product.seller.isOfficial).toBe('boolean')
    expect(typeof product.stock).toBe('number')
    expect(typeof product.rating.average).toBe('number')
    expect(typeof product.rating.count).toBe('number')
  })
})
