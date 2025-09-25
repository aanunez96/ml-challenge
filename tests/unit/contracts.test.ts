import { describe, it, expect } from 'vitest'
import { ProductResponseSchema } from '../../lib/validators'
import productsData from '../../data/products.json'

describe('Product Data Contracts', () => {
  describe('Schema Validation - Positive Cases', () => {
    it('should validate all sample products successfully', () => {
      productsData.forEach((product: any, index: number) => {
        const result = ProductResponseSchema.safeParse(product)
        
        if (!result.success) {
          console.error(`Product ${index} validation failed:`, result.error.issues)
        }
        
        expect(result.success).toBe(true)
        expect(result.data).toBeDefined()
      })
    })

    it('should accept valid product with minimal flags', () => {
      const validProduct = {
        id: 'test-product-123',
        title: 'Test Product',
        description: 'A valid test product description',
        images: ['https://example.com/image1.jpg'],
        price: {
          amount: 99.99,
          currency: 'USD' as const
        },
        paymentMethods: [
          {
            label: 'Credit Card',
            note: 'Visa and Mastercard accepted'
          }
        ],
        seller: {
          id: 'test-seller-456',
          name: 'Test Seller',
          rating: 4.5,
          sales: 1000,
          isOfficial: false
        },
        stock: 50,
        rating: {
          average: 4.2,
          count: 150
        }
      }

      const result = ProductResponseSchema.safeParse(validProduct)
      expect(result.success).toBe(true)
    })

    it('should accept product with all optional fields', () => {
      const fullProduct = {
        id: 'full-product-test',
        title: 'Complete Test Product',
        description: 'Product with all possible fields populated',
        images: [
          'https://example.com/img1.jpg',
          'https://example.com/img2.jpg',
          'https://example.com/img3.jpg'
        ],
        price: {
          amount: 1299.50,
          currency: 'MXN' as const
        },
        paymentMethods: [
          {
            label: 'Credit Card',
            note: 'All major cards accepted'
          },
          {
            label: 'PayPal'
          }
        ],
        seller: {
          id: 'premium-seller-789',
          name: 'Premium Seller Co.',
          rating: 4.9,
          sales: 25000,
          isOfficial: true,
          location: 'Mexico City, CDMX'
        },
        stock: 25,
        rating: {
          average: 4.7,
          count: 892
        },
        flags: {
          full: true,
          freeShipping: true
        }
      }

      const result = ProductResponseSchema.safeParse(fullProduct)
      expect(result.success).toBe(true)
      expect(result.data?.flags?.full).toBe(true)
      expect(result.data?.flags?.freeShipping).toBe(true)
    })
  })

  describe('Schema Validation - Negative Cases', () => {
    it('should reject product with invalid ID format', () => {
      const invalidProduct = {
        id: 'INVALID_ID_WITH_CAPS', // Should be lowercase only
        title: 'Test Product',
        description: 'Test description',
        images: ['https://example.com/image.jpg'],
        price: { amount: 99.99, currency: 'USD' as const },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: { average: 4.0, count: 50 }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('lowercase letters, numbers, underscores, and hyphens')
      }
    })

    it('should reject product with invalid price precision', () => {
      const invalidProduct = {
        id: 'test-product-456',
        title: 'Test Product',
        description: 'Test description',
        images: ['https://example.com/image.jpg'],
        price: {
          amount: 99.999, // Too many decimal places
          currency: 'USD' as const
        },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: { average: 4.0, count: 50 }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('2 decimal places')
      }
    })

    it('should reject product with invalid rating range', () => {
      const invalidProduct = {
        id: 'test-product-789',
        title: 'Test Product',
        description: 'Test description',
        images: ['https://example.com/image.jpg'],
        price: { amount: 99.99, currency: 'USD' as const },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: {
          average: 6.5, // Exceeds maximum of 5.0
          count: 50
        }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('must not exceed 5')
      }
    })

    it('should reject product with non-HTTPS image URL', () => {
      const invalidProduct = {
        id: 'test-product-012',
        title: 'Test Product',
        description: 'Test description',
        images: ['http://example.com/image.jpg'], // HTTP instead of HTTPS
        price: { amount: 99.99, currency: 'USD' as const },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: { average: 4.0, count: 50 }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('HTTPS')
      }
    })

    it('should reject product with invalid currency', () => {
      const invalidProduct = {
        id: 'test-product-345',
        title: 'Test Product',
        description: 'Test description',
        images: ['https://example.com/image.jpg'],
        price: {
          amount: 99.99,
          currency: 'EUR' as any // Not in allowed enum
        },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: { average: 4.0, count: 50 }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
    })

    it('should reject product with empty payment methods array', () => {
      const invalidProduct = {
        id: 'test-product-678',
        title: 'Test Product',
        description: 'Test description',
        images: ['https://example.com/image.jpg'],
        price: { amount: 99.99, currency: 'USD' as const },
        paymentMethods: [], // Empty array not allowed
        seller: {
          id: 'seller-123',
          name: 'Test Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false
        },
        stock: 10,
        rating: { average: 4.0, count: 50 }
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('At least one payment method')
      }
    })
  })

  describe('Edge Cases Coverage', () => {
    it('should validate out-of-stock product (stock = 0)', () => {
      const outOfStockProduct = productsData.find((p: any) => p.stock === 0)
      expect(outOfStockProduct).toBeDefined()
      
      const result = ProductResponseSchema.safeParse(outOfStockProduct)
      expect(result.success).toBe(true)
      expect(result.data?.stock).toBe(0)
    })

    it('should validate low-rated product', () => {
      const lowRatedProduct = productsData.find((p: any) => p.rating.average < 3.0)
      expect(lowRatedProduct).toBeDefined()
      
      const result = ProductResponseSchema.safeParse(lowRatedProduct)
      expect(result.success).toBe(true)
      expect(result.data?.rating.average).toBeLessThan(3.0)
    })

    it('should validate products with different currency types', () => {
      const mxnProduct = productsData.find((p: any) => p.price.currency === 'MXN')
      const usdProduct = productsData.find((p: any) => p.price.currency === 'USD')
      
      expect(mxnProduct).toBeDefined()
      expect(usdProduct).toBeDefined()
      
      const mxnResult = ProductResponseSchema.safeParse(mxnProduct)
      const usdResult = ProductResponseSchema.safeParse(usdProduct)
      
      expect(mxnResult.success).toBe(true)
      expect(usdResult.success).toBe(true)
    })

    it('should validate products with different flag combinations', () => {
      const fullWithShipping = productsData.find((p: any) => p.flags?.full && p.flags?.freeShipping)
      const fullWithoutShipping = productsData.find((p: any) => p.flags?.full && !p.flags?.freeShipping)
      
      expect(fullWithShipping).toBeDefined()
      expect(fullWithoutShipping).toBeDefined()
      
      const result1 = ProductResponseSchema.safeParse(fullWithShipping)
      const result2 = ProductResponseSchema.safeParse(fullWithoutShipping)
      
      expect(result1.success).toBe(true)
      expect(result2.success).toBe(true)
    })
  })
})