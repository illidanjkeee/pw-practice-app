import { test } from "../fixtures/baseFixture";
import { navigationPages, testForms } from "../testData/navigationData";

test.describe("Navigation and Form Tests", () => {
  test.beforeEach(async ({ pages }) => {
    await pages.navigationPage.navigateToHome();
  });

  test.describe("Navigation Tests", () => {
    navigationPages.forEach((navPage) => {
      test(`should navigate to ${navPage.name} page`, async ({ pages }) => {
        // Navigate to the specified page
        await pages.navigationPage.navigateTo(navPage.url);
      });
    });
  });

  test.describe("Form Submission Tests", () => {
    test("should submit grid form with credentials", async ({ pages }) => {
      await pages.navigationPage.formLayoutsPage();
      await pages.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
        testForms[0],
      );
    });

    test("should submit inline form with user details", async ({ pages }) => {
      await pages.navigationPage.formLayoutsPage();
      await pages.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
        testForms[1],
      );
    });
  });

  test.describe("Datepicker Tests", () => {
    test("should select date from datepicker", async ({ pages }) => {
      await pages.navigationPage.datePickerPage();
      await pages.datepickerPage.selectCommonDatepickerDateFromToday(7);
    });

    test("should select date range from datepicker", async ({ pages }) => {
      await pages.navigationPage.datePickerPage();
      await pages.datepickerPage.selectDatepickerWithRangeFromToday(3, 5);
    });
  });
});
