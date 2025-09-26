# Data Contracts & Schema Documentation

This document defines the data structures, validation rules, and API contracts used throughout the ML Challenge project.

## Product Schema

### ProductResponse

The complete product data structure returned by API endpoints.

```typescript
interface ProductResponse {
  id: string                    // 6-40 chars, [a-z0-9_-] only
  title: string                 // 1-160 characters
  description: string           // 1-5000 characters
  images: string[]              // 1-10 HTTPS URLs
  price: Price                  // Price object
  paymentMethods: PaymentMethod[]  // At least 1 method
  seller: Seller               // Seller information
  stock: number                // Non-negative integer
  rating: Rating               // Rating object
  flags?: ProductFlags         // Optional feature flags
}
```

### Price Object

```typescript
interface Price {
  amount: number    // Positive, max 2 decimal places
  currency: 'MXN' | 'USD'
}
```

**Validation Rules:**
- Amount must be positive (> 0)
- Maximum 2 decimal places (e.g., 99.99, not 99.999)
- Only MXN and USD currencies supported

**Examples:**
```json
{
  "amount": 89999.99,
  "currency": "MXN"
}
```

### Rating Object

```typescript
interface Rating {
  average: number  // 0-5, in 0.1 steps
  count: number    // Non-negative integer
}
```

**Validation Rules:**
- Average: 0.0 to 5.0 range in 0.1 increments
- Count: Non-negative integer (≥ 0)

**Examples:**
```json
{
  "average": 4.8,
  "count": 2847
}
```

### Payment Method Object

```typescript
interface PaymentMethod {
  label: string    // 1-40 characters, required
  note?: string    // Optional, max 100 characters
}
```

**Examples:**
```json
{
  "label": "Tarjeta de Crédito",
  "note": "12 meses sin intereses disponibles"
}
```

### Seller Object

```typescript
interface Seller {
  id: string        // 6-40 chars, [a-z0-9_-] only
  name: string      // Required, min 1 character
  rating: number    // 0-5 range
  sales: number     // Non-negative integer
  isOfficial: boolean
  location?: string // Optional
}
```

**Examples:**
```json
{
  "id": "apple-store-mx",
  "name": "Apple Store México",
  "rating": 4.9,
  "sales": 125430,
  "isOfficial": true,
  "location": "Ciudad de México, CDMX"
}
```

### Product Flags Object

```typescript
interface ProductFlags {
  full?: boolean         // Product is fully featured
  freeShipping?: boolean // Free shipping available
}
```

**Examples:**
```json
{
  "full": true,
  "freeShipping": true
}
```

## ID Validation Rules

Product and seller IDs must follow strict formatting:

- **Length**: 6-40 characters
- **Characters**: Lowercase letters (a-z), numbers (0-9), underscores (_), hyphens (-)
- **Pattern**: `/^[a-z0-9_-]{6,40}$/`

**Valid IDs:**
- `premium-laptop-mx2024`
- `gaming_chair_deluxe`
- `apple-store-mx`

**Invalid IDs:**
- `123` (too short)
- `Product-With-UPPERCASE` (uppercase not allowed)
- `product@store.com` (special characters not allowed)

## Image URL Validation

Product images must be HTTPS URLs:

- **Protocol**: HTTPS only (security requirement)
- **Format**: Valid URL format
- **Quantity**: 1-10 images per product

**Valid URLs:**
- `https://example.com/product-image.jpg`
- `https://cdn.store.com/images/laptop-front-view.png`

**Invalid URLs:**
- `http://example.com/image.jpg` (HTTP not allowed)
- `relative/path/image.jpg` (not a complete URL)

## API Query Parameters

### Product List Query

```typescript
interface ProductListQuery {
  q?: string      // Optional search query
  page?: number   // Page number (≥ 1, default: 1)
  limit?: number  // Items per page (1-100, default: 12)
}
```

**Validation Rules:**
- Page: Minimum 1, default 1
- Limit: Range 1-100, default 12
- Search query: Optional string

## API Response Formats

### Success Response

Single product endpoint returns `ProductResponse` directly:

```json
{
  "id": "premium-laptop-mx2024",
  "title": "MacBook Pro 16\" M3 Max - Premium Edition",
  "description": "Experience ultimate performance...",
  "price": {
    "amount": 89999.99,
    "currency": "MXN"
  }
}
```

