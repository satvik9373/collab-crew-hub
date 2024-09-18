import { Wistia } from 'wistia_namespace.js';
import { addInterNumbersFontFace } from 'utilities/interNumbersFontFaceSemiBold.js';
import { interNumbersSemiBold } from 'utilities/interFontFamily.js';
import { Color } from 'utilities/color.js';
import { assign, clone } from 'utilities/obj.js';
import { elemBind, elemOffset, elemUnbind } from 'utilities/elem.js';
import { h, render, Component } from 'preact';
import { cachedDetect } from 'utilities/detect.js';
import { isMouseDown } from 'utilities/isMouseDown.js';
import { dynamicImport } from 'utilities/dynamicImport.ts';
import TimeBadge from './TimeBadge.jsx';
import TouchEvents from '../../TouchEvents.js';
import { flexibleDuration, accessibilityDuration } from '../../../../../../utilities/duration.ts';

addInterNumbersFontFace();

const detect = cachedDetect();
const PLAYBAR_SIZE_CALCULATION_OFFSET_TO_COUNTER_LINE_CAPPING = 1;

// To be defined async.
let ChapterMarkers;
let ChapterTitles;

const UI_COMPONENTS_ROOT = 'vulcanV2Player/shared/ui_components';

const W_PLAYBAR = 'w-playbar';
let Storyboard;

const SCALED_DOWN_SCALE = 1.001;
const SCALED_UP_SCALE = 2;

const zeroToOne = (num) => {
  return Math.min(1, Math.max(0, num));
};

class Playbar extends Component {
  // expected props from outside:
  // - getCurrentTime
  // - getCurrentBufferTime
  // - isPlaying
  // - duration
  // - width
  // - onDragStart
  // - onDrag
  // - onDragEnd
  // - onFocus
  // - onBlur
  //
  constructor(props) {
    super(props);
    this.state = {
      currentBufferTime: props.getCurrentBufferTime(),
      currentTime: props.getCurrentTime(),
      dragMode: false,
      dragPercent: 0,
      hasPlayed: false,
      hoverPercent: 0,
      isHovering: false,
      isKeyboardFocused: false,
      isOverPlayhead: false,
      loadedChapters: false,
      loadedStoryboard: false,
      timeWidth: null,
      wasBeforePlayOnDrag: false,
    };

    this.setColorsFromPlayerColor(props.color);

    if (props.chapters && props.chapters.length > 0) {
      this.loadChapters();
    }

    this.playheadScale = SCALED_DOWN_SCALE;
  }

  canvasHeight() {
    return this.props.height * (window.devicePixelRatio || 1);
  }

  canvasStyle() {
    return {
      height: `${this.props.height}px`,
      left: `${-this.leftBarMargin()}px`,
      position: 'absolute',
      top: 0,
      width: `${this.leftBarMargin() + this.unfilledBarWidth() + this.rightBarMargin()}px`,
    };
  }

  canvasWidth() {
    return (
      (this.leftBarMargin() + this.unfilledBarWidth() + this.rightBarMargin()) *
      (window.devicePixelRatio || 1)
    );
  }

  playheadStyle() {
    const playheadSize = this.barHeight() * 1.4 * 4;
    const centerY = this.props.height / 2 - playheadSize / 2;
    const filledBarWidth = this.playedPercent() * this.unfilledBarWidth();
    const playheadX = filledBarWidth - playheadSize / 2;
    return {
      borderRadius: '50%',
      height: `${playheadSize}px`,
      left: `${playheadX}px`,
      opacity: 0,
      position: 'absolute',
      top: `${centerY}px`,
      width: `${playheadSize}px`,
    };
  }

  componentWillReceiveProps(nextProps) {
    const props = this.props;
    if (props.color !== nextProps.color) {
      this.setColorsFromPlayerColor(nextProps.color);
    }

    // Update currentTime state and friends whenever we get an external call to
    // render().
    //
    // Note that "dragMode" exists mainly to prevent flickering of the playhead
    // when seeking while paused. Normally there's a very brief delay between
    // mouseup and seek which results in a flicker. By remaining in drag mode
    // _after_ mouseup, we avoid it entirely. We only exit drag mode when we
    // receive data from the outside that we should respect.
    this.setState({
      dragMode: false,
      currentTime: props.getCurrentTime(),
      currentBufferTime: props.getCurrentBufferTime(),
    });

    if (nextProps.chapters && nextProps.chapters.length > 0) {
      this.loadChapters();
    }
  }

