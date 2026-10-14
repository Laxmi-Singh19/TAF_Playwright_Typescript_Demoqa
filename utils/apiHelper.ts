import { APIRequestContext, expect } from '@playwright/test';

// Unique name for every run, so tests never clash
export function uniqueName(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

export async function createUser(request: APIRequestContext, userName: string, password: string): Promise<string> {
  const response = await request.post('/Account/v1/User', { data: { userName, password } });
  expect(response.status()).toBe(201);
  const body = await response.json();
  return body.userID;
}

export async function generateToken(request: APIRequestContext, userName: string, password: string): Promise<string> {
  const response = await request.post('/Account/v1/GenerateToken', { data: { userName, password } });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  return body.token;
}

export async function addBookApi(request: APIRequestContext, userId: string, token: string, isbn: string) {
  const response = await request.post('/BookStore/v1/Books', {
    headers: { Authorization: `Bearer ${token}` },
    data: { userId, collectionOfIsbns: [{ isbn }] },
  });
  expect(response.status()).toBe(201);
}

export async function getUserBooks(request: APIRequestContext, userId: string, token: string): Promise<any[]> {
  const response = await request.get(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.ok(), `GET user failed with status ${response.status()}`).toBeTruthy();
  const body = await response.json();
  return body.books;
}

// Remove the test user at the end, so the sandbox stays clean
export async function cleanupUser(request: APIRequestContext, userId: string, userName: string, password: string) {
  const token = await generateToken(request, userName, password);
  await request.delete(`/Account/v1/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}