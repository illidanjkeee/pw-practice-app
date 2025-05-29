import { expect, test } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard - Weather Component Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Weather Component Layout", () => {
    test("should display weather card with all weather information", async ({ IoTDashboardPage }) => {
      await test.step("Verify weather card is visible", async () => {
        await expect(IoTDashboardPage.weatherCard).toBeVisible();
      });

      await test.step("Verify weather location is displayed", async () => {
        const location = await IoTDashboardPage.getWeatherLocation();
        expect(location).toBeTruthy();
        expect(location).toContain("New York");
      });

      await test.step("Verify weather date is displayed", async () => {
        const date = await IoTDashboardPage.getWeatherDate();
        expect(date).toBeTruthy();
        expect(date).toMatch(/\w{3} \d{1,2} \w{3}/); // Format: "Mon 29 May"
      });

      await test.step("Verify current temperature is displayed", async () => {
        const temperature = await IoTDashboardPage.getCurrentTemperature();
        expect(temperature).toBeTruthy();
        expect(temperature).toMatch(/\d+°/); // Should contain number followed by degree symbol
      });
    });

    test("should display weather icon", async ({ IoTDashboardPage }) => {
      await test.step("Verify weather icon is visible", async () => {
        await expect(IoTDashboardPage.weatherIcon).toBeVisible();
      });

      await test.step("Verify icon has proper styling", async () => {
        const iconClass = await IoTDashboardPage.weatherIcon.getAttribute("class");
        expect(iconClass).toContain("today-icon");
      });
    });

    test("should display current weather details", async ({ IoTDashboardPage }) => {
      await test.step("Verify weather details section is visible", async () => {
        await expect(IoTDashboardPage.weatherDetails).toBeVisible();
      });

      await test.step("Verify max temperature parameter", async () => {
        const maxTempElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "max" });
        await expect(maxTempElement).toBeVisible();

        const maxTempValue = await maxTempElement.locator(".parameter-value").textContent();
        expect(maxTempValue).toMatch(/\d+°/);
      });

      await test.step("Verify min temperature parameter", async () => {
        const minTempElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "min" });
        await expect(minTempElement).toBeVisible();

        const minTempValue = await minTempElement.locator(".parameter-value").textContent();
        expect(minTempValue).toMatch(/\d+°/);
      });

      await test.step("Verify wind parameter", async () => {
        const windElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "wind" });
        await expect(windElement).toBeVisible();

        const windValue = await windElement.locator(".parameter-value").textContent();
        expect(windValue).toMatch(/\d+ km\/h/);
      });

      await test.step("Verify humidity parameter", async () => {
        const humElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "hum" });
        await expect(humElement).toBeVisible();

        const humValue = await humElement.locator(".parameter-value").textContent();
        expect(humValue).toMatch(/\d+%/);
      });
    });
  });

  test.describe("Weekly Forecast", () => {
    test("should display weekly forecast with multiple days", async ({ IoTDashboardPage }) => {
      await test.step("Verify weekly forecast section is visible", async () => {
        await expect(IoTDashboardPage.weeklyForecast).toBeVisible();
      });

      await test.step("Verify forecast contains multiple days", async () => {
        const daysCount = await IoTDashboardPage.getWeeklyForecastDaysCount();
        expect(daysCount).toBeGreaterThan(0);
        expect(daysCount).toBeLessThanOrEqual(7); // Should not exceed 7 days
      });

      await test.step("Verify each day has required elements", async () => {
        const days = IoTDashboardPage.weeklyForecast.locator(".day");
        const firstDay = days.first();

        // Each day should have day name, icon, and temperature
        await expect(firstDay.locator(".caption")).toBeVisible();
        await expect(firstDay.locator(".weather-icon")).toBeVisible();
        await expect(firstDay.locator(".temperature")).toBeVisible();
      });
    });

    test("should display proper day names in forecast", async ({ IoTDashboardPage }) => {
      await test.step("Verify day names are displayed correctly", async () => {
        const dayNames = IoTDashboardPage.weeklyForecast.locator(".day .caption");
        const firstDayName = await dayNames.first().textContent();

        const validDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        expect(validDayNames).toContain(firstDayName);
      });
    });

    test("should display weather icons for each forecast day", async ({ IoTDashboardPage }) => {
      await test.step("Verify weather icons are present", async () => {
        const weatherIcons = IoTDashboardPage.weeklyForecast.locator(".weather-icon");
        const iconsCount = await weatherIcons.count();
        expect(iconsCount).toBeGreaterThan(0);
      });

      await test.step("Verify icons have proper classes", async () => {
        const firstIcon = IoTDashboardPage.weeklyForecast.locator(".weather-icon").first();
        const iconClass = await firstIcon.getAttribute("class");
        expect(iconClass).toContain("weather-icon");
        expect(iconClass).toMatch(/ion-ios-\w+-outline/); // Should have ion icon class
      });
    });

    test("should display temperatures for forecast days", async ({ IoTDashboardPage }) => {
      await test.step("Verify temperatures are displayed", async () => {
        const temperatures = IoTDashboardPage.weeklyForecast.locator(".temperature");
        const firstTemp = await temperatures.first().textContent();
        expect(firstTemp).toMatch(/\d+°/);
      });
    });
  });

  test.describe("Weather Component Responsiveness", () => {
    test("should adapt to different screen sizes", async ({ IoTDashboardPage }) => {
      const viewports = [
        { width: 375, height: 667, name: "Mobile" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 1200, height: 800, name: "Desktop" },
      ];

      for (const viewport of viewports) {
        await test.step(`Test weather component on ${viewport.name}`, async () => {
          await IoTDashboardPage.page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
          });

          await expect(IoTDashboardPage.weatherCard).toBeVisible();
          await expect(IoTDashboardPage.weatherLocation).toBeVisible();
          await expect(IoTDashboardPage.currentTemperature).toBeVisible();
        });
      }
    });

    test("should maintain readability at different zoom levels", async ({ IoTDashboardPage }) => {
      await test.step("Test at 150% zoom", async () => {
        await IoTDashboardPage.page.evaluate(() => {
          document.body.style.zoom = "1.5";
        });

        await expect(IoTDashboardPage.weatherCard).toBeVisible();
        const location = await IoTDashboardPage.getWeatherLocation();
        expect(location).toBeTruthy();
      });

      await test.step("Reset zoom", async () => {
        await IoTDashboardPage.page.evaluate(() => {
          document.body.style.zoom = "1";
        });
      });
    });
  });

  test.describe("Weather Component Data Validation", () => {
    test("should display realistic weather data", async ({ IoTDashboardPage }) => {
      await test.step("Verify temperature values are realistic", async () => {
        const currentTemp = await IoTDashboardPage.getCurrentTemperature();
        const tempValue = Number.parseInt(currentTemp.replace("°", ""));

        // Temperature should be within reasonable range (-50 to 60 Celsius)
        expect(tempValue).toBeGreaterThan(-50);
        expect(tempValue).toBeLessThan(60);
      });

      await test.step("Verify wind speed is realistic", async () => {
        const windElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "wind" });
        const windValue = await windElement.locator(".parameter-value").textContent();
        const windSpeed = Number.parseInt(windValue?.split(" ")[0] || "0");

        // Wind speed should be within reasonable range (0 to 200 km/h)
        expect(windSpeed).toBeGreaterThanOrEqual(0);
        expect(windSpeed).toBeLessThan(200);
      });

      await test.step("Verify humidity is within valid range", async () => {
        const humElement = IoTDashboardPage.page.locator(".parameter").filter({ hasText: "hum" });
        const humValue = await humElement.locator(".parameter-value").textContent();
        const humidity = Number.parseInt(humValue?.replace("%", "") || "0");

        // Humidity should be between 0 and 100 percent
        expect(humidity).toBeGreaterThanOrEqual(0);
        expect(humidity).toBeLessThanOrEqual(100);
      });
    });
  });
});
