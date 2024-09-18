import {
    Wistia
} from 'wistia_namespace.js';
import {
    cssResetForSelector
} from 'utilities/cssReset.js';
import {
    seqId
} from 'utilities/seqid.js';
import {
    h,
    render
} from 'preact';
import {
    isMouseDown,
    isMouseDownRecently
} from 'utilities/isMouseDown.js';
import {
    controlMultiplierBasedOnVideo
} from 'utilities/fit-control.js';
import {
    cachedDetect
} from 'utilities/detect.js';
import {
    doTimeout,
    clearTimeouts
} from 'utilities/timeout-utils.js';
import {
    assign
} from 'utilities/obj.js';
import {
    addInlineCss,
    elemBind,
    elemUnbind,
    elemIsInside,
    elemOffset,
    elemRemove,
    elemStyle,
    elemAnimate,
    formInputIsFocused,
    elemIsHidden,
} from 'utilities/elem.js';
import {
    getDefaultTranslation
} from '../../../../shared/translations.js';
import {
    PlayerBehavior
} from './PlayerBehavior.js';
import ControlBarButtonAndDialog from '../video/ui_components/ControlBarButtonAndDialog.jsx';
import ControlBarDialog from '../ControlBarDialog.js';
import Layout from '../Layout.jsx';

const detect = cachedDetect();

const appearsInTheControlBar = (type) => {
    return (
        type === 'control-bar-left' ||
        type === 'control-bar-right' ||
        type === 'wistia-logo' ||
        type === 'ellipsis' ||
        type == 'playbar'
    );
};

const HANDLED_CONTROL_TYPES = [
    'above-control-bar',
    'background',
    'control-bar-left',
    'control-bar-right',
    'wistia-logo',
    'ellipsis',
    'foreground',
    'left-flyout',
    'playbar',
    'right-flyout',
].reduce((acc, val) => {
    acc[val] = true;
    return acc;
}, {});

const BASE_CONTROL_BAR_HEIGHT = 34;
const DEFAULT_BUTTON_WIDTH = 40;

const getButtonWidth = (control) => {
    if (control.pcfButtonWidth) {
        return control.pcfButtonWidth();
    }

    if (control.wistiaLogoButtonWidth) {
        return control.wistiaLogoButtonWidth();
    }

    if (control.constructor.width != null) {
        return control.constructor.width;
    }

    return DEFAULT_BUTTON_WIDTH;
};

const getButtonHeight = (control) => {
    if (control.pcfButtonHeight) {
        return control.pcfButtonHeight();
    }

    if (control.constructor.height != null) {
        return control.constructor.height;
    }

    return BASE_CONTROL_BAR_HEIGHT;
};

const SPACEBAR_KEY = 32;

/*
 * This class serves as the glue between the video, the layout, and the
 * controls.
 *
 * Conceptually:
 *
 * It renders the layout's "skeleton" (Layout.jsx) based on which controls are
 * enabled, leaving space for each control to render itself. Then it mounts
 * any new controls and sends and notifies any existing controls of layout
 * changes via the onControlPropsUpdated() control lifecycle method.
 *
 * It provides a central location for UI elements that need to be coordinated.
 * For example, control bar dialogs are managed here (only one can be open at a
 * time), and whether or not the control bar is visible is determined here.
 *
 * It handles some behavior on its own that isn't control specific. For
 * example, clicking anywhere in the Layout that's _not_ a control will cause
 * the video to toggle play.
 *
 * It's expected that the UI is rendered _in front_ of the <video> element.
 *
 */
class UIBehavior extends PlayerBehavior {
    init() {
        this.mountPromises = [];
        this.controls = {};
        this.controlsByType = {};
        this.dialogs = [];
        this.mountRefs = {};
        this.buttonMountRefs = {};
        this.lastRenderPromise = Promise.resolve();
        this.lastMouseMoveWasFromBackground = true;
        this._touchStartFromControlDialog = false;
        this._ariaLiveText = '';
        this._previousBorderRadiusOn = false;

        getDefaultTranslation().then((language) => {
            const publicApi = this.impl.publicApi;
            if (publicApi && !publicApi._wasPlayerLanguageSetViaApi) {
                this.impl.playerLanguage(language.code);
            }
        });
        if (!this.domId) {
            this.domId = seqId('w-vulcan-v2-');
        }
    }

    bigPlayButtonBorderRadius() {
        return this.impl._attrs.bigPlayButtonBorderRadius * this.scale();
    }

    controlBarBorderRadius() {
        return this.impl._attrs.controlBarBorderRadius * this.scale();
    }

    controlBarDistance() {
        return this.impl._attrs.controlBarDistance * this.scale();
    }

    captionsBackgroundColor() {
        return this.impl._attrs.captionsBackgroundColor;
    }

    captionsTextColor() {
        return this.impl._attrs.captionsTextColor;
    }

    captionsTextSize() {
        return this.impl._attrs.captionsTextSize;
    }

    captionsFontFamily() {
        return this.impl._attrs.captionsFontFamily;
    }

    captionsBorderRadius() {
        return this.impl._attrs.captionsBorderRadius;
    }

    extraPaddingWhenRounded() {
        return this.impl._attrs.controlBarBorderRadius > 15 ? 3 * this.scale() : 0;
    }

    setupBindings() {
        this._hasSetupBindings = true;

        const impl = this.impl;
        this.video = impl.video;

        this.unbinds.push(
            impl.on('play', () => {
                this.doneWaitingForPlay = true;
                if (this.tappedToHide != null) {
                    // Only set to false automatically if we've already communicated
                    // intent at least once.
                    this.tappedToHide = false;
                }
                this.render();
                this.maybeToggleControls();
                setTimeout(this.maybeToggleControls, this.showControlsTimeout());
            }),

            impl.on('pause', () => {
                if (detect.touchScreen) {
                    if (this.tappedToHide != null) {
                        this.tappedToHide = false;
                    }
                    this.maybeToggleControls();
                }
            }),

            impl.on('playrejected', () => {
                // I guess we can't play. Bail on autoplay and show all controls
                // immediately.
                this.doneWaitingForPlay = true;
                this.showVideoWrapper();
                this.render();
            }),

            impl.on('enter-fullscreen', () => {
                this._scale = null;
                this.cachedVideoHeight = null;
                this.cachedVideoWidth = null;
                this.render();
                this.lastMouseMoveWasFromBackground = true;
                this.maybeToggleControls();
                doTimeout(
                    `${this.impl.uuid}.maybe_toggle_on_fullscreen`,
                    this.maybeToggleControls,
                    this.showControlsTimeout(),
                );
            }),

            impl.on('cancel-fullscreen', () => {
                this._scale = null;
                this.cachedVideoHeight = null;
                this.cachedVideoWidth = null;
                this.render();
                this.lastMouseMoveWasFromBackground = true;
                this.maybeToggleControls();
                doTimeout(
                    `${this.impl.uuid}.maybe_toggle_on_fullscreen`,
                    this.maybeToggleControls,
                    this.showControlsTimeout(),
                );
            }),

            impl.on('up', () => {
                this._scale = null;
                this.cachedVideoHeight = null;
                this.cachedVideoWidth = null;
                this.render();
            }),

            impl.on('playerlanguagechange', () => {
                this.render();
            }),

            impl.on('popoverhide', () => {
                this.render();
            }),

            impl.on('popovershow', () => {
                this.render();
            }),

            impl.on('widthchange', () => {
                this._scale = null;
                this._isShowingMore = null;
                this.cachedVideoWidth = null;
                this.render();
            }),

            impl.on('heightchange', () => {
                this._scale = null;
                this.cachedVideoHeight = null;
                this.render();
            }),

            Wistia.on('controldefined', () => {
                this.render();
            }),

            elemBind(document, 'keyup', (event) => {
                if (formInputIsFocused()) {
                    return;
                }

                if (
                    impl.getInputContext() === 'player-mouseover' &&
                    impl._opts.hoverHotkeysEnabled !== false
                ) {
                    if (event.keyCode === SPACEBAR_KEY) {
                        this.togglePlay();
                    }
                }
            }),

            elemBind(window, 'mouseout', (event) => {
                const from = event.relatedTarget || event.toElement;
                if (!from || from.nodeName === 'HTML') {
                    this.isHovering = false;
                    this.impl.exitInputContext('player-mouseover');
                }
            }),

            // focus events on ios are firing after `touchend`, meaning our normal `isMouseDown()` is returning
            // false. So we're going to pass around another value saying whether we think that for all intents
            // and purposes the mouse is considered 'down' in this touch sequence.
            elemBind(document, 'touchend', () => {
                // this will be true because of the useCapture and setTimeout in the `touchend` handler in `isMouseDown()`
                if (isMouseDown()) {
                    this._isMouseDownFromTouch = true;
                }

                // reset it back to false pretty quickly
                setTimeout(() => {
                    this._isMouseDownFromTouch = false;

                    // re-render to ensure props in uiBehavior and Layout are in sync
                    this.render();
                }, 50);
            }),

            // most modern browsers support a `languagechange` event when the user changes
            // their browser-wide language setting. On that event, we should update the player language
            elemBind(window, 'languagechange', () => {
                getDefaultTranslation().then((language) => {
                    const publicApi = this.impl.publicApi;
                    const hasLanguageCodeChanged = this.impl.playerLanguage().code !== language.code;
                    if (publicApi && !publicApi._wasPlayerLanguageSetViaApi && hasLanguageCodeChanged) {
                        this.impl.playerLanguage(language.code);
                    }
                });
            }),
        );

        impl.whenVideoElementInDom().then(() => {
            this.unbinds.push(
                this.impl.engine.bind('webkitplaybacktargetavailabilitychanged', () => {
                    setTimeout(() => {
                        this.render();
                    }, 0);
                }),
            );
        });

        impl.whenVideoElementInDom().then(() => {
            this.unbinds.push(
                this.impl.engine.bind('audiotracksupdated', () => {
                    setTimeout(() => {
                        this.render();
                    }, 0);
                }),
            );
        });

        // it's important, particularly on mobile, that we use the impl's
        // play method when attempting to start the live stream automatically
        // this is because we want to ensure the `lastPlayInfo` is setup correctly
        // and the ui controls have the correct state.
        impl.whenVideoElementInDom().then(() => {
            this.unbinds.push(
                this.impl.engine.bind('livestreamready', () => {
                    this.impl.play();
                }),
            );
        });
    }

