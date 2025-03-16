import { test, expect, Page } from "@playwright/test";

test.describe("UI Component Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
  });

  test.describe("Form Layouts Page", () => {
    // Setup for form layout tests
    test.beforeEach(async ({ page }) => {
      await navigateToPage(page, "Forms", "Form Layouts");
    });

    test("Input Fields", async ({ page }) => {
      // Get the email input from the "Using the Grid" form
      const usingTheGridEmailInput = getFormElement(
        page,
        "Using the Grid",
        "textbox",
        "email",
      );

      // Test different input methods
      await usingTheGridEmailInput.fill("test@test.com");
      await usingTheGridEmailInput.clear();
      await usingTheGridEmailInput.pressSequentially("test2@test.com", {
        delay: 100,
      });

      // Verify input value using two different methods
      const inputValue = await usingTheGridEmailInput.inputValue();
      expect(inputValue).toBe("test2@test.com");
      await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
    });

    test("Radio Buttons", async ({ page }) => {
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
    test("Checkboxes", async ({ page }) => {
      await navigateToPage(page, "Modal & Overlays", "Toastr");

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
    test("Theme dropdown changes header color", async ({ page }) => {
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

    test("Dropdown list content", async ({ page }) => {
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
    test("Tooltip shows on hover", async ({ page }) => {
      await navigateToPage(page, "Modal & Overlays", "Tooltip");

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
    test("Confirm deletion dialog", async ({ page }) => {
      await navigateToPage(page, "Tables & Data", "Smart Table");

      // Handle dialog when it appears
      page.on("dialog", (dialog) => {
        expect(dialog.message()).toEqual("Are you sure you want to delete?");
        dialog.accept();
      });

      // Click delete and verify row is removed
      const targetRow = page
        .getByRole("table")
        .locator("tr", { hasText: "mdo@gmail.com" });
      await targetRow.locator(".nb-trash").click();
      await expect(page.locator("table tr").first()).not.toHaveText(
        "mdo@gmail.com",
      );
    });
  });

  test.describe("Smart Table", () => {
    test.beforeEach(async ({ page }) => {
      await navigateToPage(page, "Tables & Data", "Smart Table");
    });

    test("Edit table row data", async ({ page }) => {
      // Edit age in first page
      const firstPageRow = page
        .locator("table")
        .locator("tr", { hasText: "twitter@outlook.com" })
        .first();
      await editTableCell(page, firstPageRow, "Age", "35");

      // Navigate to page 2
      await page.locator(".ng2-smart-pagination-nav").getByText("2").click();

      // Edit email on second page
      const secondPageRow = page
        .getByRole("row", { name: "11" })
        .filter({ has: page.locator("td").nth(1).getByText("11") });
      await editTableCell(page, secondPageRow, "E-mail", "test@test.com");

      // Verify edit was successful
      await expect(secondPageRow.locator("td").nth(5)).toHaveText(
        "test@test.com",
      );
    });

    test("Table filtering by age", async ({ page }) => {
      const ages = ["20", "30", "40", "200"];

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
            const rowAge = await row.locator("td").last().textContent();
            expect(rowAge).toBe(age);
          }
        }
      }
    });
  });
});

// Helper functions

/**
 * Navigate to a specific page using the main menu
 */
async function navigateToPage(
  page: Page,
  menuItem: string,
  subMenuItem: string,
): Promise<void> {
  await page.getByRole("link", { name: menuItem }).click();
  await page.getByRole("link", { name: subMenuItem }).click();
}

/**
 * Get an element from a specific form
 */
/**
 * Get an element from a specific form
 */
function getFormElement(
  page: Page,
  formName: string,
  role: string,
  name: string,
): any {
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
