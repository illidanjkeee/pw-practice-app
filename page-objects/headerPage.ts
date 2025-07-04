import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HeaderPage extends BasePage {
  readonly themeDropdown: Locator;
  readonly header: Locator;
  readonly themeOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.themeDropdown = page.locator("ngx-header nb-select");
    this.header = page.locator("nb-layout-header");
    this.themeOptions = page.locator("nb-option-list nb-option");
  }

  async selectTheme(themeName: string) {
    await this.themeDropdown.click();
    await this.themeOptions.filter({ hasText: themeName }).click();
  }

  async openThemeDropdown() {
    await this.themeDropdown.click();
  }

  async verifyDropdownOptions(expectedOptions: string[]) {
    await expect(this.themeOptions).toHaveText(expectedOptions);
  }

  async verifyHeaderColor(expectedColor: string) {
    await expect(this.header).toHaveCSS("background-color", expectedColor);
  }

  async verifySelectedTheme(expectedTheme: string) {
    await expect(this.themeDropdown).toHaveText(expectedTheme);
  }
}
