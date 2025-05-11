# 🎭 Playwright Practice Application

<div align="center">
  
  ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
  
  <h3>A playground for mastering UI automation with Playwright</h3>

  <p>This is a modified version of Ngx-Admin Angular application, specifically tailored for practicing Playwright test automation with real-world scenarios.</p>

</div>

## 🚀 Features

- **✅ Page Object Model** - Organized test architecture with reusable components
- **🔄 Multi-Browser Testing** - Tests run across Chromium, Firefox, and WebKit
- **📊 Visual Reports** - Detailed HTML reports with screenshots and traces
- **🐳 Docker Support** - Containerized testing environment for CI/CD
- **🧪 Comprehensive Test Examples** - Various test scenarios covering common UI patterns

## 🧩 Test Scenarios

<table>
  <tr>
    <td width="50%">
      <h3>🔤 Forms & Validation</h3>
      <ul>
        <li>Grid and inline form submissions</li>
        <li>Input field validation</li>
        <li>Radio button selections</li>
      </ul>
    </td>
    <td width="50%">
      <h3>📊 Tables & Data</h3>
      <ul>
        <li>Smart Table interactions</li>
        <li>Data filtering and sorting</li>
        <li>Table row editing</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 Authentication</h3>
      <ul>
        <li>Login/logout flows</li>
        <li>Protected route testing</li>
        <li>Session handling</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🧭 Navigation</h3>
      <ul>
        <li>Menu navigation verification</li>
        <li>Route parameter handling</li>
        <li>URL validation</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📆 Date & Time</h3>
      <ul>
        <li>Datepicker interactions</li>
        <li>Date range selections</li>
        <li>Calendar navigation</li>
      </ul>
    </td>
    <td width="50%">
      <h3>🪟 Dialog & Modals</h3>
      <ul>
        <li>Modal dialog interactions</li>
        <li>Form submissions in dialogs</li>
        <li>Backdrop and ESC key handling</li>
      </ul>
    </td>
  </tr>
</table>

## 🛠️ Prerequisites

- Node.js 16 or higher
- npm 7 or higher
- Visual Studio Code (recommended)

## 📦 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/illidanjkeee/pw-practice-app.git
   cd pw-practice-app
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies:**
   ```bash
   npm install --force
   ```

4. **Start the application:**
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:4200`

## 🧪 Testing with Playwright

### 🔧 Installation

```bash
# Install Playwright
npm install -D @playwright/test

# Install browser drivers
npx playwright install
```

### ▶️ Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test dialogPage.spec.ts

# Run tests with debug mode
npx playwright test --debug

# Run tests in specific browsers
npm run pageObjects-chrome
npm run pageObjects-firefox
npm run pageObjects-webkit
```

### 📊 Test Reports

```bash
# Generate and view HTML test report
npx playwright show-report
```

## 📁 Project Structure

```
pw-practice-app/
├── tests/                  # Test specifications
│   ├── formLayoutsPage.spec.ts
│   ├── datepickerPage.spec.ts
│   ├── dialogPage.spec.ts
│   └── ...
│
├── page-objects/           # Page Object Models
│   ├── basePage.ts         # Base page with common methods
│   ├── formLayoutsPage.ts  # Form layouts page object
│   ├── navigationPage.ts   # Navigation component object
│   └── ...
│
├── fixtures/               # Test fixtures and data
├── testData/               # Test data files
├── utils/                  # Helper utilities
│
├── playwright.config.ts    # Playwright configuration
└── docker-compose.yaml     # Docker configuration
```

## 🐳 Docker Support

```bash
# Build and start the container
docker-compose up --build

# Run tests in container
docker-compose run test
```

## 🔄 CI/CD Integration

This project can be easily integrated with CI/CD pipelines:

- **GitHub Actions** - Run tests on pull requests and deployments
- **Jenkins** - Schedule regular test runs
- **Azure DevOps** - Integrate with build pipelines

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Original application by [akveo.com](https://akveo.com) - [ngx-admin repository](https://github.com/akveo/ngx-admin)
- Built with [Playwright](https://playwright.dev/) - Modern, reliable browser automation