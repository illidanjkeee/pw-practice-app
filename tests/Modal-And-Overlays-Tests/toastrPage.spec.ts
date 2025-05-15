import { test, expect } from "../../fixtures/baseFixture";

test.describe("Modal & Overlays, Toastr Page Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.toastrPage();
  });

  test("Checkboxes", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step('Uncheck "Hide on click" checkbox', async () => {
      await page
        .getByRole("checkbox", { name: "Hide on click" })
        .uncheck({ force: true });
    });

    await test.step('Check "Prevent arising of duplicate toast" checkbox', async () => {
      await page
        .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
        .check({ force: true });
    });

    await test.step("Check all checkboxes", async () => {
      const allCheckboxes = page.getByRole("checkbox");
      for (const checkbox of await allCheckboxes.all()) {
        await checkbox.check({ force: true });
        await expect(checkbox).toBeChecked();
      }
    });
  });
});
