import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class NavigationPage extends BasePage {
  // Menu items
  readonly formLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  // Group menu categories
  private readonly menuGroups = {
    Forms: ["Form Layouts", "Datepicker"],
    "Modal & Overlays": ["Toastr", "Tooltip", "Dialog"],
    "Tables & Data": ["Smart Table"],
    Home: ["/"],
  };

  private groupMenuItemCache: Map<string, Locator> = new Map();

  constructor(page: Page) {
    super(page);
    this.formLayoutsMenuItem = this.page.locator("text=Form Layouts");
    this.datePickerMenuItem = this.page.locator("text=Datepicker");
    this.toastrMenuItem = this.page.locator("text=Toastr");
    this.smartTableMenuItem = this.page.locator("text=Smart Table");
    this.tooltipMenuItem = this.page.locator("text=Tooltip");
  }

  /**
   * Navigate to a specific page by menu item text
   * @param menuItemText The text of the menu item to click
   * @returns Promise that resolves when navigation is complete
   */
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

  /**
   * Selects a group menu item by its title. If the menu item is collapsed, it will be expanded.
   *
   * @param groupItemTitle - The title attribute of the group menu item to select
   * @returns A promise that resolves when the group menu item has been selected
   * @private
   */
  private async selectGroupMenuItem(groupItemTitle: string): Promise<void> {
    let groupMenuItem = this.groupMenuItemCache.get(groupItemTitle);

    if (!groupMenuItem) {
      groupMenuItem = this.page.getByTitle(groupItemTitle);
      if (!groupMenuItem) {
        throw new Error(
          `Group menu item with title "${groupItemTitle}" not found`,
        );
      }
      this.groupMenuItemCache.set(groupItemTitle, groupMenuItem);
    }

    // Ensure the group menu item is visible and interactable
    await groupMenuItem.waitFor({ state: "visible" });

    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState === "false" || expandedState === null) {
      await groupMenuItem.click();

      // Wait for the menu to expand
      await this.page.waitForTimeout(500); // Small delay to ensure the menu expands
      const newExpandedState =
        await groupMenuItem.getAttribute("aria-expanded");
      if (newExpandedState !== "true") {
        throw new Error(
          `Failed to expand group menu item with title "${groupItemTitle}".`,
        );
      }
    }
  }
}
