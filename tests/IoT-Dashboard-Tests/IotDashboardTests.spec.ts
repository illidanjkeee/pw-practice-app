import { test, expect } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("should toggle the light on and off", async ({ IoTDashboardPage }) => {
    await test.step("Toggle the light off", async () => {
      await IoTDashboardPage.switchTheLight();
    });
    await test.step("Toggle the light on", async () => {
      await IoTDashboardPage.switchTheLight();
    });
  });

  test("should verify the light status", async ({ IoTDashboardPage }) => {
    await test.step("Check if the light is toggled on by default", async () => {
      const isLightOn = await IoTDashboardPage.isLightToggledOn();
      expect(isLightOn).toBe(true);
    });
  });
});
