import { h, render, Component } from 'preact';
import { interFontFamily } from 'utilities/interFontFamily.js';
import { isMouseDown } from 'utilities/isMouseDown.js';

const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const ESC_KEY = 27;
const BASE_ELEM_SIZING = 20;

class TranscriptLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isKeyboardFocused: false,
    };
  }

  componentDidMount() {
    if (this.el) {
      const id = this.props.focusHelper ? 'focusHelper' : this.props.index;
      this.props.setSectionRef(this.el, id);
    }
  }

  componentDidUpdate() {
    if (this.el) {
      const id = this.props.focusHelper ? 'focusHelper' : this.props.index;
      this.props.setSectionRef(this.el, id);
    }
  }

  render() {
    const { searchKey, line, isActive, scale } = this.props;
    const searchRegEx = new RegExp(searchKey, 'ig');

    // if the line is being rendered purely to help manage focus
    // the html should be a div so it is properly ignored by screen
    // readers
    const ButtonOrDiv = this.props.focusHelper ? 'div' : 'button';

    let renderLine = line.text;

    // if the search term isn't empty and there's a hit somewhere in the line,
    // only then do we do we mark it
    if (searchKey !== '' && searchRegEx.test(line.text)) {
      renderLine = line.text.replace(searchRegEx, (wordBeingReplaced) => {
        return `<mark>${wordBeingReplaced}</mark>`;
      });
    }

    return (
      <div role={this.props.focusHelper ? false : 'gridcell'}>
        <ButtonOrDiv
          aria-describedby={this.props.focusHelper ? '' : this.props.containerId}
          onBlur={this.unsetKeyboardFocus}
          onClick={this.clickLine}
          onFocus={this.onFocus}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onMouseLeave={this.onMouseLeave}
          onMouseEnter={this.onMouseEnter}
          ref={(el) => (this.el = el)}
          style={this.lineStyles(isActive)}
          tabIndex={-1}
        >
          {this.props.focusHelper === false && (
            <span
              dangerouslySetInnerHTML={{ __html: renderLine }}
              style={{
                backgroundColor: this.state.isHovered ? 'black' : 'transparent',
                boxShadow: this.state.isKeyboardFocused ? '0 0 0 2px #fff inset' : 'none',
                cursor: 'pointer',
                padding: `${3.4 * scale}px ${8 * scale}px`,
                textAlign: this.props.dir === 'rtl' ? 'right' : 'left',
              }}
            ></span>
          )}
        </ButtonOrDiv>
      </div>
    );
  }

  clickLine = (e) => {
    const { seek, line } = this.props;
    e.preventDefault();
    seek(line.start + 0.001);
  };

  onMouseEnter = () => {
    if (this.state.isHovered !== true) {
      this.setState({ isHovered: true });
    }
  };

  onMouseLeave = () => {
    if (this.state.isHovered !== false) {
      this.setState({ isHovered: false });
    }
  };

  onFocus = () => {
    if (!isMouseDown()) {
      this.props.setFocusIndex(this.props.index);
      this.setState({ isKeyboardFocused: true });
    }
  };

  unsetKeyboardFocus = () => {
    this.setState({ isKeyboardFocused: false });
  };

  onKeyDown = (e) => {
    const [prev, next] = this.props.focusNeighbors;

    switch (e.which) {
      case DOWN_ARROW_KEY:
        e.preventDefault();
        e.wistiaPlayerHandled = true;
        if (next !== -1) {
          this.unsetKeyboardFocus();
          this.props.focusNextOrPrevious(next);
          this.props.updateHitCounter(true);
        }
        break;
      case UP_ARROW_KEY:
        e.preventDefault();
        e.wistiaPlayerHandled = true;
        this.unsetKeyboardFocus();
        if (prev !== -1) {
          this.props.focusNextOrPrevious(prev);
          this.props.updateHitCounter(false);
        } else {
          this.props.focusInput(this.props.index);
        }
        break;
      default:
    }
  };

  // use key up for consistency with root component, and
  // handle the esc so we dont close the whole transcript
  onKeyUp = (e) => {
    if (e.which === ESC_KEY) {
      this.props.focusInput(this.props.index);
      e.escapeHandled = true;
    }
  };

  lineStyles(isActive) {
    const { scale } = this.props;
    return {
      display: 'inline-flex',
      minHeight: this.props.focusHelper ? '0' : `${BASE_ELEM_SIZING * 1.5 * scale}px`,
      fontFamily: interFontFamily,
      fontSize: `${(BASE_ELEM_SIZING - 3) * scale}px`,
      fontWeight: isActive ? '700' : '500',
      lineHeight: this.props.focusHelper ? '0' : `${(BASE_ELEM_SIZING + 6) * scale}px`,
      outline: 'none',
      marginLeft: `${(BASE_ELEM_SIZING / 3.3) * scale}px`,
    };
  }
}

export default TranscriptLine;
