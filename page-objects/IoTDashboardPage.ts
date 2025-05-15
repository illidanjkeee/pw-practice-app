import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class IoTDashboardPage extends BasePage {
  readonly lightToggleButton: Locator;
  readonly lightStatus: Locator;

  constructor(page: Page) {
    super(page);
    this.lightToggleButton = page.locator(".nb-lightbulb");
    this.lightStatus = page.locator(
      "ngx-status-card[ng-reflect-title='Light'] div[class='status paragraph-2']",
    );
  }

  async isLightToggledOn(): Promise<boolean> {
    await this.lightToggleButton.waitFor({ state: "visible" });
    const lightStatusText = await this.lightStatus.textContent();
    return lightStatusText === "ON";
  }

  async switchTheLight(): Promise<void> {
    if (await this.isLightToggledOn()) {
      await this.lightToggleButton.click();
      await expect(this.lightStatus).toHaveText("OFF");
    } else {
      await this.lightToggleButton.click();
      await expect(this.lightStatus).toHaveText("ON");
    }
  }
}
