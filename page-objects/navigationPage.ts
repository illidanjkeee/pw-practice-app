import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { ROUTES } from '../config/urls';

export class NavigationPage extends BasePage {
  
  readonly page: Page;

  constructor(page: Page) {
    super(page);
  }

  async formLayoutsPage() {
    // Assuming there's a menu item or link to click
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Form Layouts').click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Toastr').click();
  }

  async datepickerPage() {
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Datepicker').click();
  }
  
  async smartTablePage() {
    await this.selectGroupMenuItem('Tables & Data');
    await this.page.getByText('Smart Table').click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Tooltip').click();
  }

  /**
   * Selects a group menu item by its title. If the menu item is collapsed, it will be expanded.
   * 
   * @param groupItemTitle - The title attribute of the group menu item to select
   * @returns A promise that resolves when the group menu item has been selected
   * @private
   */
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute('aria-expanded');
    if (expandedState === 'false') {
      await groupMenuItem.click();
    }
   
  }

  // Add other navigation methods
}