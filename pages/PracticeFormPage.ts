import { BasePage } from '../core/BasePage';

export class PracticeFormPage extends BasePage {

  readonly selectors = {
    firstName: '#firstName',
    lastName: '#lastName',
    email: '#userEmail',
    mobile: '#userNumber',
    subjects: '#subjectsInput',
    address: '#currentAddress',
    state: '#state',
    city: '#city',
    submit: '#submit',
    modal: '.modal-content',
    closeButton: '#closeLargeModal',
  };

  private option(text: string): string {
    return `text="${text}"`;
  }

  async openPage() {
    await this.open('/automation-practice-form');
  }

  async fillAllFields(data: any) {
    await this.type(this.selectors.firstName, data.firstName);
    await this.type(this.selectors.lastName, data.lastName);
    await this.type(this.selectors.email, data.email);

    await this.click(this.option(data.gender));

    await this.type(this.selectors.mobile, data.mobile);

    await this.type(this.selectors.subjects, data.subject);
    await this.press(this.selectors.subjects, 'Enter');

    await this.click(this.option(data.hobby));

    await this.type(this.selectors.address, data.address);

    await this.click(this.selectors.state);
    await this.click(this.option(data.state));

    await this.click(this.selectors.city);
    await this.click(this.option(data.city));
  }
  async fillMandatoryFields(data: any) {
    await this.type(this.selectors.firstName, data.firstName);
    await this.type(this.selectors.lastName, data.lastName);

    await this.click(this.option(data.gender));

    await this.type(this.selectors.mobile, data.mobile);
  }

  async submit() {
    await this.forceClick(this.selectors.submit);
  }
  
  async closeConfirmation() {
    await this.click(this.selectors.closeButton);

    const closed = await this.waitUntilHidden(this.selectors.modal);

    if (!closed) {
      await this.pressKey('Escape');
      await this.waitUntilHidden(this.selectors.modal);
    }
  }
}