    /**
     * Sets up event listeners for the player and saves them to be removed later.
     * @returns {void}
     */
    setupEventListeners() {
        this._hasSetupEventListeners = true;

        if (this.eventListeners instanceof Map) {
            this.eventListeners.set('bigplaybuttonborderradiuschange', () => {
                this.resetCssReset();
                this.render();
            });

            this.eventListeners.set('controlbarborderradiuschange', () => {
                this.resetCssReset();
                this.render();
            });

            this.eventListeners.set('playerborderradiuschange', () => {
                this.resetCssReset();
                this.render();
            });

            this.eventListeners.set('playercolorchange', () => this.render());

            this.eventListeners.set('captionsbackgroundcolorchange', () => {
                this.render();
            });

            this.eventListeners.set('captionstextcolorchange', () => {
                this.render();
            });

            this.eventListeners.set('captionstextsizechange', () => {
                this.render();
            });

            this.eventListeners.set('captionsfontfamilychange', () => {
                this.render();
            });

            this.eventListeners.set('captionsborderradiuschange', () => {
                this.render();
            });

            this.eventListeners.forEach((eventListenerFn, eventName) => {
                this.embedElement.addEventListener(eventName, eventListenerFn);
            });
        }
    }

    render() {
        if (this.isRendering && this.lastRenderPromise) {
            // We don't want to have two simultaneous renders happening. If we're
            // mounting/destroying controls in those renders, our list of controls
            // will be out of sync with what's being rendered and cause issues with
            // the DOM diff.

            if (this.queuedRenderPromise) {
                // This causes all render() calls after the first queued one to
                // throttle. So if we call render() 100 times while isRendering is
                // true, it renders only twice.
                return this.queuedRenderPromise;
            }

            this.queuedRenderPromise = this.lastRenderPromise.then(() => {
                return this.render().then(() => {
                    this.queuedRenderPromise = undefined;
                });
            });
            return this.queuedRenderPromise;
        }

        const impl = this.impl;

        if (this._destroyed || !impl.grid) {
            // the behavior is dead, return a promise that never resolves.
            return new Promise(() => {});
        }

        if (!this._hasSetupBindings) {
            // We don't set these up in init() because we don't want to start
            // rendering until the embed() method uses it.
            this.setupBindings();
        }

        if (!this._hasSetupEventListeners) {
            // We don't set these up in init() because we don't want to start
            // rendering until the embed() method uses it.
            this.setupEventListeners();
        }

        if (!this.cssResetStyle) {
            this.cssResetStyle = addInlineCss(impl.uiContainer, this.cssResetContent());
        }

        if (this.doneWaitingForPlay == null) {
            const isAutoPlay = impl._isPlayPending && impl.state() === 'beforeplay';
            this.doneWaitingForPlay = !isAutoPlay;
        }

        this.lastRenderPromise = new Promise((resolve) => {
            this.isRendering = true;

            const {
                newControls,
                existingControls
            } = this.setupControls();
            this.setControlProps();

            const shouldShowControls =
                this._shouldShowControls != null ? this._shouldShowControls : this.shouldShowControls();
            this._areControlsVisible = this._shouldShowControls;

            const afterRenderFn = () => {
                this.afterRender(existingControls, newControls, resolve);
            };

            // update the video chrome with the appropriate border radius
            // this elem is created and managed by the EmbedBehavior, so it is easier to just manage this
            // style from here
            elemStyle(this.impl.chrome, {
                borderRadius: `${this.playerBorderRadius()}px`
            });

            render( <
                Layout ariaLiveText = {
                    this._ariaLiveText
                }
                afterRender = {
                    newControls.length > 0 ? afterRenderFn : null
                }
                allMounted = {
                    this.allMounted
                }
                backgroundRef = {
                    this.backgroundRefFn
                }
                bottomBarRightInnerRef = {
                    (el) => {
                        this.bottomBarRightInnerRef = el;
                    }
                }
                captionsBackgroundColor = {
                    impl.captionsBackgroundColor()
                }
                captionsTextColor = {
                    impl.captionsTextColor()
                }
                captionsTextSize = {
                    impl.captionsTextSize()
                }
                captionsFontFamily = {
                    impl.captionsFontFamily()
                }
                captionsBorderRadius = {
                    impl.captionsBorderRadius()
                }
                color = {
                    impl.playerColor()
                }
                controlBarHeight = {
                    this.controlBarHeight()
                }
                controlBarBorderRadius = {
                    this.controlBarBorderRadius()
                }
                controlsByType = {
                    this.controlsByType
                }
                domId = {
                    this.domId
                }
                doneWaitingForPlay = {
                    this.doneWaitingForPlay
                }
                extraPaddingWhenRounded = {
                    this.extraPaddingWhenRounded()
                }
                inFullscreen = {
                    impl.inFullscreen()
                }
                inNativeMode = {
                    this.inNativeMode()
                }
                isMouseDownFromTouch = {
                    this._isMouseDownFromTouch
                }
                isShowingMore = {
                    this.isShowingMore()
                }
                hasClickedToShowMore = {
                    this._isShowingMore != null
                }
                layoutRef = {
                    (elem) => (this.layoutRef = elem)
                }
                leftControlWidth = {
                    this.leftControlWidth
                }
                mountRefs = {
                    this.mountRefsFn
                }
                noMixBlendMode = {
                    impl._opts.noMixBlendMode
                }
                onClick = {
                    this.onClick
                }
                onDblClick = {
                    this.onDblClick
                }
                onFocusComplete = {
                    this.onFocusComplete
                }
                onfocusin = {
                    this.onFocusIn
                }
                onfocusout = {
                    this.onFocusOut
                }
                onKeyDown = {
                    this.onKeyDown
                }
                onMouseEnter = {
                    this.onMouseEnter
                }
                onMouseLeave = {
                    this.onMouseLeave
                }
                onMouseMove = {
                    this.onMouseMove
                }
                onPinch = {
                    this.onPinch
                }
                onSwipe = {
                    this.onSwipe
                }
                onTouchEnd = {
                    this.onTouchEnd
                }
                onTouchStart = {
                    this.onTouchStart
                }
                controlBarDistance = {
                    this.controlBarDistance()
                }
                playerBorderRadius = {
                    this.playerBorderRadius()
                }
                playerLanguage = {
                    impl.playerLanguage()
                }
                rightControlWidth = {
                    this.rightControlWidth
                }
                scale = {
                    this.scale()
                }
                shouldAnimateIn = {
                    this.embedElement.tagName === 'WISTIA-PLAYER'
                }
                shouldShowControls = {
                    shouldShowControls
                }
                videoHeight = {
                    this.videoHeight()
                }
                videoState = {
                    impl.state()
                }
                videoWidth = {
                    this.videoWidth()
                }
                />,
                impl.uiContainer,
            );

            // if there are new controls, we'll be getting new mount refs, and we
            // can only get that asynchronously after componentDidUpdate fires due
            // to a preact bug. however, rendering like this doesn't look as nice, so
            // we'd prefer to call this function synchronously as long as new
            // controls aren't initializing.
            if (newControls.length === 0) {
                this.afterRender(existingControls, newControls, resolve);
            }
        });

        return this.lastRenderPromise;
    }

