import type { Route } from "./+types/contact";
import { Header } from "~/components/layout/header/header";
import { ContactSection } from "~/components/layout/contact";
import { Footer } from "~/components/layout/footer/footer";
import { Container } from "~/components/ui/container";
import { Section } from "~/components/ui/section";
import type { ContactFormData } from "~/components/layout/contact";

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
  /**
   * Handle form submission
   * For now, just logs to console and shows success message.
   * Integrate backend submission (Formspree, Netlify Forms, or custom API) when ready.
   */
  const handleFormSubmit = async (data: ContactFormData) => {
    // Log form data (development only)
    if (import.meta.env.DEV) {
      console.log("Contact form submitted:", data);
    }

    // Future implementation:
    // - Send to Formspree, Netlify Forms, or custom API
    // - Add proper error handling
    // - Add analytics tracking

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

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
        <ContactSection onSubmit={handleFormSubmit} spacing="normal" />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
