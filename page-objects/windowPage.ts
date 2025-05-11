import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

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
  readonly openWindowForm: Locator;
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
    this.openWindowForm = this.page.locator(
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
  }
  /**
   * Waits for the dialog to appear.
   */
  async waitForWindowToAppear() {
    await this.openWindowForm.waitFor({ state: "visible" });
  }
}
