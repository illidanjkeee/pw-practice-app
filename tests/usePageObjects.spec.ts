import { test } from "../fixtures/baseFixture";
import { navigationPages, testForms } from "../testData/navigationData";

test.describe("Navigation and Form Tests", () => {
  test.beforeEach(async ({ navigationPage }) => {
    await navigationPage.navigateToHome();
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
    test("should submit grid form with credentials", async ({
      navigationPage,
      formLayoutsPage,
    }) => {
      await navigationPage.formLayoutsPage();
      await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
        testForms[0],
      );
    });

    test("should submit inline form with user details", async ({
      navigationPage,
      formLayoutsPage,
    }) => {
      await navigationPage.formLayoutsPage();
      await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
        testForms[1],
      );
    });
  });

  test.describe("Datepicker Tests", () => {
    test("should select date from datepicker", async ({
      navigationPage,
      datepickerPage,
    }) => {
      await navigationPage.datePickerPage();
      await datepickerPage.selectCommonDatepickerDateFromToday(7);
    });

    test("should select date range from datepicker", async ({
      navigationPage,
      datepickerPage,
    }) => {
      await navigationPage.datePickerPage();
      await datepickerPage.selectDatepickerWithRangeFromToday(3, 5);
    });
  });
});
