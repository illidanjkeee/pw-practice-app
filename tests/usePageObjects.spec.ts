import { test } from "../fixtures/mainFixture";
import { navigationPages, testForms } from "../testData/navigationData";
import { navigateAndVerify } from "../helpers/navigationHelper";

test.describe("Navigation and Form Tests", () => {
  test.beforeEach(async ({ pageManager }) => {
    await test.step("Navigate to home page", async () => {
      await pageManager.navigateTo().navigateToHome();
    });
  });

  test.describe("Navigation Tests", () => {
    navigationPages.forEach((page) => {
      test(`should navigate to ${page.name} page`, async ({ pageManager }) => {
        await navigateAndVerify(pageManager, page);
      });
    });
  });

  test.describe("Form Submission Tests", () => {
    test("should submit grid form with credentials", async ({
      pageManager,
    }) => {
      await test.step("Navigate to Form Layouts page", async () => {
        await pageManager.navigateTo().formLayoutsPage();
      });
      await test.step("Submit grid form with credentials and select option", async () => {
        await pageManager
          .onFormLayoutsPage()
          .submitUsingTheGridFormWithCredentialsAndSelectOption(testForms[0]);
      });
    });

    test("should submit inline form with user details", async ({
      pageManager,
    }) => {
      await test.step("Navigate to Form Layouts page", async () => {
        await pageManager.navigateTo().formLayoutsPage();
      });
      await test.step("Submit inline form with name, email and checkbox", async () => {
        await pageManager
          .onFormLayoutsPage()
          .submitInlineFormWithNameEmailAndCheckbox(testForms[1]);
      });
    });
  });

  test.describe("Datepicker Tests", () => {
    test("should select date from datepicker", async ({ pageManager }) => {
      await test.step("Navigate to Datepicker page", async () => {
        await pageManager.navigateTo().datePickerPage();
      });
      await test.step("Select date 7 days from today", async () => {
        await pageManager
          .onDatepickerPage()
          .selectCommonDatepickerDateFromToday(7);
      });
    });

    test("should select date range from datepicker", async ({
      pageManager,
    }) => {
      await test.step("Navigate to Datepicker page", async () => {
        await pageManager.navigateTo().datePickerPage();
      });
      await test.step("Select date range from 3 to 5 days from today", async () => {
        await pageManager
          .onDatepickerPage()
          .selectDatepickerWithRangeFromToday(3, 5);
      });
    });
  });
});
