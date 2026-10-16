import { BasePage } from '../core/BasePage';

export class UploadDownloadPage extends BasePage {
  readonly selectors = {
    downloadButton: '#downloadButton',
    uploadInput: '#uploadFile',
    uploadedPath: '#uploadedFilePath',
  };

  async openPage() {
    await this.open('/upload-download');
  }

  async uploadTextFile(fileName: string, content: string) {
    await this.uploadFile(this.selectors.uploadInput, fileName, content);
  }

  async downloadSampleFile(): Promise<{ name: string; size: number }> {
    return this.clickAndDownload(this.selectors.downloadButton);
  }
}