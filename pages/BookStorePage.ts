import { BasePage } from '../core/BasePage';

export class BookStorePage extends BasePage {
  readonly selectors = {
    searchBox: '#searchBox',
    bookTitle: '#title-wrapper #userName-value',
    bookAuthor: '#author-wrapper #userName-value',
    addToCollection: 'role=button[name="Add To Your Collection"]',
  };

  async openPage() {
    await this.open('/books');
  }

  async search(text: string) {
    await this.type(this.selectors.searchBox, text);
  }

  async openBook(title: string) {
    await this.click(`a:has-text("${title}")`);
  }

  // Adding a book shows an alert. The listener is registered before the click.
  async addToCollection() {
    await this.acceptDialogOnClick(this.selectors.addToCollection);
  }
}