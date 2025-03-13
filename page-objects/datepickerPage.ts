import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class DatepickerPage extends BasePage {
    // Locators
    private readonly calendarInput: Locator;
    private readonly calendarViewMode: Locator;
    private readonly nextMonthButton: Locator;
    private readonly dayCell: Locator;

    constructor(page: Page) {
        super(page);
        this.calendarInput = this.page.getByPlaceholder('Form Picker');
        this.calendarViewMode = this.page.locator('nb-calendar-view-mode');
        this.nextMonthButton = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]');
        this.dayCell = this.page.locator('[class="day-cell ng-star-inserted"]');
    }

    /**
     * Selects a date from the common datepicker relative to today
     * @param numberOfDaysFromToday Number of days to add to today's date
     */
    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number): Promise<void> {
        await this.calendarInput.click();

        const targetDate = this.calculateTargetDate(numberOfDaysFromToday);
        await this.navigateToTargetMonth(targetDate);
        await this.selectDay(targetDate);
        await this.verifySelectedDate(targetDate);
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
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    /**
     * Navigates to the target month in calendar
     */
    private async navigateToTargetMonth(targetDate: Date): Promise<void> {
        const expectedMonth = targetDate.toLocaleString('default', { month: 'long' });
        const expectedYear = targetDate.getFullYear();
        const expectedMonthYear = `${expectedMonth} ${expectedYear}`;

        while (!(await this.calendarViewMode.textContent()).includes(expectedMonthYear)) {
            await this.nextMonthButton.click();
        }
    }

    /**
     * Selects the target day in calendar
     */
    private async selectDay(date: Date): Promise<void> {
        const dayString = date.getDate().toString();
        await this.dayCell.getByText(dayString, { exact: true }).click();
    }

    /**
     * Verifies the selected date in input field
     */
    private async verifySelectedDate(date: Date): Promise<void> {
        const expectedDateString = this.formatDateForAssertion(date);
        await expect(this.calendarInput).toHaveValue(expectedDateString);
    }
}