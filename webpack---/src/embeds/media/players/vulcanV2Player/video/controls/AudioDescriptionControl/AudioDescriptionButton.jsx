import { h, render, Component } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

class AudioDescriptionButton extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const lines = {
      fill: 'none',
      stroke: '#ffffff',
      'stroke-width': '1.8',
      'stroke-linecap': 'round',
    };

    const linesAndText = {
      ...lines,
      'stroke-linejoin': 'round',
    };

    return (
      <svg
        {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}
        onMouseEnter={this.props.onMouseEnter}
      >
        <g {...linesAndText}>
          <path d="M19.6,14.5c2.2,0,3,1.4,3,2.8c0,1.3-0.7,2.8-3,2.8h-1.5v-5.6H19.6z" />
          <polyline points="9.9,20.1 12.5,14.5 14.9,20.1" />
          <path d="M10.4,18.9h4" />
        </g>

        <g {...lines}>
          <path d="M27.4,24.7c2.2-2.1,3.2-4.9,3.2-7.4c0-2.7-1-5.3-3.2-7.4" />
          <path d="M24.5,12.8c1.4,1.2,2,2.8,2,4.5c0,1.6-0.5,3.3-2,4.5" />
        </g>
      </svg>
    );
  }
}

export default AudioDescriptionButton;
