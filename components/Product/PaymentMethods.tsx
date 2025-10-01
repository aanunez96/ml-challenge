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
      <div className="text-sm text-ml-muted" data-testid="payment-methods-empty">
        Métodos de pago no disponibles
      </div>
    )
  }

  // Function to categorize payment methods for ML display
  const categorizeMethod = (methodLabel: string): string => {
    const label = methodLabel.toLowerCase()
    if (label.includes('crédito') || label.includes('credit')) {
      return 'credit'
    }
    if (label.includes('paypal') || label.includes('mercado pago')) {
      return 'digital'
    }
    if (label.includes('efectivo') || label.includes('cash')) {
      return 'cash'
    }
    if (label.includes('débito') || label.includes('debit')) {
      return 'debit'
    }
    return 'other'
  }

  // Group methods by category
  const groupedMethods = methods.reduce(
    (acc, method) => {
      const category = categorizeMethod(method.label)
      if (!acc[category]) acc[category] = []
      acc[category].push(method)
      return acc
    },
    {} as Record<string, PaymentMethod[]>
  )

  // Enhanced logo mapping to match actual product data
  const getPaymentLogos = (category: string, methods: PaymentMethod[]) => {
    const logoSets = {
      credit: [
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg',
          name: 'Visa',
        },
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/9cf818e0-723a-11f0-a459-cf21d0937aeb-m.svg',
          name: 'Mastercard',
        },
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/b2c93a40-f3be-11eb-9984-b7076edb0bb7-m.svg',
          name: 'American Express',
        },
      ],
      digital: [
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/23a95840-6817-11ec-a13d-73e40a9e9500-m.svg',
          name: 'PayPal',
        },
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/f3e8e940-f549-11ef-bad6-e9962bcd76e5-m.svg',
          name: 'Mercado Pago',
        },
      ],
      debit: [
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
          name: 'Visa Débito',
        },
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/87075440-571e-11e8-823a-758d95db88db-m.svg',
          name: 'Naranja',
        },
      ],
      cash: [
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/fec5f230-06ee-11ea-8e1e-273b5a374550-m.svg',
          name: 'PagoFácil',
        },
        {
          logo: 'https://http2.mlstatic.com/storage/logos-api-admin/443c34d0-571b-11ea-9d0f-c135b61316ba-m.svg',
          name: 'Rapipago',
        },
      ],
    }
    return logoSets[category as keyof typeof logoSets] || []
  }

  return (
    <div
      className="bg-ml-bg p-4 mb-6 border border-ml-border rounded-md"
      data-testid="payment-methods-list"
    >
      <h3 className="text-lg font-medium mb-4 text-ml-text">Medios de pago</h3>

      {/* Green banner - show if installments are available */}
      {methods.some(
        (method) => method.note && (method.note.includes('cuotas') || method.note.includes('meses'))
      ) && (
        <div className="bg-ml-success text-white p-4 rounded mb-4 flex items-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M2 6h20l-2 12H4L2 6zm4 0V4a2 2 0 012-2h8a2 2 0 012 2v2M9 10v2m6-2v2"
              stroke="currentColor"
              strokeWidth={1.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-medium">
            {methods.find(
              (method) =>
                method.note && (method.note.includes('cuotas') || method.note.includes('meses'))
            )?.note || 'Pagá en hasta 18 cuotas sin interés'}
          </span>
        </div>
      )}

      {/* Digital Methods (if available) */}
      {groupedMethods.digital && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-ml-text">Meses sin Tarjeta</h4>
          <div className="flex items-center gap-2">
            {getPaymentLogos('digital', groupedMethods.digital).map((logo, index) => (
              <img key={index} src={logo.logo} alt={logo.name} className="h-6" />
            ))}
            <div className="ml-2">
              {groupedMethods.digital.map((method, index) => (
                <div key={index}>
                  <span className="text-sm text-ml-text">{method.label}</span>
                  {method.note && <p className="text-xs text-ml-muted">{method.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Credit Cards */}
      {groupedMethods.credit && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-ml-text">Tarjetas de crédito</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {getPaymentLogos('credit', groupedMethods.credit).map((logo, index) => (
              <img key={index} src={logo.logo} alt={logo.name} className="h-6" />
            ))}
          </div>
          {groupedMethods.credit.map((method, index) => (
            <div key={index} className="text-xs text-ml-muted">
              {method.note}
            </div>
          ))}
        </div>
      )}

      {/* Debit Cards - Show if we have debit or show as fallback for general card acceptance */}
      {(groupedMethods.debit || groupedMethods.credit) && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-ml-text">Tarjetas de débito</h4>
          <div className="flex flex-wrap gap-2">
            {getPaymentLogos('debit', groupedMethods.debit || []).map((logo, index) => (
              <img key={index} src={logo.logo} alt={logo.name} className="h-6" />
            ))}
          </div>
        </div>
      )}

      {/* Cash Methods */}
      {groupedMethods.cash && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-ml-text">Efectivo</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {getPaymentLogos('cash', groupedMethods.cash).map((logo, index) => (
              <img key={index} src={logo.logo} alt={logo.name} className="h-6" />
            ))}
          </div>
          {groupedMethods.cash.map((method, index) => (
            <div key={index}>
              <span className="text-sm text-ml-text">{method.label}</span>
              {method.note && <p className="text-xs text-ml-muted">{method.note}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Other payment methods */}
      {groupedMethods.other && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-ml-text">Otros medios de pago</h4>
          {groupedMethods.other.map((method, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-ml-border rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-ml-muted" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 6h20l-2 12H4L2 6zm4 0V4a2 2 0 012-2h8a2 2 0 012 2v2M9 10v2m6-2v2" />
                </svg>
              </div>
              <div>
                <span className="text-sm text-ml-text">{method.label}</span>
                {method.note && <p className="text-xs text-ml-muted">{method.note}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Link */}
      <div className="pt-4 border-t border-ml-border mt-4">
        <button className="text-sm font-medium text-ml-accent hover:underline">
          Conocé otros medios de pago
        </button>
      </div>
    </div>
  )
}
