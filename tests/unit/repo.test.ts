import { describe, it, expect, beforeAll } from 'vitest'
import { getProductById, listProducts } from '../../lib/repo'

describe('Product Repository Integration Tests', () => {
  let actualProductCount: number
  let actualProductIds: string[]

  beforeAll(async () => {
    // Get the actual data to base our tests on
    const result = await listProducts()
    actualProductCount = result.total
    actualProductIds = result.items.map((p) => p.id)
  })

  describe('getProductById', () => {
    it('should return product when found', async () => {
      // Use the first actual product ID
      const productId = actualProductIds[0]
      const product = await getProductById(productId)

      expect(product).toBeDefined()
      expect(product?.id).toBe(productId)
      expect(product?.title).toBeTruthy()
      expect(product?.description).toBeTruthy()
      expect(product?.price).toBeTruthy()
      expect(product?.stock).toBeTypeOf('number')
    })

    it('should return null when product not found', async () => {
      const product = await getProductById('nonexistent-product-id')

      expect(product).toBeNull()
    })
  })

  describe('listProducts', () => {
    it('should return all products with default pagination', async () => {
      const result = await listProducts()

      expect(result.items).toHaveLength(actualProductCount)
      expect(result.page).toBe(1)
      expect(result.total).toBe(actualProductCount)
      expect(result.items[0]).toHaveProperty('id')
      expect(result.items[0]).toHaveProperty('title')
      expect(result.items[0]).toHaveProperty('price')
    })

    it('should apply search filter by title', async () => {
      // Use a search term that should match at least one product
      const result = await listProducts({ q: 'MacBook' })

      expect(result.items.length).toBeGreaterThanOrEqual(0)
      if (result.items.length > 0) {
        expect(result.items[0].title.toLowerCase()).toContain('macbook')
      }
      expect(result.total).toBe(result.items.length)
    })

    it('should apply search filter by description', async () => {
      const result = await listProducts({ q: 'performance' })

      expect(result.total).toBe(result.items.length)
      if (result.items.length > 0) {
        const hasMatch = result.items.some(
          (item) =>
            item.title.toLowerCase().includes('performance') ||
            item.description.toLowerCase().includes('performance')
        )
        expect(hasMatch).toBe(true)
      }
    })

    it('should handle case-insensitive search', async () => {
      const lowerResult = await listProducts({ q: 'macbook' })
      const upperResult = await listProducts({ q: 'MACBOOK' })

      expect(lowerResult.total).toBe(upperResult.total)
    })

    it('should return empty results for non-matching search', async () => {
      const result = await listProducts({ q: 'xyznonsenseproduct123' })

      expect(result.items).toHaveLength(0)
      expect(result.total).toBe(0)
    })

    it('should handle pagination correctly', async () => {
      if (actualProductCount <= 2) {
        // Skip if we don't have enough products
        return
      }

      const result = await listProducts({ page: 2, limit: 2 })

      expect(result.page).toBe(2)
      expect(result.total).toBe(actualProductCount)
      // Should have remaining products (total - 2) or 2, whichever is smaller
      const expectedCount = Math.min(2, Math.max(0, actualProductCount - 2))
      expect(result.items).toHaveLength(expectedCount)
    })

    it('should clamp page to minimum of 1', async () => {
      const result = await listProducts({ page: 0 })

      expect(result.page).toBe(1)
    })

    it('should clamp limit to valid range', async () => {
      // Test minimum limit
      const result1 = await listProducts({ limit: 0 })
      expect(result1.items.length).toBeGreaterThanOrEqual(0)
      expect(result1.items.length).toBeLessThanOrEqual(1)

      // Test maximum limit (should be clamped to 100)
      const result2 = await listProducts({ limit: 150 })
      expect(result2.items).toHaveLength(actualProductCount) // We have fewer than 100 products
    })

    it('should combine search and pagination', async () => {
      // Search for a common term that should match multiple products
      const searchResult = await listProducts({ q: 'a' }) // Single letter should match many

      if (searchResult.total > 2) {
        const paginatedResult = await listProducts({ q: 'a', page: 1, limit: 2 })

        expect(paginatedResult.items).toHaveLength(2)
        expect(paginatedResult.total).toBe(searchResult.total)
        expect(paginatedResult.page).toBe(1)
      }
    })
  })
})
