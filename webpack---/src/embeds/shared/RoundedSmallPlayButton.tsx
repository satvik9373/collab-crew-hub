import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../utilities/svg_boilerplate.ts';

interface RoundedSmallPlayButtonProps {
  isPlaying: boolean;
  marginLeft?: number | string;
  svgStyle?: {
    transform?: string;
    verticalAlign?: string;
  };
}

export const RoundedSmallPlayButton = ({
  isPlaying,
  svgStyle = {},
  marginLeft = 0,
}: RoundedSmallPlayButtonProps): JSX.Element => {
  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
    styleOverride: svgStyle,
  }) as JSX.SVGAttributes<SVGSVGElement>;

  return (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    <div style={{ width: '100%', height: '100%', marginLeft: marginLeft ?? 0 }}>
      <svg {...svgAttrs}>
        {isPlaying ? (
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5 11C15.6716 11 15 11.6716 15 12.5V22.5C15 23.3284 15.6716 24 16.5 24H17.5C18.3284 24 19 23.3284 19 22.5V12.5C19 11.6716 18.3284 11 17.5 11H16.5ZM23.5 11C22.6716 11 22 11.6716 22 12.5V22.5C22 23.3284 22.6716 24 23.5 24H24.5C25.3284 24 26 23.3284 26 22.5V12.5C26 11.6716 25.3284 11 24.5 11H23.5Z"
            fill="white"
          />
        ) : (
          <path
            d="M24.888 16.1913C25.4371 16.5906 25.4371 17.4094 24.888 17.8087L16.5882 23.845C15.9272 24.3257 15 23.8535 15 23.0362V10.9638C15 10.1465 15.9272 9.67433 16.5882 10.155L24.888 16.1913Z"
            fill="white"
          />
        )}
      </svg>
    </div>
  );
};
