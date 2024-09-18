import { Interpolation } from 'interpolation';
import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { elemIsInside } from 'utilities/elem.js';
import { isMouseDown } from 'utilities/isMouseDown.js';
import { seqId } from 'utilities/seqid.js';
import TranscriptLine from './TranscriptLine.jsx';

const BASE_ELEM_SIZING = 20;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;

class TranscriptText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionFocus: false,
      availableHeight: 0,
      scrollTop: 0,
      scrollToIndex: undefined,
      prevScrollToIndex: undefined,
      recentlyScrolled: false,
    };

    this.savedRefs = {};
    this.scrollingTimeout = null;
    this.containerId = seqId('w-interactive-transcript-');
  }

  componentDidMount() {
    const captions = this.props.captions;

    if (this.props.setRefs) {
      this.props.setRefs(this.savedRefs);
    }

    this.setState({ availableHeight: this.calculateAvailableHeight() });

    // when first opening the transcript, make sure we have the first line be the line that
    // was clicked. Or if we're at the end of the video, that it is in the screen.
    if (this.props.videoTime > 0) {
      for (let i = 0; i < captions.length; i++) {
        if (this.isWithinTime(captions[i])) {
          this.setState({ scrollToIndex: i });
          break;
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const segments = this.props.captions;

    if (this.props.setRefs) {
      this.props.setRefs(this.savedRefs);
    }

    if (
      this.props.controlsAreVisible !== prevProps.controlsAreVisible ||
      this.props.videoHeight !== prevProps.videoHeight
    ) {
      this.setState({ availableHeight: this.calculateAvailableHeight() });
    }

    if (this.props.activeSearchHitIndex !== prevProps.activeSearchHitIndex) {
      this.setState({
        scrollToIndex: this.props.activeSearchHitIndex,
        prevScrollToIndex: prevProps.activeSearchHitIndex,
      });
    }

    if (this.state.scrollToIndex !== prevState.scrollToIndex) {
      this.setState({ prevScrollToIndex: this.state.scrollToIndex });
    }

    // if the video has been playing and the mouse hasnt been moving, have the transcript follow along
    if (
      this.props.videoTime !== prevProps.videoTime &&
      this.props.recentlyMoused === false &&
      this.state.recentlyScrolled === false
    ) {
      for (let i = 0; i < segments.length; i++) {
        if (this.isWithinTime(segments[i])) {
          // if the previous element is in the dom... then you can scroll the sought after elem into view... else just get it into view.
          if (this.props.allRefs[i - 1] && this.props.allRefs[i - 1].offsetParent !== null) {
            this.startScrollAnimation(i);
          } else {
            this.setState({ scrollToIndex: i });
          }
          break;
        }
      }
    }

    if (
      this.props.controlsAreVisible &&
      !prevProps.controlsAreVisible &&
      this.isAtBottomOfCaptions()
    ) {
      // At the last line of the captions we prevent the controlBar from hiding the last line.
      this.scrollToBottom();
    }
  }

  animate() {
    if (!this.scollInterpolation || this.scollInterpolation.atEnd()) {
      cancelAnimationFrame(this.scrollingAnimation);
      return;
    }

    this.scrollingAnimation = requestAnimationFrame(() => {
      this.transcriptText.scrollTop = this.scollInterpolation.value();

      if (!this.scollInterpolation.atEnd()) {
        this.animate();
      }
    });
  }

  calculateAvailableHeight() {
    const { controlsAreVisible, controlBarHeight, videoHeight } = this.props;
    const heightOfSearch = controlBarHeight * 2;
    const heightOfControls = controlsAreVisible ? controlBarHeight : 0;
    return videoHeight - (heightOfSearch + heightOfControls);
  }

  focusMaintainer(startIndex, endIndex) {
    // if there is no focusIndex or we aren't inside the text zone, then we have no reason to be here
    if (!this.state.focusIndex || !elemIsInside(document.activeElement, this.transcriptTextRoot)) {
      return;
    }

    // if the focusIndex is within the start/end boundaries, we should make sure it is focused
    // or if the focusIndex elem is outside the boundaries - we should make sure the focusHelper elem
    // is there to help
    if (this.state.focusIndex < startIndex || this.state.focusIndex >= endIndex) {
      if (this.props.allRefs.focusHelper) {
        this.props.allRefs.focusHelper.focus({ preventScroll: true });
      }
    } else if (this.state.focusIndex > startIndex && this.state.focusIndex < endIndex) {
      this.props.allRefs[this.state.focusIndex].focus();
    }
  }

  calculateNumberOfRowsToRender() {
    const { captions, turnstile } = this.props;

    // turnstiles that haven't been completed hide text past the turnstile time
    if (turnstile.enabled && turnstile.hasClosed === false && turnstile.time !== 'end') {
      // binary search for the index of the text section that goes right up to the start of the turnstile
      let beginning = 0;
      let end = captions.length - 1;
      let middle = Math.floor((beginning + end) / 2);

      while (captions[middle].start > turnstile.time && middle - 1 < end) {
        if (turnstile.time > captions[middle].start) {
          beginning = middle - 1;
        } else {
          end = middle + 1;
        }

        middle = Math.floor((beginning + end) / 2);
      }

      // add 1 to the middle because we want the number of rows to display, not the index
      return captions[middle].start <= turnstile.time ? middle + 1 : 1;
    }

    return captions.length;
  }

  focusNextOrPrevious = (index) => {
    this.setState({ scrollToIndex: index, focusIndex: index });

    // wait for FF
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.props.allRefs[index].focus();
      });
    }, 20);
  };

  // for keyboard accessibility when arrowing between the sections
  // if we have a search (with hits) arrowing should go to the next hit
  // if there is no search it should just go to the next line
  getNeighboringIndices(index) {
    let left = index;
    let right = index;
    const arr = this.props.hitAndMissIndices;

    // if there's no searchKey just want to +/- 1
    if (!this.props.searchKey) {
      return [index - 1, index === arr.length - 1 ? -1 : index + 1];
    }

    // starting at the given index, move towards the ends of the array
    // breaking when you hit the first true value
    // if there is none the value will be -1, meaning not found
    while ((left -= 1) >= 0) if (arr[left]) break;
    while ((right += 1) < arr.length) if (arr[right]) break;
    return [left, right === arr.length ? -1 : right];
  }

  handleScroll = (event) => {
    this.setState({
      scrollTop: event.target.scrollTop,
    });
  };

  isAtBottomOfCaptions() {
    const el = this.transcriptText;
    return el.scrollTop + 5 >= el.scrollHeight - el.offsetHeight;
  }

  isWithinTime(options) {
    const { videoTime } = this.props;
    const { start, end } = options;
    return videoTime >= start && videoTime < end;
  }

  // only focus in on the sections if the container is active and the arrow keys come
  // into use
  onKeyDown = (e) => {
    if ((e.which === UP_ARROW_KEY || e.which === DOWN_ARROW_KEY) && !e.wistiaPlayerHandled) {
      e.preventDefault();
      e.wistiaPlayerHandled = true;

      const nextSearchHit = this.props.hitAndMissIndices.indexOf(true);
      const index = nextSearchHit !== -1 ? nextSearchHit : 0;

      this.setState({ scrollToIndex: index, focusIndex: index });
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.props.allRefs[index].focus();
        });
      }, 20);
    }
  };

  onWheel = () => {
    if (this.state.recentlyScrolled === false) {
      this.setState({ recentlyScrolled: true });
    }

    if (this.scrollingTimeout) {
      clearTimeout(this.scrollingTimeout);
    }

    this.scrollingTimeout = setTimeout(() => {
      this.setState({ recentlyScrolled: false });
    }, 7000);
  };

  scrollToBottom() {
    const lastIndex = this.props.captions.length - 1;
    this.startScrollAnimation(lastIndex);
  }

  sectionContainerStyles() {
    return {
      height: '100%',
      overflowY: 'scroll',
      boxShadow: this.state.sectionFocus ? '0 0 0 2px #fff inset' : 'none',
      outline: 'none',
    };
  }

  setSectionBlur = () => {
    this.setState({ sectionFocus: false });
  };

  setSectionFocus = () => {
    if (!isMouseDown()) {
      this.setState({ sectionFocus: true });
    }
  };

  setFocusIndex = (index) => {
    this.setState({ focusIndex: index });
  };

  setSectionRef = (ref, index) => {
    this.savedRefs[index] = ref;
  };

  startScrollAnimation(toIndex) {
    const elemAtTop = toIndex * BASE_ELEM_SIZING * 1.5 * this.props.scale;

    let animateTo = Math.max(0, elemAtTop);
    let animateFrom = this.transcriptText.scrollTop;

    cancelAnimationFrame(this.scrollingAnimation);

    this.scollInterpolation = new Interpolation({
      seedRange: 300,
      outputStart: animateFrom,
      outputEnd: animateTo,
    });

    this.animate();
  }

  turnstileText() {
    const { scale } = this.props;
    return {
      display: 'block',
      fontWeight: '500',
      fontSize: `${(BASE_ELEM_SIZING - 4) * scale}px`,
      lineHeight: `${(BASE_ELEM_SIZING - 5) * 2 * scale}px`,
      fontFamily: interFontFamily,
      textAlign: 'center',
      textStyle: 'italic',
    };
  }

  renderLine(section, index, opts) {
    const { start, end } = section;

    const isWithinTime = this.isWithinTime({ start, end });
    const focusNeighbors = this.getNeighboringIndices(index);

    return (
      <div
        key={index}
        style={{
          boxShadow: isWithinTime && !opts.focusHelper ? '2px 0 0 0 #fff inset' : 'none',
          boxSizing: 'border-box',
        }}
        dir={this.props.dir}
        aria-rowindex={index + 1}
        role={opts.focusHelper ? false : 'row'}
      >
        <TranscriptLine
          containerId={this.containerId}
          dir={this.props.dir}
          line={section}
          focusHelper={opts.focusHelper || false}
          focusInput={this.props.focusInput}
          focusNeighbors={focusNeighbors}
          focusNextOrPrevious={this.focusNextOrPrevious}
          index={index}
          isActive={isWithinTime}
          isHovered={false}
          key={index}
          scale={this.props.scale}
          searchKey={this.props.searchKey}
          seek={this.props.seekTranscript}
          setSectionRef={this.setSectionRef}
          setFocusIndex={this.setFocusIndex}
          updateHitCounter={this.props.updateHitCounter}
        />
      </div>
    );
  }

  render() {
    const { scale, turnstile, videoDuration } = this.props;
    const numRows = this.calculateNumberOfRowsToRender();
    const rowHeight = BASE_ELEM_SIZING * 1.5 * scale;
    const totalHeight = rowHeight * numRows;
    let turnstileNearEnd;
    if (turnstile.time === 'end') {
      turnstileNearEnd = true;
    } else {
      turnstileNearEnd = videoDuration - 5 <= turnstile.time;
    }

    const { availableHeight, scrollTop } = this.state;
    let startIndex = Math.floor(scrollTop / rowHeight);

    // this will scroll to the first matching search element, but not actually
    // focus it or anything
    if (this.state.prevScrollToIndex !== this.state.scrollToIndex && this.transcriptText) {
      if (this.state.scrollToIndex !== undefined) {
        startIndex = this.state.scrollToIndex;
        this.transcriptText.scrollTop = startIndex * rowHeight;
      }
    }

    let endIndex = startIndex + Math.ceil(availableHeight / rowHeight);

    if (endIndex > numRows) {
      endIndex = numRows;
    }

    const items = [];

    let index = startIndex;

    while (index < endIndex) {
      items.push(this.renderRowAtIndex(index, {}));
      index += 1;
    }

    // helps bring focus to either the correct element or the focusHelper element if necessary
    this.focusMaintainer(startIndex, endIndex);

    const listStyles = {
      height: totalHeight,
      paddingTop: `${startIndex * rowHeight}px`,
    };

    if (this.props.dir === 'rtl') {
      listStyles.marginRight = `${BASE_ELEM_SIZING * 1.25}%`;
      listStyles.textAlign = 'right';
    } else {
      listStyles.marginLeft = `${BASE_ELEM_SIZING * 1.45}%`;
      listStyles.textAlign = 'left';
      listStyles.width = `${BASE_ELEM_SIZING * 3}%`;
    }

    const hasCaptionContent = this.props.captions.length > 0;
    return (
      <div style={{ height: `${availableHeight}px` }} ref={(el) => (this.transcriptTextRoot = el)}>
        {
          <div key="focusHelper" style={{ height: 0 }}>
            {hasCaptionContent &&
              this.renderRowAtIndex(this.state.focusIndex || 0, { focusHelper: true })}
          </div>
        }
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          aria-label="Use the arrow keys to move between the different caption lines. Click each line to seek the video to that line"
          id={this.containerId}
          onBlur={this.setSectionBlur}
          onFocus={this.setSectionFocus}
          onKeyDown={this.onKeyDown}
          onScroll={this.handleScroll}
          onWheel={this.onWheel}
          ref={(el) => (this.transcriptText = el)}
          style={this.sectionContainerStyles()}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
        >
          <div style={listStyles} role="grid" aria-rowcount={numRows}>
            <div role="rowgroup">{items}</div>
          </div>

          {/* you shall not pass! helper text for those caught at the gate of Turnstile */}
          {turnstile.enabled && turnstile.hasClosed === false && !turnstileNearEnd && (
            <span style={this.turnstileText()}>
              -- You must enter your email to access the rest of the video. --
            </span>
          )}
        </div>
      </div>
    );
  }

  renderRowAtIndex = (index, opts = {}) => this.renderLine(this.props.captions[index], index, opts);
}

export default TranscriptText;
