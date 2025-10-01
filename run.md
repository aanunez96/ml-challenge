# Setup & Development Guide

Step-by-step instructions for local development and testing.

## Prerequisites

- **Node.js**: 18 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Environment**: Terminal/command prompt access

## Quick Setup

### 1. Initial Installation (2-3 minutes)

```bash
# Clone and navigate
git clone <repository>
cd ml-challenge

# Install dependencies
pnpm install

# Environment setup
cp .env.example .env.local

# Verify installation
node --version  # Should be 18+
pnpm --version
```

### 2. Start Development Server (30 seconds)

```bash
# Start Next.js development server
pnpm dev

# Expected output:
# ▲ Next.js 15.5.4
# - Local: http://localhost:3000
# - ready in 2.3s
```

**✅ Verification:**

- Server starts without errors
- Visit `http://localhost:3000`
- Homepage loads with ML-style layout and product cards
- Navigate to product detail: `http://localhost:3000/product/premium-laptop-mx2024`

### 3. API Verification (1 minute)

```bash
# Test API endpoint
curl http://localhost:3000/api/products/premium-laptop-mx2024

# Expected: JSON response with product details (200 OK)
```

## Testing Workflow

### Unit Tests (15-30 seconds)

```bash
# Run all unit tests
pnpm test

# Expected output:
# ✓ tests/unit/validators.test.ts (13 tests)
# ✓ tests/unit/api-routes.test.ts (20 tests)
# ✓ tests/unit/api-client.test.ts (10 tests)
# Tests: 105 passed (105)
```

### Coverage Report (45-60 seconds)

```bash
# Generate coverage report with threshold enforcement
pnpm coverage

# Expected output:
# All files | 96.77 | 90.32 | 100 | 96.77 |
# ✓ Coverage thresholds met (≥80% required)
```

Open `coverage/index.html` for detailed coverage analysis.

### End-to-End Tests (30-45 seconds)

```bash
# One-time: Install Playwright browsers
npx playwright install --with-deps

# Ensure dev server is running in another terminal
pnpm dev

# Run E2E tests
pnpm test:e2e

# Expected output:
# Running 22 tests using 4 workers
# 22 passed (1.2m)
```

View test report: `npx playwright show-report`

## Troubleshooting

### Port 3000 Already in Use

```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -ti:3000

# Use alternative port
pnpm dev -- --port 3001
```

### Playwright Issues

```bash
# Force reinstall browsers
npx playwright install --force --with-deps

# Install specific browser only
npx playwright install chromium --with-deps
```

### Cache Reset

```bash
# Clear Next.js cache
rm -rf .next

# Clear dependencies and reinstall
rm -rf node_modules
pnpm install

# Clear test cache
rm -rf coverage test-results
```

### Test Coverage Below Threshold

```bash
# Run coverage in watch mode
pnpm vitest --coverage --watch

# Open detailed report
open coverage/index.html
```

## Development Scripts

| Command         | Purpose            | Time   |
| --------------- | ------------------ | ------ |
| `pnpm dev`      | Development server | 30s    |
| `pnpm build`    | Production build   | 1-2m   |
| `pnpm test`     | Unit tests (watch) | 15-30s |
| `pnpm coverage` | Coverage report    | 45-60s |
| `pnpm test:e2e` | E2E tests          | 30-45s |
| `pnpm lint`     | ESLint check       | 10-15s |
| `pnpm format`   | Code formatting    | 5-10s  |

## Success Criteria

### ✅ Development Ready

- [ ] Dev server running on port 3000
- [ ] Homepage loads with ML design and product sections
- [ ] Product detail pages accessible and functional
- [ ] API endpoints responding correctly
- [ ] No console errors or TypeScript issues

### ✅ Testing Complete

- [ ] All 105 unit tests passing
- [ ] Coverage ≥80% across all metrics (statements, branches, functions, lines)
- [ ] All 22 E2E tests passing
- [ ] No test failures or timeouts

### ✅ Quality Assurance

- [ ] TypeScript compiling without errors
- [ ] ESLint passing without warnings
- [ ] Responsive design working (mobile/desktop)
- [ ] Keyboard navigation functional
- [ ] Screen reader accessibility working

## Time Estimates

| Phase              | First Run       | Subsequent Runs |
| ------------------ | --------------- | --------------- |
| Initial setup      | 2-3 minutes     | -               |
| Playwright install | 2-5 minutes     | -               |
| Start dev server   | 30 seconds      | 30 seconds      |
| Run unit tests     | 30 seconds      | 15 seconds      |
| Run E2E tests      | 45 seconds      | 30 seconds      |
| **Total**          | **6-9 minutes** | **2-3 minutes** |

## Next Steps

1. **Explore Codebase**: Start with `src/app/page.tsx` (homepage) and `src/app/product/[id]/page.tsx` (PDP)
2. **Review Architecture**: Check [decisions.md](./decisions.md) for technical decisions
3. **Test Coverage**: Run `pnpm coverage` to verify all tests pass and coverage is above 80%
4. **Accessibility**: Test with screen reader or keyboard-only navigation
5. **Customize**: Modify content in `content/` directory and verify tests pass
