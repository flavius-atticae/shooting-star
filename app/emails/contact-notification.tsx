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

interface ContactNotificationProps {
  name: string;
  email: string;
  availability?: string;
  message: string;
}

/**
 * Email template sent to Pauline when a new contact form submission is received.
 *
 * Design: Simple, clean, and readable — no complex HTML or heavy styling.
 * Language: French (fr-CA)
 */
export function ContactNotification({
  name,
  email,
  availability,
  message,
}: ContactNotificationProps) {
  return (
    <Html lang="fr">
      <Head />
      <Preview>Nouveau message de {name} via paulineroussel.ca</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={headingStyle}>
            Nouveau message
          </Heading>

          <Text style={labelStyle}>Nom</Text>
          <Text style={valueStyle}>{name}</Text>

          <Text style={labelStyle}>Courriel</Text>
          <Text style={valueStyle}>{email}</Text>

          {availability && (
            <>
              <Text style={labelStyle}>Disponibilité</Text>
              <Text style={valueStyle}>{availability}</Text>
            </>
          )}

          <Hr style={hrStyle} />

          <Text style={labelStyle}>Message</Text>
          <Text style={messageStyle}>{message}</Text>

          <Hr style={hrStyle} />

          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Ce message a été envoyé depuis le formulaire de contact de
              paulineroussel.ca
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

const labelStyle: React.CSSProperties = {
  color: "#6b6b6b",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  marginBottom: "2px",
  textTransform: "uppercase" as const,
};

const valueStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "15px",
  marginBottom: "16px",
  marginTop: "0",
};

const messageStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "15px",
  lineHeight: "1.6",
  marginTop: "0",
  whiteSpace: "pre-wrap",
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
