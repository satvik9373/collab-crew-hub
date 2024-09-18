import { elemWidth } from 'utilities/elem.js';
import { h, render, Component } from 'preact';
import { globalEventLoop } from 'utilities/event_loop.js';
import { seqId } from 'utilities/seqid.js';
import { RawHTMLStub } from '../../../../../shared/RawHTMLStub.jsx';

const STANDARD_BUTTON_WIDTH = 40;

const DIALOG_FADE_TIME = 120;
const CONTENT_FADE_TIME = 100;

class ControlBarDialogUI extends Component {
  constructor(props) {
    super(props);
    this.uuid = seqId();
    this.state = {
      isDisplayNone: true,
      isOpaque: false,
      widthInButtons: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.resizeRequestedAt !== nextProps.resizeRequestedAt) {
      this.setState({ widthInButtons: null });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isDisplayNone === true && this.state.isDisplayNone === false) {
      this.cancelMeasurementLoop();
      if (nextProps.onBeforeDisplayNone) {
        nextProps.onBeforeDisplayNone();
      }
    }

    if (nextState.isDisplayNone === false && this.state.isDisplayNone === true) {
      this.setupMeasurementLoop();
    }
  }

  render() {
    // Expected props:
    // left, top, canvasWidth, canvasHeight, isOpen
    return (
      <div
        class="w-anchor w-css-reset"
        style={this.anchorStyle()}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onTouchStart={this.onTouchStart}
      >
        <div class="w-dialog w-css-reset" style={this.dialogStyle()} ref={this.dialogRefFn}>
          <div class="w-css-reset" style={this.dialogContentWrapperStyle()}>
            <RawHTMLStub
              style={this.stubStyle()}
              stubRef={(e) => (this.stubElem = e)}
              handle={this.props.handle}
              class="w-css-reset"
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const mountResult = this.props.mount(this.stubElem);
    if (mountResult && mountResult.then && mountResult.catch) {
      this.mountPromise = mountResult;
    } else {
      this.mountPromise = Promise.resolve();
    }
    this.mountPromise.then(this.handleTransitionsAfterRender);
  }

  componentDidUpdate() {
    if (this.mountPromise) {
      this.mountPromise.then(this.handleTransitionsAfterRender);
    }
  }

  componentWillUnmount() {
    this.cancelMeasurementLoop();
  }

  dialogRefFn = (e) => {
    this.dialogElem = e;
    if (this.props.dialogRef) {
      this.props.dialogRef(e);
    }
  };

  handleTransitionsAfterRender = () => {
    const props = this.props;
    const state = this.state;

    if (props.isOpen) {
      if (state.isDisplayNone || (state.isOpaque && state.widthInButtons == null)) {
        this.setState({ isDisplayNone: false }, () => {
          this.measureUserElem();
          this.setState({ isOpaque: true });
        });
      }
    } else if (!state.isDisplayNone && state.isOpaque) {
      this.setState({ isOpaque: false }, () => {
        clearTimeout(this.displayNoneTimeout);
        this.displayNoneTimeout = setTimeout(() => {
          this.setState({ isDisplayNone: true });
        }, 200);
      });
    }
  };

  anchorStyle() {
    return {
      height: 0,
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    };
  }

  dialogContentWrapperStyle() {
    const { isOpaque } = this.state;
    const delay = isOpaque ? DIALOG_FADE_TIME * 0.4 : 0;
    return {
      opacity: isOpaque ? 1 : 0,
      transition: `opacity ${CONTENT_FADE_TIME}ms ease ${delay}ms`,
    };
  }

  dialogStyle() {
    const { canvasHeight, canvasWidth, scale, controlBarBorderRadius, controlBarDistance } =
      this.props;
    const { isDisplayNone, isOpaque, widthInButtons } = this.state;

    let left = 0;
    let snappedWidth = null;
    if (widthInButtons != null) {
      snappedWidth = widthInButtons * STANDARD_BUTTON_WIDTH * scale;

      const spillover = this.props.left + snappedWidth - canvasWidth;
      if (spillover > 0) {
        left = spillover * -1;
      }
    }

    const delay = isOpaque ? 0 : CONTENT_FADE_TIME * 0.4;

    return {
      background: 'rgba(0,0,0,0.7)',
      borderRadius: `${controlBarBorderRadius}px`,
      bottom: `${controlBarDistance}px`,
      color: '#fff',
      display: isDisplayNone ? 'none' : 'block',
      left,
      lineHeight: '34px',
      maxHeight: `${canvasHeight}px`,
      opacity: isOpaque ? 1 : 0,
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'absolute',
      transition: `opacity ${DIALOG_FADE_TIME}ms ease ${delay}ms, transform ${DIALOG_FADE_TIME}ms ease ${delay}ms`,
      transform: `scaleY(${isOpaque ? 1 : 0.6})`,
      transformOrigin: 'center bottom',
      width: snappedWidth != null ? `${snappedWidth}px` : null,
    };
  }

  stubStyle() {
    return {
      boxSizing: 'border-box',
      display: 'inline-block',
      height: '100%',
      verticalAlign: 'bottom',
      width: '100%',
    };
  }

  setupMeasurementLoop() {
    globalEventLoop.add(this.uuid, 500, this.measureUserElem);
  }

  cancelMeasurementLoop() {
    globalEventLoop.remove(this.uuid);
  }

  measureUserElem = () => {
    this.stubElem.style.width = '';
    const dialogWidth = elemWidth(this.stubElem);
    this.stubElem.style.width = '100%';
    const widthInButtons = Math.ceil(dialogWidth / (STANDARD_BUTTON_WIDTH * this.props.scale));
    if (widthInButtons !== this.state.widthInButtons && !isNaN(widthInButtons)) {
      this.setState({ widthInButtons });
    }
  };

  // this is used in the UI Behavior to prevent
  // swipes in dialogs from exiting in fullscreen
  onTouchStart = (event) => {
    event._touchStartFromControlDialog = true;
  };
}

export default ControlBarDialogUI;
