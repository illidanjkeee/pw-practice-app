import { test, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

let navigationPage: NavigationPage;

test.beforeEach(async ({ page }) => {
  navigationPage = new NavigationPage(page);
  await navigationPage.navigateToHome();
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

// Parametrized test #2
test('parametrised methods', async ({ page }) => {
  const navigateTo = new NavigationPage(page);
  const onFormLayoutsPage = new FormLayoutsPage(page);

  await navigateTo.formLayoutsPage();
  // Using the actual radio button label text from the form
  await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    'test@email.com',
    'test1',
    'Option 2'
  );
  await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    'John Smith',
    'johnsmith@email.com',
    true
  );
});

