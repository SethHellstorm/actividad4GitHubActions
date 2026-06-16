import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.js'],  // ← Solo pruebas unitarias
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['tests/e2e/**'],
    },
  },
});