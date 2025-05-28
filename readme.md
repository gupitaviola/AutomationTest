
# 🎭 Playwright Test Automation (JavaScript)

Automated end-to-end testing using [Microsoft Playwright](https://playwright.dev). This setup uses **JavaScript**, supports Chromium, Firefox, and WebKit browsers, and integrates easily into your CI/CD pipeline.

---

## 📦 Installation

### Prerequisites
- Node.js (>= 16.x)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

---

## 🚀 Usage

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
```bash
npx playwright show-report
```

---

## 🧪 Test Structure

```
.
├── tests/               # Test files
│   └── example.spec.js
├── pages/               # Page Object Models
│   └── login.page.js
├── utils/               # Utility helpers
├── playwright.config.js # Playwright configuration
└── ...
```

---

## ⚙️ Configuration

Playwright is configured via `playwright.config.js`. Example:
```js
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://your-app.com',
  },
});
```

---

## 📄 Writing Tests

Example test:
```js
const { test, expect } = require('@playwright/test');

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home/);
});
```

---

## 🧰 Utilities

- **Page Object Model (POM)** for maintainable test logic
- **Custom utilities** in `utils/`
- Parallel test execution and retry logic

---

## 🧪 CI Integration

Playwright supports CI environments like GitHub Actions, GitLab CI, Jenkins, etc.

Example GitHub Actions step:
```yaml
- name: Run Playwright tests
  run: |
    npm ci
    npx playwright install --with-deps
    npx playwright test
```

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

Maintained by: [Your Name or Team]  
Questions? Open an [Issue](https://github.com/your-org/your-repo/issues)
