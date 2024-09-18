import { h, render, Component } from 'preact';
import { elemBind, elemUnbind } from 'utilities/elem.js';

class LoadingSVG extends Component {
  constructor(props) {
    super(props);

    this.animationInterval = undefined;
    this.state = {
      x: this.props.x + 10,
      y: this.props.y,
      floatingPixel: 8,
    };
  }

  componentWillMount() {
    this.animationInterval = setInterval(() => {
      let nextNum = this.state.floatingPixel + 1;
      if (nextNum > 10) {
        nextNum = 8;
      }

      this.setState({ floatingPixel: nextNum });
    }, 500);
    elemBind(document, 'mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    clearInterval(this.animationInterval);
    elemUnbind(document, 'mousemove', this.onMouseMove);
  }

  sandStyle() {
    return {
      fill: '#000000',
      width: '1',
      height: '1',
    };
  }

  anchorStyle() {
    return {
      height: 0,
      left: `${this.state.x}px`,
      position: 'absolute',
      top: `${this.state.y}px`,
      width: 0,
    };
  }

  sandProps(x, y) {
    return {
      className: 'sand',
      x,
      y,
      style: this.sandStyle(),
    };
  }

  useRules() {
    return {
      fill: '#FFFFFF',
      'fill-rule': 'evenodd',
    };
  }

  hourGlassProps(y) {
    return {
      stroke: '#000000',
      x: '1.5',
      y,
      width: '12',
      height: '2',
    };
  }

  defsProps(y) {
    return {
      x: 1,
      y,
      width: 13,
      height: 3,
    };
  }

  onMouseMove = (e) => {
    const x = e.pageX - this.props.videoOffset.left + 10;
    const y = e.pageY - this.props.videoOffset.top;

    this.setState({ x, y });
  };

  render() {
    return (
      <div style={this.anchorStyle()} onMouseMove={this.onMouseMove}>
        <svg width="15px" height="20px" viewBox="0 0 15 20" version="1.1">
          <defs>
            <rect id="path-1" {...this.defsProps(1)}></rect>
            <rect id="path-2" {...this.defsProps(16)}></rect>
            <polygon
              id="path-3"
              points="2 3 13 3 13 7 10.25 10 13 13 13 17 2 17 2 13 4.75 10 2 7"
            ></polygon>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="hourglass">
              <g id="top">
                <use {...this.useRules()} xlinkKref="#path-1"></use>
                <rect {...this.hourGlassProps(1.5)}></rect>
              </g>
              <g id="bottom">
                <use {...this.useRules()} xlinkHref="#path-2"></use>
                <rect {...this.hourGlassProps(16.5)}></rect>
              </g>
              <g id="glass">
                <use {...this.useRules()} xlinkHref="#path-3"></use>
                <path
                  stroke="#000000"
                  d="M2.5,3.5 L2.5,6.80550815 L5.42828419,10 L2.5,13.1944918 L2.5,16.5 L12.5,16.5 L12.5,13.1944918 L9.57171581,10 L12.5,6.80550815 L12.5,3.5 L2.5,3.5 Z"
                ></path>
              </g>
              <rect
                id="floater"
                fill="#000000"
                x="7"
                y={this.state.floatingPixel}
                width="1"
                height="1"
              ></rect>
              {[
                [5, 6],
                [7, 6],
                [6, 7],
                [8, 7],
                [7, 11],
                [6, 12],
                [8, 12],
                [7, 13],
                [6, 14],
                [8, 14],
                [5, 13],
                [9, 13],
                [4, 14],
                [10, 14],
                [5, 6],
                [9, 6],
              ].map((nums) => {
                return <rect {...this.sandProps(nums[0], nums[1])} />;
              })}
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default LoadingSVG;
