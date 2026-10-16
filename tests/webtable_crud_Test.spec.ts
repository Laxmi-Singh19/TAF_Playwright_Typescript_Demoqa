import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC03 - Web Table add, edit, search and delete', { tag: '@smoke' }, async ({ webTableFlow }) => {
  const data = getTestData('TC03');

  await webTableFlow.addAndFindRecord(data);
  await webTableFlow.verifyRecordShown(data);
  await webTableFlow.updateAge(data);
  await webTableFlow.deleteRecord(data);
});