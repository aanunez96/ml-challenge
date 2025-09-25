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
      currency
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
    <div className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span 
          className="text-3xl sm:text-4xl font-bold text-gray-900"
          aria-label={`${integer} ${getCurrencyLabel(currency)} and ${decimal} cents`}
        >
          {getCurrencySymbol(currency)}{integer}
          <span className="text-lg font-normal text-gray-600">
            .{decimal}
          </span>
        </span>
        <span className="text-lg text-gray-600 ml-1">
          {currency.toUpperCase()}
        </span>
      </div>
      
      {/* Screen reader friendly price */}
      <span className="sr-only">
        Price: {price.amount} {getCurrencyLabel(currency)}
      </span>
    </div>
  )
}