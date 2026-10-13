import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC05 - Search a book and verify its details', { tag: '@regression' }, async ({ bookStorePage }) => {
  const data = getTestData('TC05');

  await bookStorePage.openPage();
  await bookStorePage.search(data.searchText);
  await bookStorePage.openBook(data.title);

  await expect(bookStorePage.bookTitle).toHaveText(data.title);
  await expect(bookStorePage.bookAuthor).toHaveText(data.author);

  await bookStorePage.backButton.click();
  await expect(bookStorePage.searchBox).toBeVisible();
});
