import { BasePage } from '../core/BasePage';

export class BrowserWindowsPage extends BasePage {
  readonly selectors = {
    newTabButton: '#tabButton',
    newTabHeading: '#sampleHeading',
  };

  async openPage() {
    await this.open('/browser-windows');
  }

  // Opens the new tab, reads its heading, closes the tab, and returns the heading text
  async openNewTabAndReadHeading(): Promise<string> {
    return this.clickAndReadFromNewTab(this.selectors.newTabButton, this.selectors.newTabHeading);
  }
}