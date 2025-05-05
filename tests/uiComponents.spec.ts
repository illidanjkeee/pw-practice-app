import { test, expect } from "../fixtures/baseFixture";
import { env } from "../utils/environment";
import { Page } from "@playwright/test";

test.describe("UI Component Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ pages }) => {
    await pages.basePage.navigateToHome();
  });

  test.describe("Form Layouts Page", () => {
    // Setup for form layout tests
    test.beforeEach(async ({ pages }) => {
      await pages.navigationPage.formLayoutsPage();
    });

    test("Input Fields", async ({ pages }) => {
      // Get the email input from the "Using the Grid" form
      const page = pages.navigationPage.page;
      const usingTheGridEmailInput = getFormElement(
        page,
        "Using the Grid",
        "textbox",
        "email",
      );

      // Test different input methods
      await usingTheGridEmailInput.fill(env.testUser.email);
      await usingTheGridEmailInput.clear();
      await usingTheGridEmailInput.pressSequentially(env.testUser.email);
    });

    test("Radio Buttons", async ({ pages }) => {
      const page = pages.navigationPage.page;
      const usingTheGridForm = page
        .locator("nb-card")
        .filter({ hasText: "Using the Grid" });
      const radioOption = usingTheGridForm.getByRole("radio", {
        name: "Option 1",
      });

      // Check radio button and verify state
      await radioOption.check({ force: true });
      await expect(radioOption).toBeChecked();
    });
  });

  test.describe("Toastr Page", () => {
    test.beforeEach(async ({ pages }) => {
      await pages.navigationPage.toastrPage();
    });
    test("Checkboxes", async ({ pages }) => {
      const page = pages.navigationPage.page;

      // Test individual checkbox interactions
      await page
        .getByRole("checkbox", { name: "Hide on click" })
        .uncheck({ force: true });
      await page
        .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
        .check({ force: true });

      // Test all checkboxes
      const allCheckboxes = page.getByRole("checkbox");
      for (const checkbox of await allCheckboxes.all()) {
        await checkbox.check({ force: true });
        await expect(checkbox).toBeChecked();
      }
    });
  });

  test.describe("Theme Selection", () => {
    test("Theme dropdown changes header color", async ({ pages }) => {
      const page = pages.navigationPage.page;
      // Define theme colors for verification
      const colorsPerTheme = [
        { theme: "Light", color: "rgb(255, 255, 255)" },
        { theme: "Dark", color: "rgb(34, 43, 69)" },
        { theme: "Cosmic", color: "rgb(50, 50, 89)" },
        { theme: "Corporate", color: "rgb(255, 255, 255)" },
      ];

      // Test each theme
      for (const { theme, color } of colorsPerTheme) {
        await selectTheme(page, theme);
        await verifyHeaderColor(page, color);
      }
    });

    test("Dropdown list content", async ({ pages }) => {
      const page = pages.navigationPage.page;
      const dropDownMenu = page.locator("ngx-header nb-select");
      await dropDownMenu.click();

      const optionList = page.locator("nb-option-list nb-option");
      await expect(optionList).toHaveText([
        "Light",
        "Dark",
        "Cosmic",
        "Corporate",
      ]);
    });
  });

  test.describe("Tooltips", () => {
    test.beforeEach(async ({ pages }) => {
      await pages.navigationPage.tooltipPage();
    });
    test("Tooltip shows on hover", async ({ pages }) => {
      const page = pages.navigationPage.page;

      // Hover over button and verify tooltip text
      const tooltipButton = page
        .locator("nb-card")
        .filter({ hasText: "Tooltip Placements" })
        .getByRole("button", { name: "Top" });

      await tooltipButton.hover();
      await expect(page.locator("nb-tooltip")).toHaveText("This is a tooltip");
    });
  });

  test.describe("Dialog Box", () => {
    test.beforeEach(async ({ pages }) => {
      await pages.navigationPage.smartTablePage();
    });
    test("Confirm deletion dialog", async ({ pages }) => {
      const page = pages.navigationPage.page;

      // Handle dialog when it appears
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        dialog.accept();
      });

      // Click delete and verify row is removed
      const targetRow = page
        .getByRole("table")
        .locator("tr", { hasText: env.testEmails.deleteTarget });
      await targetRow.locator(".nb-trash").click();
      await expect(page.locator("table tr").first()).not.toHaveText(
        env.testEmails.deleteTarget,
      );
    });
  });

  test.describe("Smart Table", () => {
    test.beforeEach(async ({ pages }) => {
      await pages.navigationPage.smartTablePage();
    });

    test("Edit table row data", async ({ pages }) => {
      const page = pages.navigationPage.page;

      // Edit age in first page
      const firstPageRow = page
        .locator("table")
        .locator("tr", { hasText: env.testEmails.editTarget })
        .first();
      await editTableCell(page, firstPageRow, "Age", "35");

      // Navigate to page 2
      await page.locator(".ng2-smart-pagination-nav").getByText("2").click();

      // Edit email on second page
      const secondPageRow = page
        .getByRole("row", { name: "11" })
        .filter({ has: page.locator("td").nth(1).getByText("11") });
      await editTableCell(page, secondPageRow, "E-mail", env.testUser.email);

      // Verify edit was successful
      await expect(secondPageRow.locator("td").nth(5)).toHaveText(
        env.testUser.email,
      );
    });

    test("Table filtering by age", async ({ pages }) => {
      const page = pages.navigationPage.page;
      const ages = env.testAgeFilters;

      for (const age of ages) {
        // Apply filter
        await filterTableByAge(page, age);

        // Verify results
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
      }
    });
  });
});

/**
 * Get an element from a specific form
 */
function getFormElement(
  page: Page,
  formName: string,
  role: string,
  name: string,
) {
  return page
    .locator("nb-card")
    .filter({ hasText: formName })
    .getByRole(role as any, { name });
}

/**
 * Select a theme from the dropdown
 */
async function selectTheme(page: Page, themeName: string): Promise<void> {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();
  await page
    .locator("nb-option-list nb-option")
    .filter({ hasText: themeName })
    .click();
}

/**
 * Verify the header background color
 */
async function verifyHeaderColor(
  page: Page,
  expectedColor: string,
): Promise<void> {
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", expectedColor);
}

/**
 * Edit a table cell value
 */
async function editTableCell(
  page: Page,
  row: any,
  placeholder: string,
  value: string,
): Promise<void> {
  await row.locator(".nb-edit").click();
  const editor = page.locator("input-editor").getByPlaceholder(placeholder);
  await editor.clear();
  await editor.fill(value);
  await page.locator(".nb-checkmark").click();
}

/**
 * Filter the table by age
 */
async function filterTableByAge(page: Page, age: string): Promise<void> {
  const ageFilter = page.locator("input-filter").getByPlaceholder("Age");
  await ageFilter.clear();
  await ageFilter.fill(age);
  await page.waitForTimeout(500); // Wait for filter to apply
}
