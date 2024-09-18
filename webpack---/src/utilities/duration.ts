import { toSeconds, parse } from 'iso8601-duration';
import { isNil, isNumber } from '@wistia/type-guards';

type DurationData = {
  hours: number;
  minutes: number;
  seconds: number;
};

const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;

const padNumber = (num: number, length = 0): string => {
  let result = `${num}`;
  while (result.length < length) {
    result = `0${result}`;
  }
  return result;
};

export const secondsConverter = (total: number, format: string): DurationData => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  let remainingDuration = total;

  const useHours = format.includes('h');
  const useMinutes = format.includes('m');

  if (useHours && remainingDuration > 0) {
    hours += Math.floor(remainingDuration / SECONDS_IN_HOUR);
    remainingDuration %= SECONDS_IN_HOUR;
  }

  if (useMinutes && remainingDuration > 0) {
    minutes += Math.floor(remainingDuration / MINUTES_IN_HOUR);
    remainingDuration %= MINUTES_IN_HOUR;
  }

  seconds = Math.round(remainingDuration);

  if (useHours && minutes === MINUTES_IN_HOUR) {
    hours += 1;
    minutes = 0;
  }

  if (useMinutes && seconds === SECONDS_IN_MINUTE) {
    minutes += 1;
    seconds = 0;
  }

  return {
    hours,
    minutes,
    seconds,
  };
};

// flexibleDuration is a duration format that uses as
// few digits as possible to express that duration
export const flexibleDuration = (total: number): string => {
  const { hours, minutes, seconds } = secondsConverter(total, 'hms');

  if (hours === 0) {
    return `${minutes}:${padNumber(seconds, 2)}`;
  }
  return `${hours}:${padNumber(minutes, 2)}:${padNumber(seconds, 2)}`;
};

export const formattedDurationToSeconds = (dur: string): number | string => {
  if (isNil(dur) || isNumber(dur)) {
    return dur;
  }

  try {
    const parsed = parse(dur.toUpperCase());
    return toSeconds(parsed);
  } catch {
    /* empty, we want to swallow and continue */
  }

  // We allow for non-standard IS0 6801 Duration strings, eg. 1H30M,
  // the parsing lib can do that if prefixed with the correct ISO Duration prefixes
  try {
    const parsed = parse(`PT${dur.toUpperCase()}`);
    return toSeconds(parsed);
  } catch {
    /* empty, we want to swallow and continue */
  }

  return dur;
};

export const accessibilityDuration = (duration: number): string => {
  const { hours, minutes, seconds } = secondsConverter(duration, 'hms');
  const zeroHours = hours === 0;
  const zeroMinutes = minutes === 0;
  if (zeroHours && zeroMinutes) {
    return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }

  const hoursText = zeroHours ? '' : `${hours} hour${hours === 1 ? '' : 's'}`;
  const minText = zeroMinutes ? '' : `${minutes} minute${hours === 1 ? '' : 's'}`;

  return `${hoursText} ${minText}`.trim();
};

export const humanReadableDuration = (duration: number): string => {
  const { hours, minutes, seconds } = secondsConverter(duration, 'hms');
  const zeroHours = hours === 0;
  const zeroMinutes = minutes === 0;
  if (zeroHours && zeroMinutes) return `${seconds} Sec`;

  const hoursText = zeroHours ? '' : `${hours} Hr`;
  const minText = zeroMinutes ? '' : `${minutes} Min`;
  return `${hoursText} ${minText}`.trim();
};

export const getSecondsRemaining = (start: Date, end: Date): number => {
  const remaining = end.getTime() - start.getTime();
  return remaining / 1000;
};
