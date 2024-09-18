import { h, JSX } from 'preact';
import { BigPlayButtonLoadingAnim } from '../BigPlayButtonLoadingAnim.tsx';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

interface BigPlayButtonSVGProps {
  height: number;
  isLoading?: boolean;
  scale: number;
  width: number;
}

const ICON_WIDTH = 37;
const ICON_HEIGHT = 36;

const LOADING_ALPHA = 0.5;

export const BigPlayButtonSVG = ({
  width,
  height,
  scale,
  isLoading = false,
}: BigPlayButtonSVGProps): JSX.Element => {
  const scaledHeight = height * scale;
  const svgAttrs = standardSvgAttrs({
    width,
    height,
    styleOverride: { position: 'absolute', height: `${scaledHeight}px` },
    ariaHidden: true,
  }) as JSX.SVGAttributes<SVGSVGElement>;

  // Center the icon within the width and height of the button
  const iconXOffset = -(ICON_WIDTH / 2) + width / 2;
  const iconYOffset = -(ICON_HEIGHT / 2) + height / 2;

  return (
    <svg {...svgAttrs} alt="">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#FFFFFF"
        opacity={isLoading ? LOADING_ALPHA : 1}
        transform={`translate(${iconXOffset}, ${iconYOffset})`}
        d="M12.138 2.173C10.812 1.254 9 2.203 9 3.817v28.366c0 1.613 1.812 2.563 3.138 1.644l20.487-14.183a2 2 0 0 0 0-3.288L12.138 2.173Z"
      />
      {isLoading && <BigPlayButtonLoadingAnim />}
    </svg>
  );
};
