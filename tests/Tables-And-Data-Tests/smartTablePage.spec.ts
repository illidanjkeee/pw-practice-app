import { expect, test } from "../../fixtures/baseFixture";
import { env } from "../../utils/environment";

test.describe("Tables & Data, Smart Table Page Tests", () => {
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.smartTablePage();
  });
  test("Confirm deletion dialog", async ({ navigationPage, smartTablePage }) => {
    const page = navigationPage.page;

    await test.step("Set up dialog handler", async () => {
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        dialog.accept();
      });
    });

    await test.step("Delete row and verify removal", async () => {
      await smartTablePage.deleteRow(env.testEmails.deleteTarget);
      await smartTablePage.verifyRowDeleted(env.testEmails.deleteTarget);
    });
  });
  test("Edit table row data", async ({ smartTablePage }) => {
    await test.step("Edit age in first page", async () => {
      await smartTablePage.editAge(env.testEmails.editTarget, "35");
    });

    await test.step("Navigate to page 2", async () => {
      await smartTablePage.navigateToPage("2");
    });

    await test.step("Edit email on second page", async () => {
      await smartTablePage.editEmailById("11", env.testUser.email);
    });

    await test.step("Verify edit was successful", async () => {
      await smartTablePage.verifyEmailById("11", env.testUser.email);
    });
  });
  test("Table filtering by age", async ({ smartTablePage }) => {
    const ages = env.testAgeFilters;

    for (const age of ages) {
      await test.step(`Filter table by age ${age}`, async () => {
        await smartTablePage.filterByAge(age);
      });

      await test.step(`Verify results for age ${age}`, async () => {
        await smartTablePage.verifyAgeFilter(age);
      });
    }
  });
});
