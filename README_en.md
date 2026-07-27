# 🧪 Playwright Automation Framework

## 📖 Description

This project implements a test automation framework for the [Automation Exercise](https://automationexercise.com/) e-commerce web application. The goal is to validate functionalities, user flows, and the overall platform experience through automated testing.

## 🚀 Automation Scope

23 **test cases** have been automated, validating critical workflows and key functionalities:

- User registration, login, and logout
- Navigation through product categories and brands
- Product search and filtering
- Shopping cart (add, remove, modify quantity)
- Complete checkout process (address, payment, invoice download)
- Newsletter subscription
- Product review submission
- Scroll functionality and recommended items

## 🧠 Skills and Knowledge Acquired

- **Automation framework design**: Architecture based on the **Page Object Model (POM)** pattern for modular, reusable code
- **Strict TypeScript**: Static typing with `strict: true` and custom interfaces (`User`, `PaymentDetails`, `ReviewInfo`)
- **Custom fixtures**: Automatic injection of Page Objects into tests via Playwright fixtures
- **Structured logging**: Logging system with levels (debug/info/warn/error) controlled by an environment variable
- **Code quality**: ESLint + Prettier configured to maintain consistency across the entire project
- **Cross-browser testing**: Execution on Chromium, Firefox, and WebKit
- **CI/CD with GitHub Actions**: Pipeline with smart dependency and browser caching, manual execution with browser selection, and report generation
- **Reporting**: Playwright HTML reports and advanced reports with Allure

## 🗂️ Project Structure

```
automation_exercise/
│
├── .env.example                # Environment variables template
├── .eslintrc.json              # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── .github/workflows/          # CI/CD pipeline with GitHub Actions
├── fixtures/
│   └── baseTest.ts             # Custom fixtures + shared utilities
├── pages/                      # Page Objects (POM)
│   ├── BasePage.ts             # Base class with common navigation and utilities
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignUpPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── ViewCartPage.ts
│   ├── CheckoutPage.ts
│   ├── PaymentPage.ts
│   ├── AccountCreatedPage.ts
│   └── DeleteAccountPage.ts
├── tests/                      # Test cases
│   ├── home.spec.ts
│   ├── login_signup.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── types/
│   └── index.ts                # TypeScript interfaces for test data
├── utils/
│   ├── constants.ts            # URL constants
│   ├── helpers.ts              # Utility functions
│   ├── logger.ts               # Logging system
│   └── test-data/
│       ├── data.json           # Test data
│       └── doc_test.docx       # File for upload testing
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration (strict)
└── package.json
```

## ⚙️ Installing the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RebeChiSan/automation_exercise_playwright.git
   cd automation_exercise_playwright
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file if needed.

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Install the required browsers:**

   ```bash
   npx playwright install
   ```

## 🧠 Running the Project

### 💻 From the terminal

1. **Run all tests:**

   ```bash
   npm test
   ```

2. **Run a specific test file:**

   ```bash
   npx playwright test tests/cart.spec.ts
   ```

3. **Run a specific test case:**

   ```bash
   npx playwright test --grep "TC_12"
   ```

4. **Run on a specific browser:**

   ```bash
   npx playwright test --project=chromium
   ```

5. **View detailed logging:**

   ```bash
   set LOG_LEVEL=debug && npx playwright test
   ```

6. **Generate Playwright report:**

   ```bash
   npm run report
   ```

7. **Generate and open Allure report:**

   ```bash
   npm run generate-allure
   npm run open-allure
   ```

8. **Check code quality:**

   ```bash
   npm run lint        # ESLint
   npm run format:check  # Prettier
   npm run format      # Auto-format
   ```

### 🤖 From GitHub Actions - CI/CD Pipeline

The project includes a GitHub Actions workflow with **smart caching** that speeds up runs:

1. **Go to GitHub Actions**: Open the "Actions" tab in your repository
2. **Select "Playwright Tests"**
3. **Click "Run workflow"**
4. **Choose an option**:
   - **Browser**: chromium, firefox, or all
5. **Click "Run workflow"**
6. **Download Reports**: Once the run completes, you'll find under "Artifacts":
   - `playwright-report-[browser]`
   - `allure-report-[browser]`

> The pipeline includes caching of `node_modules` and Playwright browsers, reducing execution time from ~60s to ~10s when there are no dependency changes.

## 🧰 Technologies Used

| Technology | Purpose |
|---|---|
| **Playwright** | Multi-browser E2E automation framework |
| **TypeScript** | Static typing, interfaces, OOP with `strict: true` |
| **ESLint + Prettier** | Consistent code quality and formatting |
| **Allure** | Advanced visual test reports |
| **GitHub Actions** | CI/CD with smart caching and manual execution |
| **Node.js / npm** | Runtime environment and dependency management |
| **dotenv** | Environment-based configuration |

---

📌 Author: Rebeca C. Santiago

💬 Project for practicing web application test automation.