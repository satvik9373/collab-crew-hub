import { h, render, Component } from 'preact';
import { Color } from 'utilities/color.js';
import { getLoadedSelfHostedGoogleFonts, loadSelfHostedGoogleFont } from 'utilities/fonts.ts';

class Captions extends Component {
  constructor(props) {
    super(props);

    const loadedFonts = getLoadedSelfHostedGoogleFonts();
    if (!loadedFonts.includes(props.captionsFontFamily)) {
      loadSelfHostedGoogleFont(props.captionsFontFamily);
    }
  }

  componentDidUpdate(prevProps) {
    const loadedFonts = getLoadedSelfHostedGoogleFonts();
    if (
      this.props.captionsFontFamily != prevProps.captionsFontFamily &&
      !loadedFonts.includes(this.props.captionsFontFamily)
    ) {
      loadSelfHostedGoogleFont(this.props.captionsFontFamily);
    }
  }

  render() {
    const textLines = this.props.text.map((line, index) => this.renderLine(line, index));

    return (
      <div
        class="w-captions w-css-reset w-css-reset-tree w-vulcan-v2-button"
        style={this.rootContainerStyle()}
      >
        <div style={this.groupStyle()}>{textLines}</div>
      </div>
    );
  }

  renderLine(line, index) {
    const opts = {
      isFirst: index === 0,
      isLast: index === this.props.text.length - 1,
    };

    const dir = this.props.rtl ? 'rtl' : 'ltr';

    return (
      <p class="w-captions-line" style={this.lineStyle()}>
        <div
          style={{ display: 'inline-block', transition: 'all 200ms ease', verticalAlign: 'bottom' }}
          class="w-css-reset"
        >
          <span
            dir={dir}
            style={this.spanStyle(opts)}
            dangerouslySetInnerHTML={{ __html: line }}
          ></span>
        </div>
      </p>
    );
  }

  rootContainerStyle() {
    const props = this.props;
    const gapSize = 18 * props.scale;
    const bottomOffset = props.controlsAreVisible ? 0 : -props.controlBarHeight;

    return {
      bottom: `${bottomOffset + gapSize}px`,
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      textAlign: 'center',
      width: '100%',
      transition: 'all 100ms ease',
    };
  }

  groupStyle() {
    return {
      display: 'inline-block',
      position: 'relative',
      margin: 'auto',
      maxWidth: '80%',
      outline: 'none',
      cursor: 'pointer',
    };
  }

  lineStyle() {
    return {
      lineHeight: '1em',
      margin: 0,
      padding: 0,
    };
  }

  spanStyle() {
    const { scale } = this.props;
    const backgroundColor = new Color(this.props.captionsBackgroundColor).alpha(0.7);
    const borderRadius = this.props.captionsBorderRadius;
    const textColor = new Color(this.props.captionsTextColor);
    const textSize = this.props.captionsTextSize;
    const fontFamily = this.props.captionsFontFamily;

    return {
      background: backgroundColor,
      borderRadius: `${borderRadius}px`,
      color: textColor,
      display: 'block',
      fontFamily,
      fontSize: `${textSize * scale}px`,
      lineHeight: '1em',
      overflow: 'hidden',
      padding: '.25em .6em',
      textOverflow: 'ellipsis',
      webkitFontSmoothing: 'antialiased',
      width: '100%',
      transition: 'all 200ms ease-in-out',
    };
  }
}

Captions.defaultProps = {
  captionsBorderRadius: 0,
  captionsBackgroundColor: '#000',
  captionsTextColor: '#fff',
  captionsTextSize: 18,
  captionsFontFamily: 'Inter',
};

export default Captions;
