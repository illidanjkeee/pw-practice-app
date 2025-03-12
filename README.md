# Playwright Practice Application

This is a modified and lightweight version of the Ngx-Admin Angular 14 application, specifically adapted for practicing UI automation with Playwright.

## Original Source
The original application is from [akveo.com](https://akveo.com) - [ngx-admin repository](https://github.com/akveo/ngx-admin)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the application:
```bash
npm start
```

The application will be available at `http://localhost:4200`

## Running Playwright Tests

1. Install Playwright:
```bash
npm install -D @playwright/test
```

2. Run the tests:
```bash
npx playwright test
```

3. View test reports:
```bash
npx playwright show-report
```

## Project Structure

- `/tests` - Contains Playwright test files
- `/src` - Application source code
- `/e2e` - End-to-end test configurations

## Key Features for Testing

- Forms and validation
- Tables and data presentation
- Authentication flows
- Navigation and routing
- Dynamic content loading

