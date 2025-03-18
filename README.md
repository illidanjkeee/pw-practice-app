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

2. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
npm install --force
```

4. Start the application:
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

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test usePageObjects.spec.ts

# Run tests with debug mode
npx playwright test --debug
```

### Test Reports

```bash
# View test report
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

- Forms and validation (grid/inline forms, validation rules)
- Tables and data presentation (Smart Table with sorting and filtering)
- Authentication flows (login/logout, protected routes)
- Navigation and routing (menu navigation, route parameters)
- Dynamic content loading (lazy-loaded modules, asynchronous data)

## Docker Support

```bash
# Build the container
docker-compose up --build

# Run tests in container
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