module.exports = {
  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir/tests/$1>",
    "@/(.+)": "<rootDir/src/$1>",
  },
  roots: ["<rootDir>/tests"],
  collectCoverage: true,

  transform: {
    "\\.ts$": "ts-jest",
  },
};
