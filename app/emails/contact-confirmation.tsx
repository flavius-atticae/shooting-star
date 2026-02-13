import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactConfirmationProps {
  name: string;
}

/**
 * Acknowledgement email sent to the user after submitting the contact form.
 *
 * Tone: Warm, reassuring, and professional — matching the brand voice.
 * Language: French (fr-CA)
 *
 * Compliance notes (GDPR / PIPEDA / Loi 25):
 * - Strictly an acknowledgement — NO marketing content.
 * - No unsubscribe link (this is not a newsletter).
 * - No tracking pixels or external links beyond necessary.
 */
export function ContactConfirmation({ name }: ContactConfirmationProps) {
  return (
    <Html lang="fr-CA">
      <Head />
      <Preview>Merci pour votre message, {name}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={headingStyle}>
            Merci pour votre message&nbsp;✨
          </Heading>

          <Text style={textStyle}>Bonjour {name},</Text>

          <Text style={textStyle}>
            J&apos;ai bien reçu votre message et je vous en remercie
            chaleureusement. Je prends le temps de lire chaque demande
            attentivement.
          </Text>

          <Text style={textStyle}>
            Je vous répondrai dans un délai de <strong>48 heures</strong>.
            N&apos;hésitez pas à répondre directement à ce courriel si vous
            souhaitez ajouter quelque chose entre-temps.
          </Text>

          <Text style={textStyle}>Au plaisir d&apos;échanger avec vous,</Text>

          <Text style={signatureStyle}>
            Pauline Roussel
            <br />
            <span style={signatureDetailStyle}>
              Yoga prénatal &amp; postnatal · Accompagnement à la naissance
            </span>
          </Text>

          <Hr style={hrStyle} />

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Ce courriel confirme la réception de votre message envoyé via
              paulineroussel.ca. Aucune action n&apos;est requise de votre part.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ---------------------------------------------------------------------------
// Styles — inline for maximum email client compatibility
// ---------------------------------------------------------------------------

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#f8f7f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  margin: "40px auto",
  maxWidth: "560px",
  padding: "32px 40px",
};

const headingStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "22px",
  fontWeight: 600,
  marginBottom: "24px",
};

const textStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "15px",
  lineHeight: "1.6",
  marginBottom: "16px",
};

const signatureStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "15px",
  lineHeight: "1.6",
  marginTop: "8px",
};

const signatureDetailStyle: React.CSSProperties = {
  color: "#6b6b6b",
  fontSize: "13px",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#e8e5e0",
  borderTop: "1px solid #e8e5e0",
  margin: "24px 0",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center" as const,
};

const footerTextStyle: React.CSSProperties = {
  color: "#999999",
  fontSize: "12px",
};
