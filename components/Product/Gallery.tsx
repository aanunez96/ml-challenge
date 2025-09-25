'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface GalleryProps {
  images: string[]
  productTitle: string
}

export default function Gallery({ images, productTitle }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fallback for no images
  const displayImages = images.length > 0 ? images : ['/placeholder-product.svg']

  useEffect(() => {
    // Reset to first image when images change
    setSelectedIndex(0)
  }, [images])

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedIndex(index)
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      setSelectedIndex(index - 1)
    }
    if (event.key === 'ArrowRight' && index < displayImages.length - 1) {
      event.preventDefault()
      setSelectedIndex(index + 1)
    }
  }

  const handleMainImageKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && selectedIndex > 0) {
      event.preventDefault()
      setSelectedIndex(selectedIndex - 1)
    }
    if (event.key === 'ArrowRight' && selectedIndex < displayImages.length - 1) {
      event.preventDefault()
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <div className="w-full" data-testid="product-gallery">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-4">
        <div 
          className="relative w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          tabIndex={0}
          role="img"
          aria-label={`${productTitle}, image ${selectedIndex + 1} of ${displayImages.length}`}
          onKeyDown={handleMainImageKeyDown}
          data-testid="gallery-main-image"
        >
          <Image
            src={displayImages[selectedIndex]}
            alt={`${productTitle} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
            priority={selectedIndex === 0}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            data-testid="gallery-main-image-img"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
        </div>

        {/* Navigation arrows for multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelectedIndex(Math.min(displayImages.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === displayImages.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div 
          className="flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label="Product image thumbnails"
          data-testid="gallery-thumbnails"
        >
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                index === selectedIndex 
                  ? 'border-blue-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1} of ${displayImages.length}`}
              aria-pressed={index === selectedIndex}
              data-testid={`gallery-thumbnail-${index}`}
            >
              <Image
                src={image}
                alt={`${productTitle} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Screen reader announcement for image changes */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {`Showing image ${selectedIndex + 1} of ${displayImages.length}`}
      </div>
    </div>
  )
}