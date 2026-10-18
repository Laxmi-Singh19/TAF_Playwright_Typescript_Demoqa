import { LoginPage } from '../pages/LoginPage';
import { BookStorePage } from '../pages/BookStorePage';
import { ProfilePage } from '../pages/ProfilePage';
import { Validator } from '../core/Validator';
import { TestUser } from './BookStoreApiFlow';

// Business layer: what a user does in the Book Store application
export class BookStoreUiFlow {
  constructor(
    private login: LoginPage,
    private store: BookStorePage,
    private profile: ProfilePage,
    private check: Validator,
  ) {}

  async loginAs(user: TestUser) {
    await this.login.openPage();
    await this.login.signIn(user.userName, user.password);
    // waits until the login has really finished
    await this.check.verifyHasText(this.profile.selectors.userNameValue, user.userName);
  }

  async findAndAddBook(data: any) {
    await this.store.openPage();
    await this.store.search(data.bookTitle);
    await this.store.openBook(data.bookTitle);
    await this.check.verifyHasText(this.store.selectors.bookTitle, data.bookTitle);
    await this.check.verifyHasText(this.store.selectors.bookAuthor, data.bookAuthor);
    await this.store.addToCollection();
  }

  async verifyBookInProfile(title: string) {
    await this.profile.openPage();
    await this.check.verifyVisible(this.profile.bookLink(title));
  }

  async deleteBookAndVerify(title: string) {
    await this.profile.deleteFirstBook();
    await this.check.verifyHidden(this.profile.bookLink(title));
  }

  async logoutAndVerify() {
    await this.profile.logout();
    await this.check.verifyVisible(this.login.selectors.loginButton);
  }
}