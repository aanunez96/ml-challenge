import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/repo'
import { ProductResponseSchema } from '@/lib/validators'
import { notFoundResponse, internalErrorResponse } from '@/lib/errors'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Get product from repository
    const product = await getProductById(id)

    if (!product) {
      return notFoundResponse(`Product with id '${id}' not found`)
    }

    // Validate response data (guardrail)
    const validationResult = ProductResponseSchema.safeParse(product)
    if (!validationResult.success) {
      // Only log validation errors in non-test environments
      if (process.env.NODE_ENV !== 'test') {
        console.error('Product validation failed:', validationResult.error.issues)
      }
      return internalErrorResponse('Product data validation failed')
    }

    return NextResponse.json(validationResult.data)
  } catch (error) {
    // Only log errors in non-test environments to reduce test noise
    if (process.env.NODE_ENV !== 'test') {
      console.error('Error in GET /api/products/[id]:', error)
    }
    return internalErrorResponse('Failed to fetch product')
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return NextResponse.json(
    {
      error: { code: 'NOT_IMPLEMENTED', message: 'PUT operation not supported in read-only mode' },
    },
    { status: 501 }
  )
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return NextResponse.json(
    {
      error: {
        code: 'NOT_IMPLEMENTED',
        message: 'DELETE operation not supported in read-only mode',
      },
    },
    { status: 501 }
  )
}
