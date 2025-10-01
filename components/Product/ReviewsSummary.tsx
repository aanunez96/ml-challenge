interface Rating {
  average: number
  count: number
}

interface ReviewsSummaryProps {
  rating: Rating
}

export default function ReviewsSummary({ rating }: ReviewsSummaryProps) {
  const { average, count } = rating

  const renderStars = (average: number) => {
    const stars = []
    const fullStars = Math.floor(average)
    const hasHalfStar = average % 1 >= 0.5

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 opacity-90"
            style={{ color: 'var(--star-color)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <svg
              className="w-4 h-4"
              style={{ color: 'var(--marketplace-border)' }}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 w-1/2 overflow-hidden">
              <svg
                className="w-4 h-4 opacity-90"
                style={{ color: 'var(--star-color)' }}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            className="w-4 h-4"
            style={{ color: 'var(--marketplace-border)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      }
    }

    return stars
  }

  const formatReviewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  const getRatingText = (average: number) => {
    if (average >= 4.5) return 'Excellent'
    if (average >= 4.0) return 'Very good'
    if (average >= 3.5) return 'Good'
    if (average >= 3.0) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="flex items-center gap-2" data-testid="reviews-summary">
      <div
        className="flex items-center gap-1"
        role="img"
        aria-label={`${average} out of 5, ${formatReviewCount(count)} reviews`}
        data-testid="rating-stars"
      >
        {renderStars(average)}
      </div>

      <span className="text-xs" style={{ color: '#333' }}>
        {average.toFixed(1)}
      </span>

      <span className="text-xs" style={{ color: '#999' }}>
        ({formatReviewCount(count)})
      </span>

      {/* Screen reader friendly description */}
      <span className="sr-only">
        Average rating: {average} out of 5 stars, based on {count} customer reviews. Rating quality:{' '}
        {getRatingText(average)}.
      </span>
    </div>
  )
}
