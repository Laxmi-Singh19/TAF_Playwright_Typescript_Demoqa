export interface DownloadResult {
  name: string;   // file name of the downloaded file
  size: number;   // size in bytes
}

export interface UiDriver {
  // Navigation
  open(path: string): Promise<void>;

  // Mouse and keyboard
  click(selector: string): Promise<void>;
  forceClick(selector: string): Promise<void>;
  type(selector: string, text: string): Promise<void>;
  press(selector: string, key: string): Promise<void>;
  pressKey(key: string): Promise<void>;
  dragAndDrop(sourceSelector: string, targetSelector: string): Promise<void>;

  // Reading the page
  getText(selector: string): Promise<string>;
  isVisible(selector: string): Promise<boolean>;
  waitUntilHidden(selector: string): Promise<boolean>;   // true when it became hidden

  // Browser dialogs (alerts): the message of the dialog is returned
  acceptDialogOnClick(selector: string, promptText?: string): Promise<string>;
  dismissDialogOnClick(selector: string): Promise<string>;

  // New tab: click a button, read a text from the new tab, close the tab, return the text
  clickAndReadFromNewTab(clickSelector: string, textSelector: string): Promise<string>;

  // Files
  uploadFile(selector: string, fileName: string, content: string): Promise<void>;
  clickAndDownload(selector: string): Promise<DownloadResult>;
}