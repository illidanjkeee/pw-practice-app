import { test, expect } from "../fixtures/mainFixture";

test.beforeEach(async ({ pageManager }) => {
  await pageManager.getBasePage().navigateToHome();
  await pageManager.navigateTo().formLayoutsPage();
});

test("should fill and submit the form", async ({ pageManager }) => {
  const page = pageManager.navigateTo().page;

  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await pageManager.navigateTo().formLayoutsPage();

  const janeDoeTextbox = page.getByRole("textbox", { name: "Jane Doe" });
  await janeDoeTextbox.click();
  await janeDoeTextbox.fill("Jane Doe");

  const formLocator = page
    .locator("form")
    .filter({ hasText: "Remember meSubmit" });
  await formLocator.getByPlaceholder("Email").click();
  await formLocator.getByPlaceholder("Email").fill("Janedoe@email.com");
  await formLocator.getByRole("button").click();
  await page
    .locator("form")
    .filter({ hasText: "Remember meSubmit" })
    .getByRole("button")
    .click();
});

test("assertions", async ({ pageManager }) => {
  const page = pageManager.navigateTo().page;
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toContain("Submit");
  expect(text).toBe("Submit");
});
