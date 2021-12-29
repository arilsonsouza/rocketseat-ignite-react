module.exports = {
  testIgnorePatterns: ["/node_modules/", "./next"],
  setupFilesAfterEnv: [
    "<rootDir>/src/_tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: "jsdom",
};