  drawCanvas() {
    if (!this.canvasEl) {
      return;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;
    const { dragMode, hoverPercent, isHovering, isKeyboardFocused, isOverPlayhead } = this.state;

    const canvasWidth = this.canvasWidth();
    const canvasHeight = this.canvasHeight();

    const ctx = this.canvasEl.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw unfilled bar
    const unfilledBarWidth = this.unfilledBarWidth();
    const centerY = (this.props.height * devicePixelRatio) / 2;
    ctx.strokeStyle = 'rgba(255,255,255,.6)';
    ctx.lineWidth = this.barHeight() * devicePixelRatio;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(this.leftBarMargin() * devicePixelRatio, centerY);
    ctx.lineTo((this.leftBarMargin() + unfilledBarWidth) * devicePixelRatio, centerY);
    ctx.stroke();

    // draw filled bar
    const filledBarWidth = this.playedPercent() * unfilledBarWidth;
    ctx.strokeStyle = 'rgba(255,255,255,1)';
    ctx.lineWidth = this.barHeight() * devicePixelRatio;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(this.leftBarMargin() * devicePixelRatio, centerY);
    ctx.lineTo((this.leftBarMargin() + filledBarWidth) * devicePixelRatio, centerY);
    ctx.stroke();

    // draw chapters
    let { chapters } = this.props;
    const { chapterWithFocusedMarker, duration } = this.props;
    const baseMarkerSize = this.barHeight() * 1.4 * devicePixelRatio;
    if (chapters?.length > 0) {
      if (chapterWithFocusedMarker) {
        // put the focused chapter at the end to make sure it draws on top of
        // other chapters if they would be overlapping.
        chapters = clone(chapters);
        let index = -1;
        for (let i = 0; i < chapters.length; i++) {
          if (chapters[i].id === chapterWithFocusedMarker.id) {
            index = i;
            break;
          }
        }
        chapters.splice(index, 1);
        chapters.push(chapterWithFocusedMarker);
      }

      // cut out each place where a chapter marker goes
      // we do all these before drawing the chapter markers so that later
      // markers can't "cut out" the chapter marker of a preceding chapter.
      chapters.forEach((chapter) => {
        const ratio = chapter.time / duration;
        const chapterX = (this.leftBarMargin() + ratio * unfilledBarWidth) * devicePixelRatio;
        let markerSize = baseMarkerSize;

        if (chapterWithFocusedMarker === chapter) {
          markerSize *= 1.5;
        }

        ctx.beginPath();
        ctx.arc(chapterX, centerY, markerSize * 1.6, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();
      });

      // draw each chapter marker
      chapters.forEach((chapter) => {
        const ratio = chapter.time / duration;
        const chapterX = (this.leftBarMargin() + ratio * unfilledBarWidth) * devicePixelRatio;
        let opacity = 0.6;
        let markerSize = baseMarkerSize;

        if (chapterWithFocusedMarker === chapter) {
          markerSize *= 2;
          opacity = 1;
        }

        ctx.beginPath();
        ctx.arc(chapterX, centerY, markerSize, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();

        // Punch out a hole, leaving a thin stroke. We punch it out instead of
        // doing a stroke to avoid an "olympic rings" kind of look with
        // chapters that are very close together. Instead, the last drawn
        // chapter will appear to be "on top."
        const borderSize = this.barHeight() * 0.75 * devicePixelRatio;
        const holePunchSize = markerSize - borderSize;
        ctx.beginPath();
        ctx.arc(chapterX, centerY, holePunchSize, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
    }

    // draw playhead
    const shouldScaleUp = dragMode || isKeyboardFocused || isOverPlayhead;
    const finalScaleTransform = shouldScaleUp ? SCALED_UP_SCALE : SCALED_DOWN_SCALE;
    let animUntilShouldChange = false;
    if (finalScaleTransform !== this.playheadScale) {
      animUntilShouldChange = true;
      this.playheadScale = shouldScaleUp ? SCALED_UP_SCALE : SCALED_DOWN_SCALE;
      this.lastScaledAt = Date.now();
    }

    const animTime = shouldScaleUp ? 0 : 100;
    if (animUntilShouldChange) {
      // animate the playhead growing or shrinking
      this.animateUntil(Date.now() + animTime);
    }

    const ratio =
      animTime === 0 ? 1 : 1 + 1 - Math.min(1, (Date.now() - this.lastScaledAt) / animTime);
    const interpolatedScaleTransform = this.lastScaledAt ? ratio * finalScaleTransform : 1;

    const playheadSize = this.barHeight() * 1.4 * devicePixelRatio * interpolatedScaleTransform;
    const playheadX = (this.leftBarMargin() + filledBarWidth) * devicePixelRatio;
    const glowRadius = playheadSize * 2;
    const glowDiameter = glowRadius * 2;
    const g = ctx.createRadialGradient(playheadX, centerY, 0, playheadX, centerY, glowRadius);
    g.addColorStop(0, 'rgba(255,255,255,.5)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.rect(playheadX - glowRadius, centerY - glowRadius, glowDiameter, glowDiameter);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();

    // draw playhead
    ctx.beginPath();
    ctx.arc(playheadX, centerY, playheadSize, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fill();

    if (isKeyboardFocused) {
      ctx.beginPath();
      ctx.arc(playheadX, centerY, playheadSize * 1.5, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.strokeWidth = devicePixelRatio || 1;
      ctx.stroke();
    }

    // draw hover marker
    if (isHovering && !dragMode && !chapterWithFocusedMarker) {
      ctx.beginPath();
      const hoverMarkerSize = this.barHeight() * 1.4 * devicePixelRatio;
      const hoverX =
        (this.leftBarMargin() + hoverPercent * this.unfilledBarWidth()) * devicePixelRatio -
        hoverMarkerSize / 2;
      ctx.arc(hoverX, centerY, hoverMarkerSize, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,255,255,1)';
      ctx.fill();
    }
  }

  animateUntil(t) {
    if (!this._animEndTime || t > this._animEndTime) {
      this._animEndTime = t;
    }
    if (!this._animating) {
      this.animateCanvasUntilEndTime();
      this._animating = true;
    }
  }

  animateCanvasUntilEndTime() {
    requestAnimationFrame(() => {
      if (Date.now() > this._animEndTime) {
        this._animating = false;
        return;
      }

      this.drawCanvas();
      this.animateCanvasUntilEndTime();
    });
  }

  maybeCallOnResize() {
    const playbarBarWidth =
      this.unfilledBarWidth() + PLAYBAR_SIZE_CALCULATION_OFFSET_TO_COUNTER_LINE_CAPPING * 2;
    const playbarBarLeftOffsetFromPlayerLeftEdge =
      this.props.left +
      this.timeLeftPadding() +
      this.leftBarMargin() +
      this.timeWidth() -
      PLAYBAR_SIZE_CALCULATION_OFFSET_TO_COUNTER_LINE_CAPPING;

    if (
      this._lastPlaybarWidth === playbarBarWidth &&
      this._lastPlaybarBarLeftOffsetFromPlayerLeftEdge === playbarBarLeftOffsetFromPlayerLeftEdge
    ) {
      return;
    }

    this.props.onResize?.({
      playbarBarWidth,
      playbarBarLeftOffsetFromPlayerLeftEdge,
    });

    this._lastPlaybarWidth = playbarBarWidth;
    this._lastPlaybarBarLeftOffsetFromPlayerLeftEdge = playbarBarLeftOffsetFromPlayerLeftEdge;
  }

  render() {
    this.maybeCallOnResize();
    this.oldWrapperElem = this.wrapperElem;
    return (
      <div class={`${W_PLAYBAR}-wrapper w-css-reset w-css-reset-tree`} style={this.wrapperStyle()}>
        {this.props.shouldShowTime ? this.renderTime() : undefined}
        <div style={{ width: '100%', position: 'relative' }}>
          <div
            aria-label="Playbar"
            aria-orientation="horizontal"
            aria-valuemax={this.props.duration}
            aria-valuemin={0}
            aria-valuenow={this.ariaValueNow()}
            aria-valuetext={this.ariaValueText()}
            onBlur={this.props.onBlur}
            onFocus={this.onFocus}
            onfocusout={this.onFocusOut}
            onKeyDown={this.onKeyDown}
            onMouseDown={this.onMouseDown}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.onMouseUp}
            ref={this.setWrapperRef}
            role="slider"
            style={this.dragAreaStyle()}
            tabindex={this.props.isVisible ? 0 : -1}
          >
            <canvas
              height={this.canvasHeight()}
              ref={(el) => (this.canvasEl = el)}
              style={this.canvasStyle()}
              width={this.canvasWidth()}
            />
            <div
              onMouseEnter={this.onMouseEnterPlayhead}
              onMouseLeave={this.onMouseLeavePlayhead}
              ref={(el) => (this.playheadEl = el)}
              style={this.playheadStyle()}
            />
            {this.props.shouldShowStoryboard && typeof Storyboard !== 'undefined' ? (
              <Storyboard
                {...this.props}
                hasChapters={this.state.loadedChapters}
                isHovering={this.state.isHovering}
                getDurationBeforeCuts={this.props.getDurationBeforeCuts}
                getTimeBeforeCuts={this.props.getTimeBeforeCuts}
                hoverPercent={this.state.hoverPercent}
                left={
                  this.props.left + this.timeWidth() + this.timeLeftPadding() + this.leftBarMargin()
                }
                width={this.unfilledBarWidth()}
              />
            ) : null}
            {this.props.shouldShowTimeOnHover && this.state.isHovering && (
              <TimeBadge
                left={this.state.hoverPercent * this.unfilledBarWidth()}
                time={this.getHoverTime()}
                height={this.props.height}
                widthOfPlaybar={this.unfilledBarWidth()}
              />
            )}
          </div>

          {this.props.chapters &&
            this.props.chapters.length > 0 &&
            typeof ChapterMarkers !== 'undefined' && (
              <div
                aria-label="Chapter Markers"
                role="toolbar"
                style={{
                  bottom: 0,
                  height: `${this.props.height}px`,
                  outline: 'none',
                  paddingLeft: `${this.leftBarMargin()}px`,
                  paddingRight: `${this.rightBarMargin()}px`,
                  pointerEvents: 'none',
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <ChapterMarkers
                  {...this.props}
                  onFocus={this.onFocusChapterMarkers}
                  paddingLeft={this.leftBarMargin()}
                  paddingRight={this.rightBarMargin()}
                  timeLeft={-10}
                  timeRight={-10}
                />
                {this.props.shouldShowChapterTitles ? (
                  <ChapterTitles
                    {...this.props}
                    left={
                      this.props.left +
                      this.timeWidth() +
                      this.timeLeftPadding() +
                      this.leftBarMargin()
                    }
                    width={this.unfilledBarWidth()}
                  />
                ) : null}
              </div>
            )}
        </div>
      </div>
    );
  }

  renderTime() {
    return (
      <div class={`${W_PLAYBAR}__time`} style={this.timeStyle()} ref={(e) => (this.timeElem = e)} />
    );
  }

  componentDidMount() {
    this.drawCanvas();
    this.lastRenderedAt = Date.now();

    if (detect.touchScreen && this.wrapperElem) {
      this.touchEvents = new TouchEvents(this.wrapperElem);
      this.touchEvents.on('touchstart', this.onTouchStart);
    }

    this.maybeUpdateTimeText();

    const props = this.props;

    if (props.isPlaying) {
      // In case this is somehow mounted when the video is already in a
      // playing state.
      this.setState({ hasPlayed: true });
    }

    if (props.isPlaying) {
      this.startAnimLoopIfPlaying();
    }

    this.props.setTimeWidth(this.timeWidth() + this.timeLeftPadding() + this.leftBarMargin());
    this.props.setRightBarMargin(this.rightBarMargin());
  }

  componentDidUpdate(prevProps, prevState) {
    this.drawCanvas();
    const props = this.props;

    this.lastRenderedAt = Date.now();

    if (detect.touchScreen && this.wrapperElem && this.oldWrapperElem !== this.wrapperElem) {
      if (this.touchEvents) {
        this.touchEvents.destroy();
      }
      this.touchEvents = new TouchEvents(this.wrapperElem);
      this.touchEvents.on('touchstart', this.onTouchStart);
    }

    if (props.isPlaying && !this.state.hasPlayed) {
      this.setState({ hasPlayed: true });
    }

    this.maybeUpdateTimeText();

    const justPlayed = props.isPlaying && !prevProps.isPlaying;
    const justGotBuffer = prevState.currentBufferTime != this.state.currentBufferTime;
    const justBecameVisible = props.isVisible && !prevProps.isVisible;
    if (justPlayed || justBecameVisible || justGotBuffer) {
      this.startAnimLoopIfPlaying();
    }

    const justBecameHidden = !props.isVisible && prevProps.isVisible;
    if (justBecameHidden) {
      this.stopAnimLoop();
    }

    this.props.setTimeWidth(this.timeWidth() + this.timeLeftPadding() + this.leftBarMargin());
    this.props.setRightBarMargin(this.rightBarMargin());
  }

  componentWillUnmount() {
    elemUnbind(document, 'mousemove', this.onMouseMoveDragging);
    elemUnbind(document, 'mouseup', this.onMouseUpDragging);
    if (this.touchEvents) {
      this.touchEvents.destroy();
      this.touchEvents = null;
    }
  }

  getHoverTime() {
    return flexibleDuration(Math.round(this.state.hoverPercent * this.props.duration));
  }

  placeholderStyle() {
    return {
      cursor: 'default',
      height: '100%',
      outline: 'none',
      position: 'relative',
      width: '100%',
    };
  }

  wrapperStyle() {
    const { videoWidth, width } = this.props;
    return {
      display: 'flex',
      height: '100%',
      width: width === videoWidth ? `${width}px` : '100%',
    };
  }

  dragAreaStyle() {
    return {
      cursor: 'pointer',
      flex: '1 1',
      height: `${this.props.height}px`,
      outline: 'none',
      marginLeft: `${this.leftBarMargin()}px`,
      marginRight: `${this.rightBarMargin()}px`,
      position: 'relative',
    };
  }

  leftBarMargin() {
    const { leftControlBarWidth } = this.props;

    if (leftControlBarWidth === 0) {
      return this.rightBarMargin();
    }

    return this.rightBarMargin() * 1.5;
  }

  rightBarMargin() {
    const { duration, scale } = this.props;

    const normalDurationText = flexibleDuration(15 * 60);
    const normalDurationWidth = normalDurationText.length * 7;

    const actualDurationText = flexibleDuration(duration);
    const actualDurationWidth = actualDurationText.length * 7;

    // We want to shrink the margins a little when the full duration is longer
    // so that we split the difference when the current time (which usually
    // takes up less horizontal space) is showing.
    const mult =
      normalDurationWidth < actualDurationWidth ? normalDurationWidth / actualDurationWidth : 1;

    return 10 * mult * scale;
  }

  timeLeftPadding() {
    const { leftControlBarWidth, isPlaceholder, shouldShowTime } = this.props;

    if (!shouldShowTime) {
      return 0;
    }

    if (leftControlBarWidth === 0) {
      return this.leftBarMargin() / 1.33;
    }

    return isPlaceholder ? this.leftBarMargin() : this.leftBarMargin() / 3;
  }

  timeStyle() {
    const { height, scale } = this.props;

    return {
      boxSizing: 'content-box',
      color: 'white',
      fontFamily: interNumbersSemiBold,
      fontSize: `${13 * scale}px`,
      letterSpacing: `${0.5 * scale}px`,
      lineHeight: `${height}px`,
      paddingLeft: `${this.timeLeftPadding()}px`,
      pointerEvents: 'none',
      position: 'relative',
      textAlign: 'center',
      width: `${this.timeWidth()}px`,
    };
  }

  timeWidth() {
    const { duration, scale, shouldShowTime } = this.props;

    if (!shouldShowTime) {
      return 0;
    }

    // We want to set the width to the largest it could possibly be.
    const durationText = flexibleDuration(duration);
    return durationText.length * 7 * scale;
  }

  filledBarStyle() {
    const barHeight = this.barHeight();
    return {
      background: '#fff',
      borderRadius: `${barHeight}px`,
      height: `${barHeight}px`,
      left: 0,
      position: 'absolute',
      top: 0,
      width: `${this.playedPercent() * 100}%`,
    };
  }

  barHeight() {
    const { scale } = this.props;
    return 2 * scale;
  }

  unfilledBarStyle() {
    const { height } = this.props;
    return {
      background: 'rgba(255,255,255,.6)',
      borderRadius: `${this.barHeight()}px`,
      height: `${this.barHeight()}px`,
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      top: `${(height - this.barHeight()) / 2}px`,
      width: `${this.unfilledBarWidth()}px`,
    };
  }

  unfilledBarWidth() {
    const offsetControlBarDistance = this.props.controlBarDistance * 2;
    const { width } = this.props;
    return (
      width -
      this.timeLeftPadding() -
      this.timeWidth() -
      this.leftBarMargin() -
      this.rightBarMargin() -
      offsetControlBarDistance
    );
  }

  playedPercent() {
    const state = this.state;
    const { duration, getCurrentTime, isSeeking, resumableTime } = this.props;
    if (state.dragMode || (state.wasBeforePlayOnDrag && (isSeeking || !state.hasPlayed))) {
      return state.dragPercent;
    }
    if (resumableTime && !state.hasPlayed) {
      return zeroToOne(resumableTime / duration);
    }
    return zeroToOne(getCurrentTime() / duration);
  }

  bufferedAheadPercent() {
    const state = this.state;
    if (this.props.isBeforePlay) {
      // Don't show the buffer shooting ahead before we've played. It's
      // distracting and looks weird.
      return 0;
    }
    if (state.dragMode) {
      const bufferPercent = state.currentBufferTime / this.props.duration;
      return zeroToOne(bufferPercent - state.dragPercent);
    }
    return zeroToOne(
      (this.props.getCurrentBufferTime() - this.props.getCurrentTime()) / this.props.duration,
    );
  }

  emptyPercent() {
    const nonEmptyPercent = zeroToOne(this.playedPercent() + this.bufferedAheadPercent());
    return 1 - nonEmptyPercent;
  }

  timeText() {
    const state = this.state;
    const props = this.props;
    if (
      state.dragMode ||
      (state.wasBeforePlayOnDrag && (this.props.isSeeking || !state.hasPlayed))
    ) {
      return flexibleDuration(state.dragPercent * props.duration);
    }
    if (state.hasPlayed || this.props.getCurrentTime() >= 1) {
      // Check currentTime because we can seek-before-play and want that to
      // show the correct time.
      return flexibleDuration(props.getCurrentTime());
    }
    if (props.resumableTime) {
      return flexibleDuration(props.resumableTime);
    }
    return flexibleDuration(props.duration);
  }

  ariaValueNow() {
    if (this.state.dragMode) {
      return this.state.dragPercent * this.props.duration;
    }
    return this.props.getCurrentTime();
  }

  ariaValueText() {
    return accessibilityDuration(this.props.getCurrentTime());
  }

  cachePositionDetails() {
    // The “offset” object is like a DOMRect, but uses custom logic for
    // determining top and left. It gets stored on the instance at specific
    // junctures (mousedown, etc) as a heuristic compromise between correctness
    // and performance concerns. That is, if the relevant computed styles change
    // between snapshots, this will report the wrong percentage, but this is
    // considered an uncommon enough edge case to not merit the performance hit
    // that would come from measuring on individual move/touch events.

    this.offset = elemOffset(this.wrapperElem);
  }

  getPercentFromPossiblyExternalMouseEvent(e) {
    // Mouse events at the doc level are used for capturing drag-seeking. Mouse
    // down over playbar initializes the document level listeners, and until
    // mouse up, move is interepreted as drag, and this includes when the cursor
    // has exited the playbar/player. When they are over the playbar, the target
    // will be the wrapperElem and the usual inexpensive and guaranteed accurate
    // offsetX approach is available, unless chapter dots or other absolutely
    // positioned widgets are in front of it. Otherwise we need to use the same
    // strategy as we use for touch events.

    if (e.target === this.wrapperElem) {
      return this.getPercentFromMouseEvent(e);
    }
    return this.getPercentFromPageX(e.pageX);
  }

  getPercentFromMouseEvent({ offsetX }) {
    // MouseEvent.prototype.offsetX will already take into account any CSS
    // transforms applied ancestrally if this is the playbar’s own event, but
    // will not include zoom. While we don’t need to derive position from the
    // viewport manually here, we do need the offset snapshot for zoom.

    const zoom = this.offset ? this.offset.zoom : 1;

    return this.getPercentFromOffsetX(offsetX / zoom);
  }

  getPercentFromOffsetX(offsetX) {
    return Math.max(0, Math.min(1, offsetX / this.unfilledBarWidth()));
  }

  getPercentFromPageX(pageX) {
    // In the document mouse move/up and touch cases, we must derive the bar
    // fraction from a pageX value. There are two considerations to account for:
    //
    // 1. The delta of the player coordinates and 0,0
    // 2. The possibility that one or more ancestors of the player has been
    //    subjected to css matrix transformations that will alter the position
    //    and/or width of the playbar relative to its natural coordinates/
    //    this.props.width.
    //
    // Both are addressed by this.offset (see cachePositionDetails), which gives
    // us the computed (post-transform) values for left and width. Because this
    // logic depends on offset existing and in IE this may be called before
    // cachePositionDetails, there’s an early exit if offset is not yet defined.

    if (this.offset === undefined) {
      return 0;
    }

    const untransformedWidth = this.unfilledBarWidth();
    const transformedWidth = this.offset.width;
    const scaleX = transformedWidth / untransformedWidth;
    const offsetX = (pageX - this.offset.left) / scaleX;

    return this.getPercentFromOffsetX(offsetX);
  }

  getPercentFromTouchEvent({ changedTouches }) {
    // Touch is like the document-level mouse move “drag” events; the only
    // difference is that TouchEvent has a different API from which to retrieve
    // the current pageX value. Note that even if this were not document level,
    // this strategy would still be required because TouchEvent / Touch objects
    // do not expose a browser-calculated offsetX.

    return '0' in changedTouches ? this.getPercentFromPageX(changedTouches[0].pageX) : 0;
  }

  handleWithProp(propName, e, ...extra) {
    const fn = this.props[propName];
    if (fn) {
      fn(e, ...extra);
    }
  }

  onFocusChapterMarkers = () => {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
    }
  };

  onFocus = (e) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
    if (!isMouseDown()) {
      this.setState({ isKeyboardFocused: true });
    }
  };

  onFocusOut = () => {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
    }
  };

  onMouseEnter = (e) => {
    if (this.touchEvents) {
      return;
    }

    e.wistiaPlayerHandled = true;
    this.setState({ hoveredAt: Date.now(), isHovering: true });
    this.cachePositionDetails();

    if (this.props.shouldShowStoryboard) {
      this.loadStoryboard();
    }
  };

  onMouseLeave = (e) => {
    if (this.touchEvents) {
      return;
    }

    e.wistiaPlayerHandled = true;
    this.setState({ hoveredAt: undefined, isHovering: false });
  };

  onMouseMove = (e) => {
    if (this.touchEvents) {
      return;
    }

    e.wistiaPlayerHandled = true;

    const percent = this.getPercentFromPossiblyExternalMouseEvent(e);
    this.setState({ hoverPercent: percent });
  };

  onMouseDown = (e) => {
    if (this.touchEvents) {
      return;
    }

    if (e.wistiaPlayerHandled) {
      return;
    }

    if (e.ctrlKey) {
      // So we can ctrl-click to inspect.
      return;
    }

    e.preventDefault(); // don't select text
    this.wrapperElem.focus();

    e.wistiaPlayerHandled = true;
    this.cachePositionDetails();

    const percent = this.getPercentFromPossiblyExternalMouseEvent(e);
    this.handleWithProp('onDragStart', e, percent);
    this.setState({
      dragPercent: percent,
      dragMode: true,
      wasBeforePlayOnDrag: this.props.isBeforePlay,
    });

    elemBind(document, 'mousemove', this.onMouseMoveDragging);
    elemBind(document, 'mouseup', this.onMouseUpDragging);
  };

  onMouseMoveDragging = (e) => {
    e.preventDefault(); // don't select text
    e.wistiaPlayerHandled = true;

    const percent = this.getPercentFromPossiblyExternalMouseEvent(e);
    this.handleWithProp('onDrag', e, percent);
    this.setState({
      dragPercent: percent,
      dragMode: true,
    });
  };

  onMouseUpDragging = (e) => {
    e.wistiaPlayerHandled = true;

    const percent = this.getPercentFromPossiblyExternalMouseEvent(e);
    this.setState({
      dragPercent: percent,
      dragMode: false,
      isOverPlayhead: false,
    });
    this.handleWithProp('onDragEnd', e, percent);

    elemUnbind(document, 'mousemove', this.onMouseMoveDragging);
    elemUnbind(document, 'mouseup', this.onMouseUpDragging);
  };

  onTouchStart = (e) => {
    e.preventDefault(); // don't select text
    e.wistiaPlayerHandled = true;
    this.cachePositionDetails();

    const percent = this.getPercentFromTouchEvent(e);
    this.handleWithProp('onDragStart', e, percent);
    this.setState({
      dragPercent: percent,
      dragMode: true,
    });

    this.touchEvents.on('touchmove', this.onTouchMoveDragging);
    this.touchEvents.on('touchend', this.onTouchEndDragging);
  };

  onTouchMoveDragging = (e) => {
    e.preventDefault(); // don't select text
    e.wistiaPlayerHandled = true;

    const percent = this.getPercentFromTouchEvent(e);
    this.handleWithProp('onDrag', e, percent);
    this.setState({
      dragPercent: percent,
      dragMode: true,
    });
  };

  onTouchEndDragging = (e) => {
    e.wistiaPlayerHandled = true;

    const percent = this.getPercentFromTouchEvent(e);
    this.setState({
      dragPercent: percent,
      dragMode: false,
      isOverPlayhead: false,
    });
    this.handleWithProp('onDragEnd', e, percent);

    this.touchEvents.off('touchmove', this.onTouchMoveDragging);
    this.touchEvents.off('touchend', this.onTouchEndDragging);
  };

  onMouseEnterPlayhead = () => {
    this.setState({ isOverPlayhead: true });
  };

  onMouseLeavePlayhead = () => {
    this.setState({ isOverPlayhead: false });
  };

  setWrapperRef = (e) => {
    this.wrapperElem = e;

    if (this.props.setPlaybarElemRef) {
      this.props.setPlaybarElemRef(e);
    }
  };

  startAnimLoopIfPlaying = () => {
    if (this.props.isPlaying && this.props.isVisible) {
      requestAnimationFrame(this.continuouslyUpdatePlaybar);
    }
  };

  stopAnimLoop = () => {
    cancelAnimationFrame(this.animReq);
  };

  continuouslyUpdatePlaybar = () => {
    this.drawCanvas();
    this.maybeUpdateTimeText();
    assign(this.playheadEl.style, this.playheadStyle());
    this.startAnimLoopIfPlaying();
  };

  maybeUpdateTimeText() {
    const timeText = this.timeText();
    if (this.timeElem && timeText !== this._lastTimeText) {
      this.timeElem.innerText = timeText;
    }
    this._lastTimeText = timeText;
  }

  playheadLeftPosition() {
    return this.unfilledBarWidth() * this.playedPercent();
  }

  loadStoryboard = () => {
    return dynamicImport('assets/external/vulcanV2Player/video/ui_components/Storyboard.js').then(
      (moduleClass) => {
        Storyboard = moduleClass.Storyboard;
        this.setState({ loadedStoryboard: true });
      },
    );
  };

  loadChapters = () => {
    return Promise.all([
      dynamicImport(`assets/external/${UI_COMPONENTS_ROOT}/ChapterMarkers.js`),
      dynamicImport(`assets/external/${UI_COMPONENTS_ROOT}/ChapterTitles.js`),
    ]).then(([moduleChapterMarkers, moduleChapterTitles]) => {
      ChapterMarkers = moduleChapterMarkers.ChapterMarkers;
      ChapterTitles = moduleChapterTitles.ChapterTitles;
      this.setState({ loadedChapters: true });
    });
  };

  setColorsFromPlayerColor(color) {
    this.playedColor = new Color(color).darken(30).alpha(0.7);
    this.bufferedColor = new Color(color).lighten(75).alpha(0.6);
    this.emptyColor = new Color(color).lighten(40).alpha(0.3);
  }
}

export default Playbar;
