import { BasePage } from '../core/BasePage';

export class TextBoxPage extends BasePage {
  readonly selectors = {
    fullName: '#userName',
    email: '#userEmail',
    currentAddress: '#currentAddress',
    permanentAddress: '#permanentAddress',
    submit: '#submit',
    outputName: '#output #name',
    outputEmail: '#output #email',
  };

  async openPage() {
    await this.open('/text-box');
  }

  async fillAndSubmit(data: any) {
    await this.type(this.selectors.fullName, data.fullName);
    await this.type(this.selectors.email, data.email);
    await this.type(this.selectors.currentAddress, data.currentAddress);
    await this.type(this.selectors.permanentAddress, data.permanentAddress);
    await this.click(this.selectors.submit);
  }
}