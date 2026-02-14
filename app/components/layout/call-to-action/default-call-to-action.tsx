import { CallToAction } from "./call-to-action";
import { defaultCtaContent } from "~/data/call-to-action";
import type { CallToActionProps } from "./call-to-action";

/**
 * DefaultCallToAction - Pre-configured CallToAction with shared content.
 * 
 * Wraps the base CallToAction component with the default CTA content
 * used across multiple pages (about, yoga, féminin sacré).
 * Accepts optional overrides for spacing and other CallToAction props.
 */
export function DefaultCallToAction(
  props: Omit<CallToActionProps, "title" | "subtitle" | "buttonText" | "buttonHref">
) {
  return <CallToAction {...defaultCtaContent} {...props} />;
}
