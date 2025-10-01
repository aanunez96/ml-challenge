'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Product page error:', error)
  }, [error])

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--marketplace-bg-sub)' }}
    >
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div
            className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
          >
            <svg
              className="w-12 h-12"
              style={{ color: '#EF4444' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--marketplace-text)' }}
            data-testid="error-heading"
          >
            Something went wrong
          </h1>
          <p
            className="mb-8"
            style={{ color: 'var(--marketplace-muted)' }}
            data-testid="error-message"
          >
            We encountered an error while loading this product. Please try again.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white transition-colors focus-ring"
            style={{ backgroundColor: 'var(--marketplace-accent)' }}
            data-testid="error-retry-button"
          >
            Try Again
          </button>

          <p className="text-sm" style={{ color: 'var(--marketplace-muted)' }}>
            If the problem persists,{' '}
            <Link
              href="/"
              className="underline focus-ring rounded"
              style={{ color: 'var(--marketplace-accent)' }}
              data-testid="error-home-link"
            >
              go back home
            </Link>
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary
              className="text-sm cursor-pointer"
              style={{ color: 'var(--marketplace-muted)' }}
            >
              Error Details (Development Only)
            </summary>
            <pre
              className="mt-2 text-xs p-3 rounded overflow-auto"
              style={{
                color: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
              }}
            >
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
