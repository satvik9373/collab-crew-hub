import { Color } from 'utilities/color.js';
import { h, render, Component } from 'preact';
import { cachedDetect } from 'utilities/detect.js';
import { assign } from 'utilities/obj.js';
import { addInlineCss, elemHasClass, elemAncestorHasClass } from 'utilities/elem.js';
import { isMouseDownRecently } from 'utilities/isMouseDown.js';
import { CustomEventsWrapper } from '../../../shared/CustomEventsWrapper.jsx';
import { RawHTMLStub } from '../../../shared/RawHTMLStub.jsx';

const detect = cachedDetect();

/*
 * This component renders the "skeleton" where all the video's controls are
 * rendered. Controls are organized by "type", so we render each type in its
 * own area of the layout. This should be clear from the render() method.
 */
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areControlsOpaque: props.shouldShowControls,

      // If you click a focusable element (say, a button or link) with the
      // mouse, it technically gets focus. We don’t want those to show our
      // accessibility targeted focus styles (white outlines basically). So
      // isKeyboardFocused represents focus that comes from tabbing, or just
      // programmatic use of element.focus(). Technically this might not be
      // perfect (e.g. if you’re changing focus while dragging or something),
      // but I’m having trouble imagining a legit scenario where it matters.
      isKeyboardFocused: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.handleControlBarAnimation(nextProps);
  }

  render() {
    this.mountRefs = {};
    return (
      <CustomEventsWrapper
        class="w-vulcan-v2 w-css-reset"
        elemRef={this.props.layoutRef}
        id={this.props.domId}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onDblClick={this.props.onDblClick}
        onFocus={this.onFocus}
        onfocusin={this.props.onfocusin}
        onfocusout={this.props.onfocusout}
        onKeyDown={this.props.onKeyDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseMove={this.props.onMouseMove}
        onPinch={this.props.onPinch}
        onSwipe={this.props.onSwipe}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={this.props.onTouchMove}
        onTouchStart={this.props.onTouchStart}
        style={this.wrapperStyle()}
      >
        <div
          class="w-vulcan--background w-css-reset"
          style={this.backgroundStyle()}
          ref={this.props.backgroundRef}
        >
          {this.renderControlCells('background')}
        </div>
        <div
          aria-live="polite"
          class="w-vulcan--aria-live w-css-reset"
          aria-atomic="true"
          style={{ position: 'absolute', left: '-99999em' }}
        >
          {this.props.ariaLiveText}
        </div>
        <div class="w-vulcan-overlays-table w-css-reset" style={this.layoutTableStyle()}>
          <div class="w-vulcan-overlays--left w-css-reset" style={this.tdLeftStyle()}>
            <div style={this.tdLayoutInnerStyle()} class="w-css-reset">
              {this.renderControlCells('left-flyout', { height: '100%', pointerEvents: 'auto' })}
            </div>
          </div>
          <div class="w-vulcan-overlays--center w-css-reset" style={this.tdCenterStyle()}>
            <div style={this.tdLayoutInnerStyle()} class="w-css-reset">
              {this.renderControlCells('above-control-bar', { pointerEvents: 'auto' })}
            </div>
          </div>
          <div class="w-vulcan-overlays--right w-css-reset" style={this.tdRightStyle()}>
            <div style={this.tdLayoutInnerStyle()} class="w-css-reset">
              {this.renderControlCells('right-flyout', { height: '100%', pointerEvents: 'auto' })}
            </div>
          </div>
        </div>
        <div
          class="w-bottom-bar w-css-reset"
          style={this.bottomBarStyle()}
          ref={(e) => (this.bottomBar = e)}
        >
          <div class="w-bottom-bar-lower w-css-reset" style={this.bottomBarLowerStyle()}>
            <div style={this.leftBgStyle()}>
              <div style={this.blendStyle()} />
              <div style={this.bgOverlayStyle()} />
            </div>
            <div style={this.rightBgStyle()}>
              <div style={this.blendStyle()} />
              <div style={this.bgOverlayStyle()} />
            </div>
            <div class="w-bottom-bar-left w-css-reset" style={this.bottomBarLeftStyle()}>
              <div
                class="w-bottom-bar-left-inner w-css-reset"
                style={this.bottomBarLeftInnerStyle()}
              >
                {this.renderControlCells('control-bar-left', {
                  display: 'inline-block',
                  verticalAlign: 'top',
                })}
              </div>
            </div>
            <div class="w-bottom-bar-middle w-css-reset" style={this.bottomBarMiddleStyle()}>
              <div
                class="w-bottom-bar-middle-inner w-css-reset"
                style={this.bottomBarMiddleInnerStyle()}
              >
                {this.renderControlCells('playbar', this.playbarStyle())}
              </div>
            </div>
            <div class="w-bottom-bar-right w-css-reset" style={this.bottomBarRightStyle()}>
              <div
                class="w-bottom-bar-right-inner-anchor w-css-reset"
                style={this.bottomBarRightInnerAnchorStyle()}
              >
                <div
                  class="w-bottom-bar-right-inner w-css-reset"
                  style={this.bottomBarRightInnerStyle()}
                >
                  {this.renderControlCells('control-bar-right', {
                    display: 'inline-block',
                    verticalAlign: 'top',
                  })}
                </div>
              </div>
              <div class="w-wistia-logo w-css-reset" style={this.wistiaLogoStyle()}>
                {this.renderControlCells('wistia-logo', {
                  display: 'inline-block',
                  verticalAlign: 'top',
                })}
              </div>
              <div class="w-ellipsis w-css-reset" style={this.ellipsisStyle()}>
                {this.renderControlCells('ellipsis', {
                  display: 'inline-block',
                  verticalAlign: 'top',
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="w-foreground w-css-reset" style={this.foregroundStyle()}>
          {this.renderControlCells('foreground', { pointerEvents: 'auto' })}
        </div>
      </CustomEventsWrapper>
    );
  }

  componentDidMount() {
    if (this.props.mountRefs) {
      this.props.mountRefs(this.mountRefs);
    }

    if (this.props.afterRender) {
      this.props.afterRender();
    }

    const translateX = this.props.controlBarBorderRadius ? 'translateX(50%)' : '';

    addInlineCss(
      this.bottomBar,
      `
        @media (prefers-reduced-motion: no-preference) {
          @keyframes w-control-bar-fade-in {
            0% {
              opacity: 0;
              transform: ${translateX} translateY(10px);
            }
            100% {
              opacity: 1;
              transform: ${translateX} translateY(0px);
            }
          }
        }
      `,
    );
  }

  componentDidUpdate() {
    // Freezing these values before the setTimeout is important since very
    // quick successive renders may cause changing values in this.props to be
    // lost.
    const mountRefsProp = this.props.mountRefs;
    const mountRefs = this.mountRefs;
    const afterRenderProp = this.props.afterRender;

    // HACK: We do this on nextTick because there's a preact bug where
    // componentDidMount for child components will always fire _after_
    // componentDidUpdate for parent components, which means this.mountQueue
    // might not be populated when componentDidUpdate fires.
    // See https://github.com/developit/preact/issues/648.

    setTimeout(() => {
      if (mountRefsProp) {
        mountRefsProp(mountRefs);
      }

      if (afterRenderProp) {
        afterRenderProp();
      }
    }, 1);
  }

  wrapperStyle() {
    const shouldHideCursor = this.props.inFullscreen && !this.props.shouldShowControls;
    return {
      borderRadius: `${this.props.controlBarBorderRadius}px`,
      boxSizing: 'border-box',
      cursor: shouldHideCursor ? 'none' : 'default',
      direction: 'ltr',
      height: '100%',
      left: 0,
      pointerEvents: this.props.inNativeMode ? 'none' : '',
      position: 'absolute',
      visibility: this.props.allMounted && this.props.doneWaitingForPlay ? 'visible' : 'hidden',
      top: 0,
      width: '100%',
    };
  }

  foregroundStyle() {
    return {
      height: '100%',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      width: '100%',
    };
  }

  backgroundStyle() {
    return {
      height: '100%',
      left: 0,
      pointerEvents: this.props.inNativeMode ? 'none' : '',
      position: 'absolute',
      top: 0,
      width: '100%',
    };
  }

  layoutTableStyle() {
    return {
      display: 'table',
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
      height: `calc(100% - ${this.props.controlBarHeight}px)`,
    };
  }

  tdLeftStyle() {
    return this.standardCellStyle(0);
  }

  tdCenterStyle() {
    return this.standardCellStyle('100%');
  }

  tdRightStyle() {
    return this.standardCellStyle(0);
  }

  tdLayoutInnerStyle() {
    return {
      height: '100%',
    };
  }

  bottomBarStyle() {
    const { areControlsOpaque } = this.state;
    const { videoState, controlBarBorderRadius, controlBarDistance, shouldAnimateIn } = this.props;
    // in the scenario where controlsVisibleOnLoad is false and we're in a beforeplay
    // state, we should use display none so that the controls are not focusable via keyboard
    const display = !areControlsOpaque && videoState === 'beforeplay' ? 'none' : 'table';

    // if the rounded player value is near the low end of the slider, it can look a bit odd that the
    // control only comes away from the edges a few pixels. In those scenarios, we'd rather just not
    // come off the edges...
    const revisedControlBarDistance = controlBarDistance < 2 ? 0 : controlBarDistance;

    const animationStyles = shouldAnimateIn
      ? {
          animation: 'w-control-bar-fade-in ease-in-out 250ms',
          animationIterationCount: 1,
          animationFillMode: 'forwards',
        }
      : {};

    return {
      bottom: `${revisedControlBarDistance}px`,
      borderRadius: `${controlBarBorderRadius}px`,
      borderCollapse: 'collapse',
      display,
      height: `${this.props.controlBarHeight}px`,
      pointerEvents: 'none',
      position: 'absolute',
      paddingLeft: `${revisedControlBarDistance}px`,
      paddingRight: `${revisedControlBarDistance}px`,
      // We anchor this to the right so that, when there isn't enough room for
      // all the buttons, the ones on the _right_ stay on screen, and the ones
      // on the left get clipped. This ensures the Ellipsis control is always
      // functional after showing more.
      right: controlBarBorderRadius ? '50%' : 0,
      tableLayout: 'auto',
      transform: controlBarBorderRadius ? 'translate(50%)' : 'unset',
      width: `calc(100% - ${revisedControlBarDistance * 2}px)`,
      ...animationStyles,
    };
  }

  bottomBarLeftStyle() {
    return assign(this.standardCellStyle(0), {
      opacity: this.getOpacity(),
      transition: this.getTransition(),
    });
  }

  bottomBarLeftInnerStyle() {
    return this.standardInnerStyle();
  }

  bottomBarMiddleStyle() {
    return assign(this.standardCellStyle('100%'), {
      opacity: this.getOpacity(),
      transition: this.getTransition(),
    });
  }

  bottomBarMiddleInnerStyle() {
    const { hasClickedToShowMore, isShowingMore } = this.props;
    const shouldHide = isShowingMore && this.isEllipsisShowing();
    const animTime = hasClickedToShowMore ? 150 : 0;

    return {
      ...this.standardInnerStyle(),
      opacity: shouldHide ? 0 : 1,
      pointerEvents: shouldHide ? 'none' : 'auto',
      transform: `translateY(${shouldHide ? '-25%' : 0})`,
      transition: `opacity ${animTime}ms, transform ${animTime}ms`,
    };
  }

  shouldMixBlendMode() {
    if (detect.edge) {
      return false;
    }

    return this.props.noMixBlendMode === false;
  }

  blendStyle() {
    const { color: colorStr } = this.props;
    const color = new Color(colorStr || '#000').alpha(1);
    return {
      background: color.toRgba(),
      display: this.shouldMixBlendMode() ? 'block' : 'none',
      height: '100%',
      // NOTE: Due to bugs in how browsers work with mix-blend-mode and
      // opacity, opacity must not be set on an ancestor of a branch it
      // overlays, which is why we set this here instead of at a higher level
      // on the control bar.
      mixBlendMode: 'darken',
      left: 0,
      opacity: this.getOpacity(),
      position: 'absolute',
      top: 0,
      transition: this.getTransition(),
      width: '100%',
    };
  }

  bgOverlayStyle() {
    const { color: colorStr, controlBarBorderRadius } = this.props;
    const color = new Color(colorStr || '#000').alpha(0.7);

    if (!this.shouldMixBlendMode()) {
      color.alpha(0.85);
    }

    return {
      background: color.toRgba(),
      borderRadius: `${controlBarBorderRadius}px`, // needed for rounded control bar
      height: '100%',
      opacity: this.getOpacity(),
      left: 0,
      position: 'absolute',
      top: 0,
      transition: this.getTransition(),
      width: '100%',
    };
  }

  bottomBarRightStyle() {
    return assign(this.standardCellStyle(0), {
      opacity: this.getOpacity(),
      transition: this.getTransition(),
      whiteSpace: 'nowrap',
    });
  }

  bottomBarRightInnerAnchorStyle() {
    const result = {
      ...this.standardInnerStyle(),
      display: 'inline-block',
      position: 'relative',
      right: 0,
      top: 0,
      verticalAlign: 'top',
    };

    if (this.isEllipsisShowing()) {
      // Without this, the ellipsis and right button controls appear on
      // separate lines because CSS is weird.
      result.height = 0;
    }

    return result;
  }

  bottomBarRightInnerStyle() {
    const { extraPaddingWhenRounded, hasClickedToShowMore, isShowingMore } = this.props;
    const shouldShow = !this.isEllipsisShowing() || isShowingMore;
    const animTime = hasClickedToShowMore ? 150 : 0;
    return {
      ...this.standardInnerStyle(),
      display: 'inline-block',
      opacity: shouldShow ? 1 : 0,
      pointerEvents: shouldShow ? 'auto' : 'none',
      position: this.isEllipsisShowing() ? 'absolute' : 'relative',
      right: 0,
      top: 0,
      transform: `translateY(${shouldShow ? 0 : '25%'})`,
      transition: `opacity ${animTime}ms, transform ${animTime}ms`,
      paddingRight: `${extraPaddingWhenRounded}px`,
    };
  }

  wistiaLogoStyle() {
    return {
      ...this.standardInnerStyle(),
      display: this.props.controlsByType['wistia-logo'] ? 'inline-block' : 'none',
      right: 0,
      top: 0,
    };
  }

  ellipsisStyle() {
    return {
      ...this.standardInnerStyle(),
      display: this.props.controlsByType.ellipsis ? 'inline-block' : 'none',
    };
  }

  standardCellStyle(width) {
    return {
      display: 'table-cell',
      verticalAlign: 'top',
      position: 'relative',
      width,
    };
  }

  standardInnerStyle() {
    return {
      height: this.props.controlBarHeight,
      position: 'relative',
      pointerEvents: this.state.areControlsOpaque ? 'auto' : 'none',
      whiteSpace: 'nowrap',
    };
  }

  renderControlCells(region, style = {}) {
    const { controlsByType } = this.props;

    return (controlsByType[region] || []).map((control) => {
      const handle = control.constructor.handle;

      return (
        <RawHTMLStub
          class="w-css-reset"
          handle={handle}
          key={handle}
          mount={(e) => (this.mountRefs[handle] = e)}
          style={style}
        />
      );
    });
  }

  handleControlBarAnimation(nextProps) {
    if (nextProps.shouldShowControls && !this.props.shouldShowControls) {
      setTimeout(() => {
        this.setState({ areControlsOpaque: true });
      }, 1);
    }

    if (!nextProps.shouldShowControls && this.props.shouldShowControls) {
      this.setState({ areControlsOpaque: false });
    }
  }

  onFocus = () => {
    if (!this.props.isMouseDownFromTouch && !isMouseDownRecently()) {
      this.setState({ isKeyboardFocused: true });
    }

    this.props.onFocusComplete();
  };

  onBlur = () => {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
    }
  };

  onFocusIn = (e) => {
    if (this.props.onfocusin) {
      this.props.onfocusin(e);
    }
  };

  onFocusOut = (e) => {
    if (this.props.onfocusout) {
      this.props.onfocusout(e);
    }
  };

  onClick = (e) => {
    if (isMouseDownRecently()) {
      this.setState({ isKeyboardFocused: false });
    }

    if (eventOriginatedFromVulcanV2Button(e)) {
      e.preventDefault();
    }

    if (this.props.onClick) {
      return this.props.onClick(e);
    }
  };

  onTouchEnd = (e) => {
    if (this.props.onTouchEnd) {
      return this.props.onTouchEnd(e);
    }
  };

  getOpacity() {
    return this.state.areControlsOpaque ? 1 : 0;
  }

  getTransition() {
    return `opacity ${this.props.videoState === 'beforeplay' ? 0 : 0.2}s`;
  }

  playbarStyle() {
    return {
      height: '100%',
      position: 'relative',
    };
  }

  leftBgStyle() {
    const { controlsByType, leftControlWidth } = this.props;
    const playbarControls = controlsByType.playbar || [];
    const width = playbarControls.length > 0 ? '100%' : `${leftControlWidth}px`;

    return {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width,
    };
  }

  rightBgStyle() {
    if ((this.props.controlsByType.playbar || []).length > 0) {
      return {
        display: 'none',
      };
    }

    return {
      height: '100%',
      position: 'absolute',
      right: 0,
      top: 0,
      width: `${this.props.rightControlWidth}px`,
    };
  }

  bottomBarLowerStyle() {
    return {
      position: 'relative',
    };
  }

  isEllipsisShowing() {
    return Boolean(this.props.controlsByType.ellipsis);
  }
}

const eventOriginatedFromVulcanV2Button = (e) => {
  return (
    e.target &&
    (elemHasClass(e.target, 'w-vulcan-v2-button') ||
      elemAncestorHasClass(e.target, 'w-vulcan-v2-button'))
  );
};

export default Layout;
