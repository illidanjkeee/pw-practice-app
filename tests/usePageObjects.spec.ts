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

test('Navigate to datepicker page', async () => {
  await navigationPage.datePickerPage();
  await expect(navigationPage.page).toHaveURL("http://localhost:4200/pages/forms/datepicker");
});

test('Navigate to smart table page', async () => {
  await navigationPage.smartTablePage();
  await expect(navigationPage.page).toHaveURL("http://localhost:4200/pages/tables/smart-table");
});

test('Navigate to tooltip page', async () => {
  await navigationPage.tooltipPage();
  await expect(navigationPage.page).toHaveURL("http://localhost:4200/pages/modal-overlays/tooltip");
});

// Parametrized test
const pages = [
  { name: 'Form Layouts', method: 'formLayoutsPage', url: 'http://localhost:4200/pages/forms/layouts' },
  { name: 'Datepicker', method: 'datePickerPage', url: 'http://localhost:4200/pages/forms/datepicker' },
  { name: 'Smart Table', method: 'smartTablePage', url: 'http://localhost:4200/pages/tables/smart-table' },
  { name: 'Tooltip', method: 'tooltipPage', url: 'http://localhost:4200/pages/modal-overlays/tooltip' },
  { name: 'Dialog', method: 'dialogPage', url: 'http://localhost:4200/pages/modal-overlays/dialog' },
];

for (const page of pages) {
  test(`Navigate to ${page.name} page using parametrized method`, async () => {
    await navigationPage[page.method]();
    await expect(navigationPage.page).toHaveURL(page.url);
  });
}
