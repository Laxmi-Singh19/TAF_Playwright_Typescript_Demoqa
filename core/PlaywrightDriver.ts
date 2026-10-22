import { Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import { UiDriver, DownloadResult } from './UiDriver';

// The Playwright implementation of the UiDriver contract.
// This is the only class that talks to the Playwright page.
// It contains no logging: logging stays in the base page, so it works with any driver.
export class PlaywrightDriver implements UiDriver {
  constructor(private page: Page) {}

  private el(selector: string): Locator {
    return this.page.locator(selector);
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    await this.hideAds();
  }

  // DemoQA ads and the footer can cover buttons, so they are hidden
  private async hideAds(): Promise<void> {
    await this.page.addStyleTag({
      content: '#fixedban, footer, iframe[id^="google_ads"], iframe[title*="Advertisement"] { display: none !important; }',
    });
  }

  async click(selector: string): Promise<void> {
    await this.el(selector).click();
  }

  async forceClick(selector: string): Promise<void> {
    await this.el(selector).click({ force: true });
  }

  async type(selector: string, text: string): Promise<void> {
    await this.el(selector).fill(text);
  }

  async press(selector: string, key: string): Promise<void> {
    await this.el(selector).press(key);
  }

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async getText(selector: string): Promise<string> {
    return this.el(selector).innerText();
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.el(selector).isVisible();
  }

  // Returns true when the element becomes hidden, false if it stays visible
  async waitUntilHidden(selector: string): Promise<boolean> {
    try {
      await this.el(selector).waitFor({ state: 'hidden' });
      return true;
    } catch {
      return false;
    }
  }

  // The listener is registered BEFORE the click, because an open dialog blocks the page
  async acceptDialogOnClick(selector: string, promptText?: string): Promise<string> {
    const message = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const text = dialog.message();
        try { await dialog.accept(promptText); } catch { /* already handled by another listener */ }
        resolve(text);
      });
    });
    await this.el(selector).click();
    return message;
  }

  async dismissDialogOnClick(selector: string): Promise<string> {
    const message = new Promise<string>((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const text = dialog.message();
        try { await dialog.dismiss(); } catch { /* already handled by another listener */ }
        resolve(text);
      });
    });
    await this.el(selector).click();
    return message;
  }

  async clickAndReadFromNewTab(clickSelector: string, textSelector: string): Promise<string> {
    const tabPromise = this.page.context().waitForEvent('page');   // listen first, then click
    await this.el(clickSelector).click();
    const tab = await tabPromise;
    await tab.waitForLoadState('domcontentloaded');
    const text = (await tab.locator(textSelector).innerText()).trim();
    await tab.close();
    return text;
  }

  // The file is created in memory, so no file is needed on disk
  async uploadFile(selector: string, fileName: string, content: string): Promise<void> {
    await this.el(selector).setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }

  async clickAndDownload(selector: string): Promise<DownloadResult> {
    const downloadPromise = this.page.waitForEvent('download');   // listen first, then click
    await this.el(selector).click();
    const download = await downloadPromise;
    const filePath = await download.path();
    return { name: download.suggestedFilename(), size: fs.statSync(filePath).size };
  }

  async dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void> {
    await this.el(targetSelector).waitFor();   // the page's drag and drop script must be ready
    await this.el(sourceSelector).scrollIntoViewIfNeeded();

    const from = await this.el(sourceSelector).boundingBox();
    const to = await this.el(targetSelector).boundingBox();
    if (!from || !to) throw new Error('Drag or drop element is not visible');

    const startX = from.x + from.width / 2;
    const startY = from.y + from.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.mouse.move(startX + 10, startY + 10, { steps: 5 });
    await this.page.mouse.move(to.x + to.width / 2, to.y + to.height / 2, { steps: 20 });
    await this.page.mouse.up();
  }
}