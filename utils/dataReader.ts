import * as fs from 'fs';
import * as path from 'path';

// Reads the JSON file and returns the data for one test case (e.g. 'TC01')
export function getTestData(tcId: string) {
  const filePath = path.join(__dirname, '../testdata/testData.json');
  const allData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!allData[tcId]) {
    throw new Error(`Test data not found for ${tcId} in testData.json`);
  }

  return allData[tcId];
}
