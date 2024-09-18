/* eslint-disable @typescript-eslint/no-magic-numbers */
import { h, FunctionComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { isMouseDown } from '../../../../../../../utilities/isMouseDown.js';
import { interFontFamily } from '../../../../../../../utilities/interFontFamily.js';
import { CustomEventsWrapper } from '../../../../../../shared/CustomEventsWrapper.jsx';

const iconStyle = `
  @keyframes VOLUME_SMALL_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes VOLUME_LARGE_WAVE_FLASH {
    0% { opacity: 0; }
    33% { opacity: 1; }
    66% { opacity: 1; }
    100% { opacity: 0; }
  }

  .volume__small-wave {
    animation: VOLUME_SMALL_WAVE_FLASH 2s infinite;
    opacity: 0;
  }

  .volume__large-wave {
    animation: VOLUME_LARGE_WAVE_FLASH 2s infinite .3s;
    opacity: 0;
  }
`;

const ICON_LENGTH = 35;
const POSITION_FROM_SIDE = 15;

interface Props {
  backdropEnabled: boolean;
  buttonText: string;
  buttonTextEnabled: boolean;
  elemRef: boolean;
  isLiveMedia: boolean;
  isTouchscreen: boolean;
  isVisible: boolean;
  onClick: () => void;
  scale: number;
  videoWidth: number;
}

export const ClickForSoundButton: FunctionComponent<Props> = ({
  backdropEnabled,
  buttonText,
  buttonTextEnabled,
  elemRef,
  isLiveMedia,
  isTouchscreen,
  isVisible,
  onClick,
  scale,
  videoWidth,
}) => {
  const videoWidthPx = `${videoWidth}px`;
  const scaledIconLength = ICON_LENGTH * scale;
  const topRight = POSITION_FROM_SIDE * scale - 2;
  const btnTextSpanRef = useRef<HTMLDivElement | null>(null);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState(false);
  const [isButtonTextVisible, setIsButtonTextVisible] = useState(isTouchscreen || isLiveMedia);

  const onFocus = () => {
    if (isMouseDown() as boolean) return;
    setIsKeyboardFocused(true);
  };

  const onBlur = () => setIsKeyboardFocused(false);

  const onMouseEnter = () => {
    setIsButtonTextVisible(true);
  };

  const onMouseLeave = () => {
    if (isTouchscreen || isLiveMedia) {
      return;
    }

    setIsButtonTextVisible(false);
  };

  return (
    <CustomEventsWrapper
      class="w-css-reset w-css-reset-tree"
      data-handle="click-for-sound-backdrop"
      elemRef={elemRef}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: isVisible ? 'block' : 'none',
        height: '100%',
        left: 0,
        pointerEvents: backdropEnabled ? 'auto' : 'none',
        position: 'absolute',
        top: 0,
        width: '100%',
      }}
    >
      <button
        aria-label={buttonText}
        onFocus={onFocus}
        onBlur={onBlur}
        class="w-vulcan-v2-button click-for-sound-btn"
        style={{
          background: 'rgba(0,0,0,0.8)',
          border: `2px solid ${isKeyboardFocused ? '#fff' : 'transparent'}`,
          borderRadius: '60px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          outline: 'none',
          pointerEvents: 'auto',
          position: 'absolute',
          right: `${topRight}px`,
          top: `${topRight}px`,
          maxWidth: `${videoWidth - topRight * 2}px`,
        }}
      >
        {buttonTextEnabled ? (
          <div
            ref={btnTextSpanRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              maxWidth: isButtonTextVisible ? videoWidthPx : 0,
              transition: 'max-width 200ms',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontFamily: interFontFamily as string,
                fontSize: videoWidth < 640 ? '15px' : '18px',
                fontWeight: 500,
                paddingLeft: '1em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: videoWidthPx,
              }}
            >
              {buttonText}
            </span>
          </div>
        ) : null}

        <svg viewBox="0 0 237 237" width={scaledIconLength} height={scaledIconLength}>
          <style>{iconStyle}</style>
          <path fill="#fff" d="M88 107H65v24h24l23 23V84z" />
          <g fill="none" stroke="#fff" stroke-linecap="round" stroke-width="10">
            <path d="M142 86c9 21 9 44 0 65" class="volume__small-wave" />
            <path d="M165 74c13 23 13 66 0 89" class="volume__large-wave" />
          </g>
        </svg>
      </button>
    </CustomEventsWrapper>
  );
};
