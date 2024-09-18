import { assign } from 'utilities/obj.js';
import { h, render, Component } from 'preact';
import { eV1Protocol, eV1Host } from 'utilities/hosts.js';
import { Thumbnail } from './Thumbnail.jsx';

export class ProgressiveThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      normalThumbOpacity: props.isVisible ? 1 : 0,
    };
    this.onDisplay = props.onDisplay;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.onDisplay && nextProps.onDisplay) {
      this.onDisplay = nextProps.onDisplay;
    }
  }

  render() {
    if (this.props.isVisible) {
      this._hasRenderedVisible = true;
    }

    const sharedProps = {
      backgroundColor: this.props.backgroundColor,
      fitStrategy: this.props.fitStrategy,
      isVisible: this.props.isVisible,
      stillSnap: this.props.stillSnap,
      stretchLimit: this.props.stretchLimit,
      videoHeight: this.props.videoHeight,
      videoWidth: this.props.videoWidth,
      thumbnailAltText: this.props.thumbnailAltText,
      playerBorderRadius: this.props.playerBorderRadius,
    };
    const swatchProps = assign({}, sharedProps, {
      ariaHidden: true,
      images: [
        {
          url: `${eV1Protocol()}//${eV1Host()}/embed/medias/${this.props.hashedId}/swatch`,
        },
      ],
    });
    const normalThumbProps = assign({}, sharedProps, {
      onDisplay: this.onDisplayNormalThumb,
      images: this.props.images,
    });
    return (
      <div ref={this.props.elemRef}>
        {this.props.swatchEnabled && this._hasRenderedVisible ? (
          <Thumbnail {...swatchProps} wrapperStyle={this.swatchWrapperStyle()} />
        ) : null}
        {this._hasRenderedVisible ? (
          <Thumbnail {...normalThumbProps} wrapperStyle={this.normalThumbWrapperStyle()} />
        ) : null}
      </div>
    );
  }

  componentDidMount() {
    setTimeout(this.afterTwoSeconds, 2000);
  }

  normalThumbWrapperStyle() {
    const transition =
      this.props.swatchEnabled && this.props.uiHasRendered && this.state.normalThumbOpacity === 1
        ? 'opacity 3s'
        : '';
    return {
      height: '100%',
      left: 0,
      opacity: this.state.normalThumbOpacity,
      position: this.props.fitStrategy === 'naturalHeight' ? 'relative' : 'absolute',
      top: 0,
      transition,
      width: '100%',
    };
  }

  swatchWrapperStyle() {
    return {
      filter: 'blur(5px)',
      height: '100%',
      left: 0,
      position: this.props.fitStrategy === 'naturalHeight' ? 'relative' : 'absolute',
      top: 0,
      width: '100%',
    };
  }

  afterTwoSeconds = () => {
    // If we've waited 2 seconds for the thumbnail to load but it still hasn't
    // finished, then we guessed wrong about what the initial opacity should
    // be. Set it back to 0 so we do a slow fade when it's done loading.
    if (!this._displayed && this.state.normalThumbOpacity === 1) {
      this.setState({ normalThumbOpacity: 0 });
    }
  };

  onDisplayNormalThumb = () => {
    this.setState({ normalThumbOpacity: 1 });

    this._displayed = true;
    if (this.onDisplay) {
      this.onDisplay();
    }
  };
}
