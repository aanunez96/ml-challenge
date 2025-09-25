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
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Product Description
      </h2>
      
      <div className="prose prose-gray max-w-none">
        <div 
          className="text-gray-700 leading-relaxed whitespace-pre-line"
          aria-expanded={isExpanded}
        >
          {displayDescription}
        </div>
        
        {shouldShowToggle && (
          <div className="mt-4">
            <button
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors"
              aria-expanded={isExpanded}
              aria-controls="product-description-content"
            >
              {isExpanded ? (
                <>
                  <span>Show less</span>
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
                  <span>Show more</span>
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
        {isExpanded ? 'Full description is now visible' : 'Description is collapsed'}
      </div>
    </section>
  )
}