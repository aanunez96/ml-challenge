interface PriceProps {
  price: {
    amount: number
    currency: string
  }
}

export default function Price({ price }: PriceProps) {
  const formatPrice = (amount: number, currency: string) => {
    // Split into integer and decimal parts
    const integerPart = Math.floor(amount)
    const decimalPart = Math.round((amount - integerPart) * 100)

    // Format integer part with commas
    const formattedInteger = integerPart.toLocaleString('en-US')

    return {
      integer: formattedInteger,
      decimal: decimalPart.toString().padStart(2, '0'),
      currency,
    }
  }

  const { integer, decimal, currency } = formatPrice(price.amount, price.currency)

  const getCurrencySymbol = (currency: string) => {
    switch (currency.toUpperCase()) {
      case 'MXN':
        return '$'
      case 'USD':
        return '$'
      case 'EUR':
        return '€'
      default:
        return currency
    }
  }

  const getCurrencyLabel = (currency: string) => {
    switch (currency.toUpperCase()) {
      case 'MXN':
        return 'Mexican Pesos'
      case 'USD':
        return 'US Dollars'
      case 'EUR':
        return 'Euros'
      default:
        return currency
    }
  }

  return (
    <div className="space-y-1" data-testid="price-display">
      <div className="flex items-start">
        <span className="text-xs mt-2 mr-1" style={{ color: '#333' }}>
          {getCurrencySymbol(currency)}
        </span>
        <div className="flex items-baseline">
          <span
            className="text-3xl font-light leading-none"
            style={{ color: '#333' }}
            data-testid="price-int"
          >
            {integer}
          </span>
          <span
            className="text-lg font-light leading-none"
            style={{ color: '#333' }}
            data-testid="price-dec"
          >
            {decimal !== '00' ? `.${decimal}` : ''}
          </span>
        </div>
      </div>

      {/* Installments info */}
      <div className="text-sm" style={{ color: '#00A650' }}>
        en 12x ${Math.round(price.amount / 12).toLocaleString()} sin interés
      </div>

      {/* See payment methods link */}
      <div>
        <a href="#" className="text-xs" style={{ color: '#3483FA' }}>
          Ver los medios de pago
        </a>
      </div>

      {/* Screen reader friendly price */}
      <span className="sr-only">
        Price: {price.amount} {getCurrencyLabel(currency)}
      </span>
    </div>
  )
}
