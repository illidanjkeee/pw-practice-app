import { test, expect } from "../fixtures/mainFixture";
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
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.navigateTo().navigateToHome();
  });

  test.describe("Navigation Tests", () => {
    for (const page of navigationPages) {
      test(`should navigate to ${page.name} page`, async ({ pageManager }) => {
        await pageManager.navigateTo()[page.method]();
        await expect(pageManager.navigateTo().page).toHaveURL(page.url);
      });
    }
  });

  test.describe("Form Submission Tests", () => {
    test("should submit grid form with credentials", async ({
      pageManager,
    }) => {
      await pageManager.navigateTo().formLayoutsPage();

      await pageManager
        .onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectOption({
          email: testForms[0].email,
          password: testForms[0].password,
          option: testForms[0].option,
        });
    });

    test("should submit inline form with user details", async ({
      pageManager,
    }) => {
      await pageManager.navigateTo().formLayoutsPage();

      await pageManager
        .onFormLayoutsPage()
        .submitInlineFormWithNameEmailAndCheckbox({
          name: testForms[1].name,
          email: testForms[1].email,
          rememberMe: testForms[1].rememberMe,
        });
    });
  });

  test.describe("Datepicker Tests", () => {
    test("should select date from datepicker", async ({ pageManager }) => {
      await pageManager.navigateTo().datePickerPage();
      await pageManager
        .onDatepickerPage()
        .selectCommonDatepickerDateFromToday(7);
    });

    test("should select date range from datepicker", async ({
      pageManager,
    }) => {
      await pageManager.navigateTo().datePickerPage();
      await pageManager
        .onDatepickerPage()
        .selectDatepickerWithRangeFromToday(3, 5);
    });
  });
});
