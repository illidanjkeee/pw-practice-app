import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class NavigationPage extends BasePage {
  // Menu items
  readonly formLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly tooltipMenuItem: Locator;
  readonly dialogMenuItem: Locator;
  readonly IoTDashboardMenuItem: Locator;

  private readonly menuGroups = {
    Forms: ["Form Layouts", "Datepicker"],
    "Modal & Overlays": ["Dialog", "Window", "Popover", "Toastr", "Tooltip"],
    "Extra Components": ["Calendar"],
    Charts: ["Echarts"],
    "Tables & Data": ["Smart Table", "Tree Grid"],
    Auth: ["Login", "Register", "Request Password", "Reset Password"],
    Home: ["/"],
    "IoT Dashboard": ["IoT Dashboard"],
  };

  private groupMenuItemCache: Map<string, Locator> = new Map();

  constructor(page: Page) {
    super(page);
    this.formLayoutsMenuItem = this.page.locator("text=Form Layouts");
    this.datePickerMenuItem = this.page.locator("text=Datepicker");
    this.toastrMenuItem = this.page.locator("text=Toastr");
    this.smartTableMenuItem = this.page.locator("text=Smart Table");
    this.tooltipMenuItem = this.page.locator("text=Tooltip");
    this.dialogMenuItem = this.page.locator("text=Dialog");
    this.IoTDashboardMenuItem = this.page.locator("text=IoT Dashboard");
  }

  async navigateToMenuItem(menuItemText: string): Promise<void> {
    // Find which group contains this menu item
    let group: string | undefined;
    for (const key of Object.keys(this.menuGroups)) {
      if (this.menuGroups[key].includes(menuItemText)) {
        group = key;
        break;
      }
    }

    if (!group) {
      throw new Error(`Menu item "${menuItemText}" not found in any group`);
    }

    await this.selectGroupMenuItem(group);
    await this.page.getByText(menuItemText).click();
  }

  // Simplified page navigation methods
  async formLayoutsPage(): Promise<void> {
    await this.navigateToMenuItem("Form Layouts");
  }

  async toastrPage(): Promise<void> {
    await this.navigateToMenuItem("Toastr");
  }

  async datePickerPage(): Promise<void> {
    await this.navigateToMenuItem("Datepicker");
  }

  async smartTablePage(): Promise<void> {
    await this.navigateToMenuItem("Smart Table");
  }

  async tooltipPage(): Promise<void> {
    await this.navigateToMenuItem("Tooltip");
  }

  async dialogPage(): Promise<void> {
    await this.navigateToMenuItem("Dialog");
  }

  async windowPage(): Promise<void> {
    await this.navigateToMenuItem("Window");
  }

  async IoTDashboardPage(): Promise<void> {
    await this.navigateToMenuItem("IoT Dashboard");
  }

  async popover(): Promise<void> {
    await this.navigateToMenuItem("Popover");
  }

  async toastr(): Promise<void> {
    await this.navigateToMenuItem("Toastr");
  }

  async tooltip(): Promise<void> {
    await this.navigateToMenuItem("Tooltip");
  }

  private async selectGroupMenuItem(groupItemTitle: string): Promise<void> {
    let groupMenuItem = this.groupMenuItemCache.get(groupItemTitle);

    if (!groupMenuItem) {
      groupMenuItem = this.page.getByTitle(groupItemTitle);
      if (!groupMenuItem) {
        throw new Error(`Group menu item with title "${groupItemTitle}" not found`);
      }
      this.groupMenuItemCache.set(groupItemTitle, groupMenuItem);
    }

    await groupMenuItem.waitFor({ state: "visible" });

    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false" || expandedState === null) {
      await groupMenuItem.click();

      await this.page.waitForTimeout(500); // Small delay to ensure the menu expands
      const newExpandedState = await groupMenuItem.getAttribute("aria-expanded");
      if (newExpandedState !== "true") {
        throw new Error(`Failed to expand group menu item with title "${groupItemTitle}".`);
      }
    }
  }
}
