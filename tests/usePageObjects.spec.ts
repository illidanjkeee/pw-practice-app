import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { BASE_URL, ROUTES } from '../config/urls';

test.beforeEach(async ({ page }) => {
  const basePage = new NavigationPage(page);
  await basePage.navigateToHome();
});

test('Navigate to Form page', async ({ page }) => {
  const nagivateTo = new NavigationPage(page);
  await nagivateTo.formLayoutsPage();
//   expect(page.url()).toBe(`${BASE_URL}${ROUTES.FORM_LAYOUTS}`);
});
