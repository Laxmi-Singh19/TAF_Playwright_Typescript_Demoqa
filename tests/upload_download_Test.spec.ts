import * as fs from 'fs';
import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC06 - Upload a file, then download a file and verify it', { tag: '@sanity' }, async ({ uploadDownloadPage }, testInfo) => {
  const data = getTestData('TC06');
  await uploadDownloadPage.openPage();

  // Upload: verify that the page shows the file name
  await uploadDownloadPage.uploadFile(data.uploadFileName, data.uploadContent);
  await expect(uploadDownloadPage.uploadedPath).toContainText(data.uploadFileName);

  // Download: verify the file name, save it, and check that it is not empty
  const download = await uploadDownloadPage.downloadFile();
  expect(download.suggestedFilename()).toBe(data.downloadFileName);

  const savedPath = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(savedPath);
  expect(fs.statSync(savedPath).size).toBeGreaterThan(0);
});