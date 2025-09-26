import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET as getProductsHandler } from '@/app/api/products/route'
import { GET as getProductHandler } from '@/app/api/products/[id]/route'
import * as repo from '@/lib/repo'

// Mock the repo module
vi.mock('@/lib/repo')
const mockedRepo = vi.mocked(repo)

// Mock data for testing
const mockProduct = {
  id: 'premium-laptop-mx2024',
  title: 'MacBook Pro 16" M3 Max - Premium Edition',
  description: 'Experience ultimate performance with the latest MacBook Pro featuring M3 Max chip.',
  images: [
    'https://example.com/images/macbook-pro-16-m3-max-front.jpg'
  ],
  price: {
    amount: 89999.99,
    currency: 'MXN' as const
  },
  paymentMethods: [
    {
      label: 'Tarjeta de Crédito',
      note: '12 meses sin intereses disponibles'
    }
  ],
  seller: {
    id: 'apple-store-mx',
    name: 'Apple Store México',
    rating: 4.8,
    sales: 15420,
    isOfficial: true,
    location: 'Ciudad de México'
  },
  stock: 15,
  rating: {
    average: 4.7,
    count: 2847
  }
}

const mockProductList = {
  items: [mockProduct],
  page: 1,
  total: 1
}

describe('API Route Handlers', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('/api/products route', () => {
    it('should return products with default parameters', async () => {
      mockedRepo.listProducts.mockResolvedValue(mockProductList)

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(200)
      
      const body = await response.json()
      expect(body).toEqual({
        items: mockProductList.items,
        page: mockProductList.page,
        total: mockProductList.total
      })
      
      expect(mockedRepo.listProducts).toHaveBeenCalledWith({
        q: undefined,
        page: 1,
        limit: 12
      })
    })

    it('should handle query parameters correctly', async () => {
      mockedRepo.listProducts.mockResolvedValue(mockProductList)

      const request = new NextRequest('http://localhost:3000/api/products?q=MacBook&page=2&limit=5')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(200)
      expect(mockedRepo.listProducts).toHaveBeenCalledWith({
        q: 'MacBook',
        page: 2,
        limit: 5
      })
    })

    it('should handle invalid page parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=invalid')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(400)
      
      const body = await response.json()
      expect(body.error.code).toBe('VALIDATION_ERROR')
      expect(body.error.message).toContain('Invalid input')
    })

    it('should handle invalid limit parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=invalid')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(400)
      
      const body = await response.json()
      expect(body.error.code).toBe('VALIDATION_ERROR')
      expect(body.error.message).toContain('Invalid input')
    })

    it('should handle repository errors gracefully', async () => {
      mockedRepo.listProducts.mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(500)
      
      const body = await response.json()
      expect(body.error.code).toBe('INTERNAL')
      expect(body.error.message).toBe('Failed to fetch products')
    })

    it('should handle empty query string', async () => {
      mockedRepo.listProducts.mockResolvedValue({
        items: [],
        page: 1,
        total: 0
      })

      const request = new NextRequest('http://localhost:3000/api/products?q=')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(200)
      expect(mockedRepo.listProducts).toHaveBeenCalledWith({
        q: undefined, // Empty string becomes undefined
        page: 1,
        limit: 12
      })
    })

    it('should handle negative page numbers', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?page=-1')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(400)
      
      const body = await response.json()
      expect(body.error.code).toBe('VALIDATION_ERROR')
    })

    it('should handle page numbers that are too large', async () => {
      // This should actually succeed because the repo clamps the values
      mockedRepo.listProducts.mockResolvedValue({
        items: [],
        page: 999999,
        total: 0
      })

      const request = new NextRequest('http://localhost:3000/api/products?page=999999')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(200) // Should succeed
    })

    it('should handle limit that is too small', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=0')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(400)
      
      const body = await response.json()
      expect(body.error.code).toBe('VALIDATION_ERROR')
    })

    it('should handle limit that is too large', async () => {
      const request = new NextRequest('http://localhost:3000/api/products?limit=200')
      const response = await getProductsHandler(request)
      
      expect(response.status).toBe(400)
      
      const body = await response.json()
      expect(body.error.code).toBe('VALIDATION_ERROR')
    })
  })

  describe('/api/products/[id] route', () => {
    it('should return product when found', async () => {
      mockedRepo.getProductById.mockResolvedValue(mockProduct)

      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/premium-laptop-mx2024'),
        { params: Promise.resolve({ id: 'premium-laptop-mx2024' }) }
      )
      
      expect(response.status).toBe(200)
      
      const body = await response.json()
      expect(body).toEqual(mockProduct)
      
      expect(mockedRepo.getProductById).toHaveBeenCalledWith('premium-laptop-mx2024')
    })

    it('should return 404 when product not found', async () => {
      mockedRepo.getProductById.mockResolvedValue(null)

      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/nonexistent-id'),
        { params: Promise.resolve({ id: 'nonexistent-id' }) }
      )
      
      expect(response.status).toBe(404)
      
      const body = await response.json()
      expect(body.error.code).toBe('NOT_FOUND')
      expect(body.error.message).toContain('nonexistent-id')
      
      expect(mockedRepo.getProductById).toHaveBeenCalledWith('nonexistent-id')
    })

    it('should handle empty product ID', async () => {
      mockedRepo.getProductById.mockResolvedValue(null)

      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/'),
        { params: Promise.resolve({ id: '' }) }
      )
      
      expect(response.status).toBe(404)
      
      const body = await response.json()
      expect(body.error.code).toBe('NOT_FOUND')
    })

    it('should handle product ID with special characters', async () => {
      mockedRepo.getProductById.mockResolvedValue(null)

      const specialId = 'product-with-special-chars-@#$%'
      const response = await getProductHandler(
        new NextRequest(`http://localhost:3000/api/products/${encodeURIComponent(specialId)}`),
        { params: Promise.resolve({ id: specialId }) }
      )
      
      expect(response.status).toBe(404)
      expect(mockedRepo.getProductById).toHaveBeenCalledWith(specialId)
    })

    it('should handle repository errors gracefully', async () => {
      mockedRepo.getProductById.mockRejectedValue(new Error('File system error'))

      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/test-id'),
        { params: Promise.resolve({ id: 'test-id' }) }
      )
      
      expect(response.status).toBe(500)
      
      const body = await response.json()
      expect(body.error.code).toBe('INTERNAL')
      expect(body.error.message).toBe('Failed to fetch product')
    })

    it('should handle very long product IDs', async () => {
      const longId = 'a'.repeat(1000) // Very long ID
      mockedRepo.getProductById.mockResolvedValue(null)

      const response = await getProductHandler(
        new NextRequest(`http://localhost:3000/api/products/${longId}`),
        { params: Promise.resolve({ id: longId }) }
      )
      
      expect(response.status).toBe(404)
      expect(mockedRepo.getProductById).toHaveBeenCalledWith(longId)
    })

    it('should handle product ID with unicode characters', async () => {
      const unicodeId = 'producto-español-中文-🚀'
      mockedRepo.getProductById.mockResolvedValue(null)

      const response = await getProductHandler(
        new NextRequest(`http://localhost:3000/api/products/${encodeURIComponent(unicodeId)}`),
        { params: Promise.resolve({ id: unicodeId }) }
      )
      
      expect(response.status).toBe(404)
      expect(mockedRepo.getProductById).toHaveBeenCalledWith(unicodeId)
    })

    it('should handle missing params object', async () => {
      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/test-id'),
        {} as any // Missing params
      )
      
      expect(response.status).toBe(500)
      
      const body = await response.json()
      expect(body.error.code).toBe('INTERNAL')
    })

    it('should handle undefined product ID in params', async () => {
      mockedRepo.getProductById.mockResolvedValue(null)

      const response = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/test-id'),
        { params: Promise.resolve({ id: undefined as any }) }
      )
      
      expect(response.status).toBe(404) // getProductById handles undefined gracefully
    })
  })

  describe('Error handling consistency', () => {
    it('should return consistent error format across all endpoints', async () => {
      // Test products endpoint error
      mockedRepo.listProducts.mockRejectedValue(new Error('Test error'))
      const productsResponse = await getProductsHandler(
        new NextRequest('http://localhost:3000/api/products')
      )
      const productsBody = await productsResponse.json()

      // Test product detail endpoint error
      mockedRepo.getProductById.mockRejectedValue(new Error('Test error'))
      const productResponse = await getProductHandler(
        new NextRequest('http://localhost:3000/api/products/test-id'),
        { params: Promise.resolve({ id: 'test-id' }) }
      )
      const productBody = await productResponse.json()

      // Both should have same error structure
      expect(productsBody).toHaveProperty('error')
      expect(productsBody.error).toHaveProperty('code', 'INTERNAL')
      expect(productsBody.error).toHaveProperty('message', 'Failed to fetch products')
      expect(productBody).toHaveProperty('error')
      expect(productBody.error).toHaveProperty('code', 'INTERNAL')
      expect(productBody.error).toHaveProperty('message', 'Failed to fetch product')
    })
  })
})