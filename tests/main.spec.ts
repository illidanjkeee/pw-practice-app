import { test, expect } from '@playwright/test';

test.describe('Main page', () => {

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('link', { name: 'Forms' }).click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({ page }) => {
  page.locator('#inputEmail1').click();
  page.locator('input');
  page.locator('.shape-rectangle')
  page.locator('[placeholder=text]')
  page.locator('[class=input-full-width size-medium status-basic shape-rectangle nb-transition]')
  });

test('User facing locator', async ({ page }) => {

});

});