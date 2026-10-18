# TAF_Demoqa - Playwright TypeScript Framework

Test automation framework for https://demoqa.com. The code is split into layers, and only the
`core` folder uses Playwright directly, so the framework stays tool-agnostic.

## Layers
| Layer | Folder | Purpose |
|---|---|---|
| Test | `tests/` | Test scripts: they call business flows only |
| Business | `business/` | What a user does (register, add a book, upload a file) |
| UI actions | `pages/` | Selectors and page actions, built on the base page |
| API service | `services/` | One method for each API endpoint |
| Core | `core/` | Base page with all UI actions, API client, validator, logger, reporter, test fixtures |
| Data | `testdata/`, `utils/` | JSON test data and the data reader |

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
    npm install
    npx playwright install

## Run
    npm run test:chromium      # all tests, chromium only
    npm run test:smoke         # only @smoke tests
    npm run test:regression    # only @regression tests
    npm test                   # all tests on 3 browsers
    npm run report             # open the HTML report

## Logs and reports
- `logs/execution.log`: every test, every step and every failure reason of the whole run
- `logs/test-run.log`: framework logger with levels, test names and worker numbers
- `playwright-report/`: HTML report (open it with `npm run report`)
- Allure: `npm run allure:generate`, then `npm run allure:open`

## Remote execution
Tests run on GitHub Actions on every push. Download the HTML report from the Artifacts
section of the run.