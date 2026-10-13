import { BasePage } from './BasePage';

export class RadioButtonPage extends BasePage {
  readonly resultText = this.page.locator('.text-success');

  async openPage() {
    await this.open('/radio-button');
  }

  async selectOption(option: string) {
    await this.page.locator('label', { hasText: option }).click();
  }
}
