import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { BASE_URL, ROUTES } from '../config/urls';

let navigationPage: NavigationPage;

test.beforeEach(async ({ page }) => {
  navigationPage = new NavigationPage(page);
  await navigationPage.navigateToHome();
});