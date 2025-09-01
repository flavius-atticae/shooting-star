import React from 'react';
import type { Decorator } from '@storybook/react-vite';
import { StorybookRouterProvider } from './mocks/react-router';

/**
 * React Router v7 Decorator for Storybook
 * 
 * Provides a compatible routing context for stories that use React Router v7 components.
 * This decorator uses the updated mock system that properly handles React Router v7 contexts.
 */

/**
 * React Router v7 Decorator
 * 
 * Use this decorator on stories that need React Router functionality.
 * This now uses the updated StorybookRouterProvider that properly handles React Router v7 contexts.
 * 
 * Example usage in a story:
 * ```typescript
 * export const MyStory: Story = {
 *   decorators: [withReactRouter],
 *   // ... story config
 * };
 * ```
 */
export const withReactRouter: Decorator = (Story, context) => {
  // Get initial path from story parameters if provided
  const initialPath = context.parameters?.router?.initialPath || '/';
  
  return React.createElement(
    StorybookRouterProvider,
    { initialPath, children: React.createElement(Story) }
  );
};

export default withReactRouter;