import { Honeypot } from "remix-utils/honeypot/server";

/**
 * Server-side Honeypot instance for anti-spam protection.
 *
 * This module instantiates the Honeypot class from remix-utils with
 * project-specific configuration. The Honeypot provides:
 * - A hidden field (name__confirm) that bots will fill but humans won't see
 * - An encrypted timestamp (from__confirm) to detect submissions that
 *   happen too fast (likely automated)
 *
 * The encryption seed MUST be set via the HONEYPOT_ENCRYPTION_SEED
 * environment variable. It ensures encrypted timestamps remain valid
 * across server restarts and multi-instance deployments.
 *
 * Usage:
 * - In root loader: call `honeypot.getInputProps()` and pass to client
 * - In actions: call `honeypot.check(formData)` to validate submissions
 *
 * @see https://github.com/sergiodxa/remix-utils#form-honeypot
 */
let encryptionSeed = process.env.HONEYPOT_ENCRYPTION_SEED;

if (!encryptionSeed) {
  if (process.env.NODE_ENV === "test") {
    // Fallback seed for test environment to avoid crashing test runners
    encryptionSeed = "test-honeypot-encryption-seed";
  } else {
    throw new Error(
      "HONEYPOT_ENCRYPTION_SEED environment variable must be set. " +
        "Generate one with: openssl rand -hex 32",
    );
  }
}

export const honeypot = new Honeypot({
  randomizeNameFieldName: false,
  nameFieldName: "name__confirm",
  validFromFieldName: "from__confirm",
  encryptionSeed,
});
