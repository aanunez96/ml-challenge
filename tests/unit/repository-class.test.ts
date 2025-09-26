import { describe, it, expect } from 'vitest'
import { ProductRepository } from '@/lib/repo'
import { AppError, ValidationError, NotFoundError, ConflictError } from '@/lib/errors'

describe('Repository Class and Error Classes Coverage', () => {
  describe('ProductRepository class methods', () => {
    it('should throw error for unsupported create operation', async () => {
      const repo = new ProductRepository()
      
      await expect(repo.create({})).rejects.toThrow('Create operation not supported')
    })

    it('should throw error for unsupported update operation', async () => {
      const repo = new ProductRepository()
      
      await expect(repo.update('any-id', {})).rejects.toThrow('Update operation not supported')
    })

    it('should throw error for unsupported delete operation', async () => {
      const repo = new ProductRepository()
      
      await expect(repo.delete('any-id')).rejects.toThrow('Delete operation not supported')
    })

    it('should use findAll method', async () => {
      const repo = new ProductRepository()
      
      const products = await repo.findAll()
      expect(Array.isArray(products)).toBe(true)
    })

    it('should use findById method', async () => {
      const repo = new ProductRepository()
      
      const product = await repo.findById('premium-laptop-mx2024')
      expect(product).toBeTruthy()
      expect(product?.id).toBe('premium-laptop-mx2024')
    })
  })

  describe('Error classes', () => {
    it('should create AppError with correct properties', () => {
      const error = new AppError(500, 'Test error message', true)
      
      expect(error.statusCode).toBe(500)
      expect(error.message).toBe('Test error message')
      expect(error.isOperational).toBe(true)
      expect(error.name).toBe('AppError')
    })

    it('should create ValidationError with 400 status', () => {
      const error = new ValidationError('Validation failed')
      
      expect(error.statusCode).toBe(400)
      expect(error.message).toBe('Validation failed')
      expect(error.name).toBe('ValidationError')
    })

    it('should create NotFoundError with 404 status', () => {
      const error = new NotFoundError('Resource not found')
      
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe('Resource not found')
      expect(error.name).toBe('NotFoundError')
    })

    it('should create ConflictError with 409 status', () => {
      const error = new ConflictError('Resource conflict')
      
      expect(error.statusCode).toBe(409)
      expect(error.message).toBe('Resource conflict')
      expect(error.name).toBe('ConflictError')
    })
  })
})