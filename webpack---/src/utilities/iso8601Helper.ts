import { secondsConverter } from './duration.ts';

const SECONDS_IN_MINUTE = 60;

export const secondsToIso8601Duration = (totalSeconds: number): string => {
  const { hours, minutes, seconds } = secondsConverter(totalSeconds, 'hms');

  let result = '';

  if (hours) {
    result += `${hours}H`;
  }

  if (minutes || (totalSeconds > SECONDS_IN_MINUTE && seconds !== 0)) {
    result += `${minutes}M`;
  }

  if (seconds || totalSeconds === 0) {
    result += `${seconds}S`;
  }

  return result;
};
