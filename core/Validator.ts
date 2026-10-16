import { Page, expect } from '@playwright/test';
import { step } from './Reporter';

// Validation layer: all checks are defined here. Tests and flows never call expect directly.
export class Validator {
  constructor(private page: Page) {}

  async verifyContainsText(selector: string, expected: string) {
    await step(`Verify ${selector} contains "${expected}"`, async () => {
      await expect(this.page.locator(selector)).toContainText(expected);
    });
  }

  async verifyHasText(selector: string, expected: string) {
    await step(`Verify ${selector} has text "${expected}"`, async () => {
      await expect(this.page.locator(selector)).toHaveText(expected);
    });
  }

  async verifyHasValue(selector: string, expected: string) {
    await step(`Verify ${selector} has value "${expected}"`, async () => {
      await expect(this.page.locator(selector)).toHaveValue(expected);
    });
  }

  async verifyNotContainsText(selector: string, unexpected: string) {
    await step(`Verify ${selector} does not contain "${unexpected}"`, async () => {
      await expect(this.page.locator(selector)).not.toContainText(unexpected);
    });
  }

  async verifyVisible(selector: string) {
    await step(`Verify ${selector} is visible`, async () => {
      await expect(this.page.locator(selector)).toBeVisible();
    });
  }

  async verifyHidden(selector: string) {
    await step(`Verify ${selector} is hidden`, async () => {
      await expect(this.page.locator(selector)).toBeHidden();
    });
  }

  async verifyHasClass(selector: string, className: string) {
    await step(`Verify ${selector} has class "${className}"`, async () => {
      await expect(this.page.locator(selector)).toHaveClass(new RegExp(className));
    });
  }

  async verifyCount(selector: string, count: number) {
    await step(`Verify ${selector} appears ${count} time(s)`, async () => {
      await expect(this.page.locator(selector)).toHaveCount(count);
    });
  }

  // Compare two values, for example the message of a dialog
  async verifyEquals(actual: string, expected: string, what: string) {
    await step(`Verify ${what} is "${expected}"`, async () => {
      expect(actual).toBe(expected);
    });
  }

  // A number must be bigger than a minimum, for example the size of a downloaded file
  async verifyGreaterThan(actual: number, minimum: number, what: string) {
    await step(`Verify ${what} (${actual}) is greater than ${minimum}`, async () => {
      expect(actual).toBeGreaterThan(minimum);
    });
  }

  // Text inside a frame (exact match)
  async verifyFrameText(frameSelector: string, selector: string, expected: string) {
    await step(`Verify ${selector} in frame ${frameSelector} has text "${expected}"`, async () => {
      await expect(this.page.frameLocator(frameSelector).locator(selector)).toHaveText(expected);
    });
  }

  // Text inside a frame (partial match)
  async verifyFrameContains(frameSelector: string, selector: string, expected: string) {
    await step(`Verify ${selector} in frame ${frameSelector} contains "${expected}"`, async () => {
      await expect(this.page.frameLocator(frameSelector).locator(selector)).toContainText(expected);
    });
  }

  // Text inside a frame that sits inside another frame
  async verifyNestedFrameContains(parentFrame: string, childFrame: string, selector: string, expected: string) {
    await step(`Verify ${selector} in nested frame ${parentFrame} > ${childFrame} contains "${expected}"`, async () => {
      await expect(this.page.frameLocator(parentFrame).frameLocator(childFrame).locator(selector)).toContainText(expected);
    });
  }
}