import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class FormLayoutsPage extends BasePage {
    public readonly page: Page;
    private readonly gridForm: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.gridForm = this.page.locator('nb-card').filter({ hasText: 'Using the Grid' }).locator('form');
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(
        email: string, 
        password: string, 
        optionText: string
    ): Promise<void> {
        await this.gridForm.waitFor({ state: 'visible' });
        
        await this.gridForm.getByRole('textbox', { name: 'Email' }).fill(email);
        await this.gridForm.getByRole('textbox', { name: 'Password' }).fill(password);
        
        // Using a more reliable selector for the radio button
        const radioOption = this.gridForm.locator(`label:has-text("${optionText}")`);
        await radioOption.waitFor({ state: 'visible' });
        await radioOption.click();
        
        await this.gridForm.getByRole('button', { name: 'Sign In' }).click();
    }

    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card',{hasText: 'Inline form'}).locator('form');
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name);
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email);
        if (rememberMe) {
            await inlineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true});
        }
        await inlineForm.getByRole('button', {name: 'Submit'}).click();
    }
}