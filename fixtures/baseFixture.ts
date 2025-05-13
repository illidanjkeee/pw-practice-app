import { test as base } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";
import { DialogPage } from "../page-objects/dialogPage";
import { BasePage } from "../page-objects/basePage";
import { WindowPage } from "../page-objects/windowPage";
import { SmartTablePage } from "../page-objects/smartTablePage";

// Define fixture types
export type MainFixtures = {
  basePage: BasePage;
  navigationPage: NavigationPage;
  formLayoutsPage: FormLayoutsPage;
  datepickerPage: DatepickerPage;
  dialogPage: DialogPage;
  windowPage: WindowPage;
  smartTablePage: SmartTablePage;
};

// Create a test object with independent fixtures
export const test = base.extend<MainFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  formLayoutsPage: async ({ page }, use) => {
    await use(new FormLayoutsPage(page));
  },

  datepickerPage: async ({ page }, use) => {
    await use(new DatepickerPage(page));
  },

  dialogPage: async ({ page }, use) => {
    await use(new DialogPage(page));
  },

  windowPage: async ({ page }, use) => {
    await use(new WindowPage(page));
  },

  smartTablePage: async ({ page }, use) => {
    await use(new SmartTablePage(page));
  },
});

export { expect } from "@playwright/test";
