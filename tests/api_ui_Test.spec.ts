import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC08 - Set up data through the API, then verify and delete in the UI', { tag: '@sanity' }, async ({ bookStoreApiFlow, bookStoreUiFlow }) => {
  const data = getTestData('TC08');

  // API setup: user, token and one book
  const user = await bookStoreApiFlow.createUser(data.userNamePrefix, data.password);

  try {
    const token = await bookStoreApiFlow.getToken(user);
    await bookStoreApiFlow.addBook(user, token, data.isbn);

    // API check: the book is in the collection
    const booksBefore = await bookStoreApiFlow.getBooks(user, token);
    await bookStoreApiFlow.verifySingleBook(booksBefore, data.isbn);

    // UI check and action: the same book is visible, then it is deleted
    await bookStoreUiFlow.loginAs(user);
    await bookStoreUiFlow.verifyBookInProfile(data.bookTitle);
    await bookStoreUiFlow.deleteBookAndVerify(data.bookTitle);

    // API check: the collection is empty (a fresh token, because the UI login created a new one)
    const freshToken = await bookStoreApiFlow.getToken(user);
    const booksAfter = await bookStoreApiFlow.getBooks(user, freshToken);
    await bookStoreApiFlow.verifyNoBooks(booksAfter);
  } finally {
    await bookStoreApiFlow.cleanup(user);
  }
});