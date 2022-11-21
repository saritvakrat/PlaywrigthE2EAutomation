# Playwright- Typescript 
Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

# Starting to use Playwright
* Playwright has its own test runner for end-to-end tests, we call it Playwright Test., it uses Expect assertions,and contains UI interface and a few nice loggers.

1. Install Node and Typescript
2. Run npn install
3. To run the tests: npm run tests
4. To run single test: npx playwright test landing-page.spec.ts
5. To run a set of tests: npx playwright test tests/todo-page/ tests/landing-page/
6. To run tests in headed mode: npm run tests-headed
7. To open reporter: npm run report

Tests are located under tests/

* Note- By default, test files are run in parallel. Tests in a single file are run in order, in the same worker process. A test file can be configured to also run the test in parallel


# Page Objects in Playwright
They are the standard way of coping with large test suites, since, firstly, they enable us to write the tests using objects that are relevant to the application; and limit the use of selectors and other page-specific code, which makes the test code more robust and easier to maintain.
Page objects also enable some level of flexibility when the structure of a page changes and we need to change our code to accommodate that.
We are using BasePage class, it will contain all of the service in order to preserve DRY principle. All test pages should implement this class.


# Improvements
1. Linter
2. Docker
3. EXTRACT TO WORKFLOWS