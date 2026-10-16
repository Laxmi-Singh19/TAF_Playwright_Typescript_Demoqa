import { PracticeFormPage } from '../pages/PracticeFormPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with the Practice Form
export class PracticeFormFlow {
  constructor(private form: PracticeFormPage, private check: Validator) {}

  async registerStudent(data: any) {
    await this.form.openPage();
    await this.form.fillAllFields(data);
    await this.form.submit();
  }

  async verifyRegistration(data: any) {
    const modal = this.form.selectors.modal;
    await this.check.verifyContainsText(modal, 'Thanks for submitting the form');
    await this.check.verifyContainsText(modal, `${data.firstName} ${data.lastName}`);
    await this.check.verifyContainsText(modal, data.email);
    await this.check.verifyContainsText(modal, data.gender);
    await this.check.verifyContainsText(modal, data.mobile);
    await this.check.verifyContainsText(modal, data.subject);
    await this.check.verifyContainsText(modal, data.hobby);
    await this.check.verifyContainsText(modal, `${data.state} ${data.city}`);
  }

  async closeConfirmationAndVerify() {
    await this.form.closeConfirmation();
    await this.check.verifyHidden(this.form.selectors.modal);
  }

  async submitEmptyForm() {
    await this.form.openPage();
    await this.form.submit();
  }

  async verifyNoConfirmation() {
    await this.check.verifyHidden(this.form.selectors.modal);
  }

  async registerWithMandatoryFields(data: any) {
    await this.form.fillMandatoryFields(data);
    await this.form.submit();
  }

  async verifyMandatoryRegistration(data: any) {
    const modal = this.form.selectors.modal;
    await this.check.verifyContainsText(modal, 'Thanks for submitting the form');
    await this.check.verifyContainsText(modal, `${data.firstName} ${data.lastName}`);
    await this.check.verifyContainsText(modal, data.mobile);
  }
}