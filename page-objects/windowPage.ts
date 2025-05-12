import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { CoreModule } from "../src/app/@core/core.module";

/**
 * Represents a page object for Window page.
 * This class provides methods and properties to interact with window components
 * including opening various types of windows, submitting forms, handling inputs,
 * and verifying window visibility and content.
 *
 * @extends BasePage
 */
export class WindowPage extends BasePage {
  // Window buttons
  readonly openWindowFormButton: Locator;
  readonly openWindowWithTemplateButton: Locator;
  readonly openWindowWithBackdropButton: Locator;
  readonly openWindowWithoutBackdropButton: Locator;

  // Window elements
  readonly openWindowFormSubjectInput: Locator;
  readonly openWindowFormTextInput: Locator;
  readonly minimizeWindowButton: Locator;
  readonly collapseWindowButton: Locator;
  readonly hideWindowButton: Locator;
  readonly openWindowFormCard: Locator;
  readonly collapsedWindowCard: Locator;
  readonly windowContent: Locator;
  readonly withoutBackdropWindowBody: Locator;
  constructor(page: Page) {
    super(page);

    // Window buttons
    this.openWindowFormButton = this.page.locator(
      "button:has-text('Open Window Form')",
    );
    this.openWindowWithTemplateButton = this.page.locator(
      "button:has-text('Open Window With Template')",
    );
    this.openWindowWithBackdropButton = this.page.locator(
      "button:has-text('Open Window With Backdrop')",
    );
    this.openWindowWithoutBackdropButton = this.page.locator(
      "button:has-text('Open Window Without Backdrop')",
    );
    this.openWindowFormCard = this.page.locator(
      "//nb-window[@class='full-screen ng-star-inserted']//nb-card",
    );
    this.openWindowFormSubjectInput = this.page.locator("#subject");
    this.openWindowFormTextInput = this.page.locator("//textarea[@id='text']");
    this.minimizeWindowButton = this.page.locator(
      "div[class='cdk-overlay-container'] button:nth-child(1)",
    );
    this.collapseWindowButton = this.page.locator(
      "div[class='cdk-overlay-container'] button:nth-child(2)",
    );
    this.hideWindowButton = this.page.locator(
      "div[class='cdk-overlay-container'] button:nth-child(3)",
    );
    this.collapsedWindowCard = this.page.locator(
      "//nb-window[@class='ng-star-inserted maximized']//nb-card",
    );
    this.windowContent = this.page.locator("//p[@class='ng-star-inserted']");
    this.withoutBackdropWindowBody = this.page.locator(
      "nb-card-body nb-overlay-container",
    );
  }

  async waitForWindowToAppear() {
    await this.openWindowFormCard.waitFor({ state: "visible" });
  }

  async openWindowForm() {
    await this.openWindowFormButton.click();
  }

  async minimizeWindow() {
    await this.minimizeWindowButton.click();
  }

  async collapseWindow() {
    await this.collapseWindowButton.click();
  }

  async hideWindow() {
    await this.hideWindowButton.click();
  }

  async openWindowWithTemplate() {
    await this.openWindowWithTemplateButton.click();
  }
  async openWindowWithBackdrop() {
    await this.openWindowWithBackdropButton.click();
  }
  async openWindowWithoutBackdrop() {
    await this.openWindowWithoutBackdropButton.click();
  }
}
