import { test, expect } from "../fixtures/baseFixture";
import { env } from "../utils/environment";

test.describe("UI Component Tests", () => {
  // Common setup for all tests
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToHome();
  });

  test.describe("Form Layouts Page", () => {
    // Setup for form layout tests
    test.beforeEach(async ({ navigationPage }) => {
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
  });

  test.describe("Toastr Page", () => {
    test.beforeEach(async ({ navigationPage }) => {
      await navigationPage.toastrPage();
    });

    test("Checkboxes", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step('Uncheck "Hide on click" checkbox', async () => {
        await page
          .getByRole("checkbox", { name: "Hide on click" })
          .uncheck({ force: true });
      });

      await test.step('Check "Prevent arising of duplicate toast" checkbox', async () => {
        await page
          .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
          .check({ force: true });
      });

      await test.step("Check all checkboxes", async () => {
        const allCheckboxes = page.getByRole("checkbox");
        for (const checkbox of await allCheckboxes.all()) {
          await checkbox.check({ force: true });
          await expect(checkbox).toBeChecked();
        }
      });
    });
  });

  test.describe("Theme Selection", () => {
    test("Theme dropdown changes header color", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step("Test different theme colors", async () => {
        const colorsPerTheme = [
          { theme: "Light", color: "rgb(255, 255, 255)" },
          { theme: "Dark", color: "rgb(34, 43, 69)" },
          { theme: "Cosmic", color: "rgb(50, 50, 89)" },
          { theme: "Corporate", color: "rgb(255, 255, 255)" },
        ];

        for (const { theme, color } of colorsPerTheme) {
          await test.step(`Test ${theme} theme`, async () => {
            // Select theme
            const dropDownMenu = page.locator("ngx-header nb-select");
            await dropDownMenu.click();
            await page
              .locator("nb-option-list nb-option")
              .filter({ hasText: theme })
              .click();

            // Verify color
            const header = page.locator("nb-layout-header");
            await expect(header).toHaveCSS("background-color", color);
          });
        }
      });
    });

    test("Dropdown list content", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step("Open dropdown menu", async () => {
        const dropDownMenu = page.locator("ngx-header nb-select");
        await dropDownMenu.click();
      });

      await test.step("Verify dropdown options", async () => {
        const optionList = page.locator("nb-option-list nb-option");
        await expect(optionList).toHaveText([
          "Light",
          "Dark",
          "Cosmic",
          "Corporate",
        ]);
      });
    });
  });

  test.describe("Tooltips", () => {
    test.beforeEach(async ({ navigationPage }) => {
      await navigationPage.tooltipPage();
    });

    test("Tooltip shows on hover", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step("Hover over tooltip button", async () => {
        const tooltipButton = page
          .locator("nb-card")
          .filter({ hasText: "Tooltip Placements" })
          .getByRole("button", { name: "Top" });

        await tooltipButton.hover();
      });

      await test.step("Verify tooltip text", async () => {
        await expect(page.locator("nb-tooltip")).toHaveText(
          "This is a tooltip",
        );
      });
    });
  });

  test.describe("Dialog Box", () => {
    test.beforeEach(async ({ navigationPage }) => {
      await navigationPage.smartTablePage();
    });

    test("Confirm deletion dialog", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step("Set up dialog handler", async () => {
        page.on("dialog", (dialog) => {
          expect(dialog.message()).toEqual("Are you sure you want to delete?");
          dialog.accept();
        });
      });

      await test.step("Delete row and verify removal", async () => {
        const targetRow = page
          .getByRole("table")
          .locator("tr", { hasText: env.testEmails.deleteTarget });
        await targetRow.locator(".nb-trash").click();
        await expect(page.locator("table tr").first()).not.toHaveText(
          env.testEmails.deleteTarget,
        );
      });
    });
  });

  test.describe("Smart Table", () => {
    test.beforeEach(async ({ navigationPage }) => {
      await navigationPage.smartTablePage();
    });

    test("Edit table row data", async ({ navigationPage }) => {
      const page = navigationPage.page;

      await test.step("Edit age in first page", async () => {
        const firstPageRow = page
          .locator("table")
          .locator("tr", { hasText: env.testEmails.editTarget })
          .first();

        await test.step("Click edit button", async () => {
          await firstPageRow.locator(".nb-edit").click();
        });

        await test.step("Update age value", async () => {
          const editor = page.locator("input-editor").getByPlaceholder("Age");
          await editor.clear();
          await editor.fill("35");
        });

        await test.step("Confirm edit", async () => {
          await page.locator(".nb-checkmark").click();
        });
      });

      await test.step("Navigate to page 2", async () => {
        await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
      });

      await test.step("Edit email on second page", async () => {
        const secondPageRow = page
          .getByRole("row", { name: "11" })
          .filter({ has: page.locator("td").nth(1).getByText("11") });

        await test.step("Click edit button", async () => {
          await secondPageRow.locator(".nb-edit").click();
        });

        await test.step("Update email value", async () => {
          const editor = page
            .locator("input-editor")
            .getByPlaceholder("E-mail");
          await editor.clear();
          await editor.fill(env.testUser.email);
        });

        await test.step("Confirm edit", async () => {
          await page.locator(".nb-checkmark").click();
        });
      });

      await test.step("Verify edit was successful", async () => {
        const secondPageRow = page
          .getByRole("row", { name: "11" })
          .filter({ has: page.locator("td").nth(1).getByText("11") });
        await expect(secondPageRow.locator("td").nth(5)).toHaveText(
          env.testUser.email,
        );
      });
    });

    test("Table filtering by age", async ({ navigationPage }) => {
      const page = navigationPage.page;
      const ages = env.testAgeFilters;

      for (const age of ages) {
        await test.step(`Filter table by age ${age}`, async () => {
          await test.step("Clear and fill age filter", async () => {
            const ageFilter = page
              .locator("input-filter")
              .getByPlaceholder("Age");
            await ageFilter.clear();
            await ageFilter.fill(age);
            await page.waitForTimeout(500); // Wait for filter to apply
          });
        });

        await test.step(`Verify results for age ${age}`, async () => {
          const rows = page.locator("tbody tr");

          if (age === "200") {
            await expect(page.getByRole("table")).toContainText(
              "No data found",
            );
          } else {
            // Check all visible rows match the filter
            const allRows = await rows.all();
            for (const row of allRows) {
              const rowAge = row.locator("td").last();
              await expect(rowAge).toHaveText(age);
            }
          }
        });
      }
    });
  });
});
