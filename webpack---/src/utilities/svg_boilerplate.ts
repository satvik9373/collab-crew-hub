import { CSSProperties, SVGAttributes } from 'preact/compat';

type Props = {
  ariaHidden?: boolean;
  fillColor?: string;
  height: number;
  styleOverride?: CSSProperties;
  width: number;
};
export const standardSvgAttrs = ({
  width = 40,
  height = 34,
  styleOverride = {},
  ariaHidden = false,
  fillColor = '#ffffff',
}: Props): Pick<
  SVGAttributes,
  'aria-hidden' | 'enable-background' | 'style' | 'viewBox' | 'x' | 'y'
> => {
  return {
    x: '0px',
    y: '0px',
    viewBox: `0 0 ${width} ${height}`,
    'enable-background': `new 0 0 ${width} ${height}`,
    'aria-hidden': `${!!ariaHidden}`,
    style: {
      fill: fillColor,
      height: '100%',
      left: 0,
      strokeWidth: 0,
      top: 0,
      width: '100%',
      ...styleOverride,
    },
  };
};
