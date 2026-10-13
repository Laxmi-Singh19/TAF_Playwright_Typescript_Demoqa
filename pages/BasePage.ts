import { Page } from '@playwright/test';

// Common class that every page object extends
export class BasePage {
  // 'page' is the browser tab that Playwright gives to each test
  constructor(protected page: Page) {}

  // Open a URL. A path like '/text-box' is added to the baseURL in playwright.config.ts
  async open(url: string) {
    await this.page.goto(url);
    await this.hideAds();
  }

  // DemoQA shows ads and a footer that can cover buttons and block clicks.
  // This hides them so that clicks work reliably.
  async hideAds() {
    await this.page.addStyleTag({
      content: '#fixedban, footer, iframe { display: none !important; }',
    });
  }
}
