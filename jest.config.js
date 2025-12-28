module.exports = {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  // Module name mapping for imports
  moduleNameMapper: {
    // Handle CSS imports
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Transform files
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // Ignore patterns
  transformIgnorePatterns: [
    '/node_modules/(?!(axios|react-toastify|react-vis)/)',
  ],

  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/indexApp.js',
    '!src/indexBusy.js',
    '!src/indexError.js',
    '!src/**/*.d.ts',
    '!src/config/**',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },

  // Module directories
  moduleDirectories: ['node_modules', 'src'],

  // Clear mocks between tests
  clearMocks: true,

  // Verbose output
  verbose: true,
};
