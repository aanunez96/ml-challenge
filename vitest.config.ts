/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: [
      'node_modules/**',
      '.next/**',
      'coverage/**',
      'tests/e2e/**',
      '**/*.d.ts',
      '**/*.config.*',
    ],
    env: {
      NODE_ENV: 'test',
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'lcov', 'html'],
      all: true,
      include: [
        'src/app/api/**/*.{ts,tsx}', // API routes only
        'lib/**/*.{ts,tsx}', // Business logic
      ],
      exclude: [
        'node_modules/**',
        '.next/**',
        'coverage/**',
        'tests/**',
        'playwright-report/**',
        '**/*.d.ts',
        '**/*.config.*',
      ],
      thresholds: {
        lines: 80,
        statements: 80,
        functions: 80,
        branches: 80,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@/lib',
        replacement: path.resolve(__dirname, './lib'),
      },
      {
        find: '@/components',
        replacement: path.resolve(__dirname, './components'),
      },
      {
        find: '@/src',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ],
  },
})