    afterRender(existingControls, newControls, resolve) {
        if (this._destroyed || !this.impl.grid) {
            this.isRendering = false;
            // the behavior is dead, don't resolve.
            return;
        }

        try {
            this.runOnControlPropsUpdated(existingControls);
            this.renderButtons(existingControls);
            this.mountControls(newControls);

            if (this.didFirstRender) {
                resolve();
            } else {
                this.didFirstRender = true;

                const twoSecondsElapsed = new Promise((resolve) => {
                    doTimeout(`${this.impl.uuid}.two_seconds_elapsed`, resolve, 2000);
                });
                this.allMountedPromise = Promise.race([twoSecondsElapsed, Promise.all(this.mountPromises)])
                    .catch((e) => {
                        setTimeout(() => {
                            throw e;
                        }, 0);
                    })
                    .then(() => {
                        this.allMounted = true;
                        this.render().then(resolve);
                    });

                if (this.mountPromises.length === 0) {
                    resolve();
                }

                if (this.doneWaitingForPlay) {
                    this.allMountedPromise.then(() => {
                        // We're not autoplaying, so let's show the video background as soon
                        // as the controls render.
                        this.showVideoWrapper();
                    });
                } else {
                    doTimeout(
                        `${this.impl.uuid}.bail_on_autoplay`,
                        () => {
                            if (!this.doneWaitingForPlay) {
                                this.doneWaitingForPlay = true;

                                // We're specifically not waiting for the play/seek promise here
                                // because we've already waited several seconds and the viewer
                                // expects to see _something_, even if it's a black box. It's also
                                // possible there may be a bug and the video played but one of the
                                // promises didn't resolve. In that case, we still want the video
                                // to display to limit how broken it can appear.
                                this.showVideoWrapper();
                                this.render();
                            }
                        },
                        2000,
                    );

                    // We're waiting on autoplay; let's show the video wrapper as soon as
                    // play/seek-before-play completes.
                    this.showVideoWrapperAfterInitialPlay();
                }
            }
        } catch (e) {
            setTimeout(() => {
                throw e;
            }, 0);
        } finally {
            this.isRendering = false;
        }
    }

    resetCssReset() {
        const borderRadiusOn = Boolean(
            this.impl._attrs.controlBarBorderRadius || this.impl._attrs.bigPlayButtonBorderRadius,
        );

        if (this.cssResetStyle && this._previousBorderRadiusOn !== borderRadiusOn) {
            elemRemove(this.cssResetStyle);
            this.cssResetStyle = null;
            this._previousBorderRadiusOn = borderRadiusOn;
        }
    }

    setControlProps() {
        const impl = this.impl;

        const anyDialogOpen = this.anyDialogOpen();
        const chromeless = this.isChromeless();
        const controlsAreVisible = this.shouldShowControls();
        const isHoveringOnPlayer = this.isHovering;
        const isMostRecentFocusViaMouse = this.isMostRecentFocusViaMouse;
        const playerLanguage = impl.playerLanguage();
        const scale = this.scale();
        const videoHeight = this.videoHeight();
        const videoWidth = this.videoWidth();

        const vulcOffset = (this.vulcOffset = elemOffset(impl.grid.center));
        const bottomBarOffset = (this.bottomBarOffset = {
            left: vulcOffset.left,
            top: vulcOffset.top + this.videoHeight() - this.controlBarHeight(),
        });

        // Lay out left control bar buttons from left to right
        let leftPosition = 0;
        const leftControls = this.getControlsByType('control-bar-left');
        leftControls.forEach((control, index) => {
            control.__prevProps = control.props;
            control.props = {
                anyDialogOpen,
                chromeless,
                controlsAreVisible,
                focusNextVisibleControl: this.createFocusNextControlFunction(control),
                height: Math.round(getButtonHeight(control) * scale),
                isMostRecentFocusViaMouse,
                left: leftPosition,
                isLeftMostControl: leftPosition === 0,
                isRightMostControl: impl.isControlDisabled('playbar'),
                playerLanguage,
                scale,
                videoHeight,
                videoWidth,
                width: Math.round(getButtonWidth(control)) * scale,
            };
            leftPosition += control.props.width;
        });
        this.leftControlWidth = leftPosition;

        // Lay out right control bar buttons from left to right, then update
        // positions from left to right -- since the playbar width is dependent on
        // the fixed widths of the controls to its left and right.
        const rightControls = this.getControlsByType('control-bar-right', 'wistia-logo', 'ellipsis');
        rightControls.forEach((control, index) => {
            control.__prevProps = control.props;
            control.props = {
                anyDialogOpen,
                chromeless,
                controlsAreVisible,
                focusNextVisibleControl: this.createFocusNextControlFunction(control),
                height: Math.round(getButtonHeight(control) * scale),
                isMostRecentFocusViaMouse,
                isLeftMostControl: index === 0 && impl.isControlDisabled('playbar'),
                isRightMostControl: index === rightControls.length - 1,
                playerLanguage,
                scale,
                videoHeight,
                videoWidth,
                width: Math.round(getButtonWidth(control)) * scale,
            };

            // lil hack for volume, because the slider gets attached to the button
            // but the volume button really is last
            if (control.constructor.handle === 'volumeButton' && index === rightControls.length - 2) {
                control.props.isRightMostControl = true;
            }
            if (control.constructor.handle === 'volumeSlider' && index === rightControls.length - 1) {
                control.props.isRightMostControl = false;
            }
        });

        let rightPosition = 0;
        this.getControlsByType('ellipsis')
            .slice()
            .reverse()
            .forEach((control) => {
                rightPosition += control.props.width;
                control.props.left = videoWidth - rightPosition;
            });
        this.ellipsisWidth = rightPosition;
        let wistiaLogoWidth = 0;
        this.getControlsByType('wistia-logo')
            .slice()
            .reverse()
            .forEach((control) => {
                // The wistia logo control can change sizes depending on how much other stuff is in the control bar.
                // Let's use a static value of its largest width here, because otherwise the logo's
                // width impacts the control bar's width, which impacts the logo's width, which impacts the control bar's width...
                rightPosition += Math.round(control.largestButtonWidth) * scale;
                wistiaLogoWidth += control.props.width;
                control.props.left = videoWidth - rightPosition;
            });
        this.wistiaLogoWidth = wistiaLogoWidth;
        this.getControlsByType('control-bar-right')
            .slice()
            .reverse()
            .forEach((control) => {
                rightPosition += control.props.width;
                control.props.left = videoWidth - rightPosition;
            });
        this.rightControlWidth = rightPosition;

        // The lower playbar is always at the end of the left control bar buttons
        // and its width is the gap between the left and right control bar button
        // areas. When the ellipsis is visible, we shouldn't consider
        // right-control-bar buttons when determining the playbar width.
        const controlWidthThatImpactsPlaybar =
            this.leftControlWidth +
            (this.ellipsisWidth > 0 ? this.ellipsisWidth + this.wistiaLogoWidth : this.rightControlWidth);
        const playbarWidth = videoWidth - controlWidthThatImpactsPlaybar;
        const playbarControl = this.getControlsByType('playbar')[0];
        if (playbarControl) {
            playbarControl.__prevProps = playbarControl.props;
            playbarControl.props = {
                anyDialogOpen,
                chromeless,
                controlsAreVisible,
                focusNextVisibleControl: this.createFocusNextControlFunction(playbarControl),
                height: this.controlBarHeight(),
                isMostRecentFocusViaMouse,
                left: leftPosition,
                playerLanguage,
                scale,
                videoHeight,
                videoWidth,
                width: playbarWidth,
            };
        }
        this.playbarControlWidth = playbarWidth;

        const controlBarHeight = this.controlBarHeight();
        ['background', 'foreground', 'left-flyout', 'above-control-bar', 'right-flyout'].forEach(
            (region) => {
                (this.controlsByType[region] || []).forEach((control) => {
                    control.__prevProps = control.props;
                    control.props = {
                        anyDialogOpen,
                        chromeless,
                        controlBarHeight,
                        isFocusable: this.allMounted && this.doneWaitingForPlay,
                        controlsAreVisible,
                        focusNextVisibleControl: this.createFocusNextControlFunction(control),
                        isHoveringOnPlayer,
                        isMostRecentFocusViaMouse,
                        playerLanguage,
                        scale,
                        videoHeight,
                        videoWidth,
                    };
                });
            },
        );

        const bottomBarLowerTop = bottomBarOffset.top;
        this.eachButtonControl((control) => {
            control.props.top = bottomBarLowerTop;
        });

        if (playbarControl) {
            assign(playbarControl.props, {
                top: bottomBarLowerTop
            });
        }

        this.eachControl((control) => {
            control.props.bigPlayButtonBorderRadius = this.bigPlayButtonBorderRadius();
            control.props.controlBarBorderRadius = this.controlBarBorderRadius();
            control.props.controlBarDistance = this.controlBarDistance();
            control.props.extraPaddingWhenRounded = this.extraPaddingWhenRounded();
            control.props.leftControlBarWidth = this.leftControlWidth;
            control.props.playerBorderRadius = this.playerBorderRadius();
            control.props.rightControlBarWidth = this.rightControlWidth;
            control.props.captionsBackgroundColor = this.captionsBackgroundColor();
            control.props.captionsTextColor = this.captionsTextColor();
            control.props.captionsTextSize = this.captionsTextSize();
            control.props.captionsFontFamily = this.captionsFontFamily();
            control.props.captionsBorderRadius = this.captionsBorderRadius();
        });
    }

