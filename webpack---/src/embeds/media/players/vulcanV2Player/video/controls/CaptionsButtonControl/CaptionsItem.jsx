import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { isMouseDown } from 'utilities/isMouseDown.js';
import { seqId } from 'utilities/seqid.js';
import { standardSvgAttrs } from 'utilities/svg_boilerplate.ts';
import VisuallyHiddenElem from '../../../shared/ui_components/VisuallyHiddenElem.jsx';

export class CaptionsItem extends Component {
  render() {
    const item = this.props.item;
    const itemId = seqId(`w-captions-${item.text}-`);

    return (
      <div
        style={this.menuItemStyle()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <VisuallyHiddenElem
          checked={Boolean(item.isSelected)}
          id={itemId}
          name="Captions Menu"
          onFocus={this.onFocus}
          onClick={this.onClick}
          onBlur={this.onBlur}
          tagName="input"
          type="radio"
          value={item.text}
        />

        <label
          class="w-css-reset"
          for={itemId}
          data-handle={`captions-menu-item-${this.props.index}`}
        >
          <svg
            {...standardSvgAttrs({
              width: 40,
              height: 34,
              styleOverride: this.checkStyle(),
              ariaHidden: true,
            })}
            class="w-checkmark"
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
          {item.text}
        </label>
      </div>
    );
  }

  checkStyle() {
    return {
      height: lineHeightPx(this),
      verticalAlign: 'middle',
      visibility: this.props.item.isSelected ? 'visible' : 'hidden',
      width: checkWidthPx(this),
    };
  }

  menuItemStyle() {
    return {
      background: this.state.isHovering ? 'rgba(0,0,0,.3)' : '',
      boxShadow: this.state.isKeyboardFocused ? '0 0 0 2px #fff inset' : 'none',
      borderBottomLeftRadius: this.props.isLastItem ? `${this.props.controlBarBorderRadius}px` : 0,
      borderBottomRightRadius: this.props.isLastItem ? `${this.props.controlBarBorderRadius}px` : 0,
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
    this.props.item.onClick();
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
