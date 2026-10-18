import { ApiClient, ApiResponse } from '../core/ApiClient';

// Service module: one method for each Book Store API endpoint.
// It only sends the call and returns the response. The checks are done in the business layer.
export class BookStoreApi {
  constructor(private client: ApiClient) {}

  createUser(userName: string, password: string): Promise<ApiResponse> {
    return this.client.post('/Account/v1/User', { data: { userName, password } });
  }

  generateToken(userName: string, password: string): Promise<ApiResponse> {
    return this.client.post('/Account/v1/GenerateToken', { data: { userName, password } });
  }

  addBook(userId: string, token: string, isbn: string): Promise<ApiResponse> {
    return this.client.post('/BookStore/v1/Books', {
      token,
      data: { userId, collectionOfIsbns: [{ isbn }] },
    });
  }

  getUser(userId: string, token: string): Promise<ApiResponse> {
    return this.client.get(`/Account/v1/User/${userId}`, { token });
  }

  deleteUser(userId: string, token: string): Promise<ApiResponse> {
    return this.client.delete(`/Account/v1/User/${userId}`, { token });
  }
}