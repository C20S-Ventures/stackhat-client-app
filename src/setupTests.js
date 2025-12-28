// Jest DOM extensions for better assertions
import '@testing-library/jest-dom';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

// Mock window.location
delete window.location;
window.location = {
  href: '',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Mock react-global-configuration
jest.mock('react-global-configuration', () => ({
  get: jest.fn((key) => {
    const config = {
      apiServiceBaseUri: 'http://localhost:5000/',
      clientBaseUri: 'http://localhost:4001/',
      clientId: 'TestClient',
      auth: {
        idleTimeoutMs: 900000,
        versionCheck: {
          enabled: false,
          intervalMs: 120000,
        },
      },
      theme: {
        logoContainer: 'test',
      },
      errors: {
        showDetail: false,
      },
    };
    return key ? config[key] : config;
  }),
  set: jest.fn(),
}));

// Suppress console errors during tests (optional - remove if you want to see them)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
