// Foundation Components - Phase 1
export { Button, buttonVariants } from "./button";
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
export { Input } from "./input";
export { Label } from "./label";
export { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  useFormField 
} from "./form";

// Layout Components - Phase 1
export { Container, containerVariants, type ContainerProps } from "./container";
export { Section, type SectionProps } from "./section";

// Background System - Phase 1 Final
export { 
  Background, 
  BackgroundPattern, 
  useBackgroundClasses,
  type BackgroundProps 
} from "./background";

// Re-export types for convenience
export type { 
  ButtonProps
} from "./button";

// Constants pour usage externe
export const PHASE_1_COMPONENTS = [
  'Button',
  'Card', 
  'Input',
  'Label', 
  'Form',
  'Container',
  'Section',
  'Background'
] as const;

export const BACKGROUND_VARIANTS = [
  'white',
  'accent', 
  'soft',
  'gradient-soft',
  'gradient-warm'
] as const;