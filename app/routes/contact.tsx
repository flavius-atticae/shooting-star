import type { Route } from "./+types/contact";
import { Header } from "~/components/layout/header/header";
import { Hero } from "~/components/layout/hero/Hero";
import { ContactSection } from "~/components/contact";
import { Footer } from "~/components/layout/footer/footer";
import type { ContactFormData } from "~/components/contact";

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
   * For now, just logs to console and shows success message
   * TODO: Implement backend integration (Formspree, Netlify Forms, or custom API)
   */
  const handleFormSubmit = async (data: ContactFormData) => {
    // Log form data (development only)
    console.log("Contact form submitted:", data);

    // TODO: Future implementation
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
        {/* Hero Section - "Contact" */}
        <Hero
          variant="default"
          title="Contact"
          subtitle="ENVIE D'EN SAVOIR PLUS OU DE COMMENCER TON ACCOMPAGNEMENT ?"
        />

        {/* Contact Section - Two-column layout with form */}
        <ContactSection onSubmit={handleFormSubmit} spacing="normal" />
      </main>

      {/* Footer - Navigation et contact */}
      <Footer />
    </>
  );
}
