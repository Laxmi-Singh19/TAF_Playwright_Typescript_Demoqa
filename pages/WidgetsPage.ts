import { BasePage } from '../core/BasePage';

export class WidgetsPage extends BasePage {
  readonly selectors = {
    dateInput: '#datePickerMonthYearInput',
    colorInput: '#autoCompleteMultipleInput',
    selectedColor: '.auto-complete__multi-value__label',
  };

  async openDatePicker() {
    await this.open('/date-picker');
  }

  async openAutoComplete() {
    await this.open('/auto-complete');
  }

  // Type the date in the field and press Enter to confirm it
  async setDate(date: string) {
    await this.click(this.selectors.dateInput);
    await this.type(this.selectors.dateInput, date);
    await this.press(this.selectors.dateInput, 'Enter');
  }

  // Type a few letters, then click the exact suggestion from the list
  async selectColor(searchText: string, option: string) {
    await this.type(this.selectors.colorInput, searchText);
    await this.click(`.auto-complete__option:text-is("${option}")`);
  }
}