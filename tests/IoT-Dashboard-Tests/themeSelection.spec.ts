import { expect, test } from "../../fixtures/baseFixture";

test.describe("Theme Selection Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await test.step("Navigate to home page for test setup", async () => {
      await basePage.navigateToHome();
    });
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
          await test.step("Select theme from dropdown", async () => {
            const dropDownMenu = page.locator("ngx-header nb-select");
            await dropDownMenu.click();
            await page.locator("nb-option-list nb-option").filter({ hasText: theme }).click();
          });

          await test.step("Verify header background color", async () => {
            const header = page.locator("nb-layout-header");
            await expect(header).toHaveCSS("background-color", color);
          });
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
      await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
    });
  });

  test("Theme persistence across page refresh", async ({ navigationPage }) => {
    const page = navigationPage.page;

    test.skip(page.context().browser().browserType().name() === "webkit", "Skipping for WebKit due to page reload timeout issues");

    await test.step("Select a non-default theme", async () => {
      const dropDownMenu = page.locator("ngx-header nb-select");
      await dropDownMenu.click();

      await page.locator("nb-option-list nb-option").filter({ hasText: "Dark" }).click();

      const header = page.locator("nb-layout-header");
      await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");

      await test.step("Verify theme is saved to localStorage", async () => {
        const themeStorage = await page.evaluate(() => {
          return localStorage.getItem("selectedTheme") || null;
        });
        expect(themeStorage).toBe("dark");
      });
    });

    await test.step("Refresh the page", async () => {
      await page.reload({ timeout: 15000 });
      await page.waitForLoadState("networkidle", { timeout: 15000 });
    });

    await test.step("Verify theme persistence", async () => {
      await test.step("Check the header color after refresh", async () => {
        const header = page.locator("nb-layout-header");
        await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)");
      });

      await test.step("Verify dropdown shows the correct theme", async () => {
        const selectedTheme = page.locator("ngx-header nb-select");
        await expect(selectedTheme).toHaveText("Dark");
      });
    });
  });
});
