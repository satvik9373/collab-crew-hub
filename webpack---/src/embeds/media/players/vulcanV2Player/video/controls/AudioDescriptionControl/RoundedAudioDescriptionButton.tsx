import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

interface RoundedAudioDescriptionButtonProps {
  onMouseEnter: () => void;
}

export const RoundedAudioDescriptionButton = ({
  onMouseEnter,
}: RoundedAudioDescriptionButtonProps): JSX.Element => {
  const stroke = {
    stroke: '#ffffff',
    'stroke-width': '1.8',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as JSX.SVGAttributes<SVGSVGElement>;

  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
    styleOverride: { fill: 'none' },
  }) as JSX.SVGAttributes<SVGSVGElement>;

  return (
    <svg {...svgAttrs} onMouseEnter={onMouseEnter}>
      <g {...stroke}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19.7 14.6C21.9 14.6 22.7 16 22.7 17.4C22.7 18.7 22 20.2 19.7 20.2H18.2V14.6H19.7Z"
        />
        <path d="M10 20.2L12.6 14.6L15 20.2" />
        <path d="M10.5 19H14.5" />
        <path d="M27.5 24.8C29.7 22.7 30.7 19.9 30.7 17.4C30.7 14.7 29.7 12.1 27.5 10" />
        <path d="M24.6 12.9C26 14.1 26.6 15.7 26.6 17.4C26.6 19 26.1 20.7 24.6 21.9" />
      </g>
    </svg>
  );
};
