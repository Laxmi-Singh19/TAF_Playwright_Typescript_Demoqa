import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class BrowserWindowsPage extends BasePage {
  readonly newTabButton = this.page.locator('#tabButton');

  async openPage() {
    await this.open('/browser-windows');
  }

  // Click the button and return the new tab that opens
  async clickAndGetNewTab(): Promise<Page> {
    const newTabPromise = this.page.context().waitForEvent('page');   // 1. start listening first
    await this.newTabButton.click();                                   // 2. then open the tab
    const newTab = await newTabPromise;
    await newTab.waitForLoadState('domcontentloaded');                 // 3. wait until the new tab is ready
    return newTab;
  }
}