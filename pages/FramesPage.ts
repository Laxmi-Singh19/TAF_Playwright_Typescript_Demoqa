import { BasePage } from './BasePage';

export class FramesPage extends BasePage {
  // Frames page: two separate iframes, each with a heading inside it
  readonly largeFrameHeading = this.page.frameLocator('#frame1').locator('#sampleHeading');
  readonly smallFrameHeading = this.page.frameLocator('#frame2').locator('#sampleHeading');

  // Nested Frames page: a child iframe inside a parent iframe
  readonly parentFrame = this.page.frameLocator('#frame1');
  readonly parentFrameBody = this.parentFrame.locator('body');
  readonly childFrameBody = this.parentFrame.frameLocator('iframe').locator('body');

  async openFramesPage() {
    await this.open('/frames');
  }

  async openNestedFramesPage() {
    await this.open('/nestedframes');
  }
}