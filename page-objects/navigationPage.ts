import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import { ROUTES } from '../config/urls';

export class NavigationPage extends BasePage {
  // Menu items
  readonly formLayoutsMenuItem: Locator;
  readonly datePickerMenuItem: Locator;
  readonly toastrMenuItem: Locator;
  readonly smartTableMenuItem: Locator;
  readonly tooltipMenuItem: Locator;

  // Group menu categories
  private readonly menuGroups = {
    'Forms': ['Form Layouts', 'Datepicker'],
    'Modal & Overlays': ['Toastr', 'Tooltip'],
    'Tables & Data': ['Smart Table'],
    'Home': ['/']
  };

  constructor(page: Page) {
    super(page);
    this.formLayoutsMenuItem = this.page.locator('text=Form Layouts');
    this.datePickerMenuItem = this.page.locator('text=Datepicker');
    this.toastrMenuItem = this.page.locator('text=Toastr');
    this.smartTableMenuItem = this.page.locator('text=Smart Table');
    this.tooltipMenuItem = this.page.locator('text=Tooltip');
  }

  /**
   * Navigate to a specific page by menu item text
   * @param menuItemText The text of the menu item to click
   * @returns Promise that resolves when navigation is complete
   */
  async navigateTo(menuItemText: string): Promise<void> {
    // Find which group contains this menu item
    const group = Object.keys(this.menuGroups).find(key => 
      this.menuGroups[key].includes(menuItemText));
    
    if (!group) {
      throw new Error(`Menu item "${menuItemText}" not found in any group`);
    }

    await this.selectGroupMenuItem(group);
    await this.page.getByText(menuItemText).click();
  }

  // Simplified page navigation methods
  async formLayoutsPage(): Promise<void> {
    await this.navigateTo('Form Layouts');
  }

  async toastrPage(): Promise<void> {
    await this.navigateTo('Toastr');
  }

  async datepickerPage(): Promise<void> {
    await this.navigateTo('Datepicker');
  }
  
  async smartTablePage(): Promise<void> {
    await this.navigateTo('Smart Table');
  }

  async tooltipPage(): Promise<void> {
    await this.navigateTo('Tooltip');
  }

  /**
   * Selects a group menu item by its title. If the menu item is collapsed, it will be expanded.
   * 
   * @param groupItemTitle - The title attribute of the group menu item to select
   * @returns A promise that resolves when the group menu item has been selected
   * @private
   */
  private async selectGroupMenuItem(groupItemTitle: string): Promise<void> {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute('aria-expanded');
    if (expandedState === 'false') {
      await groupMenuItem.click();
    }
  }
}