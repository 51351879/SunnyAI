// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock environment variables
process.env.GITHUB_TOKEN = 'test-token';
process.env.GITHUB_OWNER = 'test-owner';
process.env.GITHUB_REPO = 'test-repo';
process.env.GITHUB_BRANCH = 'main';
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';

// Mock fetch
global.fetch = jest.fn();

// Mock console.error to keep test output clean
console.error = jest.fn();

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 