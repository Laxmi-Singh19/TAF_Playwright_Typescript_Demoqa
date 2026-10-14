import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC01 - Complete Practice Form registration', { tag: '@smoke' }, async ({ practiceFormPage }) => {
  const data = getTestData('TC01');

  // Step 1: open the form and fill all fields
  await practiceFormPage.openPage();
  await practiceFormPage.fillForm(data);

  // Step 2: submit
  await practiceFormPage.submit();

  // Step 3: verify the confirmation popup shows every entered value
  const modal = practiceFormPage.modal;
  await expect(modal).toContainText('Thanks for submitting the form');
  await expect(modal).toContainText(`${data.firstName} ${data.lastName}`);
  await expect(modal).toContainText(data.email);
  await expect(modal).toContainText(data.gender);
  await expect(modal).toContainText(data.mobile);
  await expect(modal).toContainText(data.subject);
  await expect(modal).toContainText(data.hobby);
  await expect(modal).toContainText(`${data.state} ${data.city}`);

  // Step 4: close the popup and confirm it is gone
  await practiceFormPage.closeModal();
  await expect(modal).toBeHidden();
});