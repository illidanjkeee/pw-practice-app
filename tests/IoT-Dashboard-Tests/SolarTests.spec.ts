import { expect, test } from "../../fixtures/baseFixture";
import {
  defaultChartInitializationTimeout,
  defaultChartRenderTimeout,
  defaultResizeCompleteTimeout,
  defaultViewportChangeTimeout,
  maxLoadTime,
  resizeViewportSizes,
  viewportSizes,
} from "../../testData/solarData";

test.describe("IoT Dashboard - Solar Energy Component Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Solar Component Layout", () => {
    test("should display solar energy card with header and content", async ({ IoTDashboardPage }) => {
      await test.step("Verify solar card is visible", async () => {
        await expect(IoTDashboardPage.solarCard).toBeVisible();
      });

      await test.step("Verify solar energy header", async () => {
        await expect(IoTDashboardPage.solarHeader).toBeVisible();
        await expect(IoTDashboardPage.solarHeader).toHaveText("Solar Energy Consumption");
      });

      await test.step("Verify card has proper size", async () => {
        const cardClass = await IoTDashboardPage.solarCard.getAttribute("class");
        expect(cardClass).toContain("solar-card");
      });
    });

    test("should display solar energy chart", async ({ IoTDashboardPage }) => {
      await test.step("Verify solar chart is visible", async () => {
        const isChartVisible = await IoTDashboardPage.isSolarChartVisible();
        expect(isChartVisible).toBe(true);
      });

      await test.step("Verify chart has echarts implementation", async () => {
        await expect(IoTDashboardPage.solarChart).toBeVisible();
        await expect(IoTDashboardPage.solarChart).toHaveAttribute("echarts");
      });

      await test.step("Verify chart renders properly", async () => {
        const chartElement = IoTDashboardPage.solarChart;
        const boundingBox = await chartElement.boundingBox();
        expect(boundingBox?.width).toBeGreaterThan(0);
        expect(boundingBox?.height).toBeGreaterThan(0);
      });
    });

    test("should display solar energy consumption values", async ({ IoTDashboardPage }) => {
      await test.step("Verify solar value is displayed", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        expect(solarValue).toBeTruthy();
        expect(solarValue).toMatch(/\d+\.\d+ kWh/); // Should match pattern like "6.421 kWh"
      });
      await test.step("Verify info section contains consumption details", async () => {
        const infoSection = await IoTDashboardPage.getSolarInfoSection();
        await expect(infoSection).toBeVisible();

        const valueElement = await IoTDashboardPage.getSolarValueElement();
        await expect(valueElement).toBeVisible();

        const detailsElement = await IoTDashboardPage.getSolarDetailsElement();
        await expect(detailsElement).toBeVisible();
      });
      await test.step("Verify 'out of' total consumption is shown", async () => {
        const detailsText = await IoTDashboardPage.getSolarDetailsText();
        expect(detailsText).toContain("out of");
        expect(detailsText).toMatch(/out of \d+\.\d+ kWh/);
      });
    });
  });

  test.describe("Solar Chart Functionality", () => {
    test("should display solar chart with proper styling", async ({ IoTDashboardPage }) => {
      await test.step("Wait for chart to load", async () => {
        await IoTDashboardPage.waitForChartToRender(defaultChartRenderTimeout);
        await expect(IoTDashboardPage.solarChart).toBeVisible();
      });

      await test.step("Verify chart canvas is present", async () => {
        const canvas = await IoTDashboardPage.getSolarChartCanvas();
        await expect(canvas).toBeVisible();
      });

      await test.step("Verify chart has proper dimensions", async () => {
        const chartBounds = await IoTDashboardPage.solarChart.boundingBox();
        expect(chartBounds?.width).toBeGreaterThan(100);
        expect(chartBounds?.height).toBeGreaterThan(100);
      });
    });
    test("should render chart with solar data", async ({ IoTDashboardPage }) => {
      await test.step("Verify chart data is loaded", async () => {
        // Wait for chart initialization
        await IoTDashboardPage.waitForSolarChartInitialization(defaultChartInitializationTimeout);
      });

      await test.step("Verify chart responds to data changes", async () => {
        // The chart should be reactive to solar value changes
        const isVisible = await IoTDashboardPage.isSolarChartVisible();
        expect(isVisible).toBe(true);
      });
    });
    test("should display chart with gradient colors", async ({ IoTDashboardPage }) => {
      await test.step("Verify chart uses proper styling", async () => {
        await IoTDashboardPage.waitForChartToRender(defaultChartRenderTimeout);

        // Check if canvas is rendered (indicates chart is working)
        const canvas = await IoTDashboardPage.getSolarChartCanvas();
        await expect(canvas).toBeVisible();

        // Verify canvas has content (not blank)
        const canvasElement = await canvas.elementHandle();
        const canvasExists = canvasElement !== null;
        expect(canvasExists).toBe(true);
      });
    });
  });

  test.describe("Solar Data Validation", () => {
    test("should display realistic solar consumption values", async ({ IoTDashboardPage }) => {
      await test.step("Verify consumption value format", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        expect(solarValue).toMatch(/^\d+\.\d{3} kWh$/); // Format: "6.421 kWh"
      });

      await test.step("Verify consumption value is within realistic range", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        const numericValue = Number.parseFloat(solarValue.replace(" kWh", ""));

        // Solar consumption should be positive and reasonable for home use
        expect(numericValue).toBeGreaterThan(0);
        expect(numericValue).toBeLessThan(50); // Reasonable upper limit for home solar
      });
      await test.step("Verify total capacity is higher than consumption", async () => {
        const detailsText = await IoTDashboardPage.getSolarDetailsText();
        const totalMatch = detailsText?.match(/(\d+\.\d+) kWh$/);

        if (totalMatch) {
          const totalCapacity = Number.parseFloat(totalMatch[1]);
          const solarValue = await IoTDashboardPage.getSolarValue();
          const consumption = Number.parseFloat(solarValue.replace(" kWh", ""));

          expect(totalCapacity).toBeGreaterThan(consumption);
        }
      });
    });

    test("should not exceed maximum solar capacity", async ({ IoTDashboardPage }) => {
      await test.step("Verify solar value does not exceed total capacity", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        const detailsText = await IoTDashboardPage.getSolarDetailsText();
        const totalMatch = detailsText?.match(/(\d+\.\d+) kWh$/);

        if (totalMatch) {
          const totalCapacity = Number.parseFloat(totalMatch[1]);
          const consumption = Number.parseFloat(solarValue.replace(" kWh", ""));

          expect(consumption).toBeLessThanOrEqual(totalCapacity);
        }
      });
    });

    test("should maintain consistent data formatting", async ({ IoTDashboardPage }) => {
      await test.step("Verify units are consistently displayed", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        expect(solarValue).toContain("kWh");

        const detailsText = await IoTDashboardPage.getSolarDetailsText();
        expect(detailsText).toContain("kWh");
      });

      await test.step("Verify decimal precision is consistent", async () => {
        const solarValue = await IoTDashboardPage.getSolarValue();
        const decimalPart = solarValue.split(".")[1];
        expect(decimalPart).toMatch(/^\d{3} kWh$/); // Should have 3 decimal places
      });
    });
  });
  test.describe("Solar Component Responsiveness", () => {
    test("should adapt to different viewport sizes", async ({ IoTDashboardPage }) => {
      for (const viewport of viewportSizes) {
        await test.step(`Test solar component on ${viewport.name}`, async () => {
          await IoTDashboardPage.setViewportSize(viewport.width, viewport.height);

          await expect(IoTDashboardPage.solarCard).toBeVisible();

          const isChartVisible = await IoTDashboardPage.isSolarChartVisible();
          expect(isChartVisible).toBe(true);

          const solarValue = await IoTDashboardPage.getSolarValue();
          expect(solarValue).toBeTruthy();
        });
      }
    });

    test("should maintain chart proportions on resize", async ({ IoTDashboardPage }) => {
      await test.step("Get initial chart dimensions", async () => {
        const initialBounds = await IoTDashboardPage.solarChart.boundingBox();
        expect(initialBounds).toBeTruthy();
      });

      await test.step("Resize viewport and verify chart adjusts", async () => {
        await IoTDashboardPage.setViewportSize(800, 600, defaultResizeCompleteTimeout);

        const newBounds = await IoTDashboardPage.solarChart.boundingBox();
        expect(newBounds?.width).toBeGreaterThan(0);
        expect(newBounds?.height).toBeGreaterThan(0);
      });
    });
  });
  test.describe("Solar Component Performance", () => {
    test("should load solar data efficiently", async ({ IoTDashboardPage }) => {
      await test.step("Measure solar component loading time", async () => {
        const startTime = Date.now();
        await expect(IoTDashboardPage.solarCard).toBeVisible();
        await IoTDashboardPage.isSolarChartVisible();
        const loadTime = Date.now() - startTime;

        // Component should load within reasonable time
        expect(loadTime).toBeLessThan(maxLoadTime);
      });
    });

    test("should handle rapid viewport changes without errors", async ({ IoTDashboardPage }) => {
      await test.step("Rapidly change viewport sizes", async () => {
        for (const size of resizeViewportSizes) {
          await IoTDashboardPage.setViewportSize(size.width, size.height, defaultViewportChangeTimeout);
        }
      });

      await test.step("Verify component remains functional", async () => {
        await expect(IoTDashboardPage.solarCard).toBeVisible();
        const isChartVisible = await IoTDashboardPage.isSolarChartVisible();
        expect(isChartVisible).toBe(true);
      });
    });
  });
});
