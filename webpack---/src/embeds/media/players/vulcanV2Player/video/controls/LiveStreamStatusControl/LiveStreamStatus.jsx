import { h } from 'preact';
import { useEffect, useReducer, useState } from 'preact/hooks';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { useInterval } from 'utilities/useInterval.js';
import { getTranslation, defineTranslations } from '../../../../../../shared/translations.js';
import { flexibleDuration, getSecondsRemaining } from '../../../../../../../utilities/duration.ts';

defineTranslations('en-US', {
  LIVE_STREAM_STATUS_COUNTDOWN: 'Stream begins in',
  LIVE_STREAM_STATUS_LIVE: 'Live',
  LIVE_STREAM_STATUS_LIVE_ARIA: 'The stream is now live',
  LIVE_STREAM_STATUS_MINUTES: 'minutes',
  LIVE_STREAM_STATUS_SCHEDULED_FOR: 'Scheduled for',
  LIVE_STREAM_STATUS_SCHEDULED_FOR_ARIA: 'The stream is scheduled for',
  LIVE_STREAM_STATUS_SCHEDULED_FOR_TIME_SEPARATOR: 'at',
  LIVE_STREAM_STATUS_SECONDS: 'seconds',
  LIVE_STREAM_STATUS_STREAM_ENDED: 'The stream has ended',
  LIVE_STREAM_STATUS_WAITING_FOR_HOST: 'Waiting for host to begin',
  LIVE_STREAM_STATUS_WAITING_FOR_HOST_ARIA: 'Waiting for host to begin live stream',
});

function formatScheduledFor(date, languageCode) {
  // return date in format MMM D, YYYY at HH:mmZ
  const dayOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const timeOptions = { hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };

  const day = date.toLocaleString(navigator.language, dayOptions);
  const time = date.toLocaleString(navigator.language, timeOptions);

  return `${day} ${getTranslation(
    languageCode,
    'LIVE_STREAM_STATUS_SCHEDULED_FOR_TIME_SEPARATOR',
  )} ${time}`;
}

function InidicatorIcon({ state }) {
  return (
    <div
      style={{
        backgroundColor: state === 'live' ? '#fa4040' : '',
        borderRadius: '50%',
        width: '12px',
        height: '12px',
        marginRight: '4px',
      }}
    ></div>
  );
}

const liveStreamStatusMachine = {
  initial: 'idle',
  states: {
    idle: {
      on: {
        READY: 'live',
        NOT_READY: 'beforeStream',
        START_COUNTDOWN: 'countdown',
        PAST_SCHEDULE: 'waitingForHost',
      },
    },
    beforeStream: {
      on: {
        PAST_SCHEDULE: 'waitingForHost',
        READY: 'live',
        START_COUNTDOWN: 'countdown',
      },
    },
    countdown: {
      on: {
        PAST_SCHEDULE: 'waitingForHost',
        READY: 'live',
      },
    },
    waitingForHost: {
      on: {
        READY: 'live',
        END: 'ended',
      },
    },
    live: {
      on: { END: 'ended' },
    },
    ended: {},
  },
};

function isBeforeSchedule(scheduledFor) {
  if (!scheduledFor) return false;
  return Date.now() < scheduledFor.getTime();
}

function isCloseToStarting(scheduledFor) {
  if (!scheduledFor) return false;
  // we're close to starting if we're within an hr timeframe
  const oneHour = 60 * 60;
  const diff = getSecondsRemaining(new Date(), scheduledFor);
  return diff < oneHour;
}

