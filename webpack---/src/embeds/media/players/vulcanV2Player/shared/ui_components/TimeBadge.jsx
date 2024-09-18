import { interNumbersSemiBold } from 'utilities/interFontFamily.js';
import { h, render, Component } from 'preact';

class TimeBadge extends Component {
  getLeftValue() {
    const { left } = this.props;

    if (this.isInBeginningZone()) {
      return 0;
    }
    if (this.isInEndZone()) {
      return;
    }
    return left;
  }

  getRightValue() {
    if (this.isInEndZone()) {
      return 0;
    }
  }

  getTopValue() {
    const { height } = this.props;
    const heightValue = height / 2 - this.heightOfTimeBadge() * 1.5;

    return Math.max(2, heightValue);
  }

  isInBeginningZone() {
    const { left } = this.props;

    return left < this.widthOfTimeBadge() / 2;
  }

  isInEndZone() {
    const { left } = this.props;
    const { widthOfPlaybar } = this.props;

    return left >= widthOfPlaybar - this.widthOfTimeBadge() / 2;
  }

  timeBadgeStyle() {
    const shouldNotCenterBadge = this.isInBeginningZone() || this.isInEndZone();

    return {
      color: '#fff',
      fontFamily: interNumbersSemiBold,
      fontSize: '13px',
      left: this.getLeftValue(),
      position: 'absolute',
      right: this.getRightValue(),
      top: this.getTopValue(),
      transform: shouldNotCenterBadge ? '' : 'translateX(-50%)',
    };
  }

  widthOfTimeBadge() {
    return this._timeBadgeRef?.getBoundingClientRect().width || 24;
  }

  heightOfTimeBadge() {
    return this._timeBadgeRef?.getBoundingClientRect().height || 16;
  }

  render() {
    return (
      <span ref={(elem) => (this._timeBadgeRef = elem)} style={this.timeBadgeStyle()}>
        {this.props.time}
      </span>
    );
  }
}

export default TimeBadge;
