import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";

// ============================================================================
// Types
// ============================================================================

/**
 * Form field context value type
 */
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

/**
 * Form item context value type
 */
type FormItemContextValue = {
  id: string;
};

/**
 * Props for the FormItem component
 */
export interface FormItemProps extends React.ComponentProps<"div"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the FormLabel component
 */
export interface FormLabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the FormControl component
 */
export interface FormControlProps extends React.ComponentProps<typeof Slot> {}

/**
 * Props for the FormDescription component
 */
export interface FormDescriptionProps extends React.ComponentProps<"p"> {
  /** Custom className */
  className?: string;
}

/**
 * Props for the FormMessage component
 */
export interface FormMessageProps extends React.ComponentProps<"p"> {
  /** Custom className */
  className?: string;
}

// ============================================================================
// Context
// ============================================================================

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

// ============================================================================
// Form Components
// ============================================================================

/**
 * Form - Root form component
 *
 * Re-export of react-hook-form's FormProvider for consistent naming.
 * Use with react-hook-form's useForm hook.
 *
 * @example
 * ```tsx
 * const form = useForm();
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField ... />
 *   </form>
 * </Form>
 * ```
 */
const Form = FormProvider;

/**
 * FormField - Controller wrapper with context
 *
 * Wraps react-hook-form's Controller with FormFieldContext for nested components.
 * Provides field name to child components like FormLabel and FormMessage.
 *
 * @example
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

/**
 * FormItem - Form field container
 *
 * Container for a single form field with automatic ID generation.
 * Provides context for FormLabel, FormControl, and FormMessage.
 *
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Field Name</FormLabel>
 *   <FormControl>
 *     <Input />
 *   </FormControl>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
export function FormItem({ className, ...props }: FormItemProps) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

/**
 * FormLabel - Label for form fields
 *
 * Accessible label component that automatically associates with form controls.
 * Shows error state with red text when field validation fails.
 *
 * @example
 * ```tsx
 * <FormLabel>Email Address</FormLabel>
 * ```
 */
export function FormLabel({ className, ...props }: FormLabelProps) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

/**
 * FormControl - Form input control wrapper
 *
 * Wraps form inputs with proper ARIA attributes for accessibility.
 * Automatically handles aria-describedby and aria-invalid.
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <Input type="email" />
 * </FormControl>
 * ```
 */
export function FormControl({ ...props }: FormControlProps) {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
}

/**
 * FormDescription - Helper text for form fields
 *
 * Displays additional information or instructions for a form field.
 * Automatically linked via aria-describedby for screen readers.
 *
 * @example
 * ```tsx
 * <FormDescription>
 *   Enter your email address for account verification.
 * </FormDescription>
 * ```
 */
export function FormDescription({
  className,
  ...props
}: FormDescriptionProps) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * FormMessage - Validation error message
 *
 * Displays validation errors from react-hook-form.
 * Automatically shown when field validation fails.
 * Linked to input via aria-describedby for accessibility.
 *
 * @example
 * ```tsx
 * <FormMessage />
 * ```
 */
export function FormMessage({ className, ...props }: FormMessageProps) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * useFormField - Access form field state and IDs
 *
 * Hook for accessing form field context within FormField components.
 * Provides field state, error info, and generated IDs for ARIA attributes.
 *
 * @returns Form field state and accessibility IDs
 *
 * @example
 * ```tsx
 * function CustomFormInput() {
 *   const { error, formItemId } = useFormField();
 *   return <input id={formItemId} aria-invalid={!!error} />;
 * }
 * ```
 */
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// ============================================================================
// Exports
// ============================================================================

export { Form, FormField };
