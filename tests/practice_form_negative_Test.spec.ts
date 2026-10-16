import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC02 - Practice Form validation, then successful submit', { tag: '@regression' }, async ({ practiceFormFlow }) => {
  const data = getTestData('TC02');

  await practiceFormFlow.submitEmptyForm();
  await practiceFormFlow.verifyNoConfirmation();

  await practiceFormFlow.registerWithMandatoryFields(data);
  await practiceFormFlow.verifyMandatoryRegistration(data);
});