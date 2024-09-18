import { h, render, Component } from 'preact';
import { cachedDetect } from 'utilities/detect.js';
import TouchEvents from '../media/players/vulcanV2Player/TouchEvents.js';

const detect = cachedDetect();

export class CustomEventsWrapper extends Component {
  render() {
    const TagName = this.props.tagName || 'div';
    return (
      <TagName {...this.props} ref={this.props.elemRef}>
        {this.props.children}
      </TagName>
    );
  }

  componentDidMount() {
    this._savedBase = this.base;
    this.setupBindings();
  }

  componentDidUpdate() {
    // this.base may have changed with any render, so we need to reset our
    // bindings.
    if (this.base !== this._savedBase) {
      this._savedBase = this.base;
      this.destroyBindings();
      this.setupBindings();
    }
  }

  componentWillUnmount() {
    this.destroyBindings();
  }

  setupBindings() {
    this.unbinds = [];
    if (detect.touchScreen) {
      const touchEvents = (this.touchEvents = new TouchEvents(this.base));
      touchEvents.on('swipe', this.onSwipe);
      touchEvents.on('pinch', this.onPinch);
      touchEvents.on('longpress', this.onLongPress);
      touchEvents.on('touchmove', this.onCustomTouchMove);
    }
  }

  destroyBindings() {
    if (this.touchEvents) {
      this.touchEvents.destroy();
      this.touchEvents = null;
    }
    if (this.unbinds) {
      this.unbinds.map((unbind) => unbind());
      this.unbinds = null;
    }
  }

  onSwipe = (e, ctx) => {
    const onSwipe = this.props.onSwipe;
    if (onSwipe) {
      onSwipe(e, ctx);
    }
  };

  onPinch = (e, ctx) => {
    const onPinch = this.props.onPinch;
    if (onPinch) {
      onPinch(e, ctx);
    }
  };

  onLongPress = (e, ctx) => {
    const onLongPress = this.props.onLongPress;
    if (onLongPress) {
      onLongPress(e, ctx);
    }
  };

  onCustomTouchMove = (e, ctx) => {
    const onTouchMove = this.props.onCustomTouchMove;
    if (onTouchMove) {
      onTouchMove(e, ctx);
    }
  };
}
