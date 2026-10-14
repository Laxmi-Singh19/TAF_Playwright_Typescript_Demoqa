import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';
import { createUser, generateToken, addBookApi, getUserBooks, cleanupUser, uniqueName } from '../utils/apiHelper';

test('TC08 - Set up data through the API, then verify and delete in the UI', { tag: '@sanity' }, async ({ request, loginPage, profilePage }) => {
  const data = getTestData('TC08');
  const userName = uniqueName(data.userNamePrefix);

  // API setup: user, token, and one book
  const userId = await createUser(request, userName, data.password);
  const token = await generateToken(request, userName, data.password);

  try {
    await addBookApi(request, userId, token, data.isbn);

    // API check: the book is in the user's collection
    const booksBefore = await getUserBooks(request, userId, token);
    expect(booksBefore).toHaveLength(1);
    expect(booksBefore[0].isbn).toBe(data.isbn);

    // UI check: log in, wait for the profile, and see the same book
    await loginPage.openPage();
    await loginPage.login(userName, data.password);
    await expect(profilePage.userNameValue).toHaveText(userName);
    await expect(profilePage.bookLink(data.bookTitle)).toBeVisible();

    // UI action: delete the book and verify that it is gone
    await profilePage.deleteFirstBook();
    await expect(profilePage.bookLink(data.bookTitle)).toBeHidden();

    // API check: the collection is now empty (a fresh token, because the UI login created a new one)
    const freshToken = await generateToken(request, userName, data.password);
    const booksAfter = await getUserBooks(request, userId, freshToken);
    expect(booksAfter).toHaveLength(0);
  } finally {
    await cleanupUser(request, userId, userName, data.password);
  }
});