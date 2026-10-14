import { test as base } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { BookStorePage } from '../pages/BookStorePage';
import { AlertsPage } from '../pages/AlertsPage';
import { FramesPage } from '../pages/FramesPage';
import { BrowserWindowsPage } from '../pages/BrowserWindowsPage';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';
import { WidgetsPage } from '../pages/WidgetsPage';
import { InteractionsPage } from '../pages/InteractionsPage';

type MyPages = {
  textBoxPage: TextBoxPage;
  radioButtonPage: RadioButtonPage;
  webTablesPage: WebTablesPage;
  practiceFormPage: PracticeFormPage;
  bookStorePage: BookStorePage;
  alertsPage: AlertsPage;
  framesPage: FramesPage;
  browserWindowsPage: BrowserWindowsPage;
  uploadDownloadPage: UploadDownloadPage;
  loginPage: LoginPage;
  profilePage: ProfilePage;
  widgetsPage: WidgetsPage;
  interactionsPage: InteractionsPage;
};

export const test = base.extend<MyPages>({
  textBoxPage: async ({ page }, use) => { await use(new TextBoxPage(page)); },
  radioButtonPage: async ({ page }, use) => { await use(new RadioButtonPage(page)); },
  webTablesPage: async ({ page }, use) => { await use(new WebTablesPage(page)); },
  practiceFormPage: async ({ page }, use) => { await use(new PracticeFormPage(page)); },
  bookStorePage: async ({ page }, use) => { await use(new BookStorePage(page)); },
  alertsPage: async ({ page }, use) => { await use(new AlertsPage(page)); },
  framesPage: async ({ page }, use) => { await use(new FramesPage(page)); },
  browserWindowsPage: async ({ page }, use) => { await use(new BrowserWindowsPage(page)); },
  uploadDownloadPage: async ({ page }, use) => { await use(new UploadDownloadPage(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },
  widgetsPage: async ({ page }, use) => { await use(new WidgetsPage(page)); },
  interactionsPage: async ({ page }, use) => { await use(new InteractionsPage(page)); },
});

export { expect } from '@playwright/test';