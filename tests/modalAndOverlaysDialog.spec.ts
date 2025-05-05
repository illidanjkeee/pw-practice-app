import { test, expect } from "../fixtures/baseFixture";

test.describe("Modal Dialog Tests", () => {
  test.beforeEach(async ({ pages }) => {
    // Navigate to the dialog page
    await pages.basePage.navigateToHome();
    await pages.navigationPage.dialogPage();
  });

  test("should open and close dialog with template", async ({ pages }) => {
    // Open dialog
    await pages.modalOverlaysPage.openDialogWithTemplate();
    await pages.modalOverlaysPage.waitForDialogToAppear();

    // Verify dialog is visible and has correct content
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();
    expect(await pages.modalOverlaysPage.getDialogText()).toContain(
      "this is some additional data passed to dialog",
    );

    // Close dialog and verify it's closed
    await pages.modalOverlaysPage.closeDialog();
    await pages.modalOverlaysPage.waitForDialogToDisappear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should close dialog with escape key when ESC close is enabled", async ({
    pages,
  }) => {
    // Open dialog with ESC close enabled and verify it's visible
    await pages.modalOverlaysPage.openDialogWithEscClose();
    await pages.modalOverlaysPage.waitForDialogToAppear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Close with ESC key and verify it's closed
    await pages.modalOverlaysPage.closeDialogByEscKey();
    await pages.modalOverlaysPage.waitForDialogToDisappear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with escape key when ESC close is disabled", async ({
    pages,
  }) => {
    const page = pages.navigationPage.page;

    // Open dialog with ESC close disabled
    await pages.modalOverlaysPage.openDialogWithoutEscClose();
    await pages.modalOverlaysPage.waitForDialogToAppear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Try to close with ESC key - should still be visible
    await pages.modalOverlaysPage.closeDialogByEscKey();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await pages.modalOverlaysPage.closeDialog();
    await pages.modalOverlaysPage.waitForDialogToDisappear();
  });

  test("should close dialog with backdrop click when enabled", async ({
    pages,
  }) => {
    // Open dialog with backdrop click enabled
    await pages.modalOverlaysPage.openDialogWithBackdropClick();
    await pages.modalOverlaysPage.waitForDialogToAppear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Close with backdrop click and verify it's closed
    await pages.modalOverlaysPage.closeDialogByClickingBackdrop();
    await pages.modalOverlaysPage.waitForDialogToDisappear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with backdrop click when disabled", async ({
    pages,
  }) => {
    const page = pages.navigationPage.page;

    // Open dialog with backdrop click disabled
    await pages.modalOverlaysPage.openDialogWithoutBackdropClick();
    await pages.modalOverlaysPage.waitForDialogToAppear();
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Try to close with backdrop click - should still be visible
    await pages.modalOverlaysPage.closeDialogByClickingBackdrop();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await pages.modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await pages.modalOverlaysPage.closeDialog();
    await pages.modalOverlaysPage.waitForDialogToDisappear();
  });

  test("should add names to the list in the enter name dialog", async ({
    pages,
  }) => {
    // Define test names
    const namesToAdd = ["Alice", "Bob", "Charlie"];

    // Add names one by one
    for (const name of namesToAdd) {
      // Open dialog
      await pages.modalOverlaysPage.openEnterNameDialog();
      await pages.modalOverlaysPage.waitForDialogToAppear();

      // Enter name and submit
      await pages.modalOverlaysPage.enterNameAndSubmit(name);
      await pages.modalOverlaysPage.waitForDialogToDisappear();
    }

    // Verify all names are added correctly
    const namesList = await pages.modalOverlaysPage.getNamesList();
    expect(namesList.length).toEqual(namesToAdd.length);

    for (const name of namesToAdd) {
      expect(namesList).toContain(name);
    }
  });

  test("should not add name when cancelled", async ({ pages }) => {
    // Get initial count of names
    const initialNamesCount = await pages.modalOverlaysPage.getNamesCount();

    // Open dialog
    await pages.modalOverlaysPage.openEnterNameDialog();
    await pages.modalOverlaysPage.waitForDialogToAppear();

    // Enter name but cancel
    await pages.modalOverlaysPage.enterNameAndCancel("Cancelled Name");
    await pages.modalOverlaysPage.waitForDialogToDisappear();

    // Verify no name was added
    const finalNamesCount = await pages.modalOverlaysPage.getNamesCount();
    expect(finalNamesCount).toEqual(initialNamesCount);
  });
});
