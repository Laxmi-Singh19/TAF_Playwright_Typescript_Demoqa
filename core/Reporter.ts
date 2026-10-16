import { test } from '@playwright/test';
import { Logger } from './Logger';

// Every action and every check runs inside a step.
// The step is logged, and it is shown in the HTML and Allure reports.
export async function step<T>(title: string, body: () => Promise<T>): Promise<T> {
  Logger.info(title);
  try {
    return await test.step(title, body);
  } catch (error) {
    // log only the first line of the error, so the log stays readable
    Logger.error(`FAILED: ${title} | ${(error as Error).message.split('\n')[0]}`);
    throw error;
  }
}