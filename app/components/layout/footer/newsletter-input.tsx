import * as React from "react";
import { cn } from "~/lib/utils";

/**
 * Props for Newsletter Input component
 */
export interface NewsletterInputProps {
  /** Newsletter signup handler */
  onSubmit?: (email: string) => void | Promise<void>;
  /** Whether signup is loading */
  isLoading?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Accessible label */
  ariaLabel?: string;
}

/**
 * Newsletter Input Component
 *
 * Champ email pour inscription newsletter avec :
 * - Fond blanc sur footer primary (vert #618462)
 * - Typography Barlow (sans-serif) pregnancy-safe
 * - Validation email côté client
 * - Touch target 48px minimum (confort grossesse)
 * - États focus accessibles WCAG 2.1 AA
 * - Loading state avec feedback visuel
 * - Placeholder et labels en français
 *
 * Usage:
 * ```tsx
 * <NewsletterInput onSubmit={handleSubmit} />
 * <NewsletterInput isLoading={true} onSubmit={handleSubmit} />
 * ```
 */
export function NewsletterInput({
  onSubmit,
  isLoading = false,
  className,
  placeholder = "Votre adresse email",
  ariaLabel = "Saisir votre adresse email pour la newsletter",
}: NewsletterInputProps) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isValidating, setIsValidating] = React.useState(false);

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("L'adresse email est requise");
      return;
    }

    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse email valide");
      return;
    }

    setError("");
    setIsValidating(true);

    try {
      if (onSubmit) {
        await onSubmit(email.trim());
        setEmail(""); // Clear on success
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsValidating(false);
    }
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear error when user starts typing
    if (error && newEmail.trim()) {
      setError("");
    }
  };

  const isFormDisabled = isLoading || isValidating;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div className="relative">
        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          disabled={isFormDisabled}
          className={cn(
            // Base styles
            "w-full font-body",
            // Sizing - pregnancy-safe touch target (56px to accommodate button)
            "h-14 px-4 pr-28 text-base",
            // Colors - transparent background on green footer
            "bg-transparent text-white placeholder:text-white/60",
            // Border and focus states
            "border-2 border-white/20 rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent",
            // Error state
            error && "border-red-400 focus:ring-red-400/50",
            // Disabled state
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Transitions
            "transition-all duration-200"
          )}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isFormDisabled || !email.trim()}
          aria-label="S'inscrire à la newsletter"
          className={cn(
            // Positioning - centered vertically with proper spacing
            "absolute right-1 top-1/2 -translate-y-1/2",
            // Base styles
            "inline-flex items-center justify-center",
            "px-4 font-body text-sm font-semibold",
            // Touch target - WCAG 2.1 AA requires 44px minimum, pregnancy-safe is 48px
            "min-h-12 min-w-[72px]",
            // Colors - primary button style
            "bg-primary text-white",
            "hover:bg-primary/90 active:bg-primary/80",
            // Border and shape
            "border border-primary rounded-md",
            // Focus states
            "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1",
            // Disabled state
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary",
            // Transitions
            "transition-all duration-200"
          )}
        >
          {isFormDisabled ? (
            <span className="flex items-center">
              {/* Loading spinner */}
              <svg
                className="animate-spin h-4 w-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              En cours...
            </span>
          ) : (
            "S'inscrire"
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-sm text-white/90 font-body"
        >
          {error}
        </p>
      )}
    </form>
  );
}
