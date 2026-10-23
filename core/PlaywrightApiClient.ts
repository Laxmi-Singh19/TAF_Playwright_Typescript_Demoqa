import { APIRequestContext } from '@playwright/test';
import { step } from './Reporter';
import { Logger } from './Logger';
import { ApiClient, ApiResponse, CallOptions } from './ApiClient';

// Playwright implementation of the ApiClient contract.
// This is the only API file that knows about Playwright's request.
// Every API call goes through here, so it is logged and shown as a step in the report.
// Tokens, passwords and request bodies are never written to the log.
export class PlaywrightApiClient implements ApiClient {
  constructor(private request: APIRequestContext) {}

  private async send(method: 'GET' | 'POST' | 'DELETE', path: string, options: CallOptions = {}): Promise<ApiResponse> {
    return step(`API ${method} ${path}`, async () => {
      const headers = options.token ? { Authorization: `Bearer ${options.token}` } : undefined;
      const response = await this.request.fetch(path, { method, headers, data: options.data });

      let body: any = null;
      try { body = await response.json(); } catch { body = null; }   // some answers have no body

      Logger.info(`API ${method} ${path} -> status ${response.status()}`);
      return { status: response.status(), body };
    });
  }

  get(path: string, options?: CallOptions) { return this.send('GET', path, options); }
  post(path: string, options?: CallOptions) { return this.send('POST', path, options); }
  delete(path: string, options?: CallOptions) { return this.send('DELETE', path, options); }
}