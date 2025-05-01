import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutsPage } from "./formLayoutsPage";
import { DatepickerPage } from "./datepickerPage";
import { ModalOverlaysPage } from "./modalOverlaysPage";
import { BasePage } from "./basePage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly datepickerPage: DatepickerPage;
  private readonly modalOverlaysPage: ModalOverlaysPage;
  private readonly basePage: BasePage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.datepickerPage = new DatepickerPage(this.page);
    this.modalOverlaysPage = new ModalOverlaysPage(this.page);
    this.basePage = new BasePage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormLayoutsPage() {
    return this.formLayoutsPage;
  }

  onDatepickerPage() {
    return this.datepickerPage;
  }

  onModalOverlaysPage() {
    return this.modalOverlaysPage;
  }

  getBasePage() {
    return this.basePage;
  }
}
