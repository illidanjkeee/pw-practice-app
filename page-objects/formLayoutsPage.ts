import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

interface FormCredentials {
  email: string;
  password?: string;
  name?: string;
  rememberMe?: boolean;
  option?: string;
}

/**
 * Page object representing the Form Layouts page
 * Handles interactions with grid and inline forms
 */
export class FormLayoutsPage extends BasePage {
  // Form locators for different form types
  private readonly gridForm: Locator;
  private readonly inlineForm: Locator;

  /**
   * Initialize the FormLayoutsPage with required locators
   * @param page - Playwright page instance
   */
  constructor(page: Page) {
    super(page);
    this.gridForm = this.initializeGridForm();
    this.inlineForm = this.initializeInlineForm();
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(credentials: FormCredentials): Promise<void> {
    await this.gridForm.waitFor({ state: "visible" });

    await this.fillGridFormFields(credentials);
    await this.selectGridFormOption(credentials.option);
    await this.submitGridForm();
  }

  async submitInlineFormWithNameEmailAndCheckbox(credentials: FormCredentials): Promise<void> {
    await this.inlineForm.waitFor({ state: "visible" });

    await this.fillInlineFormFields(credentials);
    await this.handleRememberMe(credentials.rememberMe);
    await this.submitInlineForm();
  }

  /**
   * Returns the grid form element for verification purposes
   * @returns Locator for the grid form
   */
  async getGridFormElement(): Promise<Locator> {
    return this.gridForm;
  }

  /**
   * Returns the inline form element for verification purposes
   * @returns Locator for the inline form
   */
  async getInlineFormElement(): Promise<Locator> {
    return this.inlineForm;
  }

  /**
   * Initializes the grid form locator
   * @returns Locator for the grid form
   */
  private initializeGridForm(): Locator {
    return this.page.locator("nb-card").filter({ hasText: "Using the Grid" }).locator("form");
  }

  /**
   * Initializes the inline form locator
   * @returns Locator for the inline form
   */
  private initializeInlineForm(): Locator {
    return this.page.locator("nb-card", { hasText: "Inline form" }).locator("form");
  }

  /**
   * Fills the grid form fields with provided credentials
   * @param credentials - Object containing email and password
   */

  private async fillGridFormFields(credentials: FormCredentials): Promise<void> {
    const { email, password } = credentials;
    await this.gridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await this.gridForm.getByRole("textbox", { name: "Password" }).fill(password);
  }

  /**
   * Selects a radio option in the grid form
   * @param optionText - Text of the radio option to select
   * @throws Will throw if the option is not found or not visible
   */

  private async selectGridFormOption(optionText: string): Promise<void> {
    const radioOption = this.gridForm.locator(`label:has-text("${optionText}")`);
    await radioOption.waitFor({ state: "visible" });
    await radioOption.click();
  }

  /**
   * Submits the grid form by clicking the Sign-In button
   */
  private async submitGridForm(): Promise<void> {
    await this.gridForm.getByRole("button", { name: "Sign In" }).click();
  }

  private async fillInlineFormFields(credentials: FormCredentials): Promise<void> {
    const { name, email } = credentials;
    await this.inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await this.inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
  }

  private async handleRememberMe(rememberMe: boolean): Promise<void> {
    if (rememberMe) {
      await this.inlineForm.getByRole("checkbox", { name: "Remember me" }).check({ force: true });
    }
  }

  private async submitInlineForm(): Promise<void> {
    await this.inlineForm.getByRole("button", { name: "Submit" }).click();
  }

  /**
   * Gets an element from a specific form
   * @param formName The name of the form to search in
   * @param role The role of the element to find
   * @param name The name of the element to find
   * @returns The located element
   */
  getFormElement(
    formName: string,
    role:
      | "button"
      | "textbox"
      | "checkbox"
      | "radio"
      | "link"
      | "heading"
      | "listitem"
      | "list"
      | "table"
      | "cell"
      | "row"
      | "columnheader"
      | "rowheader"
      | "generic"
      | "img"
      | "article"
      | "banner"
      | "complementary"
      | "contentinfo"
      | "form"
      | "main"
      | "navigation"
      | "region"
      | "search",
    name: string,
  ): Locator {
    return this.page.locator("nb-card").filter({ hasText: formName }).getByRole(role, { name });
  }
}
