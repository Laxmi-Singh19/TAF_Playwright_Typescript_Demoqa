import { test } from '@playwright/test';
import { Logger } from './Logger';
export async function step<T>(title: string, body: () => Promise<T>): Promise<T> {
  Logger.info(title);
  try {
    return await test.step(title, body);
  } catch (error) {
  
    Logger.error(`FAILED: ${title} | ${(error as Error).message.split('\n')[0]}`);
    throw error;
  }
}