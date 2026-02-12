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
 * Usage:
 * - In root loader: call `honeypot.getInputProps()` and pass to client
 * - In actions: call `honeypot.check(formData)` to validate submissions
 *
 * @see https://github.com/sergiodxa/remix-utils#form-honeypot
 */
export const honeypot = new Honeypot({
  randomizeNameFieldName: false,
  nameFieldName: "name__confirm",
  validFromFieldName: "from__confirm",
  encryptionSeed: undefined,
});
