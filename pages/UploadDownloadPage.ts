import { Download } from '@playwright/test';
import { BasePage } from './BasePage';

export class UploadDownloadPage extends BasePage {
  readonly downloadButton = this.page.locator('#downloadButton');
  readonly uploadInput = this.page.locator('#uploadFile');
  readonly uploadedPath = this.page.locator('#uploadedFilePath');

  async openPage() {
    await this.open('/upload-download');
  }

  // Create the file in memory, so no file is needed on disk
  async uploadFile(fileName: string, content: string) {
    await this.uploadInput.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }

  // Start listening for the download first, then click
  async downloadFile(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();
    return downloadPromise;
  }
}