### List Response

Product list endpoint returns paginated results:

```typescript
interface ProductListResponse {
  items: ProductResponse[]  // Array of products
  page: number             // Current page number
  total: number            // Total matching items
}
```

```json
{
  "items": [
    { /* ProductResponse object */ }
  ],
  "page": 1,
  "total": 3
}
```

### Error Response

All error responses follow consistent envelope format:

```typescript
interface ErrorResponse {
  error: {
    code: string          // Error classification
    message: string       // Human-readable message
    details?: object      // Additional context
  }
}
```

**Error Codes:**
- `VALIDATION_ERROR`: Invalid input data or parameters
- `NOT_FOUND`: Requested resource doesn't exist
- `NOT_IMPLEMENTED`: Endpoint not yet implemented
- `INTERNAL_ERROR`: Unexpected server error

**Examples:**

```json
// Validation Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "ID must be at least 6 characters",
    "details": {
      "field": "id",
      "input": "123",
      "constraint": "min_length_6"
    }
  }
}

// Not Found Error
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Product with ID 'nonexistent' not found",
    "details": {
      "resource": "products",
      "id": "nonexistent"
    }
  }
}
```

This contract ensures consistent data handling across all application layers and provides clear expectations for API consumers.
{
  average: number   // 0-5 in 0.1 steps (e.g., 4.3, 4.7)
  count: number     // Integer ≥ 0
}
```

### Seller Object

```typescript
{
  id: string        // Same rules as product ID
  name: string      // Required, non-empty
  rating: number    // 0-5 scale
  sales: number     // Integer ≥ 0
  isOfficial: boolean
  location?: string // Optional location info
}
```

### Payment Methods Array

Each payment method includes:
- `label`: Required string (1-40 chars)
- `note`: Optional string (≤100 chars)

Minimum 1 payment method required.

### Flags Object (Optional)

```typescript
{
  full?: boolean        // Product completeness indicator
  freeShipping?: boolean // Shipping cost waiver
}
```

## Validation Rules

### ID Format
- Length: 6-40 characters
- Characters: lowercase letters, numbers, underscores, hyphens only
- Pattern: `/^[a-z0-9_-]+$/`

### Price Validation
- Amount must be positive
- Maximum 2 decimal places (e.g., 123.45 ✓, 123.456 ✗)
- Currency restricted to MXN or USD

### Rating Precision
- Average: 0-5 scale with 0.1 precision (4.3, 4.7, etc.)
- Count: Non-negative integer

### Image Requirements
- All URLs must use HTTPS protocol
- Minimum 1 image, maximum 10 images
- Must be valid URL format

## Sample Data Edge Cases

Our test dataset covers these scenarios:

### 1. Happy Path Product (`premium-laptop-mx2024`)
- **Features**: Full flags enabled, high rating (4.8), MXN currency
- **Purpose**: Validates optimal product configuration

### 2. Out of Stock (`gaming-chair-deluxe`)
- **Features**: `stock: 0`, mixed flags (full=false, freeShipping=true)
- **Purpose**: Tests inventory management edge case

### 3. Low Rating Product (`budget-smartphone-x1`)
- **Features**: Rating average 2.3, high review count
- **Purpose**: Validates rating system with negative feedback

### 4. Partial Flags (`premium-headphones-nc50`)
- **Features**: `full: true, freeShipping: false`
- **Purpose**: Tests individual flag combinations

### 5. USD Currency (`mechanical-keyboard-rgb`)
- **Features**: USD pricing, international seller
- **Purpose**: Validates multi-currency support

## Error Handling

The schema provides detailed error messages for common validation failures:

- **Invalid ID**: "ID must contain only lowercase letters, numbers, underscores, and hyphens"
- **Price Issues**: "Price must have at most 2 decimal places"
- **Rating Precision**: "Rating average must be in 0.1 steps"
- **Image Protocol**: "Image URL must use HTTPS"
- **Required Fields**: Specific messages for missing required data

## Usage in Code

```typescript
import { ProductResponseSchema, type ProductResponse } from '@/lib/validators'

// Validate API response
const result = ProductResponseSchema.safeParse(apiData)
if (!result.success) {
  console.error('Validation failed:', result.error.errors)
}

// Type-safe product handling
const product: ProductResponse = validatedData
```

This schema ensures data integrity while providing flexible configuration options for different product types and business requirements.
