# Product Store – Test Automation Project (WebdriverIO)

This project automates the testing of [Demoblaze](https://www.demoblaze.com), a demo e-commerce website. The goal is to make sure that the most important parts of the site — logging in and using the shopping cart — work as expected.

It is built with **WebdriverIO** and **TypeScript**, following a clean and simple structure that keeps tests easy to read and maintain.

---

## What does it test?

### Login
- A user can log in with valid credentials
- The site shows an error when the credentials are wrong
- The logout option is visible after a successful login

### Shopping Cart
- A user can navigate to a product and add it to the cart
- The cart shows the products that were added
- A user can remove a product from the cart
- A user can complete a purchase and get an order confirmation

---

## How is it organized?

The project is split into four simple folders:

- **`pages/`** — Contains the actions a user can do on each page (like clicking a button or filling a form). Think of it as a remote control for the browser.
- **`locators/`** — Stores the selectors used to find elements on the page (buttons, inputs, etc.). Keeping them here makes them easy to update if the site changes.
- **`tests/`** — The actual test cases. Each file covers one area: login or cart.
- **`data/`** — Test data like usernames, passwords, and order details. All in one place so it is easy to change.

---

## How to run the tests

First, make sure you have the dependencies installed:

```bash
npm install
```

Then you can run:

```bash
# Run all tests
npm test

# Run only the login tests
npm run test:login

# Run only the cart tests
npm run test:cart

# Generate and open the Allure HTML report (run after npm test)
npm run test:report
```

---

## A few things to know

- Tests run one at a time (no parallel execution) to avoid conflicts on the demo site.
- If a test fails, WebdriverIO will retry it once before marking it as failed.
- Tests run in headless mode, meaning the browser opens in the background without a visible window.
- After running the tests, an Allure report is generated with `npm run test:report` — it opens in the browser and shows each test with its result.
- The configuration file for the whole project is `wdio.conf.ts`.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [WebdriverIO](https://webdriver.io) | Browser automation |
| TypeScript | Language |
| Mocha | Test framework |
| Chrome | Browser used for testing |
| [Allure](https://allurereport.org) | HTML test reports |

---

That is pretty much it. The project is small but follows good practices — each part has a clear responsibility, and the tests are straightforward to follow even if you are new to automation.
