import { test, expect } from '@playwright/test';

test('Home page loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/get-on-your-apprenticeship/');
  await expect(page).toHaveTitle("Vite + React"); 
  await page.waitForSelector('h2');
  await expect(page.locator('h2')).toHaveText('Here is the list of all the students :');
});

test('Filtering students by house', async ({ page }) => {
  await page.goto('http://localhost:5173/get-on-your-apprenticeship/');
  await page.click('button:has-text("Gryffindor")');
  await page.waitForSelector('.student-card');

  const studentCards = await page.locator('.student-card');
  const count = await studentCards.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const studentCard = studentCards.nth(i);
    await expect(studentCard.locator('.house-logo')).toHaveAttribute('alt', 'Logo de la maison Gryffindor');
  }
});



test('Student card content is correct', async ({ page }) => {
  await page.goto('http://localhost:5173/get-on-your-apprenticeship/');
  await page.click('button:has-text("Gryffindor")');
  await page.waitForSelector('.student-card');
  const studentCard = page.locator('.student-card').first();
  await expect(studentCard.locator('h3')).toContainText('Name :');
  await expect(studentCard.locator('h4')).toContainText('Birth :');
  await expect(studentCard.locator('h4')).toContainText('surname :');
});

