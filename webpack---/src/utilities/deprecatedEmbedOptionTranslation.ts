/**
 * We updated some embed options when we moved to the web component embed. This function
 * translates the old legacy embed options to the new ones.
 * @param key
 * @param value
 * @returns
 */
export const translateEmbedOptionKeyValuePairForWebComponent = (
  key: string,
  value: boolean | number | string,
): [string, boolean | number | string] => {
  let translatedKey = key;
  let translatedValue = value;

  // Convert string booleans to actual booleans
  switch (value) {
    case 'true':
      translatedValue = true;
      break;
    case 'false':
      translatedValue = false;
      break;
    default:
      break;
  }

  // Convert legacy embed options to web component options
  switch (key) {
    case 'autoPlay':
      translatedKey = 'autoplay';
      break;
    case 'controlsVisibleOnLoad':
      translatedKey = 'hide-controls-on-load';
      translatedValue = !(translatedValue as boolean);
      break;
    case 'copyLinkAndThumbnailEnabled':
      translatedKey = 'hide-copy-link-and-thumbnail';
      translatedValue = !(translatedValue as boolean);
      break;
    case 'fullscreenButton':
      translatedKey = 'fullscreen-control';
      break;
    case 'playbar':
      translatedKey = 'play-bar-control';
      break;
    case 'playButton':
      translatedKey = 'big-play-button';
      break;
    case 'popover':
      translatedKey = 'wistia-popover';
      break;
    case 'popoverDisableAutoPlay':
      translatedKey = 'popover-disable-autoplay';
      break;
    case 'preload':
      if (typeof value === 'boolean' && value) {
        translatedValue = 'auto';
      }
      if (typeof value === 'boolean' && !value) {
        translatedValue = 'none';
      }
      break;
    case 'silentAutoPlay':
      translatedKey = 'silent-autoplay';
      break;
    case 'smallPlayButton':
      translatedKey = 'play-pause-control';
      break;
    case 'stillUrl':
      translatedKey = 'poster';
      break;
    case 'wmode':
      translatedKey = 'transparent-letterbox';
      if (value === 'transparent') {
        translatedValue = true;
      }
      break;
    default:
      // Assume all other keys when converted to kebab case are valid web component options
      // endVideoBehavior -> end-video-behavior
      translatedKey = key.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (letter: string, idx?: number) => {
        return (idx !== undefined ? '-' : '') + letter.toLowerCase();
      });
  }
  return [translatedKey, translatedValue];
};
