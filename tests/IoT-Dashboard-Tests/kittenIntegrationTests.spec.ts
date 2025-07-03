import { expect, test } from "../../fixtures/baseFixture";

test.describe("Kitten Integration Tests", () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test("should correctly display the Kitten card", async ({ IoTDashboardPage }) => {
    await test.step("Scroll to the Kitten card", async () => {
      await IoTDashboardPage.kittenCard.scrollIntoViewIfNeeded();
    });
    await test.step("Verify the Kitten card is visible", async () => {
      await expect(IoTDashboardPage.kittenCard).toBeVisible();
    });
    await test.step("Verify the Kitten card has the correct title", async () => {
      await expect(IoTDashboardPage.kittenCardTitle).toHaveText("UI Kitten");
    });
  });

  test("Verify the Kitten card has the correct description", async ({ IoTDashboardPage }) => {
    await test.step("Verify the Kitten card has the correct description", async () => {
      await expect(IoTDashboardPage.kittenDescription).toHaveText(
        "UI Kitten is a framework that contains a set of commonly used UI components styled in a similar way. The most awesome thing: you can change themes on the fly by just passing a different set of variables. 100% native. Give our kitten a try!",
      );
    });
  });

  test("Verify the Kitten card has the correct image", async ({ IoTDashboardPage }) => {
    await test.step("Verify the Kitten card has the correct image", async () => {
      const kittenImage = IoTDashboardPage.kittenImage;
      await expect(kittenImage).toBeVisible();
      await expect(kittenImage).toHaveAttribute("style", 'background-image: url("assets/images/kitten-default.png");');
    });
  });

  test("Verify the Kitten card has the correct links", async ({ IoTDashboardPage }) => {
    await test.step("Verify the Kitten card has the correct links", async () => {
      const kittenLinks = IoTDashboardPage.kittenLinks;
      await expect(kittenLinks).toHaveCount(4);
      const links = await kittenLinks.all();

      const expectedHrefs = [
        "https://akveo.github.io/react-native-ui-kitten?utm_campaign=ui_kitten%20-%20home%20-%20ngx_admin%20code%20embed&utm_source=ngx_admin&utm_medium=embedded&utm_content=iot_dashboard_kitten_card",
        "https://itunes.apple.com/us/app/kitten-tricks/id1246143230",
        "https://play.google.com/store/apps/details?id=com.akveo.kittenTricks",
        "https://github.com/akveo/react-native-ui-kitten",
      ];

      for (let i = 0; i < links.length; i++) {
        await expect(links[i]).toBeVisible();
        await expect(links[i]).toHaveAttribute("href", expectedHrefs[i]);
      }
    });
  });
});
