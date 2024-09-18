import { Color } from 'utilities/color.js';
import { h, render, Component } from 'preact';
import { cachedDetect } from 'utilities/detect.js';
import { isMouseDownRecently } from 'utilities/isMouseDown.js';
import { assign } from 'utilities/obj.js';
import { RawHTMLStub } from '../../../../../shared/RawHTMLStub.jsx';
import { CustomEventsWrapper } from '../../../../../shared/CustomEventsWrapper.jsx';

const detect = cachedDetect();

class ControlBarButton extends Component {
  constructor(props) {
    super(props);
    this.interval = undefined;
    this.state = {
      isKeyboardFocused: false,
      isHovering: false,
      justClicked: false,
      opacity: 1,
    };
  }

  render() {
    const props = this.props;
    const buttonLabel = props.buttonLabel;

    const buttonAttrs = {
      class: 'w-vulcan-v2-button w-css-reset w-css-reset-tree w-css-reset-button-important',
      style: this.buttonStyle(),
      'aria-label': buttonLabel,
      title: buttonLabel,
      onClick: () => {
        if (!props.disabled) {
          props.onClick();
        }
      },
      onKeyDown: (e) => {
        props.onKeyDownButton(e);
      },
      onMouseDown: !detect.touchScreen && !props.disabled && this.onMouseDown,
      onMouseUp: !detect.touchScreen && !props.disabled && this.onMouseUp,
      onTouchStart: detect.touchScreen && this.onMouseDown,
      onTouchEnd: detect.touchScreen && this.onMouseUp,
      elemRef: (e) => {
        this.buttonElem = e;
        if (props.buttonRef) {
          props.buttonRef(e);
        }
      },
      tabIndex: props.tabIndex,
      ...props.linkAttrs,
    };

    // control's that have dialogs need to have aria-expanded attributes
    // undefined here means the control doesn't have a dialog at all
    if (props.isDialogOpen !== undefined) {
      buttonAttrs['aria-expanded'] = `${props.isDialogOpen}`;
    }

    if (!detect.touchScreen) {
      buttonAttrs.onFocus = this.onFocus;
      buttonAttrs.onBlur = this.onBlur;
      buttonAttrs.onMouseEnter = this.onMouseEnter;
      buttonAttrs.onMouseLeave = this.onMouseLeave;
    }

    if (props.disabled) {
      buttonAttrs['aria-disabled'] = true;
    }

    const tagName = props.isActuallyLink ? 'a' : 'button';

    return (
      <CustomEventsWrapper tagName={tagName} {...buttonAttrs}>
        <RawHTMLStub
          class="w-vulcan-icon-wrapper"
          style={this.stubStyle()}
          stubRef={(e) => (this.stubRoot = e)}
          handle={`${this.props.handle}_icon_wrapper`}
        />
      </CustomEventsWrapper>
    );
  }

  componentDidMount() {
    if (this.props.mount) {
      this.props.mount(this.stubRoot, this.anchorRoot, this.buttonElem);
    }

    if (this.props.stubRef) {
      this.props.stubRef(this.stubRoot);
    }
  }

  createLoadingInterval() {
    this.interval = setInterval(() => {
      const nextOpacity = this.state.opacity === 0.2 ? 0.8 : 0.2;

      this.setState({ opacity: nextOpacity });
    }, 400);
  }

  clearLoadingInterval() {
    clearInterval(this.interval);
    this.setState({ opacity: 1 });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoading === false && nextProps.isLoading === true) {
      this.createLoadingInterval();
    } else if (this.props.isLoading === true && nextProps.isLoading === false) {
      this.clearLoadingInterval();
    }
  }

  componentDidUpdate() {
    // The stub won't be updated by rendering, so we need to manually update
    // it.
    assign(this.stubRoot.style, this.stubStyle());

    if (this.props.stubRef) {
      this.props.stubRef(this.stubRoot);
    }
  }

  rootStyle() {
    return {
      height: '100%',
      position: 'relative',
      width: '100%',
    };
  }

  buttonStyle() {
    const { isHovering, isKeyboardFocused } = this.state;
    const { controlBarBorderRadius, extraPaddingWhenRounded, isActuallyLink } = this.props;
    const bgColor = new Color('#000');

    const alphaVal = isHovering && !this.props.disabled ? 0.2 : 0;
    bgColor.alpha(alphaVal);

    const rightMostExtraPaddingWhenRounded = this.props.isRightMostControl
      ? extraPaddingWhenRounded
      : 0;

    const linkOverrideStyles = isActuallyLink ? { display: 'block', outline: 'none' } : {};

    return {
      backgroundColor: bgColor.toRgba(),
      borderBottomLeftRadius: this.props.isLeftMostControl ? `${controlBarBorderRadius}px` : 0,
      borderBottomRightRadius: this.props.isRightMostControl ? `${controlBarBorderRadius}px` : 0,
      borderTopLeftRadius: this.props.isLeftMostControl ? `${controlBarBorderRadius}px` : 0,
      borderTopRightRadius: this.props.isRightMostControl ? `${controlBarBorderRadius}px` : 0,
      boxShadow: isKeyboardFocused ? '0 0 0 2px #fff inset' : 'none',
      cursor: this.props.disabled ? 'not-allowed' : 'pointer',
      height: '100%',
      position: 'relative',
      transition: 'background-color 150ms',
      width: `calc(100% + ${rightMostExtraPaddingWhenRounded}px)`,
      paddingRight: `${rightMostExtraPaddingWhenRounded}px`,
      ...linkOverrideStyles,
    };
  }

  stubStyle() {
    const { justClicked } = this.state;
    return {
      boxSizing: 'border-box',
      height: '100%',
      position: 'relative',
      opacity: this.props.disabled ? 0.5 : 1,
      transform: `scale(${justClicked ? 1.2 : 1.001})`,
      transition: 'transform 200ms',
    };
  }

  onFocus = (e) => {
    this.setState({ isKeyboardFocused: !isMouseDownRecently() });
    if (!isMouseDownRecently() && this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(e);
    }
  };

  onBlur = (e) => {
    this.setState({ isKeyboardFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  onMouseDown = () => {
    this.setState({ justClicked: true });
  };

  onMouseUp = () => {
    this.setState({ justClicked: false });
  };

  onMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  onMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  getOpacity() {
    if (!this.props.controlsAreVisible) {
      return 0;
    }
    if (this.state.opacity != null) {
      return this.state.opacity;
    }
    return 1;
  }
}

export default ControlBarButton;
