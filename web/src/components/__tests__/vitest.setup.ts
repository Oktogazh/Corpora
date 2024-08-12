import { config } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { vi } from 'vitest';

// Configure global mocks for Vue Test Utils
config.global.mocks = {
  $t: (tKey: string) => tKey, // Just return the translation key
  $tc: (tKey: string) => tKey, // Just return the translation key
};

// Configure the testing Pinia with the createSpy option
const pinia = createTestingPinia({
  createSpy: vi.fn,
});

// Add Pinia to the global plugins
config.global.plugins = [pinia];

// Export the configured Pinia instance (optional, if needed in tests)
export { pinia };