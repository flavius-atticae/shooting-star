/**
 * In-Memory Rate Limiter
 *
 * Limits the number of requests per IP address within a time window.
 * Designed for the contact form to prevent abuse while remaining
 * transparent to legitimate users.
 *
 * Configuration:
 * - Max 3 requests per 15 minutes per IP
 * - Auto-cleanup of expired entries every 5 minutes
 */

/** Rate limit entry for a single IP */
interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

/** Default maximum requests per window */
const DEFAULT_MAX_REQUESTS = 3;

/** Default time window in milliseconds (15 minutes) */
const DEFAULT_WINDOW_MS = 15 * 60 * 1000;

/** Cleanup interval in milliseconds (5 minutes) */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

/** In-memory store mapping IP addresses to their rate limit entries */
const store = new Map<string, RateLimitEntry>();

/** Reference to the cleanup interval timer */
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Remove expired entries from the store.
 * An entry is expired when the time since its first request
 * exceeds the default rate limit window.
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of store) {
    if (now - entry.firstRequest >= DEFAULT_WINDOW_MS) {
      store.delete(ip);
    }
  }
}

/**
 * Start the automatic cleanup interval.
 * Only starts if not already running.
 */
function startCleanupInterval(): void {
  if (cleanupInterval !== null) return;
  cleanupInterval = setInterval(
    cleanupExpiredEntries,
    CLEANUP_INTERVAL_MS,
  );
  // Allow the process to exit even if the interval is still running
  if (typeof cleanupInterval === "object" && "unref" in cleanupInterval) {
    cleanupInterval.unref();
  }
}

/**
 * Check whether an IP address has exceeded the rate limit.
 *
 * Uses the default window (15 minutes) and max requests (3) for all
 * callers to stay consistent with the cleanup interval. Custom values
 * are accepted for testing only via the optional parameters.
 *
 * @param ip - The IP address to check
 * @param maxRequests - Maximum requests allowed per window (default: 3)
 * @returns `true` if the IP is rate limited and should be blocked
 */
export function isRateLimited(
  ip: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
): boolean {
  startCleanupInterval();

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry) {
    store.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Window has expired — reset the entry
  if (now - entry.firstRequest >= DEFAULT_WINDOW_MS) {
    store.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Within window — check count
  if (entry.count >= maxRequests) {
    return true;
  }

  // Increment and allow
  entry.count += 1;
  return false;
}

/**
 * Reset the rate limiter store. Useful for testing.
 */
export function resetRateLimiter(): void {
  store.clear();
  if (cleanupInterval !== null) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}
