import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC01 - Complete Practice Form registration', { tag: '@smoke' }, async ({ practiceFormFlow }) => {
  const data = getTestData('TC01');

  await practiceFormFlow.registerStudent(data);
  await practiceFormFlow.verifyRegistration(data);
  await practiceFormFlow.closeConfirmationAndVerify();
});