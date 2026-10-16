import { TextBoxPage } from '../pages/TextBoxPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with the Text Box form
export class TextBoxFlow {
  constructor(private form: TextBoxPage, private check: Validator) {}

  async submitForm(data: any) {
    await this.form.openPage();
    await this.form.fillAndSubmit(data);
  }

  // Checks the right result for valid data and for invalid data
  async verifyOutcome(data: any) {
    const s = this.form.selectors;
    if (data.isValid) {
      await this.check.verifyContainsText(s.outputName, data.fullName);
      await this.check.verifyContainsText(s.outputEmail, data.email);
    } else {
      await this.check.verifyHasClass(s.email, 'field-error');
      await this.check.verifyCount(s.outputName, 0);
    }
  }
}