import React from 'react';
import { cn } from '~/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: React.ElementType;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'container-sm max-w-sm px-4 py-4',
  md: 'container-md max-w-md px-6 py-6', 
  lg: 'container-lg max-w-4xl px-8 py-8',
  xl: 'container-xl max-w-6xl px-10 py-10',
  full: 'container-full w-full px-4 py-4',
} as const;

export function Container({ 
  size = 'md', 
  as: Component = 'div', 
  children, 
  className,
  ...props 
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full bg-white',
        'overflow-x-hidden',
        'break-words',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}