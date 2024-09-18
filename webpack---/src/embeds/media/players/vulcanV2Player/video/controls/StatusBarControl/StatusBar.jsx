import { h, render, Component } from 'preact';

class StatusBar extends Component {
  styles() {
    return {
      background: 'rgba(0,0,0,.3)',
      boxShadow: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      fontSize: fontSizePx(this),
      lineHeight: lineHeightPx(this),
      padding: `0 ${10 * this.props.scale}px`,
      width: '100%',
      height: '30px',
      color: '#fff',
      position: 'absolute',
      justifyContent: 'center',
    };
  }

  render() {
    return <div style={this.styles()}>{this.props.message}</div>;
  }
}

const lineHeight = (component) => {
  return 34 * component.props.scale;
};

const lineHeightPx = (component) => {
  return `${lineHeight(component)}px`;
};

const fontSizePx = (component) => {
  return `${14 * component.props.scale}px`;
};

export default StatusBar;
