interface PaymentMethod {
  label: string
  note?: string
}

interface PaymentMethodsProps {
  methods: PaymentMethod[]
}

export default function PaymentMethods({ methods }: PaymentMethodsProps) {
  if (methods.length === 0) {
    return (
      <div className="text-gray-500 text-sm" data-testid="payment-methods-empty">
        Payment methods not available
      </div>
    )
  }

  return (
    <ul className="space-y-3" role="list" data-testid="payment-methods-list">
      {methods.map((method, index) => (
        <li 
          key={index} 
          className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          data-testid={`payment-method-${index}`}
        >
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                className="w-3 h-3 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900" data-testid="payment-method-label">
              {method.label}
            </h4>
            {method.note && (
              <p className="text-sm text-gray-600 mt-1" data-testid="payment-method-note">
                {method.note}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}