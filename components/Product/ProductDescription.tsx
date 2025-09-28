'use client'

import { useState } from 'react'

interface ProductDescriptionProps {
  description: string
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Determine if content is long enough to need truncation
  const isLongContent = description.length > 300
  const shouldShowToggle = isLongContent

  // Create truncated version
  const truncatedDescription = isLongContent
    ? description.slice(0, 300) + '...'
    : description

  const displayDescription = isExpanded || !isLongContent
    ? description
    : truncatedDescription

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <section
      className="pt-6"
      style={{ borderTop: '1px solid var(--marketplace-border)' }}
      data-testid="product-description"
    >
      <h2
        className="text-lg font-medium mb-4"
        style={{ color: 'var(--marketplace-text)' }}
      >
        Descripción
      </h2>

      <div className="max-w-none">
        <div
          className={`leading-relaxed whitespace-pre-line transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-none' : 'max-h-[8rem] overflow-hidden'
          }`}
          style={{
            color: 'var(--marketplace-text)',
            lineClamp: isExpanded ? 'none' : '8'
          }}
          aria-expanded={isExpanded}
          data-testid="description-content"
        >
          {description}
        </div>

        {shouldShowToggle && (
          <div className="mt-4">
            <button
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              className="inline-flex items-center gap-1 text-sm font-medium focus-ring rounded transition-colors hover:underline"
              style={{ color: 'var(--marketplace-accent)' }}
              aria-expanded={isExpanded}
              aria-controls="product-description-content"
              data-testid={isExpanded ? "show-less-button" : "show-more-button"}
            >
              {isExpanded ? (
                <>
                  <span>Ver menos</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>Ver más</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Screen reader announcement for content changes */}
      <div
        className="sr-only"
        aria-live="polite"
        id="product-description-content"
      >
        {isExpanded ? 'La descripción completa ahora está visible' : 'La descripción está colapsada'}
      </div>
    </section>
  )
}
