import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiClient } from '@/lib/api-client'

// Mock fetch globally
global.fetch = vi.fn()
const mockFetch = vi.mocked(fetch)

const mockProduct = {
  id: 'test-product-1',
  title: 'Test Product',
  description: 'A test product description',
  images: ['https://example.com/image1.jpg'],
  price: { amount: 100.00, currency: 'USD' as const },
  paymentMethods: [{ label: 'Credit Card' }],
  seller: {
    id: 'seller-1',
    name: 'Test Seller',
    rating: 4.5,
    sales: 100,
    isOfficial: true,
  },
  stock: 10,
  rating: { average: 4.5, count: 10 },
}

const mockCreateProduct = {
  title: 'New Product',
  description: 'A new product description',
  images: ['https://example.com/new-image.jpg'],
  price: { amount: 200.00, currency: 'USD' as const },
  paymentMethods: [{ label: 'Credit Card' }],
  seller: {
    id: 'seller-1',
    name: 'Test Seller',
    rating: 4.5,
    sales: 100,
    isOfficial: true,
  },
  stock: 20,
  rating: { average: 0, count: 0 },
}

const mockUpdateProduct = {
  title: 'Updated Product',
  price: { amount: 300.00, currency: 'USD' as const },
}

describe('ApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = [mockProduct]
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)

      const result = await apiClient.getProducts()
      expect(result).toEqual(mockProducts)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response)

      await expect(apiClient.getProducts()).rejects.toThrow('API Error: 500 Internal Server Error')
    })
  })

  describe('getProduct', () => {
    it('should fetch a single product successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      } as Response)

      const result = await apiClient.getProduct('test-product-1')
      expect(result).toEqual(mockProduct)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products/test-product-1',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should throw error when product not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      await expect(apiClient.getProduct('nonexistent')).rejects.toThrow('API Error: 404 Not Found')
    })
  })

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const createdProduct = { id: 'new-product-2', ...mockCreateProduct }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(createdProduct),
      } as Response)

      const result = await apiClient.createProduct(mockCreateProduct)
      expect(result).toEqual(createdProduct)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(mockCreateProduct),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should throw error when creation fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      } as Response)

      await expect(apiClient.createProduct(mockCreateProduct))
        .rejects.toThrow('API Error: 400 Bad Request')
    })
  })

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const updatedProduct = { ...mockProduct, ...mockUpdateProduct }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(updatedProduct),
      } as Response)

      const result = await apiClient.updateProduct('test-product-1', mockUpdateProduct)
      expect(result).toEqual(updatedProduct)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products/test-product-1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(mockUpdateProduct),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should throw error when update fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      await expect(apiClient.updateProduct('nonexistent', mockUpdateProduct))
        .rejects.toThrow('API Error: 404 Not Found')
    })
  })

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      await expect(apiClient.deleteProduct('test-product-1')).resolves.toBeUndefined()
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products/test-product-1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should throw error when deletion fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)

      await expect(apiClient.deleteProduct('nonexistent'))
        .rejects.toThrow('API Error: 404 Not Found')
    })
  })
})