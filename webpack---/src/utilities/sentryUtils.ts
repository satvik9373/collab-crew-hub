import { isNil } from '@wistia/type-guards';
// @ts-expect-error-next-line trackingConsentApi is not yet converted to TS
import { isVisitorTrackingEnabled } from 'utilities/trackingConsentApi.js';

type ProductType = 'channel' | 'form' | 'player' | 'transcript';

const PLAYER_SAMPLE_RATE = 0.0001;
// TODO - Initially setting a low sample rate here as a precaution against blowing up Sentry with player errors
// Ideally we can increase this once we have confidence the player errors aren't coming through in the non-player
// error logging.
const NON_PLAYER_EMBED_SAMPLE_RATE = 0.25;

const IS_DEV_OR_TEST_ENV =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development';

const configureSentry = () => {
  if (window.Sentry && typeof window.Sentry.init === 'function') {
    window.Sentry.init({
      allowUrls: [/^https:\/\/fast.wistia.(?:com|net|io|st)\/.*$/], // Only allow exceptions that are captured from scripts that are served by Wistia
      dsn: 'https://a3591ba5e949a37083cc6f5a4191e903@o4505518331658240.ingest.us.sentry.io/4505794284290048',
      initialScope: {
        tags: {
          pillar: 'publish',
        },
      },
      defaultIntegrations: false,
      // We want different sample rates for errors from the player versus errors from forms, channels, and transcripts.
      // So we don't configure sampleRate here and instead have custom sampling logic in the reportError function.
    });
  }
};

export const initializeSentry = (): void => {
  if (!window.Sentry) {
    const sentryLoader = document.createElement('script');
    sentryLoader.onload = () => configureSentry();
    sentryLoader.src = 'https://js.sentry-cdn.com/a3591ba5e949a37083cc6f5a4191e903.min.js';
    sentryLoader.crossOrigin = 'anonymous';
    document.head.appendChild(sentryLoader);
  }
};

export const reportError = (product: ProductType, error: Error): void => {
  try {
    if (typeof window.Sentry?.withScope === 'function') {
      const sampleRate = product === 'player' ? PLAYER_SAMPLE_RATE : NON_PLAYER_EMBED_SAMPLE_RATE;
      let shouldSendToSentry = IS_DEV_OR_TEST_ENV;

      const cryptoObj = isNil(window.crypto) ? window.msCrypto : window.crypto;
      if (cryptoObj !== undefined) {
        const cryptoRandom = cryptoObj.getRandomValues(new Uint32Array(1));
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        shouldSendToSentry = cryptoRandom[0] / (0xffffffff + 1) < sampleRate;
      } else {
        const mathRandom = Math.random();
        shouldSendToSentry = mathRandom < sampleRate;
      }

      if (!shouldSendToSentry) {
        // If we shouldn't send to Sentry, just print to the console
        console.error(error); // eslint-disable-line no-console
        // trackingConsentApi is not yet converted to TS
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-call
      } else if (isVisitorTrackingEnabled()) {
        window.Sentry.withScope((scope) => {
          scope.setTag('product', product);
          window.Sentry?.captureException(error);
        });
      }
    }
  } catch (err) {
    // We don't want any problems with our error logging to break other things,
    // so we'll just print this to the console.
    console.error(err); // eslint-disable-line no-console
  }
};
