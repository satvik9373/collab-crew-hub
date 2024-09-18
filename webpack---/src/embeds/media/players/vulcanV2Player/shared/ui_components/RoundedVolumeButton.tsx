/* eslint-disable @typescript-eslint/no-magic-numbers */
import { h, JSX } from 'preact';
import { standardSvgAttrs } from '../../../../../../utilities/svg_boilerplate.ts';

const OPACITY_TRANSITION = 'opacity 100ms';

interface RoundedVolumeButtonProps {
  volume: number;
}

export const RoundedVolumeButton = ({ volume }: RoundedVolumeButtonProps): JSX.Element => {
  const svgAttrs = standardSvgAttrs({
    width: 40,
    height: 34,
    ariaHidden: true,
    styleOverride: { fill: 'none' },
  }) as JSX.SVGAttributes<SVGSVGElement>;

  const sharedAttrs = {
    stroke: '#fff',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as JSX.SVGAttributes<SVGSVGElement>;

  const waveCount = (vol = volume) => {
    if (vol > 0.66) {
      return 2;
    }
    if (vol > 0.33) {
      return 1;
    }
    if (vol > 0) {
      return 0;
    }
    return -1; // muted
  };

  const positioningOffset = () => {
    const wc = waveCount();
    if (wc === 0) {
      return 7;
    }
    if (wc < 2) {
      return 3;
    }

    return 1.25;
  };

  const speakerGroupStyle = () => {
    return {
      transform: `translateX(${positioningOffset()}px)`,
      transition: 'transform 100ms',
    };
  };

  const waveXStyle = () => {
    return {
      opacity: waveCount() < 0 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  };

  const wave1Style = () => {
    return {
      opacity: waveCount() >= 1 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  };

  const wave2Style = () => {
    return {
      opacity: waveCount() >= 2 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  };

  return (
    <svg {...svgAttrs}>
      <g style={speakerGroupStyle()}>
        <path
          d="M15.8 13.9995C15.3 14.4995 14.4 14.7995 13.8 14.7995H12.2C11.5 14.7995 11 15.2995 11 15.9995V17.5995C11 18.2995 11.5 18.7995 12.2 18.7995H13.8C14.5 18.7995 15.4 19.1995 15.8 19.5995L18.2 21.3999C18.5296 21.6472 19 21.412 19 20.9999V12.154C19 11.7163 18.4774 11.4899 18.1581 11.7892L15.8 13.9995Z"
          fill="white"
        />
        <g {...sharedAttrs}>
          <path
            d="M22 11.5C22 11.5 23.1 14 23.1 16.5C23.1 19 22 21.5 22 21.5"
            style={wave1Style()}
          />
          <path d="M26 9C26 9 27.7 12.8 27.7 16.5C27.7 20.2 26 24 26 24" style={wave2Style()} />

          <g style={waveXStyle()}>
            <path d="M22 14L27 19" />
            <path d="M27 14L22 19" />
          </g>
        </g>
      </g>
    </svg>
  );
};
