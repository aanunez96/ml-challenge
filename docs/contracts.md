# Product Data Contracts Documentation

## Overview

This document defines the data model and validation rules for the Product API in our Next.js application. The schema ensures data consistency, type safety, and proper validation across all product-related operations.

## ProductResponse Schema

### Core Fields

| Field | Type | Validation | Description |
|-------|------|------------|-------------|
| `id` | string | 6-40 chars, [a-z0-9_-] only | Unique product identifier |
| `title` | string | 1-160 chars | Product display name |
| `description` | string | 1-5000 chars | Detailed product description |
| `images` | string[] | 1-10 HTTPS URLs | Product images array |
| `stock` | number | Integer ≥ 0 | Available inventory count |

### Price Object

```typescript
{
  amount: number    // Positive, max 2 decimals
  currency: 'MXN' | 'USD'
}
```

### Rating Object

```typescript
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