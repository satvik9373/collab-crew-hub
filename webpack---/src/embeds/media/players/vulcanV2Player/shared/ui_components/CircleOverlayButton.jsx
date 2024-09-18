import { h, Component, render } from 'preact';
import { cachedDetect } from 'utilities/detect.js';
import { clone } from 'utilities/obj.js';
import { seqId } from 'utilities/seqid.js';

const detect = cachedDetect();

const FADE_UP_TIME = 600;

class CircleOverlayButton extends Component {
  state = {
    buttons: [{ key: seqId(), isFadingUp: false, isFirstRender: false }],
    isDisplayNone: true,
    isMouseDown: false,
    isOpaque: false,
  };

  buttonStyle(button) {
    const { bottom, left, right, scale, top } = this.props;
    const { isFadingUp, isFirstRender } = button;
    const { isDisplayNone, isMouseDown, isOpaque } = this.state;

    const circleHeight = 140 * scale;
    const circleWidth = 140 * scale;

    let rootTranslateY = -50;
    let rootScale = 0.8;

    if (isFadingUp) {
      rootTranslateY = -120;
    } else if (isFirstRender) {
      rootTranslateY = 20;
    }

    if (isFadingUp) {
      rootScale = 1;
    } else if (isFirstRender) {
      rootScale = 0.4;
    } else if (isMouseDown) {
      rootScale = 0.9;
    }

    return {
      background: 'rgba(0,0,0,.6)',
      border: 0,
      borderRadius: '50%',
      bottom,
      cursor: 'pointer',
      display: isDisplayNone ? 'none' : 'block',
      height: `${circleHeight}px`,
      left,
      margin: 0,
      padding: 0,
      pointerEvents: 'auto',
      position: 'absolute',
      opacity: isOpaque && !isFadingUp && !isFirstRender ? 1 : 0,
      outline: 'none',
      right,
      top,
      transform: `translate(-50%, ${rootTranslateY}%) scale(${rootScale})`,
      transition: `opacity ${isFadingUp ? FADE_UP_TIME : 200}ms, transform ${
        isMouseDown ? 200 : FADE_UP_TIME
      }ms`,
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      width: `${circleWidth}px`,
    };
  }

  componentDidMount() {
    this.handleVisibilityChange(this.props, this.state);
  }

  componentDidUpdate() {
    const { isVisible } = this.props;
    const { buttons } = this.state;
    if (isVisible && buttons[buttons.length - 1].isFirstRender) {
      const newButtons = clone(buttons);
      newButtons[newButtons.length - 1].isFirstRender = false;
      setTimeout(() => {
        this.setState({ buttons: newButtons });
      }, 10);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = nextProps;
    const { isVisible: wasVisible } = this.props;

    if (isVisible !== wasVisible) {
      this.handleVisibilityChange(nextProps, this.state);
    }
  }

  handleVisibilityChange(props, state) {
    const { isVisible } = props;
    const { isDisplayNone, isOpaque } = state;

    if (isVisible && isDisplayNone) {
      this.setState({ isDisplayNone: false });
      setTimeout(() => {
        this.setState({ isOpaque: true });
      }, 10);
    } else if (!isVisible && isOpaque) {
      this.setState({ isOpaque: false });
      setTimeout(() => {
        this.setState({ isDisplayNone: true });
      }, 100);
    }
  }

  onClick = (e) => {
    const { fadeUpOnClick } = this.props;

    // Modify the buttons array so that the one that was just active now has
    // isFadingUp: true. Then we add another one at the end of the array to be
    // the new "active" button.
    if (fadeUpOnClick) {
      const { buttons } = this.state;
      const newButtons = clone(buttons);
      const fadingButton = newButtons[newButtons.length - 1];
      fadingButton.isFadingUp = true;
      const fadingKey = fadingButton.key;
      newButtons.push({ key: seqId(), isFadingUp: false, isFirstRender: true });
      this.setState({ buttons: newButtons });

      setTimeout(() => {
        // Remove the button we were targeting from the array when it is done
        // animating. This will remove it from the DOM permanently.
        this.setState({
          buttons: this.state.buttons.filter((b) => b.key !== fadingKey),
        });
      }, FADE_UP_TIME + 100);
    }

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  onMouseDown = () => {
    this.setState({ isMouseDown: true });
  };

  onMouseUp = () => {
    this.setState({ isMouseDown: false });
  };

  onTouchEnd = () => {
    this.setState({ isMouseDown: false });
  };

  onTouchStart = () => {
    this.setState({ isMouseDown: true });
  };

  rootStyle() {
    return {
      height: '100%',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: '100%',
    };
  }

  render() {
    const { ariaLabel, children } = this.props;
    const { buttons } = this.state;
    return (
      <div class="w-css-reset w-css-reset-tree" style={this.rootStyle()}>
        {buttons.map((button, index) => {
          return (
            <button
              aria-label={ariaLabel}
              class="w-vulcan-v2-button"
              key={button.key}
              onClick={index === buttons.length - 1 && this.onClick}
              onMouseDown={!detect.touchScreen && this.onMouseDown}
              onMouseUp={!detect.touchScreen && this.onMouseUp}
              onTouchEnd={detect.touchScreen && this.onTouchEnd}
              onTouchStart={detect.touchScreen && this.onTouchStart}
              style={this.buttonStyle(button)}
            >
              {children}
            </button>
          );
        })}
      </div>
    );
  }
}

export default CircleOverlayButton;
