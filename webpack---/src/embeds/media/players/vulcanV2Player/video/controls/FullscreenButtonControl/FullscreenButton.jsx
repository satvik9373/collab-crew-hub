import { h, render, Component } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

class FullscreenButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const sharedLineAttrs = {
      fill: 'none',
      stroke: '#ffffff',
      'stroke-width': 2,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-miterlimit': 10,
    };
    return (
      <svg {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}>
        <g>
          <g>
            <polyline {...sharedLineAttrs} points="31.4,12.6 31.4,8.7 25.8,8.7" />
            <polyline {...sharedLineAttrs} points="14.7,8.7 9.1,8.7 9.1,12.6" />
            <polyline {...sharedLineAttrs} points="25.8,24.8 31.4,24.8 31.4,20.9" />
            <polyline {...sharedLineAttrs} points="9.1,20.9 9.1,24.8 14.7,24.8" />
          </g>
          <rect
            x="13.7"
            y="12.3"
            {...sharedLineAttrs}
            enable-background="new"
            width="13.3"
            height="8.9"
          />
        </g>
      </svg>
    );
  }
}

export default FullscreenButton;
