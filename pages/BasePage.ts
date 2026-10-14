import { Page } from '@playwright/test';
export class BasePage {
  constructor(protected page: Page) {}

  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.hideAds();
  }
  async hideAds() {
    await this.page.addStyleTag({
      content: '#fixedban, footer, iframe[id^="google_ads"], iframe[title*="Advertisement"] { display: none !important; }',
    });
  }
}