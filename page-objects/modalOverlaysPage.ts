import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * Represents a page object for Modal Overlays page.
 * This class provides methods and properties to interact with dialog components
 * including opening various types of dialogs, submitting forms, handling inputs,
 * and verifying dialog visibility and content.
 *
 * @extends BasePage
 */
export class ModalOverlaysPage extends BasePage {
  // Dialog buttons
  readonly openDialogWithComponentButton: Locator;
  readonly openDialogWithTemplateButton: Locator;
  readonly openDialogWithBackdropButton: Locator;
  readonly openDialogWithoutBackdropButton: Locator;
  readonly openDialogWithEscCloseButton: Locator;
  readonly openDialogWithoutEscCloseButton: Locator;
  readonly openDialogWithBackdropClickButton: Locator;
  readonly openWithoutBackdropClickButton: Locator;
  readonly enterNameButton: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  // Dialog elements
  readonly dialogCard: Locator;
  readonly dialogHeader: Locator;
  readonly dialogBody: Locator;
  readonly dialogCloseButton: Locator;
  readonly nameInput: Locator;
  readonly namesList: Locator;
  readonly namesItems: Locator;

  constructor(page: Page) {
    super(page);

    // Dialog buttons - Updated based on the HTML structure
    this.openDialogWithComponentButton = this.page.locator(
      "button:has-text('Open Dialog with component')",
    );
    this.openDialogWithTemplateButton = this.page.locator(
      "button:has-text('Open Dialog with template')",
    );
    this.openDialogWithBackdropButton = this.page.locator(
      "button:has-text('Open Dialog with backdrop')",
    );
    this.openDialogWithoutBackdropButton = this.page.locator(
      "button:has-text('Open Dialog without backdrop')",
    );
    this.openDialogWithEscCloseButton = this.page.locator(
      "button:has-text('Open Dialog with esc close')",
    );
    this.openDialogWithoutEscCloseButton = this.page.locator(
      "button:has-text('Open Dialog without esc close')",
    );
    this.openDialogWithBackdropClickButton = this.page.locator(
      "button:has-text('Open Dialog with backdrop click')",
    );
    this.openWithoutBackdropClickButton = this.page.locator(
      "button:has-text('Open without backdrop click')",
    );
    this.enterNameButton = this.page.locator("button:has-text('Enter Name')");

    // Dialog elements
    this.dialogCard = this.page.locator(
      "nb-card:has(button:has-text('Close Dialog')), nb-card:has(button:has-text('Dismiss Dialog')), nb-card:has(button:has-text('Cancel')), nb-card:has(button:has-text('Submit'))",
    );
    this.dialogHeader = this.page.locator("nb-card-header", {
      hasText: "Template Dialog",
    });
    this.dialogBody = this.dialogCard.locator("nb-card-body");
    this.dialogCloseButton = this.page.locator(
      "button:has-text('Close Dialog')",
    );
    this.nameInput = this.page.locator(
      "input[placeholder='Name'].nb-transition",
    );
    this.namesList = this.page.locator(".result-from-dialog ul");
    this.namesItems = this.page.locator(".result-from-dialog ul li");
    this.submitButton = this.page.locator("button:has-text('Submit')");
    this.cancelButton = this.page.locator("button:has-text('Cancel')");
  }

  async openDialogWithTemplate(): Promise<void> {
    await this.openDialogWithTemplateButton.click();
  }

  async openDialogWithEscClose(): Promise<void> {
    await this.openDialogWithEscCloseButton.click();
  }

  async openDialogWithoutEscClose(): Promise<void> {
    await this.openDialogWithoutEscCloseButton.click();
  }

  async openDialogWithBackdropClick(): Promise<void> {
    await this.openDialogWithBackdropClickButton.click();
  }

  async openDialogWithoutBackdropClick(): Promise<void> {
    await this.openWithoutBackdropClickButton.click();
  }

  async openEnterNameDialog(): Promise<void> {
    await this.enterNameButton.click();
  }

  async closeDialog(): Promise<void> {
    await this.dialogCloseButton.click();
  }

  async getDialogText(): Promise<string> {
    return (await this.dialogBody.textContent()) || "";
  }

  async getNamesList(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.namesItems.count();

    for (let i = 0; i < count; i++) {
      names.push((await this.namesItems.nth(i).textContent()) || "");
    }

    return names;
  }

  async isDialogVisible(): Promise<boolean> {
    return await this.dialogCard.isVisible();
  }

  // Additional utility methods
  async waitForDialogToAppear(): Promise<void> {
    await this.dialogCard.waitFor({ state: "visible" });
  }

  async waitForDialogToDisappear(): Promise<void> {
    await this.dialogCard.waitFor({ state: "hidden" });
  }

  async closeDialogByEscKey(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }

  async closeDialogByClickingBackdrop(): Promise<void> {
    // Click outside the dialog card to trigger backdrop click
    await this.page.mouse.click(10, 10);
  }

  async getNamesCount(): Promise<number> {
    return await this.namesItems.count();
  }

  /**
   * Enters a name in the dialog and submits it
   * @param name The name to enter and submit
   */
  async enterNameAndSubmit(name: string): Promise<void> {
    // Find the input field and enter the name
    await this.nameInput.fill(name);
    // Click the submit button
    await this.submitButton.click();
  }

  async enterNameAndCancel(name: string): Promise<void> {
    await this.page.fill('input[placeholder="Name"]', name);
    await this.page.click('button:has-text("Cancel")');
  }
}
