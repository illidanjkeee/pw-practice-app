import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { env } from "../utils/environment";

test.beforeEach(async ({ page }) => {
  const pageManager = new PageManager(page);
  await page.goto(env.baseUrl);
  await pageManager.navigateTo().dialogPage();
});
test("Should display and interact with a simple alert dialog", async ({
  page,
}) => {
  // Setup
  const pageManager = new PageManager(page);
  const dialogPage = pageManager.onModalOverlaysPage();

  // Action
  await dialogPage.openDialogWithComponent();

  // Assertions
  const dismissButton = page.getByRole("button", { name: "Dismiss Dialog" });
  await expect(dismissButton).toBeVisible();

  // Close dialog
  await dismissButton.click();
  await expect(dismissButton).not.toBeVisible();
});
