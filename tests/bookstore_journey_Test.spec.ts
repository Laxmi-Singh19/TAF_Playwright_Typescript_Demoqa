import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';
import { createUser, cleanupUser, uniqueName } from '../utils/apiHelper';

test('TC07 - Book Store journey: login, add book, verify, delete, logout', { tag: '@smoke' }, async ({ request, loginPage, bookStorePage, profilePage }) => {
  const data = getTestData('TC07');
  const userName = uniqueName(data.userNamePrefix);

  // Setup: create a fresh user through the API (the registration page has a captcha)
  const userId = await createUser(request, userName, data.password);

  try {
    await loginPage.openPage();
    await loginPage.login(userName, data.password);
    await expect(profilePage.userNameValue).toHaveText(userName);

    // Step 2: find the book, check its details, and add it
    await bookStorePage.openPage();
    await bookStorePage.search(data.bookTitle);
    await bookStorePage.openBook(data.bookTitle);
    await expect(bookStorePage.bookTitle).toHaveText(data.bookTitle);
    await expect(bookStorePage.bookAuthor).toHaveText(data.bookAuthor);
    await bookStorePage.addToCollection();

    // Step 3: verify the book in the profile
    await profilePage.openPage();
    await expect(profilePage.bookLink(data.bookTitle)).toBeVisible();

    // Step 4: delete the book and verify that it is gone
    await profilePage.deleteFirstBook();
    await expect(profilePage.bookLink(data.bookTitle)).toBeHidden();

    // Step 5: log out
    await profilePage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  } finally {
    await cleanupUser(request, userId, userName, data.password);   // always remove the test user
  }
});