import { Page } from "@playwright/test";
import { BASE_URL } from "../config/urls";
import { step } from "../helpers/decorators/step";

/**
 * Represents a base page object class that provides common functionality for page interactions
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific route
   * @param path The route path (without base URL)
   */
  async navigateTo(route: string): Promise<void> {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    await this.page.goto(`${BASE_URL}${normalizedRoute}`);
  }

  /**
   * Navigate to the home page
   */
  @step("Navigate to home page")
  async navigateToHome() {
    await this.navigateTo("/");
  }

  /**
   * Verify the page URL
   */
  @step("Verify page URL")
  async verifyUrl() {
    const currentUrl = this.page.url();
    const expectedUrl = `${BASE_URL}${this.page.url().split(BASE_URL)[1]}`;
    if (currentUrl !== expectedUrl) {
      throw new Error(`Expected URL: ${expectedUrl}, but got: ${currentUrl}`);
    }
  }
}
