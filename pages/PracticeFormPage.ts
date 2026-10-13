import { BasePage } from './BasePage';

export class PracticeFormPage extends BasePage {
  readonly firstName = this.page.locator('#firstName');
  readonly lastName = this.page.locator('#lastName');
  readonly email = this.page.locator('#userEmail');
  readonly mobile = this.page.locator('#userNumber');
  readonly subjects = this.page.locator('#subjectsInput');
  readonly address = this.page.locator('#currentAddress');
  readonly state = this.page.locator('#state');
  readonly city = this.page.locator('#city');
  readonly submitButton = this.page.locator('#submit');
  readonly modal = this.page.locator('.modal-content');
  readonly closeButton = this.page.locator('#closeLargeModal');

  async openPage() {
    await this.open('/automation-practice-form');
  }

  // Fill every field (used in TC01)
  async fillForm(data: any) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.email.fill(data.email);
    await this.page.getByText(data.gender, { exact: true }).click();
    await this.mobile.fill(data.mobile);
    await this.subjects.fill(data.subject);
    await this.subjects.press('Enter');
    await this.page.getByText(data.hobby, { exact: true }).click();
    await this.address.fill(data.address);
    await this.state.click();
    await this.page.getByText(data.state, { exact: true }).click();
    await this.city.click();
    await this.page.getByText(data.city, { exact: true }).click();
  }

  // Fill only the mandatory fields (used in TC02)
  async fillMandatory(data: any) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.page.getByText(data.gender, { exact: true }).click();
    await this.mobile.fill(data.mobile);
  }

  async submit() {
    await this.submitButton.click({ force: true });
  }

  async closeModal() {
    await this.closeButton.click({ force: true });
  }
}
