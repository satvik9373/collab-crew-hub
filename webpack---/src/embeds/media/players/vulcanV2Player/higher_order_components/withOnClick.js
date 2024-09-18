import {
    h,
    render,
    Component
} from 'preact';
import {
    elemBind
} from 'utilities/elem.js';

const withOnClick = (WrappedComponent) => {
    return class extends Component {
        render() {
            return <WrappedComponent { ...this.props
            }
            />;
        }

        componentDidMount() {
            this.setupBindings();
        }

        componentDidUpdate() {
            // this.base may have changed with any render, so we need to reset our
            // bindings.
            this.destroyBindings();
            this.setupBindings();
        }

        componentWillUnmount() {
            this.destroyBindings();
        }

        setupBindings() {
            this.unbinds = [];

            this.unbinds.push(elemBind(this.base, 'click', this.onClick));
        }

        destroyBindings() {
            if (this.unbinds) {
                this.unbinds.map((unbind) => unbind());
                this.unbinds = null;
            }
        }

        onClick = (e) => {
            const onClick = this.props.onClick;
            if (onClick) {
                onClick(e);
            }
        };
    };
};

export default withOnClick;