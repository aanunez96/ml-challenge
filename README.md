# ML Challenge - Product Detail Page

A modern Next.js e-commerce product detail page implementation featuring server-side rendering, comprehensive testing, and accessibility-first design.

## Project Overview

This project implements a production-ready Product Detail Page (PDP) using Next.js App Router with TypeScript and Tailwind CSS. It features:

- **Modern Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- **API Routes**: RESTful endpoints backed by JSON datasource with in-memory caching
- **Server Components**: RSC-first architecture with minimal client hydration
- **Comprehensive Testing**: Unit, API, and E2E tests with ≥80% coverage enforcement
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized images, lazy loading, and efficient rendering

## Stack & Key Decisions

- **Output Validation**: Zod schemas ensure type safety and runtime validation across API boundaries
- **Error Handling**: Consistent error envelope pattern with proper HTTP status codes and structured responses
- **Data Layer**: Single JSON datasource with intelligent in-memory caching for optimal performance
- **Architecture**: React Server Components with selective client islands for interactivity
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation, and screen reader optimization
- **Testing**: Vitest + Playwright with 80% coverage threshold enforcement in CI/CD pipeline

## Quickstart

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run unit tests
pnpm test

# Run test coverage (≥80% enforced)
pnpm coverage

# One-time: Install Playwright browsers for E2E tests
npx playwright install --with-deps

# Run E2E tests
pnpm test:e2e
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Architecture

```
ml-challenge/
├── app/                 # Next.js App Router
│   ├── api/products/    # API route handlers
│   ├── product/[id]/    # Product detail pages (RSC)
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/          # React components
│   └── Product/         # Product-related components
├── lib/                 # Shared utilities
│   ├── validators.ts    # Zod schemas
│   ├── repo.ts         # Data access layer
│   ├── errors.ts       # Custom error classes
│   └── api-client.ts   # Frontend API client
├── data/               # JSON datasource
│   └── products.json   # Product catalog
├── tests/              # Test suites
│   ├── unit/           # Unit & API tests
│   └── e2e/            # Playwright E2E tests
├── docs/               # Documentation
└── public/docs/        # Screenshots & assets
```

### Component Roles
- `app/`: Next.js App Router with API routes and RSC pages
- `components/`: Reusable React components organized by feature
- `lib/`: Business logic, validation, and data access abstractions
- `data/`: Static JSON datasource with product catalog
- `tests/`: Comprehensive test coverage (unit, integration, E2E)
- `docs/`: Technical documentation and API references

## Data Contracts

See [docs/contracts.md](docs/contracts.md) for detailed schema documentation including:
- Product response structure
- Validation rules and constraints
- API request/response examples
- Error response format

## API Endpoints

### GET /api/products/:id
Retrieve a single product by ID with full details.

```bash
curl http://localhost:3000/api/products/premium-laptop-mx2024
```

**Optional: GET /api/products**
List products with optional search and pagination.

```bash
curl "http://localhost:3000/api/products?q=laptop&page=1&limit=10"
```

For complete API documentation with examples, see:
- [docs/api.http](docs/api.http) - HTTP client examples
- [docs/openapi.json](docs/openapi.json) - OpenAPI specification

## Testing & Coverage

### Running Tests

```bash
# Unit tests (watch mode)
pnpm test

# Coverage report with thresholds
pnpm coverage

# E2E tests
pnpm test:e2e

# Visual E2E test runner
pnpm test:e2e:ui
```

### Coverage Requirements
- **Threshold**: ≥80% for lines, statements, functions, and branches
- **Enforcement**: Build fails if coverage drops below threshold
- **Configuration**: See `vitest.config.ts` for coverage settings
- **Reports**: HTML coverage reports generated in `coverage/` directory

### Test Structure
- **Unit Tests**: API routes, validators, error handling, repository layer
- **Integration Tests**: Full API request/response cycles
- **E2E Tests**: Complete user workflows including PDP navigation, error states, and accessibility

## Accessibility & Performance

### Accessibility Features
- Semantic HTML structure with proper heading hierarchy
- ARIA labels and live regions for dynamic content
- Keyboard navigation support for image gallery
- Screen reader optimized product information
- High contrast ratios and focus indicators
- Alt text for all product images

### Performance Optimizations
- Next.js Image component with responsive sizing
- Server-side rendering for fast initial page load
- Minimal client-side JavaScript bundle
- In-memory caching for API responses
- Optimized Tailwind CSS with unused styles purged

## Known Limitations

- **Data Source**: Static JSON file (production would use database)
- **Authentication**: No user authentication or session management
- **Cart Functionality**: Display-only, no add-to-cart implementation
- **Image Storage**: External URLs only (no local image optimization)
- **Search**: Basic string matching (production would use full-text search)

## Next Steps

- Implement user authentication and session management
- Add shopping cart functionality and checkout flow
- Integrate with payment processing and inventory systems
- Implement advanced search with filters and sorting
- Add product reviews and recommendation engine
- Set up monitoring, logging, and error tracking
- Configure CI/CD pipeline with automated deployments

## Screenshots & GIFs

To capture project screenshots and demos:

```bash
# Take screenshots of key pages
# Save as: public/docs/screenshot-home.png
# Save as: public/docs/screenshot-pdp.png

# Record PDP interaction demo
# Save as: public/docs/pdp-demo.gif
```

**Current Assets** (placeholders):
- [Home Page Screenshot](public/docs/screenshot-home.png)
- [Product Detail Page Screenshot](public/docs/screenshot-pdp.png)
- [PDP Demo GIF](public/docs/pdp-demo.gif)

## Contributing

1. Follow existing code style and conventions
2. Run tests and ensure coverage threshold is met
3. Update documentation for API or architecture changes
4. Test accessibility with screen reader and keyboard navigation

## License

This project is for evaluation purposes only.
