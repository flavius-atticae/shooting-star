import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as previewAnnotations from './preview';

// Apply Storybook project annotations for testing
// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
const annotations = setProjectAnnotations([previewAnnotations]);

// Expose annotations globally for Storybook's internal setup-file.js
// This is required for running tests from the Storybook UI
globalThis.globalProjectAnnotations = annotations;

// Run beforeAll hook for CLI test execution
beforeAll(annotations.beforeAll);