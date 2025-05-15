import { test, expect } from "../../fixtures/baseFixture";

test.describe("Modal & Overlays, Dialog Tests", () => {
  test.beforeEach(async ({ navigationPage, basePage }) => {
    await test.step("Navigate to the dialog page", async () => {
      await basePage.navigateToHome();
      await navigationPage.dialogPage();
    });
  });

  test("should open and close dialog with template", async ({ dialogPage }) => {
    await test.step("Open dialog with template", async () => {
      await dialogPage.openDialogWithTemplate();
      await dialogPage.waitForDialogToAppear();
    });

    await test.step("Verify dialog is visible with correct content", async () => {
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
      expect(await dialogPage.getDialogText()).toContain(
        "this is some additional data passed to dialog",
      );
    });

    await test.step("Close dialog and verify it's closed", async () => {
      await dialogPage.closeDialog();
      await dialogPage.waitForDialogToDisappear();
      expect(await dialogPage.isDialogVisible()).toBeFalsy();
    });
  });

  test("should close dialog with escape key when ESC close is enabled", async ({
    dialogPage,
  }) => {
    await test.step("Open dialog with ESC close enabled", async () => {
      await dialogPage.openDialogWithEscClose();
      await dialogPage.waitForDialogToAppear();
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Close with ESC key and verify it's closed", async () => {
      await dialogPage.closeDialogByEscKey();
      await dialogPage.waitForDialogToDisappear();
      expect(await dialogPage.isDialogVisible()).toBeFalsy();
    });
  });

  test("should NOT close dialog with escape key when ESC close is disabled", async ({
    dialogPage,
  }) => {
    const page = dialogPage.page;

    await test.step("Open dialog with ESC close disabled", async () => {
      await dialogPage.openDialogWithoutEscClose();
      await dialogPage.waitForDialogToAppear();
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Try to close with ESC key - should still be visible", async () => {
      await dialogPage.closeDialogByEscKey();
      await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Close with close button and verify it closes", async () => {
      await dialogPage.closeDialog();
      await dialogPage.waitForDialogToDisappear();
    });
  });

  test("should close dialog with backdrop click when enabled", async ({
    dialogPage,
  }) => {
    await test.step("Open dialog with backdrop click enabled", async () => {
      await dialogPage.openDialogWithBackdropClick();
      await dialogPage.waitForDialogToAppear();
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Close with backdrop click and verify it's closed", async () => {
      await dialogPage.closeDialogByClickingBackdrop();
      await dialogPage.waitForDialogToDisappear();
      expect(await dialogPage.isDialogVisible()).toBeFalsy();
    });
  });

  test("should NOT close dialog with backdrop click when disabled", async ({
    dialogPage,
  }) => {
    const page = dialogPage.page;

    await test.step("Open dialog with backdrop click disabled", async () => {
      await dialogPage.openDialogWithoutBackdropClick();
      await dialogPage.waitForDialogToAppear();
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Try to close with backdrop click - should still be visible", async () => {
      await dialogPage.closeDialogByClickingBackdrop();
      await page.waitForTimeout(500); // Brief wait to ensure dialog has time to close if it would
      expect(await dialogPage.isDialogVisible()).toBeTruthy();
    });

    await test.step("Close with close button and verify it closes", async () => {
      await dialogPage.closeDialog();
      await dialogPage.waitForDialogToDisappear();
    });
  });

  test("should add names to the list in the enter name dialog", async ({
    dialogPage,
  }) => {
    await test.step("Define test names", async () => {
      const namesToAdd = ["Alice", "Bob", "Charlie"];

      await test.step("Add names one by one", async () => {
        for (const name of namesToAdd) {
          await test.step(`Add name "${name}"`, async () => {
            // Open dialog
            await dialogPage.openEnterNameDialog();
            await dialogPage.waitForDialogToAppear();

            // Enter name and submit
            await dialogPage.enterNameAndSubmit(name);
            await dialogPage.waitForDialogToDisappear();
          });
        }
      });

      await test.step("Verify all names are added correctly", async () => {
        const namesList = await dialogPage.getNamesList();
        expect(namesList.length).toEqual(namesToAdd.length);

        for (const name of namesToAdd) {
          expect(namesList).toContain(name);
        }
      });
    });
  });

  test("should not add name when cancelled", async ({ dialogPage }) => {
    await test.step("Get initial count of names", async () => {
      const initialNamesCount = await dialogPage.getNamesCount();

      await test.step("Open dialog and enter name", async () => {
        await dialogPage.openEnterNameDialog();
        await dialogPage.waitForDialogToAppear();
      });

      await test.step("Cancel dialog after entering name", async () => {
        await dialogPage.enterNameAndCancel("Cancelled Name");
        await dialogPage.waitForDialogToDisappear();
      });

      await test.step("Verify no name was added", async () => {
        const finalNamesCount = await dialogPage.getNamesCount();
        expect(finalNamesCount).toEqual(initialNamesCount);
      });
    });
  });
});
