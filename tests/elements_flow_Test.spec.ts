import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC04 - Text Box and Radio Button in one session', { tag: '@sanity' }, async ({ textBoxPage, radioButtonPage }) => {
  const data = getTestData('TC04');

  // Part 1: Text Box
  await textBoxPage.openPage();
  await textBoxPage.fillAndSubmit(data);
  await expect(textBoxPage.outputName).toContainText(data.fullName);
  await expect(textBoxPage.outputEmail).toContainText(data.email);

  // Part 2: Radio Button
  await radioButtonPage.openPage();
  await radioButtonPage.selectOption(data.option);
  await expect(radioButtonPage.resultText).toHaveText(data.option);
});
