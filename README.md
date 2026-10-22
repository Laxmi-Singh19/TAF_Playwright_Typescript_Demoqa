# TAF_Demoqa - Playwright TypeScript Framework

Test automation framework for https://demoqa.com. The code is split into layers. UI actions
go through a `UiDriver` interface, and only the driver talks to Playwright, so the UI layer
does not depend on one tool.

## Layers
| Layer | Folder | Purpose |
|---|---|---|
| Test | `tests/` | Test scripts: they call business flows only |
| Business | `business/` | What a user does (register, add a book, upload a file) |
| UI actions | `pages/` | Selectors and page actions, built on the base page |
| API service | `services/` | One method for each API endpoint |
| Core | `core/` | Base page, UI driver, validator, API client, logger, reporter, test fixtures |
| Data | `testdata/`, `utils/` | JSON test data and the data reader |

## Tool independence (UI actions)
- `core/UiDriver.ts` is the contract: it lists every UI action (open, click, type, upload, drag and drop...).
- `core/PlaywrightDriver.ts` implements the contract with Playwright.
- `core/BasePage.ts` works with the contract only and logs every action as a step.
- `createDriver()` in `core/test.ts` is the single place where the tool is chosen.
- To use another tool: write one new driver that implements `UiDriver`, and change one line in `createDriver()`.

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
- `playwright-report/`: Playwright HTML report (open it with `npm run report`)
- `custom-report/index.html`: our own HTML report (summary, filters, steps, errors, screenshots), built by `core/HtmlReporter.ts`
- Allure report: `npm run allure:generate`, then `npm run allure:open`
- `allure-single-report/index.html`: Allure report in one single file, easy to send by email
  (command: <paste the command you used here>)

## Remote execution
Tests run on GitHub Actions (Chromium) on every push. Download the HTML report from the
Artifacts section of the run.

## Status
| Area | Status |
|---|---|
| Layered structure, Page Object Model | Done |
| Base page with all UI actions, behind the `UiDriver` interface | Done |
| Data-driven tests (JSON) | Done |
| API service module | Done |
| Logging and step-level reporting | Done |
| Reports: Playwright HTML, custom HTML, Allure, single-file Allure | Done |
| Local and remote execution (GitHub Actions) | Done |
| Interface for assertions and the API client | Planned |
| Configuration module, Excel reader | Planned |
| Self-healing, mock, mobile | Planned |
| Jenkins, Report Portal, Jira or Azure DevOps | Planned |