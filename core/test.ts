import { test as base } from '@playwright/test';
import { Validator } from './Validator';
import { Logger } from './Logger';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { AlertsPage } from '../pages/AlertsPage';
import { FramesPage } from '../pages/FramesPage';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';
import { PracticeFormFlow } from '../business/PracticeFormFlow';
import { WebTableFlow } from '../business/WebTableFlow';
import { TextBoxFlow } from '../business/TextBoxFlow';
import { AlertsFlow } from '../business/AlertsFlow';
import { FramesWindowsFlow } from '../business/FramesWindowsFlow';
import { UploadDownloadFlow } from '../business/UploadDownloadFlow';
import { WidgetsInteractionsFlow } from '../business/WidgetsInteractionsFlow';

// The test function and the business flows that tests can use.
// Tests import `test` from here, so they never import Playwright.
type Fixtures = {
  practiceFormFlow: PracticeFormFlow;
  webTableFlow: WebTableFlow;
  textBoxFlow: TextBoxFlow;
  alertsFlow: AlertsFlow;
  framesWindowsFlow: FramesWindowsFlow;
  uploadDownloadFlow: UploadDownloadFlow;
  widgetsInteractionsFlow: WidgetsInteractionsFlow;
  logContext: void;
};

export const test = base.extend<Fixtures>({
  // Runs automatically for every test: logs the start and the end
  logContext: [async ({}, use, testInfo) => {
    Logger.setTest(testInfo.title);
    Logger.info('TEST START');
    await use();
    Logger.info(`TEST END | status: ${testInfo.status}`);
  }, { auto: true }],

  practiceFormFlow: async ({ page }, use) => {
    await use(new PracticeFormFlow(new PracticeFormPage(page), new Validator(page)));
  },

  webTableFlow: async ({ page }, use) => {
    await use(new WebTableFlow(new WebTablesPage(page), new Validator(page)));
  },

  textBoxFlow: async ({ page }, use) => {
    await use(new TextBoxFlow(new TextBoxPage(page), new Validator(page)));
  },

  alertsFlow: async ({ page }, use) => {
    await use(new AlertsFlow(new AlertsPage(page), new Validator(page)));
  },

  framesWindowsFlow: async ({ page }, use) => {
    await use(new FramesWindowsFlow(new FramesPage(page), new BrowserWindowsPage(page), new Validator(page)));
  },

  uploadDownloadFlow: async ({ page }, use) => {
    await use(new UploadDownloadFlow(new UploadDownloadPage(page), new Validator(page)));
  },

  widgetsInteractionsFlow: async ({ page }, use) => {
    await use(new WidgetsInteractionsFlow(new WidgetsPage(page), new InteractionsPage(page), new Validator(page)));
  },
});