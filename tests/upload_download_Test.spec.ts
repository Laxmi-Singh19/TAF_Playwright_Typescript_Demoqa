import { test } from '../core/test';
import { getTestData } from '../utils/dataReader';

test('TC06 - Upload a file, then download a file and verify it', { tag: '@sanity' }, async ({ uploadDownloadFlow }) => {
  const data = getTestData('TC06');

  await uploadDownloadFlow.uploadAndVerify(data);
  await uploadDownloadFlow.downloadAndVerify(data);
});