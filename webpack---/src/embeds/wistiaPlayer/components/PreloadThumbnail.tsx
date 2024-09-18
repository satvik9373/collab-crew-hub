import { Fragment, h, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { Language, Players } from '../../../types/player-api-types.ts';
import { usePlayerData } from '../hooks/usePlayerData.tsx';
import { CONTROL_BAR_HEIGHT, DEFAULT_ASPECT } from '../utilities/constants.ts';
import { BigPlayButton } from '../../media/players/vulcanV2Player/shared/ui_components/BigPlayButton.tsx';
import { ProgressiveThumbnail } from '../../shared/ProgressiveThumbnail.jsx';
import { getLanguage, getTranslation } from '../../shared/translations.js';
import { thumbnailAssets as getThumbnailAssets } from '../../../utilities/assets.js';
import { unescapeHtml } from '../../../utilities/core.js';
import { controlMultiplierEstimatedByWidth } from '../../../utilities/fit-control.js';
import {
  getDefaultBigPlayButtonBorderRadius,
  getDefaultControlBarDistance,
  getDefaultPlayerBorderRadius,
} from '../../../utilities/roundedPlayerDefaults.ts';

const MAX_SCALE = 1.3;
const MIN_SCALE = 0.3;
const DEFAULT_LOWER_CUTOFF_WIDTH = 640;
const DEFAULT_UPPER_CUTOFF_WIDTH = 960;

interface PreloadThumbnailProps {
  isPlayPending: boolean;
  mediaId: string;
  playerType: Players;
  playerWidth: number;
}

export const PreloadThumbnail = ({
  isPlayPending,
  mediaId,
  playerType,
  playerWidth,
}: PreloadThumbnailProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isPlayPending) {
      setIsLoading(true);
    }
  }, [isPlayPending]);

  const { embedOptions, mediaData } = usePlayerData();
  const {
    bigPlayButton,
    bpbTime,
    bigPlayButtonBorderRadius,
    controlBarBorderRadius,
    controlsVisibleOnLoad,
    floatingControlBar,
    newRoundedIcons,
    noMixBlendMode,
    playButton,
    playerBorderRadius,
    playerColor,
    playerLanguage,
    roundedPlayer,
    thumbnailAltText,
    transparentLetterbox,
  } = embedOptions;
  const { aspectRatio, assets, duration, mediaType, name } = mediaData;
  const height = playerWidth / (aspectRatio ?? DEFAULT_ASPECT);

  const playerLanguageCode =
    typeof playerLanguage === 'string' ? playerLanguage : playerLanguage?.code;
  const translate = (key) => getTranslation(playerLanguageCode, `PLAY_BUTTON_${key}`) as string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const unescapedVideoName = unescapeHtml(name) as string;
  const ariaLabel = `${translate('TITLE_WHEN_NOT_PLAYING')}: ${unescapedVideoName}`;

  const scale = Math.min(
    MAX_SCALE,
    Math.max(
      MIN_SCALE,
      controlMultiplierEstimatedByWidth(playerWidth, [
        DEFAULT_LOWER_CUTOFF_WIDTH,
        DEFAULT_UPPER_CUTOFF_WIDTH,
      ]),
    ),
  );

  const calculatedControlsVisibleOnLoad = controlsVisibleOnLoad && playerType === 'vulcan-v2';

  const defaultControlBarDistance = getDefaultControlBarDistance({
    controlBarBorderRadius,
    floatingControlBar,
    roundedPlayer,
  });
  const calculatedControlBarDistance = calculatedControlsVisibleOnLoad
    ? (CONTROL_BAR_HEIGHT / 2 + defaultControlBarDistance) * scale
    : defaultControlBarDistance * scale;

  const calculatedBigPlayButtonBorderRadius =
    getDefaultBigPlayButtonBorderRadius({
      bigPlayButtonBorderRadius,
      roundedPlayer,
    }) * scale;

  const calculatedPlayerBorderRadius =
    getDefaultPlayerBorderRadius({
      playerBorderRadius,
      roundedPlayer,
    }) * scale;

  const backgroundColor =
    transparentLetterbox === true || calculatedPlayerBorderRadius > 0 ? 'transparent' : undefined;

  const thumbnailAssets = getThumbnailAssets(assets, {});

  const calculatedPlayerLanguage =
    (getLanguage(playerLanguage) as Language | undefined) ?? (getLanguage('en-US') as Language);

  const shouldShowBigPlayButton = bigPlayButton !== false && playButton !== false;
  const shouldShowBpbTime = bpbTime === true || bpbTime === 'true';

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 0,
    boxShadow: 'none',
    cursor: 'pointer',
    outline: 'none',
    width: '100%',
    height: `${height}px`,
    padding: 0,
  };

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Fragment>
      <button
        class="w-css-reset w-vulcan-v2-button"
        style={buttonStyle}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        <ProgressiveThumbnail
          backgroundColor={backgroundColor}
          images={thumbnailAssets}
          isVisible={true}
          hashedId={mediaId}
          playerBorderRadius={calculatedPlayerBorderRadius}
          swatchEnabled={false}
          uiHasRendered={false}
          thumbnailAltText={thumbnailAltText ?? ''}
          height={`${height}px`}
        />
      </button>
      {shouldShowBigPlayButton && (
        <BigPlayButton
          borderRadius={calculatedBigPlayButtonBorderRadius}
          buttonTabIndex={0}
          color={playerColor}
          controlBarDistance={calculatedControlBarDistance}
          duration={duration ?? 0}
          hasNewRoundedIcons={newRoundedIcons} // TODO: Remove once rounded icons are fully released
          isLiveMedia={mediaType === 'LiveStream'}
          isLoading={isLoading}
          isVisible={true}
          noMixBlendMode={noMixBlendMode}
          onClick={handleClick}
          playerLanguage={calculatedPlayerLanguage}
          scale={scale}
          showBpbTime={shouldShowBpbTime}
          videoName={name ?? ''}
        ></BigPlayButton>
      )}
    </Fragment>
  );
};
