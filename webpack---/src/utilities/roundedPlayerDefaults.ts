import { EmbedOptions } from '../types/player-api-types.ts';

const BIG_PLAY_BUTTON_RADIUS_RATIO = 0.75;
const CONTROL_BAR_DISTANCE_RATIO = 0.75;

const FLOATING_CONTROL_BAR_RADIUS = 18;
const FLOATING_CONTROL_BAR_DISTANCE = 6;

/*

Rounded Player

These four methods determine the defaults for rounding the player.

- {roundedPlayer} - if it is the _only_ option, it is used as the base upon which all the other border radiuses are derived.
- {playerBorderRadius} - Determines the border radius of the thumbnail and outer parts of the player.
- {bigPlayButtonBorderRadius} - Border radius of the big play button.
- {controlBarBorderRadius} - Border radius of the control bar.
- {controlBarDistance} - Distance the control bar is from the edges of the player - also how far control bar dialogs are from the control bar.
- {floatingControlBar} - Boolean that can used to just create a floating control bar with border radius - no configuration.

*/

/**
 * Takes rounded player embed options and returns the calculated player border radius.
 * @param {EmbedOptions} embedOptions
 * @returns {number}
 */
export const getDefaultPlayerBorderRadius = ({
  playerBorderRadius,
  roundedPlayer,
}: EmbedOptions): number => {
  if (roundedPlayer !== undefined) {
    return roundedPlayer;
  }
  if (playerBorderRadius !== undefined) {
    return playerBorderRadius;
  }
  return 0;
};

/**
 * Takes rounded player embed options and returns the calculated big play button border radius.
 * @param {EmbedOptions} embedOptions
 * @returns {number}
 */
export const getDefaultBigPlayButtonBorderRadius = ({
  bigPlayButtonBorderRadius,
  roundedPlayer,
}: EmbedOptions): number => {
  if (bigPlayButtonBorderRadius !== undefined) {
    return bigPlayButtonBorderRadius;
  }
  if (roundedPlayer !== undefined) {
    return roundedPlayer * BIG_PLAY_BUTTON_RADIUS_RATIO;
  }

  return 0;
};

/**
 * Takes rounded player embed options and returns the calculated control bar border radius.
 * @param {EmbedOptions} embedOptions
 * @returns {number}
 */
export const getDefaultControlBarBorderRadius = ({
  controlBarBorderRadius,
  floatingControlBar,
  roundedPlayer,
}: EmbedOptions): number => {
  if (controlBarBorderRadius !== undefined) {
    return controlBarBorderRadius;
  }
  if (roundedPlayer !== undefined) {
    return roundedPlayer * CONTROL_BAR_DISTANCE_RATIO;
  }
  if (floatingControlBar === true) {
    return FLOATING_CONTROL_BAR_RADIUS;
  }

  return 0;
};

/**
 * Takes rounded player embed options and returns the calculated control bar distance.
 * @param {EmbedOptions} embedOptions
 * @returns {number}
 */
export const getDefaultControlBarDistance = ({
  controlBarBorderRadius,
  floatingControlBar,
  roundedPlayer,
}: EmbedOptions): number => {
  if (roundedPlayer !== undefined) {
    return roundedPlayer / 4;
  }
  if (controlBarBorderRadius !== undefined) {
    return controlBarBorderRadius / 2;
  }
  if (floatingControlBar === true) {
    return FLOATING_CONTROL_BAR_DISTANCE;
  }

  return 0;
};
