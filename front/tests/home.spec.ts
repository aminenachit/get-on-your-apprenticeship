import { test, expect } from '@playwright/test';

test('Home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/get-on-your-apprenticeship/');

  await expect(page).toHaveTitle('Vite + React');

  await expect(page.locator('h2')).toHaveText('Here is the list of all the students :');
});
