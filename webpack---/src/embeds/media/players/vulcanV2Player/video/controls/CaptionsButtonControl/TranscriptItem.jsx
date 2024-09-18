import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';
import { isMouseDown } from 'utilities/isMouseDown.js';
import { getTranslation, defineTranslations } from '../../../../../../shared/translations.js';
import { CustomEventsWrapper } from '../../../../../../shared/CustomEventsWrapper.jsx';

defineTranslations('en-US', {
  CAPTIONS_READ_TRANSCRIPT: 'Search Video',
});

export class TranscriptItem extends Component {
  render() {
    return (
      <CustomEventsWrapper
        class="w-css-reset-button-important w-vulcan-v2-button"
        tagName="button"
        onClick={this.props.toggleTranscript}
        onfocusin={this.onFocus}
        onfocusout={this.onBlur}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={this.menuItemStyle()}
      >
        <svg
          {...standardSvgAttrs({
            width: 40,
            height: 34,
            styleOverride: this.transcriptStyle(),
            ariaHidden: true,
          })}
          class="w-checkmark"
        >
          <g
            fill="none"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
          >
            <line x1="17" x2="27" y1="12" y2="12" />
            <line x1="17" x2="30" y1="17" y2="17" />
            <line x1="17" x2="25" y1="22" y2="22" />
          </g>
        </svg>
        {this.translate('READ_TRANSCRIPT')}
      </CustomEventsWrapper>
    );
  }

  transcriptStyle() {
    return {
      height: lineHeightPx(this),
      verticalAlign: 'middle',
      visibility: 'visible',
      width: checkWidthPx(this),
    };
  }

  menuItemStyle() {
    return {
      background: this.state.isHovering ? 'rgba(0,0,0,.3)' : '',
      boxShadow: this.state.isKeyboardFocused ? '0 0 0 2px #fff inset' : 'none',
      borderTopLeftRadius: `${this.props.controlBarBorderRadius}px`,
      borderTopRightRadius: `${this.props.controlBarBorderRadius}px`,
      cursor: 'pointer',
      display: 'block',
      fontFamily: interFontFamily,
      fontSize: fontSize(this),
      lineHeight: lineHeightPx(this),
      marginRight: `${10 * this.props.scale}px`,
      textAlign: 'left',
      width: '100%',
    };
  }

  translate(key) {
    return getTranslation(this.props.playerLanguage.code, `CAPTIONS_${key}`);
  }

  onFocus = () => {
    if (!isMouseDown()) {
      this.setState({ isKeyboardFocused: true });
    }
  };

  onBlur = () => {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
    }
  };

  onMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovering: false });
  };
}

const checkWidth = (component) => {
  return 40 * component.props.scale;
};

const checkWidthPx = (component) => {
  return `${checkWidth(component)}px`;
};

const fontSize = (component) => {
  return 14 * component.props.scale;
};

const lineHeightPx = (component) => {
  return `${lineHeight(component)}px`;
};

const lineHeight = (component) => {
  return 34 * component.props.scale;
};