    runOnControlPropsUpdated(controls) {
        controls.forEach((control) => {
            if (typeof control.onControlPropsUpdated === 'function') {
                try {
                    control.onControlPropsUpdated(control.__prevProps || {});
                } catch (e) {
                    setTimeout(() => {
                        throw e;
                    }, 0);
                }
            }
            control.__prevProps = null;
        });
    }

    setupControls() {
        const impl = this.impl;

        // If there are already controls, clean up ones that shouldn't be mounted.
        let unmountedAnyControls = false;
        const destroyedControls = [];
        for (let handle in this.controls) {
            const control = this.controls[handle];
            if (HANDLED_CONTROL_TYPES[control.constructor.type]) {
                const shouldMountFn = control.constructor.shouldMount;
                if (impl.isControlDisabled(handle) || (shouldMountFn && !shouldMountFn(impl.publicApi))) {
                    if (control.destroy) {
                        try {
                            control.destroy();
                        } catch (e) {
                            setTimeout(() => {
                                throw e;
                            }, 1);
                        }
                    }
                    control.__destroyed = true;
                    delete this.mountRefs[handle];
                    delete this.buttonMountRefs[handle];
                    delete this.controls[constructorHandle(control)];
                    unmountedAnyControls = true;
                    destroyedControls.push(control);
                    impl.trigger('controldestroyed', handle);
                }
            }
        }

        // Initialize controls that haven't already been initialized.
        let initializedAnyControls = false;
        const newControls = [];
        const existingControls = [];
        for (let handle in Wistia._controlDefinitions) {
            const ControlClass = Wistia._controlDefinitions[handle];
            if (HANDLED_CONTROL_TYPES[ControlClass.type]) {
                const hasBeenInitialized = this.controls[handle] != null;
                const shouldMount = !impl.isControlDisabled(handle) &&
                    (ControlClass.shouldMount == null || ControlClass.shouldMount(impl.publicApi));
                if (shouldMount && hasBeenInitialized) {
                    existingControls.push(this.controls[handle]);
                }
                if (!hasBeenInitialized && shouldMount) {
                    try {
                        const control = (this.controls[handle] = new ControlClass(impl));
                        control.mounted = new Promise((resolve) => {
                            control.__didMount = () => {
                                control.mounted.isResolved = true;
                                impl.trigger('controlmounted', handle);
                                resolve();
                            };
                        });
                        newControls.push(control);
                    } catch (e) {
                        setTimeout(() => {
                            throw e;
                        }, 1);
                    }
                    initializedAnyControls = true;
                }
            }
        }

        // If the controls that are mounted have changed, let's rebuild
        // controlsByType entirely. This is so the render() function knows where to
        // place each control.
        if (initializedAnyControls || unmountedAnyControls) {
            // arrange controls by type, e.g.
            // {
            //   'control-bar-left': [SmallPlayButtonControl, ...],
            //   'control-bar-right': [VolumeControl, FullscreenControl, ...]
            // }
            const controlsByType = {};
            this.eachControl((control) => {
                const type = control.constructor.type;
                if (controlsByType[type] == null) {
                    controlsByType[type] = [];
                }
                controlsByType[type].push(control);
            });

            // sort the controls in each type bucket
            for (let type in controlsByType) {
                controlsByType[type].sort((control1, control2) => {
                    return (control1.constructor.sortValue || 0) - (control2.constructor.sortValue || 0);
                });
            }

            this.controlsByType = controlsByType;

            impl.publicApi.controls = impl.controls = this.controls;
        }

        return {
            newControls,
            existingControls,
            destroyedControls
        };
    }

    whenControlMounted(handle) {
        return new Promise((resolve) => {
            const control = this.controls[handle];
            if (control && control.mounted) {
                control.mounted.then(() => {
                    resolve(control);
                });
            } else {
                this.impl.bind('controlmounted', (n) => {
                    if (n === handle) {
                        resolve(this.controls[handle]);
                        return this.impl.unbind;
                    }
                });
            }
        });
    }

