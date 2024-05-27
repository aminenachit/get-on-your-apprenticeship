import { test, expect } from '@playwright/test';

test('Dashboard loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/get-on-your-apprenticeship/dashboard');
  await expect(page.locator('h1')).toHaveText('Dashboard');
  await expect(page.locator('h2')).toHaveText('House Distribution');
  await expect(page.locator('h2')).toHaveText('Age Distribution');
});