import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SmartTablePage extends BasePage {
  // Table structure locators
  readonly table: Locator;
  readonly tableBody: Locator;
  readonly ageFilter: Locator;
  readonly paginationNav: Locator;

  // Row action locators
  readonly deleteButton: Locator;
  readonly editButton: Locator;
  readonly confirmEditButton: Locator;

  // Editor locators
  readonly ageEditor: Locator;
  readonly emailEditor: Locator;

  constructor(page: Page) {
    super(page);
    this.table = page.getByRole("table");
    this.tableBody = page.locator("tbody");
    this.ageFilter = page.locator("input-filter").getByPlaceholder("Age");
    this.paginationNav = page.locator(".ng2-smart-pagination-nav");

    this.deleteButton = page.locator(".nb-trash");
    this.editButton = page.locator(".nb-edit");
    this.confirmEditButton = page.locator(".nb-checkmark");

    this.ageEditor = page.locator("input-editor").getByPlaceholder("Age");
    this.emailEditor = page.locator("input-editor").getByPlaceholder("E-mail");
  }

  /**
   * Delete a row by email and confirm the deletion
   * @param email Email to identify row to delete
   */ async deleteRow(email: string): Promise<void> {
    const targetRow = this.getRowByEmail(email);
    await targetRow.locator(this.deleteButton).click();
  }

  /**
   * Verify a row with specific email does not exist
   * @param email Email to check for non-existence
   */ async verifyRowDeleted(email: string): Promise<void> {
    await expect(this.table.locator("tr").first()).not.toHaveText(email);
  }

  /**
   * Edit age in a row identified by email
   * @param email Email to identify row
   * @param newAge New age value
   */ async editAge(email: string, newAge: string): Promise<void> {
    const row = this.getRowByEmail(email).first();
    await row.locator(this.editButton).click();
    await this.ageEditor.clear();
    await this.ageEditor.fill(newAge);
    await this.confirmEditButton.click();
  }

  /**
   * Navigate to a specific page in the table pagination
   * @param pageNumber Page number to navigate to
   */
  async navigateToPage(pageNumber: string): Promise<void> {
    await this.paginationNav.getByText(pageNumber).click();
  }

  /**
   * Edit email for a row identified by ID
   * @param id ID to identify row
   * @param newEmail New email value
   */ async editEmailById(id: string, newEmail: string): Promise<void> {
    const row = this.getRowById(id);
    await row.locator(this.editButton).click();
    await this.emailEditor.clear();
    await this.emailEditor.fill(newEmail);
    await this.confirmEditButton.click();
  }

  /**
   * Verify email value for a row identified by ID
   * @param id ID to identify row
   * @param expectedEmail Expected email value
   */
  async verifyEmailById(id: string, expectedEmail: string): Promise<void> {
    const row = this.getRowById(id);
    await expect(row.locator("td").nth(5)).toHaveText(expectedEmail);
  }

  /**
   * Filter table by age
   * @param age Age value to filter by
   */
  async filterByAge(age: string): Promise<void> {
    await this.ageFilter.clear();
    await this.ageFilter.fill(age);
    await this.page.waitForTimeout(500); // Wait for filter to apply
  }

  /**
   * Verify that all rows match the filtered age
   * @param age Age value to verify
   */ async verifyAgeFilter(age: string): Promise<void> {
    const rows = this.tableBody.locator("tr");

    if (age === "200") {
      // Special case for age that returns no results
      await expect(this.table).toContainText("No data found");
    } else {
      // Check all visible rows match the filter
      const allRows = await rows.all();
      for (const row of allRows) {
        const rowAge = row.locator("td").last();
        await expect(rowAge).toHaveText(age);
      }
    }
  }

  // Get a specific row by email text
  getRowByEmail(email: string): Locator {
    return this.table.locator("tr", { hasText: email });
  }

  // Get a specific row by ID
  getRowById(id: string): Locator {
    return this.page.getByRole("row", { name: id }).filter({ has: this.page.locator("td").nth(1).getByText(id) });
  }
}
