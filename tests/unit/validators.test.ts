import { describe, it, expect } from 'vitest'
import {
  ProductResponseSchema,
  ProductListQuerySchema,
  ProductListResponseSchema,
} from '@/lib/validators'

describe('ProductResponseSchema', () => {
  describe('valid products', () => {
    it('should validate a complete valid product', () => {
      const validProduct = {
        id: 'premium-laptop-mx2024',
        title: 'MacBook Pro 16" M3 Max - Premium Edition',
        description:
          'Experience ultimate performance with the latest MacBook Pro featuring M3 Max chip.',
        images: [
          'https://example.com/images/macbook-pro-16-m3-max-front.jpg',
          'https://example.com/images/macbook-pro-16-m3-max-side.jpg',
        ],
        price: {
          amount: 89999.99,
          currency: 'MXN',
        },
        paymentMethods: [
          {
            label: 'Tarjeta de Crédito',
            note: '12 meses sin intereses disponibles',
          },
        ],
        seller: {
          id: 'apple-store-mx',
          name: 'Apple Store México',
          rating: 4.8,
          sales: 15420,
          isOfficial: true,
          location: 'Ciudad de México',
        },
        stock: 15,
        rating: {
          average: 4.7,
          count: 2847,
        },
      }

      const result = ProductResponseSchema.safeParse(validProduct)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('premium-laptop-mx2024')
        expect(result.data.price.amount).toBe(89999.99)
        expect(result.data.seller.isOfficial).toBe(true)
      }
    })

    it('should validate a minimal valid product', () => {
      const minimalProduct = {
        id: 'minimal-product',
        title: 'Basic Product',
        description: 'A basic product description.',
        images: ['https://example.com/image.jpg'],
        price: {
          amount: 100,
          currency: 'USD',
        },
        paymentMethods: [
          {
            label: 'Credit Card',
          },
        ],
        seller: {
          id: 'seller-1',
          name: 'Basic Seller',
          rating: 4.0,
          sales: 100,
          isOfficial: false,
        },
        stock: 5,
        rating: {
          average: 3.5,
          count: 10,
        },
      }

      const result = ProductResponseSchema.safeParse(minimalProduct)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid products', () => {
    it('should reject product with invalid id (too short)', () => {
      const invalidProduct = {
        id: 'short',
        title: 'Valid Title',
        description: 'Valid description',
        images: ['https://example.com/image.jpg'],
        price: { amount: 100, currency: 'USD' },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-1',
          name: 'Seller Name',
          rating: 4.0,
          sales: 100,
          isOfficial: false,
        },
        stock: 5,
        rating: { average: 3.5, count: 10 },
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['id'],
              message: expect.stringContaining('at least 6 characters'),
            }),
          ])
        )
      }
    })

    it('should reject product with invalid price (negative amount)', () => {
      const invalidProduct = {
        id: 'valid-id',
        title: 'Valid Title',
        description: 'Valid description',
        images: ['https://example.com/image.jpg'],
        price: { amount: -100, currency: 'USD' },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-1',
          name: 'Seller Name',
          rating: 4.0,
          sales: 100,
          isOfficial: false,
        },
        stock: 5,
        rating: { average: 3.5, count: 10 },
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['price', 'amount'],
              message: expect.stringContaining('positive'),
            }),
          ])
        )
      }
    })

    it('should reject product with invalid rating (out of range)', () => {
      const invalidProduct = {
        id: 'valid-id',
        title: 'Valid Title',
        description: 'Valid description',
        images: ['https://example.com/image.jpg'],
        price: { amount: 100, currency: 'USD' },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-1',
          name: 'Seller Name',
          rating: 4.0,
          sales: 100,
          isOfficial: false,
        },
        stock: 5,
        rating: { average: 6.0, count: 10 }, // Invalid: rating > 5
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['rating', 'average'],
              message: expect.stringContaining('not exceed 5'),
            }),
          ])
        )
      }
    })

    it('should reject product with too many images (>10)', () => {
      const invalidProduct = {
        id: 'valid-id',
        title: 'Valid Title',
        description: 'Valid description',
        images: Array(11).fill('https://example.com/image.jpg'), // 11 images > 10 limit
        price: { amount: 100, currency: 'USD' },
        paymentMethods: [{ label: 'Credit Card' }],
        seller: {
          id: 'seller-1',
          name: 'Seller Name',
          rating: 4.0,
          sales: 100,
          isOfficial: false,
        },
        stock: 5,
        rating: { average: 4.0, count: 10 },
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              path: ['images'],
              message: 'Maximum 10 images allowed',
            }),
          ])
        )
      }
    })

    it('should reject product with missing required fields', () => {
      const invalidProduct = {
        id: 'valid-id',
        // Missing all other required fields
      }

      const result = ProductResponseSchema.safeParse(invalidProduct)
      expect(result.success).toBe(false)
      if (!result.success) {
        const paths = result.error.issues.map((issue) => issue.path.join('.'))
        expect(paths).toEqual(
          expect.arrayContaining([
            'title',
            'description',
            'images',
            'price',
            'paymentMethods',
            'seller',
            'stock',
            'rating',
          ])
        )
      }
    })
  })
})

describe('ProductListQuerySchema', () => {
  it('should validate valid query parameters', () => {
    const validQuery = {
      q: 'laptop',
      page: 2,
      limit: 20,
    }

    const result = ProductListQuerySchema.safeParse(validQuery)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.q).toBe('laptop')
      expect(result.data.page).toBe(2)
      expect(result.data.limit).toBe(20)
    }
  })

  it('should apply default values for missing parameters', () => {
    const emptyQuery = {}

    const result = ProductListQuerySchema.safeParse(emptyQuery)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.q).toBeUndefined()
      expect(result.data.page).toBe(1)
      expect(result.data.limit).toBe(10)
    }
  })

  it('should reject invalid limit values', () => {
    const invalidQuery = {
      limit: 0, // Invalid: limit must be >= 1
    }

    const result = ProductListQuerySchema.safeParse(invalidQuery)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['limit'],
            message: 'Too small: expected number to be >=1',
          }),
        ])
      )
    }
  })

  it('should reject limit values exceeding maximum', () => {
    const invalidQuery = {
      limit: 101, // Invalid: limit must be <= 100
    }

    const result = ProductListQuerySchema.safeParse(invalidQuery)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['limit'],
            message: 'Too big: expected number to be <=100',
          }),
        ])
      )
    }
  })
})

describe('ProductListResponseSchema', () => {
  it('should validate a complete product list response', () => {
    const validResponse = {
      items: [
        {
          id: 'product-1',
          title: 'Product 1',
          description: 'Description 1',
          images: ['https://example.com/image1.jpg'],
          price: { amount: 100, currency: 'USD' },
          paymentMethods: [{ label: 'Credit Card' }],
          seller: {
            id: 'seller-1',
            name: 'Seller 1',
            rating: 4.0,
            sales: 100,
            isOfficial: false,
          },
          stock: 5,
          rating: { average: 4.0, count: 10 },
        },
      ],
      page: 1,
      total: 1,
    }

    const result = ProductListResponseSchema.safeParse(validResponse)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.items).toHaveLength(1)
      expect(result.data.page).toBe(1)
      expect(result.data.total).toBe(1)
    }
  })

  it('should validate empty product list', () => {
    const emptyResponse = {
      items: [],
      page: 1,
      total: 0,
    }

    const result = ProductListResponseSchema.safeParse(emptyResponse)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.items).toHaveLength(0)
    }
  })
})
