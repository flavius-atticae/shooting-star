import type { Route } from "./+types/contact";
import { data } from "react-router";
import { Header } from "~/components/layout/header/header";
import { ContactSection } from "~/components/layout/contact";
import { contactFormSchema } from "~/lib/contact-form-schema";
import { Footer } from "~/components/layout/footer/footer";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";
import { isHoneypotFilled, isSubmissionTooFast } from "~/lib/form-security";
import { isRateLimited } from "~/lib/rate-limiter";

/**
 * Server-side action for the contact form.
 *
 * Handles form submission with progressive enhancement:
 * 1. Honeypot check (silent rejection for bots)
 * 2. Time-based check (silent rejection for too-fast submissions)
 * 3. IP-based rate limiting (max 3 per 15 min)
 * 4. Zod validation (same schema as client)
 * 5. Sanitization (handled by Zod transforms)
 */
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  // 1. Honeypot check — silent rejection
  const honeypot = formData.get("website");
  if (isHoneypotFilled(typeof honeypot === "string" ? honeypot : null)) {
    return data({ success: true });
  }

  // 2. Timestamp check — silent rejection for too-fast submissions
  //    Only apply when a valid timestamp is present; missing timestamps
  //    (e.g. no-JS form submissions) are allowed through.
  const timestampValue = formData.get("_timestamp");
  if (timestampValue !== null && timestampValue !== "") {
    const timestamp = Number(timestampValue);
    if (!Number.isNaN(timestamp) && isSubmissionTooFast(timestamp)) {
      return data({ success: true });
    }
  }

  // 3. Rate limit by IP
  //    x-forwarded-for may contain a comma-separated list; take the first
  //    (client) IP and trim whitespace. Falls back to x-real-ip or "unknown".
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return data(
      {
        error:
          "Trop de messages envoyés. Réessayez dans quelques minutes.",
      },
      { status: 429 },
    );
  }

  // 4. Server-side Zod validation (same schema as client)
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    availability: formData.get("availability") || "",
    message: formData.get("message"),
  };

  const result = contactFormSchema.safeParse(raw);
  if (!result.success) {
    return data(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // 5. Data is already sanitized by Zod transforms
  // 6. Send email — future implementation (next sub-task)
  // For now, return success

  return data({ success: true });
}

/**
 * Meta tags for the Contact page
 */
export function meta(_args: Route.MetaArgs) {
  return [
    {
      title: "Contact - Pauline Roussel | Yoga Prénatal & Accompagnement",
    },
    {
      name: "description",
      content:
        "Contactez Pauline Roussel pour échanger sur vos besoins en yoga prénatal, accompagnement doula ou bien-être féminin. Grande région de Montréal.",
    },
    {
      name: "keywords",
      content:
        "contact, rendez-vous, yoga prénatal, doula, Montréal, accompagnement grossesse",
    },
  ];
}

/**
 * Contact Page Component
 *
 * Features:
 * - Hero section with title and subtitle
 * - Two-column contact section (info + form)
 * - Footer
 *
 * Layout:
 * - Desktop: Side-by-side contact info and form
 * - Mobile: Stacked vertically (info first, then form)
 *
 * Accessibility:
 * - WCAG 2.1 AA compliant
 * - Proper heading hierarchy
 * - Semantic HTML
 * - Keyboard navigation
 * - Screen reader friendly
 */
export default function Contact() {
  return (
    <>
      {/* Header - Navigation principale */}
      <Header />

      <main id="main-content" role="main">
        {/* Page Header - Title and subtitle on white background */}
        <Section spacing="normal" background="white">
          <Container size="xl" className="px-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="font-heading font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary leading-tight mb-4">
                Contact
              </h1>
              <p className="font-sans text-sm sm:text-base md:text-lg text-primary/80 uppercase tracking-wide">
                Envie d'en savoir plus ou de commencer ton accompagnement ?
              </p>
            </div>
          </Container>
        </Section>

        {/* Contact Section - Two-column layout with form */}
        <ContactSection spacing="normal" />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
