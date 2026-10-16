import { BasePage } from '../core/BasePage';

export class AlertsPage extends BasePage {
  readonly selectors = {
    alertButton: '#alertButton',
    timerAlertButton: '#timerAlertButton',
    confirmButton: '#confirmButton',
    promptButton: '#promtButton',   // DemoQA spells it "promt"
    confirmResult: '#confirmResult',
    promptResult: '#promptResult',
  };

  async openPage() {
    await this.open('/alerts');
  }

  async acceptSimpleAlert(): Promise<string> {
    return this.acceptDialogOnClick(this.selectors.alertButton);
  }

  async acceptTimerAlert(): Promise<string> {
    return this.acceptDialogOnClick(this.selectors.timerAlertButton);
  }

  async acceptConfirmAlert(): Promise<string> {
    return this.acceptDialogOnClick(this.selectors.confirmButton);
  }

  async dismissConfirmAlert(): Promise<string> {
    return this.dismissDialogOnClick(this.selectors.confirmButton);
  }

  async acceptPromptAlert(name: string): Promise<string> {
    return this.acceptDialogOnClick(this.selectors.promptButton, name);
  }
}