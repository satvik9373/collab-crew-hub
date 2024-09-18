import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

export const RoundedFullscreenButton = (): JSX.Element => {
  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
    styleOverride: { fill: 'none' },
  }) as JSX.SVGAttributes<SVGSVGElement>;

  const stroke = {
    stroke: 'white',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as JSX.SVGAttributes<SVGSVGElement>;

  return (
    <svg {...svgAttrs}>
      <rect x="14" y="13" width="12" height="8" rx="1.5" stroke="white" stroke-width="2" />
      <g {...stroke}>
        <path d="M10 13V11C10 9.89543 10.8954 9 12 9H14" />
        <path d="M30 13V11C30 9.89543 29.1046 9 28 9H26" />
        <path d="M30 21L30 23C30 24.1046 29.1046 25 28 25L26 25" />
        <path d="M10 21L10 23C10 24.1046 10.8954 25 12 25L14 25" />
      </g>
    </svg>
  );
};
