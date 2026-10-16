import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC04 - Handle simple, timer, confirm and prompt alerts', { tag: '@regression' }, async ({ alertsFlow }) => {
  const data = getTestData('TC04');

  await alertsFlow.openAlertsPage();
  await alertsFlow.handleSimpleAlert();
  await alertsFlow.handleTimerAlert();
  await alertsFlow.handleConfirmAlert();
  await alertsFlow.handlePromptAlert(data.promptName);
});