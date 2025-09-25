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
            className="w-5 h-5 text-yellow-400 fill-current" 
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
              className="w-5 h-5 text-gray-300 fill-current" 
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 w-1/2 overflow-hidden">
              <svg 
                className="w-5 h-5 text-yellow-400 fill-current" 
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
            className="w-5 h-5 text-gray-300 fill-current" 
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
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div 
          className="flex items-center gap-1"
          role="img"
          aria-label={`${average} out of 5 stars, ${getRatingText(average)} rating`}
        >
          {renderStars(average)}
        </div>
        
        <span className="text-lg font-semibold text-gray-900">
          {average.toFixed(1)}
        </span>
      </div>

      <div className="text-gray-500 text-sm">
        <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">
          {formatReviewCount(count)} review{count !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Screen reader friendly description */}
      <span className="sr-only">
        Average rating: {average} out of 5 stars, based on {count} customer reviews. Rating quality: {getRatingText(average)}.
      </span>
    </div>
  )
}