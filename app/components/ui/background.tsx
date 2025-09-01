import React from 'react';
import { cn } from '~/lib/utils';

type BackgroundColor = 'primary' | 'accent' | 'secondary' | 'neutral' | 'warm' | 'soft' | 'cool' | 'menthe';

interface BackgroundGradient {
  to: BackgroundColor;
  direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl';
}

interface BackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  color: BackgroundColor;
  gradient?: BackgroundGradient;
  pattern?: React.ReactNode;
  children: React.ReactNode;
}

const colorClasses = {
  primary: 'bg-primary dark:bg-primary-dark',
  accent: 'bg-accent',
  secondary: 'bg-secondary',
  neutral: 'bg-neutral',
  warm: 'bg-warm',
  soft: 'bg-soft',
  cool: 'bg-cool',
  menthe: 'bg-menthe',
} as const;

const gradientFromClasses = {
  primary: 'from-primary',
  accent: 'from-accent',
  secondary: 'from-secondary', 
  neutral: 'from-neutral',
  warm: 'from-warm',
  soft: 'from-soft',
  cool: 'from-cool',
  menthe: 'from-menthe',
} as const;

const gradientToClasses = {
  primary: 'to-primary',
  accent: 'to-accent',
  secondary: 'to-secondary',
  neutral: 'to-neutral', 
  warm: 'to-warm',
  soft: 'to-soft',
  cool: 'to-cool',
  menthe: 'to-menthe',
} as const;

export function Background({ 
  color, 
  gradient, 
  pattern,
  children, 
  className,
  ...props 
}: BackgroundProps) {
  const baseClasses = gradient 
    ? cn(
        `bg-gradient-${gradient.direction || 'to-br'}`,
        gradientFromClasses[color],
        gradientToClasses[gradient.to]
      )
    : colorClasses[color];

  return (
    <div
      className={cn(
        'relative w-full min-h-full',
        baseClasses,
        className
      )}
      {...props}
    >
      {pattern && (
        <div className="absolute inset-0 pointer-events-none">
          {pattern}
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}