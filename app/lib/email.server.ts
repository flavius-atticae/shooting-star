import { Resend } from "resend";
import { ContactNotification } from "~/emails/contact-notification";
import { ContactConfirmation } from "~/emails/contact-confirmation";

// ---------------------------------------------------------------------------
// Resend client (lazy singleton)
// ---------------------------------------------------------------------------
// Initialised on first use rather than at module-evaluation time so that
// importing this module in environments without RESEND_API_KEY (e.g.
// Storybook / Chromatic) does not throw.

let _resend: Resend | null = null;

function getResendClient(): Resend {
  if (!_resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error(
        "RESEND_API_KEY environment variable is not set. " +
          "Provide it before sending emails.",
      );
    }
    _resend = new Resend(apiKey);
  }
  return _resend;
}

// ---------------------------------------------------------------------------
// Environment helpers
// ---------------------------------------------------------------------------

function getFromAddress(): string {
  const email = process.env.RESEND_FROM_EMAIL;
  const name = process.env.RESEND_FROM_NAME;

  if (!email) {
    throw new Error("RESEND_FROM_EMAIL environment variable is not set");
  }

  return name ? `${name} <${email}>` : email;
}

function getReplyTo(): string {
  const replyTo = process.env.CONTACT_REPLY_TO;
  if (!replyTo) {
    throw new Error("CONTACT_REPLY_TO environment variable is not set");
  }
  return replyTo;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

interface ContactFormData {
  name: string;
  email: string;
  availability?: string;
  message: string;
}

/**
 * Send a notification email to Pauline with the contact form details.
 *
 * Retries once on failure before giving up.
 */
export async function sendContactNotification(
  formData: ContactFormData,
): Promise<void> {
  const from = getFromAddress();
  const replyTo = getReplyTo();

  await sendWithRetry(() =>
    getResendClient().emails.send({
      from,
      to: replyTo,
      replyTo: formData.email,
      subject: `Nouveau message de ${formData.name} — paulineroussel.ca`,
      react: ContactNotification({
        name: formData.name,
        email: formData.email,
        availability: formData.availability,
        message: formData.message,
      }),
    }),
  );
}

/**
 * Send an acknowledgement email to the user confirming receipt.
 *
 * Retries once on failure before giving up.
 */
export async function sendContactConfirmation(
  email: string,
  name: string,
): Promise<void> {
  const from = getFromAddress();
  const replyTo = getReplyTo();

  await sendWithRetry(() =>
    getResendClient().emails.send({
      from,
      to: email,
      replyTo,
      subject: "Merci pour votre message — Pauline Roussel",
      react: ContactConfirmation({ name }),
    }),
  );
}

/**
 * Send both the notification (to Pauline) and the confirmation (to the user).
 *
 * - Both emails are sent concurrently.
 * - If the notification fails, the error propagates (we want to know).
 * - If only the confirmation fails, we log but do NOT fail the request —
 *   the user's message was already received.
 */
export async function sendContactEmails(
  formData: ContactFormData,
): Promise<void> {
  const [notificationResult, confirmationResult] = await Promise.allSettled([
    sendContactNotification(formData),
    sendContactConfirmation(formData.email, formData.name),
  ]);

  // Notification failure is critical — Pauline must receive the message
  if (notificationResult.status === "rejected") {
    throw notificationResult.reason;
  }

  // Confirmation failure is non-critical — log and continue
  if (confirmationResult.status === "rejected") {
    console.error(
      "Failed to send confirmation email:",
      confirmationResult.reason,
    );
  }
}

// ---------------------------------------------------------------------------
// Retry helper
// ---------------------------------------------------------------------------

/**
 * Execute an async operation with a single retry on failure.
 * Waits 1 second before the retry attempt.
 */
async function sendWithRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (firstError) {
    // Wait 1s before retry
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      return await fn();
    } catch (retryError) {
      // Both attempts failed — throw the original error for context
      throw firstError;
    }
  }
}
