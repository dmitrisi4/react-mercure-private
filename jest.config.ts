export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};
