import { test as base, Page } from '@playwright/test';
import { Validator } from './Validator';
import { Logger } from './Logger';
import { ApiClient } from './ApiClient';
import { UiDriver } from './UiDriver';
import { PlaywrightDriver } from './PlaywrightDriver';
import { BookStoreApi } from '../services/BookStoreApi';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { TextBoxPage } from '../pages/TextBoxPage';
import { AlertsPage } from '../pages/AlertsPage';
import { FramesPage } from '../pages/FramesPage';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';
import { LoginPage } from '../pages/LoginPage';
import { BookStorePage } from '../pages/BookStorePage';
import { ProfilePage } from '../pages/ProfilePage';
import { PracticeFormFlow } from '../business/PracticeFormFlow';
import { WebTableFlow } from '../business/WebTableFlow';
import { TextBoxFlow } from '../business/TextBoxFlow';
import { AlertsFlow } from '../business/AlertsFlow';
import { FramesWindowsFlow } from '../business/FramesWindowsFlow';
import { UploadDownloadFlow } from '../business/UploadDownloadFlow';
import { WidgetsInteractionsFlow } from '../business/WidgetsInteractionsFlow';
import { BookStoreApiFlow } from '../business/BookStoreApiFlow';
import { BookStoreUiFlow } from '../business/BookStoreUiFlow';

// The only place where a tool-specific driver is chosen.
// To use another tool, return another UiDriver here. Pages, flows and tests stay the same.
function createDriver(page: Page): UiDriver {
  return new PlaywrightDriver(page);
}

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
  bookStoreApiFlow: BookStoreApiFlow;
  bookStoreUiFlow: BookStoreUiFlow;
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
    const driver = createDriver(page);
    await use(new PracticeFormFlow(new PracticeFormPage(driver), new Validator(page)));
  },

  webTableFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new WebTableFlow(new WebTablesPage(driver), new Validator(page)));
  },

  textBoxFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new TextBoxFlow(new TextBoxPage(driver), new Validator(page)));
  },

  alertsFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new AlertsFlow(new AlertsPage(driver), new Validator(page)));
  },

  framesWindowsFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new FramesWindowsFlow(new FramesPage(driver), new BrowserWindowsPage(driver), new Validator(page)));
  },

  uploadDownloadFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new UploadDownloadFlow(new UploadDownloadPage(driver), new Validator(page)));
  },

  widgetsInteractionsFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new WidgetsInteractionsFlow(new WidgetsPage(driver), new InteractionsPage(driver), new Validator(page)));
  },

  bookStoreApiFlow: async ({ page, request }, use) => {
    await use(new BookStoreApiFlow(new BookStoreApi(new ApiClient(request)), new Validator(page)));
  },

  bookStoreUiFlow: async ({ page }, use) => {
    const driver = createDriver(page);
    await use(new BookStoreUiFlow(new LoginPage(driver), new BookStorePage(driver), new ProfilePage(driver), new Validator(page)));
  },
});