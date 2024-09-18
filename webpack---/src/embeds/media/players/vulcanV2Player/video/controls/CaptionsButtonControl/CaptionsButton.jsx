import { h, render, Component } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

class CaptionsButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const sharedPathAttrs = {
      fill: 'none',
      stroke: '#ffffff',
      'stroke-linecap': 'round',
      'stroke-miterlimit': 10,
    };
    return (
      <svg {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}>
        <g>
          <path
            {...sharedPathAttrs}
            stroke-width="1.8"
            d="M18.4,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
          />
        </g>
        <g>
          <path
            {...sharedPathAttrs}
            stroke-width="1.8"
            d="M25.8,18.7c-0.5,0.7-1.1,1.2-2.1,1.2c-1.3,0-2.4-1.1-2.4-2.8c0-1.6,1-2.8,2.4-2.8c1,0,1.6,0.5,2,1.2"
          />
        </g>
        <g>
          <path
            {...sharedPathAttrs}
            stroke-width="2"
            d="M31,21.9c0,1.6-1.4,3-3,3H12c-1.6,0-3-1.4-3-3V12c0-1.6,1.4-3,3-3h16c1.6,0,3,1.4,3,3V21.9z"
          />
        </g>
      </svg>
    );
  }
}

export default CaptionsButton;
