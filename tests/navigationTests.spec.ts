import { test, expect } from "../fixtures/baseFixture";
import { navigationPages } from "../testData/navigationData";

test.describe("Navigation Tests", () => {
  navigationPages.forEach((navPage) => {
    test(`should navigate to ${navPage.name} page`, async ({ pages }) => {
      await test.step(`Navigate to ${navPage.name} page`, async () => {
        await pages.navigationPage.navigateTo(navPage.url);

        await test.step(`Verify ${navPage.name} page loaded`, async () => {
          const currentUrl = pages.basePage.page.url();
          expect(currentUrl).toContain(navPage.url);
        });
      });
    });
  });
});
