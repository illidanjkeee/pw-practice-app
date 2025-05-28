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
  // Coffee Maker card elements
  readonly coffeeMakerTitle: Locator;
  readonly coffeeMakerToggleButton: Locator;
  readonly coffeeMakerStatus: Locator;
  // Temperature component elements
  readonly temperatureCard: Locator;
  readonly temperatureTab: Locator;
  readonly humidityTab: Locator;
  readonly temperatureValue: Locator;
  readonly humidityValue: Locator;
  readonly temperaturePowerButton: Locator;
  readonly humidityPowerButton: Locator;
  readonly temperatureModeButtons: Locator;
  readonly humidityModeButtons: Locator;
  readonly temperatureSlider: Locator;
  readonly humiditySlider: Locator;

  // Electricity component elements
  readonly electricityCard: Locator;
  readonly electricityChart: Locator;
  readonly electricityTable: Locator;
  readonly electricityTypeSelect: Locator;
  readonly electricityConsumptionHeader: Locator;
  readonly electricityTabs: Locator;
  // Rooms component elements
  readonly roomsCard: Locator;
  readonly roomSelector: Locator;
  readonly roomContent: Locator;
  readonly musicPlayer: Locator;
  readonly musicPlayButton: Locator;
  readonly musicVolumeSlider: Locator;
  readonly playerControls: Locator;
  readonly volumeControl: Locator;

  // Solar component elements
  readonly solarCard: Locator;
  readonly solarChart: Locator;
  readonly solarValue: Locator;
  readonly solarHeader: Locator;

  // Weather component elements
  readonly weatherCard: Locator;
  readonly weatherLocation: Locator;
  readonly weatherDate: Locator;
  readonly currentTemperature: Locator;
  readonly weatherIcon: Locator;
  readonly weatherDetails: Locator;
  readonly weeklyForecast: Locator;

  // Traffic component elements
  readonly trafficCard: Locator;
  readonly trafficChart: Locator;
  readonly trafficTypeSelect: Locator;
  readonly trafficHeader: Locator;
  // Security Cameras component elements
  readonly securityCamerasCard: Locator;
  readonly securityCamerasComponent: Locator;
  readonly cameraViews: Locator;
  readonly cameraFeeds: Locator;
  readonly cameraGrid: Locator;

  // Contacts component elements
  readonly contactsCard: Locator;
  readonly contactsComponent: Locator;
  readonly contactsList: Locator;
  readonly contactCallButton: Locator;
  readonly contactMessageButton: Locator;

  // Kitten component elements
  readonly kittenCard: Locator;
  readonly kittenComponent: Locator;
  readonly kittenImage: Locator;
  readonly kittenExpandedView: Locator;
  readonly kittenLoadingIndicator: Locator;

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
    // Coffee Maker card elements
    this.coffeeMakerTitle = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Coffee Maker']]//div[@class='title h5']",
    );
    this.coffeeMakerToggleButton = page.locator(".nb-coffee-maker");
    this.coffeeMakerStatus = page.locator(
      "//ngx-status-card[.//div[@class='title h5' and text()='Coffee Maker']]//div[@class='status paragraph-2']",
    ); // Temperature component locators
    this.temperatureCard = page.locator("ngx-temperature nb-card");
    this.temperatureTab = page
      .locator("ngx-temperature .tab-link")
      .filter({ hasText: "Temperature" });
    this.humidityTab = page
      .locator("ngx-temperature .tab-link")
      .filter({ hasText: "Humidity" });
    this.temperatureValue = page.locator(
      "ngx-temperature .content-active .value.temperature",
    );
    this.humidityValue = page.locator(
      "ngx-temperature .content-active .value.humidity",
    );
    this.temperaturePowerButton = page.locator(
      "ngx-temperature .content-active .power-bg",
    );
    this.humidityPowerButton = page.locator(
      "ngx-temperature .content-active .power-bg",
    );
    this.temperatureModeButtons = page.locator(
      "ngx-temperature .content-active nb-radio-group nb-radio",
    );
    this.humidityModeButtons = page.locator(
      "ngx-temperature .content-active nb-radio-group nb-radio",
    );
    this.temperatureSlider = page.locator(
      "ngx-temperature .content-active ngx-temperature-dragger",
    );
    this.humiditySlider = page.locator(
      "ngx-temperature .content-active ngx-temperature-dragger",
    ); // Electricity component locators
    this.electricityCard = page.locator("ngx-electricity nb-card").first();
    this.electricityChart = page.locator("ngx-electricity-chart");
    this.electricityTable = page.locator("ngx-electricity nb-tabset");
    this.electricityTypeSelect = page.locator("ngx-electricity nb-select");
    this.electricityConsumptionHeader = page
      .locator("ngx-electricity")
      .getByText("Electricity Consumption");
    this.electricityTabs = page.locator("ngx-electricity nb-tab"); // Rooms component locators
    this.roomsCard = page.locator("ngx-rooms");
    this.roomSelector = page.locator("ngx-room-selector");
    this.roomContent = page.locator(".room-content");
    this.musicPlayer = page.locator("ngx-player");
    this.musicPlayButton = page.locator(".play-pause-button");
    this.musicVolumeSlider = page.locator(".volume-slider");
    this.playerControls = page.locator(".controls");
    this.volumeControl = page.locator(".volume");

    // Solar component locators
    this.solarCard = page.locator("ngx-solar nb-card");
    this.solarChart = page.locator("ngx-solar .echart");
    this.solarValue = page.locator("ngx-solar .value");
    this.solarHeader = page.locator("text=Solar Energy Consumption");

    // Weather component locators
    this.weatherCard = page.locator("ngx-weather nb-card");
    this.weatherLocation = page.locator(".location");
    this.weatherDate = page.locator(".date");
    this.currentTemperature = page.locator(".today-temperature");
    this.weatherIcon = page.locator(".today-icon");
    this.weatherDetails = page.locator(".today-details");
    this.weeklyForecast = page.locator(".weekly-forecast");

    // Traffic component locators
    this.trafficCard = page.locator("ngx-traffic nb-card");
    this.trafficChart = page.locator("ngx-traffic-chart");
    this.trafficTypeSelect = page.locator("ngx-traffic nb-select");
    this.trafficHeader = page.locator("text=Traffic Consumption"); // Security cameras locators
    this.securityCamerasCard = page.locator("ngx-security-cameras");
    this.securityCamerasComponent = page.locator("ngx-security-cameras");
    this.cameraViews = page.locator("ngx-security-cameras nb-card");
    this.cameraFeeds = page.locator("[data-testid='camera-feed']");
    this.cameraGrid = page.locator("[data-testid='camera-grid']");

    // Contacts locators
    this.contactsCard = page.locator("ngx-contacts");
    this.contactsComponent = page.locator("ngx-contacts");
    this.contactsList = page.locator("ngx-contacts nb-list");
    this.contactCallButton = page.locator("[data-testid='contact-call-btn']");
    this.contactMessageButton = page.locator(
      "[data-testid='contact-message-btn']",
    );

    // Kitten locators
    this.kittenCard = page.locator("ngx-kitten");
    this.kittenComponent = page.locator("ngx-kitten");
    this.kittenImage = page.locator("ngx-kitten img");
    this.kittenExpandedView = page.locator("[data-testid='kitten-expanded']");
    this.kittenLoadingIndicator = page.locator(
      "[data-testid='kitten-loading']",
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

  async isCoffeeMakerToggledOn(): Promise<boolean> {
    await this.coffeeMakerToggleButton.waitFor({ state: "visible" });
    const coffeeMakerStatusText =
      (await this.coffeeMakerStatus.textContent()) || "";
    return coffeeMakerStatusText === "ON";
  }

  async switchTheCoffeeMaker(): Promise<void> {
    if (await this.isCoffeeMakerToggledOn()) {
      await this.coffeeMakerToggleButton.click();
      await expect(this.coffeeMakerStatus).toHaveText("OFF");
    } else {
      await this.coffeeMakerToggleButton.click();
      await expect(this.coffeeMakerStatus).toHaveText("ON");
    }
  }
  // Temperature component methods
  async switchToTemperatureTab(): Promise<void> {
    await this.temperatureTab.click();
    await this.page.waitForTimeout(500); // Wait for tab content to load
  }

  async switchToHumidityTab(): Promise<void> {
    await this.humidityTab.click();
    await this.page.waitForTimeout(500); // Wait for tab content to load
  }
  async getTemperatureValue(): Promise<string> {
    await this.temperatureValue.waitFor({ state: "visible" });
    const value = (await this.temperatureValue.textContent()) || "";
    return value.trim();
  }

  async getHumidityValue(): Promise<string> {
    await this.humidityValue.waitFor({ state: "visible" });
    const value = (await this.humidityValue.textContent()) || "";
    return value.trim();
  }

  async toggleTemperaturePower(): Promise<void> {
    await this.temperaturePowerButton.click();
  }

  async toggleHumidityPower(): Promise<void> {
    await this.humidityPowerButton.click();
  }
  async selectTemperatureMode(
    mode: "cool" | "warm" | "heat" | "fan",
  ): Promise<void> {
    await this.temperatureModeButtons
      .locator(`[value="${mode}"]`)
      .locator("..")
      .click();
  }

  async selectHumidityMode(
    mode: "cool" | "warm" | "heat" | "fan",
  ): Promise<void> {
    await this.humidityModeButtons
      .locator(`[value="${mode}"]`)
      .locator("..")
      .click();
  }
  // Electricity component methods
  async isElectricityChartVisible(): Promise<boolean> {
    return await this.electricityChart.isVisible();
  }

  async selectElectricityType(type: string): Promise<void> {
    await this.electricityTypeSelect.click();
    await this.page.locator(`nb-option`).filter({ hasText: type }).click();
  }

  async getElectricityTabsCount(): Promise<number> {
    return await this.electricityTabs.count();
  }

  // Solar component methods
  async getSolarValue(): Promise<string> {
    await this.solarValue.waitFor({ state: "visible" });
    return (await this.solarValue.textContent()) || "";
  }

  async isSolarChartVisible(): Promise<boolean> {
    return await this.solarChart.isVisible();
  }

  // Weather component methods
  async getWeatherLocation(): Promise<string> {
    await this.weatherLocation.waitFor({ state: "visible" });
    return (await this.weatherLocation.textContent()) || "";
  }

  async getCurrentTemperature(): Promise<string> {
    await this.currentTemperature.waitFor({ state: "visible" });
    return (await this.currentTemperature.textContent()) || "";
  }

  async getWeatherDate(): Promise<string> {
    await this.weatherDate.waitFor({ state: "visible" });
    return (await this.weatherDate.textContent()) || "";
  }

  async getWeeklyForecastDaysCount(): Promise<number> {
    return await this.weeklyForecast.locator(".day").count();
  }

  async isTrafficChartVisible(): Promise<boolean> {
    return await this.trafficChart.isVisible();
  }
}
