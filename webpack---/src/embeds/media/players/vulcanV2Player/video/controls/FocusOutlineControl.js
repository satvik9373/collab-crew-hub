import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import Control from '../../shared/controls/Control.js';
import {
    destroyControl
} from '../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../shared/control_definitions.js';

class FocusOutlineControl extends Control {
    constructor(video) {
        super(video);
        this.video = video;
        this._isVisible = false;
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        this.render();
    }

    hide() {
        this._isVisible = false;
        this.render();
    }

    show() {
        this._isVisible = true;
        this.render();
    }

    style() {
        return {
            boxShadow: '0 0 0 2px #fff inset',
            borderRadius: `${this.props.playerBorderRadius}px`,
            display: this._isVisible ? 'block' : 'none',
            height: '100%',
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            right: 0,
            width: '100%',
        };
    }

    render() {
        render( < div style = {
                this.style()
            }
            class = "w-focus-outline" > < /div>, this.rootElem);
        }
    }

    FocusOutlineControl.shouldMount = (publicApi) => {
        return !publicApi.isAudio();
    };

    FocusOutlineControl.handle = 'focusOutline';
    FocusOutlineControl.type = 'foreground';
    FocusOutlineControl.sortValue = 100;

    defineControl(FocusOutlineControl);

    export default FocusOutlineControl;