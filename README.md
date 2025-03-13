# Playwright Practice Application

This is a modified and lightweight version of the Ngx-Admin Angular 14 application, specifically adapted for practicing UI automation with Playwright.

## Original Source
The original application is from [akveo.com](https://akveo.com) - [ngx-admin repository](https://github.com/akveo/ngx-admin)

## Prerequisites

- Node.js 16 or higher
- npm 7 or higher
- Visual Studio Code (recommended)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/illidanjkeee/pw-practice-app.git
cd pw-practice-app
```

2. Install dependencies:
```bash
npm install --force
```

3. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Running Playwright Tests

### Installation

1. Install Playwright:
```bash
npm install -D @playwright/test
```

2. Install browser drivers:
```bash
npx playwright install
```

### Running Tests

- Run all tests:
```bash
npx playwright test
```

- Run tests in headed mode:
```bash
npx playwright test --headed
```

- Run specific test file:
```bash
npx playwright test usePageObjects.spec.ts
```

- Run tests with debug mode:
```bash
npx playwright test --debug
```

### Test Reports

- View test report:
```bash
npx playwright show-report
```

## Project Structure

```
pw-practice-app/
├── tests/               # Playwright test files
├── page-objects/        # Page Object Model classes
├── src/                 # Application source code
├── e2e/                # End-to-end test configurations
└── playwright.config.ts # Playwright configuration
```

## Key Features for Testing

- Forms and validation
  - Grid and inline forms
  - Form validation rules
- Tables and data presentation
  - Smart Table with sorting and filtering
  - Dynamic data loading
- Authentication flows
  - Login/Logout functionality
  - Protected routes
- Navigation and routing
  - Menu navigation
  - Route parameters
- Dynamic content loading
  - Lazy-loaded modules
  - Asynchronous data

## Docker Support

1. Build the container:
```bash
docker-compose up --build
```

2. Run tests in container:
```bash
docker-compose run test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

