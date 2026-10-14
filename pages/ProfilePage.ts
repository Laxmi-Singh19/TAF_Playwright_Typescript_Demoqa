import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly userNameValue = this.page.locator('#userName-value');
  readonly logoutButton = this.page.getByRole('button', { name: /log\s?out/i });   // "Logout" or "Log out"
  readonly deleteIcon = this.page.locator('span[title="Delete"]').first();
  readonly confirmDeleteButton = this.page.locator('#closeSmallModal-ok');

  async openPage() {
    await this.open('/profile');
  }

  // Link of a book in the collection table, found by its title
  bookLink(title: string) {
    return this.page.getByRole('link', { name: title });
  }

  // Delete the first book: confirm the popup, and accept the alert that follows
  async deleteFirstBook() {
    this.page.once('dialog', async (dialog) => {
      try { await dialog.accept(); } catch { /* another listener already handled this alert */ }
    });
    await this.deleteIcon.click();
    await this.confirmDeleteButton.click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}