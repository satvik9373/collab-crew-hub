import { h, render } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

export class EllipsisButton {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}>
        <circle cx="20" cy="17" r="2" />
        <circle cx="13" cy="17" r="2" />
        <circle cx="27" cy="17" r="2" />
      </svg>
    );
  }
}
