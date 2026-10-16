import { Page, Locator } from '@playwright/test';
import { step } from './Reporter';

// Base page: all UI actions are defined here. Pages never call Playwright directly.
export class BasePage {
  constructor(protected page: Page) {}

  private el(selector: string): Locator {
    return this.page.locator(selector);
  }

  async open(path: string) {
    await step(`Open page ${path}`, async () => {
      await this.page.goto(path, { waitUntil: 'domcontentloaded' });
      await this.hideAds();
    });
  }

  // DemoQA ads and the footer can cover buttons, so they are hidden
  private async hideAds() {
    await this.page.addStyleTag({
      content: '#fixedban, footer, iframe[id^="google_ads"], iframe[title*="Advertisement"] { display: none !important; }',
    });
  }

  async click(selector: string) {
    await step(`Click ${selector}`, async () => { await this.el(selector).click(); });
  }

  async forceClick(selector: string) {
    await step(`Click ${selector} (forced)`, async () => { await this.el(selector).click({ force: true }); });
  }

  async type(selector: string, text: string) {
    await step(`Type "${text}" in ${selector}`, async () => { await this.el(selector).fill(text); });
  }

  async press(selector: string, key: string) {
    await step(`Press ${key} on ${selector}`, async () => { await this.el(selector).press(key); });
  }

  async pressKey(key: string) {
    await step(`Press key ${key}`, async () => { await this.page.keyboard.press(key); });
  }

  async getText(selector: string): Promise<string> {
    return step(`Read text of ${selector}`, async () => (await this.el(selector).innerText()));
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.el(selector).isVisible();
  }

  // Returns true when the element becomes hidden, false if it stays visible
  async waitUntilHidden(selector: string): Promise<boolean> {
    return step(`Wait until ${selector} is hidden`, async () => {
      try {
        await this.el(selector).waitFor({ state: 'hidden' });
        return true;
      } catch {
        return false;
      }
    });
  }

  // Click a button that opens a browser dialog, accept it (OK), and return its message.
  // The listener is registered BEFORE the click, because an open dialog blocks the page.
  async acceptDialogOnClick(selector: string, promptText?: string): Promise<string> {
    return step(`Click ${selector} and accept the dialog`, async () => {
      const message = new Promise<string>((resolve) => {
        this.page.once('dialog', async (dialog) => {
          const text = dialog.message();
          try { await dialog.accept(promptText); } catch { /* already handled by another listener */ }
          resolve(text);
        });
      });
      await this.el(selector).click();
      return message;
    });
  }

  // Click a button that opens a browser dialog, dismiss it (Cancel), and return its message
  async dismissDialogOnClick(selector: string): Promise<string> {
    return step(`Click ${selector} and dismiss the dialog`, async () => {
      const message = new Promise<string>((resolve) => {
        this.page.once('dialog', async (dialog) => {
          const text = dialog.message();
          try { await dialog.dismiss(); } catch { /* already handled by another listener */ }
          resolve(text);
        });
      });
      await this.el(selector).click();
      return message;
    });
  }

  // Click a button that opens a new tab, read a text from the new tab, close the tab, and return the text
  async clickAndReadFromNewTab(clickSelector: string, textSelector: string): Promise<string> {
    return step(`Click ${clickSelector} and read ${textSelector} from the new tab`, async () => {
      const tabPromise = this.page.context().waitForEvent('page');
      await this.el(clickSelector).click();
      const tab = await tabPromise;
      await tab.waitForLoadState('domcontentloaded');
      const text = (await tab.locator(textSelector).innerText()).trim();
      await tab.close();
      return text;
    });
  }
}