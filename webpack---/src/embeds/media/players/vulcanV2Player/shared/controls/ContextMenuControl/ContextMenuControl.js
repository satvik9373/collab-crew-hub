import {
    logPromiseErrors
} from 'utilities/throwAsync.js';
import {
    Wistia
} from 'wistia_namespace.js';
import {
    h,
    render
} from 'preact';
import {
    elemBind,
    elemIsInside,
    elemUnbind
} from 'utilities/elem.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    isMouseDown
} from 'utilities/isMouseDown.js';
import {
    dynamicImport
} from 'utilities/dynamicImport.ts';
import {
    defineControl
} from '../../../../../../shared/control_definitions.js';
import {
    destroyControl
} from '../../../../../../shared/control-lifecycle.js';
import TouchEvents from '../../../TouchEvents.js';
import Control from '../Control.js';

const detect = cachedDetect();

class ContextMenuControl extends Control {
    constructor(video) {
        super(video);
        if (detect.touchScreen) {
            this.touchEvents = new TouchEvents(video.chrome);
            this.touchEvents.bind('longpress', this.onContextMenu);
        } else {
            this.unbinds.push(elemBind(video.chrome, 'contextmenu', this.onContextMenu));
        }

        this.unbinds.push(elemBind(video.chrome, 'click', this.onClick));

        this.eventListeners.set('hide-copy-link-and-thumbnail-change', () => {
            this.renderMenu();
        });

        this.eventListeners.forEach((eventListenerFn, eventName) => {
            video.embedElement.addEventListener(eventName, eventListenerFn);
        });
    }

    mount(rootElem) {
        this.rootElem = rootElem;
        // no rendering immediately on load; we do that on right click
    }

    destroy() {
        if (this.touchEvents) {
            this.touchEvents.destroy();
            this.touchEvents = null;
        }

        destroyControl(this);
    }

    onControlPropsUpdated(prevProps) {
        if (
            (this.props.playerLanguage !== prevProps.playerLanguage ||
                this.props.controlBarBorderRadius !== prevProps.controlBarBorderRadius) &&
            this._visible
        ) {
            this.renderMenu();
        }
    }

    onContextMenu = (e, ctx) => {
        if (e.altKey) {
            // Secret way to right-click the video and inspect: hold ALT while right
            // clicking or ctrl-clicking.
            return;
        }

        if (this.video.ui.shouldOnlyShowControlBar ? .()) {
            // We don't show the context menu when the audio player is very tiny.
            return;
        }

        if (e.type === 'contextmenu') {
            e.preventDefault();
        }

        this.pageX = e.pageX;
        this.pageY = e.pageY;

        if (!this._hasLoaded) {
            this.loading(
                new Promise((resolve) => {
                    this.resolveLoadingPromise = resolve;
                }), {
                    x: this.pageX,
                    y: this.pageY
                },
            );
        }

        const mouseupPromise = new Promise((resolve) => {
            // If touchEvents is supported, we'll be using longpress, which means
            // mouseup/touchend already fired. Otherwise we'll have bound to
            // contextmenu, and we want to wait until mouseup fires from that.
            const isLongPressOnTouchScreen = ctx && ctx.isLongPress;
            if (!isLongPressOnTouchScreen && isMouseDown()) {
                elemBind(document, 'mouseup', (mouseUpEvent) => {
                    this.pageX = mouseUpEvent.pageX;
                    this.pageY = mouseUpEvent.pageY;
                    resolve();
                    return elemUnbind;
                });
            } else {
                resolve();
            }
        });

        mouseupPromise.then(() => {
            logPromiseErrors(
                this.loadContextMenu().then(() => {
                    if (this.renderMenu) {
                        this.resolveLoadingPromise();
                        this.renderMenu(); // we assume ContextMenuExtensions will define this
                        this.menuElemRef.focus();
                    }
                }),
            );
        });
    };

    onClick = (event) => {
        if (elemIsInside(event.target, this.rootElem)) {
            return;
        }

        if (detect.safari && event.ctrlKey) {
            // ctrl-click on Safari fires both a "contextmenu" and a "click" event.
            // We want to treat that as a right-click, NOT a normal click, for our
            // purposes.
            return;
        }

        if (this.hideMenu) {
            this.hideMenu();
        } else if (!this._hasLoaded) {
            this.loading(
                new Promise((resolve) => {
                    resolve();
                }),
            );
        }
    };

    onDocumentMouseUp = (e) => {
        if (e.ctrlKey || elemIsInside(e.target, this.rootElem)) {
            return;
        }
        elemUnbind(document, 'mouseup', this.onDocumentMouseUp);
        this.loadContextMenu().then(() => {
            this.hideMenu();
        });
    };

    loadContextMenu() {
        return Promise.all([
            dynamicImport('assets/external/interFontFace.js'),
            dynamicImport('assets/external/vulcanV2Player/shared/controls/ContextMenuControl/menu.js'),
        ]).then(([, moduleContextMenu]) => {
            const {
                ContextMenuExtensions
            } = moduleContextMenu;
            for (let k in ContextMenuExtensions) {
                this[k] = ContextMenuExtensions[k].bind(this);
            }
            this._hasLoaded = true;
        });
    }

    removeEventListeners() {
        if (this.eventListeners instanceof Map) {
            this.eventListeners.forEach((eventListenerFn, eventName) => {
                this.impl.video.embedElement.removeEventListener(eventName, eventListenerFn);
            });
            this.eventListeners.clear();
        }
    }
}

ContextMenuControl.handle = 'contextMenu';
ContextMenuControl.type = 'foreground';

defineControl(ContextMenuControl);

export default ContextMenuControl;