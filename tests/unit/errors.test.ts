import { describe, it, expect } from 'vitest'
import {
  notFoundResponse,
  validationErrorResponse,
  internalErrorResponse
} from '@/lib/errors'

describe('Error Response Helpers', () => {
  describe('notFoundResponse', () => {
    it('should return 404 response with NOT_FOUND error code', () => {
      const message = 'Product not found'
      const response = notFoundResponse(message)
      
      expect(response.status).toBe(404)
      
      // Test the response body structure
      response.json().then(data => {
        expect(data).toEqual({
          error: {
            code: 'NOT_FOUND',
            message: message
          }
        })
      })
    })

    it('should handle custom error messages', () => {
      const customMessage = 'User with ID 123 not found'
      const response = notFoundResponse(customMessage)
      
      expect(response.status).toBe(404)
      
      response.json().then(data => {
        expect(data.error.message).toBe(customMessage)
        expect(data.error.code).toBe('NOT_FOUND')
      })
    })
  })

  describe('validationErrorResponse', () => {
    it('should return 400 response with VALIDATION_ERROR code', () => {
      const message = 'Invalid input data'
      const response = validationErrorResponse(message)
      
      expect(response.status).toBe(400)
      
      response.json().then(data => {
        expect(data).toEqual({
          error: {
            code: 'VALIDATION_ERROR',
            message: message
          }
        })
      })
    })

    it('should handle validation error messages', () => {
      const validationMessage = 'Required field "name" is missing'
      const response = validationErrorResponse(validationMessage)
      
      expect(response.status).toBe(400)
      
      response.json().then(data => {
        expect(data.error.message).toBe(validationMessage)
        expect(data.error.code).toBe('VALIDATION_ERROR')
      })
    })
  })

  describe('internalErrorResponse', () => {
    it('should return 500 response with INTERNAL error code', () => {
      const message = 'Database connection failed'
      const response = internalErrorResponse(message)
      
      expect(response.status).toBe(500)
      
      response.json().then(data => {
        expect(data).toEqual({
          error: {
            code: 'INTERNAL',
            message: message
          }
        })
      })
    })

    it('should handle internal error messages', () => {
      const internalMessage = 'Failed to process request'
      const response = internalErrorResponse(internalMessage)
      
      expect(response.status).toBe(500)
      
      response.json().then(data => {
        expect(data.error.message).toBe(internalMessage)
        expect(data.error.code).toBe('INTERNAL')
      })
    })
  })

  describe('response structure consistency', () => {
    it('should maintain consistent error envelope structure across all helpers', async () => {
      const notFoundResp = notFoundResponse('Not found')
      const validationResp = validationErrorResponse('Validation failed') 
      const internalResp = internalErrorResponse('Internal error')

      const notFoundData = await notFoundResp.json()
      const validationData = await validationResp.json()
      const internalData = await internalResp.json()

      // All should have the same structure with error.code and error.message
      expect(notFoundData).toHaveProperty('error')
      expect(notFoundData.error).toHaveProperty('code')
      expect(notFoundData.error).toHaveProperty('message')
      
      expect(validationData).toHaveProperty('error')
      expect(validationData.error).toHaveProperty('code')
      expect(validationData.error).toHaveProperty('message')
      
      expect(internalData).toHaveProperty('error')
      expect(internalData.error).toHaveProperty('code')
      expect(internalData.error).toHaveProperty('message')
    })

    it('should have correct HTTP status codes', () => {
      expect(notFoundResponse('test').status).toBe(404)
      expect(validationErrorResponse('test').status).toBe(400)
      expect(internalErrorResponse('test').status).toBe(500)
    })
  })
})