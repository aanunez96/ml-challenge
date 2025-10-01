'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface GalleryProps {
  images: string[]
  productTitle: string
}

export default function Gallery({ images, productTitle }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Fallback for no images
  const displayImages = images.length > 0 ? images : ['/placeholder-product.svg']

  useEffect(() => {
    // Reset to first image when images change
    setSelectedIndex(0)
    setIsZoomed(false)
  }, [images])

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
    setIsZoomed(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setSelectedIndex(index)
      setIsZoomed(false)
    }
    if (event.key === 'ArrowUp' && index > 0) {
      event.preventDefault()
      setSelectedIndex(index - 1)
    }
    if (event.key === 'ArrowDown' && index < displayImages.length - 1) {
      event.preventDefault()
      setSelectedIndex(index + 1)
    }
  }

  const handleMainImageKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp' && selectedIndex > 0) {
      event.preventDefault()
      setSelectedIndex(selectedIndex - 1)
    }
    if (event.key === 'ArrowDown' && selectedIndex < displayImages.length - 1) {
      event.preventDefault()
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const handleMainImageClick = () => {
    setIsZoomed(!isZoomed)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="w-full flex gap-4" data-testid="product-gallery">
      {/* Vertical Thumbnails */}
      {displayImages.length > 1 && (
        <div className="xl:flex-shrink-0 w-16 hidden">
          <div
            className="flex flex-col gap-2"
            role="group"
            aria-label="Product image thumbnails"
            data-testid="gallery-thumbnails"
          >
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-16 h-16 overflow-hidden transition-all duration-200 focus-ring border rounded bg-ml-bg ${
                  index === selectedIndex ? 'border-ml-accent border-2' : 'border-ml-border border'
                }`}
                aria-label={`View image ${index + 1} of ${displayImages.length}`}
                aria-pressed={index === selectedIndex}
                data-testid={`thumbnail-${index}`}
              >
                <Image
                  src={image}
                  alt={`${productTitle} thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain p-1"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Image */}
      <div className="flex-1">
        <div
          className="aspect-square relative overflow-hidden bg-ml-bg border border-ml-border rounded group cursor-zoom-in"
          onClick={handleMainImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full focus-ring"
            tabIndex={0}
            role="img"
            aria-label={`${productTitle}, image ${selectedIndex + 1} of ${displayImages.length}. Click to zoom.`}
            onKeyDown={handleMainImageKeyDown}
            data-testid="main-image"
          >
            <Image
              src={displayImages[selectedIndex]}
              alt={`${productTitle} - Image ${selectedIndex + 1}`}
              fill
              className={`object-contain p-4 transition-transform duration-200 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-[1.02] cursor-zoom-in'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
              priority={selectedIndex === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              data-testid="gallery-main-image-img"
            />
            {isLoading && (
              <div className="absolute inset-0 animate-pulse flex items-center justify-center bg-gray-100">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            )}

            {/* Zoom indicator */}
            {!isZoomed && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  Zoom
                </div>
              </div>
            )}
          </div>

          {/* Navigation arrows for multiple images */}
          {displayImages.length > 1 && !isZoomed && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(Math.max(0, selectedIndex - 1))
                }}
                disabled={selectedIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md transition-all duration-200 focus-ring disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedIndex(Math.min(displayImages.length - 1, selectedIndex + 1))
                }}
                disabled={selectedIndex === displayImages.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md transition-all duration-200 focus-ring disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Screen reader announcement for image changes */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Image ${selectedIndex + 1} of ${displayImages.length}: ${productTitle}${isZoomed ? ' (zoomed)' : ''}`}
      </div>
    </div>
  )
}
