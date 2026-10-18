import { BasePage } from '../core/BasePage';

export class ProfilePage extends BasePage {
  readonly selectors = {
    userNameValue: '#userName-value',
    logoutButton: 'button:text-matches("log\\s?out", "i")',   // "Logout" or "Log out"
    deleteIcon: 'span[title="Delete"] >> nth=0',
    confirmDelete: '#closeSmallModal-ok',
  };

  async openPage() {
    await this.open('/profile');
  }

  // Selector of a book link in the collection table, found by its title
  bookLink(title: string): string {
    return `a:has-text("${title}")`;
  }

  // Delete the first book: confirm the popup, and accept the alert that follows
  async deleteFirstBook() {
    await this.click(this.selectors.deleteIcon);
    await this.acceptDialogOnClick(this.selectors.confirmDelete);
  }

  async logout() {
    await this.click(this.selectors.logoutButton);
  }
}