function MountingPoint({ children, scale, show }) {
  return (
    <div
      className="w-css-reset"
      style={{
        left: 0,
        position: 'absolute',
        top: 0,
        display: 'flex',
        opacity: show ? 1 : 0,
        transition: 'opacity 200ms',
        margin: `${scaleValue({ base: 12, scale })}px 0 0 ${scaleValue({ base: 12, scale })}px`,
        // pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}

function reducer(state, event) {
  // find the next state, if invalid event is sent then we
  // stay in our current state
  const nextState = liveStreamStatusMachine.states[state].on?.[event.type];

  if (nextState === undefined) {
    return state;
  }

  return nextState;
}

function scaleValue({ scale, base }) {
  const max = base * 2;
  return Math.min(max, Math.max(0, scale * base));
}

function StatusBox({ children, scale }) {
  return (
    <div
      className="w-live-status"
      style={{
        backgroundColor: 'rgba(11, 13, 14, 0.7)',
        padding: `${scaleValue({ base: 8, scale })}px ${scaleValue({ base: 12, scale })}px`,
        display: 'flex',
        color: '#fff',
        alignItems: 'center',
        borderRadius: '4px',
        fontFamily: interFontFamily,
        fontSize: `${scaleValue({ base: 14, scale })}px`,
      }}
    >
      {children}
    </div>
  );
}

function LiveStreamStatus({
  controlsAreVisible,
  playerLanguage,
  scale,
  scheduledFor,
  videoReady,
  videoState,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const show = videoState === 'playing' ? controlsAreVisible : true;
  const [state, dispatch] = useReducer(reducer, liveStreamStatusMachine.initial);

  useEffect(() => {
    if (videoState === 'ended') {
      dispatch({ type: 'END' });
    } else if (videoReady) {
      dispatch({ type: 'READY' });
    } else if (isBeforeSchedule(scheduledFor)) {
      dispatch(
        isCloseToStarting(scheduledFor) ? { type: 'START_COUNTDOWN' } : { type: 'NOT_READY' },
      );
    } else {
      dispatch({ type: 'PAST_SCHEDULE' });
    }
  }, [currentTime, videoReady, videoState]);

  useEffect(() => {
    this.props.setAriaLiveText(getStatusIndicatorAriaText());
  }, [state]);

  useEffect(() => {
    if (state === 'countdown') {
      const remainingSeconds = getSecondsRemaining(new Date(), scheduledFor);
      const ceiledSeconds = Math.ceil(remainingSeconds);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      const lessThanAMinute = remainingSeconds / 60;

      let translationText = '';

      // we don't want to spam the aria-live area, so we will only update it every 5 minutes
      // during the countdown, or every 5 seconds in the last minute
      if (remainingMinutes % 5 === 0) {
        translationText = `${translation('COUNTDOWN')} ${remainingMinutes} ${translation(
          'MINUTES',
        )}`;
      } else if (lessThanAMinute && ceiledSeconds % 5 === 0) {
        translationText = `${translation('COUNTDOWN')} ${ceiledSeconds} ${translation('SECONDS')}`;
      }

      this.props.setAriaLiveText(translationText);
    }
  }, [currentTime]);

  useInterval(
    () => setCurrentTime(new Date()),
    state === 'live' || state === 'ended' ? null : 1000,
  );

  const getStatusIndicatorAriaText = () => {
    // we don't want to account for 'countdown' because that case is handled
    // independently to avoid spamming the aria-live component
    switch (state) {
      case 'live':
        return translation('LIVE_ARIA');
      case 'ended':
        return translation('STREAM_ENDED');
      case 'waitingForHost':
        return translation('WAITING_FOR_HOST_ARIA');
      case 'beforeStream':
        return `${translation('SCHEDULED_FOR_ARIA')} ${formatScheduledFor(
          scheduledFor,
          playerLanguage.code,
        )}`;
      default:
    }
  };

  const getStatusIndicatorText = () => {
    switch (state) {
      case 'live':
        return translation('LIVE');
      case 'ended':
        return translation('STREAM_ENDED');
      case 'waitingForHost':
        return translation('WAITING_FOR_HOST');
      case 'beforeStream':
        return `${translation('SCHEDULED_FOR')} ${formatScheduledFor(
          scheduledFor,
          playerLanguage.code,
        )}`;
      case 'countdown':
        return `${translation('COUNTDOWN')} ${flexibleDuration(
          getSecondsRemaining(new Date(), scheduledFor),
        )}`;
      default:
    }
  };

  const translation = (key) => {
    return getTranslation(playerLanguage.code, `LIVE_STREAM_STATUS_${key}`);
  };

  return (
    <MountingPoint scale={scale} show={show}>
      <StatusBox scale={scale}>
        {state === 'live' && <InidicatorIcon state={'live'} />}
        {getStatusIndicatorText()}
      </StatusBox>
    </MountingPoint>
  );
}

export default LiveStreamStatus;
