import { BasePage } from './BasePage';

export class WidgetsPage extends BasePage {
  // Date Picker page
  readonly dateInput = this.page.locator('#datePickerMonthYearInput');

  // Auto Complete page (multiple colors)
  readonly colorInput = this.page.locator('#autoCompleteMultipleInput');
  readonly selectedColors = this.page.locator('.auto-complete__multi-value__label');

  async openDatePicker() {
    await this.open('/date-picker');
  }

  async openAutoComplete() {
    await this.open('/auto-complete');
  }

  // Type the date in the field and press Enter to confirm it
  async setDate(date: string) {
    await this.dateInput.click();
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
  }


  async selectColor(searchText: string, option: string) {
    await this.colorInput.fill(searchText);
    await this.page.locator('.auto-complete__option').filter({ hasText: new RegExp(`^${option}$`) }).click();
  }
}