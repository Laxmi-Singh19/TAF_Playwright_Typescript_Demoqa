import { test, expect } from '../fixtures/baseTest';
import { getTestData } from '../utils/dataReader';

test('TC04 - Handle simple, timer, confirm and prompt alerts', { tag: '@regression' }, async ({ alertsPage }) => {
  const data = getTestData('TC04');
  await alertsPage.openPage();

  // 1. Simple alert: accept it
  const simple = await alertsPage.clickAndAccept(alertsPage.alertButton);
  expect(simple).toBe('You clicked a button');

  // 2. Timer alert: appears after 5 seconds
  const timer = await alertsPage.clickAndAccept(alertsPage.timerAlertButton);
  expect(timer).toBe('This alert appeared after 5 seconds');

  // 3. Confirm alert: accept (OK), then dismiss (Cancel)
  const confirmOk = await alertsPage.clickAndAccept(alertsPage.confirmButton);
  expect(confirmOk).toBe('Do you confirm action?');
  await expect(alertsPage.confirmResult).toContainText('You selected Ok');

  await alertsPage.clickAndDismiss(alertsPage.confirmButton);
  await expect(alertsPage.confirmResult).toContainText('You selected Cancel');

  // 4. Prompt alert: type a name and accept
  const promptMsg = await alertsPage.clickAndAccept(alertsPage.promptButton, data.promptName);
  expect(promptMsg).toBe('Please enter your name');
  await expect(alertsPage.promptResult).toContainText(`You entered ${data.promptName}`);
});