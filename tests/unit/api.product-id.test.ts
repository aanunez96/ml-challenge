import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '../../src/app/api/products/[id]/route'
import * as repo from '../../lib/repo'

// Mock the repo module
vi.mock('../../lib/repo', () => ({
  getProductById: vi.fn()
}))

const mockRepo = vi.mocked(repo)

const mockProduct = {
  id: 'test-product-123',
  title: 'Test Product',
  description: 'A test product for API testing',
  images: ['https://example.com/image1.jpg'],
  price: { amount: 99.99, currency: 'USD' as const },
  paymentMethods: [{ label: 'Credit Card', note: 'Visa and Mastercard' }],
  seller: {
    id: 'seller-123',
    name: 'Test Seller',
    rating: 4.5,
    sales: 1000,
    isOfficial: false
  },
  stock: 50,
  rating: { average: 4.2, count: 150 },
  flags: { full: true, freeShipping: true }
}

// Helper function to create mock request and params
function createMockRequest(id: string) {
  const request = new NextRequest('http://localhost:3000/api/products/' + id)
  const params = Promise.resolve({ id })
  return { request, params }
}

describe('GET /api/products/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return product when found', async () => {
    mockRepo.getProductById.mockResolvedValue(mockProduct)
    
    const { request, params } = createMockRequest('test-product-123')
    const response = await GET(request, { params })
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data.id).toBe('test-product-123')
    expect(data.title).toBe('Test Product')
    expect(data.price.amount).toBe(99.99)
    expect(data.seller.name).toBe('Test Seller')
    
    expect(mockRepo.getProductById).toHaveBeenCalledWith('test-product-123')
    expect(mockRepo.getProductById).toHaveBeenCalledTimes(1)
  })

  it('should return 404 when product not found', async () => {
    mockRepo.getProductById.mockResolvedValue(null)
    
    const { request, params } = createMockRequest('nonexistent-product')
    const response = await GET(request, { params })
    
    expect(response.status).toBe(404)
    
    const data = await response.json()
    expect(data.error.code).toBe('NOT_FOUND')
    expect(data.error.message).toContain('nonexistent-product')
    expect(data.error.message).toContain('not found')
  })

  it('should return 500 when repository throws error', async () => {
    mockRepo.getProductById.mockRejectedValue(new Error('Database connection failed'))
    
    const { request, params } = createMockRequest('test-product-123')
    const response = await GET(request, { params })
    
    expect(response.status).toBe(500)
    
    const data = await response.json()
    expect(data.error.code).toBe('INTERNAL')
    expect(data.error.message).toBe('Failed to fetch product')
  })

  it('should return 500 when product data fails validation', async () => {
    // Return invalid product data (missing required fields)
    const invalidProduct = {
      id: 'test-product-123',
      title: 'Test Product'
      // Missing required fields like description, images, etc.
    }
    
    mockRepo.getProductById.mockResolvedValue(invalidProduct as any)
    
    const { request, params } = createMockRequest('test-product-123')
    const response = await GET(request, { params })
    
    expect(response.status).toBe(500)
    
    const data = await response.json()
    expect(data.error.code).toBe('INTERNAL')
    expect(data.error.message).toBe('Product data validation failed')
  })

  it('should handle special characters in product ID', async () => {
    const specialId = 'product-with-special-chars_123'
    mockRepo.getProductById.mockResolvedValue({ ...mockProduct, id: specialId })
    
    const { request, params } = createMockRequest(specialId)
    const response = await GET(request, { params })
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data.id).toBe(specialId)
    
    expect(mockRepo.getProductById).toHaveBeenCalledWith(specialId)
  })

  it('should validate all product fields in successful response', async () => {
    mockRepo.getProductById.mockResolvedValue(mockProduct)
    
    const { request, params } = createMockRequest('test-product-123')
    const response = await GET(request, { params })
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    
    // Verify all required fields are present and correctly typed
    expect(typeof data.id).toBe('string')
    expect(typeof data.title).toBe('string')
    expect(typeof data.description).toBe('string')
    expect(Array.isArray(data.images)).toBe(true)
    expect(typeof data.price.amount).toBe('number')
    expect(typeof data.price.currency).toBe('string')
    expect(Array.isArray(data.paymentMethods)).toBe(true)
    expect(typeof data.seller.id).toBe('string')
    expect(typeof data.seller.name).toBe('string')
    expect(typeof data.seller.rating).toBe('number')
    expect(typeof data.seller.sales).toBe('number')
    expect(typeof data.seller.isOfficial).toBe('boolean')
    expect(typeof data.stock).toBe('number')
    expect(typeof data.rating.average).toBe('number')
    expect(typeof data.rating.count).toBe('number')
    
    // Verify optional fields
    if (data.flags) {
      expect(typeof data.flags.full).toBe('boolean')
      expect(typeof data.flags.freeShipping).toBe('boolean')
    }
  })
})