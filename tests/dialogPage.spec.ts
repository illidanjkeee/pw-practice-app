import { test, expect } from "../fixtures/baseFixture";

test.describe("Modal Dialog Tests", () => {
  test.beforeEach(async ({ pages }) => {
    // Navigate to the dialog page
    await pages.basePage.navigateToHome();
    await pages.navigationPage.dialogPage();
  });

  test("should open and close dialog with template", async ({ dialogPage }) => {
    // Open dialog
    await dialogPage.openDialogWithTemplate();
    await dialogPage.waitForDialogToAppear();

    // Verify dialog is visible and has correct content
    expect(await dialogPage.isDialogVisible()).toBeTruthy();
    expect(await dialogPage.getDialogText()).toContain(
      "this is some additional data passed to dialog",
    );

    // Close dialog and verify it's closed
    await dialogPage.closeDialog();
    await dialogPage.waitForDialogToDisappear();
    expect(await dialogPage.isDialogVisible()).toBeFalsy();
  });

  test("should close dialog with escape key when ESC close is enabled", async ({
    dialogPage,
  }) => {
    // Open dialog with ESC close enabled and verify it's visible
    await dialogPage.openDialogWithEscClose();
    await dialogPage.waitForDialogToAppear();
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Close with ESC key and verify it's closed
    await dialogPage.closeDialogByEscKey();
    await dialogPage.waitForDialogToDisappear();
    expect(await dialogPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with escape key when ESC close is disabled", async ({
    dialogPage,
  }) => {
    const page = dialogPage.page;

    // Open dialog with ESC close disabled
    await dialogPage.openDialogWithoutEscClose();
    await dialogPage.waitForDialogToAppear();
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Try to close with ESC key - should still be visible
    await dialogPage.closeDialogByEscKey();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await dialogPage.closeDialog();
    await dialogPage.waitForDialogToDisappear();
  });

  test("should close dialog with backdrop click when enabled", async ({
    dialogPage,
  }) => {
    // Open dialog with backdrop click enabled
    await dialogPage.openDialogWithBackdropClick();
    await dialogPage.waitForDialogToAppear();
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Close with backdrop click and verify it's closed
    await dialogPage.closeDialogByClickingBackdrop();
    await dialogPage.waitForDialogToDisappear();
    expect(await dialogPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with backdrop click when disabled", async ({
    dialogPage,
  }) => {
    const page = dialogPage.page;

    // Open dialog with backdrop click disabled
    await dialogPage.openDialogWithoutBackdropClick();
    await dialogPage.waitForDialogToAppear();
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Try to close with backdrop click - should still be visible
    await dialogPage.closeDialogByClickingBackdrop();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await dialogPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await dialogPage.closeDialog();
    await dialogPage.waitForDialogToDisappear();
  });

  test("should add names to the list in the enter name dialog", async ({
    dialogPage,
  }) => {
    // Define test names
    const namesToAdd = ["Alice", "Bob", "Charlie"];

    // Add names one by one
    for (const name of namesToAdd) {
      // Open dialog
      await dialogPage.openEnterNameDialog();
      await dialogPage.waitForDialogToAppear();

      // Enter name and submit
      await dialogPage.enterNameAndSubmit(name);
      await dialogPage.waitForDialogToDisappear();
    }

    // Verify all names are added correctly
    const namesList = await dialogPage.getNamesList();
    expect(namesList.length).toEqual(namesToAdd.length);

    for (const name of namesToAdd) {
      expect(namesList).toContain(name);
    }
  });

  test("should not add name when cancelled", async ({ dialogPage }) => {
    // Get initial count of names
    const initialNamesCount = await dialogPage.getNamesCount();

    // Open dialog
    await dialogPage.openEnterNameDialog();
    await dialogPage.waitForDialogToAppear();

    // Enter name but cancel
    await dialogPage.enterNameAndCancel("Cancelled Name");
    await dialogPage.waitForDialogToDisappear();

    // Verify no name was added
    const finalNamesCount = await dialogPage.getNamesCount();
    expect(finalNamesCount).toEqual(initialNamesCount);
  });
});
