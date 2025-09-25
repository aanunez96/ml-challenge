import { describe, it, expect } from 'vitest'

describe('Smoke Test', () => {
  it('should run basic tests', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle async operations', async () => {
    const result = await Promise.resolve('hello')
    expect(result).toBe('hello')
  })
})