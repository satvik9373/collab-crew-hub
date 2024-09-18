import { h, render, Component } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

class AirplayButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}>
        <g stroke="#fff" fill="none">
          <polyline
            stroke="#fff"
            stroke-width="2"
            points="14.52 23 9 23 9 10 32 10 32 23 26.48 23"
          ></polyline>
          <polygon fill="#fff" points="20.5 20 25.5 26 15.5 26"></polygon>
        </g>
      </svg>
    );
  }
}

export default AirplayButton;
