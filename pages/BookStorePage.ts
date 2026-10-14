import { BasePage } from './BasePage';

export class BookStorePage extends BasePage {
  readonly searchBox = this.page.locator('#searchBox');
  readonly bookTitle = this.page.locator('#title-wrapper #userName-value');
  readonly bookAuthor = this.page.locator('#author-wrapper #userName-value');
  readonly backButton = this.page.getByRole('button', { name: 'Back To Book Store' });
  readonly addToCollectionButton = this.page.getByRole('button', { name: 'Add To Your Collection' });

  async openPage() {
    await this.open('/books');
  }

  async search(text: string) {
    await this.searchBox.fill(text);
  }

  async openBook(title: string) {
    await this.page.getByRole('link', { name: title }).click();
  }

  // Adding a book shows an alert, so the listener is registered before the click
  async addToCollection() {
    this.page.once('dialog', async (dialog) => {
      try { await dialog.accept(); } catch { /* another listener already handled this alert */ }
    });
    await this.addToCollectionButton.click();
  }
}