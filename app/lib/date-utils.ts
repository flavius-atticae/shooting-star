/**
 * Date utilities for French-formatted date strings used in event data.
 */

function normalizeMonthName(monthName: string) {
  return monthName
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/**
 * Converts a French month name (e.g. "Juin") to its zero-padded numeric value ("06").
 * Returns undefined when the name is not recognized.
 */
export function getFrenchMonth(monthName: string): string | undefined {
  const map: Record<string, string> = {
    janvier: "01",
    fevrier: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    aout: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    decembre: "12",
  };
  return map[normalizeMonthName(monthName)];
}

/**
 * Converts a French-formatted date (e.g., "7 Juin 2025") and 24h time (e.g., "13:00")
 * to an ISO 8601 date-time string ("2025-06-07T13:00").
 * Returns null when parsing fails.
 *
 * @param date French date in "DD Mois YYYY" format (month name in French)
 * @param time Time in 24-hour format ("HH:mm" or "HH:mm:ss")
 */
export function toIsoDateTime(date: string, time: string): string | null {
  const dateMatch = /^(\d{1,2})\s+([^\s]+)\s+(\d{4})$/u.exec(date);
  if (!dateMatch) return null;

  const [, day, monthName, year] = dateMatch;
  const dayNumber = Number.parseInt(day, 10);
  if (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) return null;

  // eslint-disable-next-line security/detect-unsafe-regex -- Simple time pattern with bounded digits; no catastrophic backtracking
  const timeMatch = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(time);
  if (!timeMatch) return null;
  const [, hourRaw, minuteRaw, secondRaw] = timeMatch;

  const hour = Number.parseInt(hourRaw, 10);
  const minute = Number.parseInt(minuteRaw, 10);
  const second = secondRaw ? Number.parseInt(secondRaw, 10) : undefined;

  const isValidHour = Number.isInteger(hour) && hour >= 0 && hour <= 23;
  const isValidMinute = Number.isInteger(minute) && minute >= 0 && minute <= 59;
  const isValidSecond =
    second === undefined || (Number.isInteger(second) && second >= 0 && second <= 59);

  if (!isValidHour || !isValidMinute || !isValidSecond) return null;

  const month = getFrenchMonth(monthName);
  if (!month) return null;

  const paddedDay = dayNumber.toString().padStart(2, "0");
  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");
  const paddedSecond = second !== undefined ? second.toString().padStart(2, "0") : undefined;

  const normalizedTime = paddedSecond
    ? `${paddedHour}:${paddedMinute}:${paddedSecond}`
    : `${paddedHour}:${paddedMinute}`;

  return `${year}-${month}-${paddedDay}T${normalizedTime}`;
}
