import { Page } from "@playwright/test";
import { BASE_URL } from "../config/urls";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific route
   * @param path The route path (without base URL)
   */
  async navigateTo(path: string) {
    await this.page.goto(`${BASE_URL}${path}`);
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome() {
    await this.navigateTo("/");
  }
}
