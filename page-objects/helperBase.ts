import { Page } from "@playwright/test";

export class HelperBase {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }
    /**
     * Waits for the specified locator to be visible
     * @param locator The locator to wait for
     */
    async waitForLocator(locator: string) {
        await this.page.waitForSelector(locator, { state: 'visible' });
    }
    /**
     * Waits for the specified locator to be hidden
     * @param locator The locator to wait for
     * @param timeout The timeout in milliseconds (default: 5000)
     * @returns {Promise<void>}
     * @throws {Error} If the locator does not become hidden within the timeout
     *  */
    async waitForLocatorToBeHidden(locator: string, timeout: number = 5000): Promise<void> {
        const element = this.page.locator(locator);
        await element.waitFor({ state: 'hidden', timeout });
    }
}