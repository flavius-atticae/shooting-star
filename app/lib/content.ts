import { defaultCtaContent } from "~/data/call-to-action";

export interface CallToActionContent {
  title: typeof defaultCtaContent.title;
  subtitle: typeof defaultCtaContent.subtitle;
  buttonText: typeof defaultCtaContent.buttonText;
  buttonHref: NonNullable<typeof defaultCtaContent.buttonHref>;
}

export interface ServiceContentItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  buttonTarget?: "_blank" | "_self" | "_parent" | "_top";
  "aria-label"?: string;
}

export function getCallToActionContent(): CallToActionContent {
  return {
    ...defaultCtaContent,
    buttonHref: defaultCtaContent.buttonHref ?? "/contact",
  };
}
