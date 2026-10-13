import { BasePage } from './BasePage';

export class BookStorePage extends BasePage {
  readonly searchBox = this.page.locator('#searchBox');
  readonly bookTitle = this.page.locator('#title-wrapper #userName-value');
  readonly bookAuthor = this.page.locator('#author-wrapper #userName-value');
  readonly backButton = this.page.getByRole('button', { name: 'Back To Book Store' });

  async openPage() {
    await this.open('/books');
  }

  async search(text: string) {
    await this.searchBox.fill(text);
  }

  async openBook(title: string) {
    await this.page.getByRole('link', { name: title }).click();
  }
}
