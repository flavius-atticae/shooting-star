/**
 * Content Service - Abstraction layer over app/data/* modules.
 *
 * Provides typed accessor functions that decouple route consumers from the
 * data source. When a future CMS migration occurs, only this file needs
 * to change.
 *
 * NOTE: This is a server-only module (.server.ts) so it is never bundled
 * into client-side JavaScript.
 */

import { servicesData } from "~/data/home";
import { doulaServices, doulaTestimonials, approachItems } from "~/data/doula";
import { inspirationItems } from "~/data/about";
import { eventsData, introText } from "~/data/feminin-sacre";
import {
  getCallToActionContent as getSharedCallToActionContent,
  type CallToActionContent,
} from "~/lib/content";

// ============================================================================
// Content interfaces
// ============================================================================

/** Content returned by {@link getHomeContent}. */
export interface HomeContent {
  services: typeof servicesData;
}

/** Content returned by {@link getDoulaContent}. */
export interface DoulaContent {
  services: typeof doulaServices;
  testimonials: typeof doulaTestimonials;
  approachItems: typeof approachItems;
}

/** Content returned by {@link getYogaContent}. */
export type YogaContent = Record<string, never>;

/** Content returned by {@link getAboutContent}. */
export interface AboutContent {
  inspirationItems: typeof inspirationItems;
}

/** Content returned by {@link getFemininSacreContent}. */
export interface FemininSacreContent {
  events: typeof eventsData;
  introText: typeof introText;
}

// ============================================================================
// Accessor functions
// ============================================================================

/** Returns the complete content needed by the home page. */
export function getHomeContent(): HomeContent {
  return { services: servicesData };
}

/** Returns the complete content needed by the doula page. */
export function getDoulaContent(): DoulaContent {
  return {
    services: doulaServices,
    testimonials: doulaTestimonials,
    approachItems,
  };
}

/** Returns the content contract for the yoga page (currently empty). */
export function getYogaContent(): YogaContent {
  return {};
}

/** Returns the complete content needed by the about page. */
export function getAboutContent(): AboutContent {
  return { inspirationItems };
}

/** Returns the complete content needed by the féminin sacré page. */
export function getFemininSacreContent(): FemininSacreContent {
  return { events: eventsData, introText };
}

/** Returns the shared default call-to-action content. */
export function getCallToActionContent(): CallToActionContent {
  return getSharedCallToActionContent();
}
