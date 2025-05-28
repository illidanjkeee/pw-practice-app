import { test, expect } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard - Temperature Component Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Temperature Tab Functionality", () => {
    test("should display temperature card and verify default state", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Verify temperature card is visible", async () => {
        await expect(IoTDashboardPage.temperatureCard).toBeVisible();
      });

      await test.step("Verify temperature tab is active by default", async () => {
        await expect(IoTDashboardPage.temperatureTab).toBeVisible();
        await expect(IoTDashboardPage.temperatureValue).toBeVisible();
      });

      await test.step("Verify temperature value is displayed", async () => {
        const temperatureValue = await IoTDashboardPage.getTemperatureValue();
        expect(temperatureValue).not.toBe("");
        expect(temperatureValue).toMatch(/^\d+$|^--$/); // Should be a number or "--" when off
      });
    });

    test("should switch between temperature and humidity tabs", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Switch to humidity tab", async () => {
        await IoTDashboardPage.switchToHumidityTab();
        await expect(IoTDashboardPage.humidityValue).toBeVisible();
      });

      await test.step("Switch back to temperature tab", async () => {
        await IoTDashboardPage.switchToTemperatureTab();
        await expect(IoTDashboardPage.temperatureValue).toBeVisible();
      });
    });

    test("should toggle temperature power on and off", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Ensure temperature tab is active", async () => {
        await IoTDashboardPage.switchToTemperatureTab();
      });

      await test.step("Get initial temperature value", async () => {
        const initialValue = await IoTDashboardPage.getTemperatureValue();
        expect(initialValue).toBeTruthy();
      });

      await test.step("Toggle temperature power off", async () => {
        await IoTDashboardPage.toggleTemperaturePower();
        await expect(IoTDashboardPage.temperatureValue).toContainText("--");
      });

      await test.step("Toggle temperature power back on", async () => {
        await IoTDashboardPage.toggleTemperaturePower();
        const restoredValue = await IoTDashboardPage.getTemperatureValue();
        expect(restoredValue).toMatch(/^\d+$/);
      });
    });

    test("should allow selection of different temperature modes", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Ensure temperature tab is active", async () => {
        await IoTDashboardPage.switchToTemperatureTab();
      });

      const modes: Array<"cool" | "warm" | "heat" | "fan"> = [
        "cool",
        "warm",
        "heat",
        "fan",
      ];

      for (const mode of modes) {
        await test.step(`Select ${mode} mode`, async () => {
          await IoTDashboardPage.selectTemperatureMode(mode);
          await IoTDashboardPage.page.waitForTimeout(100); // Small delay for mode change
        });
      }
    });

    test("should verify temperature slider is interactive", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Ensure temperature tab is active", async () => {
        await IoTDashboardPage.switchToTemperatureTab();
      });

      await test.step("Verify temperature slider is visible", async () => {
        await expect(IoTDashboardPage.temperatureSlider).toBeVisible();
      });

      await test.step("Verify temperature dragger component exists", async () => {
        const draggerComponent = IoTDashboardPage.page
          .locator("ngx-temperature-dragger")
          .first();
        await expect(draggerComponent).toBeVisible();
      });
    });
  });

  test.describe("Humidity Tab Functionality", () => {
    test("should display humidity controls when switching to humidity tab", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Switch to humidity tab", async () => {
        await IoTDashboardPage.switchToHumidityTab();
      });

      await test.step("Verify humidity value is displayed", async () => {
        const humidityValue = await IoTDashboardPage.getHumidityValue();
        expect(humidityValue).not.toBe("");
        expect(humidityValue).toMatch(/^\d+$|^--$/);
      });

      await test.step("Verify humidity slider is visible", async () => {
        await expect(IoTDashboardPage.humiditySlider).toBeVisible();
      });
    });

    test("should toggle humidity power on and off", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Switch to humidity tab", async () => {
        await IoTDashboardPage.switchToHumidityTab();
      });

      await test.step("Get initial humidity value", async () => {
        const initialValue = await IoTDashboardPage.getHumidityValue();
        expect(initialValue).toBeTruthy();
      });

      await test.step("Toggle humidity power off", async () => {
        await IoTDashboardPage.toggleHumidityPower();
        await expect(IoTDashboardPage.humidityValue).toContainText("--");
      });

      await test.step("Toggle humidity power back on", async () => {
        await IoTDashboardPage.toggleHumidityPower();
        const restoredValue = await IoTDashboardPage.getHumidityValue();
        expect(restoredValue).toMatch(/^\d+$/);
      });
    });

    test("should allow selection of different humidity modes", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Switch to humidity tab", async () => {
        await IoTDashboardPage.switchToHumidityTab();
      });

      const modes: Array<"cool" | "warm" | "heat" | "fan"> = [
        "cool",
        "warm",
        "heat",
        "fan",
      ];

      for (const mode of modes) {
        await test.step(`Select ${mode} mode for humidity`, async () => {
          await IoTDashboardPage.selectHumidityMode(mode);
          await IoTDashboardPage.page.waitForTimeout(100);
        });
      }
    });
  });

  test.describe("Temperature Component Edge Cases", () => {
    test("should handle rapid tab switching", async ({ IoTDashboardPage }) => {
      await test.step("Rapidly switch between tabs", async () => {
        for (let i = 0; i < 3; i++) {
          await IoTDashboardPage.switchToHumidityTab();
          await IoTDashboardPage.switchToTemperatureTab();
        }
      });

      await test.step("Verify final state is stable", async () => {
        await expect(IoTDashboardPage.temperatureValue).toBeVisible();
        const value = await IoTDashboardPage.getTemperatureValue();
        expect(value).toBeTruthy();
      });
    });

    test("should maintain mode selection when toggling power", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Select heat mode", async () => {
        await IoTDashboardPage.selectTemperatureMode("heat");
      });

      await test.step("Toggle power off and on", async () => {
        await IoTDashboardPage.toggleTemperaturePower();
        await IoTDashboardPage.toggleTemperaturePower();
      });

      await test.step("Verify mode is preserved", async () => {
        const heatRadio =
          IoTDashboardPage.temperatureModeButtons.locator('[value="heat"]');
        await expect(heatRadio).toBeChecked();
      });
    });
  });
});
