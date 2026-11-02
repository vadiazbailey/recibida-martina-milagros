/**
 * Date and Time utilities strictly for Argentina Timezone (UTC-3 / ART)
 * Argentina does not use Daylight Saving Time, so it is permanently UTC-3.
 */

// Default dates requested by the user
export const DEFAULT_CONFIG = {
  examDate: '2026-12-18',
  examTime: '12:00', // Default exam time (12:00 PM ART)
  partyDate: '2026-12-19',
  partyTime: '21:30', // Default party time (9:30 PM ART)
  offset: '-03:00'
};

/**
 * Converts a date and time string in Argentina (UTC-3) to a timestamp (milliseconds since epoch)
 * @param {string} dateStr 'YYYY-MM-DD'
 * @param {string} timeStr 'HH:mm' or 'HH:mm:ss'
 * @returns {number} Timestamp in ms
 */
export function getArgentinaTargetTimestamp(dateStr, timeStr) {
  // Ensure seconds are included
  const formattedTime = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  const isoString = `${dateStr}T${formattedTime}-03:00`;
  const date = new Date(isoString);
  return date.getTime();
}

/**
 * Returns current timestamp. Allows passing an offset in ms for simulation mode.
 * @param {number} simulationOffsetMs
 * @returns {number} current simulated timestamp in ms
 */
export function getEffectiveNow(simulationOffsetMs = 0) {
  return Date.now() + simulationOffsetMs;
}

/**
 * Calculates remaining days, hours, minutes, seconds from target
 * @param {number} targetTimestamp
 * @param {number} currentTimestamp
 */
export function calculateRemaining(targetTimestamp, currentTimestamp) {
  const diff = targetTimestamp - currentTimestamp;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isZero: true,
      isPassed: true
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isZero: false,
    isPassed: false
  };
}

/**
 * Format a timestamp into an elegant Spanish string in Argentina timezone
 * @param {number} timestamp
 */
export function formatSpanishDate(timestamp) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires'
  };
  const str = new Intl.DateTimeFormat('es-AR', options).format(new Date(timestamp));
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format time in Argentina timezone
 * @param {number} timestamp
 */
export function formatSpanishTime(timestamp) {
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Argentina/Buenos_Aires'
  };
  return new Intl.DateTimeFormat('es-AR', options).format(new Date(timestamp)) + ' hs (ARG)';
}
