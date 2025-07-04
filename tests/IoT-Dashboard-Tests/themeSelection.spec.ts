import { expect, test } from "../../fixtures/baseFixture";

test.describe("Theme Selection Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await test.step("Navigate to home page for test setup", async () => {
      await basePage.navigateToHome();
    });
  });

  test("Theme dropdown changes header color", async ({ headerPage }) => {
    await test.step("Test different theme colors", async () => {
      const colorsPerTheme = [
        { theme: "Light", color: "rgb(255, 255, 255)" },
        { theme: "Dark", color: "rgb(34, 43, 69)" },
        { theme: "Cosmic", color: "rgb(50, 50, 89)" },
        { theme: "Corporate", color: "rgb(255, 255, 255)" },
      ];

      for (const { theme, color } of colorsPerTheme) {
        await test.step(`Test ${theme} theme`, async () => {
          await headerPage.selectTheme(theme);
          await headerPage.verifyHeaderColor(color);
        });
      }
    });
  });

  test("Dropdown list content", async ({ headerPage }) => {
    await test.step("Open dropdown and verify options", async () => {
      await headerPage.openThemeDropdown();
      await headerPage.verifyDropdownOptions(["Light", "Dark", "Cosmic", "Corporate"]);
    });
  });

  test("Theme persistence across page refresh", async ({ headerPage, page }) => {
    test.skip(page.context().browser().browserType().name() === "webkit", "Skipping for WebKit due to page reload timeout issues");

    await test.step("Select a non-default theme", async () => {
      await headerPage.selectTheme("Dark");
      await headerPage.verifyHeaderColor("rgb(34, 43, 69)");

      await test.step("Verify theme is saved to localStorage", async () => {
        const themeStorage = await page.evaluate(() => {
          return localStorage.getItem("selectedTheme") || null;
        });
        expect(themeStorage).toBe("dark");
      });
    });

    await test.step("Refresh the page", async () => {
      await page.reload({ timeout: 15000 });
      await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
    });

    await test.step("Verify theme persistence", async () => {
      await headerPage.verifyHeaderColor("rgb(34, 43, 69)");
      await headerPage.verifySelectedTheme("Dark");
    });
  });
});
