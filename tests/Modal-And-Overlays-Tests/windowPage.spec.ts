import { expect, test } from "../../fixtures/baseFixture";

test.describe("Modal & Overlays, Window Tests", () => {
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.windowPage();
  });

  test("should open and close modal window form", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowForm();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Fill in form fields", async () => {
      await windowPage.openWindowFormSubjectInput.fill("Test Subject");
      await windowPage.openWindowFormTextInput.fill("Test Text");
    });
  });

  test("should open window with template", async ({ windowPage }) => {
    await test.step("Open window with template", async () => {
      await windowPage.openWindowWithTemplate();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Verify window with template has some text", async () => {
      await expect(windowPage.windowContent).toHaveText('Here is the text provided via config: "some text to pass into template"');
    });
  });

  test("should open window with backdrop", async ({ windowPage }) => {
    await test.step("Open window with backdrop", async () => {
      await windowPage.openWindowWithBackdrop();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Verify window with backdrop has some text", async () => {
      await expect(windowPage.windowContent).toHaveText('Here is the text provided via config: "some text to pass into template"');
    });
  });

  test("should open window without backdrop", async ({ windowPage }) => {
    await test.step("Open window without backdrop", async () => {
      await windowPage.openWindowWithoutBackdrop();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Verify window without backdrop has some text", async () => {
      await expect(windowPage.withoutBackdropWindowBody).toHaveText("Disabled close on escape click.");
    });
  });

  test("should minimize window form", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowForm();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Minimize window form", async () => {
      await windowPage.minimizeWindow();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });
  });

  test("should collapse window form", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowForm();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Collapse window form", async () => {
      await windowPage.collapseWindow();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });

    await test.step("Verify window form is collapsed", async () => {
      await expect(windowPage.collapsedWindowCard).toBeVisible();
    });
  });

  test("should hide window form", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowForm();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Hide window form", async () => {
      await windowPage.hideWindow();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });
  });

  test("should open window form and close with escape key", async ({ windowPage }) => {
    await test.step("Open window form", async () => {
      await windowPage.openWindowForm();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Close window form with escape key", async () => {
      await windowPage.closeWindowWithEscape();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });
  });

  test("should open window with template and close with escape key", async ({ windowPage }) => {
    await test.step("Open window with template", async () => {
      await windowPage.openWindowWithTemplate();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Close window with template with escape key", async () => {
      await windowPage.closeWindowWithEscape();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });
  });

  test("should open window with backdrop and close with escape key", async ({ windowPage }) => {
    await test.step("Open window with backdrop", async () => {
      await windowPage.openWindowWithBackdrop();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Close window with backdrop with escape key", async () => {
      await windowPage.closeWindowWithEscape();
      await expect(windowPage.openWindowFormCard).toBeHidden();
    });
  });

  test("should open window without backdrop and NOT close with escape key", async ({ windowPage }) => {
    await test.step("Open window without backdrop", async () => {
      await windowPage.openWindowWithoutBackdrop();
      expect(await windowPage.waitForWindowToAppear());
    });
    await test.step("Close window without backdrop with escape key", async () => {
      await windowPage.closeWindowWithEscape();
      await expect(windowPage.withoutBackdropWindowBody).toBeVisible();
    });
  });
});
