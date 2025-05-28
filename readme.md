
# 🎭 Playwright Test Automation (JavaScript)

This repository contains automated tests using Playwright, a modern end-to-end testing framework for web applications.

---

## 📦 Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- brew install openjdk@21

### 1. Clone the repository
```bash
git clone https://github.com/gupitaviola/AutomationTest.git
cd AutomationTest
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

---

## 🚀 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run a specific test file
```bash
npx playwright test tests/example.spec.js
```

### Debug a test
```bash
npx playwright test --debug
```

### View the HTML test report
After test execution, HTML report is automatically generated:

```bash
npx playwright show-report
```
### Generate the Allure Report
```bash
npm run allure:report
```

---

## ⚙️ Configuration
The playwright.config.js file contains various configuration options:

- Browser settings
- Timeout values
- Reporter settings
- Screenshot and video capture settings
- Parallel execution settings

---

## 🛠 Troubleshooting

- Use `--debug` for interactive debugging.
- Use `DEBUG=pw:api` for verbose logs.
- Generate and view HTML report using `npx playwright show-report`

---

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)
- [Configuration Options](https://playwright.dev/docs/test-configuration)

---

## 📬 Contact

Maintained by: Gupita Viola