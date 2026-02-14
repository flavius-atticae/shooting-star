/**
 * React Router v7 Compatibility Shim for Storybook
 * 
 * This module provides a compatibility layer that allows real React Router v7
 * components to work in Storybook environment by providing proper React context.
 */

import React from 'react';
import { servicesData } from '~/data/home';
import { doulaServices, doulaTestimonials, approachItems } from '~/data/doula';
import { inspirationItems } from '~/data/about';
import { eventsData, introText } from '~/data/feminin-sacre';

// Types matching React Router v7 API
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  state?: any;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
}

export interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}

export interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}

// React Router v7 compatible contexts
const NavigationContext = React.createContext<{
  navigate: (to: string | number, options?: NavigateOptions) => void;
} | null>(null);

const LocationContext = React.createContext<Location | null>(null);

// Mock Router Provider that mimics React Router v7 internal structure
export const StorybookRouterProvider: React.FC<{
  children: React.ReactNode;
  initialPath?: string;
}> = ({ children, initialPath = '/' }) => {
  const [location, setLocation] = React.useState<Location>({
    pathname: initialPath,
    search: '',
    hash: '',
    state: null,
    key: Math.random().toString(36).substring(2)
  });

  const navigate = React.useCallback((to: string | number, options?: NavigateOptions) => {
    if (typeof to === 'string') {
      console.log('🧭 Storybook Navigation:', { to, options });
      setLocation({
        pathname: to,
        search: '',
        hash: '',
        state: options?.state || null,
        key: Math.random().toString(36).substring(2)
      });
    } else {
      console.log('🧭 Storybook Back/Forward:', to);
    }
  }, []);

  const navigationValue = React.useMemo(() => ({ navigate }), [navigate]);

  return React.createElement(
    LocationContext.Provider,
    { value: location },
    React.createElement(
      NavigationContext.Provider,
      { value: navigationValue },
      children
    )
  );
};

// Mock Link component that matches React Router v7 API
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, children, onClick, replace, state, reloadDocument, preventScrollReset, ...props }, ref) => {
    const navigationContext = React.useContext(NavigationContext);
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      
      // Call original onClick if provided
      onClick?.(e);
      
      // Navigate using context if available
      if (navigationContext) {
        navigationContext.navigate(to, { replace, state });
      } else {
        console.log('🔗 Storybook Navigation (no context):', {
          to, replace, state, reloadDocument, preventScrollReset
        });
      }
    };

    return React.createElement('a', {
      ref,
      href: to,
      onClick: handleClick,
      'aria-label': props['aria-label'],
      ...props
    }, children);
  }
);

Link.displayName = 'StorybookLink';

// Mock hooks that match React Router v7 API
export const useNavigate = () => {
  const context = React.useContext(NavigationContext);
  
  if (!context) {
    // Return a fallback function if no context is available
    return React.useCallback((to: string | number, options?: NavigateOptions) => {
      console.warn('🧭 useNavigate called outside router context:', { to, options });
    }, []);
  }
  
  return context.navigate;
};

export const useLocation = () => {
  const location = React.useContext(LocationContext);
  
  if (!location) {
    // Return a fallback location if no context is available
    console.warn('📍 useLocation called outside router context');
    return {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'fallback'
    };
  }
  
  return location;
};

// Mock other common React Router v7 hooks
export const useParams = () => {
  console.log('🔍 useParams called in Storybook');
  return {};
};

export const useSearchParams = () => {
  console.log('🔍 useSearchParams called in Storybook');
  const setSearchParams = React.useCallback(() => {
    console.log('🔍 setSearchParams called in Storybook');
  }, []);
  return [new URLSearchParams(), setSearchParams] as const;
};

export const useLoaderData = <T = unknown>(): T => {
  console.log('📦 useLoaderData called in Storybook');

  const mockLoaderData = {
    homeContent: {
      services: servicesData,
    },
    doulaContent: {
      services: doulaServices,
      testimonials: doulaTestimonials,
      approachItems,
    },
    aboutContent: {
      inspirationItems,
    },
    femininSacreContent: {
      events: eventsData,
      introText,
    },
  };

  return mockLoaderData as T;
};

// Mock useFetcher for progressive enhancement forms in Storybook.
// Returns a static idle fetcher — no React hooks needed so it works
// even when React is not yet initialised (vitest browser mode).
export const useFetcher = () => ({
  state: 'idle' as const,
  data: undefined as unknown,
  Form: 'form' as unknown as React.ComponentType<React.FormHTMLAttributes<HTMLFormElement>>,
  submit: (_formData: FormData, _options?: { method?: string; action?: string }) => {
    console.log('📨 Storybook fetcher.submit (no-op)');
  },
});

// Mock React Router `data` helper used in route actions.
// Matches the real DataWithResponseInit shape ({ data, init }) so that
// route actions/tests behave the same in Storybook as in the app.
export function data(body: unknown, init?: { status?: number }) {
  return { data: body, init };
}

// Export default for easier importing
export default {
  Link,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  useLoaderData,
  useFetcher,
  data,
  StorybookRouterProvider
};