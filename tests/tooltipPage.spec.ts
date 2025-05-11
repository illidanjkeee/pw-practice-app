import { test, expect } from "../fixtures/baseFixture";

test.describe("Tooltips Page Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.tooltipPage();
  });

  test("Tooltip shows on hover", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step("Hover over tooltip button", async () => {
      const tooltipButton = page
        .locator("nb-card")
        .filter({ hasText: "Tooltip Placements" })
        .getByRole("button", { name: "Top" });

      await tooltipButton.hover();
    });

    await test.step("Verify tooltip text", async () => {
      await expect(page.locator("nb-tooltip")).toHaveText("This is a tooltip");
    });
  });
});
