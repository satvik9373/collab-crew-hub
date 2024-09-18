import { h, render, Component } from 'preact';

export class RawHTMLStub extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const props = this.props;
    return (
      <div
        class={props.class || 'w-html-stub'}
        style={props.style}
        ref={props.stubRef}
        data-handle={props.handle}
      />
    );
  }

  componentDidMount() {
    const mount = this.props.mount;
    if (mount) {
      mount(this.base);
    }
  }

  componentWillUnmount() {
    const destroy = this.props.destroy;
    if (destroy) {
      destroy();
    }
  }
}
