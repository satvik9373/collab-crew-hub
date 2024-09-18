import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { isMouseDown } from 'utilities/isMouseDown.js';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';
import { seqId } from 'utilities/seqid.js';
import { getTranslation, defineTranslations } from '../../../../../../shared/translations.js';
import VisuallyHiddenElem from '../../../shared/ui_components/VisuallyHiddenElem.jsx';

defineTranslations('en-US', {
  AUDIO_DESCRIPTION_OFF: 'Off',
});

export class AudioTrackMenuItem extends Component {
  constructor(props) {
    super(props);
    this.uuid = seqId();
  }

  checkStyle() {
    return {
      height: lineHeightPx(this),
      verticalAlign: 'middle',
      visibility: this.props.track.isSelected ? 'visible' : 'hidden',
      width: checkWidthPx(this),
    };
  }

  menuItemStyle() {
    const { controlBarBorderRadius } = this.props;

    return {
      background: this.state.isHovering ? 'rgba(0,0,0,.3)' : '',
      borderBottomLeftRadius: this.props.isLastItem ? `${controlBarBorderRadius}px` : 0,
      borderBottomRightRadius: this.props.isLastItem ? `${controlBarBorderRadius}px` : 0,
      borderTopLeftRadius: this.props.isFirstItem ? `${controlBarBorderRadius}px` : 0,
      borderTopRightRadius: this.props.isFirstItem ? `${controlBarBorderRadius}px` : 0,
      boxShadow: this.state.isKeyboardFocused ? '0 0 0 2px #fff inset' : 'none',
      display: 'block',
      fontFamily: interFontFamily,
      fontSize: fontSize(this),
      lineHeight: lineHeightPx(this),
      marginRight: `${10 * this.props.scale}px`,
      textAlign: 'left',
      width: '100%',
    };
  }

  onBlur = () => {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
    }
  };

  onClick = () => {
    this.props.onClick(this.props.id);
  };

  onFocus = () => {
    if (!isMouseDown()) {
      this.setState({ isKeyboardFocused: true });
    }
  };

  onMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  translate(key) {
    return getTranslation(this.props.playerLanguage.code, `AUDIO_DESCRIPTION_${key}`);
  }

  render() {
    const { track, elemRef } = this.props;
    let trackName = track.label;

    // 'Original' is what we label the video's default track in the hls manifest
    if (trackName === 'Original') {
      trackName = this.translate('OFF');
    }

    const menuItemId = `AD-${this.uuid}-${trackName}+${track.id}`;

    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={elemRef}
        style={this.menuItemStyle()}
      >
        <VisuallyHiddenElem
          checked={Boolean(track.isSelected)}
          id={menuItemId}
          name="Audio Description Menu"
          onBlur={this.onBlur}
          onClick={this.onClick}
          onFocus={this.onFocus}
          tagName="input"
          type="radio"
          value={trackName}
        />

        <label class="w-css-reset" for={menuItemId}>
          <svg
            {...standardSvgAttrs({ width: 40, height: 34 })}
            class="w-checkmark"
            style={this.checkStyle()}
          >
            <polyline
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              points="17,17 20,20 25,14 "
            />
          </svg>
          {trackName}
        </label>
      </div>
    );
  }
}

const checkWidth = (component) => {
  return 40 * component.props.scale;
};

const checkWidthPx = (component) => {
  return `${checkWidth(component)}px`;
};

const lineHeight = (component) => {
  return 34 * component.props.scale;
};

const lineHeightPx = (component) => {
  return `${lineHeight(component)}px`;
};

const fontSize = (component) => {
  return 14 * component.props.scale;
};
