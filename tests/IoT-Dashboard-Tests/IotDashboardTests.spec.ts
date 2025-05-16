import { test, expect } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard Tests, Light Functionality", () => {
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

  test("should verify the light functionality title", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check if the light functionality title is correct", async () => {
      const lightTitle = IoTDashboardPage.lightTitle;
      await expect(lightTitle).toHaveText("Light");
    });
  });
});
test.describe("IoT Dashboard Tests, Roller Shades Functionality", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("should toggle the roller shades on and off", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Toggle the roller shades off", async () => {
      await IoTDashboardPage.switchTheRollerShades();
    });
    await test.step("Toggle the roller shades on", async () => {
      await IoTDashboardPage.switchTheRollerShades();
    });
  });

  test("should verify the roller shades status", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check if the roller shades are toggled on by default", async () => {
      const isRollerShadesOn = await IoTDashboardPage.isRollerShadesToggledOn();
      expect(isRollerShadesOn).toBe(true);
    });
  });
});
