import { z } from 'zod'

// ID validation: [a-z0-9_-], length 6-40, non-empty
const idSchema = z
  .string()
  .min(6, 'ID must be at least 6 characters')
  .max(40, 'ID must not exceed 40 characters')
  .regex(/^[a-z0-9_-]+$/, 'ID must contain only lowercase letters, numbers, underscores, and hyphens')

// Price validation with 2 decimal places
const priceSchema = z.object({
  amount: z
    .number()
    .positive('Price amount must be positive')
    .refine((val) => Number(val.toFixed(2)) === val, 'Price must have at most 2 decimal places'),
  currency: z.enum(['MXN', 'USD']),
})

// Rating validation: 0-5 in 0.1 steps
const ratingSchema = z.object({
  average: z
    .number()
    .min(0, 'Rating average must be at least 0')
    .max(5, 'Rating average must not exceed 5')
    .refine((val) => Math.round(val * 10) / 10 === val, 'Rating average must be in 0.1 steps'),
  count: z.number().int().min(0, 'Rating count must be a non-negative integer'),
})

// Payment method validation
const paymentMethodSchema = z.object({
  label: z.string().min(1).max(40, 'Payment method label must not exceed 40 characters'),
  note: z.string().max(100, 'Payment method note must not exceed 100 characters').optional(),
})

// Seller validation
const sellerSchema = z.object({
  id: idSchema,
  name: z.string().min(1, 'Seller name is required'),
  rating: z
    .number()
    .min(0, 'Seller rating must be at least 0')
    .max(5, 'Seller rating must not exceed 5'),
  sales: z.number().int().min(0, 'Seller sales must be a non-negative integer'),
  isOfficial: z.boolean(),
  location: z.string().optional(),
})

// Flags validation (optional toggles)
const flagsSchema = z
  .object({
    full: z.boolean().optional(),
    freeShipping: z.boolean().optional(),
  })
  .optional()

// Main Product Response schema
export const ProductResponseSchema = z.object({
  id: idSchema,
  title: z
    .string()
    .min(1, 'Title is required')
    .max(160, 'Title must not exceed 160 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(5000, 'Description must not exceed 5000 characters'),
  images: z
    .array(z.string().url('Image must be a valid HTTPS URL').startsWith('https://', 'Image URL must use HTTPS'))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
  price: priceSchema,
  paymentMethods: z
    .array(paymentMethodSchema)
    .min(1, 'At least one payment method is required'),
  seller: sellerSchema,
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  rating: ratingSchema,
  flags: flagsSchema,
})

// Export types
export type ProductResponse = z.infer<typeof ProductResponseSchema>
export type Price = z.infer<typeof priceSchema>
export type Rating = z.infer<typeof ratingSchema>
export type PaymentMethod = z.infer<typeof paymentMethodSchema>
export type Seller = z.infer<typeof sellerSchema>
export type ProductFlags = z.infer<typeof flagsSchema>

// Legacy schemas for backward compatibility
export const ProductSchema = ProductResponseSchema
export type Product = ProductResponse

export const CreateProductSchema = ProductResponseSchema.omit({ id: true })
export type CreateProduct = z.infer<typeof CreateProductSchema>

export const UpdateProductSchema = ProductResponseSchema.partial().omit({ id: true })
export type UpdateProduct = z.infer<typeof UpdateProductSchema>