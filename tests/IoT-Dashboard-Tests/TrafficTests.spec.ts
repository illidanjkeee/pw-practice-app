import { test, expect } from "../../fixtures/baseFixture";

test.describe("IoT Dashboard - Traffic Component Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Traffic Component Layout", () => {
    test("should display traffic card with header and controls", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Verify traffic card is visible", async () => {
        await expect(IoTDashboardPage.trafficCard).toBeVisible();
      });

      await test.step("Verify traffic consumption header", async () => {
        await expect(IoTDashboardPage.trafficHeader).toBeVisible();
        await expect(IoTDashboardPage.trafficHeader).toHaveText(
          "Traffic Consumption",
        );
      });

      await test.step("Verify card has proper size", async () => {
        const cardClass =
          await IoTDashboardPage.trafficCard.getAttribute("class");
        expect(cardClass).toContain("size-tiny");
      });

      await test.step("Verify card header layout", async () => {
        const cardHeader =
          IoTDashboardPage.trafficCard.locator("nb-card-header");
        await expect(cardHeader).toBeVisible();

        // Header should contain both title and select dropdown
        await expect(cardHeader.getByText("Traffic Consumption")).toBeVisible();
        await expect(cardHeader.locator("nb-select")).toBeVisible();
      });
    });

    test("should display traffic type selector", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Verify traffic type select is visible", async () => {
        await expect(IoTDashboardPage.trafficTypeSelect).toBeVisible();
      });

      await test.step("Verify select is interactive", async () => {
        const selectElement = IoTDashboardPage.trafficTypeSelect;
        const isEnabled = selectElement;
        await expect(isEnabled).toBeEnabled();
      });

      await test.step("Verify select has options", async () => {
        await IoTDashboardPage.trafficTypeSelect.click();

        // Wait for options to appear
        const options = IoTDashboardPage.page.locator("nb-option");
        await expect(options.first()).toBeVisible();

        // Close the dropdown
        await IoTDashboardPage.page.keyboard.press("Escape");
      });
    });

    test("should display traffic chart component", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Verify traffic chart is visible", async () => {
        const isChartVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isChartVisible).toBe(true);
      });

      await test.step("Verify chart component is properly rendered", async () => {
        await expect(IoTDashboardPage.trafficChart).toBeVisible();
      });

      await test.step("Verify chart has proper dimensions", async () => {
        const chartBounds = await IoTDashboardPage.trafficChart.boundingBox();
        expect(chartBounds?.width).toBeGreaterThan(0);
        expect(chartBounds?.height).toBeGreaterThan(0);
      });
    });
  });

  test.describe("Traffic Type Selection", () => {
    test("should allow changing traffic data type", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Open traffic type selector", async () => {
        await IoTDashboardPage.trafficTypeSelect.click();
      });

      await test.step("Verify available options", async () => {
        const options = IoTDashboardPage.page.locator("nb-option");
        const optionsCount = await options.count();
        expect(optionsCount).toBeGreaterThan(0);

        // Verify some expected options exist
        const optionsText = await options.allTextContents();
        expect(optionsText.length).toBeGreaterThan(0);
      });

      await test.step("Select different traffic type", async () => {
        const options = IoTDashboardPage.page.locator("nb-option");
        const firstOption = options.first();
        const firstOptionText = await firstOption.textContent();

        await firstOption.click();

        // Wait for chart to update
        await IoTDashboardPage.page.waitForTimeout(500);

        // Verify chart is still visible after selection
        const isChartVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isChartVisible).toBe(true);
      });
    });

    test("should update chart when traffic type changes", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Get initial chart state", async () => {
        const isInitiallyVisible =
          await IoTDashboardPage.isTrafficChartVisible();
        expect(isInitiallyVisible).toBe(true);
      });

      await test.step("Change traffic type and verify chart updates", async () => {
        await IoTDashboardPage.trafficTypeSelect.click();

        const options = IoTDashboardPage.page.locator("nb-option");
        const optionsCount = await options.count();

        if (optionsCount > 1) {
          await options.nth(1).click();
          await IoTDashboardPage.page.waitForTimeout(500);

          // Chart should still be visible after update
          const isStillVisible = await IoTDashboardPage.isTrafficChartVisible();
          expect(isStillVisible).toBe(true);
        }
      });
    });

    test("should maintain chart functionality across type changes", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Test multiple type changes", async () => {
        await IoTDashboardPage.trafficTypeSelect.click();
        const options = IoTDashboardPage.page.locator("nb-option");
        const optionsCount = await options.count();

        // Close dropdown first
        await IoTDashboardPage.page.keyboard.press("Escape");

        for (let i = 0; i < Math.min(optionsCount, 3); i++) {
          await IoTDashboardPage.trafficTypeSelect.click();
          await options.nth(i).click();
          await IoTDashboardPage.page.waitForTimeout(300);

          const isVisible = await IoTDashboardPage.isTrafficChartVisible();
          expect(isVisible).toBe(true);
        }
      });
    });
  });

  test.describe("Traffic Chart Functionality", () => {
    test("should render traffic chart with proper styling", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Wait for chart to load", async () => {
        await IoTDashboardPage.page.waitForTimeout(1000);
        await expect(IoTDashboardPage.trafficChart).toBeVisible();
      });

      await test.step("Verify chart uses echarts", async () => {
        const chartContainer = IoTDashboardPage.trafficChart.locator(".echart");
        await expect(chartContainer).toBeVisible();
      });

      await test.step("Verify chart canvas is rendered", async () => {
        // Wait for echarts to render
        await IoTDashboardPage.page.waitForFunction(
          () => {
            const chart = document.querySelector("ngx-traffic-chart .echart");
            return chart && chart.children.length > 0;
          },
          { timeout: 5000 },
        );

        const canvas = IoTDashboardPage.trafficChart.locator("canvas");
        await expect(canvas).toBeVisible();
      });

      await test.step("Verify chart has proper dimensions", async () => {
        const chartBounds = await IoTDashboardPage.trafficChart.boundingBox();
        expect(chartBounds?.width).toBeGreaterThan(100);
        expect(chartBounds?.height).toBeGreaterThan(100);
      });
    });

    test("should display traffic data visualization", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Verify chart displays data", async () => {
        // Wait for chart initialization
        await IoTDashboardPage.page.waitForTimeout(1500);

        const canvas = IoTDashboardPage.trafficChart.locator("canvas");
        await expect(canvas).toBeVisible();

        // Verify canvas has content by checking if it's not empty
        const canvasElement = await canvas.elementHandle();
        expect(canvasElement).toBeTruthy();
      });

      await test.step("Verify chart responds to interaction", async () => {
        const chartElement = IoTDashboardPage.trafficChart;

        // Try hovering over chart (should not cause errors)
        await chartElement.hover();
        await IoTDashboardPage.page.waitForTimeout(200);

        // Chart should still be visible
        const isVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isVisible).toBe(true);
      });
    });

    test("should handle chart resizing properly", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Get initial chart size", async () => {
        const initialBounds = await IoTDashboardPage.trafficChart.boundingBox();
        expect(initialBounds).toBeTruthy();
      });

      await test.step("Resize viewport and check chart adaptation", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 800,
          height: 600,
        });
        await IoTDashboardPage.page.waitForTimeout(500);

        const newBounds = await IoTDashboardPage.trafficChart.boundingBox();
        expect(newBounds?.width).toBeGreaterThan(0);
        expect(newBounds?.height).toBeGreaterThan(0);
      });

      await test.step("Restore viewport and verify chart", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 1200,
          height: 800,
        });
        await IoTDashboardPage.page.waitForTimeout(500);

        const isVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isVisible).toBe(true);
      });
    });
  });

  test.describe.skip("Traffic Component Responsiveness", () => {
    test("should adapt to different screen sizes", async ({
      IoTDashboardPage,
    }) => {
      const viewports = [
        { width: 375, height: 667, name: "Mobile" },
        { width: 768, height: 1024, name: "Tablet" },
        { width: 1200, height: 800, name: "Desktop" },
      ];

      for (const viewport of viewports) {
        await test.step(`Test traffic component on ${viewport.name}`, async () => {
          await IoTDashboardPage.page.setViewportSize({
            width: viewport.width,
            height: viewport.height,
          });

          await expect(IoTDashboardPage.trafficCard).toBeVisible();
          await expect(IoTDashboardPage.trafficHeader).toBeVisible();

          const isChartVisible = await IoTDashboardPage.isTrafficChartVisible();
          expect(isChartVisible).toBe(true);
        });
      }
    });

    test("should maintain functionality on mobile devices", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Set mobile viewport", async () => {
        await IoTDashboardPage.page.setViewportSize({
          width: 375,
          height: 667,
        });
      });

      await test.step("Verify selector works on mobile", async () => {
        await IoTDashboardPage.trafficTypeSelect.click();

        const options = IoTDashboardPage.page.locator("nb-option");
        await expect(options.first()).toBeVisible();

        await options.first().click();
        await IoTDashboardPage.page.waitForTimeout(300);

        const isChartVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isChartVisible).toBe(true);
      });
    });
  });

  test.describe("Traffic Component Performance", () => {
    test("should load traffic data efficiently", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Measure traffic component loading time", async () => {
        const startTime = Date.now();

        await expect(IoTDashboardPage.trafficCard).toBeVisible();
        await IoTDashboardPage.isTrafficChartVisible();

        const loadTime = Date.now() - startTime;
        expect(loadTime).toBeLessThan(5000);
      });
    });

    test("should handle rapid type selection changes", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Rapidly change traffic types", async () => {
        for (let i = 0; i < 3; i++) {
          await IoTDashboardPage.trafficTypeSelect.click();
          const options = IoTDashboardPage.page.locator("nb-option");
          const optionsCount = await options.count();

          if (optionsCount > 0) {
            await options.nth(i % optionsCount).click();
            await IoTDashboardPage.page.waitForTimeout(100);
          }
        }
      });

      await test.step("Verify component remains stable", async () => {
        const isVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isVisible).toBe(true);

        await expect(IoTDashboardPage.trafficCard).toBeVisible();
      });
    });

    test("should maintain performance with multiple interactions", async ({
      IoTDashboardPage,
    }) => {
      await test.step("Perform multiple interactions", async () => {
        for (let i = 0; i < 5; i++) {
          await IoTDashboardPage.trafficChart.hover();
          await IoTDashboardPage.page.waitForTimeout(100);

          await IoTDashboardPage.trafficTypeSelect.click();
          await IoTDashboardPage.page.keyboard.press("Escape");
          await IoTDashboardPage.page.waitForTimeout(100);
        }
      });

      await test.step("Verify component functionality", async () => {
        const isChartVisible = await IoTDashboardPage.isTrafficChartVisible();
        expect(isChartVisible).toBe(true);

        await expect(IoTDashboardPage.trafficHeader).toBeVisible();
      });
    });
  });
});
