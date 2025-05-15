import { test, expect } from "../../fixtures/baseFixture";

test.describe("Theme Selection Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("Theme dropdown changes header color", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step("Test different theme colors", async () => {
      const colorsPerTheme = [
        { theme: "Light", color: "rgb(255, 255, 255)" },
        { theme: "Dark", color: "rgb(34, 43, 69)" },
        { theme: "Cosmic", color: "rgb(50, 50, 89)" },
        { theme: "Corporate", color: "rgb(255, 255, 255)" },
      ];

      for (const { theme, color } of colorsPerTheme) {
        await test.step(`Test ${theme} theme`, async () => {
          // Select theme
          const dropDownMenu = page.locator("ngx-header nb-select");
          await dropDownMenu.click();
          await page
            .locator("nb-option-list nb-option")
            .filter({ hasText: theme })
            .click();

          // Verify color
          const header = page.locator("nb-layout-header");
          await expect(header).toHaveCSS("background-color", color);
        });
      }
    });
  });

  test("Dropdown list content", async ({ navigationPage }) => {
    const page = navigationPage.page;

    await test.step("Open dropdown menu", async () => {
      const dropDownMenu = page.locator("ngx-header nb-select");
      await dropDownMenu.click();
    });

    await test.step("Verify dropdown options", async () => {
      const optionList = page.locator("nb-option-list nb-option");
      await expect(optionList).toHaveText([
        "Light",
        "Dark",
        "Cosmic",
        "Corporate",
      ]);
    });
  });
});