    mountControls(controls) {
        controls.forEach((control) => {
            const type = control.constructor.type;
            const handle = constructorHandle(control);
            const mountPoint = this.mountRefs[handle];

            if (!control.nextControlOfSameType) {
                control.nextControlOfSameType = (controlToSearch = control) => {
                    return this.nextControlOfSameType(controlToSearch);
                };
            }

            if (!control.loading) {
                control.loading = (promise, options = {}) => {
                    const isButtonWithDialog = type === 'control-bar-right';

                    if (isButtonWithDialog) {
                        return this.renderButtonWithDialogLoader(control, promise);
                    }

                    return this.renderHourglassLoader(promise, options);
                };
            }

            if (
                type === 'control-bar-left' ||
                type === 'control-bar-right' ||
                type === 'wistia-logo' ||
                type === 'ellipsis'
            ) {
                if (control.mountButton) {
                    const stubRef = this.renderButtonWithDialog(control);
                    this.mountControl(control, () => {
                        return control.mountButton(stubRef);
                    });
                } else if (control.mount) {
                    this.mountControl(control, () => {
                        return control.mount(mountPoint);
                    });
                }
            } else {
                this.mountControl(control, () => {
                    return control.mount(mountPoint);
                });
            }

            if (control.eventListeners instanceof Map) {
                control.eventListeners.forEach((eventListenerFn, eventName) => {
                    control.embedElement.addEventListener(eventName, eventListenerFn);
                });
            }
        });
    }

    mountControl(control, mountFn) {
        try {
            const handle = constructorHandle(control);
            const mountResult = mountFn();
            if (mountResult && mountResult.then && mountResult.catch) {
                mountResult.handle = handle;
                this.mountPromises.push(mountResult);
                mountResult.then(() => {
                    control.__didMount();
                });
            } else {
                control.__didMount();
            }
        } catch (e) {
            setTimeout(() => {
                throw e;
            }, 0);
        }
    }

    renderButtons(controls) {
        controls.forEach((control) => {
            if (control.mountButton) {
                this.renderButtonWithDialog(control);
            }
        });
    }

    renderButtonWithDialog(control) {
        const handle = constructorHandle(control);
        if (!this.impl) {
            return;
        }

        try {
            if (control.mountDialog && !control.dialog) {
                control.dialog = new ControlBarDialog(this, {
                    dialogWillOpen: maybeBind(control.controlDialogWillOpen, control),
                    dialogOpened: maybeBind(control.controlDialogOpened, control),
                    dialogWillClose: maybeBind(control.controlDialogWillClose, control),
                    dialogClosed: maybeBind(control.controlDialogClosed, control),
                    control,
                });
                this.dialogs.push(control.dialog);
            }
        } catch (e) {
            setTimeout(() => {
                throw e;
            }, 0);
        }

        if (!control.setButtonLabel) {
            control.setButtonLabel = (label) => {
                control.__buttonLabel = label;
                this.renderButtonWithDialog(control);
            };
        }

        if (!this.mountRefs[handle]) {
            // We return early if the mount point for this control doesn't exist yet,
            // and rendering its button into the control bar would fail. This can
            // happen if the handle exists while the control cell is still mounting.
            // It's ok, the control will render again shortly afterwards. And, this
            // only happens if a control is enabled very quickly while the embed is
            // initializing, like if you open the share section in Customize via query
            // params, which enables the share button.
            return;
        }

        const tabIndex = !this.impl.publicApi.popover || this.impl.publicApi.popover.isVisible() ? 0 : -1;

        let stubRef;
        render( <
            ControlBarButtonAndDialog { ...control.props
            }
            buttonLabel = {
                control.__buttonLabel
            }
            buttonRef = {
                (e) => {
                    control.buttonElement = e;
                }
            }
            closeDialogOnFocusOut = {
                this.impl._opts.closeDialogsOnFocusOut
            }
            color = {
                this.impl.playerColor()
            }
            control = {
                control
            }
            key = {
                `${handle}_button_and_dialog`
            }
            onBlurButton = {
                this.onBlurButton
            }
            onFocusButton = {
                this.onFocusButton
            }
            rootRef = {
                (elem) => (this.buttonMountRefs[handle] = elem)
            }
            stubRef = {
                (e) => (stubRef = e)
            }
            tabIndex = {
                tabIndex
            }
            videoState = {
                this.impl.state()
            }
            />,
            this.mountRefs[handle],
        );

        return stubRef;
    }

    onBlurButton = (_event, control) => {
        const type = control.constructor.type;
        if (appearsInTheControlBar(type)) {
            control.__isFocused = false;
            this.render();
        }
    };

    onFocusButton = (_event, control) => {
        const type = control.constructor.type;
        if (appearsInTheControlBar(type)) {
            control.__isFocused = true;
            this.render();
        }
    };

    renderButtonWithDialogLoader(control, promise) {
        return new Promise((resolve) => {
            const timeoutKey = `${this.impl.uuid}.loading_dialog_indicator.${seqId()}`;
            // we wanna wait 300ms before showing the loading indication
            doTimeout(
                timeoutKey,
                () => {
                    this.setLoadingDialogAndRender(control, true);

                    if (detect.touchScreen) {
                        elemBind(document, 'touchstart', () => {
                            try {
                                this.setLoadingDialogAndRender(control, false);
                            } catch (e) {
                                setTimeout(() => {
                                    throw e;
                                }, 0);
                            }
                            resolve();
                            return elemUnbind;
                        });
                    } else {
                        elemBind(document, 'mousedown', () => {
                            try {
                                this.setLoadingDialogAndRender(control, false);
                            } catch (e) {
                                setTimeout(() => {
                                    throw e;
                                }, 0);
                            }
                            resolve();
                            return elemUnbind;
                        });
                    }
                },
                300,
            );

            promise.then(() => {
                clearTimeouts(timeoutKey);
                this.setLoadingDialogAndRender(control, false);
                resolve();
            });
        });
    }

    setLoadingDialogAndRender(control, bool) {
        control.__isDialogLoading = bool;
        this.renderButtonWithDialog(control);
    }

    renderHourglassLoader(promise, options) {
        return new Promise((resolve) => {
            // we wanna wait 300ms before showing the loading indication
            const timeoutKey = `${this.impl.uuid}.loading_indicator.${seqId()}`;
            doTimeout(
                timeoutKey,
                () => {
                    this.controls.loadingHourglass.show(options);

                    if (detect.touchScreen) {
                        elemBind(document, 'touchstart', () => {
                            try {
                                this.controls.loadingHourglass.hide();
                            } catch (e) {
                                setTimeout(() => {
                                    throw e;
                                }, 0);
                            }
                            resolve();
                            return elemUnbind;
                        });
                    } else {
                        elemBind(document, 'mousedown', () => {
                            try {
                                this.controls.loadingHourglass.hide();
                            } catch (e) {
                                setTimeout(() => {
                                    throw e;
                                }, 0);
                            }
                            resolve();
                            return elemUnbind;
                        });
                    }
                },
                300,
            );

            promise.then(() => {
                clearTimeouts(timeoutKey);
                this.controls.loadingHourglass.hide();
                resolve();
            });
        });
    }

    eachControl(fn) {
        for (let handle in this.controls) {
            if (HANDLED_CONTROL_TYPES[this.controls[handle].constructor.type]) {
                fn(this.controls[handle]);
            }
        }
    }

    eachButtonControl(fn) {
        const allButtonControls = this.getControlsByType(
            'control-bar-left',
            'control-bar-right',
            'wistia-logo',
            'ellipsis',
        );
        allButtonControls.forEach(fn);
    }

    spaceForPlaybar() {
        let summedButtonWidth = 0;
        this.eachButtonControl((control) => {
            summedButtonWidth += getButtonWidth(control);
        });

        return this.videoWidth() - summedButtonWidth * this.scale();
    }

    controlBarHeight() {
        const impl = this.impl;
        if ((this.isBeforePlayOrReset() && !impl._attrs.controlsVisibleOnLoad) || this.isChromeless()) {
            return 0;
        }
        return Math.round(BASE_CONTROL_BAR_HEIGHT * this.scale());
    }

    isBeforePlayOrReset() {
        const impl = this.impl;
        return (
            impl.state() === 'beforeplay' ||
            (impl._opts && impl._attrs.endVideoBehavior === 'reset' && impl.state() === 'ended')
        );
    }

