import { UiDriver, DownloadResult } from './UiDriver';
import { step } from './Reporter';

// Base page: all UI actions are defined here, and every action is logged as a step.
// It works with the UiDriver contract only, so it does not know which tool is underneath.
export class BasePage {
  constructor(protected driver: UiDriver) {}

  async open(path: string) {
    await step(`Open page ${path}`, () => this.driver.open(path));
  }

  async click(selector: string) {
    await step(`Click ${selector}`, () => this.driver.click(selector));
  }

  async forceClick(selector: string) {
    await step(`Click ${selector} (forced)`, () => this.driver.forceClick(selector));
  }

  async type(selector: string, text: string) {
    await step(`Type "${text}" in ${selector}`, () => this.driver.type(selector, text));
  }

  async press(selector: string, key: string) {
    await step(`Press ${key} on ${selector}`, () => this.driver.press(selector, key));
  }

  async pressKey(key: string) {
    await step(`Press key ${key}`, () => this.driver.pressKey(key));
  }

  async getText(selector: string): Promise<string> {
    return step(`Read text of ${selector}`, () => this.driver.getText(selector));
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.driver.isVisible(selector);
  }

  // Returns true when the element becomes hidden, false if it stays visible
  async waitUntilHidden(selector: string): Promise<boolean> {
    return step(`Wait until ${selector} is hidden`, () => this.driver.waitUntilHidden(selector));
  }

  // Click a button that opens a browser dialog, accept it (OK), and return its message
  async acceptDialogOnClick(selector: string, promptText?: string): Promise<string> {
    return step(`Click ${selector} and accept the dialog`, () => this.driver.acceptDialogOnClick(selector, promptText));
  }

  // Click a button that opens a browser dialog, dismiss it (Cancel), and return its message
  async dismissDialogOnClick(selector: string): Promise<string> {
    return step(`Click ${selector} and dismiss the dialog`, () => this.driver.dismissDialogOnClick(selector));
  }

  // Click a button that opens a new tab, read a text from the new tab, close the tab, and return the text
  async clickAndReadFromNewTab(clickSelector: string, textSelector: string): Promise<string> {
    return step(`Click ${clickSelector} and read ${textSelector} from the new tab`, () =>
      this.driver.clickAndReadFromNewTab(clickSelector, textSelector));
  }

  // Upload a file that is created in memory, so no file is needed on disk
  async uploadFile(selector: string, fileName: string, content: string) {
    await step(`Upload file "${fileName}" to ${selector}`, () => this.driver.uploadFile(selector, fileName, content));
  }

  // Click a download button and return the name and the size (in bytes) of the downloaded file
  async clickAndDownload(selector: string): Promise<DownloadResult> {
    return step(`Click ${selector} and download the file`, () => this.driver.clickAndDownload(selector));
  }

  // Drag one element onto another one
  async dragAndDrop(sourceSelector: string, targetSelector: string) {
    await step(`Drag ${sourceSelector} to ${targetSelector}`, () => this.driver.dragAndDrop(sourceSelector, targetSelector));
  }
}