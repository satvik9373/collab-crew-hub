import { h, render, Component } from 'preact';

class VisuallyHiddenElem extends Component {
  render() {
    const TagName = this.props.tagName || 'div';
    return (
      <TagName {...this.props} ref={this.props.elemRef} style={this.visuallyHiddenStyles()}>
        {this.props.children}
      </TagName>
    );
  }

  visuallyHiddenStyles() {
    return {
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    };
  }
}

export default VisuallyHiddenElem;
