import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

/**
 * Represents a page object for handling date picker interactions.
 * Extends the BasePage class to provide specialized date picker functionality.
 *
 * @class DatepickerPage
 * @extends BasePage
 *
 * @property {Locator} calendarInput - Locator for the common date picker input field
 * @property {Locator} calendarInputWithRange - Locator for the date range picker input field
 * @property {Locator} calendarViewMode - Locator for the calendar view mode element
 * @property {Locator} nextMonthButton - Locator for the next month navigation button
 * @property {Locator} prevMonthButton - Locator for the previous month navigation button
 * @property {Locator} dayCell - Locator for day cells in the calendar
 * @property {Locator} activeDayCell - Locator for active (selectable) day cells in the current month
 *
 * @example
 * const datepicker = new DatepickerPage(page);
 * await datepicker.selectCommonDatepickerDateFromToday(5); // Selects date 5 days from today
 * await datepicker.selectDatepickerWithRangeFromToday(1, 7); // Selects date range from tomorrow to 7 days ahead
 */
export class DatepickerPage extends BasePage {
  // Locators
  private readonly calendarInput: Locator;
  private readonly calendarInputWithRange: Locator;
  private readonly calendarViewMode: Locator;
  private readonly nextMonthButton: Locator;
  private readonly prevMonthButton: Locator;
  private readonly dayCell: Locator;
  private readonly activeDayCell: Locator;

  constructor(page: Page) {
    super(page);
    this.calendarInput = this.page.getByPlaceholder("Form Picker");
    this.calendarInputWithRange = this.page.locator(
      'input[placeholder="Range Picker"]',
    );
    this.calendarViewMode = this.page.locator("nb-calendar-view-mode");
    this.nextMonthButton = this.page.locator(
      'nb-calendar-pageable-navigation [data-name="chevron-right"]',
    );
    this.prevMonthButton = this.page.locator(
      'nb-calendar-pageable-navigation [data-name="chevron-left"]',
    );
    this.dayCell = this.page.locator('[class="day-cell ng-star-inserted"]');
    this.activeDayCell = this.page.locator(
      ".day-cell.ng-star-inserted:not(.bounding-month)",
    );
  }

  /**
   * Selects a date from the common datepicker relative to today
   * @param numberOfDaysFromToday Number of days to add to today's date
   */
  async selectCommonDatepickerDateFromToday(
    numberOfDaysFromToday: number,
  ): Promise<void> {
    await this.calendarInput.click();
    const targetDate = this.calculateTargetDate(numberOfDaysFromToday);
    await this.navigateToTargetMonth(targetDate);
    await this.selectDay(targetDate);
    await this.verifySelectedDate(targetDate, this.calendarInput);
  }

  /**
   * Selects a date range in the datepicker
   * @param startDayFromToday Number of days from today for the start date
   * @param endDayFromToday Number of days from today for the end date
   */
  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number,
  ): Promise<void> {
    await this.calendarInputWithRange.click();

    const startDate = this.calculateTargetDate(startDayFromToday);
    const endDate = this.calculateTargetDate(endDayFromToday);

    await this.selectDayRange(startDate, endDate);

    const startDateString = this.formatDateForAssertion(startDate);
    const endDateString = this.formatDateForAssertion(endDate);
    const dateToAssert = `${startDateString} - ${endDateString}`;

    await expect(this.calendarInputWithRange).toHaveValue(dateToAssert, {
      timeout: 10000,
    });
  }

  /**
   * Calculates target date based on days from today
   */
  private calculateTargetDate(daysToAdd: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date;
  }

  /**
   * Formats date for assertion
   */
  private formatDateForAssertion(date: Date): string {
    const day = date.getDate().toString();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  /**
   * Navigates to the target month in calendar
   */
  private async navigateToTargetMonth(targetDate: Date): Promise<void> {
    const expectedMonth = targetDate.toLocaleString("default", {
      month: "long",
    });
    const expectedYear = targetDate.getFullYear();
    const expectedMonthYear = `${expectedMonth} ${expectedYear}`;
    let calendarMonthAndYear =
      (await this.calendarViewMode.textContent()) || "";

    // Determine direction to navigate
    if (targetDate > new Date()) {
      while (!calendarMonthAndYear.includes(expectedMonthYear)) {
        await this.nextMonthButton.click();
        calendarMonthAndYear =
          (await this.calendarViewMode.textContent()) || "";
      }
    } else {
      while (!calendarMonthAndYear.includes(expectedMonthYear)) {
        await this.prevMonthButton.click();
        calendarMonthAndYear =
          (await this.calendarViewMode.textContent()) || "";
      }
    }
  }

  /**
   * Selects the target day in calendar
   */
  private async selectDay(date: Date): Promise<void> {
    const dayString = date.getDate().toString();
    await this.activeDayCell.getByText(dayString, { exact: true }).click();
  }

  /**
   * Selects the target date range in calendar
   */
  private async selectDayRange(startDate: Date, endDate: Date): Promise<void> {
    // Navigate to start date's month
    await this.navigateToTargetMonth(startDate);

    // Select start date
    const startDayString = startDate.getDate().toString();
    await this.activeDayCell.getByText(startDayString, { exact: true }).click();

    // Navigate to end date's month if different
    await this.navigateToTargetMonth(endDate);

    // Select end date
    const endDayString = endDate.getDate().toString();
    await this.activeDayCell.getByText(endDayString, { exact: true }).click();
  }

  /**
   * Verifies the selected date in input field
   */
  private async verifySelectedDate(
    date: Date,
    inputField: Locator,
  ): Promise<void> {
    const expectedDateString = this.formatDateForAssertion(date);

    // Wait for the input to have a non-empty value
    await expect(inputField).not.toHaveValue("", { timeout: 10000 });

    // Verify the exact value
    await expect(inputField).toHaveValue(expectedDateString, {
      timeout: 10000,
    });
  }
}
