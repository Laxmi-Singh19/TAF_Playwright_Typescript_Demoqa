import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
  readonly alertButton = this.page.locator('#alertButton');
  readonly timerAlertButton = this.page.locator('#timerAlertButton');
  readonly confirmButton = this.page.locator('#confirmButton');
  readonly promptButton = this.page.locator('#promtButton');   // DemoQA spells it "promt"
  readonly confirmResult = this.page.locator('#confirmResult');
  readonly promptResult = this.page.locator('#promptResult');

  async openPage() {
    await this.open('/alerts');
  }

  // Accept the dialog (OK) when it appears, and return its message
  async clickAndAccept(button: Locator, promptText?: string): Promise<string> {
    const messagePromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {       // 1. listener is ready before the click
        const message = dialog.message();
        await dialog.accept(promptText);                  // 2. handled the moment it appears
        resolve(message);
      });
    });
    await button.click();                                 // 3. now the click can finish
    return messagePromise;                                // 4. also waits for the timer alert
  }

  // Dismiss the dialog (Cancel) when it appears, and return its message
  async clickAndDismiss(button: Locator): Promise<string> {
    const messagePromise = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.dismiss();
        resolve(message);
      });
    });
    await button.click();
    return messagePromise;
  }
}