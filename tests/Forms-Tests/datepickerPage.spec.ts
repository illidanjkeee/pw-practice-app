import { test } from "../../fixtures/baseFixture";

test.describe("Forms, Datepicker Page Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.datePickerPage();
  });

  test("should select date from datepicker", async ({ datepickerPage }) => {
    const daysAhead = 7;

    await test.step(`Select date ${daysAhead} days from today`, async () => {
      await datepickerPage.selectCommonDatepickerDateFromToday(daysAhead);
    });
  });

  test("should select date range from datepicker", async ({
    datepickerPage,
  }) => {
    const startDaysAhead = 3;
    const endDaysAhead = 5;

    await test.step(`Select date range from ${startDaysAhead} to ${endDaysAhead} days ahead`, async () => {
      await datepickerPage.selectDatepickerWithRangeFromToday(
        startDaysAhead,
        endDaysAhead,
      );
    });
  });
});
