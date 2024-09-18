import { h, render, Component } from 'preact';
import { merge } from 'utilities/obj.js';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

export class SmallPlayButton extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.isPlaying !== nextProps.isPlaying) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div style={this.rootStyle()}>
        <div
          style={{
            display: this.props.isPlaying ? 'block' : 'none',
            height: '100%',
            width: '100%',
          }}
        >
          {this.renderPauseIcon()}
        </div>
        <div
          style={{
            display: this.props.isPlaying ? 'none' : 'block',
            height: '100%',
            width: '100%',
          }}
        >
          {this.renderPlayIcon()}
        </div>
      </div>
    );
  }

  renderPlayIcon() {
    const noPadding = this.props.noPadding;
    const xPad = noPadding ? 0 : 20;
    const yPad = noPadding ? 0 : 9;
    const width = 11.556;
    const height = 15;
    const points = `${xPad + width},${yPad + height / 2} ${xPad},${yPad + height} ${xPad},${yPad}`;
    return (
      <svg
        {...this.svgAttrs(width + xPad * 2, height + yPad * 2)}
        class="w-css-reset w-css-reset-tree"
      >
        <polygon points={points} />
      </svg>
    );
  }

  renderPauseIcon() {
    const noPadding = this.props.noPadding;
    const xPad = noPadding ? 0 : 20;
    const yPad = noPadding ? 0 : 11.3;
    const width = 10;
    const height = 12;
    return (
      <svg
        {...this.svgAttrs(width + xPad * 2, height + yPad * 2)}
        class="w-css-reset w-css-reset-tree"
      >
        <g>
          <rect x={xPad} y={yPad} width="3.5" height={height} />
          <rect x={xPad + 6.5} y={yPad} width="3.5" height={height} />
        </g>
      </svg>
    );
  }

  rootStyle() {
    return {
      height: '100%',
      width: '100%',
    };
  }

  svgAttrs() {
    const noPadding = this.props.noPadding;
    const isPlaying = this.props.isPlaying;
    const xPad = noPadding ? 0 : 20;
    const yPad = noPadding ? 0 : isPlaying ? 11.3 : 9;
    const height = isPlaying ? 12 : 16;
    const width = isPlaying ? 10 : 11.556;

    const result = standardSvgAttrs({
      width: width + xPad * 2,
      height: height + yPad * 2,
      ariaHidden: true,
    });
    merge(result.style, this.props.svgStyle);
    return result;
  }
}