    shouldShowControls() {
        const impl = this.impl;
        let result;
        if (this.isChromeless()) {
            result = false;
        } else if (impl.publicApi.popover && !impl.publicApi.popover.isVisible()) {
            result = false;
        } else if (this.isBeforePlayOrReset() && this.doneWaitingForPlay) {
            if (impl._attrs.controlsVisibleOnLoad === true) {
                result = true;
            } else {
                result = false;
            }
        } else if (this.hasRequestedControlsVisible()) {
            result = true;
        } else if (detect.touchScreen) {
            if (this.tappedToHide == null || this.tappedToHide) {
                result = false;
            } else if (impl.state() !== 'playing' || this.anyDialogOpen()) {
                result = true;
            } else if (
                this.lastMovedMouseAt &&
                Date.now() - this.lastMovedMouseAt < 3000 &&
                this.lastMovedMouseAt > impl.lastPlayInfo().issuedAt
            ) {
                result = true;
            } else {
                result = false;
            }
        } else if (this.anyDialogOpen()) {
            result = true;
        } else if (this.isKeyboardFocused) {
            result = true;
        } else if (!impl.inFullscreen() && !this.isHovering) {
            result = false;
        } else if (this.lastMovedMouseAt && Date.now() - this.lastMovedMouseAt < 3000) {
            result = true;
        } else if (!this.lastMouseMoveWasFromBackground) {
            result = true;
        } else {
            result = false;
        }
        return result;
    }

    hasRequestedControlsVisible() {
        const visibilityRequests = this.impl._visibilityRequests;
        for (let k in visibilityRequests) {
            if (visibilityRequests[k]) {
                return true;
            }
        }
        return false;
    }

    // will try and focus the first focusable element in the control working through
    // the different control types sorted by visual 'hierarchy' in the layout.
    // It can also be passed a specific control to start from, instead of the control
    // itself.
    createFocusNextControlFunction(control) {
        const nextControl = this.nextVisibleFocusableControl(control);

        return (newControl) => {
            let controlToFocus = nextControl;
            if (newControl) {
                controlToFocus = this.nextVisibleFocusableControl(newControl);
            }

            const handle = constructorHandle(controlToFocus);
            const container = this.mountRefs[handle];
            return this.focusNextVisibleElem(container);
        };
    }

    focusNextVisibleElem(elemContainer) {
        const container = elemContainer || this.impl.uiContainer;

        const visibleElems = this.getVisibleFocusableElems(container);
        let activeIndex = 0;

        // get the active element index
        for (let i = 0; i < visibleElems.length; i++) {
            if (document.activeElement === visibleElems[i]) {
                activeIndex = i;
                break;
            }
        }

        // if there's nothing, get outta here!
        if (visibleElems.length === 0) {
            return false;
        }

        if (activeIndex === visibleElems.length - 1) {
            visibleElems[0].focus();
        } else {
            visibleElems[activeIndex + 1].focus();
        }

        return true;
    }

