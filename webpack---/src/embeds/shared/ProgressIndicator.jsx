import { h, render, Component } from 'preact';

export class ProgressIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filledWidth: 0,
      isDisplayNone: true,
      isOpaque: false,
      widthTransitionShouldDelay: true,
    };
  }

  componentDidMount() {
    this.maybeFadeInOrOut();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isVisible: wasVisible } = prevProps;
    this.maybeFadeInOrOut(wasVisible);

    const { filledWidth: prevFilledWidth } = prevState;
    this.maybeChangeFilledWidth(prevFilledWidth);
  }

  fadeIn() {
    const { isVisible } = this.props;
    clearTimeout(this.fadeTimeout);
    this.setState({ isDisplayNone: false }, () => {
      if (!isVisible) {
        return;
      }
      this.fadeTimeout = setTimeout(() => {
        if (!isVisible) {
          return;
        }
        requestAnimationFrame(() => {
          this.setState({ isOpaque: true });
        });
      }, 0);
    });
  }

  fadeOut() {
    const { isVisible } = this.props;
    clearTimeout(this.fadeTimeout);
    this.setState({ isOpaque: false }, () => {
      if (isVisible) {
        return;
      }
      this.fadeTimeout = setTimeout(() => {
        if (isVisible) {
          return;
        }
        this.setState({ isDisplayNone: true });
      }, 200);
    });
  }

  filledBarStyle() {
    const { widthTransitionShouldDelay, filledWidth } = this.state;
    const { color } = this.props;
    return {
      backgroundColor: `#${color}`,
      height: '100%',
      transition: `width 500ms ease-out ${widthTransitionShouldDelay ? '500ms' : ''}`,
      width: `${filledWidth}%`,
    };
  }

  maybeFadeInOrOut(wasVisible) {
    const { isVisible } = this.props;
    if (isVisible !== wasVisible) {
      if (isVisible) {
        this.fadeIn();
      } else {
        this.fadeOut();
      }
    }
  }

  maybeChangeFilledWidth(prevFilledWidth) {
    const { percentWatched } = this.props;
    if (percentWatched != null && percentWatched !== prevFilledWidth) {
      // This timeout & raf combo ensures that the filled bar's transition from 0 will happen
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.setState({
            filledWidth: percentWatched,
          });
        });
      }, 0);
    }
  }

  removeTransitionDelay() {
    this.setState({ widthTransitionShouldDelay: false });
  }

  unfilledBarStyle() {
    const { isDisplayNone, isOpaque } = this.state;
    return {
      backgroundColor: '#ffffff',
      bottom: 0,
      display: isDisplayNone ? 'none' : '',
      height: isOpaque ? `${6 * this.props.scale}px` : 0,
      opacity: isOpaque ? 0.8 : 0,
      transition: 'opacity 1s, height .5s',
      width: '100%',
    };
  }

  render() {
    return (
      <div style={this.unfilledBarStyle()}>
        <div
          onTransitionEnd={() => this.removeTransitionDelay()}
          style={this.filledBarStyle()}
        ></div>
      </div>
    );
  }
}
