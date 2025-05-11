import { test, expect } from "../fixtures/baseFixture";

test.describe("Modal Window Tests", () => {
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.windowPage();
  });

  test("should open and close modal window form", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowFormButton.click();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Fill in form fields", async () => {
      await windowPage.openWindowFormSubjectInput.fill("Test Subject");
      await windowPage.openWindowFormTextInput.fill("Test Text");
    });
  });
});
