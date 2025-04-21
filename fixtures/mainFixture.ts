import { test as base, Page } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

// Extend Playwright's test fixtures with our page objects
export type PageFixtures = {
  pageManager: PageManager;
};

// Create a test object with custom fixtures
export const test = base.extend<PageFixtures>({
  // Define the pageManager fixture
  pageManager: async ({ page }, use) => {
    // Create a new PageManager instance
    const pageManager = new PageManager(page);

    // Make the PageManager available in the test
    await use(pageManager);
  },
});

// Export the expect object from the base test
export { expect } from "@playwright/test";
