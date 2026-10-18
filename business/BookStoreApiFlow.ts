import { BookStoreApi } from '../services/BookStoreApi';
import { Validator } from '../core/Validator';
import { Logger } from '../core/Logger';

export type TestUser = { userName: string; password: string; userId: string };

// Business layer: what a tester does through the Book Store API
export class BookStoreApiFlow {
  constructor(private api: BookStoreApi, private check: Validator) {}

  // A new name for every run, so tests never clash
  private uniqueName(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  async createUser(prefix: string, password: string): Promise<TestUser> {
    const userName = this.uniqueName(prefix);
    const response = await this.api.createUser(userName, password);
    await this.check.verifyNumberEquals(response.status, 201, 'create user status');
    return { userName, password, userId: response.body.userID };
  }

  // A new login creates a new token, so ask for a fresh token whenever you need one
  async getToken(user: TestUser): Promise<string> {
    const response = await this.api.generateToken(user.userName, user.password);
    await this.check.verifyNumberEquals(response.status, 200, 'generate token status');
    return response.body.token;
  }

  async addBook(user: TestUser, token: string, isbn: string) {
    const response = await this.api.addBook(user.userId, token, isbn);
    await this.check.verifyNumberEquals(response.status, 201, 'add book status');
  }

  async getBooks(user: TestUser, token: string): Promise<any[]> {
    const response = await this.api.getUser(user.userId, token);
    await this.check.verifyNumberEquals(response.status, 200, 'get user status');
    return response.body.books;
  }

  async verifySingleBook(books: any[], isbn: string) {
    await this.check.verifyNumberEquals(books.length, 1, 'number of books');
    await this.check.verifyEquals(books[0].isbn, isbn, 'book ISBN');
  }

  async verifyNoBooks(books: any[]) {
    await this.check.verifyNumberEquals(books.length, 0, 'number of books');
  }

  // Cleanup is best effort: a problem here must not fail a test that has already passed
  async cleanup(user: TestUser) {
    try {
      const token = await this.getToken(user);
      await this.api.deleteUser(user.userId, token);
    } catch (error) {
      Logger.warn(`Cleanup failed for ${user.userName}: ${(error as Error).message.split('\n')[0]}`);
    }
  }
}