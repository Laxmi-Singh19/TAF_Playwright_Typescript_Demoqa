// Contract for the API layer: every API call that services and flows can make.
// Services depend on this interface only, never on a tool like Playwright.
// To use another tool, write one new class that implements ApiClient.

export interface ApiResponse {
  status: number;
  body: any;
}

export interface CallOptions {
  token?: string;
  data?: any;
}

export interface ApiClient {
  get(path: string, options?: CallOptions): Promise<ApiResponse>;
  post(path: string, options?: CallOptions): Promise<ApiResponse>;
  delete(path: string, options?: CallOptions): Promise<ApiResponse>;
}