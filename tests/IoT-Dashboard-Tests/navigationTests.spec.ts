import { expect, test } from "../../fixtures/baseFixture";
import { navigationPages } from "../../testData/navigationData";

test.describe("Navigation Tests", () => {
  for (const navPage of navigationPages) {
    test(`should navigate to ${navPage.name} page`, async ({ navigationPage, basePage }) => {
      await test.step(`Navigate to ${navPage.name} page`, async () => {
        await navigationPage.navigateTo(navPage.url);
        await test.step(`Verify ${navPage.name} page loaded`, async () => {
          const currentUrl = basePage.page.url();
          // Extract the path part from navPage.url to avoid double slash issues
          const expectedPath = navPage.url.replace(/^.*?\/\/.*?\//, "/");
          expect(currentUrl).toContain(expectedPath);
        });
      });
    });
  }
});
