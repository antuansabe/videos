import "@testing-library/jest-dom";

// Only setup browser mocks in jsdom environment
if (typeof window !== "undefined") {
  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  // Mock clipboard API
  Object.defineProperty(navigator, "clipboard", {
    value: {
      readText: jest.fn(),
      writeText: jest.fn(),
    },
    writable: true,
    configurable: true,
  });

  // Mock window.open
  global.open = jest.fn();
}

// Mock fetch for all environments
global.fetch = jest.fn();
