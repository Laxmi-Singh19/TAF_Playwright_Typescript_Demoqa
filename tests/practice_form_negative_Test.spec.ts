import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC02 - Practice Form validation, then successful submit', { tag: '@regression' }, async ({ practiceFormPage }) => {
  const data = getTestData('TC02');

  // Step 1: submit an empty form, so no confirmation popup should appear
  await practiceFormPage.openPage();
  await practiceFormPage.submit();
  await expect(practiceFormPage.modal).toBeHidden();

  // Step 2: fill only the mandatory fields and submit again
  await practiceFormPage.fillMandatory(data);
  await practiceFormPage.submit();

  // Step 3: verify the popup now appears with the entered values
  await expect(practiceFormPage.modal).toContainText('Thanks for submitting the form');
  await expect(practiceFormPage.modal).toContainText(`${data.firstName} ${data.lastName}`);
  await expect(practiceFormPage.modal).toContainText(data.mobile);
});