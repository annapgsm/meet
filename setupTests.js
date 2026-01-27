import '@testing-library/jest-dom';

// Filter noisy React warnings in test output
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred",
];

const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find((message) =>
    args.toString().includes(message)
  );
  if (!ignoreMessage) originalError(...args);
};

// ResizeObserver mock (needed by Recharts)
// IMPORTANT: Guarded so it doesn't run in Node (Puppeteer E2E)
let originalResizeObserver;

if (typeof window !== "undefined") {
  originalResizeObserver = window.ResizeObserver;

  beforeEach(() => {
    // Only mock if missing (or you can always override if you prefer)
    if (!window.ResizeObserver) {
      window.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }
  });

  afterEach(() => {
    // Restore whatever was there before
    window.ResizeObserver = originalResizeObserver;
  });
}

jest.setTimeout(30000);
