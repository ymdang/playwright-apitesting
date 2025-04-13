# Playwright API Testing

This project is an API testing suite using Playwright and Allure for generating reports. It focuses on testing the booking API (https://restful-booker.herokuapp.com/booking) using the Playwright framework.

## Features

- **Playwright API testing** for booking-related endpoints.
- **Allure integration** for generating test reports.
- **GitHub Pages** deployment for Allure reports.
- Tests are executed in parallel across multiple browsers (Chromium, Firefox, Webkit).
  
## Requirements

Before you start, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm**: Node.js comes with npm. Ensure you have npm 7.x or later.

## Getting Started

1. Clone the repository to your local machine:

git clone https://github.com/ymdang/playwright-apitesting.git
cd playwright-apitesting

2. Install Dependencies
Install the required dependencies: npm install

3. Configure Environment
The test is already configured to run with Playwright, but if you want to customize the setup, modify the following files:
tests/ - Contains all the test files.
package.json - Defines the test and deployment scripts.

4. Running Tests
To run the tests, use the following command: npm test

5. Generate Allure Report
Once the tests have run, generate an Allure report: npm run allure:generate

6. Open the Allure Report
To open the generated Allure report: npm run allure:open

7. Deploy Allure Report to GitHub Pages
To deploy the Allure report to GitHub Pages, use the following command: npm run deploy:allure
This will deploy the report to the gh-pages branch, which will be accessible via your GitHub repository's GitHub Pages.


**Acknowledgments**
Playwright for API testing
Allure for generating beautiful test reports
GitHub Pages for hosting the reports

