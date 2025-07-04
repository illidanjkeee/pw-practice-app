import { test as base } from "@playwright/test";
import { BasePage } from "../page-objects/basePage";
import { DatepickerPage } from "../page-objects/datepickerPage";
import { DialogPage } from "../page-objects/dialogPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { HeaderPage } from "../page-objects/headerPage";
import { IoTDashboardPage } from "../page-objects/IoTDashboardPage";
import { NavigationPage } from "../page-objects/navigationPage";
import { SmartTablePage } from "../page-objects/smartTablePage";
import { WindowPage } from "../page-objects/windowPage";

// Define fixture types
export type MainFixtures = {
  basePage: BasePage;
  navigationPage: NavigationPage;
  headerPage: HeaderPage;
  formLayoutsPage: FormLayoutsPage;
  datepickerPage: DatepickerPage;
  dialogPage: DialogPage;
  windowPage: WindowPage;
  smartTablePage: SmartTablePage;
  IoTDashboardPage: IoTDashboardPage;
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

  IoTDashboardPage: async ({ page }, use) => {
    await use(new IoTDashboardPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
});

export { expect } from "@playwright/test";
