import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

const dataSets = getTestData('TC10');   // a list of 3 data sets

// One test is created for each data set
for (const data of dataSets) {
  test(`TC10 - Text Box: ${data.caseName}`, { tag: '@sanity' }, async ({ textBoxFlow }) => {
    await textBoxFlow.submitForm(data);
    await textBoxFlow.verifyOutcome(data);
  });
}