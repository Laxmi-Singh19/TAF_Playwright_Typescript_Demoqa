# TAF_Demoqa - Playwright TypeScript Framework

Test automation framework for https://demoqa.com using the Page Object Model (POM),
fixtures, and JSON test data.

## Folder structure
| Folder / file | Purpose |
|---|---|
| `pages/` | One class per web page (locators and actions). `BasePage` holds common code |
| `fixtures/baseTest.ts` | Creates the page objects automatically for every test |
| `testdata/testData.json` | Test data per test case (TC01 to TC10) |
| `utils/` | `dataReader.ts` loads test data by ID. `apiHelper.ts` holds the API calls |
| `tests/` | The 10 end-to-end test files |
| `playwright.config.ts` | Base URL, browsers, retries, timeouts, reporters |
| `.github/workflows/` | GitHub Actions workflow for remote execution |

## Test cases
| ID | Test | Tag |
|---|---|---|
| TC01 | Complete Practice Form registration | @smoke |
| TC02 | Practice Form validation, then successful submit | @regression |
| TC03 | Web Table add, edit, search and delete | @smoke |
| TC04 | Alerts: simple, timer, confirm and prompt | @regression |
| TC05 | Frames, nested frames and a new browser tab | @regression |
| TC06 | File upload and download | @sanity |
| TC07 | Book Store journey: login, add book, verify, delete, logout | @smoke |
| TC08 | API setup, then verify and delete in the UI | @sanity |
| TC09 | Date picker, auto-complete and drag and drop | @regression |
| TC10 | Data-driven Text Box (3 data sets) | @sanity |

## Setup
```bash
npm install
npx playwright install
```

## Run
```bash
npm run test:chromium      # all tests, chromium only
npm run test:headed        # watch the browser
npm run test:smoke         # only @smoke tests
npm run test:regression    # only @regression tests
npm test                   # all tests on 3 browsers
npm run report             # open the HTML report
```

## Allure report
```bash
npm run allure:generate
npm run allure:open
```

## Remote execution
Tests run on GitHub Actions on every push. Download the HTML report from the
Artifacts section of the run.