    getVisibleFocusableElems(container) {
        const nodeList = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex="0"]',
        );

        // filter out non-visible elements
        return Array.prototype.slice.call(nodeList).filter((elem) => {
            return !elemIsHidden(elem);
        });
    }

    onFocusComplete = () => {
        this.impl.trigger('focuscomplete');
    };

    updateFocusedControl(target) {
        this.eachControl((control) => {
            const handle = control.constructor.handle;
            const mountRef = this.mountRefs[handle];
            control.__isFocused = target && elemIsInside(target, mountRef);
        });
        this.render();
    }

    onFocusIn = (e) => {
        // we set whether the most recent focus event inside the player is a mouse focus
        this.isMostRecentFocusViaMouse = isMouseDownRecently();

        if ((isMouseDownRecently() || this._isMouseDownFromTouch) && e.srcElement === this.layoutRef) {
            // We don't want clicks on the video's background to focus the video. If
            // they do, it's very confusing when you tab out and tab back; the
            // controls won't go away until you click because the video is focused
            // without mouse interaction. But it's not clear that that is what's
            // happened.

            e.srcElement.blur();
            return;
        }

        this.updateFocusedControl(e.target);
        this.impl.enterInputContext('player-focus');

        const wasKeyboardFocused = this.isKeyboardFocused;
        this.isKeyboardFocused = !(isMouseDownRecently() || this._isMouseDownFromTouch);
        if (!wasKeyboardFocused && this.isKeyboardFocused) {
            this.impl.trigger('focusin', e);
            this.maybeToggleControls();
        }
    };

    onFocusOut = (e) => {
        this.updateFocusedControl(null);
        this.impl.exitInputContext('player-focus');

        if (this.isKeyboardFocused) {
            // set this on a timeout because we may be focusing on another element
            // inside the player.
            doTimeout(
                `${this.impl.uuid}.maybe_toggle_on_blur`,
                () => {
                    if (!document.activeElement || !elemIsInside(document.activeElement, this.layoutRef)) {
                        this.isKeyboardFocused = false;
                        this.impl ? .trigger('focusout', e);
                        this.maybeToggleControls();
                    }
                },
                1000,
            );
        } else {
            doTimeout(`${this.impl.uuid}.maybe_toggle_on_blur`, this.maybeToggleControls, 50);
        }
    };

    onKeyDown = (e) => {
        if (e.target !== this.layoutRef) {
            // we only want to toggle play if the focused element is the layout root
            return;
        }
        const {
            keyCode,
            __handledAlready
        } = e;
        if (!__handledAlready && (keyCode === 32 || keyCode === 13)) {
            // space or return
            this.togglePlay();
        }
    };

    onMouseEnter = (e) => {
        this.impl.trigger('mouseenter', e);
        this.isHovering = true;
        this.maybeToggleControls();
        this.impl.enterInputContext('player-mouseover');
    };

    onMouseLeave = (e) => {
        this.impl.trigger('mouseleave', e);
        this.isHovering = false;
        this.maybeToggleControls();
        this.impl.exitInputContext('player-mouseover');
    };

    showControlsTimeout() {
        return this.impl.inFullscreen() || detect.touchScreen ? 3000 : 5000;
    }

    onMouseMove = (e) => {
        if (detect.touchScreen) {
            return;
        }

        if (this.impl.state() === 'beforeplay') {
            // Don't take mousemove signal in our beforeplay state. Intent comes
            // after clicking to play.
            return;
        }

        // We need to check if the mouse actually moved because mousemove can be
        // fired from elements that might move as a result of the controls being
        // hidden, such as the chapters flyout, which causes an extra mousemove
        // and re-opens the controls.
        const actuallyMoved = this.lastPageX !== e.pageX || this.lastPageY !== e.pageY;
        if (actuallyMoved) {
            this.lastMovedMouseAt = Date.now();
            this.lastPageX = e.pageX;
            this.lastPageY = e.pageY;
        }

        if (actuallyMoved) {
            this.maybeToggleControls();
            if (this.shouldShowControls()) {
                clearTimeout(this.maybeToggleControlsTimeout);
                if (elemIsInside(e.target, this.backgroundElem)) {
                    this.lastMouseMoveWasFromBackground = true;
                    this.maybeToggleControlsTimeout = setTimeout(
                        this.maybeToggleControls,
                        this.showControlsTimeout(),
                    );
                } else {
                    this.lastMouseMoveWasFromBackground = false;
                    this.maybeToggleControls();
                }
            }
        }
    };

    onClick = (e) => {
        this.lastMovedMouseAt = Date.now();
        const popover = Wistia.PopoverV3 ? ._activePopover;
        const isKeyboardFocused = !isMouseDownRecently();

        if (popover) {
            popover.setShouldShowFocusOutline(isKeyboardFocused);
        }
        this.lastPageX = e.pageX;
        this.lastPageY = e.pageY;

        if (elemIsInside(e.target, this.backgroundElem)) {
            if (detect.touchScreen) {
                if (this.isBeforePlayOrReset()) {
                    this.impl.play();
                } else if (this.isChromeless()) {
                    this.togglePlay();
                } else if (detect.ios.version && detect.ios.version < 10.1) {
                    this.tappedToHide = false;
                    this.impl.play();
                } else if (this._areControlsVisible) {
                    this.tappedToHide = !this.tappedToHide;
                } else {
                    this.tappedToHide = false;
                }
                this.maybeToggleControls();
                setTimeout(this.maybeToggleControls, this.showControlsTimeout());
                // safari treats ctrl+click as both a 'contextmenu' event and a 'click' event.
                // In that case, we only want to listen for the 'contextmenu' event
            } else if (!e.ctrlKey) {
                this.togglePlay();
                this.impl.isKeyboardFocused(isKeyboardFocused);
                this.impl.focus();
            }
        } else if (this.impl.state() !== 'beforeplay') {
            // The viewer can toggle the controls after we've played.
            this.tappedToHide = false;
            this.maybeToggleControls();
            setTimeout(this.maybeToggleControls, this.showControlsTimeout());
        }
    };

    onDblClick = (e) => {
        if (detect.touchScreen) {
            // double-tapping is a thing that happens a lot on mobile since it hides
            // and shows controls, and it's annoying if we fullscreen when you do it
            // too fast.
            return;
        }

        if (!elemIsInside(e.target, this.backgroundElem)) {
            // double-clicking a control shouldn't fullscreen. just the background.
            return;
        }

        const impl = this.impl;
        if (this.impl.isControlEnabled('fullscreenControl')) {
            if (impl.inFullscreen()) {
                impl.cancelFullscreen();
            } else {
                impl.requestFullscreen();
            }
        }
    };

    onTouchStart = (event) => {
        if (event._touchStartFromControlDialog) {
            this._touchStartFromControlDialog = true;
        }

        this._cancelSwipe = !this.impl.inFullscreen();
    };

    onSwipe = (e, ctx) => {
        if (this._cancelSwipe) {
            return;
        }

        this._swipeCtx = ctx;

        const impl = this.impl;
        const height = impl.height();
        const width = impl.width();
        const yPercent = ctx.absYDelta / height;
        const xPercent = ctx.absXDelta / width;

        if (ctx.timeDelta > 175 && (yPercent < 0.02 || xPercent > yPercent)) {
            // we started the swipe over 100ms ago but have hardly moved our
            // finger since then.
            this._cancelSwipe = true;
            elemAnimate(
                impl.chrome, {
                    transform: 'translate(0, 0)'
                }, {
                    time: 200,
                    callback: () => {
                        elemAnimate(impl.chrome, {
                            transform: ''
                        });
                    },
                },
            );
            return;
        }

        if (yPercent >= 0.02 && yPercent > xPercent) {
            // swiping vertically
            const swipePercent = ctx.yDelta / height;
            elemStyle(impl.chrome, {
                transform: `translate(0, ${-1 * swipePercent * height}px)`
            });
        }
    };

    onPinch = (e, ctx) => {
        if (!this.impl.isControlEnabled('fullscreenControl')) {
            return;
        }

        this._pinchCtx = ctx;
        const impl = this.impl;
        let scaleMin;
        let scaleMax;
        if (this.impl.inFullscreen()) {
            scaleMin = 0.3;
            scaleMax = 2.5;
        } else {
            scaleMin = 0.8;
            scaleMax = 2.5;
        }
        if (ctx.pinchScale < 1) {
            ctx.pinchScale *= 1 + (1 - ctx.pinchScale) * 0.5;
        } else {
            ctx.pinchScale *= 1 + (ctx.pinchScale - 1) * 0.25;
        }
        const scale = Math.max(scaleMin, Math.min(scaleMax, ctx.pinchScale));

        elemStyle(impl.chrome, {
            transform: `scale(${scale})`
        });
    };

    onTouchEnd = () => {
        if (!this.impl.isControlEnabled('fullscreenControl')) {
            return;
        }

        const pinchCtx = this._pinchCtx;
        const swipeCtx = this._swipeCtx;
        this._pinchCtx = null;
        this._swipeCtx = null;
        const impl = this.impl;
        if (pinchCtx) {
            if (!impl.inFullscreen() && pinchCtx.pinchScale > 1.5) {
                elemStyle(impl.chrome, {
                    transform: ''
                });
                impl.requestFullscreen();
            } else if (impl.inFullscreen() && pinchCtx.pinchScale < 0.7) {
                elemStyle(impl.chrome, {
                    transform: ''
                });
                impl.cancelFullscreen();
            } else {
                elemAnimate(
                    impl.chrome, {
                        transform: 'scale(1)'
                    }, {
                        time: 400,
                        callback: () => {
                            elemStyle(impl.chrome, {
                                transform: ''
                            });
                        },
                    },
                );
            }
        } else if (swipeCtx) {
            const height = impl.height();
            const width = impl.width();
            const yPercent = swipeCtx.absYDelta / height;
            const xPercent = swipeCtx.absXDelta / width;
            const resetChromeTransform = () => {
                elemStyle(impl.chrome, {
                    transform: ''
                });
            };
            if (
                yPercent > 0.16 &&
                yPercent > xPercent &&
                Date.now() - swipeCtx.startedAt < 500 &&
                this._touchStartFromControlDialog === false // swiping within a dialog should not cause a fullscreen exit
            ) {
                this._cancelSwipe = true;
                const dir = swipeCtx.yDelta > 0 ? -1 : 1;
                elemAnimate(
                    impl.chrome, {
                        transform: `translate(0, ${dir * height}px)`
                    }, {
                        time: 200,
                        callback: () => {
                            impl.cancelFullscreen();
                            resetChromeTransform();
                        },
                    },
                );
            } else {
                this._cancelSwipe = true;
                elemAnimate(
                    impl.chrome, {
                        transform: 'translate(0, 0)'
                    }, {
                        time: 200,
                        callback: resetChromeTransform,
                    },
                );
            }
        }

        // we don't have to listen or check the touchend event
        // since every touchend regardless of origin should reset
        // this flag back to its initial state
        this._touchStartFromControlDialog = false;
    };

    togglePlay() {
        const impl = this.impl;
        if (impl.state() === 'playing') {
            impl.pause();
        } else {
            impl.play();
        }
    }

    maybeToggleControls = () => {
        // This is often called async. Let's guard against benign but annoying
        // errors.
        if (this._destroyed) {
            return;
        }

        const wasShowingControls = this._shouldShowControls;
        this._shouldShowControls = this.shouldShowControls();

        if (wasShowingControls !== this._shouldShowControls) {
            return this.lastRenderPromise.then(() => this.render());
        }
        return Promise.resolve();
    };

    showVideoWrapperAfterInitialPlay() {
        // We queue on ready because autoPlay=true and time=t options will queue
        // their methods at the _hasImpl phase--that is, well before the ready
        // phase. And we need the play/seek promise to already be set if we want
        // this to work properly.
        this.impl.ready(() => {
            const promises = [this.impl._playPromise, this.impl._seekPromise].filter((p) => p != null);
            return Promise.all(promises).then(() => {
                this.showVideoWrapper();
            });
        });
    }

    showVideoWrapper() {
        if (this.impl ? .videoWrapper) {
            elemStyle(this.impl.videoWrapper, {
                clip: ''
            });
        }
    }

    anyDialogOpen() {
        for (let handle in this.controls) {
            const control = this.controls[handle];
            if (control.dialog && control.dialog.isOpen()) {
                return true;
            }
        }
        return false;
    }

    openDialog(dialog) {
        this.dialogs.forEach((d) => {
            if (d !== dialog) {
                d.close();
            }
        });
        this.render();
    }

    closeDialog(_dialog) {
        this.render();
    }

    resizeDialog(_dialog) {
        this.render();
    }

    mountRefsFn = (refs) => {
        assign(this.mountRefs, refs);
    };

    backgroundRefFn = (e) => {
        this.backgroundElem = e;
    };

    videoWidth() {
        if (this.cachedVideoWidth != null) {
            return this.cachedVideoWidth;
        }
        return (this.cachedVideoWidth = this.impl.videoWidth());
    }

    videoHeight() {
        if (this.cachedVideoHeight != null) {
            return this.cachedVideoHeight;
        }
        return (this.cachedVideoHeight = this.impl.videoHeight());
    }

    scale() {
        if (this._scale != null) {
            return this._scale;
        }

        if (this.impl.controlScaling() !== 'auto') {
            return this.impl.controlScaling();
        }

        return (this._scale = Math.min(1.3, Math.max(0.6, controlMultiplierBasedOnVideo(this.impl))));
    }

    destroy() {
        // Clean up <ControlBarButtonAndDialog/>.
        for (let handle in this.buttonMountRefs) {
            if (Object.hasOwn(this.buttonMountRefs, handle)) {
                render( < nothing / > , this.mountRefs[handle]);
            }
        }

        // Clean up <Layout/>.
        render( < nothing / > , this.impl.uiContainer);

        this.eachControl((control) => {
            if (control.destroy) {
                try {
                    control.destroy();
                } catch (e) {
                    setTimeout(() => {
                        throw e;
                    }, 0);
                }
            }
            control.__destroyed = true;
        });

        this.unbinds.forEach((unbind) => unbind());

        elemRemove(this.cssResetStyle);
        this.cssResetStyle = null;

        super.destroy();
    }

    nextVisibleFocusableControl(control) {
        const controlAfter = this.nextControlOfSameType(control);
        // if there is a next control of the same type, return that
        if (controlAfter) {
            return controlAfter;
        }

        // 1. use Object.keys(this.mountRefs) to get all the controls in layout order
        const controlHandle = control.constructor.handle;
        const handlesInLayoutOrder = Object.keys(this.mountRefs);

        // 2. find the given control's index
        const index = handlesInLayoutOrder.indexOf(controlHandle) + 1;
        const nextControlHandles = handlesInLayoutOrder.slice(index);

        // 3. find the next visible, focusable elem in the controls order
        let nextVisibleControl;

        for (let i = 0; i < nextControlHandles.length; i++) {
            const controlContainer = this.mountRefs[nextControlHandles[i]];

            if (this.getVisibleFocusableElems(controlContainer).length > 0) {
                nextVisibleControl = nextControlHandles[i];
                break;
            }
        }

        if (nextVisibleControl) {
            return nextVisibleControl;
        }
    }

    nextControlOfSameType(control) {
        const type = control.constructor.type;
        const controlsMatchingType = this.controlsByType[type];
        const controlIndex = controlsMatchingType.indexOf(control);
        let result = controlsMatchingType[controlIndex + 1];

        // if we're in the control-bar-left, the next focusable element is
        // either in the playbar or lower right control bar.
        if (type === 'control-bar-left') {
            if (!result && this.controlsByType.playbar) {
                result = this.controlsByType.playbar[0];
            }

            if (!result && this.controlsByType['control-bar-right']) {
                result = this.controlsByType['control-bar-right'][0];
            }

            if (!result && this.controlsByType['wistia-logo']) {
                result = this.controlsByType['wistia-logo'][0];
            }

            if (!result && this.controlsByType.ellipsis) {
                result = this.controlsByType.ellipsis[0];
            }
        }

        return result;
    }

    hasAnyVideoChromeControls() {
        for (let name in this.controls) {
            const control = this.controls[name];
            if (control.constructor.isVideoChrome || appearsInTheControlBar(control.constructor.type)) {
                return true;
            }
        }
        return false;
    }

    hasRequestedChromeless() {
        const visibilityRequests = this.impl._visibilityRequests;
        for (let k in visibilityRequests) {
            if (visibilityRequests[k] === false) {
                return true;
            }
        }
        return false;
    }

    isChromeless() {
        return (
            this.inNativeMode() ||
            this.impl._opts.chromeless ||
            this.hasRequestedChromeless() ||
            !this.hasAnyVideoChromeControls()
        );
    }

    inNativeMode() {
        const opts = this.impl._opts;
        return (
            opts.nativeMode === true ||
            (detect.ipad && detect.ios.version && detect.ios.version < 10.1) ||
            (opts.playsinline === false &&
                (detect.ipad || detect.iphone || detect.android) &&
                !/two_stroke/.test(this.impl.bestEngine()))
        );
    }

    cssResetContent() {
        const prefix = `#${this.impl.chrome.id} #${this.impl.grid.wrapper.id}`;
        const cssResetContent = cssResetForSelector(`${prefix} `, '.w-css-reset');
        const cssResetTreeContent = cssResetForSelector(`${prefix} .w-css-reset-tree `, '');
        const enabledBorderRadius = Boolean(
            this.impl._attrs.controlBarBorderRadius || this.impl._attrs.bigPlayButtonBorderRadius,
        );
        const borderRadius = enabledBorderRadius ? '' : 'border-radius:0!important;';

        return `
      ${cssResetContent}
      ${cssResetTreeContent}
      ${prefix} .w-css-reset-max-width-none-important{max-width:none!important}
      ${prefix} .w-css-reset-button-important{${borderRadius}color:#fff!important;}
    `;
    }

    hasRendered() {
        return !!this.allMounted;
    }

    // If we haven't explicitly set whether they're showing more, base it on the
    // width of the controls as a portion of the video. If the playbar would only
    // have 60% of the player width, let's show less by default.
    shouldShowMoreDefaultValue() {
        const consistentRightWidth = this.rightControlWidth - this.ellipsisWidth;
        const controlWidthRatio = consistentRightWidth / this.videoWidth();
        return controlWidthRatio < 0.35;
    }

    isShowingMore() {
        const isEllipsisVisible = this.controlsByType.ellipsis;

        if (!isEllipsisVisible) {
            // We haven't shown the Ellipsis control. This should be undefined
            // behavior because this method is only relevant if it's showing.
            // Therefore, for debugging purposes, return undefined explicitly. We
            // shouldn't ever see this though--it's just a guard.
            return undefined;
        }

        const playbarControls = this.getControlsByType('playbar');

        if (playbarControls.length === 0) {
            // no playbar, so we're always showing more
            return true;
        }

        const playbarHasFocus = playbarControls.filter((control) => control.__isFocused).length > 0;

        if (playbarHasFocus) {
            // the playbar is focused, so we must show it
            return false;
        }

        const rightControlBarHasFocus =
            this.getControlsByType('control-bar-right').filter((control) => control.__isFocused).length >
            0;

        if (rightControlBarHasFocus) {
            // a right-control-bar button is focused, so we must show it
            return true;
        }

        if (this._isShowingMore != null) {
            // we've specifically asked to show more or less, so do that.
            return this._isShowingMore;
        }

        // we haven't explicitly called showMore() or showLess(), so base what's
        // visible on what fits naturally.
        return this.shouldShowMoreDefaultValue();
    }

    playerBorderRadius() {
        return this.impl._attrs.playerBorderRadius * this.scale();
    }

    showMore() {
        this._isShowingMore = true;
        return this.render();
    }

    showLess() {
        this.dialogs.forEach((d) => d.close());
        this._isShowingMore = false;
        return this.render();
    }

    getControlsByType(...types) {
        if (types.length === 1 && this.controlsByType[types[0]]) {
            // If we're only asking for one type and it exists, we don't need to do
            // any extra array allocation at all.
            return this.controlsByType[types[0]];
        }

        const result = [];
        // We use forEach instead of map/concat/flatten so that we don't need to
        // allocate multiple arrays each step in this function.
        types.forEach((type) => {
            result.push(...(this.controlsByType[type] || []));
        });
        return result;
    }

    setAriaLiveText(text) {
        this._ariaLiveText = text;
        this.render();
    }
}

UIBehavior.handle = 'ui';

const maybeBind = (fn, ctx) => {
    if (fn) {
        return fn.bind(ctx);
    }
    return null;
};

// This is just to help with minification.
const constructorHandle = (control) => {
    return control.constructor.handle;
};

export default UIBehavior;