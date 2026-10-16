import { BasePage } from '../core/BasePage';

export class FramesPage extends BasePage {
  readonly selectors = {
    largeFrame: '#frame1',
    smallFrame: '#frame2',
    heading: '#sampleHeading',
    parentFrame: '#frame1',
    childFrame: 'iframe',
    body: 'body',
  };

  async openFramesPage() {
    await this.open('/frames');
  }

  async openNestedFramesPage() {
    await this.open('/nestedframes');
  }
}