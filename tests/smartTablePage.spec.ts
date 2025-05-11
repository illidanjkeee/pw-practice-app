import { test, expect } from "../fixtures/baseFixture";
import { env } from "../utils/environment";

test.describe("Smart Table Page Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.smartTablePage();
  });

  test("Confirm deletion dialog", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step("Set up dialog handler", async () => {
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        dialog.accept();
      });
    });

    await test.step("Delete row and verify removal", async () => {
      const targetRow = page
        .getByRole("table")
        .locator("tr", { hasText: env.testEmails.deleteTarget });
      await targetRow.locator(".nb-trash").click();
      await expect(page.locator("table tr").first()).not.toHaveText(
        env.testEmails.deleteTarget,
      );
    });
  });

  test("Edit table row data", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step("Edit age in first page", async () => {
      const firstPageRow = page
        .locator("table")
        .locator("tr", { hasText: env.testEmails.editTarget })
        .first();

      await test.step("Click edit button", async () => {
        await firstPageRow.locator(".nb-edit").click();
      });

      await test.step("Update age value", async () => {
        const editor = page.locator("input-editor").getByPlaceholder("Age");
        await editor.clear();
        await editor.fill("35");
      });

      await test.step("Confirm edit", async () => {
        await page.locator(".nb-checkmark").click();
      });
    });

    await test.step("Navigate to page 2", async () => {
      await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
    });

    await test.step("Edit email on second page", async () => {
      const secondPageRow = page
        .getByRole("row", { name: "11" })
        .filter({ has: page.locator("td").nth(1).getByText("11") });

      await test.step("Click edit button", async () => {
        await secondPageRow.locator(".nb-edit").click();
      });

      await test.step("Update email value", async () => {
        const editor = page.locator("input-editor").getByPlaceholder("E-mail");
        await editor.clear();
        await editor.fill(env.testUser.email);
      });

      await test.step("Confirm edit", async () => {
        await page.locator(".nb-checkmark").click();
      });
    });

    await test.step("Verify edit was successful", async () => {
      const secondPageRow = page
        .getByRole("row", { name: "11" })
        .filter({ has: page.locator("td").nth(1).getByText("11") });
      await expect(secondPageRow.locator("td").nth(5)).toHaveText(
        env.testUser.email,
      );
    });
  });

  test("Table filtering by age", async ({ navigationPage }) => {
    const page = navigationPage.page;
    const ages = env.testAgeFilters;

    for (const age of ages) {
      await test.step(`Filter table by age ${age}`, async () => {
        await test.step("Clear and fill age filter", async () => {
          const ageFilter = page
            .locator("input-filter")
            .getByPlaceholder("Age");
          await ageFilter.clear();
          await ageFilter.fill(age);
          await page.waitForTimeout(500); // Wait for filter to apply
        });
      });

      await test.step(`Verify results for age ${age}`, async () => {
        const rows = page.locator("tbody tr");

        if (age === "200") {
          await expect(page.getByRole("table")).toContainText("No data found");
        } else {
          // Check all visible rows match the filter
          const allRows = await rows.all();
          for (const row of allRows) {
            const rowAge = row.locator("td").last();
            await expect(rowAge).toHaveText(age);
          }
        }
      });
    }
  });
});
