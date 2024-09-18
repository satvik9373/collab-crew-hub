import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../../../../../../utilities/svg_boilerplate.ts';

export const RoundedAirplayButton = (): JSX.Element => {
  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
  }) as JSX.SVGAttributes<SVGSVGElement>;

  const fill = {
    fill: '#fff',
  } as JSX.SVGAttributes<SVGSVGElement>;

  return (
    <svg {...svgAttrs}>
      <g {...fill}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 10C10.3431 10 9 11.3431 9 13V21C9 22.6569 10.3431 24 12 24H14V22H12C11.4477 22 11 21.5523 11 21V13C11 12.4477 11.4477 12 12 12H28C28.5523 12 29 12.4477 29 13V21C29 21.5523 28.5523 22 28 22H26V24H28C29.6569 24 31 22.6569 31 21V13C31 11.3431 29.6569 10 28 10H12Z"
        />
        <path d="M23.1958 27H16.8042C16.0188 27 15.54 26.136 15.9562 25.47L19.152 20.3568C19.5437 19.7301 20.4563 19.7301 20.848 20.3568L24.0438 25.47C24.46 26.136 23.9812 27 23.1958 27Z" />
        <circle cx="14" cy="23" r="1" />
        <circle cx="26" cy="23" r="1" />
      </g>
    </svg>
  );
};
