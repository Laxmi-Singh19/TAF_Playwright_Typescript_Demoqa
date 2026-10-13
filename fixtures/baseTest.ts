import { test as base } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { BookStorePage } from '../pages/BookStorePage';

// List of page objects that every test can use
type MyPages = {
  textBoxPage: TextBoxPage;
  radioButtonPage: RadioButtonPage;
  webTablesPage: WebTablesPage;
  practiceFormPage: PracticeFormPage;
  bookStorePage: BookStorePage;
};

export const test = base.extend<MyPages>({
  textBoxPage: async ({ page }, use) => { await use(new TextBoxPage(page)); },
  radioButtonPage: async ({ page }, use) => { await use(new RadioButtonPage(page)); },
  webTablesPage: async ({ page }, use) => { await use(new WebTablesPage(page)); },
  practiceFormPage: async ({ page }, use) => { await use(new PracticeFormPage(page)); },
  bookStorePage: async ({ page }, use) => { await use(new BookStorePage(page)); },
});

export { expect } from '@playwright/test';
