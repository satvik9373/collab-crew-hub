import { h, render, Component } from 'preact';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';

const OPACITY_TRANSITION = 'opacity 100ms';

class VolumeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: props.volume,
    };
  }

  waveCount(v = this.props.volume) {
    if (v > 0.66) {
      return 2;
    }
    if (v > 0.33) {
      return 1;
    }
    if (v > 0) {
      return 0;
    }
    return -1; // muted
  }

  shouldComponentUpdate(nextProps) {
    const currentWaveCount = this.waveCount();
    const nextWaveCount = this.waveCount(nextProps.volume);

    if (currentWaveCount !== nextWaveCount) {
      return true;
    }
    return false;
  }

  render() {
    const sharedAttrs = {
      fill: 'none',
      stroke: '#ffffff',
      'stroke-line-cap': 'round',
      'stroke-miterlimit': '10',
    };
    return (
      <svg {...standardSvgAttrs({ width: 40, height: 34, ariaHidden: true })}>
        <g style={this.speakerGroupStyle()}>
          <g>
            <path d="M13.8,14.2c-0.5,0.5-1.4,0.8-2,0.8h-1.6C9.5,15,9,15.5,9,16.2v1.6c0,0.7,0.5,1.2,1.2,1.2h1.6c0.7,0,1.6,0.4,2,0.8l2.3,2.3c0.5,0.5,0.8,0.3,0.8-0.4v-9.6c0-0.7-0.4-0.8-0.8-0.4L13.8,14.2z" />
          </g>
          <g>
            <path
              {...sharedAttrs}
              stroke-width="2"
              d="M22,11.7c0,0,1.1,2.5,1.1,5s-1.1,5-1.1,5"
              style={this.wave1Style()}
            />
            <path
              {...sharedAttrs}
              stroke-width="2"
              d="M25.8,9.2c0,0,1.7,3.8,1.7,7.5c0,3.7-1.7,7.5-1.7,7.5"
              style={this.wave2Style()}
            />
          </g>
          <g style={this.waveXStyle()}>
            <line {...sharedAttrs} stroke-width="1.8102" x1="19.2" y1="15" x2="23.2" y2="19" />
            <line {...sharedAttrs} stroke-width="1.8102" x1="19.2" y1="19" x2="23.2" y2="15" />
          </g>
        </g>
      </svg>
    );
  }

  speakerGroupStyle() {
    return {
      transform: `translateX(${this.positioningOffset()}px)`,
      transition: 'transform 100ms',
    };
  }

  positioningOffset() {
    const waveCount = this.waveCount();
    if (waveCount == 0) {
      return 7;
    }
    if (waveCount < 2) {
      return 3;
    }

    return 1.25;
  }

  waveXStyle() {
    return {
      opacity: this.waveCount() < 0 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  }

  wave1Style() {
    return {
      opacity: this.waveCount() >= 1 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  }

  wave2Style() {
    return {
      opacity: this.waveCount() >= 2 ? 1 : 0,
      transition: OPACITY_TRANSITION,
    };
  }
}

export default VolumeButton;
