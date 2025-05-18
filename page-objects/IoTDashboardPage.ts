import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class IoTDashboardPage extends BasePage {
  // Light status card elements
  readonly lightTitle: Locator;
  readonly lightToggleButton: Locator;
  readonly lightStatus: Locator;
  // Roller Shades card elements
  readonly rollerShadesTitle: Locator;
  readonly rollerShadesToggleButton: Locator;
  readonly rollerShadesStatus: Locator;
  // Wireless Audio card elements
  readonly wirelessAudioTitle: Locator;
  readonly wirelessAudioToggleButton: Locator;
  readonly wirelessAudioStatus: Locator;

  constructor(page: Page) {
    super(page);
    // Light status card elements
    this.lightTitle = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Light']]//div[@class='title h5']",
    );
    this.lightToggleButton = page.locator(".nb-lightbulb");
    this.lightStatus = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Light']]//div[@class='status paragraph-2']",
    );
    // Roller Shades card elements
    this.rollerShadesTitle = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Roller Shades']]//div[@class='title h5']",
    );
    this.rollerShadesToggleButton = page.locator(".nb-roller-shades");
    this.rollerShadesStatus = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Roller Shades']]//div[@class='status paragraph-2']",
    );
    // Wireless Audio card elements
    this.wirelessAudioTitle = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Wireless Audio']]//div[@class='title h5']",
    );
    this.wirelessAudioToggleButton = page.locator(".nb-audio");
    this.wirelessAudioStatus = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Wireless Audio']]//div[@class='status paragraph-2']",
    );
  }

  async isLightToggledOn(): Promise<boolean> {
    await this.lightToggleButton.waitFor({ state: "visible" });
    const lightStatusText = (await this.lightStatus.textContent()) || "";
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
  async isRollerShadesToggledOn(): Promise<boolean> {
    await this.rollerShadesToggleButton.waitFor({ state: "visible" });
    const rollerShadesStatusText = await this.rollerShadesStatus.textContent();
    return rollerShadesStatusText === "ON";
  }

  async switchTheRollerShades(): Promise<void> {
    if (await this.isRollerShadesToggledOn()) {
      await this.rollerShadesToggleButton.click();
      await expect(this.rollerShadesStatus).toHaveText("OFF");
    } else {
      await this.rollerShadesToggleButton.click();
      await expect(this.rollerShadesStatus).toHaveText("ON");
    }
  }

  async isWirelessAudioToggledOn(): Promise<boolean> {
    await this.wirelessAudioToggleButton.waitFor({ state: "visible" });
    const wirelessAudioStatusText =
      (await this.wirelessAudioStatus.textContent()) || "";
    return wirelessAudioStatusText === "ON";
  }
  async switchTheWirelessAudio(): Promise<void> {
    if (await this.isWirelessAudioToggledOn()) {
      await this.wirelessAudioToggleButton.click();
      await expect(this.wirelessAudioStatus).toHaveText("OFF");
    } else {
      await this.wirelessAudioToggleButton.click();
      await expect(this.wirelessAudioStatus).toHaveText("ON");
    }
  }
}
