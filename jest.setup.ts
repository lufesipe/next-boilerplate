import '@testing-library/jest-dom';
import crypto from 'crypto';

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    blob: jest.fn().mockReturnValue(Promise.resolve(new Blob())),
    json: jest.fn(),
  })
);

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = function structuredClone(value) {
    if (value === null || value === undefined) {
      return value;
    }

    try {
      // For objects and arrays, use JSON methods
      if (typeof value === 'object') {
        return JSON.parse(JSON.stringify(value));
      }

      // For primitive values, return directly
      return value;
    } catch (error) {
      console.warn('structuredClone polyfill failed:', error);

      // Returns a shallow copy as fallback
      return Array.isArray(value) ? [...value] : { ...value };
    }
  };
}

Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (arr: unknown[]) => crypto.randomBytes(arr.length),
    randomUUID: () => {
      const first = (Math.random() * 10 ** 8).toFixed(0);
      const second = (Math.random() * 10 ** 4).toFixed(0);
      const third = (Math.random() * 10 ** 4).toFixed(0);
      const fourth = (Math.random() * 10 ** 4).toFixed(0);
      const fifth = (Math.random() * 10 ** 12).toFixed(0);
      return `${first}-${second}-${third}-${fourth}-${fifth}`;
    },
  },
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
