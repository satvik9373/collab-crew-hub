import { h, render } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

export const SearchIcon = ({ color }) => {
  return (
    <svg {...standardSvgAttrs({ width: 24, height: 24, ariaHidden: true })}>
      <g stroke="none" strokeWidth="1" fill={`${color}` || '#fff'} fillRule="evenodd">
        <path d="M3 10.5C3 6.364 6.364 3 10.5 3S18 6.364 18 10.5 14.636 18 10.5 18 3 14.636 3 10.5m20.562 10.941l-4.661-4.661C20.213 15.027 21 12.858 21 10.5 21 4.701 16.298 0 10.5 0 4.7 0 0 4.701 0 10.5 0 16.298 4.7 21 10.5 21c2.358 0 4.527-.787 6.28-2.098l4.661 4.66c.292.291.677.438 1.06.438.386 0 .77-.147 1.061-.438.584-.584.584-1.539 0-2.121" />
      </g>
    </svg>
  );
};
