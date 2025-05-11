import { test as base } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datepickerPage";
import { DialogPage } from "../page-objects/dialogPage";
import { BasePage } from "../page-objects/basePage";
import { WindowPage } from "../page-objects/windowPage";

// a class that will hold all page objects
export class Pages {
  readonly basePage: BasePage;
  readonly navigationPage: NavigationPage;
  readonly formLayoutsPage: FormLayoutsPage;
  readonly datepickerPage: DatepickerPage;
  readonly dialogPage: DialogPage;
  readonly windowPage: WindowPage;

  constructor(page) {
    this.basePage = new BasePage(page);
    this.navigationPage = new NavigationPage(page);
    this.formLayoutsPage = new FormLayoutsPage(page);
    this.datepickerPage = new DatepickerPage(page);
    this.dialogPage = new DialogPage(page);
    this.windowPage = new WindowPage(page);
  }
}

// Define fixture types
export type MainFixtures = {
  pages: Pages;
  // Keep individual fixtures for backward compatibility if needed
  basePage: BasePage;
  navigationPage: NavigationPage;
  formLayoutsPage: FormLayoutsPage;
  datepickerPage: DatepickerPage;
  dialogPage: DialogPage;
  windowPage: WindowPage;
};

// Create a test object with the new fixtures
export const test = base.extend<MainFixtures>({
  // Create a single fixture that contains all page objects
  pages: async ({ page }, use) => {
    const pages = new Pages(page);
    await use(pages);
  },

  basePage: async ({ pages }, use) => {
    await use(pages.basePage);
  },

  navigationPage: async ({ pages }, use) => {
    await use(pages.navigationPage);
  },

  formLayoutsPage: async ({ pages }, use) => {
    await use(pages.formLayoutsPage);
  },

  datepickerPage: async ({ pages }, use) => {
    await use(pages.datepickerPage);
  },

  dialogPage: async ({ pages }, use) => {
    await use(pages.dialogPage);
  },

  windowPage: async ({ pages }, use) => {
    await use(pages.windowPage);
  },
});

export { expect } from "@playwright/test";
