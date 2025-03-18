import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { env } from "../utils/environment";

// Test data interfaces
interface NavigationTestData {
  name: string;
  method: string;
  url: string;
}

interface FormData {
  email: string;
  password: string;
  name?: string;
  option?: string;
  rememberMe?: boolean;
}

// Test data
const navigationPages: NavigationTestData[] = [
  {
    name: "Form Layouts",
    method: "formLayoutsPage",
    url: `${env.baseUrl}/pages/forms/layouts`,
  },
  {
    name: "Datepicker",
    method: "datePickerPage",
    url: `${env.baseUrl}/pages/forms/datepicker`,
  },
  {
    name: "Smart Table",
    method: "smartTablePage",
    url: `${env.baseUrl}/pages/tables/smart-table`,
  },
  {
    name: "Tooltip",
    method: "tooltipPage",
    url: `${env.baseUrl}/pages/modal-overlays/tooltip`,
  },
  {
    name: "Dialog",
    method: "dialogPage",
    url: `${env.baseUrl}/pages/modal-overlays/dialog`,
  },
];

const testForms: FormData[] = [
  {
    email: env.testUser.email, // Using email from .env
    password: env.testUser.password, // Using password from .env
    option: "Option 2",
  },
  {
    email: "johnsmith@email.com",
    password: "",
    name: "John Smith",
    rememberMe: true,
  },
];

test.describe("Navigation and Form Tests", () => {
  let pm: PageManager;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    await pm.navigateTo().navigateToHome();
  });

  test.describe("Navigation Tests", () => {
    for (const page of navigationPages) {
      test(`should navigate to ${page.name} page`, async () => {
        await pm.navigateTo()[page.method]();
        await expect(pm.navigateTo().page).toHaveURL(page.url);
      });
    }
  });

  test.describe("Form Submission Tests", () => {
    test("should submit grid form with credentials", async () => {
      await pm.navigateTo().formLayoutsPage();

      await pm
        .onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectOption({
          email: testForms[0].email,
          password: testForms[0].password,
          option: testForms[0].option,
        });
    });

    test("should submit inline form with user details", async () => {
      await pm.navigateTo().formLayoutsPage();

      await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox({
        name: testForms[1].name,
        email: testForms[1].email,
        rememberMe: testForms[1].rememberMe,
      });
    });
  });

  test.describe("Datepicker Tests", () => {
    test("should select date from datepicker", async () => {
      await pm.navigateTo().datePickerPage();
      await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5);
    });

    test("should select date range from datepicker", async () => {
      await pm.navigateTo().datePickerPage();
      await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(2, 5);
    });
  });
});
