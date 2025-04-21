import { test, expect } from "../fixtures/mainFixture";
import { NavigationTestData } from "../testData/navigationData";

export async function navigateAndVerify(pageManager, page: NavigationTestData) {
  await test.step(`Navigate to ${page.name} page`, async () => {
    await pageManager.navigateTo()[page.method]();
  });
  await test.step(`Verify URL is correct for ${page.name}`, async () => {
    await expect(pageManager.navigateTo().page).toHaveURL(page.url);
  });
}
