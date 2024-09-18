import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { isMouseDown } from 'utilities/isMouseDown.js';
import TranscriptText from './TranscriptText.jsx';
import { CloseIcon } from '../../../../../../shared/CloseIcon.jsx';
import { SearchIcon } from '../../../../../../shared/SearchIcon.jsx';

const DOWN_ARROW_KEY = 40;
const ESC_KEY = 27;
const ENTER_KEY = 13;

const BASE_ELEM_SIZING = 20;
const BASE_CONTROL_BAR_HEIGHT = 34;

class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captions: this.formatCaptions(),
      clearSearchFocus: false,
      closeFocus: false,
      hitAndMissIndices: [],
      hitCounter: 0,
      inputHasFocus: false,
      isContainerHover: null,
      recentlyMoused: false,
      searchKey: '',
      totalHits: 0,
      turnstile: {},
    };
    this.isMousingTimeout = null;
    this.searchTimeout = null;
    this.setTurnstileOptions();
  }

  setRefs = (allRefs) => {
    this.sectionRefs = allRefs;
  };

  componentDidMount() {
    this.setState({
      hitAndMissIndices: this.initialHitAndMissIndices(),
    });

    this.props.metricsVideoCount('interactiveCaptions-open');

    this.inputElem.focus();
  }

  componentWillUnmount() {
    this.props.metricsVideoCount('interactiveCaptions-close');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchKey !== prevState.searchKey) {
      this.debounceSearch();
    }

    if (this.props.selectedLanguage !== prevProps.selectedLanguage) {
      this.setState({
        captions: this.formatCaptions(),
      });

      this.setState({
        hitAndMissIndices: this.initialHitAndMissIndices(),
      });
    }

    // if things change regarding turnstiles
    if (
      this.props.turnstileClosed !== prevProps.turnstileClosed ||
      this.props.turnstileEmail !== prevProps.turnstileEmail ||
      (this.props.turnstilePlugin !== undefined && prevProps.turnstilePlugin === undefined)
    ) {
      this.setTurnstileOptions();
    }

    if (
      prevState.hitCounter !== this.state.hitCounter ||
      prevState.totalHits !== this.state.totalHits
    ) {
      this.props.onSearchHitCounterChange({
        activeHitIndex: this.state.hitCounter,
        totalHits: this.state.totalHits,
      });
    }
  }

  initialHitAndMissIndices() {
    const { captions } = this.state;
    const length = captions.length;
    const prefilledArr = Array.apply(null, Array(length)).map(() => false);

    return prefilledArr;
  }

  setTurnstileOptions() {
    const plugin = this.props.turnstilePlugin;

    if (!plugin) {
      this.setState({
        turnstile: {
          enabled: false,
          time: undefined,
          hasClosed: undefined,
        },
      });
    } else {
      this.setState({
        turnstile: {
          enabled: true,
          time: plugin.options.time,
          hasClosed: this.props.turnstileClosed || Boolean(this.props.turnstileEmail) || false,
        },
      });
    }
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.doSearch();
    }, 350);
  }

  doSearch() {
    const { searchKey, captions } = this.state;
    const searchRegEx = new RegExp(searchKey, 'ig');

    let activeSearchHitIndex;
    let totalHits = 0;

    // if we have no captions lines, get outta here
    if (!captions || !searchKey) {
      this.setState({
        hitAndMissIndices: this.initialHitAndMissIndices(),
        totalHits,
        hitCounter: 0,
        activeSearchHitIndex,
      });
      return;
    }

    // make an array of bools whether each line contains a hit or not
    const hits = captions.map((line, index) => {
      const isHitInLine = searchRegEx.test(line.text);

      if (activeSearchHitIndex === undefined && isHitInLine) {
        activeSearchHitIndex = index;
      }

      if (isHitInLine) {
        totalHits += 1;
      }

      return isHitInLine;
    });

    const hitCounter = activeSearchHitIndex ? 1 : 0;

    this.setState({
      hitAndMissIndices: hits,
      activeSearchHitIndex,
      hitCounter,
      totalHits,
    });

    this.props.metricsVideoCount('interactiveCaptions-search');
  }

  getCaptionsForLanguage() {
    const { srtCaptions, selectedLanguage, preferredLanguage } = this.props;
    const language =
      selectedLanguage && selectedLanguage !== '_off_' ? selectedLanguage : preferredLanguage;

    return srtCaptions.filter((caption) => {
      return caption.language === language;
    })[0];
  }

  formatCaptions() {
    const captions = this.getCaptionsForLanguage();
    const formattedLines = captions?.hash.lines.map((section) => {
      return section.text.map((line) => {
        return {
          start: section.start,
          end: section.end,
          text: line,
        };
      });
    });

    return [].concat.apply([], formattedLines);
  }

  render() {
    const { scale } = this.props;
    const { captions, hitCounter, totalHits } = this.state;
    const dir = this.getCaptionsForLanguage()?.right_to_left ? 'rtl' : 'ltr';
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        class="w-css-reset w-css-reset-tree"
        onKeyUp={this.onKeyUp}
        onMouseMove={this.onMouseMove}
        style={this.rootStyles()}
      >
        {/* top component */}
        <div dir={dir} style={this.searchAndCloseContainerStyles()}>
          {/* all things search */}
          <div
            style={{
              position: 'absolute',
              width: '50%',
              left: 0,
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              margin: 'auto',
            }}
          >
            {/* search icon */}
            <div style={this.searchIconStyles()}>
              <SearchIcon
                color={this.state.inputHasFocus || this.state.searchKey ? '#505050' : '#FFF'}
              />
            </div>

            {/*
              super classy way to style the placeholder and search cancel X
              The opacity change is for FF
            */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .w-interactive-captions--search-input::placeholder {
                  color: ${this.state.inputHasFocus || this.state.searchKey ? '#505050' : '#FFF'};
                  opacity: 1;
                }
                .w-interactive-captions--search-input::-webkit-search-cancel-button {
                  display: none;
                }
              `,
              }}
            ></style>

            {/* search input */}
            <input
              aria-label="Search Captions"
              class="w-interactive-captions--search-input"
              onBlur={this.inputOnBlur}
              onInput={this.updateSearchValue}
              onFocus={this.inputOnFocus}
              onKeyDown={this.inputKeyDown}
              placeholder="Search"
              style={this.searchInputStyles()}
              type="search"
              value={this.state.searchKey}
              ref={(el) => (this.inputElem = el)}
            />
            <button
              style={this.stylesForClearSearchButton()}
              class="w-vulcan-v2-button w-css-reset"
              onClick={() => {
                this.setState({ searchKey: '' });
                this.inputElem.focus();
              }}
              onFocus={this.setClearSearchFocus}
              onBlur={this.setClearSearchBlur}
              tabIndex={0}
              aria-label="Clear search input"
            >
              <CloseIcon color="#000" />
            </button>

            {/* hit count */}
            <div style={this.hitCountStyle()}>
              {hitCounter} / {totalHits}
            </div>
          </div>

          {/* close button */}
          <div
            style={{
              position: 'absolute',
              right: '5%',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-block',
            }}
          >
            <button
              style={this.closeButtonStyles()}
              class="w-vulcan-v2-button w-css-reset"
              onClick={this.props.closeTranscript}
              onFocus={this.setCloseFocus}
              onBlur={this.setCloseBlur}
              tabIndex={0}
              aria-label="Close Interactive Captions"
            >
              {/* Close Icon */}
              <CloseIcon color="#FFF" />
            </button>
          </div>
        </div>

        <TranscriptText
          activeSearchHitIndex={this.state.activeSearchHitIndex}
          allRefs={this.sectionRefs}
          captions={captions}
          closeTranscript={this.props.closeTranscript}
          controlsAreVisible={this.props.controlsAreVisible}
          controlBarHeight={this.calculateSearchHeight()}
          focusInput={this.focusInput}
          hitAndMissIndices={this.state.hitAndMissIndices}
          recentlyMoused={this.state.recentlyMoused}
          scale={this.props.scale}
          setRefs={this.setRefs}
          searchKey={this.state.searchKey}
          seekTranscript={this.props.seekTranscript}
          turnstile={this.state.turnstile}
          updateHitCounter={this.updateHitCounter}
          videoDuration={this.props.videoDuration}
          videoHeight={this.props.videoHeight}
          videoTime={this.props.videoTime}
          dir={dir}
        />
      </div>
    );
  }

  resetFirstHitIndex = () => {
    this.setState({ activeSearchHitIndex: undefined });
  };

  setCloseFocus = () => {
    if (!isMouseDown()) {
      this.setState({ closeFocus: true });
    }
  };

  setCloseBlur = () => {
    this.setState({ closeFocus: false });
  };

  setClearSearchFocus = () => {
    if (!isMouseDown()) {
      this.setState({ clearSearchFocus: true });
    }
  };

  setClearSearchBlur = () => {
    this.setState({ clearSearchFocus: false });
  };

  updateSearchValue = (e) => {
    this.setState({ searchKey: e.target.value });
  };

  inputKeyDown = (e) => {
    const { hitCounter, activeSearchHitIndex, hitAndMissIndices, searchKey } = this.state;
    const searchFrom = e.which === DOWN_ARROW_KEY ? 0 : activeSearchHitIndex + 1;
    const nextSearchHit = hitAndMissIndices.indexOf(true, searchFrom);

    // find the very first hit to let us cycle through agagin
    let firstHit = hitAndMissIndices.indexOf(true);
    firstHit = firstHit === -1 ? 0 : firstHit;

    let updatedHitCounter = hitCounter;
    let index;

    if (nextSearchHit === -1) {
      index = firstHit;
      updatedHitCounter = searchKey ? 1 : 0;
    } else {
      index = nextSearchHit;
      updatedHitCounter += 1;
    }

    // down arrow highlights _and_ focuses the first hit
    // enter key just highlights the next item
    switch (e.which) {
      case DOWN_ARROW_KEY:
        this.setState({
          activeSearchHitIndex: index,
          hitCounter: searchKey ? 1 : 0,
        });
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.sectionRefs[index].focus();
          });
        }, 20);
        break;
      case ENTER_KEY:
        this.setState({
          activeSearchHitIndex: index,
          hitCounter: updatedHitCounter,
        });
        break;
      default:
    }
  };

  inputOnFocus = () => {
    this.setState({ inputHasFocus: true });
  };

  inputOnBlur = () => {
    this.setState({ inputHasFocus: false });
  };

  focusInput = (index) => {
    this.inputElem.focus();
    this.setState({ activeSearchHitIndex: index });
  };

  updateHitCounter = (increment) => {
    const { hitCounter } = this.state;
    const updatedHitCounter = increment ? hitCounter + 1 : hitCounter - 1;
    if (this.state.searchKey) {
      this.setState({ hitCounter: updatedHitCounter });
    }
  };

  onMouseMove = () => {
    // prevents a bunch of unnecessary re-renders
    if (this.state.recentlyMoused === false) {
      this.setState({ recentlyMoused: true });
    }

    if (this.isMousingTimeout) {
      clearTimeout(this.isMousingTimeout);
    }
    this.isMousingTimeout = setTimeout(() => {
      this.setState({ recentlyMoused: false });
    }, 7000);
  };

  // we use keyup because that is what popovers use to check for escape keypresses
  onKeyUp = (e) => {
    if (e.which === ESC_KEY && !e.escapeHandled) {
      // set a flag that popovers will check for so we dont stop propagation.
      e.escapeHandled = true;
      this.props.closeTranscript();
    }
  };

  rootStyles() {
    return {
      backgroundColor: 'rgba(0,0,0,.65)',
      clip: 'rect(0,0,0,0)',
      color: '#fff',
      height: `calc(100% + ${this.props.controlBarHeight}px)`,
    };
  }

  // if controls are not visible on load and someone opens IC,
  // this might be 0... so we set to default in that case
  calculateSearchHeight() {
    if (this.props.controlBarHeight) {
      return this.props.controlBarHeight;
    }

    return BASE_CONTROL_BAR_HEIGHT * this.props.scale;
  }

  searchAndCloseContainerStyles() {
    return {
      position: 'relative',
      height: `${this.calculateSearchHeight() * 2}px`,
      minHeight: `${this.calculateSearchHeight() * 2}px`,
    };
  }

  searchIconStyles() {
    const { scale } = this.props;
    const left = `${BASE_ELEM_SIZING * 0.8 * scale}px`;
    return {
      position: 'absolute',
      display: 'inline-block',
      top: `${BASE_ELEM_SIZING * scale}px`,
      transform: 'translateY(-50%)',
      left,
      transition: 'all 300ms ease',
      width: `${BASE_ELEM_SIZING * scale}px`,
    };
  }

  closeButtonStyles() {
    const { scale } = this.props;
    return {
      boxShadow: this.state.closeFocus ? '0 0 0 2px #fff inset' : 'none',
      borderWidth: '1px',
      borderRadius: '0%',
      cursor: 'pointer',
      padding: '2px',
      height: `${BASE_ELEM_SIZING * 1.125 * scale}px`,
      width: `${BASE_ELEM_SIZING * 1.125 * scale}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  hitCountStyle() {
    const { scale } = this.props;
    const { searchKey } = this.state;

    const style = {
      position: 'absolute',
      transform: 'translateY(-50%)',
      color: '#888',
      top: '50%',
      fontSize: `${(BASE_ELEM_SIZING / 2) * scale}px`,
      fontWeight: 600,
      fontFamily: interFontFamily,
      opacity: searchKey ? 1 : 0,
      transition: 'all 300ms ease',
    };

    const isRtL = this.getCaptionsForLanguage()?.right_to_left;
    if (isRtL) {
      style.left = `${BASE_ELEM_SIZING * 2.4 * scale + 45}px`;
    } else {
      style.right = `${BASE_ELEM_SIZING * 2.4 * scale}px`;
    }

    return style;
  }

  stylesForClearSearchButton() {
    const { scale } = this.props;
    const { searchKey } = this.state;

    return {
      boxShadow: this.state.clearSearchFocus ? '0 0 0 2px #000 inset' : 'none',
      cursor: 'pointer',
      display: 'flex',
      opacity: searchKey ? 1 : 0,
      outline: 'none',
      padding: '2px',
      pointerEvents: searchKey ? 'auto' : 'none',
      position: 'absolute',
      right: `${BASE_ELEM_SIZING * 0.8 * scale}px`,
      top: '50%',
      transform: 'translateY(-50%)',
      transition: 'all 300ms ease',
      width: `${BASE_ELEM_SIZING * 0.75 * scale}px`,
    };
  }

  searchInputStyles() {
    const { scale } = this.props;
    const { inputHasFocus, searchKey } = this.state;
    const focusable = Boolean(inputHasFocus || searchKey);
    const backgroundColor = focusable ? 'white' : 'transparent';
    const border = '1px solid white';
    const buffer = (BASE_ELEM_SIZING / 2.5) * scale;

    return {
      '-webkit-appearance': 'none',
      padding: `${buffer}px ${BASE_ELEM_SIZING * 4.25 * scale}px ${buffer}px ${
        BASE_ELEM_SIZING * 2.25 * scale
      }px`,
      fontSize: `${(BASE_ELEM_SIZING - 3) * scale}px`,
      display: 'block',
      fontFamily: interFontFamily,
      transition: 'all 300ms ease',
      color: focusable ? '#505050' : 'white',
      backgroundColor,
      border,
      width: '100%',
      margin: 0,
      outline: 'none',
      boxSizing: 'border-box',
    };
  }
}

export default Transcript;
