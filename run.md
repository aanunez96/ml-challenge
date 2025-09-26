# Runbook - ML Challenge Project

This runbook provides step-by-step instructions for running and testing the project locally.

## Prerequisites Checklist

- [ ] Node.js 18 or higher installed
- [ ] pnpm or npm package manager available
- [ ] Git repository cloned
- [ ] Terminal/Command prompt access

## Local Development Flow

### Step 1: Initial Setup (~2-3 minutes)

```bash
# Navigate to project directory
cd ml-challenge

# Install dependencies
pnpm install
# OR: npm install

# Verify installation
node --version  # Should show 18+
pnpm --version  # Should show package manager version
```

### Step 2: Start Development Server (~30 seconds)

```bash
# Start the Next.js development server
pnpm dev
# OR: npm run dev

# Expected output:
# ▲ Next.js 15.5.4
# - Local: http://localhost:3000
# - ready in 2.3s
```

**Verification:**
- [ ] Server starts without errors
- [ ] Browser opens to `http://localhost:3000`
- [ ] Home page loads with product listings

### Step 3: API Smoke Test (~1 minute)

```bash
# Test API endpoint (in new terminal)
curl http://localhost:3000/api/products/premium-laptop-mx2024

# Expected: JSON response with product details
# Status: 200 OK
```

**Manual verification:**
- [ ] Visit `http://localhost:3000/api/products/premium-laptop-mx2024`
- [ ] JSON response displays in browser
- [ ] Product data includes title, price, seller, stock

### Step 4: Navigate Product Detail Page (~30 seconds)

**Manual verification:**
- [ ] Visit `http://localhost:3000/product/premium-laptop-mx2024`
- [ ] Page loads with product title and image
- [ ] Price displays in correct format
- [ ] Seller information visible
- [ ] Payment methods list appears
- [ ] Stock status shows
- [ ] Rating displays with count

## Testing Sequence

### Step 1: Unit Tests (~15-30 seconds)

```bash
# Run unit tests in watch mode
pnpm test

# Expected output:
# ✓ tests/unit/validators.test.ts (13 tests)
# ✓ tests/unit/api-routes.test.ts (20 tests)
# ✓ tests/unit/api-client.test.ts (10 tests)
# ...
# Test Files: 11 passed (11)
# Tests: 107 passed (107)
```

**Verification:**
- [ ] All test files pass
- [ ] No failing tests
- [ ] No syntax errors

### Step 2: Coverage Report (~45-60 seconds)

```bash
# Run coverage with threshold enforcement
pnpm coverage

# Expected output:
# % Coverage report from v8
# All files | 96.68 | 90.32 | 100 | 96.68 |
# ✓ Coverage thresholds met (≥80% for all metrics)
```

**Verification:**
- [ ] Coverage ≥80% for statements, branches, functions, lines
- [ ] No coverage threshold failures
- [ ] HTML report generated in `coverage/` directory

### Step 3: Development Server for E2E (~keep running)

```bash
# In separate terminal, ensure dev server is running
pnpm dev

# Keep this terminal open for E2E tests
```

### Step 4: E2E Tests (~30-45 seconds)

```bash
# One-time: Install Playwright browsers (if not done)
npx playwright install --with-deps

# Run E2E tests
pnpm test:e2e

# Expected output:
# Running 12 tests using 4 workers
# 12 passed (46.4s)
```

**Verification:**
- [ ] All E2E tests pass
- [ ] No browser automation errors
- [ ] Test report available: `npx playwright show-report`

## Troubleshooting

### Port 3000 Already in Use

```bash
# Find process using port 3000
netstat -ano | findstr :3000    # Windows
lsof -ti:3000                   # macOS/Linux

# Kill process or use different port
pnpm dev -- --port 3001
```

### Playwright Browser Installation Issues

```bash
# Clear Playwright cache and reinstall
npx playwright install --force --with-deps

# For specific browser only
npx playwright install chromium --with-deps
```

### Test Coverage Below Threshold

```bash
# View detailed coverage report
pnpm coverage
# Open coverage/index.html in browser to see uncovered lines

# Run tests with coverage in watch mode
pnpm vitest --coverage --watch
```

### Cache Reset (if strange behavior)

```bash
# Clear Next.js build cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules
pnpm install

# Clear test cache
rm -rf coverage
```

### Development Server Not Loading

```bash
# Check if port is available
netstat -an | find "3000"

# Try alternative commands
npm run dev
# or
npx next dev

# Check for Node.js version compatibility
node --version  # Must be 18+
```

## Time Estimates

| Task | Estimated Time |
|------|----------------|
| Initial setup | 2-3 minutes |
| Start dev server | 30 seconds |
| API smoke test | 1 minute |
| Unit tests | 15-30 seconds |
| Coverage report | 45-60 seconds |
| E2E tests | 30-45 seconds |
| Playwright setup (one-time) | 2-5 minutes |

**Total setup time (first run):** ~8-12 minutes
**Regular testing cycle:** ~3-5 minutes

## Success Criteria

✅ **Development Ready:**
- [ ] Dev server running on port 3000
- [ ] API endpoints responding correctly
- [ ] Product detail pages loading
- [ ] No console errors

✅ **Testing Complete:**
- [ ] All unit tests passing (107 tests)
- [ ] Coverage ≥80% across all metrics
- [ ] All E2E tests passing (12 tests)
- [ ] No test failures or timeouts

✅ **Quality Assured:**
- [ ] TypeScript compiling without errors
- [ ] ESLint passing without warnings
- [ ] Accessibility features working (keyboard nav, screen readers)
- [ ] Responsive design working on mobile/desktop

## Next Steps After Setup

1. **Explore the codebase**: Start with `app/page.tsx` and `app/products/[id]/page.tsx`
2. **Check API contracts**: Review `docs/api.http` for endpoint examples
3. **Review test coverage**: Open `coverage/index.html` for detailed analysis
4. **Test accessibility**: Use screen reader or keyboard-only navigation
5. **Modify and test**: Make changes and verify tests still pass
