import { test, expect } from "../fixtures/baseFixture";
import { navigationPages, testForms } from "../testData/navigationData";

test.describe("Navigation and Form Tests", () => {
  test.beforeEach(async ({ pages }) => {
    await test.step("Navigate to homepage", async () => {
      await pages.navigationPage.navigateToHome();
    });
  });

  test.describe("Navigation Tests", () => {
    navigationPages.forEach((navPage) => {
      test(`should navigate to ${navPage.name} page`, async ({ pages }) => {
        await test.step(`Navigate to ${navPage.name} page`, async () => {
          await pages.navigationPage.navigateTo(navPage.url);

          await test.step(`Verify ${navPage.name} page loaded`, async () => {
            const currentUrl = pages.basePage.page.url();
            expect(currentUrl).toContain(navPage.url);
          });
        });
      });
    });
  });

  test.describe("Form Submission Tests", () => {
    test("should submit grid form with credentials", async ({ pages }) => {
      await test.step("Navigate to Form Layouts page", async () => {
        await pages.navigationPage.formLayoutsPage();
      });

      await test.step("Submit grid form with credentials", async () => {
        await pages.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
          testForms[0],
        );
      });

      await test.step("Verify form submission", async () => {
        // check if success message is shown or form is cleared
        const formElement = await pages.formLayoutsPage.getGridFormElement();
        await expect(formElement).toBeVisible();
      });
    });

    test("should submit inline form with user details", async ({ pages }) => {
      await test.step("Navigate to Form Layouts page", async () => {
        await pages.navigationPage.formLayoutsPage();
      });

      await test.step("Submit inline form with name, email and checkbox", async () => {
        await pages.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
          testForms[1],
        );
      });

      await test.step("Verify inline form submission", async () => {
        const inlineForm = await pages.formLayoutsPage.getInlineFormElement();
        await expect(inlineForm).toBeVisible();
      });
    });
  });

  test.describe("Datepicker Tests", () => {
    test.beforeEach(async ({ pages }) => {
      await test.step("Navigate to Datepicker page", async () => {
        await pages.navigationPage.datePickerPage();
      });
    });

    test("should select date from datepicker", async ({ pages }) => {
      const daysAhead = 7;

      await test.step(`Select date ${daysAhead} days from today`, async () => {
        await pages.datepickerPage.selectCommonDatepickerDateFromToday(
          daysAhead,
        );
      });
    });

    test("should select date range from datepicker", async ({ pages }) => {
      const startDaysAhead = 3;
      const endDaysAhead = 5;

      await test.step(`Select date range from ${startDaysAhead} to ${endDaysAhead} days ahead`, async () => {
        await pages.datepickerPage.selectDatepickerWithRangeFromToday(
          startDaysAhead,
          endDaysAhead,
        );
      });
    });
  });
});
