import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC07 - Book Store journey: login, add book, verify, delete, logout', { tag: '@smoke' }, async ({ bookStoreApiFlow, bookStoreUiFlow }) => {
  const data = getTestData('TC07');

  // Setup: a fresh user through the API (the registration page has a captcha)
  const user = await bookStoreApiFlow.createUser(data.userNamePrefix, data.password);

  try {
    await bookStoreUiFlow.loginAs(user);
    await bookStoreUiFlow.findAndAddBook(data);
    await bookStoreUiFlow.verifyBookInProfile(data.bookTitle);
    await bookStoreUiFlow.deleteBookAndVerify(data.bookTitle);
    await bookStoreUiFlow.logoutAndVerify();
  } finally {
    await bookStoreApiFlow.cleanup(user);   // always remove the test user
  }
});