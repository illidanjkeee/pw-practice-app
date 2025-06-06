import { expect, test } from "../../fixtures/baseFixture";
import { navigationPages } from "../../testData/navigationData";

test.describe("Navigation Tests", () => {
  for (const navPage of navigationPages) {
    test(`should navigate to ${navPage.name} page`, async ({ navigationPage, basePage }) => {
      await test.step(`Navigate to ${navPage.name} page`, async () => {
        await navigationPage.navigateTo(navPage.url);
        await test.step(`Verify ${navPage.name} page loaded`, async () => {
          const currentUrl = basePage.page.url();
          // Get just the path part after the domain
          const urlParts = navPage.url.split("/pages/");
          const expectedPath = `/pages/${urlParts[1]}`;
          expect(currentUrl).toContain(expectedPath);
        });
      });
    });
  }
});
