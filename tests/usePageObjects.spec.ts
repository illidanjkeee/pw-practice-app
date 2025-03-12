import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';

let navigationPage: NavigationPage;

test.beforeEach(async ({ page }) => {
  navigationPage = new NavigationPage(page);
  await navigationPage.navigateToHome();
});

test('Navigate to form layouts page', async () => {
  await navigationPage.formLayoutsPage();
  await expect(navigationPage.page).toHaveURL("http://localhost:4200/pages/forms/layouts");
});