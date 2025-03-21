import { test, expect, Page } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { ModalOverlaysPage } from "../page-objects/modalOverlaysPage";

test.describe("Modal Dialog Tests", () => {
  let page: Page;
  let pageManager: PageManager;
  let modalOverlaysPage: ModalOverlaysPage;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    pageManager = new PageManager(page);

    // Navigate to the dialog page
    await page.goto("/");
    await pageManager.navigateTo().dialogPage();

    // Initialize the modal overlays page
    modalOverlaysPage = pageManager.onModalOverlaysPage();
  });

  test("should open and close dialog with template", async () => {
    // Open dialog
    await modalOverlaysPage.openDialogWithTemplate();
    await modalOverlaysPage.waitForDialogToAppear();

    // Verify dialog is visible and has correct content
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();
    expect(await modalOverlaysPage.getDialogText()).toContain(
      "this is some additional data passed to dialog",
    );

    // Close dialog and verify it's closed
    await modalOverlaysPage.closeDialog();
    await modalOverlaysPage.waitForDialogToDisappear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should close dialog with escape key when ESC close is enabled", async () => {
    // Open dialog with ESC close enabled and verify it's visible
    await modalOverlaysPage.openDialogWithEscClose();
    await modalOverlaysPage.waitForDialogToAppear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Close with ESC key and verify it's closed
    await modalOverlaysPage.closeDialogByEscKey();
    await modalOverlaysPage.waitForDialogToDisappear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with escape key when ESC close is disabled", async () => {
    // Open dialog with ESC close disabled
    await modalOverlaysPage.openDialogWithoutEscClose();
    await modalOverlaysPage.waitForDialogToAppear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Try to close with ESC key - should still be visible
    await modalOverlaysPage.closeDialogByEscKey();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await modalOverlaysPage.closeDialog();
    await modalOverlaysPage.waitForDialogToDisappear();
  });

  test("should close dialog with backdrop click when enabled", async () => {
    // Open dialog with backdrop click enabled
    await modalOverlaysPage.openDialogWithBackdropClick();
    await modalOverlaysPage.waitForDialogToAppear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Close with backdrop click and verify it's closed
    await modalOverlaysPage.closeDialogByClickingBackdrop();
    await modalOverlaysPage.waitForDialogToDisappear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeFalsy();
  });

  test("should NOT close dialog with backdrop click when disabled", async () => {
    // Open dialog with backdrop click disabled
    await modalOverlaysPage.openDialogWithoutBackdropClick();
    await modalOverlaysPage.waitForDialogToAppear();
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Try to close with backdrop click - should still be visible
    await modalOverlaysPage.closeDialogByClickingBackdrop();
    await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
    expect(await modalOverlaysPage.isDialogVisible()).toBeTruthy();

    // Should still be able to close with close button
    await modalOverlaysPage.closeDialog();
    await modalOverlaysPage.waitForDialogToDisappear();
  });

  test("should add names to the list in the enter name dialog", async () => {
    // Define test names
    const namesToAdd = ["Alice", "Bob", "Charlie"];

    // Add names one by one
    for (const name of namesToAdd) {
      // Open dialog
      await modalOverlaysPage.openEnterNameDialog();
      await modalOverlaysPage.waitForDialogToAppear();

      // Enter name and submit
      await modalOverlaysPage.enterNameAndSubmit(name);
      await modalOverlaysPage.waitForDialogToDisappear();
    }

    // Verify all names are added correctly
    const namesList = await modalOverlaysPage.getNamesList();
    expect(namesList.length).toEqual(namesToAdd.length);

    for (const name of namesToAdd) {
      expect(namesList).toContain(name);
    }
  });

  test("should not add name when cancelled", async () => {
    // Get initial count of names
    const initialNamesCount = await modalOverlaysPage.getNamesCount();

    // Open dialog
    await modalOverlaysPage.openEnterNameDialog();
    await modalOverlaysPage.waitForDialogToAppear();

    // Enter name but cancel
    await modalOverlaysPage.enterNameAndCancel("Cancelled Name");
    await modalOverlaysPage.waitForDialogToDisappear();

    // Verify no name was added
    const finalNamesCount = await modalOverlaysPage.getNamesCount();
    expect(finalNamesCount).toEqual(initialNamesCount);
  });
});
