# ML Challenge - E-commerce Platform

A modern Next.js e-commerce platform inspired by Mercado Libre, featuring server-side rendering, comprehensive testing, and production-ready architecture.

## Overview

This project demonstrates a full-stack e-commerce implementation with authentic Mercado Libre design patterns, including:

- **ML-Style Homepage**: Hero carousel, horizontal product sections, and authentic branding
- **Product Detail Pages**: Complete product information with gallery, pricing, and seller details
- **RESTful API**: JSON-backed endpoints with validation and error handling
- **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Comprehensive Testing**: 105+ unit tests and E2E coverage with ≥80% threshold

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup & Development

```bash
# Clone and install
git clone <repository>
cd ml-challenge
pnpm install

# Environment setup
cp .env.example .env.local

# Start development
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

For detailed setup instructions and troubleshooting, see [run.md](./run.md).

## Architecture

### Tech Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom ML theme system
- **Data**: JSON datasource with in-memory caching
- **Validation**: Zod schemas for type safety
- **Testing**: Vitest (unit) + Playwright (E2E)

### Project Structure

```
ml-challenge/
├── src/app/             # Next.js App Router pages & API
├── components/          # React components (Layout, Product, PLP)
├── lib/                 # Utilities, validation, data access
├── content/             # Markdown content for homepage
├── data/                # JSON product datasource
├── tests/               # Unit and E2E test suites
└── styles/              # Global styles and theme
```

## Features

### Homepage (ML-Inspired)

- Authentic Mercado Libre header with search and navigation
- Hero carousel with promotional content
- Horizontal product sections with dynamic titles
- Project overview and developer information

### Product Detail Pages

- Responsive image gallery with thumbnail navigation
- Complete product information (pricing, rating, stock)
- Seller details and payment methods
- Accessibility-first design with keyboard navigation

### API Endpoints

- `GET /api/products` - List products with optional search/pagination
- `GET /api/products/:id` - Individual product details
- Comprehensive error handling and validation

## Testing

### Running Tests

```bash
# Unit tests with coverage
pnpm test
pnpm coverage

# E2E tests (requires running dev server)
pnpm test:e2e
```

### Coverage Requirements

- **Threshold**: ≥80% across all metrics
- **Current**: 96.77% overall coverage
- **Test Count**: 105 unit tests + 22 E2E tests

## Development

### Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm test         # Unit tests (watch mode)
pnpm coverage     # Coverage report
pnpm test:e2e     # E2E tests
pnpm lint         # ESLint
pnpm format       # Prettier formatting
```

### Environment Variables

See [.env.example](./.env.example) for required configuration.

## Documentation

- **[run.md](./run.md)** - Detailed setup and troubleshooting guide
- **[decisions.md](./decisions.md)** - Technical decisions and architecture rationale

## Key Technical Decisions

For detailed rationale and trade-offs, see [decisions.md](./decisions.md). Key highlights:

- **Server Components First**: RSC architecture for optimal performance
- **Zod Validation**: Runtime type safety with structured error handling
- **In-Memory Caching**: JSON datasource with intelligent caching layer
- **Accessibility**: WCAG compliance with semantic HTML and ARIA support
- **ML Design System**: Custom Tailwind theme matching Mercado Libre aesthetics

## Performance & Quality

- **Bundle Optimization**: Minimal client JavaScript, optimized images
- **Accessibility**: Screen reader support, keyboard navigation
- **Code Quality**: TypeScript strict mode, ESLint, Prettier
- **Testing**: Comprehensive coverage with CI/CD quality gates

## License

This project is for evaluation purposes only.
