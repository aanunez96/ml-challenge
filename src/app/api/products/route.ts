import { NextRequest, NextResponse } from 'next/server'
import { listProducts } from '@/lib/repo'
import { ProductResponseSchema } from '@/lib/validators'
import { validationErrorResponse, internalErrorResponse } from '@/lib/errors'
import { z } from 'zod'

// Query parameter validation schema
const ListProductsQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse and validate query parameters
    const queryResult = ListProductsQuerySchema.safeParse({
      q: searchParams.get('q') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined
    })

    if (!queryResult.success) {
      const firstError = queryResult.error.issues[0]
      return validationErrorResponse(`Invalid query parameter: ${firstError.message}`)
    }

    const { q, page, limit } = queryResult.data

    // Get products from repository
    const result = await listProducts({ q, page, limit })

    // Validate each product in response (guardrail)
    const validatedItems = result.items.map(item => {
      const validationResult = ProductResponseSchema.safeParse(item)
      if (!validationResult.success) {
        console.error('Product validation failed:', validationResult.error.issues)
        throw new Error('Product data validation failed')
      }
      return validationResult.data
    })

    return NextResponse.json({
      items: validatedItems,
      page: result.page,
      total: result.total
    })
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return internalErrorResponse('Failed to fetch products')
  }
}