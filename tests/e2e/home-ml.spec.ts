import { expect, Page, test } from '@playwright/test'

// Test constants
const TEST_DATA = {
  VIEWPORT_MOBILE: { width: 375, height: 667 },
  VIEWPORT_DESKTOP: { width: 1280, height: 800 },
  TIMEOUTS: {
    DEFAULT: 5000,
    LOADING: 10000,
  },
} as const

// Page Object Model - Home Page (ML-style)
class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async waitForLoad() {
    // Wait for product grid to load
    await this.page.waitForSelector('[data-testid="product-card"]', {
      timeout: TEST_DATA.TIMEOUTS.LOADING,
    })
  }

  async assertHeaderElements() {
    // Search bar in header
    await expect(this.page.getByTestId('search-input')).toBeVisible()
  }

  async assertHeroSection() {
    // Hero carousel section
    const heroSection = this.page.locator('.bg-blue-600')
    await expect(heroSection).toBeVisible()

    // Hero text
    await expect(this.page.getByText('LOS FAVORITOS')).toBeVisible()
    await expect(this.page.getByText('DEL SÚPER EN LA CASA')).toBeVisible()

    // Delivery badge
    await expect(this.page.getByText('TU PEDIDO LLEGA MAÑANA')).toBeVisible()
  }

  async assertProductSections() {
    // Should have product cards
    const productCards = this.page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()

    // Should have section titles
    await expect(this.page.getByText('Lo quieres')).toBeVisible()
    await expect(this.page.getByText('Porque te interesa')).toBeVisible()
    await expect(this.page.getByText('Recomendaciones para ti')).toBeVisible()

    const cardCount = await productCards.count()
    expect(cardCount).toBeGreaterThan(0)
    return cardCount
  }

  async assertProductCard(cardIndex: number = 0) {
    const card = this.page.locator('[data-testid="product-card"]').nth(cardIndex)

    // Product title
    await expect(card.locator('[data-testid="product-title"]')).toBeVisible()

    // Product price
    await expect(card.locator('[data-testid="product-price"]')).toBeVisible()

    // Product rating
    await expect(card.locator('[data-testid="product-rating"]')).toBeVisible()
  }

  async clickProductCard(cardIndex: number = 0) {
    const card = this.page.locator('[data-testid="product-card"]').nth(cardIndex)
    await card.click()
    // Wait for navigation to complete
    await this.page.waitForURL(/\/product\/[a-z0-9_-]+/, { timeout: 10000 })
  }

  async assertInformationSections() {
    // Project Overview section
    await expect(this.page.getByText('Project Overview')).toBeVisible()

    // About the Developer section
    await expect(this.page.getByText('About the Developer')).toBeVisible()
  }
}

test.describe('Home Page - ML Style Homepage', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
  })

  test.describe('Desktop Layout', () => {
    test.use({ viewport: TEST_DATA.VIEWPORT_DESKTOP })

    test('should display all main homepage sections', async ({ page: _page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Header with search
      await homePage.assertHeaderElements()

      // Hero carousel section
      await homePage.assertHeroSection()

      // Product sections
      await homePage.assertProductSections()

      // Information sections
      await homePage.assertInformationSections()
    })

    test('should have working product cards', async ({ page: _page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Assert at least one product card is working
      await homePage.assertProductCard(0)
    })

    test('should navigate to product detail on card click', async ({ page: _page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Click first product card and verify navigation
      await homePage.clickProductCard(0)

      // Should navigate to product detail page (URL check is in clickProductCard)
    })
  })

  test.describe('Mobile Layout', () => {
    test.use({ viewport: TEST_DATA.VIEWPORT_MOBILE })

    test('should show mobile-optimized layout', async ({ page: _page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Header should still be visible
      await homePage.assertHeaderElements()

      // Hero section should be responsive
      await homePage.assertHeroSection()

      // Products should be in responsive grid
      const cardCount = await homePage.assertProductSections()
      expect(cardCount).toBeGreaterThan(0)
    })

    test('should have touch-friendly product cards', async ({ page: _page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Verify product cards work on mobile
      await homePage.assertProductCard(0)
    })
  })

  test.describe('Content Sections', () => {
    test('should display project information', async ({ page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Should show information sections
      await homePage.assertInformationSections()

      // Should contain key project information
      await expect(page.getByText('Next.js 15 App Router')).toBeVisible()
    })

    test('should display developer information', async ({ page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Should show developer information
      await expect(page.getByText('About the Developer')).toBeVisible()

      // Should contain professional content
      await expect(page.getByText('Senior Frontend Engineer')).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper landmarks and headings', async ({ page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Should have main landmark
      await expect(page.locator('main')).toBeVisible()

      // Should have proper heading structure
      const headingCount = await page.locator('h1, h2, h3').count()
      expect(headingCount).toBeGreaterThan(0)

      // Hero should have heading elements
      await expect(page.locator('h1, h2').filter({ hasText: 'LOS FAVORITOS' })).toBeVisible()
    })

    test('should have accessible product cards', async ({ page }) => {
      await homePage.goto()
      await homePage.waitForLoad()

      // Product cards should be proper links
      const productCards = page.locator('[data-testid="product-card"]')
      await expect(productCards.first()).toHaveAttribute('href')

      // Images should have alt text
      const firstCardImage = productCards.first().locator('img')
      await expect(firstCardImage).toHaveAttribute('alt')
    })
  })

  test.describe('Responsive Design', () => {
    test('should adapt grid layout across screen sizes', async ({ page }) => {
      // Test desktop
      await page.setViewportSize(TEST_DATA.VIEWPORT_DESKTOP)
      await homePage.goto()
      await homePage.waitForLoad()

      let cardCount = await homePage.assertProductSections()
      expect(cardCount).toBeGreaterThan(0)

      // Test mobile
      await page.setViewportSize(TEST_DATA.VIEWPORT_MOBILE)
      await page.reload()
      await homePage.waitForLoad()

      cardCount = await homePage.assertProductSections()
      expect(cardCount).toBeGreaterThan(0)
    })
  })
})
