import { FramesPage } from '../pages/FramesPage';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with frames and new browser tabs
export class FramesWindowsFlow {
  constructor(
    private frames: FramesPage,
    private windows: BrowserWindowsPage,
    private check: Validator,
  ) {}

  async verifyFrames(data: any) {
    const s = this.frames.selectors;
    await this.frames.openFramesPage();
    await this.check.verifyFrameText(s.largeFrame, s.heading, data.frameText);
    await this.check.verifyFrameText(s.smallFrame, s.heading, data.frameText);
  }

  async verifyNestedFrames(data: any) {
    const s = this.frames.selectors;
    await this.frames.openNestedFramesPage();
    await this.check.verifyFrameContains(s.parentFrame, s.body, data.parentText);
    await this.check.verifyNestedFrameContains(s.parentFrame, s.childFrame, s.body, data.childText);
  }

  async verifyNewTab(data: any) {
    await this.windows.openPage();
    const heading = await this.windows.openNewTabAndReadHeading();
    await this.check.verifyEquals(heading, data.frameText, 'new tab heading');
    await this.check.verifyVisible(this.windows.selectors.newTabButton);   // back on the original page
  }
}