import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC05 - Frames, nested frames and new browser tab', { tag: '@regression' }, async ({ framesWindowsFlow }) => {
  const data = getTestData('TC05');

  await framesWindowsFlow.verifyFrames(data);
  await framesWindowsFlow.verifyNestedFrames(data);
  await framesWindowsFlow.verifyNewTab(data);
});