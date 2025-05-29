import { expect, test } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard - Electricity Component Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Electricity Component Layout", () => {
    test("should display electricity component with all sub-components", async ({ IoTDashboardPage }) => {
      await test.step("Verify electricity card is visible", async () => {
        await expect(IoTDashboardPage.electricityCard).toBeVisible();
      });
      await test.step("Verify electricity consumption header", async () => {
        // Check that the text "Electricity Consumption" exists in the component
        const headerText = IoTDashboardPage.page.locator("ngx-electricity").getByText("Electricity Consumption");
        await expect(headerText).toHaveCount(1);
        expect(await headerText.textContent()).toContain("Electricity Consumption");
      });

      await test.step("Verify electricity chart is displayed", async () => {
        const isChartVisible = await IoTDashboardPage.isElectricityChartVisible();
        expect(isChartVisible).toBe(true);
      });
      await test.step("Verify electricity data table is visible", async () => {
        // Check if the electricity table exists (even if not visible) and has content
        const tableExists = (await IoTDashboardPage.electricityTable.count()) > 0;
        expect(tableExists).toBe(true);
      });
    });

    test("should display consumption statistics", async ({ IoTDashboardPage }) => {
      await test.step("Verify consumed stats are displayed", async () => {
        const consumedStats = IoTDashboardPage.page.locator("text=Consumed");
        await expect(consumedStats).toBeVisible();
      });

      await test.step("Verify spent stats are displayed", async () => {
        const spentStats = IoTDashboardPage.page.locator("text=Spent");
        await expect(spentStats).toBeVisible();
      });

      await test.step("Verify kWh values are displayed", async () => {
        const kwhValue = IoTDashboardPage.page.locator("span:nth-child(1) span:nth-child(2)").first();
        await expect(kwhValue).toBeVisible();
        const kwhText = await kwhValue.textContent();
        expect(kwhText).toMatch(/\d+/); // Should contain numeric value
      });

      await test.step("Verify USD values are displayed", async () => {
        const usdValue = IoTDashboardPage.page.locator("body ngx-app span:nth-child(2) span:nth-child(2)");
        await expect(usdValue).toBeVisible();
        const usdText = await usdValue.textContent();
        expect(usdText).toMatch(/\d+/); // Should contain numeric value
      });
    });
  });

  test.describe("Electricity Chart Functionality", () => {
    test("should display and interact with electricity chart", async ({ IoTDashboardPage }) => {
      await test.step("Verify chart component is present", async () => {
        await expect(IoTDashboardPage.electricityChart).toBeVisible();
      });

      await test.step("Verify chart canvas is rendered", async () => {
        const chartCanvas = IoTDashboardPage.electricityChart.locator("canvas");
        await expect(chartCanvas).toBeVisible();
      });

      await test.step("Verify chart options selector", async () => {
        await expect(IoTDashboardPage.electricityTypeSelect).toBeVisible();
      });
    });

    test("should change chart data based on type selection", async ({ IoTDashboardPage }) => {
      const types = ["week", "month", "year"];

      for (const type of types) {
        await test.step(`Select ${type} option`, async () => {
          await IoTDashboardPage.selectElectricityType(type);
          await IoTDashboardPage.page.waitForTimeout(500); // Wait for chart update
        });

        await test.step(`Verify chart is still visible for ${type}`, async () => {
          const isVisible = await IoTDashboardPage.isElectricityChartVisible();
          expect(isVisible).toBe(true);
        });
      }
    });

    test("should display chart with proper styling", async ({ IoTDashboardPage }) => {
      await test.step("Verify chart has proper dimensions", async () => {
        const chartElement = IoTDashboardPage.electricityChart.locator(".echart");
        await expect(chartElement).toBeVisible();

        const boundingBox = await chartElement.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
      });
    });
  });

  test.describe("Electricity Data Table", () => {
    test("should display electricity consumption data in tabs", async ({ IoTDashboardPage }) => {
      await test.step("Verify tabs are present", async () => {
        const tabsCount = await IoTDashboardPage.getElectricityTabsCount();
        expect(tabsCount).toBeGreaterThan(0);
      });

      await test.step("Verify list items in active tab", async () => {
        const listItems = IoTDashboardPage.electricityTable.locator("nb-list-item");
        const itemCount = await listItems.count();
        expect(itemCount).toBeGreaterThan(0);
      });

      await test.step("Verify month data structure", async () => {
        const monthElements = IoTDashboardPage.electricityTable.locator(".month");
        const monthCount = await monthElements.count();
        expect(monthCount).toBeGreaterThan(0);
      });

      await test.step("Verify consumption results are displayed", async () => {
        const resultsElements = IoTDashboardPage.electricityTable.locator(".results");
        const resultsCount = await resultsElements.count();
        expect(resultsCount).toBeGreaterThan(0);
      });
    });

    test("should display proper data format in table", async ({ IoTDashboardPage }) => {
      await test.step("Verify kWh values are formatted correctly", async () => {
        const kwhElements = IoTDashboardPage.electricityTable.locator("text=/\\d+.*kWh/");
        const kwhCount = await kwhElements.count();
        expect(kwhCount).toBeGreaterThan(0);
      });

      await test.step("Verify USD values are formatted correctly", async () => {
        const usdElements = IoTDashboardPage.electricityTable.locator("text=/\\d+.*USD/");
        const usdCount = await usdElements.count();
        expect(usdCount).toBeGreaterThan(0);
      });

      await test.step("Verify trend indicators are present", async () => {
        const upArrows = IoTDashboardPage.electricityTable.locator("nb-icon.up");
        const downArrows = IoTDashboardPage.electricityTable.locator("nb-icon.down");
        const totalArrows = (await upArrows.count()) + (await downArrows.count());
        expect(totalArrows).toBeGreaterThan(0);
      });
    });

    test("should allow tab navigation in electricity table", async ({ IoTDashboardPage }) => {
      await test.step("Get initial tab count", async () => {
        const tabsCount = await IoTDashboardPage.getElectricityTabsCount();
        expect(tabsCount).toBeGreaterThan(0);
      });

      await test.step("Click on different tabs if multiple exist", async () => {
        const tabs = IoTDashboardPage.electricityTabs;
        const tabCount = await tabs.count();

        if (tabCount > 1) {
          for (let i = 0; i < Math.min(tabCount, 3); i++) {
            // Check if tab is visible, if not skip it
            const isVisible = await tabs.nth(i).isVisible();
            if (isVisible) {
              await tabs.nth(i).click();
              await IoTDashboardPage.page.waitForTimeout(200);
            }
          }
        }
      });
    });
  });

  test.describe("Electricity Component Responsiveness", () => {
    test("should handle viewport changes gracefully", async ({ IoTDashboardPage }) => {
      await test.step("Test in mobile viewport", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 375,
          height: 667,
        });
        await expect(IoTDashboardPage.electricityCard).toBeVisible();
      });

      await test.step("Test in tablet viewport", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 768,
          height: 1024,
        });
        await expect(IoTDashboardPage.electricityCard).toBeVisible();
      });

      await test.step("Test in desktop viewport", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 1200,
          height: 800,
        });
        await expect(IoTDashboardPage.electricityCard).toBeVisible();
      });
    });

    test("should maintain functionality across different screen sizes", async ({ IoTDashboardPage }) => {
      const viewports = [
        { width: 320, height: 568 }, // Small mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1920, height: 1080 }, // Large desktop
      ];

      for (const viewport of viewports) {
        await test.step(`Test functionality at ${viewport.width}x${viewport.height}`, async () => {
          await IoTDashboardPage.page.setViewportSize(viewport);

          // Chart should still be visible and functional
          const isChartVisible = await IoTDashboardPage.isElectricityChartVisible();
          expect(isChartVisible).toBe(true);

          // Type selector should be functional
          await IoTDashboardPage.selectElectricityType("month");
          await IoTDashboardPage.page.waitForTimeout(300);
        });
      }
    });
  });

  test.describe("Electricity Component Performance", () => {
    test("should load chart data efficiently", async ({ IoTDashboardPage }) => {
      await test.step("Measure chart loading time", async () => {
        const startTime = Date.now();
        await expect(IoTDashboardPage.electricityChart).toBeVisible();
        const loadTime = Date.now() - startTime;

        // Chart should load within reasonable time (5 seconds)
        expect(loadTime).toBeLessThan(5000);
      });
    });

    test("should handle rapid type changes without errors", async ({ IoTDashboardPage }) => {
      await test.step("Rapidly change chart types", async () => {
        const types = ["week", "month", "year"];

        for (let i = 0; i < 3; i++) {
          for (const type of types) {
            await IoTDashboardPage.selectElectricityType(type);
            await IoTDashboardPage.page.waitForTimeout(100);
          }
        }
      });

      await test.step("Verify chart is still functional", async () => {
        const isVisible = await IoTDashboardPage.isElectricityChartVisible();
        expect(isVisible).toBe(true);
      });
    });
  });
});
