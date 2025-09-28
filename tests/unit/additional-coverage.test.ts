import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'

describe('Product API [id] - Additional Coverage', () => {
  it('should handle PUT requests (not implemented)', async () => {
    const { PUT } = await import('@/app/api/products/[id]/route')

    const request = new NextRequest('http://localhost:3000/api/products/test-id', {
      method: 'PUT'
    })

    const response = await PUT(request, { params: Promise.resolve({ id: 'test-id' }) })

    expect(response.status).toBe(501)

    const body = await response.json()
    expect(body.error.code).toBe('NOT_IMPLEMENTED')
    expect(body.error.message).toContain('PUT operation not supported')
  })

  it('should handle DELETE requests (not implemented)', async () => {
    const { DELETE } = await import('@/app/api/products/[id]/route')

    const request = new NextRequest('http://localhost:3000/api/products/test-id', {
      method: 'DELETE'
    })

    const response = await DELETE(request, { params: Promise.resolve({ id: 'test-id' }) })

    expect(response.status).toBe(501)

    const body = await response.json()
    expect(body.error.code).toBe('NOT_IMPLEMENTED')
    expect(body.error.message).toContain('DELETE operation not supported')
  })
})
