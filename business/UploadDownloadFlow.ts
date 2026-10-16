import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { Validator } from '../core/Validator';

// Business layer: what a user does with file upload and download
export class UploadDownloadFlow {
  constructor(private files: UploadDownloadPage, private check: Validator) {}

  async uploadAndVerify(data: any) {
    await this.files.openPage();
    await this.files.uploadTextFile(data.uploadFileName, data.uploadContent);
    await this.check.verifyContainsText(this.files.selectors.uploadedPath, data.uploadFileName);
  }

  async downloadAndVerify(data: any) {
    const file = await this.files.downloadSampleFile();
    await this.check.verifyEquals(file.name, data.downloadFileName, 'downloaded file name');
    await this.check.verifyGreaterThan(file.size, 0, 'downloaded file size');
  }
}