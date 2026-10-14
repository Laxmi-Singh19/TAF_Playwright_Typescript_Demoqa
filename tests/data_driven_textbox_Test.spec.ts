import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

const dataSets = getTestData('TC10');   // a list of 3 data sets

// One test is created for each data set
for (const data of dataSets) {
  test(`TC10 - Text Box: ${data.caseName}`, { tag: '@sanity' }, async ({ textBoxPage }) => {
    await textBoxPage.openPage();
    await textBoxPage.fillAndSubmit(data);

    if (data.isValid) {
      await expect(textBoxPage.outputName).toContainText(data.fullName);
      await expect(textBoxPage.outputEmail).toContainText(data.email);
    } else {
      await expect(textBoxPage.email).toHaveClass(/field-error/);
      await expect(textBoxPage.outputName).toHaveCount(0);
    }
  });
}