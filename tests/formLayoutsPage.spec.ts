import { test, expect } from "../fixtures/baseFixture";
import { env } from "../utils/environment";
import { testForms } from "../testData/navigationData";

test.describe("Forms, Form Layouts Page Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage, navigationPage }) => {
    await basePage.navigateToHome();
    await navigationPage.formLayoutsPage();
  });

  test("Input Fields", async ({ formLayoutsPage }) => {
    await test.step('Get the email input from the "Using the Grid" form', async () => {
      const usingTheGridEmailInput = formLayoutsPage.getFormElement(
        "Using the Grid",
        "textbox",
        "email",
      );

      await test.step("Fill email input", async () => {
        await usingTheGridEmailInput.fill(env.testUser.email);
      });

      await test.step("Clear email input", async () => {
        await usingTheGridEmailInput.clear();
      });

      await test.step("Type email character by character", async () => {
        await usingTheGridEmailInput.pressSequentially(env.testUser.email);
      });
    });
  });

  test("Radio Buttons", async ({ formLayoutsPage }) => {
    await test.step('Interact with "Using the Grid" form', async () => {
      const gridForm = await formLayoutsPage.getGridFormElement();
      const radioOption = gridForm.getByRole("radio", { name: "Option 1" });

      await test.step("Check radio button and verify state", async () => {
        await radioOption.check({ force: true });
        await expect(radioOption).toBeChecked();
      });
    });
  });

  // Form submission tests from usePageObjects.spec.ts
  test("should submit grid form with credentials", async ({
    formLayoutsPage,
  }) => {
    await test.step("Submit grid form with credentials", async () => {
      await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
        testForms[0],
      );
    });

    await test.step("Verify form submission", async () => {
      // check if success message is shown or form is cleared
      const formElement = await formLayoutsPage.getGridFormElement();
      await expect(formElement).toBeVisible();
    });
  });

  test("should submit inline form with user details", async ({
    formLayoutsPage,
  }) => {
    await test.step("Submit inline form with name, email and checkbox", async () => {
      await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
        testForms[1],
      );
    });

    await test.step("Verify inline form submission", async () => {
      const inlineForm = await formLayoutsPage.getInlineFormElement();
      await expect(inlineForm).toBeVisible();
    });
  });
});
