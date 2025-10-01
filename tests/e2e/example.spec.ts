import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // Check if the page loads
  await expect(page).toHaveTitle(/ML Challenge Store/)

  // Check for some basic content
  await expect(page.locator('main')).toBeVisible()
})
