import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC09 - Date picker, auto-complete and drag and drop', { tag: '@regression' }, async ({ widgetsInteractionsFlow }) => {
  const data = getTestData('TC09');

  await widgetsInteractionsFlow.pickDate(data);
  await widgetsInteractionsFlow.chooseColor(data);
  await widgetsInteractionsFlow.dragAndDropBox();
});