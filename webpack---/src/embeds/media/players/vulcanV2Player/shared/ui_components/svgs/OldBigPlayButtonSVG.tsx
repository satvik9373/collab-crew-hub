import { h, JSX } from 'preact';
import { BigPlayButtonLoadingAnim } from '../BigPlayButtonLoadingAnim.tsx';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

interface BigPlayButtonSVGProps {
  height: number;
  isLoading?: boolean;
  scale: number;
  width: number;
}

const LOADING_ALPHA = 0.5;

// TODO: This file can be deleted once rounded icons are fully released
export const OldBigPlayButtonSVG = ({
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

  return (
    <svg {...svgAttrs} alt="">
      <rect fill-rule="evenodd" clip-rule="evenodd" fill="none" width={width} height={height} />
      <polygon
        fill-rule="evenodd"
        clip-rule="evenodd"
        fill="#FFFFFF"
        opacity={isLoading ? LOADING_ALPHA : 1}
        points="53,22 53,58 79,40"
      />
      {isLoading && <BigPlayButtonLoadingAnim />}
    </svg>
  );
};
