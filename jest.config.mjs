import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  testPathIgnorePatterns: ["/playwright/"],
  setupFiles: ["./jest.polyfills.js"],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^uuid$": "uuid", // map UUID to handle @ngneat/falso
    "^.+\\.(svg)$": "<rootDir>/src/mocks/svg.jsx",
    "react-markdown":
      "<rootDir>/node_modules/react-markdown/react-markdown.min.js",
    // "react-markdown-editor-lite":
    // "<rootDir>/node_modules/react-markdown-editor-lite/lib/index.js",
    "rehype-sanitize": "<rootDir>/src/test/helpers/rehype-sanitize.js",
    "^@minoru/react-dnd-treeview$":
      "<rootDir>/src/test/helpers/react-dnd-treeview.js",
    "^react-dnd-multi-backend$":
      "<rootDir>/src/test/helpers/react-dnd-multi-backend.jsx",
    "^rdndmb-html5-to-touch$":
      "<rootDir>/src/test/helpers/rdndmb-html5-to-touch.js",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.vitest.ts*",
    "!src/test/**/*.{js,jsx,ts,tsx}",
    // Below have been migrated to vitest
    "!src/**/khub/**/*.{js,jsx,ts,tsx}",
    "!src/**/dac/**/*.{js,jsx,ts,tsx}",
  ],
  coverageReporters: ["text", "html", "cobertura"],
  // coverageThreshold: {
  //   global: {
  //     statements: 60,
  //     branches: 60,
  //     functions: 60,
  //     lines: 60,
  //   },
  // },
  snapshotSerializers: ["@emotion/jest/serializer"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
