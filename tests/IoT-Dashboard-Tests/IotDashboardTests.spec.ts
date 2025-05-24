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
    await test.step("Check the roller shades status", async () => {
      const rollerShadesStatusText = IoTDashboardPage.rollerShadesStatus;
      await expect(rollerShadesStatusText).toHaveText(
        rollerShadesStatusText ? "ON" : "OFF",
      );
    });
  });

  test("should verify the roller shades functionality title", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check if the roller shades functionality title is correct", async () => {
      const rollerShadesTitle = IoTDashboardPage.rollerShadesTitle;
      await expect(rollerShadesTitle).toHaveText("Roller Shades");
    });
  });
});

test.describe("IoT Dasboard Tests, Wireless Audio Functionality", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("should verify the wireless audio functionality title", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check if the wireless audio functionality title is correct", async () => {
      const wirelessAudioTitle = IoTDashboardPage.wirelessAudioTitle;
      await expect(wirelessAudioTitle).toHaveText("Wireless Audio");
    });
  });

  test("should verify the wireless audio status", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check the wireless audio status", async () => {
      const wirelessAudioStatusText = IoTDashboardPage.wirelessAudioStatus;
      await expect(wirelessAudioStatusText).toHaveText(
        wirelessAudioStatusText ? "ON" : "OFF",
      );
    });
  });

  test("should toggle the wireless audio on and off", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Toggle the wireless audio off", async () => {
      await IoTDashboardPage.switchTheWirelessAudio();
    });
    await test.step("Toggle the wireless audio on", async () => {
      await IoTDashboardPage.switchTheWirelessAudio();
    });
  });
});

test.describe("IoT Dashboard Tests, Coffee Maker Functionality", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });
  test("should verify the coffee maker functionality title", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check if the coffee maker functionality title is correct", async () => {
      const coffeeMakerTitle = IoTDashboardPage.coffeeMakerTitle;
      await expect(coffeeMakerTitle).toHaveText("Coffee Maker");
    });
  });

  test("should verify the coffee maker status", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Check the coffee maker status", async () => {
      const coffeeMakerStatusText = IoTDashboardPage.coffeeMakerStatus;
      await expect(coffeeMakerStatusText).toHaveText(
        coffeeMakerStatusText ? "ON" : "OFF",
      );
    });
  });

  test("should toggle the coffee maker on and off", async ({
    IoTDashboardPage,
  }) => {
    await test.step("Toggle the coffee maker off", async () => {
      await IoTDashboardPage.switchTheCoffeeMaker();
    });
    await test.step("Toggle the coffee maker on", async () => {
      await IoTDashboardPage.switchTheCoffeeMaker();
    });
  });
});
