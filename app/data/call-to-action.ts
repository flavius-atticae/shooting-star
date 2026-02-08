import type { CallToActionProps } from "~/components/layout/call-to-action";

/**
 * Default CTA content shared across multiple pages.
 * Used in about, yoga, and féminin sacré pages.
 */
export const defaultCtaContent: Pick<CallToActionProps, "title" | "subtitle" | "buttonText" | "buttonHref"> = {
  title: "Un accompagnement rempli de douceur et bienveillance",
  subtitle:
    "Curieuse et ouverte, je me nourris de chaque femme croisée, de leurs multiples facettes, pour offrir un accompagnement sensible et doux, au cœur des passages et mystères du féminin.",
  buttonText: "RÉSERVEZ UN APPEL DÉCOUVERTE",
  buttonHref: "/contact",
};
