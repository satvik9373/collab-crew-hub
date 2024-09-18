import {
    Wistia
} from 'wistia_namespace.js';
import {
    elemOffset
} from 'utilities/elem.js';
import {
    h,
    render
} from 'preact';
import Control from '../Control.js';
import LoadingSVG from './LoadingSVG.jsx';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';

class LoadingHourglassControl extends Control {
    constructor(video) {
        super(video);
        this._isVisible = false;
    }

    destroy() {
        destroyControl(this);
    }

    mount(rootElem) {
        this.rootElem = rootElem;
    }

    show = (options) => {
        this._isVisible = true;
        this.renderMenu(options);
    };

    hide = () => {
        this._isVisible = false;
        render( < nothing / > , this.rootElem);
        this.reactMounts = [this.rootElem];
    };

    renderMenu(options) {
        const x = options.x || 0;
        const y = options.y || 0;
        const videoOffset = elemOffset(this.video._embedContainer);

        if (this._isVisible) {
            render( < LoadingSVG videoOffset = {
                    videoOffset
                }
                x = {
                    x
                }
                y = {
                    y
                }
                />, this.rootElem);
                this.reactMounts = [this.rootElem];
            }
        }
    }

    LoadingHourglassControl.handle = 'loadingHourglass';
    LoadingHourglassControl.type = 'foreground';
    defineControl(LoadingHourglassControl);

    export default LoadingHourglassControl;