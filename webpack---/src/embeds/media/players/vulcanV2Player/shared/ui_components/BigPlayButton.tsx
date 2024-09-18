import { h, JSX, Ref } from 'preact';
import { useState } from 'preact/hooks';
import { OldBigPlayButtonSVG } from './svgs/OldBigPlayButtonSVG.tsx';
import { BigPlayButtonSVG } from './svgs/BigPlayButtonSVG.tsx';
import { getTranslation } from '../../../../../shared/translations.js';
import { Color } from '../../../../../../utilities/color.js';
import { unescapeHtml } from '../../../../../../utilities/core.js';
import { cachedDetect } from '../../../../../../utilities/detect.js';
import { flexibleDuration } from '../../../../../../utilities/duration.ts';
import { interNumbersSemiBold } from '../../../../../../utilities/interFontFamily.js';

const detect = cachedDetect() as { edge: boolean };

export const BASE_BUTTON_WIDTH = 125;
export const BASE_BUTTON_HEIGHT = 80;

const BASE_FONT_SIZE = 18;
const BASE_LINE_HEIGHT = 30;

const ALPHA_MIX_BLEND_MODE = 0.7;
const ALPHA_NO_MIX_BLEND_MODE = 0.85;

interface BigPlayButtonProps {
  baseHeight?: number;
  baseWidth?: number;
  borderRadius: number;
  buttonTabIndex: number;
  color?: string;
  controlBarDistance?: number;
  duration: number;
  elemRef?: Ref<HTMLDivElement>;
  hasNewRoundedIcons?: boolean;
  isLiveMedia: boolean;
  isLoading?: boolean;
  isVisible: boolean;
  leftNudgeFraction?: number;
  noMixBlendMode?: boolean;
  onClick?: () => void;
  playerLanguage: {
    code: string;
  };
  scale: number;
  showBpbTime: boolean;
  topNudgeFraction?: number;
  videoName: string;
}

export const BigPlayButton = ({
  baseHeight = BASE_BUTTON_HEIGHT,
  baseWidth = BASE_BUTTON_WIDTH,
  borderRadius,
  buttonTabIndex,
  color,
  controlBarDistance = 0,
  duration,
  elemRef,
  hasNewRoundedIcons = false, // TODO: Remove once rounded icons are fully released
  isLiveMedia,
  isLoading = false,
  isVisible,
  leftNudgeFraction = 0,
  noMixBlendMode = false,
  onClick,
  playerLanguage,
  scale,
  showBpbTime,
  topNudgeFraction = 0,
  videoName,
}: BigPlayButtonProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  const translate = (key) => getTranslation(playerLanguage.code, `PLAY_BUTTON_${key}`) as string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const unescapedVideoName = unescapeHtml(videoName) as string;
  const ariaLabel = `${translate('TITLE_WHEN_NOT_PLAYING')}: ${unescapedVideoName}`;

  const wrapperStyle = {
    borderRadius: `${borderRadius}px`,
    display: isVisible ? 'block' : 'none',
    left: `calc(50% + ${(leftNudgeFraction || 0) * 100}%)`,
    marginLeft: `-${scaledWidth / 2}px`,
    marginTop: `-${scaledHeight / 2}px`,
    overflow: 'hidden',
    position: 'absolute',
    top: `calc(50% + ${(topNudgeFraction || 0) * 100}% - ${controlBarDistance}px)`,
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    height: `${scaledHeight}px`,
    boxShadow: 'none',
    width: `${scaledWidth}px`,
  };

  const shouldMixBlendMode = !detect.edge && !noMixBlendMode;

  const blendColor = new Color(color ?? '#000').alpha(1) as Color;
  const blendStyle = {
    background: blendColor.toRgba(),
    display: shouldMixBlendMode ? 'block' : 'none',
    left: 0,
    height: `${scaledHeight}px`,
    mixBlendMode: 'darken',
    position: 'absolute',
    top: 0,
    width: `${scaledWidth}px`,
  };

  const overlayColor = new Color(color ?? '#000');
  const overlayAlphaValue = shouldMixBlendMode ? ALPHA_MIX_BLEND_MODE : ALPHA_NO_MIX_BLEND_MODE;
  overlayColor.alpha(overlayAlphaValue);

  if (isFocused) {
    overlayColor.lighten('15%');
  }

  const overlayStyle = {
    backgroundColor: overlayColor.toRgba(),
    height: `${scaledHeight}px`,
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'background-color 150ms',
    width: `${scaledWidth}px`,
  };

  const shouldDisplayDuration = showBpbTime && !isLiveMedia;
  const timeStyle = {
    background: 'rgba(0,0,0,.4)',
    color: '#fff',
    fontFamily: interNumbersSemiBold,
    fontSize: `${BASE_FONT_SIZE * scale}px`,
    lineHeight: `${BASE_LINE_HEIGHT * scale}px`,
    pointerEvents: 'none',
    textAlign: 'center',
  };

  const handleIsFocused = () => {
    setIsFocused(true);
  };

  const handleNotFocused = () => {
    setIsFocused(false);
  };

  return (
    <div class="w-bpb-wrapper w-css-reset w-css-reset-tree" ref={elemRef} style={wrapperStyle}>
      <button
        class="w-big-play-button w-css-reset-button-important w-vulcan-v2-button"
        style={buttonStyle}
        onMouseEnter={handleIsFocused}
        onMouseLeave={handleNotFocused}
        onFocusIn={handleIsFocused}
        onFocusOut={handleNotFocused}
        onClick={onClick}
        aria-label={ariaLabel}
        tabIndex={buttonTabIndex}
        type="button"
      >
        <div style={blendStyle} />
        <div style={overlayStyle} />
        {hasNewRoundedIcons ? (
          <BigPlayButtonSVG
            width={baseWidth}
            height={baseHeight}
            scale={scale}
            isLoading={isLoading}
          />
        ) : (
          <OldBigPlayButtonSVG
            width={baseWidth}
            height={baseHeight}
            scale={scale}
            isLoading={isLoading}
          />
        )}
      </button>
      {shouldDisplayDuration ? (
        <div class="w-bpb-time" style={timeStyle}>
          {flexibleDuration(duration)}
        </div>
      ) : null}
    </div>
  );
};
