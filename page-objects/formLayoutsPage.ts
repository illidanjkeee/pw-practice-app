import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * Interface representing form input data
 * @property email - Required email address
 * @property password - Optional password field
 * @property name - Optional name field
 * @property rememberMe - Optional checkbox state
 * @property option - Optional radio button selection
 */
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
    // Initialize form locators for reuse
    this.gridForm = this.initializeGridForm();
    this.inlineForm = this.initializeInlineForm();
  }

  /**
   * Submits the grid form with provided credentials and radio option
   * @param credentials - Form data including email, password, and option
   * @throws Will throw an error if form elements are not visible
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    credentials: FormCredentials,
  ): Promise<void> {
    // Wait for form to be visible before interaction
    await this.gridForm.waitFor({ state: "visible" });

    // Fill form fields and submit
    await this.fillGridFormFields(credentials);
    await this.selectGridFormOption(credentials.option);
    await this.submitGridForm();
  }

  /**
   * Submits the inline form with provided user details
   * @param credentials - Form data including name, email, and remember me option
   * @throws Will throw an error if form elements are not visible
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    credentials: FormCredentials,
  ): Promise<void> {
    // Wait for form to be visible before interaction
    await this.inlineForm.waitFor({ state: "visible" });

    // Fill form fields, handle checkbox, and submit
    await this.fillInlineFormFields(credentials);
    await this.handleRememberMe(credentials.rememberMe);
    await this.submitInlineForm();
  }

  /**
   * Initializes the grid form locator
   * @returns Locator for the grid form
   */
  private initializeGridForm(): Locator {
    return this.page
      .locator("nb-card")
      .filter({ hasText: "Using the Grid" })
      .locator("form");
  }

  /**
   * Initializes the inline form locator
   * @returns Locator for the inline form
   */
  private initializeInlineForm(): Locator {
    return this.page
      .locator("nb-card", { hasText: "Inline form" })
      .locator("form");
  }

  /**
   * Fills the grid form fields with provided credentials
   * @param credentials - Object containing email and password
   */
  private async fillGridFormFields(
    credentials: FormCredentials,
  ): Promise<void> {
    const { email, password } = credentials;
    await this.gridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await this.gridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
  }

  /**
   * Selects a radio option in the grid form
   * @param optionText - Text of the radio option to select
   * @throws Will throw if the option is not found or not visible
   */
  private async selectGridFormOption(optionText: string): Promise<void> {
    const radioOption = this.gridForm.locator(
      `label:has-text("${optionText}")`,
    );
    await radioOption.waitFor({ state: "visible" });
    await radioOption.click();
  }

  /**
   * Submits the grid form by clicking the Sign-In button
   */
  private async submitGridForm(): Promise<void> {
    await this.gridForm.getByRole("button", { name: "Sign In" }).click();
  }

  /**
   * Fills the inline form fields with provided credentials
   * @param credentials - Object containing name and email
   */
  private async fillInlineFormFields(
    credentials: FormCredentials,
  ): Promise<void> {
    const { name, email } = credentials;
    await this.inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await this.inlineForm.getByRole("textbox", { name: "Email" }).fill(email);
  }

  /**
   * Handles the remember me checkbox in the inline form
   * @param rememberMe - Boolean indicating whether to check the remember me box
   */
  private async handleRememberMe(rememberMe: boolean): Promise<void> {
    if (rememberMe) {
      await this.inlineForm
        .getByRole("checkbox", { name: "Remember me" })
        .check({ force: true });
    }
  }

  /**
   * Submits the inline form by clicking the Submit button
   */
  private async submitInlineForm(): Promise<void> {
    await this.inlineForm.getByRole("button", { name: "Submit" }).click();
  }
}
