import { BasePage } from './BasePage';

export class TextBoxPage extends BasePage {
  readonly fullName = this.page.locator('#userName');
  readonly email = this.page.locator('#userEmail');
  readonly currentAddress = this.page.locator('#currentAddress');
  readonly permanentAddress = this.page.locator('#permanentAddress');
  readonly submitButton = this.page.locator('#submit');
  readonly outputName = this.page.locator('#output #name');
  readonly outputEmail = this.page.locator('#output #email');

  async openPage() {
    await this.open('/text-box');
  }

  async fillAndSubmit(data: any) {
    await this.fullName.fill(data.fullName);
    await this.email.fill(data.email);
    await this.currentAddress.fill(data.currentAddress);
    await this.permanentAddress.fill(data.permanentAddress);
    await this.submitButton.click();
  }
}
