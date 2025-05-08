import { Page } from "@playwright/test";

/**
 * Represents a base page object class that provides common functionality for page interactions
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async navigateToHome() {
    await this.navigateTo("/");
  }
}
