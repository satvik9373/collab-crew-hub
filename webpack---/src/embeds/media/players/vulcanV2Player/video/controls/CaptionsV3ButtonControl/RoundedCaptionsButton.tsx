import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

interface RoundedCaptionsButtonProps {
  color: string;
  filled: boolean;
}

export const RoundedCaptionsButton = ({
  filled,
  color,
}: RoundedCaptionsButtonProps): JSX.Element => {
  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
    styleOverride: { fill: 'none' },
  }) as JSX.SVGAttributes<SVGSVGElement>;

  const background = {
    fill: filled ? '#fff' : 'none',
    stroke: '#ffffff',
  } as JSX.SVGAttributes<SVGPathElement>;

  const captionsCharacters = {
    fill: 'none',
    stroke: filled ? `#${color}` : '#fff',
  } as JSX.SVGAttributes<SVGPathElement>;

  return (
    <svg {...svgAttrs}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M31 21.9811C31 23.5912 29.6 25 28 25H12C10.4 25 9 23.5912 9 21.9811V12.0189C9 10.4088 10.4 9 12 9H28C29.6 9 31 10.4088 31 12.0189V21.9811Z"
        stroke-width="2"
        stroke-linecap="round"
        {...background}
      />
      <path
        d="M18.4 18.7C17.9 19.4 17.3 19.9 16.3 19.9C15 19.9 13.9 18.8 13.9 17.1C13.9 15.5 14.9 14.3 16.3 14.3C17.3 14.3 17.9 14.8 18.3 15.5"
        stroke-width="1.8"
        stroke-linecap="round"
        {...captionsCharacters}
      />
      <path
        d="M25.8 18.7C25.3 19.4 24.7 19.9 23.7 19.9C22.4 19.9 21.3 18.8 21.3 17.1C21.3 15.5 22.3 14.3 23.7 14.3C24.7 14.3 25.3 14.8 25.7 15.5"
        stroke-width="1.8"
        stroke-linecap="round"
        {...captionsCharacters}
      />
    </svg>
  );
};
