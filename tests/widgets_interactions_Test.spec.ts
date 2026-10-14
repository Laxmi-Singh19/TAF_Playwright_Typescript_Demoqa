import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC09 - Date picker, auto-complete and drag and drop', { tag: '@regression' }, async ({ widgetsPage, interactionsPage }) => {
  const data = getTestData('TC09');

  // Part 1: Date Picker
  await widgetsPage.openDatePicker();
  await widgetsPage.setDate(data.date);
  await expect(widgetsPage.dateInput).toHaveValue(data.date);

  // Part 2: Auto Complete
  await widgetsPage.openAutoComplete();
  await widgetsPage.selectColor(data.colorSearch, data.colorOption);
  await expect(widgetsPage.selectedColors).toHaveText(data.colorOption);

  // Part 3: Drag and Drop
  await interactionsPage.openDroppablePage();
  await interactionsPage.dragToTarget();
  await expect(interactionsPage.droppable).toHaveText('Dropped!');
});