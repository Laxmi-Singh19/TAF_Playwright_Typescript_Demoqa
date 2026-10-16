import { AlertsPage } from '../pages/AlertsPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with the different alerts
export class AlertsFlow {
  constructor(private alerts: AlertsPage, private check: Validator) {}

  async openAlertsPage() {
    await this.alerts.openPage();
  }

  async handleSimpleAlert() {
    const message = await this.alerts.acceptSimpleAlert();
    await this.check.verifyEquals(message, 'You clicked a button', 'simple alert message');
  }

  async handleTimerAlert() {
    const message = await this.alerts.acceptTimerAlert();
    await this.check.verifyEquals(message, 'This alert appeared after 5 seconds', 'timer alert message');
  }

  async handleConfirmAlert() {
    const result = this.alerts.selectors.confirmResult;

    const okMessage = await this.alerts.acceptConfirmAlert();
    await this.check.verifyEquals(okMessage, 'Do you confirm action?', 'confirm alert message');
    await this.check.verifyContainsText(result, 'You selected Ok');

    await this.alerts.dismissConfirmAlert();
    await this.check.verifyContainsText(result, 'You selected Cancel');
  }

  async handlePromptAlert(name: string) {
    const message = await this.alerts.acceptPromptAlert(name);
    await this.check.verifyEquals(message, 'Please enter your name', 'prompt alert message');
    await this.check.verifyContainsText(this.alerts.selectors.promptResult, `You entered ${name}`);
  }
}