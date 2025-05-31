import { expect, test } from "../../fixtures/baseFixture";

test.describe("Kitten Integration Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("should correctly display the Kitten card", async ({ IoTDashboardPage }) => {
    await test.step("Scroll to the Kitten card", async () => {
      await IoTDashboardPage.kittenCard.scrollIntoViewIfNeeded();
    });
    await test.step("Verify the Kitten card is visible", async () => {
      await expect(IoTDashboardPage.kittenCard).toBeVisible();
    });
    await test.step("Verify the Kitten card has the correct title", async () => {
      await expect(IoTDashboardPage.kittenCardTitle).toHaveText("UI Kitten");
    });
  });

  test("", async ({ IoTDashboardPage }) => {
    await test.step("Verify the Kitten card has the correct description", async () => {
      // TODO: finish the test
    });
  });
});
