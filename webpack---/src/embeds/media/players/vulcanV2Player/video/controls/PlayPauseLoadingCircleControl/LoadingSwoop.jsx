import { h, render, Component } from 'preact';
import { addInlineCss } from 'utilities/elem.js';
import { seqId } from 'utilities/seqid.js';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

class LoadingSwoop extends Component {
  constructor(props) {
    super(props);
    this.svgId = seqId('w-loading-swoop-');
    this.gradientId = seqId('w-loading-swoop-grad-');
    this.animName = seqId('w-loading-swoop-');
  }

  componentDidMount() {
    addInlineCss(
      this.svgEl,
      `
@keyframes ${this.animName} {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

#${this.svgId} path {
  animation: ${this.animName} 1s cubic-bezier(0.495, 0.155, 0.580, 0.845) infinite;
  transform-origin: center;
}
    `,
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg
        {...standardSvgAttrs({ width: 120, height: 120, styleOverride: { position: 'absolute' } })}
        id={this.svgId}
      >
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id={this.gradientId}
          ref={(el) => {
            this.svgEl = el;
          }}
          x1="31.5"
          x2="31.5"
          y1="0"
          y2="120"
        >
          <stop offset="0" style={{ stopColor: '#FFFFFF' }} />
          <stop offset="0.7279" style={{ stopColor: '#FFFFFF', stopOpacity: 0 }} />
        </linearGradient>
        <path
          d="M60,0C26.9,0,0,26.9,0,60s26.9,60,60,60v-6C30.2,114,6,89.8,6,60S30.2,6,60,6c1.7,0,3-1.3,3-3S61.7,0,60,0z"
          style={{ fill: `url(#${this.gradientId})`, opacity: 0.8 }}
        />
      </svg>
    );
  }
}

export default LoadingSwoop;
