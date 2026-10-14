import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC03 - Web Table add, edit, search and delete', { tag: '@smoke' }, async ({ webTablesPage }) => {
  const data = getTestData('TC03');
  await webTablesPage.openPage();

  // Create
  await webTablesPage.addRecord(data);
  await webTablesPage.search(data.email);
  await expect(webTablesPage.table).toContainText(data.firstName);
  await expect(webTablesPage.table).toContainText(data.age);

  // Update
  await webTablesPage.editAge(data.newAge);
  await expect(webTablesPage.table).toContainText(data.newAge);

  // Delete
  await webTablesPage.deleteFirstRow();
  await expect(webTablesPage.table).not.toContainText(data.email);
});