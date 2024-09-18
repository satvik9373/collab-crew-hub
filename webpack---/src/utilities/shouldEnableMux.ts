import { PublicApi } from '../types/player-api-types.ts';

export const MUX_PERCENTAGE_TO_ENABLE = 0.1;

/**
 * Determines if Mux should be enabled for an embed based on various conditions.
 * @param {PublicApi} video The embed mux should be enabled for.
 * @param {boolean} didWinCoinFlip Whether or not the embed won the coin flip which determines if Mux should be enabled.
 * @returns {boolean} True if Mux should be enabled, false otherwise.
 */
export const shouldEnableMux = (video: PublicApi, didWinCoinFlip: boolean): boolean => {
  const isMuxEnabledOnWindow = window.wistiaDisableMux !== true;
  const isMuxEnabledFromOpts = !video._opts || video._opts.mux !== false;
  const isMuxEnabledFromStandardEmbed = !video.iframe;
  const isMuxEnabledFromCoinFlip = didWinCoinFlip;
  const isMuxEnabledFromLiveStream = !!(video._mediaData && video._mediaData.type === 'LiveStream');

  // Mux should be enabled if all of the following are true:
  // 1. Mux is not disabled on the window
  // 2. Mux is not disabled from the embed options
  // 3. Mux is not disabled from the video being an iframe embed
  // 4. Mux is not disabled from the coin flip OR the video is a live stream
  // (Live streams should always have Mux enabled, regardless of the coin flip result)
  return (
    isMuxEnabledOnWindow &&
    isMuxEnabledFromOpts &&
    isMuxEnabledFromStandardEmbed &&
    (isMuxEnabledFromCoinFlip || isMuxEnabledFromLiveStream)
  );
};
