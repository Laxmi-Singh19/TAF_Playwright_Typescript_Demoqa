import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC05 - Frames, nested frames and new browser tab', { tag: '@regression' }, async ({ framesPage, browserWindowsPage }) => {
  const data = getTestData('TC05');

  // Part 1: two separate frames
  await framesPage.openFramesPage();
  await expect(framesPage.largeFrameHeading).toHaveText(data.frameText);
  await expect(framesPage.smallFrameHeading).toHaveText(data.frameText);

  // Part 2: a child frame inside a parent frame
  await framesPage.openNestedFramesPage();
  await expect(framesPage.parentFrameBody).toContainText(data.parentText);
  await expect(framesPage.childFrameBody).toContainText(data.childText);

  // Part 3: open a new tab, verify it, close it, and come back
  await browserWindowsPage.openPage();
  const newTab = await browserWindowsPage.clickAndGetNewTab();
  await expect(newTab.locator('#sampleHeading')).toHaveText(data.frameText);
  await newTab.close();
  await expect(browserWindowsPage.newTabButton).toBeVisible();
});